import type {
  FixtureStatisticsValue,
  FixtureTeamStatistics,
} from "@/api/types/fixtures-statistics.response";

export type MatchStatCategory = {
  label: string;
  statistics: FixtureStatisticsValue[];
};

export function getStatisticValue(
  statistics: FixtureTeamStatistics[],
  teamId: number,
  type: string,
) {
  return (
    statistics
      .find((group) => group.team.id === teamId)
      ?.statistics.find((stat) => stat.type === type)?.value ?? "—"
  );
}

function isExpectedGoals(type: string) {
  return /expected[\s_-]*goals|\bxg\b/i.test(type);
}

function categoryFor(
  type: string,
): "Attack" | "Passing" | "Goalkeeping" | "Defense" | null {
  const normalized = type.toLowerCase();
  if (categoryPatterns.Attack.test(normalized)) return "Attack";
  if (categoryPatterns.Passing.test(normalized)) return "Passing";
  if (categoryPatterns.Goalkeeping.test(normalized)) return "Goalkeeping";
  if (categoryPatterns.Defense.test(normalized)) return "Defense";
  return null;
}

const categoryPatterns = {
  Attack: /shot/,
  Passing: /pass|cross|through ball|key pass/,
  Goalkeeping: /save|goalkeeper|goals? prevented/,
  Defense: /tackle|interception|clearance|duel|block/,
};

export function groupMatchStatistics(
  statistics: FixtureTeamStatistics[],
): MatchStatCategory[] {
  const uniqueStats = new Map<string, FixtureStatisticsValue>();
  for (const stat of statistics.flatMap((group) => group.statistics)) {
    if (!isExpectedGoals(stat.type)) uniqueStats.set(stat.type, stat);
  }

  const categories: Record<string, FixtureStatisticsValue[]> = {
    Attack: [],
    Passing: [],
    Defense: [],
    Goalkeeping: [],
  };
  for (const stat of uniqueStats.values()) {
    const category = categoryFor(stat.type);
    if (category) categories[category]?.push(stat);
  }

  const topStatNames = new Set([
    "ball possession",
    "total shots",
    "shots on goal",
    "total passes",
    "corner kicks",
    "offsides",
    "fouls",
    "yellow cards",
    "red cards",
    "goalkeeper saves",
    "saves",
  ]);
  const topFiltered = (items: FixtureStatisticsValue[]) =>
    items.filter((stat) => !topStatNames.has(stat.type.trim().toLowerCase()));

  const result: MatchStatCategory[] = [
    { label: "Attacking", statistics: topFiltered(categories.Attack) },
    { label: "Passing", statistics: topFiltered(categories.Passing) },
    { label: "Defence", statistics: topFiltered(categories.Defense) },
    { label: "Goalkeeping", statistics: topFiltered(categories.Goalkeeping) },
  ];
  return result.filter((category) => category.statistics.length > 0);
}
