import { getFixtures } from "@/api/endpoints/fixtures";
import { getLeagues } from "@/api/endpoints/leagues";
import { getStandings } from "@/api/endpoints/standings";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MatchCard } from "@/components/football/MatchCard";
import { EmptyState, SectionHeading } from "@/components/football/Primitives";
import { Tabs } from "@/components/football/Controls";

export default async function LeaguePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; if (!/^\d+$/.test(id)) notFound(); const leagueId = Number(id);
  const leagueResult = await getLeagues({ id: leagueId }); const item = leagueResult.response[0]; if (!item) notFound();
  const season = item.seasons.find((entry) => entry.current)?.year ?? item.seasons[0]?.year ?? new Date().getFullYear();
  const [standingsResult, fixturesResult] = await Promise.allSettled([getStandings({ league: leagueId, season }), getFixtures({ league: leagueId, season, next: 5, timezone: "Africa/Johannesburg" })]);
  const table = standingsResult.status === "fulfilled" ? standingsResult.value.response[0]?.league.standings[0] ?? [] : [];
  const fixtures = fixturesResult.status === "fulfilled" ? fixturesResult.value.response : [];
  return <main className="page-frame py-8 sm:py-12"><div className="detail-hero"><p className="eyebrow">{item.country.name} · {item.league.type}</p><div className="mt-4 flex items-center gap-4"><img src={item.league.logo} alt="" className="h-14 w-14 object-contain" /><div><h1 className="text-3xl font-bold tracking-[-0.04em] text-surface">{item.league.name}</h1><p className="mt-2 text-sm text-surface/70">{season} season</p></div></div></div><div className="mt-5"><Tabs active="Overview" items={[{ label: "Overview", href: `/leagues/${leagueId}` }, { label: "Fixtures", href: `/fixtures?league=${leagueId}` }]} /></div><div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,.8fr)]"><section><SectionHeading eyebrow="Standings · points earned" title="League table" />{table.length ? <div className="detail-panel overflow-x-auto"><table className="data-table"><thead><tr><th>#</th><th>Club</th><th>MP</th><th>W</th><th>GD</th><th>Pts</th></tr></thead><tbody>{table.map((row) => <tr key={row.team.id}><td className="font-mono text-secondary">{row.rank}</td><td><Link href={`/teams/${row.team.id}`} className="flex min-w-48 items-center gap-3 font-semibold text-primary"><img src={row.team.logo} alt="" className="h-7 w-7 object-contain" />{row.team.name}</Link></td><td>{row.all.played}</td><td>{row.all.win}</td><td>{row.goalsDiff}</td><td className="font-semibold">{row.points}</td></tr>)}</tbody></table></div> : <EmptyState title="Standings unavailable" message="This competition does not currently expose a table for the selected season." />}</section><section><SectionHeading eyebrow="Next on the calendar" title="Fixtures" />{fixtures.length ? <div className="space-y-3">{fixtures.map((fixture) => <MatchCard key={fixture.fixture.id} fixture={fixture} />)}</div> : <EmptyState title="No upcoming fixtures" message="The provider has not returned the next fixtures for this competition." />}</section></div></main>;
}
