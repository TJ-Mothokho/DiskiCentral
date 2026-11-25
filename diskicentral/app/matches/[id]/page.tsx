import {
  getFixtureEvents,
  getFixtureLineups,
  getFixturePlayers,
  getFixtureStatistics,
  getHeadToHead,
  getFixtures,
  getPredictions,
} from "@/api/endpoints/fixtures";
import { getLeagues } from "@/api/endpoints/leagues";
import { getStandings } from "@/api/endpoints/standings";
import type { Fixture } from "@/api/types/fixtures.response";
import type { Prediction } from "@/api/types/predictions.response";
import type { StandingRow } from "@/api/types/standings.response";
import { MatchCentre } from "@/components/football/Match/MatchCentre";
import { getMatchTab } from "@/components/football/Match/MatchNavigation";
import { isPreMatchFixture, isUpcomingFixture } from "@/lib/football";
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
  let fixture: Fixture | undefined;
  try {
    fixture = (await getFixtures({ id: fixtureId })).response[0];
  } catch {
    notFound();
  }
  if (!fixture) notFound();

  const upcoming = isUpcomingFixture(fixture);
  const preMatch = isPreMatchFixture(fixture);
  const [
    eventsResult,
    statisticsResult,
    lineupsResult,
    playersResult,
    h2hResult,
    leagueResult,
    predictionResult,
  ] = await Promise.allSettled([
    preMatch ? Promise.resolve(null) : getFixtureEvents({ fixture: fixtureId }),
    preMatch ? Promise.resolve(null) : getFixtureStatistics({ fixture: fixtureId }),
    getFixtureLineups({ fixture: fixtureId }),
    preMatch ? Promise.resolve(null) : getFixturePlayers({ fixture: fixtureId }),
    getHeadToHead({ h2h: `${fixture.teams.home.id}-${fixture.teams.away.id}`, last: 5 }),
    getLeagues({ id: fixture.league.id, season: fixture.league.season }),
    upcoming ? getPredictions({ fixture: fixtureId }) : Promise.resolve(null),
  ]);
  const events = eventsResult.status === "fulfilled"
    ? eventsResult.value?.response ?? []
    : [];
  const statistics = statisticsResult.status === "fulfilled"
    ? statisticsResult.value?.response ?? []
    : [];
  const lineups = lineupsResult.status === "fulfilled" ? lineupsResult.value.response : [];
  const playerGroups = playersResult.status === "fulfilled"
    ? playersResult.value?.response ?? []
    : [];
  const h2h = h2hResult.status === "fulfilled" ? h2hResult.value.response : [];
  const league = leagueResult.status === "fulfilled"
    ? leagueResult.value.response.find((item) => item.league.id === fixture.league.id)
    : undefined;
  const season = league?.seasons.find(
    (item) => item.year === fixture.league.season,
  );
  const tableAvailable = Boolean(
    fixture.league.standings !== false &&
    league?.league.type.toLowerCase() === "league" &&
    season?.coverage.standings === true,
  );
  const prediction: Prediction | null =
    predictionResult.status === "fulfilled"
      ? predictionResult.value?.response[0] ?? null
      : null;
  let standings: StandingRow[] = [];
  if (tableAvailable) {
    const standingsResult = await Promise.allSettled([
      getStandings({
        league: fixture.league.id,
        season: fixture.league.season,
      }),
    ]);
    const result = standingsResult[0];
    if (result.status === "fulfilled") {
      standings =
        result.value.response[0]?.league.standings.flat() ?? [];
    }
  }
  const selectedTab = getMatchTab(tab, tableAvailable, preMatch, upcoming);

  return (
    <MatchCentre
      fixtureId={fixtureId}
      initialFixture={fixture}
      initialEvents={events}
      initialStatistics={statistics}
      lineups={lineups}
      players={playerGroups}
      meetings={h2h}
      standings={standings}
      tableAvailable={tableAvailable}
      preMatch={preMatch}
      upcoming={upcoming}
      prediction={prediction}
      competitionType={league?.league.type}
      activeTab={selectedTab}
    />
  );
}
