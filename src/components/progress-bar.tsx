import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  tone = "brand",
  className,
}: {
  value: number;
  tone?: "brand" | "gold" | "terracotta" | "sky";
  className?: string;
}) {
  const palette = {
    brand: "from-success to-brand-light",
    gold: "from-gold to-[oklch(0.82_0.13_75)]",
    terracotta: "from-terracotta to-[oklch(0.62_0.16_45)]",
    sky: "from-sky to-[oklch(0.6_0.12_235)]",
  }[tone];
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-section", className)}>
      <div
        className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-1000 ease-out", palette)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
