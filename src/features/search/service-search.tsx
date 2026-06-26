"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpDown, Download, Eye, LayoutGrid, List, Plus, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { categories, serviceRecords, shipowners, vessels } from "@/lib/demo-data";
import type { ServiceRecord } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { searchServices } from "@/server/search/search-service";

function reviewLabel(status: ServiceRecord["reviewStatus"]) {
  const map = {
    APPROVED: "Aprovado",
    REVIEWED: "Revisado",
    PENDING: "Aguardando revisao",
    INCOMPLETE: "Incompleto",
    DUPLICATE: "Possivel duplicidade"
  };
  return map[status];
}

export function ServiceSearch() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [vessel, setVessel] = useState("");
  const [shipowner, setShipowner] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [view, setView] = useState<"table" | "cards">("table");
  const [selected, setSelected] = useState<string[]>([]);

  const result = useMemo(
    () =>
      searchServices({
        q,
        category: category || undefined,
        vessel: vessel || undefined,
        shipowner: shipowner || undefined,
        startYear: startYear ? Number(startYear) : undefined,
        endYear: endYear ? Number(endYear) : undefined
      }),
    [q, category, vessel, shipowner, startYear, endYear]
  );

  function toggle(id: string) {
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <div className="space-y-4">
      <section className="rounded-md border border-[#d8e1ec] bg-white p-4 shadow-sm">
        <label className="text-sm font-semibold text-[#123c72]" htmlFor="main-search">Pesquisar servicos historicos</label>
        <div className="mt-2 flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-[#607086]" />
            <Input id="main-search" value={q} onChange={(event) => setQ(event.target.value)} className="pl-9" placeholder="Nome, descricao, palavra-chave, documento, OS ou observacao" autoFocus />
          </div>
          <Button type="button"><Search className="h-4 w-4" />Pesquisar</Button>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-6">
          <Select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Categoria">
            <option value="">Todas as categorias</option>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </Select>
          <Select value={vessel} onChange={(event) => setVessel(event.target.value)} aria-label="Embarcacao">
            <option value="">Todas as embarcacoes</option>
            {vessels.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
          </Select>
          <Select value={shipowner} onChange={(event) => setShipowner(event.target.value)} aria-label="Armador">
            <option value="">Todos os armadores</option>
            {shipowners.map((item) => <option key={item.id} value={item.tradeName}>{item.tradeName}</option>)}
          </Select>
          <Input value={startYear} onChange={(event) => setStartYear(event.target.value)} placeholder="Ano inicial" inputMode="numeric" />
          <Input value={endYear} onChange={(event) => setEndYear(event.target.value)} placeholder="Ano final" inputMode="numeric" />
          <Select aria-label="Situacao da revisao">
            <option>Qualquer revisao</option>
            <option>Aguardando revisao</option>
            <option>Aprovado</option>
            <option>Incompleto</option>
          </Select>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-[#607086]">{result.length} registros encontrados de {serviceRecords.length} cadastrados</div>
          <div className="flex gap-2">
            <Button type="button" variant="secondary" onClick={() => setView(view === "table" ? "cards" : "table")}>{view === "table" ? <LayoutGrid className="h-4 w-4" /> : <List className="h-4 w-4" />}Alternar visualizacao</Button>
            <Button type="button" variant="secondary"><Download className="h-4 w-4" />Exportar</Button>
            <Button type="button" variant="secondary" disabled={selected.length < 2}><ArrowUpDown className="h-4 w-4" />Comparar ({selected.length})</Button>
          </div>
        </div>
      </section>

      {view === "table" ? (
        <section className="overflow-hidden rounded-md border border-[#d8e1ec] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1120px] text-left text-sm">
              <thead className="border-b border-[#d8e1ec] bg-[#f8fafc] text-xs uppercase text-[#607086]">
                <tr>
                  <th className="w-10 px-3 py-3" />
                  <th>Servico</th><th>Categoria</th><th>Embarcacao</th><th>Armador</th><th>Ano</th><th>Un.</th><th className="text-right">Valor original</th><th>Revisao</th><th className="text-right">Acoes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf2f7]">
                {result.map((service) => (
                  <tr key={service.id} className="hover:bg-[#f8fafc]">
                    <td className="px-3 py-3"><input aria-label={`Selecionar ${service.title}`} type="checkbox" checked={selected.includes(service.id)} onChange={() => toggle(service.id)} className="h-4 w-4 accent-[#224f9a]" /></td>
                    <td className="max-w-[280px] py-3"><Link href={`/services/${service.id}`} className="font-semibold text-[#123c72] hover:underline">{service.title}</Link><div className="truncate text-xs text-[#607086]">{service.internalCode}</div></td>
                    <td>{service.category}</td>
                    <td>{service.vessel}</td>
                    <td>{service.shipowner}</td>
                    <td>{service.year}</td>
                    <td>{service.quantity} {service.unit}</td>
                    <td className="text-right font-semibold">{formatCurrency(service.originalTotalValue)}</td>
                    <td><Badge className={service.reviewStatus === "APPROVED" ? "bg-[#e4f5eb] text-[#146c3f]" : "bg-[#fff5d6] text-[#7a5200]"}>{reviewLabel(service.reviewStatus)}</Badge></td>
                    <td className="text-right"><Link href={`/services/${service.id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-[#224f9a]"><Eye className="h-4 w-4" />Abrir</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {result.map((service) => (
            <article key={service.id} className="rounded-md border border-[#d8e1ec] bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div><h3 className="font-semibold text-[#123c72]">{service.title}</h3><p className="mt-1 text-sm text-[#607086]">{service.description}</p></div>
                <input aria-label={`Selecionar ${service.title}`} type="checkbox" checked={selected.includes(service.id)} onChange={() => toggle(service.id)} className="h-4 w-4 accent-[#224f9a]" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <span><strong>Ano:</strong> {service.year}</span><span><strong>Unidade:</strong> {service.quantity} {service.unit}</span><span><strong>Embarcacao:</strong> {service.vessel}</span><span><strong>Armador:</strong> {service.shipowner}</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <strong className="text-lg text-[#0b2e59]">{formatCurrency(service.originalTotalValue)}</strong>
                <Link href={`/services/${service.id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-[#224f9a]"><Plus className="h-4 w-4" />Detalhes</Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
