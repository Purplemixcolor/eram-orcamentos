import type { ReactNode } from "react";

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-b border-[#d8e1ec] bg-white px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-normal text-[#0b2e59]">{title}</h1>
        {description ? <p className="mt-1 max-w-3xl text-sm text-[#607086]">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}
