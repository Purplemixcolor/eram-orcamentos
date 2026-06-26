import { Plus } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { QuoteWorkbench } from "@/features/quotes/quote-workbench";

export default function QuotesPage() {
  return (
    <AppShell>
      <PageHeader title="Orcamentos" description="Criacao, versionamento e acompanhamento de orcamentos com referencias historicas preservadas." actions={<Button><Plus className="h-4 w-4" />Novo orcamento</Button>} />
      <QuoteWorkbench />
    </AppShell>
  );
}
