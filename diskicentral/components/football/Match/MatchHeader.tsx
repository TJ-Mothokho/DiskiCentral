import type { Fixture } from "@/api/types/fixtures.response";
import type { LiveGameSnapshot } from "@/api/live";
import Link from "next/link";
import {
  formatMatchDate,
  formatRoundLabel,
  formatSeasonLabel,
  isFinishedFixture,
  isLiveFixture,
  matchState,
  scoreLabel,
} from "@/lib/football";
import { LiveMatchSubscription } from "./LiveMatchSubscription";
import { MatchScoreBreakdown } from "./MatchScoreBreakdown";

export function MatchHeader({
  fixtureId,
  fixture,
  liveEnded,
  onSnapshot,
  onSnapshotData,
  onEnded,
}: {
  fixtureId: number;
  fixture: Fixture;
  liveEnded?: boolean;
  onSnapshot?: (fixture: Fixture) => void;
  onSnapshotData?: (snapshot: LiveGameSnapshot) => void;
  onEnded?: () => void;
}) {
  return (
    <div className="detail-hero">
      <p className="eyebrow">
        {fixture.league.name} · {formatSeasonLabel(fixture.league.season)} - {formatRoundLabel(fixture.league.round) || "Match centre"}
      </p>
      <div className="mt-7 grid items-center gap-5 sm:grid-cols-[1fr_auto_1fr]">
        <Link href={`/teams/${fixture.teams.home.id}`} className="flex items-center gap-3 rounded-xl transition-opacity hover:opacity-80 sm:flex-col sm:justify-center">
          <img
            src={fixture.teams.home.logo}
            alt=""
            className="h-12 w-12 object-contain sm:h-16 sm:w-16"
          />
          <span className="text-center font-semibold text-surface">
            {fixture.teams.home.name}
          </span>
        </Link>
        <div className="text-center">
          <p className="font-mono text-4xl font-bold text-surface">
            {scoreLabel(fixture)}
          </p>
          <MatchScoreBreakdown fixture={fixture} onDark />
          <p className="mt-2 text-sm text-surface/70">
            {matchState(fixture)} ·{" "}
            {formatMatchDate(
              fixture.fixture.date,
              fixture.fixture.timezone || "Africa/Johannesburg",
            )}
          </p>
        </div>
        <Link href={`/teams/${fixture.teams.away.id}`} className="flex items-center justify-end gap-3 rounded-xl transition-opacity hover:opacity-80 sm:flex-col sm:justify-center">
          <img
            src={fixture.teams.away.logo}
            alt=""
            className="h-12 w-12 object-contain sm:h-16 sm:w-16"
          />
          <span className="text-center font-semibold text-surface">
            {fixture.teams.away.name}
          </span>
        </Link>
      </div>
      {isLiveFixture(fixture) && (
        <LiveMatchSubscription
          fixtureId={fixtureId}
          initialFixture={fixture}
          onSnapshot={onSnapshot}
          onSnapshotData={onSnapshotData}
          onEnded={onEnded}
        />
      )}
      {isFinishedFixture(fixture) && liveEnded && (
        <p className="mt-2 text-xs text-surface/70">Match ended</p>
      )}
    </div>
  );
}
