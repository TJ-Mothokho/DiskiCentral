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
  const findValue = (teamId: number, names: string[]) => {
    for (const name of names) {
      const value = getStatisticValue(statistics, teamId, name);
      if (value !== "—") return value;
    }
    return "—";
  };
  const statOptions = [
    ["Possession", ["Ball Possession"]],
    ["Total shots", ["Total Shots"]],
    ["Shots on target", ["Shots on Goal"]],
    ["Passes", ["Total passes"]],
    ["Corners", ["Corner Kicks"]],
    ["Offsides", ["Offsides"]],
    ["Fouls", ["Fouls"]],
    ["Yellow cards", ["Yellow Cards"]],
    ["Red cards", ["Red Cards"]],
    ["Saves", ["Goalkeeper Saves", "Saves"]],
  ] as const;
  const stats = [
    ...(fixture.goals.home !== null && fixture.goals.away !== null
      ? [{ label: "Goals", home: fixture.goals.home, away: fixture.goals.away }]
      : []),
    ...statOptions
      .map(([label, names]) => ({
        label,
        home: findValue(fixture.teams.home.id, [...names]),
        away: findValue(fixture.teams.away.id, [...names]),
      }))
      .filter((stat) => stat.home !== "—" || stat.away !== "—"),
  ];

  return (
    <div className="space-y-4">
      <SectionHeading eyebrow="Match analysis" title="Top Stats" />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="detail-panel p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-lg font-bold text-primary">{stat.home ?? "—"}</span>
              <p className="text-center text-xs font-semibold text-secondary">{stat.label}</p>
              <span className="font-mono text-lg font-bold text-primary">{stat.away ?? "—"}</span>
            </div>
            <ComparisonBar home={stat.home} away={stat.away} label={stat.label} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ComparisonBar({
  home,
  away,
  label,
}: {
  home: string | number | null;
  away: string | number | null;
  label: string;
}) {
  const homeNumber = numericStat(home);
  const awayNumber = numericStat(away);
  let homePercentage = 50;
  let awayPercentage = 50;
  if (homeNumber !== null && awayNumber !== null) {
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
    <div
      className="mt-3 flex h-2 overflow-hidden rounded-full bg-primary/8"
      aria-label={`${label}: home ${home ?? "—"}, away ${away ?? "—"}`}
    >
      <span className="h-full bg-accent" style={{ width: `${homePercentage}%` }} />
      <span className="h-full bg-tertiary" style={{ width: `${awayPercentage}%` }} />
    </div>
  );
}

function numericStat(value: string | number | null) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace("%", ""));
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}
