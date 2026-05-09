import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  subtitle,
  actions,
  className,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 flex flex-wrap items-end justify-between gap-4", className)}>
      <div>
        <h1 className="font-display text-3xl font-semibold text-text-dark">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-text-medium">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Tabs({
  items,
  active,
  onChange,
}: {
  items: string[];
  active: string;
  onChange: (s: string) => void;
}) {
  return (
    <div className="mb-6 flex flex-wrap gap-1 border-b border-border/60">
      {items.map((it) => {
        const isActive = it === active;
        return (
          <button
            key={it}
            onClick={() => onChange(it)}
            className={cn(
              "relative px-4 py-2.5 text-sm font-medium transition-colors",
              isActive ? "text-brand" : "text-text-light hover:text-text-dark"
            )}
          >
            {it}
            {isActive && <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-brand" />}
          </button>
        );
      })}
    </div>
  );
}
