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
      <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-4 border-b border-primary/10 pb-3 text-xs font-semibold text-secondary">
        <span>Statistic</span>
        <span className="max-w-24 truncate text-right">
          {fixture.teams.home.name}
        </span>
        <span className="max-w-24 truncate text-right">
          {fixture.teams.away.name}
        </span>
      </div>
      <div className="divide-y divide-primary/10">
        {rows.map(({ type }) => (
          <div
            key={type}
            className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-4 py-3 text-sm"
          >
            <span className="text-secondary">{type}</span>
            <span className="min-w-10 text-right font-mono text-primary">
              {getStatisticValue(statistics, fixture.teams.home.id, type)}
            </span>
            <span className="min-w-10 text-right font-mono text-primary">
              {getStatisticValue(statistics, fixture.teams.away.id, type)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
