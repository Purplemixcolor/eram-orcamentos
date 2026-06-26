"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Building2, Eye, Lock, Mail, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { EramLogo } from "@/components/brand/eram-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { users } from "@/lib/demo-data";
import { assetPath } from "@/lib/asset-path";
import { createClientSession } from "@/lib/client-session";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@eram.local");
  const [password, setPassword] = useState("eram123");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 300));
    setLoading(false);
    const user = users.find((item) => item.email === email && item.active);
    if (!user || password !== "eram123") {
      setError("E-mail ou senha incorretos.");
      return;
    }
    createClientSession(user.id);
    const nextUrl = new URL(window.location.href).searchParams.get("next");
    router.push(nextUrl ?? "/dashboard");
  }

  return (
    <main className="grid min-h-screen bg-[#082747] lg:h-screen lg:overflow-hidden lg:grid-cols-[minmax(0,1fr)_500px]">
      <section className="relative hidden overflow-hidden lg:block">
        <Image src={assetPath("/images/shipyard-login.jpg")} alt="Estaleiro com embarcacao em reparo" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[#082747]/50" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,20,38,0.74)_0%,rgba(4,20,38,0.46)_42%,rgba(4,20,38,0.18)_72%)]" />
        <div className="absolute inset-y-0 right-0 w-16 bg-[#082747]" style={{ clipPath: "ellipse(80% 58% at 100% 50%)" }} />
        <div className="absolute left-[15%] top-[17%] max-w-md text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
          <h1 className="text-4xl font-bold leading-tight tracking-normal xl:text-5xl">
            Construindo o <span className="text-[#f0c12c]">futuro</span> da navegacao.
          </h1>
          <div className="mt-6 h-0.5 w-24 bg-[#d5a619]" />
          <p className="mt-5 text-xl font-semibold leading-snug text-white xl:text-2xl">Gestao e eficiencia para um estaleiro que move a Amazonia.</p>
        </div>
        <div className="absolute bottom-7 left-[9%] grid grid-cols-3 gap-6 text-white">
          {[
            { icon: ShieldCheck, title: "Seguranca", text: "Protecao de dados e processos." },
            { icon: TrendingUp, title: "Eficiencia", text: "Controle total das operacoes." },
            { icon: Users, title: "Confianca", text: "Informacoes precisas em tempo real." }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="max-w-44">
                <Icon className="mb-2 h-6 w-6 text-[#d5a619]" />
                <div className="text-base font-semibold">{item.title}</div>
                <p className="mt-1 text-xs leading-5 text-white/85">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="flex items-center justify-center p-5 lg:justify-end lg:bg-[linear-gradient(135deg,#082747,#0d3762)] lg:p-6 lg:pr-8">
        <form onSubmit={submit} className="w-full max-w-[400px] rounded-[20px] bg-white p-6 shadow-2xl lg:p-7">
          <div className="flex justify-center">
            <EramLogo className="w-44" priority />
          </div>
          <h2 className="mt-4 text-xl font-bold text-[#123c72]">Acesse sua conta</h2>
          <p className="mt-1 text-sm text-[#607086]">Informe seus dados para continuar.</p>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-[#123c72]">E-mail</span>
              <span className="mt-1.5 flex h-11 items-center gap-3 rounded-md border border-[#c7d3e2] px-3">
                <Mail className="h-5 w-5 text-[#607086]" />
                <Input className="h-10 border-0 px-0 focus-visible:outline-none" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Digite seu e-mail" type="email" autoComplete="email" />
              </span>
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-[#123c72]">Senha</span>
              <span className="mt-1.5 flex h-11 items-center gap-3 rounded-md border border-[#c7d3e2] px-3">
                <Lock className="h-5 w-5 text-[#607086]" />
                <Input className="h-10 border-0 px-0 focus-visible:outline-none" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Digite sua senha" type={showPassword ? "text" : "password"} autoComplete="current-password" />
                <button type="button" onClick={() => setShowPassword((value) => !value)} className="focus-ring rounded p-1 text-[#607086]" aria-label="Mostrar ou ocultar senha">
                  <Eye className="h-5 w-5" />
                </button>
              </span>
            </label>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 text-sm">
            <label className="flex items-center gap-2 font-semibold text-[#123c72]">
              <input checked={remember} onChange={(event) => setRemember(event.target.checked)} type="checkbox" className="h-4 w-4 accent-[#224f9a]" />
              Lembrar de mim
            </label>
            <button type="button" className="focus-ring rounded text-sm font-semibold text-[#224f9a]">Esqueci minha senha</button>
          </div>
          {error ? <div role="alert" className="mt-4 rounded-md border border-[#f1b5b5] bg-[#fff4f4] px-3 py-2 text-sm font-medium text-[#9f2b2b]">{error}</div> : null}
          <Button disabled={loading} className="mt-5 h-11 w-full">
            {loading ? "Entrando..." : "Entrar"}
          </Button>
          <div className="my-5 flex items-center gap-3 text-sm font-semibold text-[#607086]">
            <span className="h-px flex-1 bg-[#d8e1ec]" />
            ou
            <span className="h-px flex-1 bg-[#d8e1ec]" />
          </div>
          <Button type="button" variant="secondary" className="h-11 w-full">
            <Building2 className="h-5 w-5" />
            Acessar com minha empresa
          </Button>
          <p className="mt-4 text-xs leading-5 text-[#607086]">Demo local: use qualquer usuario seedado com a senha <strong>eram123</strong>. Cadastro publico nao esta disponivel.</p>
        </form>
      </section>
    </main>
  );
}
