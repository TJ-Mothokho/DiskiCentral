import { getFixtureEvents, getFixtureLineups, getFixturePlayers, getFixtureStatistics, getHeadToHead, getFixtures } from "@/api/endpoints/fixtures";
import type { Fixture } from "@/api/types/fixtures.response";
import { MatchHeader } from "@/components/football/Match/MatchHeader";
import { MatchNavigation, getMatchTab } from "@/components/football/Match/MatchNavigation";
import { MatchTabContent } from "@/components/football/Match/MatchTabContent";
import { notFound } from "next/navigation";

export default async function MatchPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { id } = await params;
  const { tab } = await searchParams;
  if (!/^\d+$/.test(id)) notFound();
  const fixtureId = Number(id);
  const selectedTab = getMatchTab(tab);
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

  return (
    <main className="page-frame py-8 sm:py-12">
      <MatchHeader fixtureId={fixtureId} fixture={fixture} />
      <div className="mt-5">
        <MatchNavigation fixtureId={fixtureId} active={selectedTab} />
      </div>
      <div className="mt-8">
        <MatchTabContent
          activeTab={selectedTab}
          fixture={fixture}
          events={events}
          statistics={statistics}
          lineups={lineups}
          players={playerGroups}
          meetings={h2h}
        />
      </div>
    </main>
  );
}
