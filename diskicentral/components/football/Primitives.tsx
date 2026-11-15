import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 className="mt-1 text-2xl font-bold tracking-[-0.03em] text-primary sm:text-[28px]">
          {title}
        </h2>
        {description ? <p className="mt-2 max-w-2xl text-secondary">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="rounded-2xl border border-primary/10 bg-surface p-8 text-center">
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
      <p className="mt-2 text-secondary">{message}</p>
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-live/30 bg-live/5 p-6 text-live">
      <p className="font-semibold">Something went wrong</p>
      <p className="mt-1 text-sm">{message}</p>
    </div>
  );
}

export function AdSlot({ label = "Sponsored" }: { label?: string }) {
  return (
    <aside className="ad-slot" aria-label={label}>
      <span>{label}</span>
      <strong>300 × 250</strong>
      <small>Partner message placement</small>
    </aside>
  );
}

export function StatBar({
  label,
  value,
  max = 100,
  tone = "lime",
}: {
  label: string;
  value: string | number;
  max?: number;
  tone?: "lime" | "forest" | "blue";
}) {
  const numeric = typeof value === "number" ? value : Number.parseFloat(value);
  const width = Number.isFinite(numeric) ? Math.min(100, Math.max(4, (numeric / max) * 100)) : 4;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-xs font-medium text-secondary">
        <span>{label}</span>
        <span className="text-primary">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-primary/8">
        <div className={`stat-bar stat-bar--${tone}`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}
