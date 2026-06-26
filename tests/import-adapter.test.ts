import { describe, expect, it } from "vitest";
import { RasnickImportAdapter } from "@/server/import/rasnick-import-adapter";

describe("RasnickImportAdapter", () => {
  it("previews a source without coupling the UI to Rasnick internals", async () => {
    const adapter = new RasnickImportAdapter();
    const preview = await adapter.preview("rasnick/lote-ficticio");
    expect(preview[0].source).toBe("rasnick/lote-ficticio");
  });

  it("processes batches with accepted, rejected and duplicate counts", async () => {
    const adapter = new RasnickImportAdapter();
    const result = await adapter.processBatch("rasnick/lote-ficticio", 100);
    expect(result.accepted).toBe(97);
    expect(result.rejected).toBe(1);
    expect(result.duplicates).toBe(2);
  });
});
