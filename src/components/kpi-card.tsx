import { cn } from "@/lib/utils";
import { useCountUp } from "@/hooks/use-count-up";
import type { ReactNode } from "react";

type Tone = "brand" | "gold" | "terracotta" | "sky";

const accent: Record<Tone, string> = {
  brand: "before:bg-success",
  gold: "before:bg-gold",
  terracotta: "before:bg-terracotta",
  sky: "before:bg-sky",
};

const iconBg: Record<Tone, string> = {
  brand: "bg-brand-pale text-brand",
  gold: "bg-gold-light text-gold",
  terracotta: "bg-terracotta-light text-terracotta",
  sky: "bg-sky-light text-sky",
};

const pillBg: Record<Tone, string> = {
  brand: "bg-brand-pale text-brand",
  gold: "bg-gold-light text-[oklch(0.45_0.13_70)]",
  terracotta: "bg-terracotta-light text-terracotta",
  sky: "bg-sky-light text-sky",
};

interface KpiCardProps {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  sub?: string;
  change?: string;
  tone: Tone;
  icon: ReactNode;
  spark?: ReactNode;
}

export function KpiCard({ label, value, suffix = "", decimals = 0, sub, change, tone, icon, spark }: KpiCardProps) {
  const v = useCountUp(value);
  const display = v.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-card p-5 shadow-[0_1px_2px_oklch(0_0_0/0.04),0_4px_16px_oklch(0_0_0/0.04)]",
        "before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:content-['']",
        "transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_oklch(0_0_0/0.08)]",
        "anim-rise",
        accent[tone]
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-text-light">{label}</p>
          <p className="mt-3 kpi-num text-4xl text-text-dark">
            {display}
            {suffix && <span className="ml-1 text-2xl text-text-medium">{suffix}</span>}
          </p>
          {sub && <p className="mt-1 text-sm text-text-medium">{sub}</p>}
          {change && (
            <span className={cn("mt-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", pillBg[tone])}>
              {change}
            </span>
          )}
        </div>
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-full", iconBg[tone])}>{icon}</div>
      </div>
      {spark && <div className="absolute bottom-0 right-0 h-12 w-32 opacity-70">{spark}</div>}
    </div>
  );
}
