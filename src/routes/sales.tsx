import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Tabs } from "@/components/page-shell";
import { PanelCard } from "@/components/panel-card";
import { ProgressBar } from "@/components/progress-bar";
import { StatusPill, statusVariant } from "@/components/status-pill";
import { DataTable, Td, Tr } from "@/components/data-table";
import { buyerOrders, tanks } from "@/lib/mock-data";

export const Route = createFileRoute("/sales")({
  head: () => ({ meta: [{ title: "Sales & Dispatch — Verdant Ops" }] }),
  component: SalesPage,
});

const TABS = ["Buyer Orders", "Scheduling", "Tank Allocation", "Dispatch Management", "Revenue"];

function SalesPage() {
  const [tab, setTab] = useState("Buyer Orders");
  return (
    <div>
      <PageHeader title="Sales & Dispatch" subtitle="Buyer orders, tank allocation & dispatch scheduling" />
      <Tabs items={TABS} active={tab} onChange={setTab} />

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 mb-6">
        {[["Revenue Today","KES 2.14M"],["Orders Active","14"],["Pending Tank","3"],["Dispatched Today","6"]].map(([l,v]) => (
          <div key={l} className="rounded-lg bg-card p-4 border border-border/60">
            <p className="text-[11px] uppercase tracking-wider text-text-light font-semibold">{l}</p>
            <p className="kpi-num text-2xl text-text-dark mt-1">{v}</p>
          </div>
        ))}
      </div>

      {tab === "Buyer Orders" && (
        <PanelCard tone="brand" title="Buyer Orders">
          <DataTable headers={["Order","Buyer","Product","Qty","Value (KES)","Delivery","Tank Alloc","Status"]}>
            {buyerOrders.map((r) => (
              <Tr key={r[0]}>
                <Td mono>{r[0]}</Td>
                <Td>{r[1]}</Td>
                <Td>{r[2]}</Td>
                <Td mono>{r[3]}</Td>
                <Td mono>{r[4]}</Td>
                <Td>{r[5]}</Td>
                <Td mono>{r[6]}</Td>
                <Td><StatusPill variant={statusVariant(r[7])} dot>{r[7]}</StatusPill></Td>
              </Tr>
            ))}
          </DataTable>
        </PanelCard>
      )}

      {tab === "Tank Allocation" && (
        <PanelCard tone="sky" title="Tank Allocation">
          <DataTable headers={["Tank","Product","Capacity","Current","Reserved","Available","Orders","% Full"]}>
            {tanks.map((r) => (
              <Tr key={String(r[0])}>
                <Td mono>{r[0]}</Td>
                <Td>{r[1]}</Td>
                <Td mono>{r[2]}</Td>
                <Td mono>{r[3]}</Td>
                <Td mono>{r[4]}</Td>
                <Td mono>{r[5]}</Td>
                <Td className="text-xs">{r[6]}</Td>
                <Td><div className="flex items-center gap-2 w-44"><ProgressBar value={r[7] as number} tone={(r[7] as number) > 75 ? "gold" : "brand"} /><span className="data-num text-xs">{r[7]}%</span></div></Td>
              </Tr>
            ))}
          </DataTable>
        </PanelCard>
      )}

      {(tab === "Scheduling" || tab === "Dispatch Management" || tab === "Revenue") && (
        <PanelCard title={tab}>
          <p className="text-text-light text-sm">{tab} — operational view for sales managers and dispatch coordinators.</p>
        </PanelCard>
      )}
    </div>
  );
}
