import {
  AddFixture,
  FeedFixture,
  Fixture,
  FixtureResponse,
  FixtureStatus,
  GetAllFixturesResponse,
  GetFixtureResponse,
  UpdateFixture,
} from "@/types/fixture";
import { BooleanResponse } from "@/types/common";
import { apiRequest, BASE_URL } from "@/services/ApiRequest";

function toFixture(
  feedFixture: FeedFixture,
  competitionId: string,
  competitionName: string,
): Fixture {
  const score = feedFixture.status.scoreStr?.match(/^(\d+)\s*-\s*(\d+)$/);
  const externalId = Number(feedFixture.id);

  return {
    id: feedFixture.id,
    competitionId,
    homeTeamId: feedFixture.home.id,
    awayTeamId: feedFixture.away.id,
    apiId: Number.isSafeInteger(externalId) ? externalId : null,
    fotmobLink: feedFixture.pageUrl,
    kickoff: feedFixture.status.utcTime,
    venue: null,
    status: feedFixture.status.cancelled
      ? FixtureStatus.Cancelled
      : feedFixture.status.finished || feedFixture.status.awarded
        ? FixtureStatus.Finished
        : feedFixture.status.started
          ? FixtureStatus.Live
          : FixtureStatus.Scheduled,
    homeScore: score ? Number(score[1]) : null,
    awayScore: score ? Number(score[2]) : null,
    createdAt: null,
    updatedAt: null,
    competitionName,
    homeTeamName: feedFixture.home.name,
    awayTeamName: feedFixture.away.name,
  };
}

export class FixturesService {
  public static async getApiFixtures(): Promise<GetAllFixturesResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Fixtures` },
      "Failed to fetch fixtures.",
      {
        success: false,
        message: "Fixtures are currently unavailable.",
        data: [],
        errors: ["Failed to fetch fixtures."],
      },
    );
  }

  public static async addFixture(
    fixture: AddFixture,
  ): Promise<GetFixtureResponse> {
    return apiRequest(
      {
        method: "POST",
        url: `${BASE_URL}/api/Fixtures`,
        headers: { "Content-Type": "application/json" },
        data: fixture,
      },
      "Failed to add fixture.",
    );
  }

  public static async getFixtureById(id: string): Promise<GetFixtureResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Fixtures/${encodeURIComponent(id)}`,
      },
      "Failed to fetch fixture.",
    );
  }

  public static async updateFixture(
    id: string,
    fixture: UpdateFixture,
  ): Promise<GetFixtureResponse> {
    return apiRequest(
      {
        method: "PUT",
        url: `${BASE_URL}/api/Fixtures/${encodeURIComponent(id)}`,
        headers: { "Content-Type": "application/json" },
        data: fixture,
      },
      "Failed to update fixture.",
    );
  }

  public static async deleteFixture(id: string): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "DELETE",
        url: `${BASE_URL}/api/Fixtures/${encodeURIComponent(id)}`,
      },
      "Failed to delete fixture.",
    );
  }

  public static async getFixturesByCompetitionId(
    competitionId: string,
  ): Promise<GetAllFixturesResponse> {
    const response = await apiRequest<
      GetAllFixturesResponse | FixtureResponse
    >(
      {
        method: "GET",
        url: `${BASE_URL}/api/Fixtures/competition/${encodeURIComponent(competitionId)}`,
      },
      "Failed to fetch fixtures by competition.",
      {
        success: false,
        message: "Competition fixtures are currently unavailable.",
        data: [],
        errors: ["Failed to fetch fixtures by competition."],
      },
    );

    const fixtures = response.data;
    if (Array.isArray(fixtures)) {
      return { ...response, data: fixtures };
    }

    const competitionName = fixtures.league_name;
    return {
      ...response,
      data: fixtures.fixtures.map((fixture) =>
        toFixture(fixture, competitionId, competitionName),
      ),
    };
  }

  public static async getFinishedFixtures(): Promise<GetAllFixturesResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Fixtures/finished` },
      "Failed to fetch finished fixtures.",
      {
        success: false,
        message: "Finished fixtures are currently unavailable.",
        data: [],
        errors: ["Failed to fetch finished fixtures."],
      },
    );
  }

  public static async getFixturesByTeamId(
    teamId: string,
  ): Promise<GetAllFixturesResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Fixtures/team/${encodeURIComponent(teamId)}`,
      },
      "Failed to fetch fixtures by team.",
    );
  }

  public static async getUpcomingFixtures(): Promise<GetAllFixturesResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Fixtures/upcoming` },
      "Failed to fetch upcoming fixtures.",
      {
        success: false,
        message: "Upcoming fixtures are currently unavailable.",
        data: [],
        errors: ["Failed to fetch upcoming fixtures."],
      },
    );
  }
}
