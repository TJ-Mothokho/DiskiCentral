import {
  AddCompetition,
  GetAllCompetitionsResponse,
  GetCompetitionResponse,
  UpdateCompetition,
} from "@/types/competition";
import { apiRequest, BASE_URL } from "@/services/ApiRequest";
import { BooleanResponse } from "@/types/common";
import { BulkTeamLink } from "@/types/team";

export class CompetitionsService {
  public async getApiCompetitions(): Promise<GetAllCompetitionsResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Competitions` },
      "Failed to fetch competitions.",
    );
  }

  public async addCompetition(
    competition: AddCompetition,
  ): Promise<GetCompetitionResponse> {
    return apiRequest(
      {
        method: "POST",
        url: `${BASE_URL}/api/Competitions`,
        headers: { "Content-Type": "application/json" },
        data: competition,
      },
      "Failed to add competition.",
    );
  }

  public async getCompetitionById(id: string): Promise<GetCompetitionResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Competitions/${encodeURIComponent(id)}`,
      },
      "Failed to fetch competition.",
    );
  }

  public async updateCompetition(
    id: string,
    competition: UpdateCompetition,
  ): Promise<GetCompetitionResponse> {
    return apiRequest(
      {
        method: "PUT",
        url: `${BASE_URL}/api/Competitions/${encodeURIComponent(id)}`,
        headers: { "Content-Type": "application/json" },
        data: competition,
      },
      "Failed to update competition.",
    );
  }

  public async deleteCompetition(id: string): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "DELETE",
        url: `${BASE_URL}/api/Competitions/${encodeURIComponent(id)}`,
      },
      "Failed to delete competition.",
    );
  }

  public async getCompetitionBySlug(
    slug: string,
  ): Promise<GetCompetitionResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Competitions/slug/${encodeURIComponent(slug)}`,
      },
      "Failed to fetch competition by slug.",
    );
  }

  public async getCompetitionsBySeasonId(
    seasonId: string,
  ): Promise<GetAllCompetitionsResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Competitions/season/${encodeURIComponent(seasonId)}`,
      },
      "Failed to fetch competitions by season.",
    );
  }

  public async addSeasonToCompetition(
    competitionId: string,
    seasonId: string,
  ): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "POST",
        url: `${BASE_URL}/api/Competitions/${encodeURIComponent(competitionId)}/seasons/${encodeURIComponent(seasonId)}`,
      },
      "Failed to add season to competition.",
    );
  }

  public async removeSeasonFromCompetition(
    competitionId: string,
    seasonId: string,
  ): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "DELETE",
        url: `${BASE_URL}/api/Competitions/${encodeURIComponent(competitionId)}/seasons/${encodeURIComponent(seasonId)}`,
      },
      "Failed to remove season from competition.",
    );
  }

  public async addTeamsToCompetition(
    competitionId: string,
    teamLink: BulkTeamLink,
  ): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "POST",
        url: `${BASE_URL}/api/Competitions/${encodeURIComponent(competitionId)}/teams/bulk`,
        headers: { "Content-Type": "application/json" },
        data: teamLink,
      },
      "Failed to add teams to competition.",
    );
  }

  public async removeTeamsFromCompetition(
    competitionId: string,
    teamLink: BulkTeamLink,
  ): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "POST",
        url: `${BASE_URL}/api/Competitions/${encodeURIComponent(competitionId)}/teams/bulk/remove`,
        headers: { "Content-Type": "application/json" },
        data: teamLink,
      },
      "Failed to remove teams from competition.",
    );
  }
}
