import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Factory, Sprout, Boxes, ShoppingCart, ShieldCheck, Warehouse,
  Truck, DollarSign, BarChart3, Wrench, Users, Settings, ChevronDown, Hexagon
} from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { to: string; label: string; icon: React.ComponentType<{ className?: string }> };
type Group = { label: string; items: Item[] };

const groups: Group[] = [
  { label: "Overview", items: [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
  ]},
  { label: "Operations", items: [
    { to: "/production", label: "Production", icon: Factory },
    { to: "/procurement", label: "Procurement", icon: Sprout },
    { to: "/inventory", label: "Inventory", icon: Boxes },
    { to: "/orders", label: "Orders", icon: ShoppingCart },
    { to: "/quality", label: "Quality Control", icon: ShieldCheck },
    { to: "/warehouse", label: "Warehouse", icon: Warehouse },
    { to: "/logistics", label: "Logistics & Gate", icon: Truck },
    { to: "/sales", label: "Sales & Dispatch", icon: DollarSign },
  ]},
  { label: "Intelligence", items: [
    { to: "/reports", label: "Reports & Analytics", icon: BarChart3 },
  ]},
  { label: "System", items: [
    { to: "/maintenance", label: "Maintenance", icon: Wrench },
    { to: "/users", label: "Users & Access", icon: Users },
  ]},
];

export function AppSidebar() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  return (
    <aside className="hidden lg:flex w-[270px] shrink-0 flex-col bg-sidebar text-sidebar-foreground sticky top-0 h-screen self-start">
      <div className="px-5 pt-6 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center">
            <Hexagon className="h-9 w-9 text-sidebar-accent" strokeWidth={1.5} fill="currentColor" fillOpacity={0.15} />
            <Sprout className="absolute h-4 w-4 text-white" />
          </div>
          <div>
            <p className="font-display text-lg font-semibold leading-none text-white">VERDANT OPS</p>
            <p className="text-[11px] text-sidebar-foreground/70 mt-1">Kakira Processing Plant</p>
          </div>
        </div>
        <button className="mt-4 flex w-full items-center justify-between rounded-md border border-sidebar-border bg-white/5 px-3 py-2 text-xs text-sidebar-foreground hover:bg-white/10 transition-colors">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sidebar-accent animate-pulse" />
            Shift B · 14:00–22:00
          </span>
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {groups.map((g) => (
          <div key={g.label} className="mb-5">
            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-sidebar-foreground/50">
              {g.label}
            </p>
            <ul className="space-y-0.5">
              {g.items.map((it) => {
                const active = it.to === "/" ? path === "/" : path.startsWith(it.to);
                const Icon = it.icon;
                return (
                  <li key={it.to}>
                    <Link
                      to={it.to}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
                        active
                          ? "bg-[oklch(0.68_0.13_155/0.18)] text-white font-medium"
                          : "text-sidebar-foreground hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r bg-sidebar-accent" />}
                      <Icon className={cn("h-4 w-4 shrink-0", active ? "text-sidebar-accent" : "text-sidebar-foreground/70 group-hover:text-white")} />
                      <span>{it.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent text-sm font-semibold text-white">NJ</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Nkechi Jabari</p>
            <p className="text-[11px] text-sidebar-foreground/70 truncate">Operations Director</p>
          </div>
          <button className="text-sidebar-foreground/70 hover:text-white transition-colors">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
