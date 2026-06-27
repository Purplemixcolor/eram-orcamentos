import Link from "next/link";
import { AlertTriangle, Database, FileText, Ship, Users } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { auditLogs, categories, importJobs, quotes, serviceRecords, shipowners, vessels } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  const reviewCount = serviceRecords.filter((item) => item.reviewStatus !== "APPROVED").length;
  const topCategories = categories
    .map((category) => ({
      category,
      count: serviceRecords.filter((item) => item.category === category).length
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
  const byYear = Array.from(new Set(serviceRecords.map((item) => item.year))).sort().map((year) => ({
    year,
    count: serviceRecords.filter((item) => item.year === year).length
  }));
  const maxYearCount = Math.max(...byYear.map((item) => item.count), 1);

  return (
    <AppShell>
      <PageHeader
        title="Visao geral"
        description="Indicadores operacionais da base historica, orcamentos e importacoes em andamento."
        actions={<Link href="/search" className="focus-ring inline-flex h-10 items-center justify-center rounded-md border border-[#b9c8da] bg-white px-4 text-sm font-semibold text-[#123c72] hover:bg-[#f2f6fb]">Pesquisar historico</Link>}
      />
      <div className="space-y-4 p-4">
        <section className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          {[
            { label: "Servicos cadastrados", value: serviceRecords.length, icon: Database },
            { label: "Embarcacoes", value: vessels.length, icon: Ship },
            { label: "Armadores", value: shipowners.length, icon: Users },
            { label: "Orcamentos em elaboracao", value: quotes.filter((quote) => ["Rascunho", "Em analise"].includes(quote.status)).length, icon: FileText },
            { label: "Registros importados", value: importJobs.reduce((sum, item) => sum + item.accepted, 0).toLocaleString("pt-BR"), icon: Database },
            { label: "Precisam de revisao", value: reviewCount, icon: AlertTriangle, alert: true }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.label} className="rounded-md border border-[#d8e1ec] bg-white p-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <Icon className={item.alert ? "h-5 w-5 text-[#b7791f]" : "h-5 w-5 text-[#1e5a8a]"} />
                  {item.alert ? <Badge className="bg-[#fff5d6] text-[#7a5200]">Revisar</Badge> : null}
                </div>
                <div className="mt-3 text-2xl font-bold text-[#0b2e59]">{item.value}</div>
                <div className="mt-1 text-sm text-[#607086]">{item.label}</div>
              </article>
            );
          })}
        </section>

        <section className="grid gap-4 xl:grid-cols-[1fr_0.8fr]">
          <div className="rounded-md border border-[#d8e1ec] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#0b2e59]">Orcamentos recentes</h2>
              <Link href="/quotes" className="text-sm font-semibold text-[#224f9a]">Ver todos</Link>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="border-b border-[#d8e1ec] text-xs uppercase text-[#607086]">
                  <tr><th className="py-2">Numero</th><th>Armador</th><th>Embarcacao</th><th>Status</th><th className="text-right">Total</th></tr>
                </thead>
                <tbody className="divide-y divide-[#edf2f7]">
                  {quotes.map((quote) => (
                    <tr key={quote.id}>
                      <td className="py-3 font-semibold text-[#123c72]">{quote.number}</td>
                      <td>{quote.shipowner}</td>
                      <td>{quote.vessel}</td>
                      <td><Badge className="bg-[#e8eef6] text-[#123c72]">{quote.status}</Badge></td>
                      <td className="text-right font-semibold">{formatCurrency(quote.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-md border border-[#d8e1ec] bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-[#0b2e59]">Servicos por periodo</h2>
            <div className="mt-4 space-y-2">
              {byYear.map((item) => (
                <div key={item.year} className="grid grid-cols-[56px_1fr_32px] items-center gap-3 text-sm">
                  <span className="font-semibold text-[#123c72]">{item.year}</span>
                  <span className="h-2 rounded bg-[#e6edf5]"><span className="block h-2 rounded bg-[#1e5a8a]" style={{ width: `${Math.max((item.count / maxYearCount) * 100, 8)}%` }} /></span>
                  <span className="text-right text-[#607086]">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
          <div className="rounded-md border border-[#d8e1ec] bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-[#0b2e59]">Servicos mais consultados</h2>
            <div className="mt-3 space-y-2">
              {serviceRecords.slice(0, 5).map((service) => (
                <Link key={service.id} href={service.id.startsWith("cat-") ? "/search" : `/services/${service.id}`} className="focus-ring block rounded border border-[#edf2f7] p-2.5 hover:bg-[#f8fafc]">
                  <div className="line-clamp-1 font-semibold text-[#123c72]">{service.title}</div>
                  <div className="mt-1 text-xs text-[#607086]">{service.vessel} - {service.year} - {formatCurrency(service.originalTotalValue)}</div>
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-md border border-[#d8e1ec] bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-[#0b2e59]">Categorias mais utilizadas</h2>
            <div className="mt-3 space-y-2">
              {topCategories.map((item) => (
                <div key={item.category} className="flex items-center justify-between rounded border border-[#edf2f7] px-3 py-1.5 text-sm">
                  <span>{item.category}</span>
                  <Badge className="bg-[#f7efd3] text-[#7a5200]">{item.count}</Badge>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-md border border-[#d8e1ec] bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-[#0b2e59]">Atividade recente de importacao</h2>
            <div className="mt-3 space-y-2">
              {importJobs.map((job) => (
                <div key={job.id} className="rounded border border-[#edf2f7] p-3">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span>{job.source}</span><span>{job.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded bg-[#e6edf5]"><div className="h-2 rounded bg-[#1e5a8a]" style={{ width: `${job.progress}%` }} /></div>
                  <div className="mt-2 text-xs text-[#607086]">{job.accepted.toLocaleString("pt-BR")} aceitos, {job.rejected} rejeitados, {job.duplicates} duplicados</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-md border border-[#d8e1ec] bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-[#0b2e59]">Auditoria recente</h2>
          <div className="mt-3 grid gap-2 md:grid-cols-2 xl:grid-cols-4">
            {auditLogs.map((log) => (
              <div key={log.id} className="rounded border border-[#edf2f7] p-3 text-sm">
                <div className="font-semibold text-[#123c72]">{log.action}</div>
                <div className="mt-1 text-[#607086]">{log.user} - {log.createdAt}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
