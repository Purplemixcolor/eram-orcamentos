import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" && "bg-[#123c72] text-white hover:bg-[#0b2e59]",
        variant === "secondary" && "border border-[#b9c8da] bg-white text-[#123c72] hover:bg-[#f2f6fb]",
        variant === "ghost" && "text-[#123c72] hover:bg-[#e8eef6]",
        variant === "danger" && "bg-[#9f2b2b] text-white hover:bg-[#842121]",
        className
      )}
      {...props}
    />
  );
}
