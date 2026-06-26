import { GripVertical, Plus } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { categories, serviceRecords } from "@/lib/demo-data";

export default function CategoriesPage() {
  return (
    <AppShell>
      <PageHeader title="Categorias" description="Estrutura flexivel de categorias e subcategorias, preparada para reorganizacao por administradores." actions={<Button><Plus className="h-4 w-4" />Nova categoria</Button>} />
      <div className="grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-3 lg:p-6">
        {categories.map((category) => (
          <article key={category} className="flex items-center gap-3 rounded-md border border-[#d8e1ec] bg-white p-4 shadow-sm">
            <GripVertical className="h-5 w-5 text-[#607086]" />
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-[#123c72]">{category}</div>
              <div className="text-sm text-[#607086]">Subcategorias editaveis pelo administrador</div>
            </div>
            <Badge className="bg-[#f7efd3] text-[#7a5200]">{serviceRecords.filter((item) => item.category === category).length}</Badge>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
