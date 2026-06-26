import { AppShell } from "@/components/layout/app-shell";
import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/page-header";
import { auditLogs } from "@/lib/demo-data";

export default function AuditPage() {
  return (
    <AppShell>
      <PageHeader title="Historico e auditoria" description="Registro permanente das operacoes relevantes, com usuario, acao, data, alvo e origem." />
      <div className="p-4 lg:p-6">
        <DataTable headers={["Usuario", "Acao", "Registro", "Data", "Origem"]}>
          {auditLogs.map((log) => (
            <tr key={log.id}>
              <td className="px-4 py-3 font-semibold text-[#123c72]">{log.user}</td>
              <td>{log.action}</td>
              <td>{log.target}</td>
              <td>{log.createdAt}</td>
              <td>{log.origin}</td>
            </tr>
          ))}
        </DataTable>
      </div>
    </AppShell>
  );
}
