import { serviceRecords } from "@/lib/demo-data";
import type { ServiceRecord } from "@/lib/types";

export type SearchParams = {
  q?: string;
  category?: string;
  vessel?: string;
  shipowner?: string;
  startYear?: number;
  endYear?: number;
  minValue?: number;
  maxValue?: number;
  unit?: string;
  source?: string;
  reviewStatus?: string;
  onlyWithDocuments?: boolean;
  onlyComplete?: boolean;
};

const text = (record: ServiceRecord) =>
  [
    record.title,
    record.description,
    record.category,
    record.subcategory,
    record.vessel,
    record.shipowner,
    record.quoteNumber,
    record.workOrderNumber,
    record.observations,
    record.material,
    record.local,
    ...record.keywords
  ]
    .join(" ")
    .toLowerCase();

export function searchServices(params: SearchParams) {
  const q = params.q?.trim().toLowerCase();
  return serviceRecords.filter((record) => {
    if (q && !text(record).includes(q)) return false;
    if (params.category && record.category !== params.category) return false;
    if (params.vessel && record.vessel !== params.vessel) return false;
    if (params.shipowner && record.shipowner !== params.shipowner) return false;
    if (params.startYear && record.year < params.startYear) return false;
    if (params.endYear && record.year > params.endYear) return false;
    if (params.minValue && record.originalTotalValue < params.minValue) return false;
    if (params.maxValue && record.originalTotalValue > params.maxValue) return false;
    if (params.unit && record.unit !== params.unit) return false;
    if (params.source && record.source !== params.source) return false;
    if (params.reviewStatus && record.reviewStatus !== params.reviewStatus) return false;
    if (params.onlyWithDocuments && !record.hasAttachments) return false;
    if (params.onlyComplete && record.reviewStatus === "INCOMPLETE") return false;
    return true;
  });
}

export function getServiceById(id: string) {
  return serviceRecords.find((record) => record.id === id);
}
