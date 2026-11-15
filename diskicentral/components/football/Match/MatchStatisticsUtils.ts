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
): "Attack" | "Passing" | "Goalkeeping" | "Defense" | "Other" {
  const normalized = type.toLowerCase();
  if (categoryPatterns.Attack.test(normalized)) return "Attack";
  if (categoryPatterns.Passing.test(normalized)) return "Passing";
  if (categoryPatterns.Goalkeeping.test(normalized)) return "Goalkeeping";
  if (categoryPatterns.Defense.test(normalized)) return "Defense";
  return "Other";
}

const categoryPatterns = {
  Attack: /shot/,
  Passing: /pass|cross|through ball|key pass/,
  Goalkeeping: /save|goalkeeper/,
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
    Other: [],
  };
  for (const stat of uniqueStats.values()) {
    categories[categoryFor(stat.type)].push(stat);
  }

  const defenseStats =
    categories.Goalkeeping.length > 2
      ? categories.Defense
      : [...categories.Defense, ...categories.Goalkeeping];
  const result: MatchStatCategory[] = [
    { label: "Attack", statistics: categories.Attack },
    { label: "Passing", statistics: categories.Passing },
    {
      label:
        categories.Goalkeeping.length > 2
          ? "Defense"
          : "Defense and goalkeeping",
      statistics: defenseStats,
    },
  ];
  if (categories.Goalkeeping.length > 2) {
    result.push({
      label: "Goalkeeping",
      statistics: categories.Goalkeeping,
    });
  }
  result.push({ label: "Other", statistics: categories.Other });
  return result.filter((category) => category.statistics.length > 0);
}
