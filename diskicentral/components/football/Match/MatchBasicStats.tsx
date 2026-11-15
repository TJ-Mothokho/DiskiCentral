import type { Fixture } from "@/api/types/fixtures.response";
import type { FixtureTeamStatistics } from "@/api/types/fixtures-statistics.response";
import { SectionHeading } from "@/components/football/Primitives";
import { getStatisticValue } from "./MatchStatisticsUtils";

export function MatchBasicStats({
  fixture,
  statistics,
}: {
  fixture: Fixture;
  statistics: FixtureTeamStatistics[];
}) {
  const stats = [
    {
      label: "Goals",
      home: fixture.goals.home,
      away: fixture.goals.away,
    },
    {
      label: "Passes",
      home: getStatisticValue(statistics, fixture.teams.home.id, "Total passes"),
      away: getStatisticValue(statistics, fixture.teams.away.id, "Total passes"),
    },
    {
      label: "Offsides",
      home: getStatisticValue(statistics, fixture.teams.home.id, "Offsides"),
      away: getStatisticValue(statistics, fixture.teams.away.id, "Offsides"),
    },
    {
      label: "Corners",
      home: getStatisticValue(statistics, fixture.teams.home.id, "Corner Kicks"),
      away: getStatisticValue(statistics, fixture.teams.away.id, "Corner Kicks"),
    },
    {
      label: "Fouls",
      home: getStatisticValue(statistics, fixture.teams.home.id, "Fouls"),
      away: getStatisticValue(statistics, fixture.teams.away.id, "Fouls"),
    },
  ];

  return (
    <div className="space-y-4">
      <SectionHeading eyebrow="At a glance" title="Basic stats" />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="detail-panel p-4">
            <p className="eyebrow">{stat.label}</p>
            <div className="mt-2 flex items-center justify-between gap-2 font-mono text-sm font-semibold text-primary">
              <span>{stat.home ?? "—"}</span>
              <span className="text-secondary">–</span>
              <span>{stat.away ?? "—"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
