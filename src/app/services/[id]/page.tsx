import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ExternalLink, FileText, GitCompare, Plus } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { serviceRecords } from "@/lib/demo-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getServiceById } from "@/server/search/search-service";

export function generateStaticParams() {
  return serviceRecords.filter((service) => !service.id.startsWith("cat-")).map((service) => ({ id: service.id }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = getServiceById(id);
  if (!service) notFound();

  const similar = serviceRecords
    .filter((item) => item.id !== service.id && (item.category === service.category || item.vessel === service.vessel || item.shipowner === service.shipowner))
    .slice(0, 6);
  const oldValue = new Date().getFullYear() - service.year >= 5;

  return (
    <AppShell>
      <PageHeader
        title={service.title}
        description={`${service.internalCode} - ${service.category} - ${service.vessel}`}
        actions={
          <>
            <Button variant="secondary"><GitCompare className="h-4 w-4" />Comparar valores</Button>
            <Button><Plus className="h-4 w-4" />Adicionar ao orcamento</Button>
          </>
        }
      />
      <div className="grid gap-4 p-4 lg:grid-cols-[1fr_360px] lg:p-6">
        <section className="space-y-4">
          <div className="rounded-md border border-[#d8e1ec] bg-white p-5 shadow-sm">
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <div className="text-sm text-[#607086]">Valor historico original</div>
                <div className="mt-1 text-3xl font-bold text-[#0b2e59]">{formatCurrency(service.originalTotalValue)}</div>
              </div>
              <div><div className="text-sm text-[#607086]">Ano</div><div className="mt-1 text-xl font-semibold">{service.year}</div></div>
              <div><div className="text-sm text-[#607086]">Quantidade</div><div className="mt-1 text-xl font-semibold">{service.quantity} {service.unit}</div></div>
              <div><div className="text-sm text-[#607086]">Confiabilidade</div><Badge className="mt-2 bg-[#e8eef6] text-[#123c72]">{service.reliability}</Badge></div>
            </div>
            {(oldValue || service.reviewStatus === "INCOMPLETE") ? (
              <div className="mt-5 flex items-start gap-3 rounded-md border border-[#f3d28b] bg-[#fff9e8] p-3 text-sm text-[#7a5200]">
                <AlertTriangle className="mt-0.5 h-4 w-4" />
                <span>{oldValue ? "Valor antigo: use apenas como referencia historica e avalie atualizacao." : "Registro incompleto: revise antes de usar em novo orcamento."}</span>
              </div>
            ) : null}
          </div>

          <div className="rounded-md border border-[#d8e1ec] bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-[#0b2e59]">Descricao e rastreabilidade</h2>
            <p className="mt-3 leading-7 text-[#32455f]">{service.description}</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {[
                ["Embarcacao", service.vessel],
                ["Tipo da embarcacao", service.vesselType],
                ["Armador", service.shipowner],
                ["Subcategoria", service.subcategory],
                ["Data de execucao", formatDate(service.executionDate)],
                ["Data do orcamento", formatDate(service.quoteDate)],
                ["Numero do orcamento", service.quoteNumber],
                ["Ordem de servico", service.workOrderNumber],
                ["Materiais incluidos", service.materialsIncluded ? "Sim" : "Nao"],
                ["Mao de obra incluida", service.laborIncluded ? "Sim" : "Nao"],
                ["Horas estimadas", `${service.estimatedHours} h`],
                ["Horas realizadas", `${service.actualHours} h`],
                ["Setor responsavel", service.sector],
                ["Responsavel", service.estimator],
                ["Local da embarcacao", service.local],
                ["Material", service.material]
              ].map(([label, value]) => (
                <div key={label} className="rounded border border-[#edf2f7] px-3 py-2 text-sm">
                  <div className="text-xs uppercase text-[#607086]">{label}</div>
                  <div className="mt-1 font-semibold text-[#13233a]">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-[#d8e1ec] bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-[#0b2e59]">Servicos semelhantes</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {similar.map((item) => (
                <Link key={item.id} href={item.id.startsWith("cat-") ? "/search" : `/services/${item.id}`} className="focus-ring rounded border border-[#edf2f7] p-3 hover:bg-[#f8fafc]">
                  <div className="font-semibold text-[#123c72]">{item.title}</div>
                  <div className="mt-1 text-sm text-[#607086]">{item.vessel} - {item.shipowner} - {item.year}</div>
                  <div className="mt-2 font-semibold">{formatCurrency(item.originalTotalValue)}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-md border border-[#d8e1ec] bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-[#0b2e59]">Fonte original</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div><strong>Origem:</strong> {service.source}</div>
              <div><strong>Arquivo:</strong> {service.sourcePath}</div>
              <div><strong>Referencia:</strong> {service.sourceReference}</div>
              <div><strong>Importado em:</strong> {formatDate(service.importedAt)}</div>
              <div><strong>Importado por:</strong> {service.importedBy}</div>
            </div>
            <Button variant="secondary" className="mt-5 w-full"><ExternalLink className="h-4 w-4" />Abrir fonte original</Button>
          </div>
          <div className="rounded-md border border-[#d8e1ec] bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-[#0b2e59]">Documentos relacionados</h2>
            <div className="mt-4 rounded border border-[#edf2f7] p-3 text-sm">
              <FileText className="mb-2 h-5 w-5 text-[#1e5a8a]" />
              {service.hasAttachments ? "Documento historico anexado ao registro." : "Registro sem documento anexado."}
            </div>
          </div>
          <div className="rounded-md border border-[#d8e1ec] bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-[#0b2e59]">Historico de alteracoes</h2>
            <ol className="mt-4 space-y-3 text-sm text-[#607086]">
              <li>Importado de {service.source}</li>
              <li>Classificado como {service.category}</li>
              <li>Status atual: {service.reviewStatus}</li>
            </ol>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
