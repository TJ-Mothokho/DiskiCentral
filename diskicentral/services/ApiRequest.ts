export const BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : "";

  import axios, { AxiosRequestConfig } from "axios";

  export async function apiRequest<
    T extends { success: boolean; errors: string[] },
  >(options: AxiosRequestConfig, errorMessage: string): Promise<T> {
    try {
      const response = await axios.request<T>(options);

      if (!response.data.success) {
        throw response.data.errors
          ? response.data.errors
          : "Unexpected error occurred. Please refresh the page!";
      }

      return response.data;
    } catch (error) {
      console.error(errorMessage, error);
      throw `${errorMessage} Please try again.`;
    }
  }
