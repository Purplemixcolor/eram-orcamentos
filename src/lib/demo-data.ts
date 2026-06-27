import type { AppUser, Quote, ServiceRecord, Shipowner, Vessel } from "@/lib/types";
import officialServiceRecords from "@/lib/official-service-records.json";

export const categories = [
  "Sistema de governo",
  "Estrutura de empurramento",
  "Sala de maquinas",
  "Sistema de propulsao",
  "Sistema eletrico",
  "Sistema hidraulico",
  "Sistema de combustivel",
  "Sistema de refrigeracao",
  "Sistema de esgoto",
  "Sistema de agua potavel",
  "Sistema de combate a incendio",
  "Conves",
  "Casco",
  "Estruturas metalicas",
  "Soldagem",
  "Tubulacao",
  "Pintura e tratamento",
  "Cozinha",
  "Alojamentos",
  "Marcenaria",
  "Equipamentos de navegacao",
  "Equipamentos de seguranca",
  "Docagem",
  "Inspecoes",
  "Ensaios",
  "Servicos gerais"
];

export const shipowners: Shipowner[] = [
  {
    id: "arm-001",
    legalName: "Navegacao Rio Norte Ltda.",
    tradeName: "Rio Norte",
    cnpj: "12.345.678/0001-10",
    contacts: ["operacoes@rionorte.example", "(92) 3000-1000"],
    internalStatus: "Ativo",
    observations: "Cliente ficticio usado para demonstracao."
  },
  {
    id: "arm-002",
    legalName: "Amazonas Cargas Fluviais S.A.",
    tradeName: "ACF",
    cnpj: "23.456.789/0001-21",
    contacts: ["compras@acf.example"],
    internalStatus: "Ativo",
    observations: "Possui frota de empurradores e balsas."
  },
  {
    id: "arm-003",
    legalName: "Solimoes Transporte Naval Ltda.",
    tradeName: "Solimoes Naval",
    cnpj: "34.567.890/0001-32",
    contacts: ["manutencao@solimoes.example"],
    internalStatus: "Em revisao",
    observations: "Cadastro com contatos pendentes de validacao."
  },
  {
    id: "arm-004",
    legalName: "Madeira Logistica Hidroviaria Ltda.",
    tradeName: "Madeira Log",
    cnpj: "45.678.901/0001-43",
    contacts: ["orcamentos@madeiralog.example"],
    internalStatus: "Ativo",
    observations: "Demanda recorrente de docagem."
  }
];

export const vessels: Vessel[] = [
  {
    id: "emb-001",
    name: "MV Aruana",
    previousName: "Aruana I",
    type: "Empurrador",
    currentShipowner: "Rio Norte",
    previousShipowners: ["Solimoes Naval"],
    registration: "RN-2045",
    imo: "IMO 9400001",
    dimensions: "32m x 9m x 2,8m",
    builtYear: 2012,
    observations: "Historico de intervenções no sistema de governo."
  },
  {
    id: "emb-002",
    name: "Balsa Jutai",
    type: "Balsa graneleira",
    currentShipowner: "ACF",
    previousShipowners: [],
    registration: "ACF-7712",
    dimensions: "61m x 14m x 3,1m",
    builtYear: 2016,
    observations: "Servicos de casco e pintura recorrentes."
  },
  {
    id: "emb-003",
    name: "NM Tucuma",
    type: "Navio misto",
    currentShipowner: "Solimoes Naval",
    previousShipowners: ["Rio Norte"],
    registration: "SN-3108",
    dimensions: "48m x 11m x 3,4m",
    builtYear: 2009,
    observations: "Registro de alojamentos e cozinha."
  },
  {
    id: "emb-004",
    name: "EP Madeira Forte",
    type: "Empurrador",
    currentShipowner: "Madeira Log",
    previousShipowners: [],
    registration: "ML-8881",
    imo: "IMO 9400004",
    dimensions: "35m x 10m x 3m",
    builtYear: 2018,
    observations: "Equipamentos de navegacao revisados em 2025."
  },
  {
    id: "emb-005",
    name: "Balsa Manacapuru",
    type: "Balsa tanque",
    currentShipowner: "Rio Norte",
    previousShipowners: ["Madeira Log"],
    registration: "RN-9014",
    dimensions: "58m x 13m x 3m",
    builtYear: 2014,
    observations: "Atencao ao sistema de combustivel."
  }
];

const serviceNames = [
  "Substituicao de chapa do casco",
  "Reparo de eixo propulsor",
  "Tratamento e pintura de conves",
  "Revisao de bomba hidraulica",
  "Instalacao de luminarias LED",
  "Fabricacao de suporte metalico",
  "Reparo de tubulacao de combustivel",
  "Manutencao de quadro eletrico",
  "Soldagem de reforco estrutural",
  "Docagem com limpeza de casco"
];

const demoServiceRecords: ServiceRecord[] = Array.from({ length: 40 }, (_, index) => {
  const vessel = vessels[index % vessels.length];
  const owner = shipowners.find((item) => item.tradeName === vessel.currentShipowner) ?? shipowners[0];
  const category = categories[(index * 3) % categories.length];
  const year = 2016 + (index % 10);
  const quantity = [1, 2, 4, 8, 12, 18][index % 6];
  const unit = ["un", "m", "m2", "h", "kg", "servico"][index % 6];
  const unitValue = 850 + index * 337 + (index % 4) * 920;

  return {
    id: `srv-${String(index + 1).padStart(3, "0")}`,
    internalCode: `ERAM-HIST-${String(index + 1).padStart(5, "0")}`,
    title: serviceNames[index % serviceNames.length],
    description: `${serviceNames[index % serviceNames.length]} realizado em ${vessel.name}, com registro historico ficticio para comparacao de valores e rastreabilidade.`,
    category,
    subcategory: ["Preventiva", "Corretiva", "Fabricacao", "Substituicao"][index % 4],
    keywords: [category, vessel.type, "manutencao", unit],
    vessel: vessel.name,
    vesselType: vessel.type,
    shipowner: owner.tradeName,
    year,
    executionDate: `${year}-0${(index % 9) + 1}-15`,
    quoteDate: `${year}-0${(index % 9) + 1}-02`,
    quoteNumber: `ORC-${year}-${String(index + 11).padStart(4, "0")}`,
    workOrderNumber: `OS-${year}-${String(index + 42).padStart(4, "0")}`,
    quantity,
    unit,
    originalUnitValue: unitValue,
    originalTotalValue: unitValue * quantity,
    currency: "BRL",
    materialsIncluded: index % 2 === 0,
    laborIncluded: true,
    estimatedHours: 12 + index * 2,
    actualHours: 10 + index * 2 + (index % 5),
    sector: ["Mecanica", "Eletrica", "Caldeiraria", "Pintura", "Acabamento"][index % 5],
    estimator: ["Marcos Lima", "Ana Costa", "Rafael Nunes", "Clara Moura"][index % 4],
    observations: index % 7 === 0 ? "Registro importado com unidade pendente de confirmacao." : "Registro consistente para consulta historica.",
    serviceStatus: ["Executado", "Aprovado", "Concluido"][index % 3],
    source: index % 3 === 0 ? "Rasnick" : index % 3 === 1 ? "Planilha historica" : "Arquivo JSON",
    sourcePath: `/fontes/ficticias/${year}/orcamento-${index + 1}.pdf`,
    sourceReference: `pagina ${1 + (index % 8)}, item ${index + 1}`,
    importedAt: `2026-06-${String(1 + (index % 20)).padStart(2, "0")}T10:00:00.000Z`,
    importedBy: ["Administrador ERAM", "Revisor ERAM"][index % 2],
    reliability: index % 9 === 0 ? "Baixa" : index % 4 === 0 ? "Media" : "Alta",
    reviewStatus: index % 9 === 0 ? "INCOMPLETE" : index % 8 === 0 ? "DUPLICATE" : index % 5 === 0 ? "PENDING" : "APPROVED",
    hasAttachments: index % 3 !== 0,
    local: ["Casco", "Conves", "Sala de maquinas", "Popa", "Proa"][index % 5],
    material: ["Aco naval", "Tinta epoxi", "Cabo eletrico", "Tubo carbono", "Conjunto mecanico"][index % 5]
  };
});

export const serviceRecords: ServiceRecord[] = [...(officialServiceRecords as ServiceRecord[]), ...demoServiceRecords];

export const quotes: Quote[] = [
  {
    id: "quo-001",
    number: "ORC-2026-0001",
    shipowner: "Rio Norte",
    vessel: "MV Aruana",
    responsible: "Ana Costa",
    createdAt: "2026-06-03",
    validUntil: "2026-07-03",
    status: "Rascunho",
    serviceTotal: 68000,
    materialTotal: 22000,
    taxes: 7200,
    discount: 1500,
    margin: 18,
    total: 95700,
    items: [
      {
        id: "qit-001",
        description: "Substituicao de chapa do casco",
        quantity: 12,
        unit: "m2",
        value: 4800,
        historicalServiceId: "srv-001",
        historicalOriginalValue: serviceRecords[0].originalTotalValue
      }
    ]
  },
  {
    id: "quo-002",
    number: "ORC-2026-0002",
    shipowner: "ACF",
    vessel: "Balsa Jutai",
    responsible: "Marcos Lima",
    createdAt: "2026-06-07",
    validUntil: "2026-07-07",
    status: "Em analise",
    serviceTotal: 42000,
    materialTotal: 14000,
    taxes: 4480,
    discount: 0,
    margin: 15,
    total: 60480,
    items: []
  },
  {
    id: "quo-003",
    number: "ORC-2026-0003",
    shipowner: "Solimoes Naval",
    vessel: "NM Tucuma",
    responsible: "Rafael Nunes",
    createdAt: "2026-06-11",
    validUntil: "2026-07-11",
    status: "Aguardando aprovacao",
    serviceTotal: 31000,
    materialTotal: 9000,
    taxes: 3200,
    discount: 800,
    margin: 12,
    total: 42400,
    items: []
  },
  {
    id: "quo-004",
    number: "ORC-2026-0004",
    shipowner: "Madeira Log",
    vessel: "EP Madeira Forte",
    responsible: "Clara Moura",
    createdAt: "2026-06-15",
    validUntil: "2026-07-15",
    status: "Enviado ao cliente",
    serviceTotal: 77000,
    materialTotal: 33000,
    taxes: 8800,
    discount: 2500,
    margin: 20,
    total: 116300,
    items: []
  },
  {
    id: "quo-005",
    number: "ORC-2026-0005",
    shipowner: "Rio Norte",
    vessel: "Balsa Manacapuru",
    responsible: "Ana Costa",
    createdAt: "2026-06-20",
    validUntil: "2026-07-20",
    status: "Aprovado internamente",
    serviceTotal: 59000,
    materialTotal: 19500,
    taxes: 6280,
    discount: 0,
    margin: 16,
    total: 84780,
    items: []
  }
];

export const users: AppUser[] = [
  { id: "usr-001", name: "Administrador ERAM", email: "admin@eram.local", role: "ADMIN", active: true },
  { id: "usr-002", name: "Orcamentista ERAM", email: "orcamentista@eram.local", role: "ORCAMENTISTA", active: true },
  { id: "usr-003", name: "Revisor ERAM", email: "revisor@eram.local", role: "REVISOR", active: true },
  { id: "usr-004", name: "Consulta ERAM", email: "consulta@eram.local", role: "CONSULTA", active: true }
];

export const importJobs = [
  { id: "imp-001", source: "rasnick/lote-2019", status: "Processando", progress: 68, accepted: 48210, rejected: 341, duplicates: 928 },
  { id: "imp-002", source: "planilhas/2024-servicos.xlsx", status: "Concluido", progress: 100, accepted: 1220, rejected: 18, duplicates: 44 },
  { id: "imp-003", source: "json/orcamentos-legados", status: "Pausado", progress: 36, accepted: 8410, rejected: 91, duplicates: 230 }
];

export const auditLogs = [
  { id: "aud-001", user: "Administrador ERAM", action: "Criou usuario", target: "usr-004", createdAt: "2026-06-22 09:14", origin: "web" },
  { id: "aud-002", user: "Revisor ERAM", action: "Aprovou registro", target: "srv-018", createdAt: "2026-06-22 11:40", origin: "web" },
  { id: "aud-003", user: "Orcamentista ERAM", action: "Criou orcamento", target: "ORC-2026-0005", createdAt: "2026-06-23 15:02", origin: "web" },
  { id: "aud-004", user: "Sistema", action: "Importacao pausada", target: "imp-003", createdAt: "2026-06-24 08:33", origin: "worker" }
];
