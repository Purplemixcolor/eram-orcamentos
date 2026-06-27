"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Anchor,
  BarChart3,
  ClipboardList,
  Database,
  FileClock,
  FileText,
  Gauge,
  History,
  Layers3,
  Search,
  Settings,
  Shield,
  Ship,
  Users
} from "lucide-react";
import { EramLogo } from "@/components/brand/eram-logo";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Visao geral", icon: Gauge },
  { href: "/search", label: "Pesquisa de servicos", icon: Search },
  { href: "/audit", label: "Historico", icon: History },
  { href: "/quotes", label: "Orcamentos", icon: ClipboardList },
  { href: "/vessels", label: "Embarcacoes", icon: Ship },
  { href: "/shipowners", label: "Armadores", icon: Anchor },
  { href: "/categories", label: "Categorias", icon: Layers3 },
  { href: "/imports", label: "Importacoes", icon: Database },
  { href: "/compare", label: "Relatorios", icon: BarChart3 },
  { href: "/admin/users", label: "Administracao", icon: Shield },
  { href: "/settings", label: "Configuracoes", icon: Settings }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-[#133e67] bg-[#082747] text-white lg:block">
      <div className="flex h-20 items-center border-b border-white/10 px-6">
        <EramLogo className="w-32 drop-shadow-[0_2px_8px_rgba(0,0,0,0.22)]" priority />
      </div>
      <nav className="space-y-1 px-3 py-4" aria-label="Navegacao principal">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "focus-ring flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-[#dce7f4] transition hover:bg-white/10",
                active && "bg-white text-[#082747] shadow-sm"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mx-4 mt-4 rounded border border-white/10 bg-white/5 p-4 text-xs leading-5 text-[#c7d6e8]">
        <FileClock className="mb-2 h-4 w-4 text-[#d5a619]" />
        Base historica preparada para importacoes em lote e rastreabilidade de origem.
      </div>
    </aside>
  );
}
