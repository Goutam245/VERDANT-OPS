import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Tabs } from "@/components/page-shell";
import { PanelCard } from "@/components/panel-card";
import { StatusPill, statusVariant } from "@/components/status-pill";
import { DataTable, Td, Tr } from "@/components/data-table";
import { qcChecks } from "@/lib/mock-data";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Pie, PieChart, Cell, Legend } from "recharts";

export const Route = createFileRoute("/quality")({
  head: () => ({ meta: [{ title: "Quality Control — Verdant Ops" }] }),
  component: QCPage,
});

const TABS = ["Today's Checks", "QC Log", "QC Matrix Config", "Rejection Analysis", "Certificates"];

const rejectionWeek = [
  { day: "Mon", rejected: 2 }, { day: "Tue", rejected: 1 }, { day: "Wed", rejected: 4 },
  { day: "Thu", rejected: 0 }, { day: "Fri", rejected: 3 }, { day: "Sat", rejected: 2 }, { day: "Sun", rejected: 1 },
];
const rejBySupplier = [
  { name: "Nakuru Farmers", val: 5 }, { name: "Meru Highlands", val: 3 },
  { name: "Western Smallholders", val: 2 }, { name: "Central Kenya", val: 1 }, { name: "Rift Valley", val: 1 },
];
const rejByParam = [
  { name: "Moisture", value: 42 }, { name: "FFA", value: 28 }, { name: "DM", value: 18 }, { name: "Colour", value: 12 },
];
const PIE_COLORS = ["#C1440E", "#E9A825", "#1D6FA4", "#52B788"];

function QCPage() {
  const [tab, setTab] = useState("Today's Checks");
  return (
    <div>
      <PageHeader title="Quality Control" subtitle="Inspection results, parameters and laboratory certifications" />
      <Tabs items={TABS} active={tab} onChange={setTab} />

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-5 mb-6">
        {[["Checks Today","22"],["Passed","19"],["Failed","2"],["Under Review","1"],["Pass Rate","86.4%"]].map(([l,v]) => (
          <div key={l} className="rounded-lg bg-card p-4 border border-border/60">
            <p className="text-[11px] uppercase tracking-wider text-text-light font-semibold">{l}</p>
            <p className="kpi-num text-2xl text-text-dark mt-1">{v}</p>
          </div>
        ))}
      </div>

      {(tab === "Today's Checks" || tab === "QC Log") && (
        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <PanelCard tone="brand" title="QC Sample Records">
            <DataTable headers={["Sample","Batch","Supplier","DM %","FFA %","Moisture %","Colour","External","Decision","Inspector","Time"]}>
              {qcChecks.map((r) => (
                <Tr key={r[0]}>
                  <Td mono>{r[0]}</Td>
                  <Td mono>{r[1]}</Td>
                  <Td>{r[2]}</Td>
                  <Td mono>{r[3]}</Td>
                  <Td mono>{r[4]}</Td>
                  <Td mono>{r[5]}</Td>
                  <Td>{r[6]}</Td>
                  <Td><StatusPill variant={statusVariant(r[7])}>{r[7]}</StatusPill></Td>
                  <Td><StatusPill variant={r[8] === "PASS" ? "success" : "danger"} dot>{r[8]}</StatusPill></Td>
                  <Td>{r[9]}</Td>
                  <Td mono>{r[10]}</Td>
                </Tr>
              ))}
            </DataTable>
          </PanelCard>

          <PanelCard tone="gold" title="QC Parameter Reference">
            <table className="w-full text-sm">
              <thead><tr className="text-[11px] uppercase text-text-light"><th className="pb-2 text-left">Parameter</th><th className="pb-2 text-left">Range</th><th className="pb-2 text-left">Fail</th></tr></thead>
              <tbody className="data-num">
                {[["Dry Matter","88.0–99.0%","Reject"],["FFA","0.00–0.35%","Reject"],["Moisture","0.0–3.8%","Reject"],["Colour","Green A–B","Hold"]].map((r) => (
                  <tr key={r[0]} className="border-t border-border/60"><td className="py-2 font-sans">{r[0]}</td><td className="py-2">{r[1]}</td><td className="py-2 text-terracotta font-semibold">{r[2]}</td></tr>
                ))}
              </tbody>
            </table>
          </PanelCard>
        </div>
      )}

      {tab === "Rejection Analysis" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <PanelCard tone="terracotta" title="Weekly Rejection Trend">
            <div className="h-64">
              <ResponsiveContainer><BarChart data={rejectionWeek}><CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.012 130)" vertical={false} /><XAxis dataKey="day" stroke="#7A9E7E" fontSize={11} /><YAxis stroke="#7A9E7E" fontSize={11} /><Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} /><Bar dataKey="rejected" fill="#C1440E" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer>
            </div>
          </PanelCard>
          <PanelCard tone="gold" title="Rejections by Supplier">
            <div className="h-64">
              <ResponsiveContainer><BarChart data={rejBySupplier} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.012 130)" horizontal={false} /><XAxis type="number" stroke="#7A9E7E" fontSize={11} /><YAxis type="category" dataKey="name" stroke="#4A6741" fontSize={11} width={140} /><Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} /><Bar dataKey="val" fill="#E9A825" radius={[0, 6, 6, 0]} /></BarChart></ResponsiveContainer>
            </div>
          </PanelCard>
          <PanelCard tone="sky" title="Rejection by Parameter">
            <div className="h-64">
              <ResponsiveContainer><PieChart><Pie data={rejByParam} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90}>{rejByParam.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}</Pie><Legend /><Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} /></PieChart></ResponsiveContainer>
            </div>
          </PanelCard>
          <PanelCard tone="brand" title="12-Month Trend">
            <div className="h-64">
              <ResponsiveContainer><BarChart data={Array.from({length:12}, (_,i)=>({m:["Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May"][i], v: 4+Math.round(Math.sin(i)*3+i%3)}))}><CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.012 130)" vertical={false} /><XAxis dataKey="m" stroke="#7A9E7E" fontSize={11} /><YAxis stroke="#7A9E7E" fontSize={11} /><Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} /><Bar dataKey="v" fill="#2D6A4F" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer>
            </div>
          </PanelCard>
        </div>
      )}

      {(tab === "QC Matrix Config" || tab === "Certificates") && (
        <PanelCard title={tab}>
          <p className="text-text-light text-sm">{tab} — define inspection thresholds and download laboratory certificates.</p>
        </PanelCard>
      )}
    </div>
  );
}
