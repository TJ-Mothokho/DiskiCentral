import { getFixtures } from "@/api/endpoints/fixtures";
import type { Fixture } from "@/api/types/fixtures.response";
import { ACTIVE_FOCUS_COMPETITIONS } from "@/lib/focus";
import { currentFootballSeason, seasonEnd, seasonStart } from "@/lib/seasons";

export async function getFocusSeasonFixtures(season = currentFootballSeason()) {
  const results = await Promise.allSettled(ACTIVE_FOCUS_COMPETITIONS.map((competition) => getFixtures({ league: competition.leagueId, season, from: seasonStart(season), to: seasonEnd(season), timezone: "Africa/Johannesburg" })));
  return results.flatMap((result) => result.status === "fulfilled" ? result.value.response as Fixture[] : []).sort((a, b) => a.fixture.timestamp - b.fixture.timestamp);
}

export async function getFocusUpcomingFixtures(season = currentFootballSeason()) {
  const results = await Promise.allSettled(ACTIVE_FOCUS_COMPETITIONS.map((competition) => getFixtures({ league: competition.leagueId, season, next: 5, timezone: "Africa/Johannesburg" })));
  return results.flatMap((result) => result.status === "fulfilled" ? result.value.response as Fixture[] : []).sort((a, b) => a.fixture.timestamp - b.fixture.timestamp);
}
