import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/page-header";
import { vessels, serviceRecords, quotes } from "@/lib/demo-data";

export default function VesselsPage() {
  return (
    <AppShell>
      <PageHeader title="Embarcacoes" description="Cadastro e historico consolidado de servicos por embarcacao." actions={<Button>Nova embarcacao</Button>} />
      <div className="p-4 lg:p-6">
        <DataTable headers={["Nome", "Tipo", "Armador atual", "Registro", "Dimensoes", "Servicos", "Orcamentos", "Acoes"]}>
          {vessels.map((vessel) => (
            <tr key={vessel.id}>
              <td className="px-4 py-3 font-semibold text-[#123c72]">{vessel.name}</td>
              <td>{vessel.type}</td>
              <td>{vessel.currentShipowner}</td>
              <td>{vessel.registration}</td>
              <td>{vessel.dimensions}</td>
              <td>{serviceRecords.filter((item) => item.vessel === vessel.name).length}</td>
              <td>{quotes.filter((item) => item.vessel === vessel.name).length}</td>
              <td><Link href={`/search?vessel=${encodeURIComponent(vessel.name)}`} className="font-semibold text-[#224f9a]">Ver historico</Link></td>
            </tr>
          ))}
        </DataTable>
      </div>
    </AppShell>
  );
}
