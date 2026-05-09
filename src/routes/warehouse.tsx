import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Tabs } from "@/components/page-shell";
import { PanelCard } from "@/components/panel-card";
import { ProgressBar } from "@/components/progress-bar";
import { StatusPill, statusVariant } from "@/components/status-pill";
import { DataTable, Td, Tr } from "@/components/data-table";
import { bays, grns } from "@/lib/mock-data";

export const Route = createFileRoute("/warehouse")({
  head: () => ({ meta: [{ title: "Warehouse — Verdant Ops" }] }),
  component: WarehousePage,
});

const TABS = ["Overview", "GRN", "Batch Tracking", "Bay Map", "Dispatch Queue", "Labels"];

function WarehousePage() {
  const [tab, setTab] = useState("Overview");
  return (
    <div>
      <PageHeader title="Warehouse Management" subtitle="Storage utilisation, GRN workflow & dispatch staging" />
      <Tabs items={TABS} active={tab} onChange={setTab} />

      {(tab === "Overview" || tab === "Bay Map") && (
        <div className="space-y-6">
          {bays.map((sec) => (
            <PanelCard key={sec.section} tone="brand" title={sec.section}>
              <div className="space-y-3">
                {sec.items.map((b) => {
                  const pct = b[1] as number;
                  const tone = pct >= 95 ? "terracotta" : pct >= 75 ? "gold" : "brand";
                  return (
                    <div key={b[0] as string} className="grid items-center gap-3 grid-cols-1 md:grid-cols-[140px_1fr_220px]">
                      <p className="font-medium text-text-dark">{b[0]}</p>
                      <ProgressBar value={pct} tone={tone} />
                      <div className="flex items-center justify-between gap-3">
                        <span className="data-num text-sm text-text-medium">{pct}% · {b[2]}</span>
                        {b[3] && <span className="text-xs text-text-light truncate max-w-[180px]">{b[3]}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </PanelCard>
          ))}
        </div>
      )}

      {tab === "GRN" && (
        <PanelCard tone="brand" title="Goods Received Notes">
          <DataTable headers={["GRN ID","PO Ref","Supplier","Product","Gross","Tare","Net","QC","Bay","Generated"]}>
            {grns.map((r) => (
              <Tr key={r[0]}>
                <Td mono>{r[0]}</Td>
                <Td mono>{r[1]}</Td>
                <Td>{r[2]}</Td>
                <Td>{r[3]}</Td>
                <Td mono>{r[4]}</Td>
                <Td mono>{r[5]}</Td>
                <Td mono>{r[6]}</Td>
                <Td><StatusPill variant={statusVariant(r[7])} dot>{r[7]}</StatusPill></Td>
                <Td>{r[8]}</Td>
                <Td>{r[9]}</Td>
              </Tr>
            ))}
          </DataTable>
        </PanelCard>
      )}

      {(tab === "Batch Tracking" || tab === "Dispatch Queue" || tab === "Labels") && (
        <PanelCard title={tab}>
          <p className="text-text-light text-sm">{tab} — operational module for warehouse staff with barcode/QR generation.</p>
        </PanelCard>
      )}
    </div>
  );
}
