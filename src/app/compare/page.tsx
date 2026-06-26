import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { serviceRecords } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export default function ComparePage() {
  const selected = serviceRecords.slice(0, 5);
  const values = selected.map((item) => item.originalTotalValue).sort((a, b) => a - b);
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  const median = values[Math.floor(values.length / 2)];
  const latest = selected.reduce((recent, item) => item.year > recent.year ? item : recent, selected[0]);

  return (
    <AppShell>
      <PageHeader title="Comparacao de servicos" description="Compare registros semelhantes sem alterar automaticamente qualquer orcamento." />
      <div className="space-y-4 p-4 lg:p-6">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            ["Menor valor", formatCurrency(values[0])],
            ["Maior valor", formatCurrency(values[values.length - 1])],
            ["Media", formatCurrency(average)],
            ["Mediana", formatCurrency(median)],
            ["Registro mais recente", `${latest.year} - ${latest.vessel}`]
          ].map(([label, value]) => (
            <div key={label} className="rounded-md border border-[#d8e1ec] bg-white p-4 shadow-sm">
              <div className="text-sm text-[#607086]">{label}</div>
              <div className="mt-2 text-xl font-bold text-[#0b2e59]">{value}</div>
            </div>
          ))}
        </section>
        <section className="overflow-hidden rounded-md border border-[#d8e1ec] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="border-b border-[#d8e1ec] bg-[#f8fafc] text-xs uppercase text-[#607086]">
                <tr><th className="px-4 py-3">Descricao</th><th>Ano</th><th>Embarcacao</th><th>Armador</th><th>Qtd.</th><th>Un.</th><th className="text-right">Unitario</th><th className="text-right">Total</th><th>Materiais</th><th>Horas</th><th>Fonte</th><th>Revisao</th></tr>
              </thead>
              <tbody className="divide-y divide-[#edf2f7]">
                {selected.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 font-semibold text-[#123c72]">{item.title}</td>
                    <td>{item.year}</td><td>{item.vessel}</td><td>{item.shipowner}</td><td>{item.quantity}</td><td>{item.unit}</td>
                    <td className="text-right">{formatCurrency(item.originalUnitValue)}</td>
                    <td className="text-right font-semibold">{formatCurrency(item.originalTotalValue)}</td>
                    <td>{item.materialsIncluded ? "Incluidos" : "Nao incluidos"}</td>
                    <td>{item.actualHours} h</td><td>{item.source}</td>
                    <td><Badge className="bg-[#e8eef6] text-[#123c72]">{item.reviewStatus}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <p className="text-sm text-[#607086]">Os valores exibidos sao referencias historicas. Ajustes, margens e valores finais devem ser definidos no orcamento.</p>
      </div>
    </AppShell>
  );
}
