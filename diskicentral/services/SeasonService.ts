import {
  AddSeason,
  GetAllSeasonsResponse,
  GetSeasonResponse,
  UpdateSeason,
} from "@/types/season";
import { apiRequest, BASE_URL } from "@/services/ApiRequest";
import { BooleanResponse } from "@/types/common";

export class SeasonsService {
  public async getApiSeasons(): Promise<GetAllSeasonsResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Seasons` },
      "Failed to fetch seasons.",
    );
  }

  public async addSeason(season: AddSeason): Promise<GetSeasonResponse> {
    return apiRequest(
      {
        method: "POST",
        url: `${BASE_URL}/api/Seasons`,
        headers: { "Content-Type": "application/json" },
        data: season,
      },
      "Failed to add season.",
    );
  }

  public async getSeasonById(id: string): Promise<GetSeasonResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Seasons/${encodeURIComponent(id)}`,
      },
      "Failed to fetch season.",
    );
  }

  public async updateSeason(
    id: string,
    season: UpdateSeason,
  ): Promise<GetSeasonResponse> {
    return apiRequest(
      {
        method: "PUT",
        url: `${BASE_URL}/api/Seasons/${encodeURIComponent(id)}`,
        headers: { "Content-Type": "application/json" },
        data: season,
      },
      "Failed to update season.",
    );
  }

  public async deleteSeason(id: string): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "DELETE",
        url: `${BASE_URL}/api/Seasons/${encodeURIComponent(id)}`,
      },
      "Failed to delete season.",
    );
  }

  public async getSeasonBySlug(slug: string): Promise<GetSeasonResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Seasons/slug/${encodeURIComponent(slug)}`,
      },
      "Failed to fetch season by slug.",
    );
  }

  public async getSeasonsByCompetitionId(
    competitionId: string,
  ): Promise<GetAllSeasonsResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Seasons/competition/${encodeURIComponent(competitionId)}`,
      },
      "Failed to fetch seasons by competition.",
    );
  }
}
