import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/ui/page-header";
import { ImportManager } from "@/features/imports/import-manager";

export default function ImportsPage() {
  return (
    <AppShell>
      <PageHeader title="Importacoes" description="Fluxo administrativo para importar CSV, XLSX, JSON, texto estruturado e futuras fontes Rasnick em lotes." />
      <ImportManager />
    </AppShell>
  );
}
