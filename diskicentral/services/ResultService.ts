import {
  AddResult,
  GetAllResultsResponse,
  GetResultResponse,
  UpdateResult,
} from "@/types/result";
import axios from "axios";
import { BooleanResponse } from "@/types/common";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : "";

export class ResultsService {
  public async getApiResults(): Promise<GetAllResultsResponse> {
    try {
      const response = await axios.request<GetAllResultsResponse>({
        method: "GET",
        url: `${BASE_URL}/api/Results`,
      });

      if (!response.data.success) {
        throw response.data.errors
          ? response.data.errors
          : "Unexpected error occurred. Please refresh the page!";
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch results:", error);

      throw "Failed to fetch results. Please try again.";
    }
  }

  public async addResult(result: AddResult): Promise<GetResultResponse> {
    try {
      const response = await axios.request<GetResultResponse>({
        method: "POST",
        url: `${BASE_URL}/api/Results`,
        headers: {
          "Content-Type": "application/json",
        },
        data: result,
      });

      if (!response.data.success) {
        throw response.data.errors
          ? response.data.errors
          : "Unexpected error occurred. Please refresh the page!";
      }

      return response.data;
    } catch (error) {
      console.error("Failed to add result:", error);

      throw "Failed to add result. Please try again.";
    }
  }

  public async getResultById(id: string): Promise<GetResultResponse> {
    try {
      const response = await axios.request<GetResultResponse>({
        method: "GET",
        url: `${BASE_URL}/api/Results/${encodeURIComponent(id)}`,
      });

      if (!response.data.success) {
        throw response.data.errors
          ? response.data.errors
          : "Unexpected error occurred. Please refresh the page!";
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch result:", error);

      throw "Failed to fetch result. Please try again.";
    }
  }

  public async updateResult(
    id: string,
    result: UpdateResult,
  ): Promise<GetResultResponse> {
    try {
      const response = await axios.request<GetResultResponse>({
        method: "PUT",
        url: `${BASE_URL}/api/Results/${encodeURIComponent(id)}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: result,
      });

      if (!response.data.success) {
        throw response.data.errors
          ? response.data.errors
          : "Unexpected error occurred. Please refresh the page!";
      }

      return response.data;
    } catch (error) {
      console.error("Failed to update result:", error);

      throw "Failed to update result. Please try again.";
    }
  }

  public async deleteResult(id: string): Promise<BooleanResponse> {
    try {
      const response = await axios.request<BooleanResponse>({
        method: "DELETE",
        url: `${BASE_URL}/api/Results/${encodeURIComponent(id)}`,
      });

      if (!response.data.success) {
        throw response.data.errors
          ? response.data.errors
          : "Unexpected error occurred. Please refresh the page!";
      }

      return response.data;
    } catch (error) {
      console.error("Failed to delete result:", error);

      throw "Failed to delete result. Please try again.";
    }
  }

  public async getResultByFixtureId(
    fixtureId: string,
  ): Promise<GetResultResponse> {
    try {
      const response = await axios.request<GetResultResponse>({
        method: "GET",
        url: `${BASE_URL}/api/Results/fixture/${encodeURIComponent(fixtureId)}`,
      });

      if (!response.data.success) {
        throw response.data.errors
          ? response.data.errors
          : "Unexpected error occurred. Please refresh the page!";
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch result by fixture:", error);

      throw "Failed to fetch result by fixture. Please try again.";
    }
  }
}
