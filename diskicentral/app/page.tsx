import Link from "next/link";
import { getFixtures } from "@/api/endpoints/fixtures";
import type { Fixture } from "@/api/types/fixtures.response";
import { ArticleCard } from "@/components/football/ArticleCard";
import { FilterLinks } from "@/components/football/Controls";
import { MatchCard, MatchdayBanner } from "@/components/football/MatchCard";
import { AdSlot, EmptyState, ErrorState, SectionHeading, StatBar } from "@/components/football/Primitives";
import { safeArticles } from "@/lib/data";

function todayInJohannesburg() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Johannesburg" }).format(new Date());
}

async function loadFixtures(date: string) {
  try {
    const result = await getFixtures({ date, timezone: "Africa/Johannesburg" });
    return { fixtures: result.response as Fixture[], error: null };
  } catch {
    return { fixtures: [] as Fixture[], error: "Fixtures are currently unavailable. Try again shortly." };
  }
}

export default async function HomePage() {
  const date = todayInJohannesburg();
  const [{ fixtures, error }, articles] = await Promise.all([loadFixtures(date), safeArticles("all")]);
  const competitions = Array.from(new Map(fixtures.map((fixture) => [fixture.league.id, fixture.league.name])).entries());
  const live = fixtures.filter((fixture) => ["LIVE", "1H", "2H", "HT", "ET", "P", "BT"].includes(fixture.fixture.status.short));
  const stories = articles.slice(0, 3);

  return (
    <main className="page-frame py-8 sm:py-12">
      <section>
        <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Saturday · Matchday</p>
            <h1 className="mt-2 max-w-2xl text-4xl font-bold tracking-[-0.05em] text-primary sm:text-5xl">South African football, live.</h1>
            <p className="mt-3 max-w-xl text-base text-secondary">Every fixture. Every moment. One place to follow the game.</p>
          </div>
          <Link href="/fixtures" className="ui-button ui-button--secondary">View fixtures →</Link>
        </div>
        <MatchdayBanner count={fixtures.length} />
        <div className="mt-4"><FilterLinks items={[{ label: "All", href: "/fixtures", active: true }, ...competitions.slice(0, 5).map(([id, name]) => ({ label: name, href: `/fixtures?league=${id}` }))]} /></div>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,.8fr)]">
        <div>
          <SectionHeading eyebrow="Today · Johannesburg time" title={live.length ? "Live and upcoming" : "Today's fixtures"} description="Kick-off times, match status and the next game at a glance." />
          {error ? <ErrorState message={error} /> : fixtures.length === 0 ? <EmptyState title="No fixtures found" message="There are no fixtures available for this matchday yet." /> : <div className="space-y-3">{fixtures.slice(0, 8).map((fixture) => <MatchCard key={fixture.fixture.id} fixture={fixture} />)}</div>}
          {fixtures.length > 8 ? <div className="mt-5"><Link href="/fixtures" className="ui-button ui-button--primary">See all fixtures</Link></div> : null}
        </div>
        <div className="space-y-5">
          <div className="detail-panel">
            <p className="eyebrow">The numbers behind the game</p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-primary">Matchday at a glance.</h2>
            <p className="mt-2 text-sm text-secondary">A quick read of what is happening today.</p>
            <div className="mt-7 space-y-5">
              <StatBar label="Fixtures returned" value={fixtures.length} max={Math.max(fixtures.length, 8)} />
              <StatBar label="Live matches" value={live.length} max={Math.max(fixtures.length, 1)} tone="forest" />
              <StatBar label="Competitions" value={competitions.length} max={Math.max(competitions.length, 5)} tone="blue" />
            </div>
            <Link href="/fixtures" className="mt-6 inline-block text-sm font-semibold text-primary">Open the full matchday →</Link>
          </div>
          <AdSlot />
        </div>
      </section>

      <section className="mt-14">
        <SectionHeading eyebrow="The DiskiCentral desk" title="Stories with the game in them." description="Reporting, context and analysis from South African football." action={<Link href="/articles" className="text-sm font-semibold text-primary">All stories →</Link>} />
        {stories.length ? <div className="grid gap-4 md:grid-cols-3">{stories.map((article, index) => <ArticleCard key={article.id} article={article} featured={index === 0} />)}</div> : <EmptyState title="Editorial is warming up" message="Featured stories will appear here when the article service has published content." />}
      </section>
    </main>
  );
}
