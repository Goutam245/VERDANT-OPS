import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function DataTable({ headers, children, className }: { headers: string[]; children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-x-auto rounded-lg border border-border/60", className)}>
      <table className="w-full text-sm">
        <thead className="bg-section/80">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-text-light whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_tr:nth-child(even)]:bg-[oklch(0.985_0.008_130)]">{children}</tbody>
      </table>
    </div>
  );
}

export function Td({ children, mono, className }: { children: ReactNode; mono?: boolean; className?: string }) {
  return (
    <td className={cn("px-4 py-3 align-middle text-text-dark whitespace-nowrap", mono && "data-num text-text-medium", className)}>
      {children}
    </td>
  );
}

export function Tr({ children }: { children: ReactNode }) {
  return <tr className="border-t border-border/60 transition-colors hover:bg-brand-pale/40">{children}</tr>;
}
