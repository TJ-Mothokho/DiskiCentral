import {
  AddArticle,
  GetAllArticlesResponse,
  GetArticleResponse,
  UpdateArticle,
} from "@/types/article";
import { BooleanResponse } from "@/types/common";
import { apiRequest, BASE_URL } from "@/services/ApiRequest";
import { TokenStorage } from "@/services/TokenStorage";

type ArticleApiResponse = { success: boolean };

const ARTICLE_CACHE_TTL_MS = 60 * 60 * 1000;
const articleCache = new Map<
  string,
  { expiresAt: number; value: ArticleApiResponse }
>();
const articleRequests = new Map<string, Promise<ArticleApiResponse>>();
let articleCacheVersion = 0;

function cacheKey(key: string): string {
  const userId = TokenStorage.getUser()?.id;
  const authScope =
    userId ?? (TokenStorage.getToken() ? "authenticated" : "anonymous");
  return `${authScope}:${key}`;
}

function cachedArticleRequest<T extends ArticleApiResponse>(
  key: string,
  request: () => Promise<T>,
): Promise<T> {
  const scopedKey = cacheKey(key);
  const cached = articleCache.get(scopedKey);
  if (cached && cached.expiresAt > Date.now()) {
    return Promise.resolve(cached.value as T);
  }
  if (cached) articleCache.delete(scopedKey);

  const pending = articleRequests.get(scopedKey);
  if (pending) return pending as Promise<T>;

  const version = articleCacheVersion;
  const requestPromise = request()
    .then((response) => {
      if (response.success && version === articleCacheVersion) {
        articleCache.set(scopedKey, {
          expiresAt: Date.now() + ARTICLE_CACHE_TTL_MS,
          value: response,
        });
      }
      return response;
    })
    .finally(() => {
      if (articleRequests.get(scopedKey) === requestPromise) {
        articleRequests.delete(scopedKey);
      }
    });
  articleRequests.set(scopedKey, requestPromise);
  return requestPromise;
}

function clearArticleCache(): void {
  articleCacheVersion += 1;
  articleCache.clear();
  articleRequests.clear();
}

async function mutateArticles<T extends ArticleApiResponse>(
  request: () => Promise<T>,
): Promise<T> {
  const response = await request();
  if (response.success) clearArticleCache();
  return response;
}

function articleFormData(article: AddArticle | UpdateArticle) {
  const formData = new FormData();
  const append = (key: string, value: unknown) => {
    if (value !== null && value !== undefined && value !== "") {
      formData.append(key, String(value));
    }
  };

  append("Title", article.title);
  append("Slug", article.slug);
  append("Subtitle", article.subtitle);
  append("Excerpt", article.excerpt);
  append("Body", article.body);
  append("CategoryId", article.categoryId);
  append("TeamId", article.teamId);
  if(article.tagIds) article.tagIds.forEach((tagId) => formData.append("TagIds", tagId));
  append("Featured", article.featured);
  append("Trending", article.trending);
  if ("status" in article) append("Status", article.status);
  if ("publishedAt" in article) append("PublishedAt", article.publishedAt);
  if (article.heroImage) formData.append("HeroImage", article.heroImage);
  if (article.thumbnail) formData.append("Thumbnail", article.thumbnail);
  return formData;
}

export class ArticlesService {
  public static async getApiArticles(): Promise<GetAllArticlesResponse> {
    return cachedArticleRequest("all", () =>
      apiRequest(
        { method: "GET", url: `${BASE_URL}/api/Articles` },
        "Failed to fetch articles.",
        {
          success: false,
          message: "Articles are currently unavailable.",
          data: [],
          errors: ["Failed to fetch articles."],
        },
      ),
    );
  }

  public static async getArticleById(id: string): Promise<GetArticleResponse> {
    return cachedArticleRequest(`id:${id}`, () =>
      apiRequest(
        {
          method: "GET",
          url: `${BASE_URL}/api/Articles/${encodeURIComponent(id)}`,
        },
        "Failed to fetch article.",
      ),
    );
  }

  public static async addArticle(
    article: AddArticle,
  ): Promise<GetArticleResponse> {
    return mutateArticles(() =>
      apiRequest(
        {
          method: "POST",
          url: `${BASE_URL}/api/Articles`,
          data: articleFormData(article),
        },
        "Failed to add article.",
      ),
    );
  }

  public static async updateArticle(
    id: string,
    article: UpdateArticle,
  ): Promise<GetArticleResponse> {
    return mutateArticles(() =>
      apiRequest(
        {
          method: "PUT",
          url: `${BASE_URL}/api/Articles/${encodeURIComponent(id)}`,
          data: articleFormData(article),
        },
        "Failed to update article.",
      ),
    );
  }

  public static async deleteArticle(id: string): Promise<BooleanResponse> {
    return mutateArticles(() =>
      apiRequest(
        {
          method: "DELETE",
          url: `${BASE_URL}/api/Articles/${encodeURIComponent(id)}`,
        },
        "Failed to delete article.",
      ),
    );
  }

  public static async getArticleBySlug(
    slug: string,
  ): Promise<GetArticleResponse> {
    return cachedArticleRequest(`slug:${slug}`, () =>
      apiRequest(
        {
          method: "GET",
          url: `${BASE_URL}/api/Articles/slug/${encodeURIComponent(slug)}`,
        },
        "Failed to fetch article by slug.",
      ),
    );
  }

  public static async getFeaturedApiArticles(): Promise<GetAllArticlesResponse> {
    return cachedArticleRequest("featured", () =>
      apiRequest(
        { method: "GET", url: `${BASE_URL}/api/Articles/featured` },
        "Failed to fetch featured articles.",
      ),
    );
  }

  public static async getTrendingApiArticles(): Promise<GetAllArticlesResponse> {
    return cachedArticleRequest("trending", () =>
      apiRequest(
        { method: "GET", url: `${BASE_URL}/api/Articles/trending` },
        "Failed to fetch trending articles.",
      ),
    );
  }

  public static async getArticlesByPersonId(
    personId: string,
  ): Promise<GetAllArticlesResponse> {
    return cachedArticleRequest(`person:${personId}`, () =>
      apiRequest(
        {
          method: "GET",
          url: `${BASE_URL}/api/Articles/person/${encodeURIComponent(personId)}`,
        },
        "Failed to fetch articles by person.",
      ),
    );
  }

  public static async getArticlesByCategoryId(
    categoryId: string,
  ): Promise<GetAllArticlesResponse> {
    return cachedArticleRequest(`category:${categoryId}`, () =>
      apiRequest(
        {
          method: "GET",
          url: `${BASE_URL}/api/Articles/category/${encodeURIComponent(categoryId)}`,
        },
        "Failed to fetch articles by category.",
      ),
    );
  }

  public static async searchArticles(
    query?: string,
  ): Promise<GetAllArticlesResponse> {
    return cachedArticleRequest(`search:${query ?? ""}`, () =>
      apiRequest(
        {
          method: "GET",
          url: `${BASE_URL}/api/Articles/search`,
          params: query ? { q: query } : undefined,
        },
        "Failed to search articles.",
      ),
    );
  }

  public static async addRelatedArticle(
    articleId: string,
    relatedArticleId: string,
  ): Promise<BooleanResponse> {
    return mutateArticles(() =>
      apiRequest(
        {
          method: "POST",
          url: `${BASE_URL}/api/Articles/${encodeURIComponent(articleId)}/related/${encodeURIComponent(relatedArticleId)}`,
        },
        "Failed to add related article.",
      ),
    );
  }

  public static async removeRelatedArticle(
    articleId: string,
    relatedArticleId: string,
  ): Promise<BooleanResponse> {
    return mutateArticles(() =>
      apiRequest(
        {
          method: "DELETE",
          url: `${BASE_URL}/api/Articles/${encodeURIComponent(articleId)}/related/${encodeURIComponent(relatedArticleId)}`,
        },
        "Failed to remove related article.",
      ),
    );
  }
}
