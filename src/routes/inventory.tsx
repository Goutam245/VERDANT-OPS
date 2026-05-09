import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertOctagon, ShoppingCart } from "lucide-react";
import { PageHeader, Tabs } from "@/components/page-shell";
import { PanelCard } from "@/components/panel-card";
import { ProgressBar } from "@/components/progress-bar";
import { StatusPill, statusVariant } from "@/components/status-pill";
import { DataTable, Td, Tr } from "@/components/data-table";
import { inventory } from "@/lib/mock-data";

export const Route = createFileRoute("/inventory")({
  head: () => ({ meta: [{ title: "Inventory — Verdant Ops" }] }),
  component: InventoryPage,
});

const TABS = ["Stock Overview", "Batch Records", "Movements", "Alerts", "Supply Chain Map"];

const supplyChainNodes = [
  ["🌿 Farm", "14 POs"],
  ["🚛 Transit", "11 trucks"],
  ["🏛 Gate", "8 active"],
  ["🔬 QC Lab", "4 in queue"],
  ["🏪 Warehouse", "28 batches"],
  ["🏭 Production", "5 active"],
  ["📦 Finished", "34 SKUs"],
  ["🚚 Dispatch", "7 today"],
];

const tracking = [
  ["SC-5221","Rift Valley Agri Co-op","Hass Avocado","5,200 kg","13:45 Today","Pass","B-0711","In Progress","—","Production"],
  ["SC-5220","Central Kenya Highlands","Hass Avocado","7,000 kg","12:20 Today","Pass","B-0710","Completed","—","Finished Stock"],
  ["SC-5219","Western Smallholders Net.","Fuerte","5,500 kg","11:00 Today","Pass","Queued","—","—","Warehouse Queue"],
  ["SC-5218","Nakuru Farmers Assoc.","Mixed","3,200 kg","09:30 Today","Reject","—","—","—","Quarantine"],
  ["SC-5217","Highland Premium Farms","Hass Avocado","4,200 kg","Yesterday","Pass","B-0709","Completed","Dispatched","Delivered"],
];

const allAlerts = [
  ["ALT-0881","14:20","CRITICAL","Sealing Film Roll","Stock at 12% — production halt imminent"],
  ["ALT-0880","14:10","CRITICAL","Glass Bottles 750ml","Stock at 8% — reorder level exceeded by 64%"],
  ["ALT-0879","13:45","WARNING","Cardboard Outer Box (L)","Stock falling — 440 available vs 1,000 min"],
  ["ALT-0878","13:00","WARNING","Avocado Paste (Bulk)","39% stock — 2 export orders pending"],
  ["ALT-0877","12:30","INFO","Refined Avocado Oil 500ml","Restocked: +8,000 units added from B-0710"],
  ["ALT-0876","11:00","INFO","Biomass Pellets","6,800 kg ready for sale — no buyer orders"],
  ["ALT-0875","Yesterday","WARNING","Virgin Oil 1L","Reserved qty reducing available buffer"],
];

function InventoryPage() {
  const [tab, setTab] = useState("Stock Overview");
  return (
    <div>
      <PageHeader title="Inventory Tracking" subtitle="Real-time stock health across raw materials, WIP, finished goods & packaging" />
      <Tabs items={TABS} active={tab} onChange={setTab} />

      {tab === "Stock Overview" && (
        <div className="space-y-6">
          <div className="rounded-lg border-l-4 border-terracotta bg-terracotta-light/60 px-4 py-3 flex items-start gap-3">
            <AlertOctagon className="h-5 w-5 text-terracotta shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-terracotta">URGENT — 2 items are critically low</p>
              <p className="text-xs text-text-medium mt-0.5">Production may halt within 3 hours. Immediate action required.</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-5">
            {[["Total SKUs","34","neutral"],["Healthy","22","success"],["Watch","8","info"],["Warning","2","warning"],["Critical","2","danger"]].map(([l,v,t]) => (
              <div key={l} className="rounded-lg bg-card p-4 border border-border/60">
                <p className="text-[11px] uppercase tracking-wider text-text-light font-semibold">{l}</p>
                <p className="kpi-num text-2xl text-text-dark mt-1 flex items-center gap-2">
                  {v}
                  <StatusPill variant={t as never}>•</StatusPill>
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {inventory.slice(0, 6).map((it) => {
              const tone: "danger" | "warning" | "success" | "info" = it[8] === "Critical" ? "danger" : it[8] === "Warning" ? "warning" : it[8] === "Watch" ? "info" : "success";
              const barTone = tone === "danger" ? "terracotta" : tone === "warning" ? "gold" : tone === "info" ? "sky" : "brand";
              return (
                <div key={String(it[0])} className="rounded-xl border border-border/60 bg-card p-4 anim-rise">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <StatusPill variant={tone} dot>{String(it[8]).toUpperCase()}</StatusPill>
                  </div>
                  <p className="font-medium text-text-dark">{it[1]}</p>
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="data-num text-sm font-semibold text-text-dark">{it[3]}</span>
                      <span className="data-num text-xs text-text-light">{it[10]}%</span>
                    </div>
                    <ProgressBar value={it[10] as number} tone={barTone} />
                  </div>
                  <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
                    <div><dt className="text-text-light">Reorder</dt><dd className="data-num text-text-dark">{it[6]}</dd></div>
                    <div><dt className="text-text-light">Reserved</dt><dd className="data-num text-text-dark">{it[4]}</dd></div>
                    <div><dt className="text-text-light">Available</dt><dd className="data-num text-text-dark">{it[5]}</dd></div>
                  </dl>
                  {tone === "danger" && (
                    <button className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-terracotta px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90">
                      <ShoppingCart className="h-3 w-3" /> Raise PO
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <PanelCard tone="brand" title="Full Inventory">
            <DataTable headers={["SKU", "Item", "Category", "In Stock", "Reserved", "Available", "Reorder At", "Value (KES)", "Status", "Updated"]}>
              {inventory.map((r) => (
                <Tr key={String(r[0])}>
                  <Td mono>{r[0]}</Td>
                  <Td>{r[1]}</Td>
                  <Td>{r[2]}</Td>
                  <Td mono>{r[3]}</Td>
                  <Td mono>{r[4]}</Td>
                  <Td mono>{r[5]}</Td>
                  <Td mono>{r[6]}</Td>
                  <Td mono>{r[7]}</Td>
                  <Td><StatusPill variant={statusVariant(String(r[8]))} dot>{r[8]}</StatusPill></Td>
                  <Td>{r[9]}</Td>
                </Tr>
              ))}
            </DataTable>
          </PanelCard>
        </div>
      )}

      {tab === "Supply Chain Map" && (
        <div className="space-y-6">
          <PanelCard tone="brand" title="Supply Chain Pipeline">
            <div className="overflow-x-auto">
              <div className="flex items-center gap-2 min-w-[1000px] py-4">
                {supplyChainNodes.map((n, i) => (
                  <div key={n[0]} className="flex items-center">
                    <button className="rounded-xl border border-border bg-card px-4 py-3 text-center hover:border-brand hover:bg-brand-pale/40 transition-colors min-w-[110px]">
                      <p className="text-2xl">{n[0].split(" ")[0]}</p>
                      <p className="text-xs font-semibold text-text-dark mt-1">{n[0].split(" ").slice(1).join(" ")}</p>
                      <p className="text-[10px] text-text-light data-num">{n[1]}</p>
                    </button>
                    {i < supplyChainNodes.length - 1 && <div className="w-6 h-px bg-border mx-1" />}
                  </div>
                ))}
              </div>
            </div>
          </PanelCard>
          <PanelCard tone="sky" title="Supply Chain Tracking">
            <DataTable headers={["Track ID","Supplier","Product","Qty","Gate In","QC","Batch","Production","Dispatch","Stage"]}>
              {tracking.map((r) => (
                <Tr key={r[0]}>
                  {r.map((c, i) => i === 5 ? <Td key={i}><StatusPill variant={statusVariant(c)}>{c}</StatusPill></Td> : i === 9 ? <Td key={i}><StatusPill variant={statusVariant(c)} dot>{c}</StatusPill></Td> : <Td key={i} mono={i === 0 || i === 6}>{c}</Td>)}
                </Tr>
              ))}
            </DataTable>
          </PanelCard>
        </div>
      )}

      {tab === "Alerts" && (
        <PanelCard tone="terracotta" title="Alert Center">
          <DataTable headers={["Alert ID","Time","Severity","Item","Message","Action"]}>
            {allAlerts.map((r) => (
              <Tr key={r[0]}>
                <Td mono>{r[0]}</Td>
                <Td mono>{r[1]}</Td>
                <Td><StatusPill variant={statusVariant(r[2])} dot>{r[2]}</StatusPill></Td>
                <Td>{r[3]}</Td>
                <Td><span className="text-text-medium">{r[4]}</span></Td>
                <Td><button className="text-xs font-semibold text-brand hover:underline">View</button></Td>
              </Tr>
            ))}
          </DataTable>
        </PanelCard>
      )}

      {(tab === "Batch Records" || tab === "Movements") && (
        <PanelCard title={tab}>
          <p className="text-text-light text-sm">{tab} — full traceability ledger with FIFO/LIFO movement history.</p>
        </PanelCard>
      )}
    </div>
  );
}
