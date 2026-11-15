import { ArticlesService } from "@/services/ArticleService";
import type { Article } from "@/types/article";

export async function safeArticles(kind: "all" | "featured" | "trending" = "all"): Promise<Article[]> {
  try {
    const result = kind === "featured"
      ? await ArticlesService.getFeaturedApiArticles()
      : kind === "trending"
        ? await ArticlesService.getTrendingApiArticles()
        : await ArticlesService.getApiArticles();
    return result.success ? result.data : [];
  } catch {
    return [];
  }
}

export function responseItems<T extends { response: unknown[] }>(result: T | undefined): T["response"] {
  return result?.response ?? [];
}
