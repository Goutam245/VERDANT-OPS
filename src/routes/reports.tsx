import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, FileSpreadsheet, Calendar } from "lucide-react";
import { PageHeader, Tabs } from "@/components/page-shell";
import { PanelCard } from "@/components/panel-card";
import { KpiCard } from "@/components/kpi-card";
import { DollarSign, Gauge, ShieldCheck, Truck } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Pie, PieChart, Cell, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { revenueByProduct } from "@/lib/mock-data";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports & Analytics — Verdant Ops" }] }),
  component: ReportsPage,
});

const TABS = ["Executive Dashboard", "Production", "Procurement", "QC Analytics", "Inventory", "Sales", "Export Center"];

const prodVsTarget = Array.from({ length: 30 }, (_, i) => ({ d: i + 1, actual: 17000 + Math.round(Math.sin(i / 3) * 1500 + i * 50), target: 19000 }));
const supplierRadar = [
  { metric: "Price", a: 90, b: 85, c: 70 },
  { metric: "Volume", a: 95, b: 88, c: 65 },
  { metric: "Quality", a: 92, b: 80, c: 60 },
  { metric: "Timeliness", a: 88, b: 82, c: 72 },
  { metric: "Reliability", a: 97, b: 90, c: 68 },
];
const yieldDonut = [
  { name: "Premium Oil", value: 74.8 },
  { name: "Biomass", value: 22.4 },
  { name: "Moisture Loss", value: 2.8 },
];
const PIE = ["#2D6A4F", "#E9A825", "#C1440E"];

const recentGate = [
  ["B-0711","Rift Valley Agri Co-op","Hass","5,200 kg","Processing"],
  ["B-0712","Central Kenya Highlands","Fuerte","5,500 kg","Processing"],
  ["B-0713","Western Smallholders","Hass","4,200 kg","Processing"],
  ["B-0714","Nakuru Farmers Assoc.","Mixed","3,200 kg","Quarantine"],
  ["B-0710","Central Kenya Highlands","Hass","7,000 kg","Completed"],
];

function ReportsPage() {
  const [tab, setTab] = useState("Executive Dashboard");
  return (
    <div>
      <PageHeader
        title="Reports & Analytics"
        subtitle="Executive intelligence across all operations"
        actions={
          <>
            <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3.5 py-2 text-sm font-medium text-text-medium hover:bg-card-hover"><FileSpreadsheet className="h-4 w-4" /> Export Excel</button>
            <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3.5 py-2 text-sm font-medium text-text-medium hover:bg-card-hover"><Download className="h-4 w-4" /> Export PDF</button>
            <button className="inline-flex items-center gap-2 rounded-md bg-brand px-3.5 py-2 text-sm font-medium text-white hover:bg-brand-light"><Calendar className="h-4 w-4" /> Schedule Weekly</button>
          </>
        }
      />
      <Tabs items={TABS} active={tab} onChange={setTab} />

      {tab === "Executive Dashboard" && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <KpiCard label="Revenue MTD" value={54.2} decimals={1} suffix="M KES" change="↑ +14.8% vs last month" tone="brand" icon={<DollarSign className="h-5 w-5" />} />
            <KpiCard label="Production Efficiency" value={86.4} decimals={1} suffix="%" change="↑ +3.2%" tone="gold" icon={<Gauge className="h-5 w-5" />} />
            <KpiCard label="QC Pass Rate" value={89.1} decimals={1} suffix="%" change="↑ +1.4%" tone="sky" icon={<ShieldCheck className="h-5 w-5" />} />
            <KpiCard label="Procurement Volume" value={284000} suffix="kg" change="↑ +8.6%" tone="terracotta" icon={<Truck className="h-5 w-5" />} />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <PanelCard tone="brand" title="Production vs Target — 30 Days">
              <div className="h-72">
                <ResponsiveContainer><AreaChart data={prodVsTarget} margin={{ top: 8, right: 16, bottom: 8, left: -4 }}>
                  <defs><linearGradient id="pa" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2D6A4F" stopOpacity={0.4} /><stop offset="100%" stopColor="#2D6A4F" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.012 130)" vertical={false} />
                  <XAxis dataKey="d" stroke="#7A9E7E" fontSize={11} /><YAxis stroke="#7A9E7E" fontSize={11} />
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="actual" stroke="#2D6A4F" strokeWidth={2} fill="url(#pa)" />
                  <Area type="monotone" dataKey="target" stroke="#E9A825" strokeWidth={1.5} fill="transparent" strokeDasharray="5 4" />
                </AreaChart></ResponsiveContainer>
              </div>
            </PanelCard>

            <PanelCard tone="gold" title="Revenue by Product — MTD">
              <div className="h-72">
                <ResponsiveContainer><BarChart data={revenueByProduct}><CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.012 130)" vertical={false} /><XAxis dataKey="name" stroke="#7A9E7E" fontSize={11} /><YAxis stroke="#7A9E7E" fontSize={11} unit="M" /><Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} formatter={(v) => `KES ${v}M`} /><Bar dataKey="value" fill="#E9A825" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer>
              </div>
            </PanelCard>

            <PanelCard tone="sky" title="Supplier Performance">
              <div className="h-72">
                <ResponsiveContainer><RadarChart data={supplierRadar}><PolarGrid stroke="oklch(0.92 0.012 130)" /><PolarAngleAxis dataKey="metric" stroke="#4A6741" fontSize={11} /><PolarRadiusAxis stroke="#A8BFA9" fontSize={10} /><Radar name="Rift Valley" dataKey="a" stroke="#2D6A4F" fill="#2D6A4F" fillOpacity={0.3} /><Radar name="Central Kenya" dataKey="b" stroke="#E9A825" fill="#E9A825" fillOpacity={0.25} /><Radar name="Nakuru" dataKey="c" stroke="#C1440E" fill="#C1440E" fillOpacity={0.2} /><Legend /></RadarChart></ResponsiveContainer>
              </div>
            </PanelCard>

            <PanelCard tone="terracotta" title="Yield Breakdown">
              <div className="h-72">
                <ResponsiveContainer><PieChart><Pie data={yieldDonut} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100}>{yieldDonut.map((_, i) => <Cell key={i} fill={PIE[i]} />)}</Pie><Legend /><Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} formatter={(v) => `${v}%`} /></PieChart></ResponsiveContainer>
              </div>
            </PanelCard>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <PanelCard tone="brand" title="Recent Gate Entries">
              <table className="w-full text-sm">
                <thead><tr className="text-[11px] uppercase tracking-wider text-text-light"><th className="pb-2 text-left">Batch</th><th className="pb-2 text-left">Supplier</th><th className="pb-2 text-left">Variety</th><th className="pb-2 text-left">Weight</th><th className="pb-2 text-left">Status</th></tr></thead>
                <tbody>{recentGate.map((r) => <tr key={r[0]} className="border-t border-border/60"><td className="py-2 data-num">{r[0]}</td><td className="py-2">{r[1]}</td><td className="py-2">{r[2]}</td><td className="py-2 data-num">{r[3]}</td><td className="py-2 text-text-medium">{r[4]}</td></tr>)}</tbody>
              </table>
            </PanelCard>

            <PanelCard tone="terracotta" title="QC Alerts">
              <ul className="space-y-2.5 text-sm">
                <li className="border-l-2 border-terracotta pl-3"><span className="text-terracotta font-semibold">🔴 CRITICAL 14:20</span> — Temperature variance Vat 4 — 44°C (limit: 40°C)</li>
                <li className="border-l-2 border-gold pl-3"><span className="text-gold font-semibold">⚠️ ADVISORY 13:30</span> — Batch B-0712 borderline DM — 87.2%</li>
                <li className="border-l-2 border-success pl-3"><span className="text-brand font-semibold">✅ APPROVED 12:45</span> — Batch B-0711 all parameters passed</li>
                <li className="border-l-2 border-terracotta pl-3"><span className="text-terracotta font-semibold">🔴 REJECTED 12:20</span> — Sample QC-0555 failed — FFA 0.61%, moisture 6.2%</li>
              </ul>
            </PanelCard>
          </div>
        </div>
      )}

      {tab !== "Executive Dashboard" && (
        <PanelCard title={tab}>
          <p className="text-text-light text-sm">{tab} — drill-down analytics with custom date range and export options.</p>
        </PanelCard>
      )}
    </div>
  );
}
