import { getTeams } from "@/api/endpoints/teams";
import { getFixtures } from "@/api/endpoints/fixtures";
import { getPlayerSquads } from "@/api/endpoints/players";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MatchCard } from "@/components/football/MatchCard";
import { EmptyState, SectionHeading, StatBar } from "@/components/football/Primitives";

export default async function TeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; if (!/^\d+$/.test(id)) notFound(); const teamId = Number(id);
  const [teamResult, fixtureResult, squadResult] = await Promise.allSettled([getTeams({ id: teamId }), getFixtures({ team: teamId, next: 5, timezone: "Africa/Johannesburg" }), getPlayerSquads({ team: teamId })]);
  const team = teamResult.status === "fulfilled" ? teamResult.value.response[0] : undefined; if (!team) notFound();
  const fixtures = fixtureResult.status === "fulfilled" ? fixtureResult.value.response : []; const squad = squadResult.status === "fulfilled" ? squadResult.value.response[0]?.players ?? [] : [];
  return <main className="page-frame py-8 sm:py-12"><div className="detail-hero"><p className="eyebrow">Team profile</p><div className="mt-4 flex flex-wrap items-center gap-5"><img src={team.team.logo} alt="" className="h-16 w-16 object-contain" /><div><h1 className="text-3xl font-bold tracking-[-0.04em] text-surface">{team.team.name}</h1><p className="mt-2 text-sm text-surface/70">{team.team.country} · {team.team.founded ? `Founded ${team.team.founded}` : "Club profile"}</p></div></div></div><div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,.7fr)]"><div><SectionHeading eyebrow="Next on the calendar" title="Fixtures" />{fixtures.length ? <div className="space-y-3">{fixtures.map((fixture) => <MatchCard key={fixture.fixture.id} fixture={fixture} />)}</div> : <EmptyState title="No upcoming fixtures" message="The API has not returned upcoming matches for this team." />}</div><div className="space-y-5"><div className="detail-panel"><p className="eyebrow">Squad</p><h2 className="mt-2 text-2xl font-bold text-primary">Players to watch</h2><div className="mt-5 space-y-4">{squad.slice(0, 5).map((player) => <div key={player.id} className="flex items-center justify-between gap-4"><Link href={`/players/${player.id}`} className="font-semibold text-primary">{player.name}</Link><span className="text-xs text-secondary">{player.position ?? "Player"}</span></div>)}</div></div><div className="detail-panel"><p className="eyebrow">Team intelligence</p><h2 className="mt-2 text-xl font-bold text-primary">A season at a glance</h2><div className="mt-5 space-y-5"><StatBar label="Upcoming coverage" value={fixtures.length} max={5} /><StatBar label="Squad coverage" value={Math.min(squad.length, 30)} max={30} tone="forest" /></div></div></div></div></main>;
}
