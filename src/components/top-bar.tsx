import { useRouterState } from "@tanstack/react-router";
import { Search, Bell, HelpCircle, Leaf } from "lucide-react";

const titleMap: Record<string, string> = {
  "/": "Dashboard",
  "/production": "Production",
  "/procurement": "Procurement",
  "/inventory": "Inventory",
  "/orders": "Orders",
  "/quality": "Quality Control",
  "/warehouse": "Warehouse",
  "/logistics": "Logistics & Gate",
  "/sales": "Sales & Dispatch",
  "/reports": "Reports & Analytics",
  "/maintenance": "Maintenance",
  "/users": "Users & Access",
};

export function TopBar() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const current = titleMap[path] ?? "Dashboard";
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border/60 bg-card/90 px-6 backdrop-blur">
      <div className="text-sm text-text-light">
        <span>Home</span>
        <span className="mx-2 text-text-muted">/</span>
        <span className="font-medium text-text-dark">{current}</span>
      </div>
      <div className="flex-1" />
      <div className="hidden md:flex items-center gap-2 rounded-md border border-border bg-section px-3 py-1.5 text-sm text-text-light w-72">
        <Search className="h-4 w-4" />
        <input className="flex-1 bg-transparent outline-none placeholder:text-text-muted" placeholder="Search batches, orders, SKUs..." />
        <kbd className="rounded bg-card px-1.5 py-0.5 text-[10px] text-text-light border border-border">⌘K</kbd>
      </div>
      <div className="flex items-center gap-1.5 rounded-full bg-brand-pale px-3 py-1 text-xs font-medium text-brand">
        <Leaf className="h-3.5 w-3.5" />
        Shift B · 14:00–22:00
      </div>
      <button className="relative rounded-md p-2 text-text-medium hover:bg-section transition-colors">
        <Bell className="h-4 w-4" />
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-terracotta text-[10px] font-semibold text-white">4</span>
      </button>
      <button className="rounded-md p-2 text-text-medium hover:bg-section transition-colors">
        <HelpCircle className="h-4 w-4" />
      </button>
    </header>
  );
}
