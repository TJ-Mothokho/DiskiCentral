import Link from "next/link";
import type { Fixture } from "@/api/types/fixtures.response";
import { formatMatchDate, isFinishedFixture, isLiveFixture, matchState, scoreLabel } from "@/lib/football";

export function MatchCard({ fixture }: { fixture: Fixture }) {
  const live = isLiveFixture(fixture);
  const finished = isFinishedFixture(fixture);
  return (
    <Link href={`/matches/${fixture.fixture.id}`} className="match-card group">
      <div className="match-card__meta">
        <span className="inline-flex items-center gap-1.5">
          <img src={fixture.league.logo} alt="" className="h-4 w-4 object-contain" />
          {fixture.league.name}
        </span>
        <span>{formatMatchDate(fixture.fixture.date)}</span>
      </div>
      <div className="match-card__teams">
        <div className="min-w-0">
          <p className="truncate font-semibold text-primary">{fixture.teams.home.name}</p>
          <p className="mt-1 truncate text-sm text-secondary">{fixture.teams.away.name}</p>
        </div>
        <div className="text-right">
          <p className={`font-mono text-lg font-semibold ${live ? "text-live" : "text-primary"}`}>
            {finished || live ? scoreLabel(fixture) : matchState(fixture)}
          </p>
          <p className={`mt-1 text-[11px] font-medium uppercase tracking-[0.12em] ${live ? "text-live" : "text-secondary"}`}>
            {live ? "Live now" : finished ? "Full time" : "Up next"}
          </p>
        </div>
      </div>
      <span className="match-card__arrow" aria-hidden="true">→</span>
    </Link>
  );
}

export function MatchdayBanner({ count }: { count: number }) {
  return (
    <div className="matchday-banner">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">Matchday</p>
        <p className="mt-1 text-xl font-semibold text-surface">South African football, live.</p>
      </div>
      <span className="text-sm text-surface/70">{count} fixture{count === 1 ? "" : "s"} today</span>
    </div>
  );
}
