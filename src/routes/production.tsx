import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader, Tabs } from "@/components/page-shell";
import { PanelCard } from "@/components/panel-card";
import { ProgressBar } from "@/components/progress-bar";
import { StatusPill, statusVariant } from "@/components/status-pill";
import { DataTable, Td, Tr } from "@/components/data-table";
import { productionLines, workOrders, batches } from "@/lib/mock-data";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/production")({
  head: () => ({ meta: [{ title: "Production — Verdant Ops" }] }),
  component: ProductionPage,
});

const TABS = ["Overview", "Work Orders", "Batches", "Lines", "Schedule", "Recipes", "Shop Floor"];

const resources = [
  { name: "Water (L)", actual: 18400, target: 20000 },
  { name: "Electricity (kWh)", actual: 2840, target: 3000 },
  { name: "LPG/Fuel (kg)", actual: 124, target: 120 },
  { name: "Steam (t)", actual: 8.2, target: 9.0 },
];

const downtime = [
  ["Refinery Unit A", "Sensor Fault", "14:30", "Ongoing", "MT-558", "B. Ssali", "In Progress"],
  ["Cold-Press B", "Speed Variance", "11:20", "25 min", "MT-556", "C. Nanteza", "Resolved"],
  ["Bottling L-1", "Jam — Nozzle 4", "08:45", "12 min", "MT-554", "F. Otieno", "Resolved"],
  ["Weighbridge", "Calibration", "Yesterday", "20 min", "MT-551", "D. Mwangi", "Closed"],
];

function ProductionPage() {
  const [tab, setTab] = useState("Overview");
  return (
    <div>
      <PageHeader
        title="Production Processing"
        subtitle="Real-time line status, work orders & batch lineage"
        actions={
          <button className="inline-flex items-center gap-2 rounded-md bg-brand px-3.5 py-2 text-sm font-medium text-white hover:bg-brand-light transition-colors">
            <Plus className="h-4 w-4" /> New Work Order
          </button>
        }
      />
      <Tabs items={TABS} active={tab} onChange={setTab} />

      {tab === "Overview" && (
        <div className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Output Today", "18,340 kg", "+11.4%", "brand"],
              ["Active Batches", "5", "2 on hold", "gold"],
              ["Average OEE", "76.4%", "−1.8%", "terracotta"],
              ["Average Yield", "91.8%", "+0.9%", "brand"],
              ["Machine Uptime", "94.2%", "+2.1%", "brand"],
              ["Shift Target", "20,000 kg", "92% achieved", "sky"],
              ["Orders Fulfilled", "4", "Today", "brand"],
              ["Downtime", "38 min", "Across 4 events", "gold"],
            ].map(([l, v, c]) => (
              <div key={l} className="rounded-lg bg-card p-4 border border-border/60">
                <p className="text-[11px] uppercase tracking-wider text-text-light font-semibold">{l}</p>
                <p className="kpi-num text-2xl text-text-dark mt-1">{v}</p>
                <p className="text-xs text-text-medium mt-0.5">{c}</p>
              </div>
            ))}
          </div>

          <PanelCard tone="brand" title="Production Lines — Detail">
            <DataTable headers={["Line", "Batch", "Product", "Input", "Output", "Yield", "Stage", "Progress", "Operator", "Time", "Status"]}>
              {productionLines.map((l) => (
                <Tr key={l.batch}>
                  <Td>{l.line}</Td>
                  <Td mono>{l.batch}</Td>
                  <Td>{l.product}</Td>
                  <Td mono>{l.output.split("/")[1]?.trim() || "—"}</Td>
                  <Td mono>{l.output.split("/")[0]?.trim()}</Td>
                  <Td mono>{l.progress}%</Td>
                  <Td>{l.status === "Fault" ? "FAULT HALTED" : "Processing"}</Td>
                  <Td><div className="w-28"><ProgressBar value={l.progress} tone={l.status === "Fault" ? "terracotta" : l.status === "Slow" ? "gold" : "brand"} /></div></Td>
                  <Td>{l.operator}</Td>
                  <Td mono>{l.time}</Td>
                  <Td><StatusPill variant={statusVariant(l.status)} dot>{l.status}</StatusPill></Td>
                </Tr>
              ))}
            </DataTable>
          </PanelCard>

          <div className="grid gap-6 lg:grid-cols-[0.96fr_1.04fr]">
            <PanelCard tone="terracotta" title="Downtime Log">
              <DataTable headers={["Machine", "Fault", "Start", "Duration", "Ticket", "Engineer", "Status"]}>
                {downtime.map((r) => (
                  <Tr key={r[4]}>
                    {r.map((c, i) => i === 6 ? <Td key={i}><StatusPill variant={statusVariant(c)}>{c}</StatusPill></Td> : <Td key={i} mono={i === 4 || i === 2}>{c}</Td>)}
                  </Tr>
                ))}
              </DataTable>
            </PanelCard>

            <PanelCard tone="sky" title="Resource Consumption — Today">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={resources} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.012 130)" vertical={false} />
                    <XAxis dataKey="name" stroke="#7A9E7E" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#7A9E7E" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.92 0.012 130)", fontSize: 12 }} />
                    <Bar dataKey="actual" fill="#2D6A4F" radius={[6, 6, 0, 0]} name="Actual" />
                    <Bar dataKey="target" fill="#E9A825" radius={[6, 6, 0, 0]} name="Target" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </PanelCard>
          </div>
        </div>
      )}

      {tab === "Work Orders" && (
        <PanelCard tone="brand" title="All Work Orders">
          <DataTable headers={["Order", "Product", "Target", "Done", "Line", "Start", "End", "Status", "Priority"]}>
            {workOrders.map((r) => (
              <Tr key={String(r[0])}>
                <Td mono>{r[0]}</Td>
                <Td>{r[1]}</Td>
                <Td mono>{r[2]}</Td>
                <Td mono>{r[3]}</Td>
                <Td>{r[4]}</Td>
                <Td mono>{r[5]}</Td>
                <Td mono>{r[6]}</Td>
                <Td><StatusPill variant={statusVariant(String(r[7]))} dot>{r[7]}</StatusPill></Td>
                <Td><StatusPill variant={r[8] === "URGENT" ? "danger" : r[8] === "HIGH" ? "warning" : "neutral"}>{r[8]}</StatusPill></Td>
              </Tr>
            ))}
          </DataTable>
        </PanelCard>
      )}

      {tab === "Batches" && (
        <PanelCard tone="gold" title="Batch Records">
          <DataTable headers={["Batch", "Supplier", "Variety", "Input", "Output", "Yield", "QC", "Stage", "Date", "Storage"]}>
            {batches.map((r) => (
              <Tr key={String(r[0])}>
                <Td mono>{r[0]}</Td>
                <Td>{r[1]}</Td>
                <Td>{r[2]}</Td>
                <Td mono>{r[3]}</Td>
                <Td mono>{r[4]}</Td>
                <Td mono>{r[5]}</Td>
                <Td><StatusPill variant={statusVariant(String(r[6]))}>{r[6]}</StatusPill></Td>
                <Td>{r[7]}</Td>
                <Td>{r[8]}</Td>
                <Td>{r[9]}</Td>
              </Tr>
            ))}
          </DataTable>
        </PanelCard>
      )}

      {(tab === "Lines" || tab === "Recipes" || tab === "Shop Floor") && (
        <PanelCard title={tab}>
          <p className="text-text-light text-sm">Detailed {tab.toLowerCase()} configuration view — coming online with live SCADA integration in Phase 2.</p>
        </PanelCard>
      )}

      {tab === "Schedule" && (
        <PanelCard tone="sky" title="Weekly Schedule — Gantt View">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-8 gap-1 mb-2 text-xs font-semibold text-text-light uppercase">
                <div></div>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <div key={d} className="text-center">{d}</div>)}
              </div>
              {productionLines.map((l, i) => (
                <div key={l.line} className="grid grid-cols-8 gap-1 mb-1.5 items-center">
                  <div className="text-xs font-medium text-text-dark pr-2">{l.line}</div>
                  {[0, 1, 2, 3, 4, 5, 6].map((d) => {
                    const active = (i + d) % 3 !== 1;
                    const tone = l.status === "Fault" && d === 5 ? "bg-terracotta" : active ? (d % 2 === 0 ? "bg-success" : "bg-brand-light") : "bg-section";
                    return <div key={d} className={`h-7 rounded ${tone} opacity-${active ? "100" : "60"}`} />;
                  })}
                </div>
              ))}
            </div>
          </div>
        </PanelCard>
      )}
    </div>
  );
}
