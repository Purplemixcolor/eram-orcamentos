"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, GripVertical, Pencil, Plus, Power, Save, Trash2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { Select } from "@/components/ui/select";
import { categories as defaultCategories, serviceRecords } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

type ManagedCategory = {
  id: string;
  name: string;
  group: string;
  active: boolean;
  subcategories: string[];
};

const STORAGE_KEY = "eram_categories_admin";

function slug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function initialCategories(): ManagedCategory[] {
  return defaultCategories.map((category, index) => ({
    id: `${slug(category)}-${index}`,
    name: category,
    group: groupForCategory(category),
    active: true,
    subcategories: ["Preventiva", "Corretiva", "Fabricacao", "Substituicao"]
  }));
}

function groupForCategory(category: string) {
  if (["Casco", "Conves", "Docagem", "Estruturas metalicas", "Soldagem", "Pintura e tratamento"].includes(category)) return "Estrutura e docagem";
  if (category.startsWith("Sistema")) return "Sistemas de bordo";
  if (["Cozinha", "Alojamentos", "Marcenaria"].includes(category)) return "Habitabilidade";
  if (["Inspecoes", "Ensaios"].includes(category)) return "Controle e qualidade";
  return "Servicos gerais";
}

export function CategoriesManager() {
  const [items, setItems] = useState<ManagedCategory[]>(initialCategories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ name: "", group: "", subcategories: "" });
  const [message, setMessage] = useState("");
  const groups = useMemo(() => Array.from(new Set(items.map((item) => item.group))).sort(), [items]);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const saved = JSON.parse(raw) as ManagedCategory[];
      if (Array.isArray(saved)) setItems(saved);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function beginEdit(item: ManagedCategory) {
    setEditingId(item.id);
    setDraft({ name: item.name, group: item.group, subcategories: item.subcategories.join(", ") });
    setMessage("");
  }

  function saveEdit(id: string) {
    const name = draft.name.trim();
    const group = draft.group.trim() || "Servicos gerais";
    if (!name) {
      setMessage("Informe o nome da categoria.");
      return;
    }
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              name,
              group,
              subcategories: draft.subcategories.split(",").map((value) => value.trim()).filter(Boolean)
            }
          : item
      )
    );
    setEditingId(null);
    setMessage("Categoria atualizada.");
  }

  function addCategory() {
    const name = "Nova categoria";
    const id = `${slug(name)}-${Date.now()}`;
    const item = { id, name, group: "Servicos gerais", active: true, subcategories: [] };
    setItems((current) => [item, ...current]);
    beginEdit(item);
  }

  function toggleActive(id: string) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, active: !item.active } : item)));
    setMessage("Situacao da categoria atualizada.");
  }

  function removeCategory(id: string) {
    const item = items.find((category) => category.id === id);
    const usage = item ? serviceRecords.filter((record) => record.category === item.name).length : 0;
    if (usage > 0) {
      setMessage("Categoria com registros vinculados foi desativada em vez de removida.");
      setItems((current) => current.map((category) => (category.id === id ? { ...category, active: false } : category)));
      return;
    }
    setItems((current) => current.filter((category) => category.id !== id));
    setMessage("Categoria removida.");
  }

  function resetCategories() {
    setItems(initialCategories());
    setEditingId(null);
    setMessage("Categorias restauradas para o padrao inicial.");
  }

  return (
    <>
      <PageHeader
        title="Categorias"
        description="Crie, edite, agrupe e desative categorias para organizar o catalogo de servicos."
        actions={
          <>
            <Button type="button" variant="secondary" onClick={resetCategories}><X className="h-4 w-4" />Restaurar</Button>
            <Button type="button" onClick={addCategory}><Plus className="h-4 w-4" />Nova categoria</Button>
          </>
        }
      />
      <div className="space-y-4 p-4">
        {message ? <div className="rounded-md border border-[#c7d3e2] bg-white px-4 py-3 text-sm font-semibold text-[#123c72]">{message}</div> : null}
        <section className="grid gap-3 md:grid-cols-3">
          <div className="rounded-md border border-[#d8e1ec] bg-white p-4 shadow-sm">
            <div className="text-2xl font-bold text-[#0b2e59]">{items.length}</div>
            <div className="text-sm text-[#607086]">Categorias cadastradas</div>
          </div>
          <div className="rounded-md border border-[#d8e1ec] bg-white p-4 shadow-sm">
            <div className="text-2xl font-bold text-[#0b2e59]">{items.filter((item) => item.active).length}</div>
            <div className="text-sm text-[#607086]">Categorias ativas</div>
          </div>
          <div className="rounded-md border border-[#d8e1ec] bg-white p-4 shadow-sm">
            <div className="text-2xl font-bold text-[#0b2e59]">{groups.length}</div>
            <div className="text-sm text-[#607086]">Grupos de organizacao</div>
          </div>
        </section>

        <section className="overflow-hidden rounded-md border border-[#d8e1ec] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="border-b border-[#d8e1ec] bg-[#f8fafc] text-xs uppercase text-[#607086]">
                <tr>
                  <th className="w-10 px-3 py-3" />
                  <th>Categoria</th>
                  <th>Grupo</th>
                  <th>Subcategorias</th>
                  <th>Registros</th>
                  <th>Situacao</th>
                  <th className="text-right">Acoes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf2f7]">
                {items.map((item) => {
                  const usage = serviceRecords.filter((record) => record.category === item.name).length;
                  const editing = editingId === item.id;
                  return (
                    <tr key={item.id} className={cn(!item.active && "bg-[#f8fafc] text-[#607086]")}>
                      <td className="px-3 py-3"><GripVertical className="h-4 w-4 text-[#607086]" /></td>
                      <td className="py-3">
                        {editing ? <Input value={draft.name} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} aria-label="Nome da categoria" /> : <span className="font-semibold text-[#123c72]">{item.name}</span>}
                      </td>
                      <td>
                        {editing ? (
                          <Input value={draft.group} onChange={(event) => setDraft((current) => ({ ...current, group: event.target.value }))} list="category-groups" aria-label="Grupo da categoria" />
                        ) : (
                          item.group
                        )}
                      </td>
                      <td className="max-w-[340px]">
                        {editing ? (
                          <Input value={draft.subcategories} onChange={(event) => setDraft((current) => ({ ...current, subcategories: event.target.value }))} aria-label="Subcategorias separadas por virgula" />
                        ) : (
                          <span className="line-clamp-1 text-[#607086]">{item.subcategories.length ? item.subcategories.join(", ") : "Sem subcategorias"}</span>
                        )}
                      </td>
                      <td><Badge className="bg-[#f7efd3] text-[#7a5200]">{usage}</Badge></td>
                      <td>
                        <Badge className={item.active ? "bg-[#e4f5eb] text-[#146c3f]" : "bg-[#e8eef6] text-[#607086]"}>
                          {item.active ? "Ativa" : "Inativa"}
                        </Badge>
                      </td>
                      <td className="text-right">
                        <div className="flex justify-end gap-2">
                          {editing ? (
                            <>
                              <Button type="button" className="h-9 px-3" onClick={() => saveEdit(item.id)}><Save className="h-4 w-4" />Salvar</Button>
                              <Button type="button" variant="secondary" className="h-9 px-3" onClick={() => setEditingId(null)}><X className="h-4 w-4" />Cancelar</Button>
                            </>
                          ) : (
                            <>
                              <Button type="button" variant="secondary" className="h-9 px-3" onClick={() => beginEdit(item)}><Pencil className="h-4 w-4" />Editar</Button>
                              <Button type="button" variant="ghost" className="h-9 px-3" onClick={() => toggleActive(item.id)}>{item.active ? <Power className="h-4 w-4" /> : <Check className="h-4 w-4" />}{item.active ? "Desativar" : "Ativar"}</Button>
                              <Button type="button" variant="danger" className="h-9 px-3" onClick={() => removeCategory(item.id)}><Trash2 className="h-4 w-4" />Excluir</Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
        <datalist id="category-groups">
          {groups.map((group) => <option key={group} value={group} />)}
        </datalist>
      </div>
    </>
  );
}
