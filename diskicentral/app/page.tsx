import HomeContent from "@/components/home/HomeContent";
import { ArticlesService } from "@/services/ArticleService";

export default async function HomePage() {
  const articles = (await ArticlesService.getApiArticles()).data;

  return <HomeContent articles={articles} />;
}
