import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Orders — Verdant Ops" }] }),
  component: () => (
    <div className="rounded-xl bg-card p-10 text-center border border-border/60">
      <h1 className="font-display text-2xl text-text-dark">Orders</h1>
      <p className="mt-2 text-text-medium">Unified buyer-order view consolidates with <Link to="/sales" className="text-brand font-semibold hover:underline">Sales & Dispatch</Link>.</p>
    </div>
  ),
});
