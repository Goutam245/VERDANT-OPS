import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Tone = "brand" | "gold" | "terracotta" | "sky" | "neutral";

const accents: Record<Tone, string> = {
  brand: "before:bg-success",
  gold: "before:bg-gold",
  terracotta: "before:bg-terracotta",
  sky: "before:bg-sky",
  neutral: "before:bg-border",
};

export function PanelCard({
  title,
  action,
  tone = "neutral",
  className,
  children,
}: {
  title?: string;
  action?: ReactNode;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-xl bg-card shadow-[0_1px_2px_oklch(0_0_0/0.04),0_4px_16px_oklch(0_0_0/0.03)]",
        "before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:content-['']",
        accents[tone],
        className
      )}
    >
      {(title || action) && (
        <header className="flex items-center justify-between border-b border-border/60 px-5 py-3.5">
          {title && <h2 className="font-display text-base font-semibold text-text-dark">{title}</h2>}
          {action}
        </header>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}
