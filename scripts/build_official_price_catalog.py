from __future__ import annotations

import argparse
import csv
import json
import re
import statistics
import unicodedata
from collections import defaultdict
from pathlib import Path
from typing import Any


def parse_float(value: str) -> float | None:
    if value in ("", None):
        return None
    try:
        return float(value)
    except ValueError:
        return None


def normalize_key(text: str) -> str:
    text = unicodedata.normalize("NFKD", text or "")
    text = "".join(char for char in text if not unicodedata.combining(char))
    text = text.upper()
    text = re.sub(r"[^A-Z0-9 ]+", " ", text)
    text = re.sub(r"\b(DE|DA|DO|DAS|DOS|PARA|COM|SEM|E|A|O|AS|OS)\b", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def percentile(values: list[float], pct: float) -> float:
    if not values:
        return 0
    ordered = sorted(values)
    index = (len(ordered) - 1) * pct
    lower = int(index)
    upper = min(lower + 1, len(ordered) - 1)
    weight = index - lower
    return ordered[lower] * (1 - weight) + ordered[upper] * weight


def money(value: float | None) -> str:
    return "" if value is None else f"{value:.2f}"


def split_quote_and_mc(row: dict[str, str]) -> tuple[str, str]:
    quote_number = row.get("quote_number", "").strip()
    work_order_number = row.get("work_order_number", "").strip()
    if quote_number.upper().startswith("MC"):
        return "", quote_number
    return quote_number, work_order_number


def confidence(samples: int, spread: float | None) -> str:
    if samples >= 8 and spread is not None and spread <= 0.5:
        return "Alta"
    if samples >= 3:
        return "Media"
    return "Baixa"


def main() -> None:
    parser = argparse.ArgumentParser(description="Consolida itens extraidos em catalogo oficial de precos.")
    parser.add_argument("catalog_csv", type=Path)
    parser.add_argument("--output", type=Path, default=Path("private-data/catalog-official"))
    parser.add_argument("--min-unit-value", type=float, default=0.01)
    parser.add_argument("--min-total-value", type=float, default=1.0)
    args = parser.parse_args()

    groups: dict[tuple[str, str, str], list[dict[str, str]]] = defaultdict(list)
    with args.catalog_csv.open("r", encoding="utf-8-sig", newline="") as file:
        reader = csv.DictReader(file)
        for row in reader:
            title = row.get("title", "").strip()
            unit = row.get("unit", "").strip().upper()
            category = row.get("category_hint", "").strip() or "Servicos gerais"
            unit_value = parse_float(row.get("unit_value", ""))
            total_value = parse_float(row.get("total_value", ""))
            if not title or not unit or unit_value is None or total_value is None:
                continue
            if unit_value < args.min_unit_value or total_value < args.min_total_value:
                continue
            if row.get("confidence") not in {"Alta", "Media"}:
                continue
            key = (normalize_key(title), unit, category)
            groups[key].append(row)

    official_rows: list[dict[str, Any]] = []
    source_rows: list[dict[str, Any]] = []
    for index, ((normalized_title, unit, category), rows) in enumerate(groups.items(), start=1):
        unit_values = [parse_float(row["unit_value"]) for row in rows]
        unit_values = [value for value in unit_values if value is not None]
        total_values = [parse_float(row["total_value"]) for row in rows]
        total_values = [value for value in total_values if value is not None]
        years = sorted({int(float(row["year"])) for row in rows if row.get("year")})
        latest_year = max(years) if years else None
        latest_rows = [row for row in rows if latest_year is not None and row.get("year") and int(float(row["year"])) == latest_year]
        latest_values = [parse_float(row["unit_value"]) for row in latest_rows]
        latest_values = [value for value in latest_values if value is not None]

        median_unit = statistics.median(unit_values)
        min_unit = min(unit_values)
        max_unit = max(unit_values)
        avg_unit = statistics.fmean(unit_values)
        p25 = percentile(unit_values, 0.25)
        p75 = percentile(unit_values, 0.75)
        spread = (p75 - p25) / median_unit if median_unit else None
        reference_value = statistics.median(latest_values) if latest_values and len(latest_values) >= 3 else median_unit
        sample_title = max((row["title"] for row in rows), key=len)
        sample_sources = sorted({row["source_file"] for row in rows})[:10]
        mc_ids = sorted({split_quote_and_mc(row)[1] for row in rows if split_quote_and_mc(row)[1]})[:20]

        official_id = f"CAT-{index:06d}"
        official_rows.append(
            {
                "catalog_id": official_id,
                "service_title": sample_title,
                "normalized_key": normalized_title,
                "category": category,
                "unit": unit,
                "samples": len(rows),
                "years": ", ".join(str(year) for year in years),
                "latest_year": latest_year or "",
                "min_unit_value": money(min_unit),
                "p25_unit_value": money(p25),
                "median_unit_value": money(median_unit),
                "avg_unit_value": money(avg_unit),
                "p75_unit_value": money(p75),
                "max_unit_value": money(max_unit),
                "reference_unit_value": money(reference_value),
                "total_value_median": money(statistics.median(total_values) if total_values else None),
                "confidence": confidence(len(rows), spread),
                "review_status": "Aguardando revisao",
                "mc_ids": ", ".join(mc_ids),
                "source_examples": " | ".join(sample_sources),
            }
        )

        for row in rows[:50]:
            quote_number, mc_id = split_quote_and_mc(row)
            source_rows.append(
                {
                    "catalog_id": official_id,
                    "source_file": row["source_file"],
                    "source_sheet": row["source_sheet"],
                    "source_row": row["source_row"],
                    "year": row["year"],
                    "vessel": row["vessel"],
                    "shipowner": row["shipowner"],
                    "quote_number": quote_number,
                    "mc_id": mc_id,
                    "item_code": row["item_code"],
                    "unit_value": row["unit_value"],
                    "total_value": row["total_value"],
                }
            )

    official_rows.sort(key=lambda row: (-int(row["samples"]), row["category"], row["service_title"]))
    args.output.mkdir(parents=True, exist_ok=True)
    official_path = args.output / "official_price_catalog.csv"
    sources_path = args.output / "official_price_catalog_sources.csv"
    import_path = args.output / "service_records_import.csv"
    json_path = args.output / "official_price_catalog.json"

    with official_path.open("w", encoding="utf-8-sig", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=list(official_rows[0].keys()) if official_rows else [])
        writer.writeheader()
        writer.writerows(official_rows)
    with sources_path.open("w", encoding="utf-8-sig", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=list(source_rows[0].keys()) if source_rows else [])
        writer.writeheader()
        writer.writerows(source_rows)
    import_rows = [
        {
            "internalCode": row["catalog_id"],
            "title": row["service_title"],
            "description": row["service_title"],
            "category": row["category"],
            "subcategory": "Catalogo oficial",
            "keywords": row["normalized_key"],
            "vessel": "",
            "vesselType": "",
            "shipowner": "",
            "year": row["latest_year"],
            "executionDate": "",
            "quoteDate": "",
            "quoteNumber": "",
            "workOrderNumber": "",
            "quantity": "1",
            "unit": row["unit"],
            "originalUnitValue": row["reference_unit_value"],
            "originalTotalValue": row["reference_unit_value"],
            "currency": "BRL",
            "materialsIncluded": "",
            "laborIncluded": "",
            "estimatedHours": "",
            "actualHours": "",
            "sector": "",
            "estimator": "",
            "observations": f"Gerado por catalogo consolidado; amostras={row['samples']}; anos={row['years']}; MCs={row['mc_ids']}; confianca={row['confidence']}. Revisar antes de aprovar.",
            "serviceStatus": "Referencia de preco",
            "source": "Catalogo consolidado de orcamentos",
            "sourcePath": row["source_examples"],
            "sourceReference": f"{row['catalog_id']} | MCs: {row['mc_ids']}",
            "reliability": row["confidence"],
            "reviewStatus": "PENDING",
            "local": "",
            "material": "",
        }
        for row in official_rows
    ]
    with import_path.open("w", encoding="utf-8-sig", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=list(import_rows[0].keys()) if import_rows else [])
        writer.writeheader()
        writer.writerows(import_rows)
    json_path.write_text(json.dumps(official_rows, ensure_ascii=False, indent=2), encoding="utf-8")

    summary = {
        "catalog_services": len(official_rows),
        "source_links": len(source_rows),
        "input_groups": len(groups),
        "output": str(args.output),
        "import_csv": str(import_path),
    }
    (args.output / "official_catalog_summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
