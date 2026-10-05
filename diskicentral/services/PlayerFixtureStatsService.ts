import { BooleanResponse } from "@/types/common";
import { apiRequest, BASE_URL } from "@/services/ApiRequest";

// Player-fixture-stat types are not currently defined under @/types. Keep the
// service usable without changing that directory, as requested.
export type PlayerFixtureStat = Record<string, unknown>;
export type CreatePlayerFixtureStat = Record<string, unknown>;
export type UpdatePlayerFixtureStat = Record<string, unknown>;

export type GetAllPlayerFixtureStatsResponse = {
  success: boolean;
  message: string;
  data: PlayerFixtureStat[];
  errors: string[];
};

export type GetPlayerFixtureStatResponse = {
  success: boolean;
  message: string;
  data: PlayerFixtureStat;
  errors: string[];
};

export class PlayerFixtureStatsService {
  public static async getApiPlayerFixtureStats(): Promise<GetAllPlayerFixtureStatsResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/PlayerFixtureStats` },
      "Failed to fetch player fixture stats.",
    );
  }

  public static async addPlayerFixtureStat(
    stat: CreatePlayerFixtureStat,
  ): Promise<GetPlayerFixtureStatResponse> {
    return apiRequest(
      {
        method: "POST",
        url: `${BASE_URL}/api/PlayerFixtureStats`,
        headers: { "Content-Type": "application/json" },
        data: stat,
      },
      "Failed to add player fixture stat.",
    );
  }

  public static async getPlayerFixtureStatById(
    id: string,
  ): Promise<GetPlayerFixtureStatResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/PlayerFixtureStats/${encodeURIComponent(id)}`,
      },
      "Failed to fetch player fixture stat.",
    );
  }

  public static async updatePlayerFixtureStat(
    id: string,
    stat: UpdatePlayerFixtureStat,
  ): Promise<GetPlayerFixtureStatResponse> {
    return apiRequest(
      {
        method: "PUT",
        url: `${BASE_URL}/api/PlayerFixtureStats/${encodeURIComponent(id)}`,
        headers: { "Content-Type": "application/json" },
        data: stat,
      },
      "Failed to update player fixture stat.",
    );
  }

  public static async deletePlayerFixtureStat(
    id: string,
  ): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "DELETE",
        url: `${BASE_URL}/api/PlayerFixtureStats/${encodeURIComponent(id)}`,
      },
      "Failed to delete player fixture stat.",
    );
  }

  public static async getPlayerFixtureStatsByFixtureId(
    fixtureId: string,
  ): Promise<GetAllPlayerFixtureStatsResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/PlayerFixtureStats/fixture/${encodeURIComponent(fixtureId)}`,
      },
      "Failed to fetch player fixture stats by fixture.",
    );
  }

  public static async getPlayerFixtureStatsByPlayerId(
    playerId: string,
  ): Promise<GetAllPlayerFixtureStatsResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/PlayerFixtureStats/player/${encodeURIComponent(playerId)}`,
      },
      "Failed to fetch player fixture stats by player.",
    );
  }

  public static async getPlayerFixtureStatsByTeamId(
    teamId: string,
  ): Promise<GetAllPlayerFixtureStatsResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/PlayerFixtureStats/team/${encodeURIComponent(teamId)}`,
      },
      "Failed to fetch player fixture stats by team.",
    );
  }
}
