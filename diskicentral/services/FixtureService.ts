import {
  AddFixture,
  GetAllFixturesResponse,
  GetFixtureResponse,
  UpdateFixture,
} from "@/types/fixture";
import { BooleanResponse } from "@/types/common";
import { apiRequest, BASE_URL } from "@/services/ApiRequest";

export class FixturesService {
  public static async getApiFixtures(): Promise<GetAllFixturesResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Fixtures` },
      "Failed to fetch fixtures.",
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
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Fixtures/competition/${encodeURIComponent(competitionId)}`,
      },
      "Failed to fetch fixtures by competition.",
    );
  }

  public static async getFinishedFixtures(): Promise<GetAllFixturesResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Fixtures/finished` },
      "Failed to fetch finished fixtures.",
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
    );
  }
}
