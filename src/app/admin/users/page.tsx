import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/page-header";
import { users } from "@/lib/demo-data";

export default function UsersPage() {
  return (
    <AppShell>
      <PageHeader title="Administracao de usuarios" description="Usuarios sao criados por administradores. Nao ha cadastro publico." actions={<Button>Novo usuario</Button>} />
      <div className="p-4 lg:p-6">
        <DataTable headers={["Nome", "E-mail", "Perfil", "Status", "Permissoes"]}>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-3 font-semibold text-[#123c72]">{user.name}</td>
              <td>{user.email}</td>
              <td><Badge className="bg-[#e8eef6] text-[#123c72]">{user.role}</Badge></td>
              <td>{user.active ? "Ativo" : "Inativo"}</td>
              <td className="text-[#607086]">{user.role === "ADMIN" ? "Acesso completo" : user.role === "CONSULTA" ? "Somente leitura" : "Operacoes do perfil"}</td>
            </tr>
          ))}
        </DataTable>
      </div>
    </AppShell>
  );
}
