import HomeContent from "@/components/home/HomeContent";
import { ArticlesService } from "@/services/ArticleService";
import { FixturesService } from "@/services/FixtureService";
import { PlayersService } from "@/services/PlayerService";
import { TransfersService } from "@/services/TransferService";
import { VideoService } from "@/services/VideoService";

export const dynamic = "force-dynamic";

const PREMIER_SOCCER_LEAGUE_ID = "8501e2ad-c5ed-4b26-83ae-df2f4d1b1e5e";

export default async function HomePage() {
  const [articles, fixtures, players, transfers, videos] =
    await Promise.all([
      ArticlesService.getApiArticles(),
      FixturesService.getFixturesByCompetitionId(PREMIER_SOCCER_LEAGUE_ID),
      PlayersService.getApiPlayers(),
      TransfersService.getApiTransfers(),
      VideoService.getApiVideos(),
    ]);

  return (
    <HomeContent
      articles={articles.data}
      fixtures={fixtures.data}
      players={players.data}
      transfers={transfers.data}
      videos={videos.data}
    />
  );
}
