import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/ui/page-header";
import { ServiceSearch } from "@/features/search/service-search";

export default function SearchPage() {
  return (
    <AppShell>
      <PageHeader title="Pesquisa de servicos" description="Consulte valores historicos, documentos de origem, categorias, embarcacoes e armadores com filtros combinados." />
      <div className="p-4 lg:p-6">
        <ServiceSearch />
      </div>
    </AppShell>
  );
}
