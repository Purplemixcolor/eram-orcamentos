import type { ReactNode } from "react";

export function DataTable({ headers, children }: { headers: string[]; children: ReactNode }) {
  return (
    <section className="overflow-hidden rounded-md border border-[#d8e1ec] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="border-b border-[#d8e1ec] bg-[#f8fafc] text-xs uppercase text-[#607086]">
            <tr>{headers.map((header) => <th key={header} className="px-4 py-3">{header}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-[#edf2f7]">{children}</tbody>
        </table>
      </div>
    </section>
  );
}
