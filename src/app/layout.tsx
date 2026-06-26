import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ERAM Orcamentos",
  description: "Gestao de orcamentos e base historica de servicos do Estaleiro ERAM"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
