"use client";

import Link from "next/link";
import { Bell, LogOut, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import type { AppUser } from "@/lib/types";

export function Topbar({ user }: { user: AppUser }) {
  const router = useRouter();

  async function logout() {
    window.localStorage.removeItem("eram_session_user_id");
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-20 flex min-h-16 items-center gap-3 border-b border-[#d8e1ec] bg-white px-4 lg:px-6">
      <Link
        href="/search"
        className="focus-ring flex h-10 min-w-0 flex-1 items-center gap-2 rounded-md border border-[#c7d3e2] bg-[#f8fafc] px-3 text-sm text-[#607086] lg:max-w-xl"
      >
        <Search className="h-4 w-4" />
        <span className="truncate">Buscar servicos, embarcacoes, armadores ou orcamentos</span>
        <kbd className="ml-auto hidden rounded border border-[#c7d3e2] bg-white px-2 py-0.5 text-xs text-[#607086] sm:inline">Ctrl K</kbd>
      </Link>
      <Link href="/quotes" className="focus-ring hidden h-10 items-center justify-center gap-2 rounded-md bg-[#123c72] px-4 text-sm font-semibold text-white transition hover:bg-[#0b2e59] sm:inline-flex">
        <Plus className="h-4 w-4" />
        Criar orcamento
      </Link>
      <button className="focus-ring rounded-md p-2 text-[#123c72]" aria-label="Notificacoes relevantes">
        <Bell className="h-5 w-5" />
      </button>
      <div className="hidden border-l border-[#d8e1ec] pl-3 text-right sm:block">
        <div className="text-sm font-semibold text-[#13233a]">{user.name}</div>
        <div className="text-xs text-[#607086]">{user.role}</div>
      </div>
      <button onClick={logout} className="focus-ring rounded-md p-2 text-[#123c72]" aria-label="Sair">
        <LogOut className="h-5 w-5" />
      </button>
    </header>
  );
}
