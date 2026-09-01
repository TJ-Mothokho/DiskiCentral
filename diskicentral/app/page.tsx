import HomeContent from "@/components/home/HomeContent";
import { ArticlesService } from "@/services/ArticleService";
import { FixturesService } from "@/services/FixtureService";
import { PlayersService } from "@/services/PlayerService";
import { ResultsService } from "@/services/ResultService";
import { TransfersService } from "@/services/TransferService";
import { VideoService } from "@/services/VideoService";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [articles, fixtures, players, results, transfers, videos] =
    await Promise.all([
      ArticlesService.getApiArticles(),
      FixturesService.getApiFixtures(),
      PlayersService.getApiPlayers(),
      ResultsService.getApiResults(),
      TransfersService.getApiTransfers(),
      VideoService.getApiVideos(),
    ]);

  return (
    <HomeContent
      articles={articles.data}
      fixtures={fixtures.data}
      players={players.data}
      results={results.data}
      transfers={transfers.data}
      videos={videos.data}
    />
  );
}
