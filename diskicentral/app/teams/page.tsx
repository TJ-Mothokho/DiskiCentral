import Link from "next/link";
import { getTeams } from "@/api/endpoints/teams";
import { EmptyState, SectionHeading } from "@/components/football/Primitives";

export default async function TeamsPage() {
  let teams: Array<{ team: { id: number; name: string; country: string; logo: string } }> = [];
  try { const result = await getTeams({ country: "South Africa" }); teams = result.response; } catch { teams = []; }
  return <main className="page-frame py-8 sm:py-12"><p className="eyebrow">Clubs · South Africa</p><h1 className="mt-2 text-4xl font-bold tracking-[-0.05em] text-primary">Teams</h1><p className="mt-3 max-w-xl text-secondary">Open a club profile for squad context, upcoming fixtures and team intelligence.</p><section className="mt-10"><SectionHeading eyebrow={`${teams.length} clubs`} title="South African teams" />{teams.length ? <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{teams.map(({ team }) => <Link href={`/teams/${team.id}`} key={team.id} className="detail-panel flex items-center gap-4 transition hover:-translate-y-0.5"><img src={team.logo} alt="" className="h-12 w-12 object-contain" /><div><h2 className="font-semibold text-primary">{team.name}</h2><p className="mt-1 text-xs text-secondary">{team.country}</p></div></Link>)}</div> : <EmptyState title="Teams unavailable" message="The team directory could not be loaded right now." />}</section></main>;
}
