import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Tabs } from "@/components/page-shell";
import { PanelCard } from "@/components/panel-card";
import { StatusPill, statusVariant } from "@/components/status-pill";
import { DataTable, Td, Tr } from "@/components/data-table";
import { incidents, spareParts } from "@/lib/mock-data";

export const Route = createFileRoute("/maintenance")({
  head: () => ({ meta: [{ title: "Maintenance — Verdant Ops" }] }),
  component: MaintenancePage,
});

const TABS = ["Active Incidents", "Scheduled Maintenance", "Spare Parts", "Maintenance Log", "Performance"];

function MaintenancePage() {
  const [tab, setTab] = useState("Active Incidents");
  return (
    <div>
      <PageHeader title="Maintenance" subtitle="Incidents, preventive scheduling & spare-parts inventory" />
      <Tabs items={TABS} active={tab} onChange={setTab} />

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-5 mb-6">
        {[["Open Tickets","4"],["In Progress","2"],["Critical","1"],["MTTR Today","28 min"],["Uptime","94.2%"]].map(([l,v]) => (
          <div key={l} className="rounded-lg bg-card p-4 border border-border/60">
            <p className="text-[11px] uppercase tracking-wider text-text-light font-semibold">{l}</p>
            <p className="kpi-num text-2xl text-text-dark mt-1">{v}</p>
          </div>
        ))}
      </div>

      {tab === "Active Incidents" && (
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <PanelCard tone="terracotta" title="Active Incidents">
            <DataTable headers={["Ticket","Machine","Severity","Fault","Reported","Assigned","ETA Fix","Status"]}>
              {incidents.map((r) => (
                <Tr key={r[0]}>
                  <Td mono>{r[0]}</Td>
                  <Td>{r[1]}</Td>
                  <Td><StatusPill variant={r[2] === "HIGH" ? "danger" : r[2] === "MEDIUM" ? "warning" : "info"}>{r[2]}</StatusPill></Td>
                  <Td><span className="text-text-medium">{r[3]}</span></Td>
                  <Td mono>{r[4]}</Td>
                  <Td>{r[5]}</Td>
                  <Td mono>{r[6]}</Td>
                  <Td><StatusPill variant={statusVariant(r[7])} dot>{r[7]}</StatusPill></Td>
                </Tr>
              ))}
            </DataTable>
          </PanelCard>

          <PanelCard tone="terracotta" title="Ticket Detail — MT-558">
            <StatusPill variant="danger" dot>HIGH PRIORITY</StatusPill>
            <p className="mt-3 font-display text-lg text-text-dark">Refinery Unit A</p>
            <p className="mt-1 text-sm text-text-medium italic">"Primary centrifuge vibration — abnormal resonance detected at 1,200 RPM"</p>
            <dl className="mt-4 space-y-1.5 text-sm">
              <div className="flex justify-between"><dt className="text-text-light">Reported by</dt><dd className="text-text-dark">Patrick Mwenda</dd></div>
              <div className="flex justify-between"><dt className="text-text-light">Time</dt><dd className="data-num text-text-dark">14:30</dd></div>
              <div className="flex justify-between"><dt className="text-text-light">Duration</dt><dd className="data-num text-terracotta">45 min (ongoing)</dd></div>
              <div className="flex justify-between"><dt className="text-text-light">Assigned</dt><dd className="text-text-dark">Eng. Benjamin Ssali</dd></div>
              <div className="flex justify-between"><dt className="text-text-light">Photos</dt><dd className="text-text-dark">2 attached</dd></div>
            </dl>
            <div className="mt-4 rounded-lg bg-section p-3 text-xs">
              <p className="font-semibold text-text-dark">Parts needed:</p>
              <p className="mt-1 text-text-medium">→ SP-008: Pump Seal Kit · 2 available <span className="text-success font-semibold">✅</span></p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <button className="rounded-md border border-border bg-card py-2 font-medium text-text-medium hover:bg-card-hover">Add Note</button>
              <button className="rounded-md border border-border bg-card py-2 font-medium text-text-medium hover:bg-card-hover">Attach Photo</button>
              <button className="rounded-md bg-brand py-2 font-medium text-white hover:bg-brand-light">Mark Resolved</button>
              <button className="rounded-md bg-terracotta py-2 font-medium text-white hover:opacity-90">Escalate</button>
            </div>
          </PanelCard>
        </div>
      )}

      {tab === "Scheduled Maintenance" && (
        <PanelCard tone="sky" title="Preventive Maintenance — This Week">
          <div className="overflow-x-auto">
            <div className="grid grid-cols-7 gap-2 min-w-[700px] text-sm">
              {["Mon 5","Tue 6","Wed 7","Thu 8","Fri 9","Sat 10","Sun 11"].map((d) => (
                <div key={d} className="text-xs font-semibold text-text-light uppercase pb-2 border-b border-border">{d}</div>
              ))}
              {["—","Cold-Press A\nOil change\n8:00–9:30","—","Refinery\nFilter replace","Weighbridge\nCalibration\n7:00–8:00","Bottling\nFull clean\n06:00–10:00","—"].map((c, i) => (
                <div key={i} className="rounded-lg bg-section/60 p-3 text-xs text-text-dark whitespace-pre-line min-h-[80px]">
                  {c}
                </div>
              ))}
            </div>
          </div>
        </PanelCard>
      )}

      {tab === "Spare Parts" && (
        <PanelCard tone="gold" title="Spare Parts Inventory">
          <DataTable headers={["Part ID","Part Name","In Stock","Min","Status","Last Used","Cost/Unit (KES)"]}>
            {spareParts.map((r) => (
              <Tr key={String(r[0])}>
                <Td mono>{r[0]}</Td>
                <Td>{r[1]}</Td>
                <Td mono>{r[2]}</Td>
                <Td mono>{r[3]}</Td>
                <Td><StatusPill variant={statusVariant(String(r[4]))} dot>{r[4]}</StatusPill></Td>
                <Td>{r[5]}</Td>
                <Td mono>{r[6]}</Td>
              </Tr>
            ))}
          </DataTable>
        </PanelCard>
      )}

      {(tab === "Maintenance Log" || tab === "Performance") && (
        <PanelCard title={tab}>
          <p className="text-text-light text-sm">{tab} — historical incident log with engineer performance metrics.</p>
        </PanelCard>
      )}
    </div>
  );
}
