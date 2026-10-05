import ArticlesContent from "@/components/article/ArticlesContent";
import { ArticlesService } from "@/services/ArticleService";
import { TagsService } from "@/services/TagService";
import { VideoService } from "@/services/VideoService";

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  const [articlesResponse, videosResponse, tagsResponse] = await Promise.all([
    ArticlesService.getApiArticles(),
    VideoService.getApiVideos(),
    new TagsService().getApiTags(),
  ]);

  return (
    <ArticlesContent
      articles={articlesResponse.data}
      videos={videosResponse.data}
      tags={tagsResponse.data ?? []}
    />
  );
}
