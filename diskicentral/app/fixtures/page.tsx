import Link from "next/link";
import { SeasonFilters } from "@/components/football/Match/SeasonFilters";
import { SeasonFixtureList } from "@/components/football/Match/SeasonFixtureList";
import { EmptyState, SectionHeading } from "@/components/football/Primitives";
import { FilterLinks } from "@/components/football/Controls";
import { ACTIVE_FOCUS_COMPETITIONS, FOCUS_COMPETITIONS } from "@/lib/focus";
import { getFocusSeasonFixtures } from "@/lib/focus-fixtures";
import { currentFootballSeason, monthOptions } from "@/lib/seasons";

export default async function FixturesPage({ searchParams }: { searchParams: Promise<{ league?: string; team?: string; month?: string; page?: string }> }) {
  const query = await searchParams;
  const season = currentFootballSeason();
  const allFixtures = await getFocusSeasonFixtures(season);
  const league = query.league && /^\d+$/.test(query.league) ? Number(query.league) : undefined;
  const fixtures = league ? allFixtures.filter((fixture) => fixture.league.id === league) : allFixtures;
  const teams = Array.from(new Map(fixtures.flatMap((fixture) => [[fixture.teams.home.id, fixture.teams.home.name], [fixture.teams.away.id, fixture.teams.away.name]])).entries()).map(([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name));
  const focusItems = FOCUS_COMPETITIONS.filter((competition) => competition.available && competition.leagueId !== undefined).map((competition) => ({ label: competition.shortLabel, href: `/fixtures?league=${competition.leagueId}`, active: league === competition.leagueId }));
  return <main className="page-frame py-8 sm:py-12"><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Season {season} · South Africa + CAF</p><h1 className="mt-2 text-4xl font-bold tracking-[-0.05em] text-primary">Fixtures</h1><p className="mt-3 max-w-xl text-secondary">The next ten matches at a time, with previous results available through pagination and filters for competition, team, and month.</p></div><Link href="/" className="ui-button ui-button--secondary">Back to matchday</Link></div><div className="mt-8"><FilterLinks items={[{ label: "All focus competitions", href: "/fixtures", active: !league }, ...focusItems]} /></div><div className="mt-6"><SeasonFilters basePath="/fixtures" extraQuery={{ league: league ? String(league) : undefined }} monthOptions={monthOptions(season)} teams={teams} selectedMonth={query.month} selectedTeam={query.team} /></div><section className="mt-10"><SectionHeading eyebrow={`${fixtures.length} season fixtures loaded`} title={league ? (ACTIVE_FOCUS_COMPETITIONS.find((competition) => competition.leagueId === league)?.label ?? "Competition fixtures") : "South African football season"} description="Played and scheduled matches from the August-to-July football season." />{allFixtures.length ? <SeasonFixtureList fixtures={fixtures} basePath="/fixtures" query={query} /> : <EmptyState title="No focus fixtures returned" message="The provider has not returned season fixtures for the selected focus competitions yet." />}</section></main>;
}
