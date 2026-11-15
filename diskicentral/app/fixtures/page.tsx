import Link from "next/link";
import { getFixtures } from "@/api/endpoints/fixtures";
import type { Fixture } from "@/api/types/fixtures.response";
import { MatchCard } from "@/components/football/MatchCard";
import { EmptyState, ErrorState, SectionHeading } from "@/components/football/Primitives";
import { FilterLinks } from "@/components/football/Controls";

function today() { return new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Johannesburg" }).format(new Date()); }
function shiftDate(date: string, amount: number) { const value = new Date(`${date}T12:00:00Z`); value.setUTCDate(value.getUTCDate() + amount); return value.toISOString().slice(0, 10); }

export default async function FixturesPage({ searchParams }: { searchParams: Promise<{ date?: string; league?: string }> }) {
  const query = await searchParams;
  const date = /^\d{4}-\d{2}-\d{2}$/.test(query.date ?? "") ? query.date as string : today();
  const league = query.league && /^\d+$/.test(query.league) ? Number(query.league) : undefined;
  let fixtures: Fixture[] = [];
  let error = "";
  try { const result = await getFixtures({ date, league, timezone: "Africa/Johannesburg" }); fixtures = result.response as Fixture[]; } catch { error = "Fixtures are currently unavailable. Try again shortly."; }
  const competitions = Array.from(new Map(fixtures.map((fixture) => [fixture.league.id, fixture.league.name])).entries());
  const previous = `/fixtures?date=${shiftDate(date, -1)}${league ? `&league=${league}` : ""}`;
  const next = `/fixtures?date=${shiftDate(date, 1)}${league ? `&league=${league}` : ""}`;
  return (
    <main className="page-frame py-8 sm:py-12">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Match centre · Fixtures</p><h1 className="mt-2 text-4xl font-bold tracking-[-0.05em] text-primary">Fixtures</h1><p className="mt-3 max-w-xl text-secondary">Browse every match by date and competition. Results stay in the same matchday experience.</p></div><Link href="/" className="ui-button ui-button--secondary">Back to matchday</Link></div>
      <div className="mt-8 flex flex-wrap items-center gap-2"><Link href={previous} className="ui-button ui-button--secondary">← Previous</Link><span className="rounded-full bg-primary px-4 py-3 text-xs font-semibold text-surface">{date}</span><Link href={next} className="ui-button ui-button--secondary">Next →</Link></div>
      <div className="mt-6"><FilterLinks items={[{ label: "All competitions", href: `/fixtures?date=${date}`, active: !league }, ...competitions.map(([id, name]) => ({ label: name, href: `/fixtures?date=${date}&league=${id}`, active: league === id }))]} /></div>
      <section className="mt-10"><SectionHeading eyebrow="Kick-off times in SAST" title={fixtures.length ? `${fixtures.length} match${fixtures.length === 1 ? "" : "es"}` : "No matches"} description="Open a fixture for match insight, lineups, events and statistics." />{error ? <ErrorState message={error} /> : fixtures.length ? <div className="grid gap-3 md:grid-cols-2">{fixtures.map((fixture) => <MatchCard key={fixture.fixture.id} fixture={fixture} />)}</div> : <EmptyState title="No fixtures on this date" message="Try the previous or next matchday, or remove the competition filter." />}</section>
    </main>
  );
}
