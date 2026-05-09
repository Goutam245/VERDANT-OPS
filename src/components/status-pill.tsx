import { cn } from "@/lib/utils";

type Variant = "success" | "warning" | "danger" | "info" | "neutral" | "brand" | "gold";

const styles: Record<Variant, string> = {
  success: "bg-brand-pale text-brand",
  brand: "bg-brand-pale text-brand",
  warning: "bg-gold-light text-[oklch(0.45_0.13_70)]",
  gold: "bg-gold-light text-[oklch(0.45_0.13_70)]",
  danger: "bg-terracotta-light text-terracotta",
  info: "bg-sky-light text-sky",
  neutral: "bg-section text-text-medium",
};

export function StatusPill({
  children,
  variant = "neutral",
  dot = false,
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
        styles[variant],
        className
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

export function statusVariant(status: string): Variant {
  const s = status.toLowerCase();
  if (/(critical|fault|fail|reject|alert|hold|urgent|danger)/.test(s)) return "danger";
  if (/(warn|slow|borderline|watch|closing|pending)/.test(s)) return "warning";
  if (/(info|booked|scheduled|in transit|inside|processing)/.test(s)) return "info";
  if (/(pass|healthy|ok|running|completed|delivered|cleared|active|approved|confirmed|near done|resolved|dispatched)/.test(s)) return "success";
  return "neutral";
}
