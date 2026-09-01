import { notFound } from "next/navigation";

import ArticleContent from "@/components/article/ArticleContent";
import { ArticlesService } from "@/services/ArticleService";

export const dynamic = "force-dynamic";

export default async function ArticlePage({
  params,
}: PageProps<"/article/[slug]">) {
  const { slug } = await params;

  try {
    const [articleResponse, articlesResponse] = await Promise.all([
      ArticlesService.getArticleBySlug(slug),
      ArticlesService.getApiArticles(),
    ]);

    return (
      <ArticleContent
        article={articleResponse.data}
        articles={articlesResponse.data}
      />
    );
  } catch {
    notFound();
  }
}
