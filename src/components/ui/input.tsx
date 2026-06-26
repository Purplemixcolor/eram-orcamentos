import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "focus-ring h-10 w-full rounded-md border border-[#c7d3e2] bg-white px-3 text-sm text-[#13233a] placeholder:text-[#6c7d92]",
        className
      )}
      {...props}
    />
  );
}
