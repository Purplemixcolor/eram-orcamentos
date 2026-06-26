export type UserRole = "ADMIN" | "ORCAMENTISTA" | "REVISOR" | "CONSULTA";

export type ServiceReviewStatus = "PENDING" | "REVIEWED" | "APPROVED" | "INCOMPLETE" | "DUPLICATE";

export type ServiceRecord = {
  id: string;
  internalCode: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  keywords: string[];
  vessel: string;
  vesselType: string;
  shipowner: string;
  year: number;
  executionDate: string;
  quoteDate: string;
  quoteNumber: string;
  workOrderNumber: string;
  quantity: number;
  unit: string;
  originalUnitValue: number;
  originalTotalValue: number;
  currency: "BRL";
  materialsIncluded: boolean;
  laborIncluded: boolean;
  estimatedHours: number;
  actualHours: number;
  sector: string;
  estimator: string;
  observations: string;
  serviceStatus: string;
  source: string;
  sourcePath: string;
  sourceReference: string;
  importedAt: string;
  importedBy: string;
  reliability: "Alta" | "Media" | "Baixa";
  reviewStatus: ServiceReviewStatus;
  hasAttachments: boolean;
  local: string;
  material: string;
};

export type Vessel = {
  id: string;
  name: string;
  previousName?: string;
  type: string;
  currentShipowner: string;
  previousShipowners: string[];
  registration: string;
  imo?: string;
  dimensions: string;
  builtYear: number;
  observations: string;
};

export type Shipowner = {
  id: string;
  legalName: string;
  tradeName: string;
  cnpj: string;
  contacts: string[];
  internalStatus: "Ativo" | "Em revisao" | "Inativo";
  observations: string;
};

export type QuoteStatus =
  | "Rascunho"
  | "Em analise"
  | "Aguardando aprovacao"
  | "Aprovado internamente"
  | "Enviado ao cliente"
  | "Aprovado pelo cliente"
  | "Rejeitado"
  | "Cancelado"
  | "Convertido em servico";

export type Quote = {
  id: string;
  number: string;
  shipowner: string;
  vessel: string;
  responsible: string;
  createdAt: string;
  validUntil: string;
  status: QuoteStatus;
  serviceTotal: number;
  materialTotal: number;
  taxes: number;
  discount: number;
  margin: number;
  total: number;
  items: QuoteItem[];
};

export type QuoteItem = {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  value: number;
  historicalServiceId?: string;
  historicalOriginalValue?: number;
};

export type AppUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
};
