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
  public static async getApiArticles(): Promise<GetAllArticlesResponse> {
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

  public static async getArticleById(id: string): Promise<GetArticleResponse> {
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

  public static async addArticle(article: AddArticle): Promise<GetArticleResponse> {
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

  public static async updateArticle(
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

  public static async deleteArticle(id: string): Promise<BooleanResponse> {
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

  public static async getArticleBySlug(slug: string): Promise<GetArticleResponse> {
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

  public static async getFeaturedApiArticles(): Promise<GetAllArticlesResponse> {
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

  public static async getTrendingApiArticles(): Promise<GetAllArticlesResponse> {
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

  public static async getArticlesByAuthorId(
    authorId: string,
  ): Promise<GetAllArticlesResponse> {
    const options = {
      method: "GET",
      url: `${BASE_URL}/api/Articles/author/${encodeURIComponent(authorId)}`,
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
      console.error("Failed to fetch articles by author:", error);

      throw "Failed to fetch articles by author. Please try again.";
    }
  }

  public static async getArticlesByCategoryId(
    categoryId: string,
  ): Promise<GetAllArticlesResponse> {
    const options = {
      method: "GET",
      url: `${BASE_URL}/api/Articles/category/${encodeURIComponent(categoryId)}`,
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
      console.error("Failed to fetch articles by category:", error);

      throw "Failed to fetch articles by category. Please try again.";
    }
  }

  public static async searchArticles(query?: string): Promise<GetAllArticlesResponse> {
    const params = query ? { q: query } : undefined;

    const options = {
      method: "GET",
      url: `${BASE_URL}/api/Articles/search`,
      params,
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
      console.error("Failed to search articles:", error);

      throw "Failed to search articles. Please try again.";
    }
  }

  public static async addRelatedArticle(
    articleId: string,
    relatedArticleId: string,
  ): Promise<BooleanResponse> {
    const options = {
      method: "POST",
      url: `${BASE_URL}/api/Articles/${encodeURIComponent(articleId)}/related/${encodeURIComponent(relatedArticleId)}`,
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
      console.error("Failed to add related article:", error);

      throw "Failed to add related article. Please try again.";
    }
  }

  public static async removeRelatedArticle(
    articleId: string,
    relatedArticleId: string,
  ): Promise<BooleanResponse> {
    const options = {
      method: "DELETE",
      url: `${BASE_URL}/api/Articles/${encodeURIComponent(articleId)}/related/${encodeURIComponent(relatedArticleId)}`,
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
      console.error("Failed to remove related article:", error);

      throw "Failed to remove related article. Please try again.";
    }
  }
}
