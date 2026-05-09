import { createFileRoute } from "@tanstack/react-router";
import { Factory, ShoppingCart, Boxes, Truck, Download, Plus, ArrowRight, AlertTriangle, AlertOctagon, Info } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Bar, BarChart, XAxis, YAxis, Tooltip, CartesianGrid, Line, LineChart } from "recharts";
import { KpiCard } from "@/components/kpi-card";
import { PanelCard } from "@/components/panel-card";
import { ProgressBar } from "@/components/progress-bar";
import { StatusPill, statusVariant } from "@/components/status-pill";
import { PageHeader } from "@/components/page-shell";
import { productionLines, alerts, yieldSeries, procurementByGroup, activityFeed } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Dashboard — Verdant Ops" }] }),
  component: Dashboard,
});

const sparkUp = [{ v: 8 }, { v: 11 }, { v: 9 }, { v: 14 }, { v: 13 }, { v: 17 }, { v: 18 }];
const sparkDown = [{ v: 30 }, { v: 28 }, { v: 29 }, { v: 27 }, { v: 25 }, { v: 24 }, { v: 27 }];
const sparkWavy = [{ v: 12 }, { v: 18 }, { v: 14 }, { v: 22 }, { v: 16 }, { v: 24 }, { v: 20 }];
const sparkBlue = [{ v: 95 }, { v: 96 }, { v: 97 }, { v: 96 }, { v: 98 }, { v: 97 }, { v: 98 }];

function Spark({ data, color }: { data: { v: number }[]; color: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={`g-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.8} fill={`url(#g-${color})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

const sevIcon = { critical: AlertOctagon, warning: AlertTriangle, info: Info } as const;
const sevTone = { critical: "danger", warning: "warning", info: "info" } as const;

function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Operations Overview"
        subtitle="Kakira Processing Plant · Saturday, 9 May 2026 · Shift B: 14:00–22:00"
        actions={
          <>
            <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3.5 py-2 text-sm font-medium text-text-medium hover:bg-card-hover transition-colors">
              <Download className="h-4 w-4" /> Export Daily Report
            </button>
            <button className="inline-flex items-center gap-2 rounded-md bg-brand px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-light transition-colors">
              <Plus className="h-4 w-4" /> Create Work Order
            </button>
          </>
        }
      />

      {/* KPI row */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Production Output — Today" value={18340} suffix="kg" sub="Avocado Oil (All Grades)" change="↑ +11.4% vs yesterday" tone="brand" icon={<Factory className="h-5 w-5" />} spark={<Spark data={sparkUp} color="#52B788" />} />
        <KpiCard label="Open Procurement Orders" value={27} sub="8 awaiting your approval" change="↓ −3 from yesterday" tone="gold" icon={<ShoppingCart className="h-5 w-5" />} spark={<Spark data={sparkWavy} color="#E9A825" />} />
        <KpiCard label="Inventory Health Score" value={87} suffix="%" sub="⚠ 11 SKUs below reorder level" change="↓ −2.1% from last week" tone="terracotta" icon={<Boxes className="h-5 w-5" />} spark={<Spark data={sparkDown} color="#C1440E" />} />
        <KpiCard label="On-Time Delivery Rate" value={98.1} decimals={1} suffix="%" sub="1 shipment delayed · 9 on track" change="↑ +0.6% vs last week" tone="sky" icon={<Truck className="h-5 w-5" />} spark={<Spark data={sparkBlue} color="#1D6FA4" />} />
      </div>

      {/* Lines + alerts */}
      <div className="grid gap-6 xl:grid-cols-[1.62fr_1fr]">
        <PanelCard
          tone="brand"
          title="Production Lines — Live Status"
          action={<button className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:gap-2 transition-all">View All <ArrowRight className="h-3 w-3" /></button>}
        >
          <div className="space-y-3">
            {productionLines.map((l) => (
              <div key={l.batch} className="rounded-lg border border-border/60 bg-card p-4 transition-colors hover:bg-card-hover">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <div className="flex items-center gap-2 min-w-[150px]">
                    <span className={`h-2 w-2 rounded-full ${l.status === "Running" ? "bg-success animate-pulse" : l.status === "Slow" ? "bg-gold" : "bg-terracotta"}`} />
                    <p className="font-medium text-text-dark">{l.line}</p>
                  </div>
                  <div className="flex-1 min-w-[180px]">
                    <p className="text-sm text-text-medium">{l.product}</p>
                    <p className="text-xs text-text-light mt-0.5">Operator: {l.operator} · <span className="data-num">{l.batch}</span> · {l.time}</p>
                  </div>
                  <div className="w-44">
                    <ProgressBar value={l.progress} tone={l.status === "Fault" ? "terracotta" : l.status === "Slow" ? "gold" : "brand"} />
                    <p className="mt-1 text-xs data-num text-text-light">{l.progress}% · {l.output}</p>
                  </div>
                  <StatusPill variant={statusVariant(l.status)} dot>{l.status}</StatusPill>
                </div>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard tone="terracotta" title="Active Alerts" action={<span className="text-xs font-semibold text-terracotta">🔴 5 alerts</span>}>
          <div className="space-y-3">
            {alerts.map((a) => {
              const Icon = sevIcon[a.sev as keyof typeof sevIcon];
              const tone = sevTone[a.sev as keyof typeof sevTone];
              return (
                <div key={a.title} className="rounded-lg border border-border/60 p-3.5">
                  <div className="flex items-start gap-2.5">
                    <Icon className={`h-4 w-4 shrink-0 mt-0.5 ${tone === "danger" ? "text-terracotta" : tone === "warning" ? "text-gold" : "text-sky"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <StatusPill variant={tone}>{a.sev.toUpperCase()}</StatusPill>
                      </div>
                      <p className="mt-1.5 text-sm font-medium text-text-dark">{a.title}</p>
                      <p className="text-xs text-text-medium mt-0.5">{a.body}</p>
                      {a.sub && <p className="text-xs text-text-light mt-1 italic">{a.sub}</p>}
                      <button className={`mt-2 text-xs font-semibold ${a.action === "Raise PO" ? "text-terracotta" : "text-brand"} hover:underline`}>
                        [{a.action}]
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </PanelCard>
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-[0.96fr_1.04fr]">
        <PanelCard tone="brand" title="Yield Performance — 7 Days">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yieldSeries} margin={{ top: 8, right: 16, bottom: 8, left: -10 }}>
                <defs>
                  <linearGradient id="ya" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2D6A4F" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#2D6A4F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.012 130)" vertical={false} />
                <XAxis dataKey="day" stroke="#7A9E7E" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#7A9E7E" fontSize={12} domain={[80, 100]} tickLine={false} axisLine={false} unit="%" />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.92 0.012 130)", fontSize: 12 }} />
                <Area type="monotone" dataKey="actual" stroke="#2D6A4F" strokeWidth={2.5} fill="url(#ya)" name="Actual Yield" />
                <Line type="monotone" dataKey="target" stroke="#E9A825" strokeWidth={2} strokeDasharray="5 4" dot={false} name="Target" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </PanelCard>

        <PanelCard tone="gold" title="Procurement by Farmer Group — This Week">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={procurementByGroup} layout="vertical" margin={{ top: 8, right: 24, bottom: 8, left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.012 130)" horizontal={false} />
                <XAxis type="number" stroke="#7A9E7E" fontSize={11} tickLine={false} axisLine={false} unit="%" />
                <YAxis type="category" dataKey="name" stroke="#4A6741" fontSize={11} tickLine={false} axisLine={false} width={170} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.92 0.012 130)", fontSize: 12 }} formatter={(v) => `${v}%`} />
                <Bar dataKey="value" fill="#E9A825" radius={[0, 6, 6, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </PanelCard>
      </div>

      {/* Activity + shift summary */}
      <div className="grid gap-6 xl:grid-cols-[1.22fr_1fr]">
        <PanelCard tone="sky" title="Today's Activity Feed">
          <ol className="relative space-y-4 pl-6 max-h-[420px] overflow-y-auto pr-2">
            <span className="absolute left-2 top-2 bottom-2 w-px bg-border" />
            {activityFeed.map((e, i) => {
              const dot = e.type === "danger" ? "bg-terracotta" : e.type === "warn" ? "bg-gold" : e.type === "info" ? "bg-sky" : "bg-success";
              return (
                <li key={i} className="relative">
                  <span className={`absolute -left-[18px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-card ${dot}`} />
                  <div className="flex gap-3">
                    <span className="data-num text-xs text-text-light w-12 shrink-0">{e.t}</span>
                    <p className="text-sm text-text-dark leading-relaxed">{e.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </PanelCard>

        <PanelCard tone="gold" title="Shift A Summary">
          <p className="text-xs text-text-light data-num mb-4">06:00 – 14:00 · 9 May 2026</p>
          <dl className="grid grid-cols-2 gap-4">
            {[
              ["Total Output", "18,340 kg"],
              ["Batches Run", "7"],
              ["QC Pass Rate", "91.4%"],
              ["Downtime", "38 min"],
              ["Orders Fulfilled", "4"],
              ["Gate Entries", "12"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg bg-section/60 p-3">
                <dt className="text-xs uppercase tracking-wider text-text-light">{k}</dt>
                <dd className="mt-1 kpi-num text-xl text-text-dark">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 rounded-lg border border-border/60 bg-brand-pale/50 p-4">
            <p className="text-xs uppercase tracking-wider text-brand font-semibold">Top Performer</p>
            <p className="mt-1 font-display text-lg text-text-dark">Cold-Press Line A · 5,000 L</p>
            <p className="text-xs text-text-medium">Operator: Samuel Akena</p>
            <button className="mt-3 text-xs font-semibold text-brand hover:underline">Full Report →</button>
          </div>
        </PanelCard>
      </div>
    </div>
  );
}
