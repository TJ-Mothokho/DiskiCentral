import { notFound } from "next/navigation";

import ArticleContent from "@/components/article/ArticleContent";
import { ArticlesService } from "@/services/ArticleService";
import { TagsService } from "@/services/TagService";

export const dynamic = "force-dynamic";

export default async function ArticlePage({
  params,
}: PageProps<"/article/[slug]">) {
  const { slug } = await params;

  try {
    const [articleResponse, articlesResponse, tagsResponse] = await Promise.all(
      [
        ArticlesService.getArticleBySlug(slug),
        ArticlesService.getApiArticles(),
        new TagsService().getApiTags(),
      ],
    );

    return (
      <ArticleContent
        article={articleResponse.data}
        articles={articlesResponse.data}
        tags={tagsResponse.data ?? []}
      />
    );
  } catch {
    notFound();
  }
}
