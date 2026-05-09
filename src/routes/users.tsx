import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Eye, Ban } from "lucide-react";
import { PageHeader, Tabs } from "@/components/page-shell";
import { PanelCard } from "@/components/panel-card";
import { StatusPill } from "@/components/status-pill";
import { DataTable, Td, Tr } from "@/components/data-table";
import { users } from "@/lib/mock-data";

export const Route = createFileRoute("/users")({
  head: () => ({ meta: [{ title: "Users & Access — Verdant Ops" }] }),
  component: UsersPage,
});

const TABS = ["All Users", "Roles & Permissions", "Activity Log", "Access Requests"];

const roles = ["Operations Director", "QC Lab Manager", "Line Operator", "Procurement Officer", "Gate Operator", "Sales Manager"];
const modules = ["Dashboard", "Production", "Procurement", "Inventory", "QC", "Warehouse", "Logistics", "Sales", "Reports", "Maintenance", "Users"];

function PermIcon({ kind }: { kind: "full" | "view" | "none" }) {
  if (kind === "full") return <Check className="h-3.5 w-3.5 text-success mx-auto" />;
  if (kind === "view") return <Eye className="h-3.5 w-3.5 text-sky mx-auto" />;
  return <Ban className="h-3.5 w-3.5 text-text-muted mx-auto" />;
}

function permFor(role: string, mod: string): "full" | "view" | "none" {
  if (role === "Operations Director") return "full";
  if (role === "QC Lab Manager") return mod === "QC" ? "full" : ["Dashboard", "Production", "Inventory", "Reports"].includes(mod) ? "view" : "none";
  if (role === "Line Operator") return ["Production", "QC"].includes(mod) ? "view" : mod === "Dashboard" ? "view" : "none";
  if (role === "Procurement Officer") return mod === "Procurement" ? "full" : ["Dashboard", "Inventory", "Logistics"].includes(mod) ? "view" : "none";
  if (role === "Gate Operator") return mod === "Logistics" ? "full" : mod === "Dashboard" ? "view" : "none";
  if (role === "Sales Manager") return mod === "Sales" ? "full" : ["Dashboard", "Inventory", "Reports"].includes(mod) ? "view" : "none";
  return "none";
}

function UsersPage() {
  const [tab, setTab] = useState("All Users");
  return (
    <div>
      <PageHeader title="Users & Access" subtitle="Team members, roles and permission matrix" />
      <Tabs items={TABS} active={tab} onChange={setTab} />

      {tab === "All Users" && (
        <PanelCard tone="brand" title="Team Directory">
          <DataTable headers={["User", "Role", "Department", "Factory", "Last Login", "Status"]}>
            {users.map((r) => (
              <Tr key={r[0]}>
                <Td>
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-pale text-xs font-semibold text-brand">
                      {r[0].split(" ").map((p) => p[0]).slice(0, 2).join("")}
                    </div>
                    <span className="font-medium">{r[0]}</span>
                  </div>
                </Td>
                <Td>{r[1]}</Td>
                <Td>{r[2]}</Td>
                <Td>{r[3]}</Td>
                <Td mono>{r[4]}</Td>
                <Td><StatusPill variant="success" dot>{r[5]}</StatusPill></Td>
              </Tr>
            ))}
          </DataTable>
        </PanelCard>
      )}

      {tab === "Roles & Permissions" && (
        <PanelCard tone="gold" title="Role × Module Permission Matrix">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-section/80">
                <tr>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-text-light">Role</th>
                  {modules.map((m) => <th key={m} className="px-2 py-2.5 text-center text-[10px] font-semibold uppercase tracking-wider text-text-light">{m}</th>)}
                </tr>
              </thead>
              <tbody>
                {roles.map((r) => (
                  <tr key={r} className="border-t border-border/60 hover:bg-brand-pale/30">
                    <td className="px-3 py-2.5 font-medium text-text-dark">{r}</td>
                    {modules.map((m) => (
                      <td key={m} className="px-2 py-2.5 text-center"><PermIcon kind={permFor(r, m)} /></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex gap-4 text-xs text-text-light">
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> Full</span>
            <span className="flex items-center gap-1.5"><Eye className="h-3.5 w-3.5 text-sky" /> View only</span>
            <span className="flex items-center gap-1.5"><Ban className="h-3.5 w-3.5 text-text-muted" /> No access</span>
          </div>
        </PanelCard>
      )}

      {(tab === "Activity Log" || tab === "Access Requests") && (
        <PanelCard title={tab}>
          <p className="text-text-light text-sm">{tab} — full audit trail with IP / device tracking.</p>
        </PanelCard>
      )}
    </div>
  );
}
