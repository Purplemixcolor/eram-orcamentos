"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { users } from "@/lib/demo-data";
import type { AppUser } from "@/lib/types";

const SESSION_KEY = "eram_session_user_id";

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AppUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const userId = window.localStorage.getItem(SESSION_KEY);
    const currentUser = users.find((item) => item.id === userId && item.active) ?? null;
    setUser(currentUser);
    setReady(true);
    if (!currentUser) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [pathname, router]);

  if (!ready || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f7fb] text-sm font-semibold text-[#123c72]">
        Carregando acesso...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] lg:flex">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Topbar user={user} />
        <main>{children}</main>
      </div>
    </div>
  );
}
