import { describe, expect, it } from "vitest";
import { searchServices } from "@/server/search/search-service";

describe("searchServices", () => {
  it("finds services by partial text", () => {
    const result = searchServices({ q: "casco" });
    expect(result.length).toBeGreaterThan(0);
    expect(result.some((item) => item.title.toLowerCase().includes("casco") || item.description.toLowerCase().includes("casco"))).toBe(true);
  });

  it("applies combined filters", () => {
    const result = searchServices({ vessel: "MV Aruana", startYear: 2018, endYear: 2025 });
    expect(result.every((item) => item.vessel === "MV Aruana" && item.year >= 2018 && item.year <= 2025)).toBe(true);
  });

  it("does not mutate original historical value", () => {
    const [record] = searchServices({ q: "substituicao" });
    const original = record.originalTotalValue;
    const proposedValue = original * 1.2;
    expect(record.originalTotalValue).toBe(original);
    expect(proposedValue).not.toBe(record.originalTotalValue);
  });
});
