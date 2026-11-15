import type { Fixture } from "@/api/types/fixtures.response";
import { formatMatchDate, matchState, scoreLabel } from "@/lib/football";
import { LiveMatchSubscription } from "./LiveMatchSubscription";

export function MatchHeader({
  fixtureId,
  fixture,
}: {
  fixtureId: number;
  fixture: Fixture;
}) {
  return (
    <div className="detail-hero">
      <p className="eyebrow">
        {fixture.league.name} · {fixture.league.round || "Match centre"}
      </p>
      <div className="mt-7 grid items-center gap-5 sm:grid-cols-[1fr_auto_1fr]">
        <div className="flex items-center gap-3 sm:flex-col sm:justify-center">
          <img
            src={fixture.teams.home.logo}
            alt=""
            className="h-12 w-12 object-contain sm:h-16 sm:w-16"
          />
          <span className="text-center font-semibold text-surface">
            {fixture.teams.home.name}
          </span>
        </div>
        <div className="text-center">
          <p className="font-mono text-4xl font-bold text-surface">
            {scoreLabel(fixture)}
          </p>
          <p className="mt-2 text-sm text-surface/70">
            {matchState(fixture)} · {formatMatchDate(fixture.fixture.date)}
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 sm:flex-col sm:justify-center">
          <img
            src={fixture.teams.away.logo}
            alt=""
            className="h-12 w-12 object-contain sm:h-16 sm:w-16"
          />
          <span className="text-center font-semibold text-surface">
            {fixture.teams.away.name}
          </span>
        </div>
      </div>
      <LiveMatchSubscription fixtureId={fixtureId} initialFixture={fixture} />
    </div>
  );
}
