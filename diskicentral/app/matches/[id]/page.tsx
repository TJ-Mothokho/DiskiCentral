import { getFixtureEvents, getFixtureLineups, getFixturePlayers, getFixtureStatistics, getHeadToHead, getFixtures } from "@/api/endpoints/fixtures";
import type { Fixture } from "@/api/types/fixtures.response";
import { MatchEvents } from "@/components/football/MatchEvents";
import { LiveMatchSubscription } from "@/components/football/LiveMatchSubscription";
import { Tabs } from "@/components/football/Controls";
import { EmptyState, SectionHeading } from "@/components/football/Primitives";
import { formatMatchDate, matchState, numericValue, scoreLabel } from "@/lib/football";
import { notFound } from "next/navigation";

export default async function MatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();
  const fixtureId = Number(id);
  let fixture: Fixture | undefined;
  try {
    fixture = (await getFixtures({ id: fixtureId })).response[0];
  } catch {
    notFound();
  }
  if (!fixture) notFound();

  const [eventsResult, statisticsResult, lineupsResult, playersResult, h2hResult] = await Promise.allSettled([
    getFixtureEvents({ fixture: fixtureId }),
    getFixtureStatistics({ fixture: fixtureId }),
    getFixtureLineups({ fixture: fixtureId }),
    getFixturePlayers({ fixture: fixtureId }),
    getHeadToHead({ h2h: `${fixture.teams.home.id}-${fixture.teams.away.id}`, last: 5 }),
  ]);
  const events = eventsResult.status === "fulfilled" ? eventsResult.value.response : [];
  const statistics = statisticsResult.status === "fulfilled" ? statisticsResult.value.response : [];
  const lineups = lineupsResult.status === "fulfilled" ? lineupsResult.value.response : [];
  const playerGroups = playersResult.status === "fulfilled" ? playersResult.value.response : [];
  const h2h = h2hResult.status === "fulfilled" ? h2hResult.value.response : [];
  const statTypes = Array.from(new Set(statistics.flatMap((group) => group.statistics.map((stat) => stat.type)))).slice(0, 10);

  return (
    <main className="page-frame py-8 sm:py-12">
      <div className="detail-hero">
        <p className="eyebrow">{fixture.league.name} · {fixture.league.round || "Match centre"}</p>
        <div className="mt-7 grid items-center gap-5 sm:grid-cols-[1fr_auto_1fr]">
          <div className="flex items-center gap-3 sm:flex-col sm:justify-center"><img src={fixture.teams.home.logo} alt="" className="h-12 w-12 object-contain sm:h-16 sm:w-16" /><span className="text-center font-semibold text-surface">{fixture.teams.home.name}</span></div>
          <div className="text-center"><p className="font-mono text-4xl font-bold text-surface">{scoreLabel(fixture)}</p><p className="mt-2 text-sm text-surface/70">{matchState(fixture)} · {formatMatchDate(fixture.fixture.date)}</p></div>
          <div className="flex items-center justify-end gap-3 sm:flex-col sm:justify-center"><img src={fixture.teams.away.logo} alt="" className="h-12 w-12 object-contain sm:h-16 sm:w-16" /><span className="text-center font-semibold text-surface">{fixture.teams.away.name}</span></div>
        </div>
        <LiveMatchSubscription fixtureId={fixtureId} initialFixture={fixture} />
      </div>

      <div className="mt-5"><Tabs active="Overview" items={[{ label: "Overview", href: `/matches/${fixtureId}` }, { label: "Lineups", href: `/matches/${fixtureId}#lineups` }, { label: "Stats", href: `/matches/${fixtureId}#stats` }, { label: "H2H", href: `/matches/${fixtureId}#h2h` }]} /></div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,.7fr)]">
        <div className="space-y-8">
          <section id="events">
            <SectionHeading eyebrow="Match timeline" title="What happened" />
            <MatchEvents
              events={events}
              players={playerGroups}
              homeTeamId={fixture.teams.home.id}
              awayTeamId={fixture.teams.away.id}
              homeTeamName={fixture.teams.home.name}
              awayTeamName={fixture.teams.away.name}
            />
          </section>
          <section id="stats"><SectionHeading eyebrow="Match intelligence" title="The numbers behind the game" />{statTypes.length ? <div className="detail-panel space-y-5">{statTypes.map((type) => { const home = statistics[0]?.statistics.find((stat) => stat.type === type)?.value; const away = statistics[1]?.statistics.find((stat) => stat.type === type)?.value; const homeValue = numericValue(home); const awayValue = numericValue(away); return <div key={type}><div className="mb-2 flex justify-between text-xs font-semibold text-secondary"><span>{type}</span><span className="text-primary">{home ?? "—"} · {away ?? "—"}</span></div><div className="grid grid-cols-2 gap-1"><div className="h-2 rounded-l-full bg-accent" style={{ opacity: homeValue === null ? .35 : 1 }} /><div className="h-2 rounded-r-full bg-tertiary" style={{ opacity: awayValue === null ? .35 : 1 }} /></div></div>; })}</div> : <EmptyState title="Statistics unavailable" message="This competition may not provide detailed match statistics." />}</section>
          <section id="lineups"><SectionHeading eyebrow="Team sheets" title="Lineups" />{lineups.length ? <div className="grid gap-4 md:grid-cols-2">{lineups.map((lineup) => <div key={lineup.team.id} className="detail-panel"><div className="flex items-center gap-3"><img src={lineup.team.logo} alt="" className="h-8 w-8 object-contain" /><div><h3 className="font-semibold text-primary">{lineup.team.name}</h3><p className="text-xs text-secondary">{lineup.formation ?? "Formation unavailable"}</p></div></div><ol className="mt-5 space-y-2 text-sm">{lineup.startXI.map((player) => <li key={player.player.id} className="flex justify-between gap-3"><span>{player.player.name}</span><span className="text-secondary">{player.player.pos ?? ""}</span></li>)}</ol></div>)}</div> : <EmptyState title="Lineups unavailable" message="The provider has not returned team sheets for this match." />}</section>
        </div>
        <aside className="space-y-5">
          <div className="detail-panel"><p className="eyebrow">Player match data</p><h2 className="mt-2 text-xl font-bold text-primary">Ratings and output</h2>{playerGroups.length ? <div className="mt-5 space-y-5">{playerGroups.flatMap((group) => group.players).slice(0, 6).map((entry) => { const games = entry.statistics[0]?.games as Record<string, unknown> | undefined; return <div key={entry.player.id} className="flex items-center justify-between gap-4"><span className="font-semibold text-primary">{entry.player.name}</span><span className="font-mono text-sm text-secondary">{typeof games?.rating === "string" || typeof games?.rating === "number" ? String(games.rating) : "—"}</span></div>; })}</div> : <p className="mt-4 text-sm text-secondary">Player statistics are not available for this fixture.</p>}</div>
          <div id="h2h" className="detail-panel"><p className="eyebrow">Head to head</p><h2 className="mt-2 text-xl font-bold text-primary">Recent meetings</h2>{h2h.length ? <div className="mt-5 space-y-3">{h2h.map((meeting) => <div key={meeting.fixture.id} className="flex justify-between gap-4 text-sm"><span className="truncate text-secondary">{meeting.teams.home.name} v {meeting.teams.away.name}</span><strong className="font-mono text-primary">{scoreLabel(meeting)}</strong></div>)}</div> : <p className="mt-4 text-sm text-secondary">No recent meetings returned.</p>}</div>
        </aside>
      </div>
    </main>
  );
}
