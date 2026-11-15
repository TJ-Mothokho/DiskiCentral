export function MatchdayBanner({ count }: { count: number }) {
  return (
    <div className="matchday-banner">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
          Matchday
        </p>
        <p className="mt-1 text-xl font-semibold text-surface">
          South African football, live.
        </p>
      </div>
      <span className="text-sm text-surface/70">
        {count} fixture{count === 1 ? "" : "s"} today
      </span>
    </div>
  );
}
