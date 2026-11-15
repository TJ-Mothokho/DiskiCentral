import type { LeagueResponseItem } from "@/api/types/leagues.response";

export type CountryGroup = {
  country: string;
  leagues: LeagueResponseItem[];
};

export type AgeGroup =
  | "Senior"
  | "Academy"
  | "U23"
  | "U20"
  | "U19"
  | "U18"
  | "U17";
export type ContinentalFilter = "UEFA" | "CAF" | "Asia/Oceania" | "Americas";

export type LeagueFilterState = {
  competitionType: "League" | "Cup" | null;
  gender: "Men" | "Women" | null;
  ageGroups: Set<AgeGroup>;
  topFiveOnly: boolean;
  continents: Set<ContinentalFilter>;
};

export const ageGroups: AgeGroup[] = [
  "Senior",
  "Academy",
  "U23",
  "U20",
  "U19",
  "U18",
  "U17",
];

export const continentalFilters: ContinentalFilter[] = [
  "UEFA",
  "CAF",
  "Asia/Oceania",
  "Americas",
];

const topFiveLeagueIds = new Set([39, 140, 78, 135, 61]);
const continentalLeagueIds: Record<ContinentalFilter, Set<number>> = {
  UEFA: new Set([2, 525, 3, 848]),
  CAF: new Set([12, 20]),
  "Asia/Oceania": new Set([17, 18, 1132, 1140, 27]),
  Americas: new Set([16, 13, 11]),
};
const womenTerms = [
  "women",
  "woman",
  "ladies",
  "female",
  "feminine",
  "femenina",
  "femminile",
];
const academyTerms = ["academy", "youth", "junior", "development", "reserve"];

export function createDefaultLeagueFilters(): LeagueFilterState {
  return {
    competitionType: null,
    gender: null,
    ageGroups: new Set(),
    topFiveOnly: false,
    continents: new Set(),
  };
}

export function hasLeagueFilters(filters: LeagueFilterState): boolean {
  return (
    filters.competitionType !== null ||
    filters.gender !== null ||
    filters.ageGroups.size > 0 ||
    filters.topFiveOnly ||
    filters.continents.size > 0
  );
}

function getAgeGroups(name: string): Set<AgeGroup> {
  const normalized = name.toLowerCase();
  const groups = new Set<AgeGroup>();

  for (const age of ["23", "20", "19", "18", "17"] as const) {
    if (
      new RegExp(`\\b(?:u\\s*[-–]?\\s*${age}|under\\s*${age})\\b`).test(
        normalized,
      )
    ) {
      groups.add(`U${age}`);
    }
  }

  if (academyTerms.some((term) => normalized.includes(term))) {
    groups.add("Academy");
  }

  if (groups.size === 0) groups.add("Senior");
  return groups;
}

function isWomenCompetition(league: LeagueResponseItem): boolean {
  const name = league.league.name.toLowerCase();
  return womenTerms.some((term) => name.includes(term));
}

export function filterLeagueGroups(
  groups: CountryGroup[],
  filters: LeagueFilterState,
): CountryGroup[] {
  return groups
    .map(({ country, leagues }) => ({
      country,
      leagues: leagues.filter((item) => {
        const { league } = item;
        if (
          filters.competitionType &&
          league.type.trim().toLowerCase() !==
            filters.competitionType.toLowerCase()
        ) {
          return false;
        }
        if (
          filters.gender &&
          isWomenCompetition(item) !== (filters.gender === "Women")
        ) {
          return false;
        }
        if (
          filters.ageGroups.size > 0 &&
          ![...getAgeGroups(league.name)].some((age) =>
            filters.ageGroups.has(age),
          )
        ) {
          return false;
        }
        if (filters.topFiveOnly && !topFiveLeagueIds.has(league.id)) {
          return false;
        }
        return (
          filters.continents.size === 0 ||
          [...filters.continents].some((continent) =>
            continentalLeagueIds[continent].has(league.id),
          )
        );
      }),
    }))
    .filter(({ leagues }) => leagues.length > 0);
}
