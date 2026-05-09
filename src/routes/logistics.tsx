import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Tabs } from "@/components/page-shell";
import { PanelCard } from "@/components/panel-card";
import { StatusPill, statusVariant } from "@/components/status-pill";
import { DataTable, Td, Tr } from "@/components/data-table";
import { gateLog } from "@/lib/mock-data";
import { Scale, LogOut, QrCode } from "lucide-react";

export const Route = createFileRoute("/logistics")({
  head: () => ({ meta: [{ title: "Logistics & Gate — Verdant Ops" }] }),
  component: LogisticsPage,
});

const TABS = ["Gate Log", "Active Vehicles", "Gate Pass Management", "Weighbridge", "Audit Trail"];

function LogisticsPage() {
  const [tab, setTab] = useState("Gate Log");
  return (
    <div>
      <PageHeader title="Logistics & Gate" subtitle="Vehicle entries, gate passes & weighbridge readings" />
      <Tabs items={TABS} active={tab} onChange={setTab} />

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 mb-6">
        {[["Vehicles Inside","3"],["Entries Today","18"],["Exits Today","15"],["Alerts","1"]].map(([l,v]) => (
          <div key={l} className="rounded-lg bg-card p-4 border border-border/60">
            <p className="text-[11px] uppercase tracking-wider text-text-light font-semibold">{l}</p>
            <p className="kpi-num text-2xl text-text-dark mt-1">{v}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <PanelCard tone="brand" title="Gate Log">
          <DataTable headers={["GPN","Truck","Driver","Company","PO Ref","Entry","Gross Wt","Exit","Duration","Status"]}>
            {gateLog.map((r) => (
              <Tr key={r[0]}>
                <Td mono>{r[0]}</Td>
                <Td mono>{r[1]}</Td>
                <Td>{r[2]}</Td>
                <Td>{r[3]}</Td>
                <Td mono>{r[4]}</Td>
                <Td mono>{r[5]}</Td>
                <Td mono>{r[6]}</Td>
                <Td mono>{r[7]}</Td>
                <Td mono>{r[8]}</Td>
                <Td><StatusPill variant={statusVariant(r[9])} dot>{r[9]}</StatusPill></Td>
              </Tr>
            ))}
          </DataTable>
        </PanelCard>

        <PanelCard tone="sky" title="Active Gate Pass — GP-3013">
          <StatusPill variant="info" dot>ACTIVE — INSIDE FACILITY</StatusPill>
          <dl className="mt-4 space-y-2 text-sm">
            {[["Truck","KAA-224M"],["Driver","Samuel Wekesa"],["Company","Central Kenya High."],["PO Ref","PO-1042"],["Entry","13:00"],["Purpose","Delivery — Avocado"],["Weight In","Pending"]].map(([k,v]) => (
              <div key={k} className="flex justify-between border-b border-border/60 pb-1.5">
                <dt className="text-text-light">{k}</dt>
                <dd className="data-num text-text-dark">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex items-center justify-center rounded-lg bg-section py-6">
            <QrCode className="h-24 w-24 text-text-dark" strokeWidth={1.2} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button className="inline-flex items-center justify-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-text-medium hover:bg-card-hover">
              <Scale className="h-3.5 w-3.5" /> Record Weight
            </button>
            <button className="inline-flex items-center justify-center gap-1.5 rounded-md bg-brand px-3 py-2 text-xs font-medium text-white hover:bg-brand-light">
              <LogOut className="h-3.5 w-3.5" /> Exit
            </button>
          </div>
        </PanelCard>
      </div>
    </div>
  );
}
