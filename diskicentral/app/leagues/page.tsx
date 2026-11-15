import { getLeagues } from "@/api/endpoints/leagues";
import type { LeagueResponseItem } from "@/api/types/leagues.response";
import LeaguesBrowser from "./LeaguesBrowser";
import type { CountryGroup } from "./leagueFilters";

function groupLeaguesByCountry(
  leagues: LeagueResponseItem[],
): CountryGroup[] {
  const groups = new Map<string, LeagueResponseItem[]>();

  for (const league of leagues) {
    const country = league.country.name.trim() || "Unknown";
    const existing = groups.get(country) ?? [];
    existing.push(league);
    groups.set(country, existing);
  }

  return Array.from(groups, ([country, countryLeagues]) => ({
    country,
    leagues: countryLeagues.sort((a, b) =>
      a.league.name.localeCompare(b.league.name, undefined, {
        sensitivity: "base",
      }),
    ),
  })).sort((a, b) =>
    a.country.localeCompare(b.country, undefined, { sensitivity: "base" }),
  );
}

export default async function LeaguesPage() {
  const result = await getLeagues({
    season: new Date().getFullYear(),
    current: true,
  });
  const groups = groupLeaguesByCountry(result?.response ?? []);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <h1 className="mb-6">Leagues</h1>
      <LeaguesBrowser groups={groups} />
    </main>
  );
}