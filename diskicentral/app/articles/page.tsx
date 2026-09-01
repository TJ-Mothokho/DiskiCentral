import ArticlesContent from "@/components/article/ArticlesContent";
import { ArticlesService } from "@/services/ArticleService";
import { VideoService } from "@/services/VideoService";

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  const [articlesResponse, videosResponse] = await Promise.all([
    ArticlesService.getApiArticles(),
    VideoService.getApiVideos(),
  ]);

  return (
    <ArticlesContent
      articles={articlesResponse.data}
      videos={videosResponse.data}
    />
  );
}
