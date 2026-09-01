import {
  AddTransfer,
  GetAllTransfersResponse,
  GetTransferResponse,
  UpdateTransfer,
} from "@/types/transfer";
import { BooleanResponse } from "@/types/common";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : "";

export class TransfersService {
  public static async getApiTransfers(): Promise<GetAllTransfersResponse> {
    const options = {
      method: "GET",
      url: `${BASE_URL}/api/Transfers`,
    };

    try {
      const response = await axios.request<GetAllTransfersResponse>(options);

      if (!response.data.success) {
        throw response.data.errors
          ? response.data.errors
          : "Unexpected error occurred. Please refresh the page!";
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch transfers:", error);

      throw "Failed to fetch transfers. Please try again.";
    }
  }

  public static async addTransfer(
    transfer: AddTransfer,
  ): Promise<GetTransferResponse> {
    const options = {
      method: "POST",
      url: `${BASE_URL}/api/Transfers`,
      headers: {
        "Content-Type": "application/json",
      },
      data: transfer,
    };

    try {
      const response = await axios.request<GetTransferResponse>(options);

      if (!response.data.success) {
        throw response.data.errors
          ? response.data.errors
          : "Unexpected error occurred. Please refresh the page!";
      }

      return response.data;
    } catch (error) {
      console.error("Failed to add transfer:", error);

      throw "Failed to add transfer. Please try again.";
    }
  }

  public static async getTransferById(id: string): Promise<GetTransferResponse> {
    const options = {
      method: "GET",
      url: `${BASE_URL}/api/Transfers/${encodeURIComponent(id)}`,
    };

    try {
      const response = await axios.request<GetTransferResponse>(options);

      if (!response.data.success) {
        throw response.data.errors
          ? response.data.errors
          : "Unexpected error occurred. Please refresh the page!";
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch transfer:", error);

      throw "Failed to fetch transfer. Please try again.";
    }
  }

  public static async updateTransfer(
    id: string,
    transfer: UpdateTransfer,
  ): Promise<GetTransferResponse> {
    const options = {
      method: "PUT",
      url: `${BASE_URL}/api/Transfers/${encodeURIComponent(id)}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: transfer,
    };

    try {
      const response = await axios.request<GetTransferResponse>(options);

      if (!response.data.success) {
        throw response.data.errors
          ? response.data.errors
          : "Unexpected error occurred. Please refresh the page!";
      }

      return response.data;
    } catch (error) {
      console.error("Failed to update transfer:", error);

      throw "Failed to update transfer. Please try again.";
    }
  }

  public static async deleteTransfer(id: string): Promise<BooleanResponse> {
    const options = {
      method: "DELETE",
      url: `${BASE_URL}/api/Transfers/${encodeURIComponent(id)}`,
    };

    try {
      const response = await axios.request<BooleanResponse>(options);

      if (!response.data.success) {
        throw response.data.errors
          ? response.data.errors
          : "Unexpected error occurred. Please refresh the page!";
      }

      return response.data;
    } catch (error) {
      console.error("Failed to delete transfer:", error);

      throw "Failed to delete transfer. Please try again.";
    }
  }

  public static async getTransfersByPlayerId(
    playerId: string,
  ): Promise<GetAllTransfersResponse> {
    const options = {
      method: "GET",
      url: `${BASE_URL}/api/Transfers/player/${encodeURIComponent(playerId)}`,
    };

    try {
      const response = await axios.request<GetAllTransfersResponse>(options);

      if (!response.data.success) {
        throw response.data.errors
          ? response.data.errors
          : "Unexpected error occurred. Please refresh the page!";
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch transfers by player:", error);

      throw "Failed to fetch transfers by player. Please try again.";
    }
  }

  public static async getTransfersByTeamId(
    teamId: string,
  ): Promise<GetAllTransfersResponse> {
    const options = {
      method: "GET",
      url: `${BASE_URL}/api/Transfers/team/${encodeURIComponent(teamId)}`,
    };

    try {
      const response = await axios.request<GetAllTransfersResponse>(options);

      if (!response.data.success) {
        throw response.data.errors
          ? response.data.errors
          : "Unexpected error occurred. Please refresh the page!";
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch transfers by team:", error);

      throw "Failed to fetch transfers by team. Please try again.";
    }
  }
}
