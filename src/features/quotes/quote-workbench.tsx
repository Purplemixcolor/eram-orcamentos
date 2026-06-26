"use client";

import { useMemo, useState } from "react";
import { Copy, Plus, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { quotes, serviceRecords, shipowners, vessels } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export function QuoteWorkbench() {
  const firstService = serviceRecords[0];
  const [items, setItems] = useState([{ description: firstService.title, quantity: 1, unit: firstService.unit, value: firstService.originalTotalValue, source: firstService.internalCode }]);
  const total = useMemo(() => items.reduce((sum, item) => sum + item.quantity * item.value, 0), [items]);

  return (
    <div className="grid gap-4 p-4 xl:grid-cols-[1fr_420px] lg:p-6">
      <section className="rounded-md border border-[#d8e1ec] bg-white p-5 shadow-sm">
        <div className="grid gap-3 md:grid-cols-3">
          <Input defaultValue="ORC-2026-0006" aria-label="Numero do orcamento" />
          <Select aria-label="Armador">{shipowners.map((owner) => <option key={owner.id}>{owner.tradeName}</option>)}</Select>
          <Select aria-label="Embarcacao">{vessels.map((vessel) => <option key={vessel.id}>{vessel.name}</option>)}</Select>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button type="button" onClick={() => setItems((current) => [...current, { description: serviceRecords[current.length].title, quantity: 1, unit: serviceRecords[current.length].unit, value: serviceRecords[current.length].originalTotalValue, source: serviceRecords[current.length].internalCode }])}><Plus className="h-4 w-4" />Adicionar servico historico</Button>
          <Button type="button" variant="secondary" onClick={() => setItems((current) => [...current, { description: "Item manual", quantity: 1, unit: "servico", value: 0, source: "Manual" }])}>Item manual</Button>
          <Button type="button" variant="secondary" onClick={() => setItems((current) => [...current, current[current.length - 1]])}><Copy className="h-4 w-4" />Duplicar item</Button>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-[#d8e1ec] text-xs uppercase text-[#607086]"><tr><th className="py-2">Descricao</th><th>Qtd.</th><th>Un.</th><th>Valor usado</th><th>Referencia</th></tr></thead>
            <tbody className="divide-y divide-[#edf2f7]">
              {items.map((item, index) => (
                <tr key={`${item.description}-${index}`}>
                  <td className="py-3"><Input value={item.description} onChange={(event) => setItems((current) => current.map((row, rowIndex) => rowIndex === index ? { ...row, description: event.target.value } : row))} /></td>
                  <td><Input className="w-20" value={item.quantity} onChange={(event) => setItems((current) => current.map((row, rowIndex) => rowIndex === index ? { ...row, quantity: Number(event.target.value) } : row))} /></td>
                  <td><Input className="w-24" value={item.unit} onChange={(event) => setItems((current) => current.map((row, rowIndex) => rowIndex === index ? { ...row, unit: event.target.value } : row))} /></td>
                  <td><Input className="w-36" value={item.value} onChange={(event) => setItems((current) => current.map((row, rowIndex) => rowIndex === index ? { ...row, value: Number(event.target.value) } : row))} /></td>
                  <td><Badge className="bg-[#e8eef6] text-[#123c72]">{item.source}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-[#edf2f7] pt-4">
          <div className="text-sm text-[#607086]">Versao 1. Alteracoes futuras devem gerar nova versao, sem apagar historico.</div>
          <Button><Save className="h-4 w-4" />Salvar rascunho</Button>
        </div>
      </section>
      <aside className="space-y-4">
        <div className="rounded-md border border-[#d8e1ec] bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-[#0b2e59]">Resumo</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between"><span>Servicos</span><strong>{formatCurrency(total)}</strong></div>
            <div className="flex justify-between"><span>Materiais</span><strong>{formatCurrency(total * 0.28)}</strong></div>
            <div className="flex justify-between"><span>Impostos</span><strong>{formatCurrency(total * 0.08)}</strong></div>
            <div className="flex justify-between"><span>Margem</span><strong>16%</strong></div>
            <div className="flex justify-between border-t border-[#edf2f7] pt-3 text-lg"><span>Total</span><strong>{formatCurrency(total * 1.52)}</strong></div>
          </div>
        </div>
        <div className="rounded-md border border-[#d8e1ec] bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-[#0b2e59]">Orcamentos recentes</h2>
          <div className="mt-4 space-y-3">
            {quotes.map((quote) => <div key={quote.id} className="rounded border border-[#edf2f7] p-3 text-sm"><strong>{quote.number}</strong><div>{quote.vessel} - {quote.status}</div></div>)}
          </div>
        </div>
      </aside>
    </div>
  );
}
