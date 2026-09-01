import {
  AddArticle,
  GetAllArticlesResponse,
  GetArticleResponse,
  UpdateArticle,
} from "@/types/article";
import { BooleanResponse } from "@/types/common";
import { apiRequest, BASE_URL } from "@/services/ApiRequest";

export class ArticlesService {
  public static async getApiArticles(): Promise<GetAllArticlesResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Articles` },
      "Failed to fetch articles.",
    );
  }

  public static async getArticleById(id: string): Promise<GetArticleResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Articles/${encodeURIComponent(id)}`,
      },
      "Failed to fetch article.",
    );
  }

  public static async addArticle(
    article: AddArticle,
  ): Promise<GetArticleResponse> {
    return apiRequest(
      {
        method: "POST",
        url: `${BASE_URL}/api/Articles`,
        headers: { "Content-Type": "application/json" },
        data: article,
      },
      "Failed to add article.",
    );
  }

  public static async updateArticle(
    id: string,
    article: UpdateArticle,
  ): Promise<GetArticleResponse> {
    return apiRequest(
      {
        method: "PUT",
        url: `${BASE_URL}/api/Articles/${encodeURIComponent(id)}`,
        headers: { "Content-Type": "application/json" },
        data: article,
      },
      "Failed to update article.",
    );
  }

  public static async deleteArticle(id: string): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "DELETE",
        url: `${BASE_URL}/api/Articles/${encodeURIComponent(id)}`,
      },
      "Failed to delete article.",
    );
  }

  public static async getArticleBySlug(
    slug: string,
  ): Promise<GetArticleResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Articles/slug/${encodeURIComponent(slug)}`,
      },
      "Failed to fetch article by slug.",
    );
  }

  public static async getFeaturedApiArticles(): Promise<GetAllArticlesResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Articles/featured` },
      "Failed to fetch featured articles.",
    );
  }

  public static async getTrendingApiArticles(): Promise<GetAllArticlesResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Articles/trending` },
      "Failed to fetch trending articles.",
    );
  }

  public static async getArticlesByAuthorId(
    authorId: string,
  ): Promise<GetAllArticlesResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Articles/author/${encodeURIComponent(authorId)}`,
      },
      "Failed to fetch articles by author.",
    );
  }

  public static async getArticlesByCategoryId(
    categoryId: string,
  ): Promise<GetAllArticlesResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Articles/category/${encodeURIComponent(categoryId)}`,
      },
      "Failed to fetch articles by category.",
    );
  }

  public static async searchArticles(
    query?: string,
  ): Promise<GetAllArticlesResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Articles/search`,
        params: query ? { q: query } : undefined,
      },
      "Failed to search articles.",
    );
  }

  public static async addRelatedArticle(
    articleId: string,
    relatedArticleId: string,
  ): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "POST",
        url: `${BASE_URL}/api/Articles/${encodeURIComponent(articleId)}/related/${encodeURIComponent(relatedArticleId)}`,
      },
      "Failed to add related article.",
    );
  }

  public static async removeRelatedArticle(
    articleId: string,
    relatedArticleId: string,
  ): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "DELETE",
        url: `${BASE_URL}/api/Articles/${encodeURIComponent(articleId)}/related/${encodeURIComponent(relatedArticleId)}`,
      },
      "Failed to remove related article.",
    );
  }
}
