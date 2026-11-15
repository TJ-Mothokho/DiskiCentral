import { getLeagues } from "@/api/endpoints/leagues";
import type { LeagueResponseItem } from "@/api/types/leagues.response";
import LeaguesBrowser from "./LeaguesBrowser";
import type { CountryGroup } from "./leagueFilters";

function groupLeaguesByCountry(leagues: LeagueResponseItem[]): CountryGroup[] {
  const groups = new Map<string, LeagueResponseItem[]>();
  for (const league of leagues) { const country = league.country.name.trim() || "Unknown"; groups.set(country, [...(groups.get(country) ?? []), league]); }
  return Array.from(groups, ([country, countryLeagues]) => ({ country, leagues: countryLeagues.sort((a, b) => a.league.name.localeCompare(b.league.name)) })).sort((a, b) => a.country.localeCompare(b.country));
}

export default async function LeaguesPage() {
  let groups: CountryGroup[] = [];
  try { const result = await getLeagues({ season: new Date().getFullYear(), current: true }); groups = groupLeaguesByCountry(result.response); } catch { groups = []; }
  return <main className="page-frame py-8 sm:py-12"><p className="eyebrow">Competitions · South Africa and beyond</p><h1 className="mt-2 text-4xl font-bold tracking-[-0.05em] text-primary">Leagues</h1><p className="mt-3 max-w-xl text-secondary">Follow standings, fixtures, top scorers and the shape of every competition.</p><div className="mt-9"><LeaguesBrowser groups={groups} /></div></main>;
}
