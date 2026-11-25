import type { Fixture } from "@/api/types/fixtures.response";
import type {
  FixtureStatisticsValue,
  FixtureTeamStatistics,
} from "@/api/types/fixtures-statistics.response";
import { getStatisticValue } from "./MatchStatisticsUtils";

export function MatchStatRows({
  rows,
  fixture,
  statistics,
}: {
  rows: FixtureStatisticsValue[];
  fixture: Fixture;
  statistics: FixtureTeamStatistics[];
}) {
  return (
    <div className="detail-panel">
      <div className="divide-y divide-primary/10">
        {rows.map(({ type }) => (
          <StatComparison
            key={type}
            label={type}
            home={getStatisticValue(statistics, fixture.teams.home.id, type)}
            away={getStatisticValue(statistics, fixture.teams.away.id, type)}
          />
        ))}
      </div>
    </div>
  );
}

function StatComparison({
  label,
  home,
  away,
}: {
  label: string;
  home: string | number;
  away: string | number;
}) {
  if (home === "—" && away === "—") return null;
  const homeNumber = typeof home === "number" ? home : Number(String(home).replace("%", ""));
  const awayNumber = typeof away === "number" ? away : Number(String(away).replace("%", ""));
  let homePercentage = 50;
  let awayPercentage = 50;
  if (Number.isFinite(homeNumber) && Number.isFinite(awayNumber)) {
    if (/possession|accuracy/i.test(label)) {
      homePercentage = Math.min(100, Math.max(0, homeNumber));
      awayPercentage = 100 - homePercentage;
    } else {
      const total = homeNumber + awayNumber;
      if (total > 0) {
        homePercentage = (homeNumber / total) * 100;
        awayPercentage = (awayNumber / total) * 100;
      }
    }
  }
  return (
    <div className="py-4">
      <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
        <span className="font-mono text-sm font-bold text-primary">{home}</span>
        <span className="text-center text-xs font-semibold text-secondary">{label}</span>
        <span className="text-right font-mono text-sm font-bold text-primary">{away}</span>
      </div>
      <div
        className="mt-3 flex h-2 overflow-hidden rounded-full bg-primary/8"
        aria-label={`${label}: home ${home}, away ${away}`}
      >
        <span className="h-full bg-accent" style={{ width: `${homePercentage}%` }} />
        <span className="h-full bg-tertiary" style={{ width: `${awayPercentage}%` }} />
      </div>
    </div>
  );
}
