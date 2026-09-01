import {
  AddResult,
  GetAllResultsResponse,
  GetResultResponse,
  UpdateResult,
} from "@/types/result";
import { BooleanResponse } from "@/types/common";
import { apiRequest, BASE_URL } from "@/services/ApiRequest";

export class ResultsService {
  public static async getApiResults(): Promise<GetAllResultsResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Results` },
      "Failed to fetch results.",
    );
  }

  public static async addResult(result: AddResult): Promise<GetResultResponse> {
    return apiRequest(
      {
        method: "POST",
        url: `${BASE_URL}/api/Results`,
        headers: { "Content-Type": "application/json" },
        data: result,
      },
      "Failed to add result.",
    );
  }

  public static async getResultById(id: string): Promise<GetResultResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Results/${encodeURIComponent(id)}`,
      },
      "Failed to fetch result.",
    );
  }

  public static async updateResult(
    id: string,
    result: UpdateResult,
  ): Promise<GetResultResponse> {
    return apiRequest(
      {
        method: "PUT",
        url: `${BASE_URL}/api/Results/${encodeURIComponent(id)}`,
        headers: { "Content-Type": "application/json" },
        data: result,
      },
      "Failed to update result.",
    );
  }

  public static async deleteResult(id: string): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "DELETE",
        url: `${BASE_URL}/api/Results/${encodeURIComponent(id)}`,
      },
      "Failed to delete result.",
    );
  }

  public static async getResultByFixtureId(
    fixtureId: string,
  ): Promise<GetResultResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Results/fixture/${encodeURIComponent(fixtureId)}`,
      },
      "Failed to fetch result by fixture.",
    );
  }
}
