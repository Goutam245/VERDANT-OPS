import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Star } from "lucide-react";
import { PageHeader, Tabs } from "@/components/page-shell";
import { PanelCard } from "@/components/panel-card";
import { StatusPill, statusVariant } from "@/components/status-pill";
import { DataTable, Td, Tr } from "@/components/data-table";
import { requirements, farmerResponses, purchaseOrders, farmers } from "@/lib/mock-data";

export const Route = createFileRoute("/procurement")({
  head: () => ({ meta: [{ title: "Procurement — Verdant Ops" }] }),
  component: ProcurementPage,
});

const TABS = ["Requirements", "Broadcast Engine", "Farmer Responses", "Purchase Orders", "Farmer Directory", "Rescheduling"];

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`h-3 w-3 ${i <= n ? "fill-gold text-gold" : "text-border"}`} />
      ))}
    </span>
  );
}

function ProcurementPage() {
  const [tab, setTab] = useState("Requirements");
  return (
    <div>
      <PageHeader
        title="Procurement Processing"
        subtitle="Source verified avocado supply across East African farmer cooperatives"
        actions={
          <button className="inline-flex items-center gap-2 rounded-md bg-brand px-3.5 py-2 text-sm font-medium text-white hover:bg-brand-light transition-colors">
            <Plus className="h-4 w-4" /> New Requirement
          </button>
        }
      />
      <Tabs items={TABS} active={tab} onChange={setTab} />

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-5 mb-6">
        {[["Active Requirements","14"],["Broadcast Sent","11"],["Farmer Responses","48"],["Confirmed POs","9"],["Week Volume","52,400 kg"]].map(([l,v]) => (
          <div key={l} className="rounded-lg bg-card p-4 border border-border/60">
            <p className="text-[11px] uppercase tracking-wider text-text-light font-semibold">{l}</p>
            <p className="kpi-num text-2xl text-text-dark mt-1">{v}</p>
          </div>
        ))}
      </div>

      {tab === "Requirements" && (
        <PanelCard tone="brand" title="Sourcing Requirements">
          <DataTable headers={["Req ID", "Product", "Qty (kg)", "Rate Range (KES)", "Deadline", "Broadcast To", "Responses", "Status"]}>
            {requirements.map((r) => (
              <Tr key={String(r[0])}>
                <Td mono>{r[0]}</Td>
                <Td>{r[1]}</Td>
                <Td mono>{r[2]}</Td>
                <Td mono>{r[3]}</Td>
                <Td>{r[4]}</Td>
                <Td>{r[5]}</Td>
                <Td mono>{r[6]}</Td>
                <Td><StatusPill variant={statusVariant(String(r[7]))} dot>{r[7]}</StatusPill></Td>
              </Tr>
            ))}
          </DataTable>
        </PanelCard>
      )}

      {tab === "Farmer Responses" && (
        <PanelCard tone="gold" title="Auto-Score Comparison — REQ-141 · Hass Avocado 10,000 kg · Deadline 14 May">
          <DataTable headers={["Farmer / Group", "Offered Price", "Available Qty", "Delivery Date", "DM Grade", "Reliability", "Score", "Action"]}>
            {farmerResponses.map((r) => (
              <Tr key={String(r[0])}>
                <Td>{r[0]}</Td>
                <Td mono>{r[1]}</Td>
                <Td mono>{r[2]}</Td>
                <Td>{r[3]}</Td>
                <Td><StatusPill variant={String(r[4]).includes("AA") ? "brand" : String(r[4]).includes("A") ? "info" : "warning"}>{r[4]}</StatusPill></Td>
                <Td><Stars n={r[5] as number} /></Td>
                <Td><span className="data-num font-semibold text-brand">{r[6]}/100</span></Td>
                <Td>
                  <button className="rounded-md bg-brand px-2.5 py-1 text-xs font-medium text-white hover:bg-brand-light">Approve</button>
                </Td>
              </Tr>
            ))}
          </DataTable>
          <p className="mt-4 text-xs text-text-light">Score formula: <span className="font-mono">Price 35% + Quantity Match 30% + Timeline 20% + Quality Grade 15%</span></p>
          <button className="mt-4 inline-flex items-center gap-2 rounded-md bg-gold px-3.5 py-2 text-sm font-semibold text-white hover:opacity-90">
            Generate Optimal Selection
          </button>
        </PanelCard>
      )}

      {tab === "Purchase Orders" && (
        <PanelCard tone="brand" title="Purchase Orders">
          <DataTable headers={["PO ID", "Farmer", "Product", "Qty (kg)", "Price/kg", "Total (KES)", "Delivery", "Payment", "Status"]}>
            {purchaseOrders.map((r) => (
              <Tr key={String(r[0])}>
                <Td mono>{r[0]}</Td>
                <Td>{r[1]}</Td>
                <Td>{r[2]}</Td>
                <Td mono>{r[3]}</Td>
                <Td mono>{r[4]}</Td>
                <Td mono>{r[5]}</Td>
                <Td>{r[6]}</Td>
                <Td><StatusPill variant={r[7] === "Paid" ? "success" : "warning"}>{r[7]}</StatusPill></Td>
                <Td><StatusPill variant={statusVariant(String(r[8]))} dot>{r[8]}</StatusPill></Td>
              </Tr>
            ))}
          </DataTable>
        </PanelCard>
      )}

      {tab === "Farmer Directory" && (
        <PanelCard tone="sky" title="Farmer Directory">
          <DataTable headers={["Farmer ID", "Name / Group", "Location", "Variety", "Reliability", "Total Supplied", "Active POs", "Status"]}>
            {farmers.map((r) => (
              <Tr key={String(r[0])}>
                <Td mono>{r[0]}</Td>
                <Td>{r[1]}</Td>
                <Td>{r[2]}</Td>
                <Td>{r[3]}</Td>
                <Td><Stars n={r[4] as number} /></Td>
                <Td mono>{r[5]}</Td>
                <Td mono>{r[6]}</Td>
                <Td><StatusPill variant={r[7] === "Active" ? "success" : "neutral"}>{r[7]}</StatusPill></Td>
              </Tr>
            ))}
          </DataTable>
        </PanelCard>
      )}

      {(tab === "Broadcast Engine" || tab === "Rescheduling") && (
        <PanelCard title={tab}>
          <p className="text-text-light text-sm">{tab} module — multi-channel broadcasting (App / SMS / WhatsApp) and intelligent delivery rescheduling.</p>
        </PanelCard>
      )}
    </div>
  );
}
