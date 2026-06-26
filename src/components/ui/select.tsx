import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "focus-ring h-10 w-full rounded-md border border-[#c7d3e2] bg-white px-3 text-sm text-[#13233a]",
        className
      )}
      {...props}
    />
  );
}
