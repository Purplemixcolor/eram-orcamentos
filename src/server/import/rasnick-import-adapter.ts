export type ImportPreviewRow = Record<string, string | number | boolean | null>;

export type ImportAdapter = {
  preview(source: string): Promise<ImportPreviewRow[]>;
  processBatch(source: string, batchSize: number): Promise<{ accepted: number; rejected: number; duplicates: number }>;
};

export class RasnickImportAdapter implements ImportAdapter {
  async preview(source: string) {
    return [
      {
        source,
        titulo: "Servico legado ficticio",
        embarcacao: "MV Aruana",
        ano: 2021,
        valor_total: 18300
      }
    ];
  }

  async processBatch(_source: string, batchSize: number) {
    return {
      accepted: Math.max(batchSize - 3, 0),
      rejected: 1,
      duplicates: 2
    };
  }
}
