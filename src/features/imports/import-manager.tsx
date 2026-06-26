"use client";

import { useState } from "react";
import { Database, Pause, Play, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { importJobs } from "@/lib/demo-data";

export function ImportManager() {
  const [source, setSource] = useState("rasnick/lote-ficticio-2026");

  return (
    <div className="grid gap-4 p-4 xl:grid-cols-[420px_1fr] lg:p-6">
      <section className="rounded-md border border-[#d8e1ec] bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-[#0b2e59]">Nova importacao</h2>
        <div className="mt-4 space-y-3">
          <Input value={source} onChange={(event) => setSource(event.target.value)} aria-label="Fonte da importacao" />
          <div className="grid grid-cols-2 gap-2 text-sm">
            {["Identificar colunas", "Mapear campos", "Validar dados", "Detectar duplicidades", "Processar em segundo plano", "Gerar relatorio"].map((step) => (
              <div key={step} className="rounded border border-[#edf2f7] px-3 py-2">{step}</div>
            ))}
          </div>
          <Button className="w-full"><Upload className="h-4 w-4" />Iniciar importacao</Button>
        </div>
      </section>
      <section className="space-y-3">
        {importJobs.map((job) => (
          <article key={job.id} className="rounded-md border border-[#d8e1ec] bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div><div className="flex items-center gap-2 font-semibold text-[#123c72]"><Database className="h-4 w-4" />{job.source}</div><div className="mt-1 text-sm text-[#607086]">{job.status}</div></div>
              <div className="flex gap-2"><Button variant="secondary"><Pause className="h-4 w-4" />Interromper</Button><Button variant="secondary"><Play className="h-4 w-4" />Continuar</Button></div>
            </div>
            <div className="mt-4 h-2 rounded bg-[#e6edf5]"><div className="h-2 rounded bg-[#1e5a8a]" style={{ width: `${job.progress}%` }} /></div>
            <div className="mt-3 grid gap-2 text-sm md:grid-cols-3">
              <div>Aceitos: <strong>{job.accepted.toLocaleString("pt-BR")}</strong></div>
              <div>Rejeitados: <strong>{job.rejected}</strong></div>
              <div>Duplicados: <strong>{job.duplicates}</strong></div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
