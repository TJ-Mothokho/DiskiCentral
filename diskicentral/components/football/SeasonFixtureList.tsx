import Link from "next/link";
import type { Fixture } from "@/api/types/fixtures.response";
import { MatchCard } from "@/components/football/MatchCard";
import { EmptyState } from "@/components/football/Primitives";
import { fixtureMonth } from "@/lib/seasons";

export function SeasonFixtureList({ fixtures, basePath, query, pageSize = 10 }: { fixtures: Fixture[]; basePath: string; query: Record<string, string | undefined>; pageSize?: number }) {
  const page = Math.max(1, Number(query.page ?? "1") || 1);
  const team = query.team;
  const month = query.month;
  const filtered = fixtures.filter((fixture) => (!team || fixture.teams.home.id === Number(team) || fixture.teams.away.id === Number(team)) && (!month || fixtureMonth(fixture.fixture.date) === month));
  const start = (page - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);
  const makeHref = (nextPage: number) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) if (value && key !== "page") params.set(key, value);
    params.set("page", String(nextPage));
    return `${basePath}?${params.toString()}`;
  };
  if (!filtered.length) return <EmptyState title="No matches in this filter" message="Try another month or team, or check back when the competition has scheduled fixtures." />;
  return <div><div className="space-y-3">{visible.map((fixture) => <MatchCard key={fixture.fixture.id} fixture={fixture} />)}</div><div className="mt-5 flex items-center justify-between gap-4"><span className="text-xs text-secondary">Showing {start + 1}–{Math.min(start + pageSize, filtered.length)} of {filtered.length}</span><div className="flex gap-2">{page > 1 ? <Link href={makeHref(page - 1)} className="ui-button ui-button--secondary">← Previous</Link> : null}{start + pageSize < filtered.length ? <Link href={makeHref(page + 1)} className="ui-button ui-button--primary">Next →</Link> : null}</div></div></div>;
}
