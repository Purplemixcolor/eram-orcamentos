import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";

export default function SettingsPage() {
  return (
    <AppShell>
      <PageHeader title="Configuracoes" description="Parametros de seguranca, importacao, armazenamento e busca." />
      <div className="grid gap-4 p-4 xl:grid-cols-2 lg:p-6">
        <section className="rounded-md border border-[#d8e1ec] bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-[#0b2e59]">Ambiente</h2>
          <div className="mt-4 space-y-3">
            <label className="block text-sm font-semibold">URL do PostgreSQL<Input className="mt-2" value="Configurado por DATABASE_URL" readOnly /></label>
            <label className="block text-sm font-semibold">Redis<Input className="mt-2" value="Configurado por REDIS_URL" readOnly /></label>
            <label className="block text-sm font-semibold">Armazenamento S3/MinIO<Input className="mt-2" value="Configurado por S3_ENDPOINT" readOnly /></label>
          </div>
        </section>
        <section className="rounded-md border border-[#d8e1ec] bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-[#0b2e59]">Politicas</h2>
          <div className="mt-4 space-y-3 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="h-4 w-4 accent-[#224f9a]" /> Exigir revisao humana para duplicidades</label>
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="h-4 w-4 accent-[#224f9a]" /> Registrar auditoria de alteracoes importantes</label>
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="h-4 w-4 accent-[#224f9a]" /> Preservar valores historicos originais</label>
          </div>
          <Button className="mt-5">Salvar configuracoes</Button>
        </section>
      </div>
    </AppShell>
  );
}
