import axios, { AxiosRequestConfig } from "axios";
import { TokenStorage } from "@/services/TokenStorage";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : "";

// Shared axios instance so every request (auth + data) goes through the same
// token attachment / 401 handling logic.
export const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const requestUrl = config.url ?? "";
  const publicAuthEndpoint =
    requestUrl.includes("/api/Auth/login") ||
    requestUrl.includes("/api/Auth/register") ||
    requestUrl.includes("/api/Auth/forgot-password") ||
    requestUrl.includes("/api/Auth/confirm-email") ||
    requestUrl.includes("/api/Auth/resend-confirmation") ||
    requestUrl.includes("/api/Auth/reset-password");
  const token = TokenStorage.getToken();
  if (token && !publicAuthEndpoint) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      TokenStorage.clear();
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth:unauthorized"));
      }
    }
    return Promise.reject(error);
  },
);

export async function apiRequest<
  T extends { success: boolean; errors: string[] },
>(options: AxiosRequestConfig, errorMessage: string): Promise<T> {
  try {
    const response = await apiClient.request<T>(options);

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
