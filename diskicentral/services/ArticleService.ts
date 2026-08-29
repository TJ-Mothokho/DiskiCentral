import {
  AddArticle,
  GetAllArticlesResponse,
  GetArticleResponse,
  UpdateArticle,
} from "@/types/article";
import { BooleanResponse } from "@/types/common";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : "";

export class ArticlesService {
  public async getApiArticles(): Promise<GetAllArticlesResponse> {
    const options = {
      method: "GET",
      url: `${BASE_URL}/api/Articles`,
    };

    try {
      const response = await axios.request<GetAllArticlesResponse>(options);

      if (!response.data.success) {
        throw response.data.errors
          ? response.data.errors
          : "Unexpected error occurred. Please refresh the page!";
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch articles:", error);

      throw "Failed to fetch articles. Please try again.";
    }
  }

  public async getArticleById(id: string): Promise<GetArticleResponse> {
    const options = {
      method: "GET",
      url: `${BASE_URL}/api/Articles/${id}`,
    };

    try {
      const response = await axios.request<GetArticleResponse>(options);

      if (!response.data.success) {
        throw response.data.errors
          ? response.data.errors
          : "Unexpected error occurred. Please refresh the page!";
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch articles:", error);

      throw "Failed to fetch articles. Please try again.";
    }
  }

  public async addArticle(article: AddArticle): Promise<GetArticleResponse> {
    const options = {
      method: "POST",
      url: `${BASE_URL}/api/Articles`,
      headers: {
        "Content-Type": "application/json",
      },
      data: article,
    };

    try {
      const response = await axios.request<GetArticleResponse>(options);

      if (!response.data.success) {
        throw response.data.errors
          ? response.data.errors
          : "Unexpected error occurred. Please refresh the page!";
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch articles:", error);

      throw "Failed to fetch articles. Please try again.";
    }
  }

  public async updateArticle(
    id: string,
    article: UpdateArticle,
  ): Promise<GetArticleResponse> {
    const options = {
      method: "PUT",
      url: `${BASE_URL}/api/Articles/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: article,
    };

    try {
      const response = await axios.request<GetArticleResponse>(options);

      if (!response.data.success) {
        throw response.data.errors
          ? response.data.errors
          : "Unexpected error occurred. Please refresh the page!";
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch articles:", error);

      throw "Failed to fetch articles. Please try again.";
    }
  }

  public async deleteArticle(id: string): Promise<BooleanResponse> {
    const options = {
      method: "DELETE",
      url: `${BASE_URL}/api/Articles/${id}`,
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
      console.error("Failed to fetch articles:", error);

      throw "Failed to fetch articles. Please try again.";
    }
  }

  public async getArticleBySlug(slug: string): Promise<GetArticleResponse> {
    const options = {
      method: "GET",
      url: `${BASE_URL}/api/Articles/slug/${slug}`,
    };

    try {
      const response = await axios.request<GetArticleResponse>(options);

      if (!response.data.success) {
        throw response.data.errors
          ? response.data.errors
          : "Unexpected error occurred. Please refresh the page!";
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch article:", error);

      throw "Failed to fetch article. Please try again.";
    }
  }

  public async getFeaturedApiArticles(): Promise<GetAllArticlesResponse> {
    const options = {
      method: "GET",
      url: `${BASE_URL}/api/Articles/featured`,
    };

    try {
      const response = await axios.request<GetAllArticlesResponse>(options);

      if (!response.data.success) {
        throw response.data.errors
          ? response.data.errors
          : "Unexpected error occurred. Please refresh the page!";
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch articles:", error);

      throw "Failed to fetch articles. Please try again.";
    }
  }

  public async getTrendingApiArticles(): Promise<GetAllArticlesResponse> {
    const options = {
      method: "GET",
      url: `${BASE_URL}/api/Articles/trending`,
    };

    try {
      const response = await axios.request<GetAllArticlesResponse>(options);

      if (!response.data.success) {
        throw response.data.errors
          ? response.data.errors
          : "Unexpected error occurred. Please refresh the page!";
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch articles:", error);

      throw "Failed to fetch articles. Please try again.";
    }
  }
}
