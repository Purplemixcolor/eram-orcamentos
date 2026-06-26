import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/page-header";
import { quotes, serviceRecords, shipowners, vessels } from "@/lib/demo-data";

export default function ShipownersPage() {
  return (
    <AppShell>
      <PageHeader title="Armadores" description="Empresas armadoras, contatos e relacao com embarcacoes e orcamentos." actions={<Button>Novo armador</Button>} />
      <div className="p-4 lg:p-6">
        <DataTable headers={["Razao social", "Nome fantasia", "CNPJ", "Situacao", "Embarcacoes", "Servicos", "Orcamentos", "Acoes"]}>
          {shipowners.map((owner) => (
            <tr key={owner.id}>
              <td className="px-4 py-3 font-semibold text-[#123c72]">{owner.legalName}</td>
              <td>{owner.tradeName}</td>
              <td>{owner.cnpj}</td>
              <td><Badge className="bg-[#e8eef6] text-[#123c72]">{owner.internalStatus}</Badge></td>
              <td>{vessels.filter((item) => item.currentShipowner === owner.tradeName).length}</td>
              <td>{serviceRecords.filter((item) => item.shipowner === owner.tradeName).length}</td>
              <td>{quotes.filter((item) => item.shipowner === owner.tradeName).length}</td>
              <td><Link href={`/search?shipowner=${encodeURIComponent(owner.tradeName)}`} className="font-semibold text-[#224f9a]">Ver servicos</Link></td>
            </tr>
          ))}
        </DataTable>
      </div>
    </AppShell>
  );
}
