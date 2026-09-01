import { Article } from "@/types/article";
import { Fixture } from "@/types/fixture";
import { Player } from "@/types/player";
import { Result } from "@/types/result";
import { Transfer } from "@/types/transfer";
import { Video } from "@/types/video";

import HeroSection from "./HeroSection";
import LatestNewsSection from "./LatestNewsSection";
import MatchCentreSection from "./MatchCentreSection";
import CompetitionSection from "./CompetitionSection";
import PlayersAbroadSection from "./PlayersAbroadSection";
import TransferCentreSection from "./TransferCentreSection";
import OpinionSection from "./OpinionSection";
import VideoSection from "./VideoSection";
import NewsletterSection from "./NewsletterSection";

interface HomeContentProps {
  articles: Article[];
  fixtures: Fixture[];
  players: Player[];
  results: Result[];
  transfers: Transfer[];
  videos: Video[];
}

export default function HomeContent({
  articles,
  fixtures,
  players,
  results,
  transfers,
  videos,
}: HomeContentProps) {
  const darkMode = false;

  const featured = articles[0];
  const latest = articles.slice(1, 7);

  const trending = articles.filter((article) => article.trending).slice(0, 4);

  const pslArticles = articles
    .filter((article) => article.categoryName === "PSL")
    .slice(0, 3);

  const cafArticles = articles
    .filter((article) => article.categoryName === "CAF")
    .slice(0, 3);

  const opinionArticles = articles
    .filter((article) => article.categoryName === "Opinion")
    .slice(0, 2);

  const upcomingFixtures = fixtures.slice(0, 3);
  const recentResults = results.slice(0, 3);

  const featuredVideo = videos[0];
  const latestVideos = videos.slice(1, 4);

  return (
    <main>
      {featured && (
        <HeroSection
          article={featured}
          trending={trending}
          darkMode={darkMode}
        />
      )}

      <LatestNewsSection articles={latest} darkMode={darkMode} />

      <MatchCentreSection
        fixtures={upcomingFixtures}
        results={recentResults}
        darkMode={darkMode}
      />

      <CompetitionSection
        title="PSL"
        subtitle="DStv Premiership"
        articles={pslArticles}
        href="/competitions/psl"
        linkText="More PSL"
        darkMode={darkMode}
      />

      <CompetitionSection
        title="CAF"
        subtitle="Champions League & Confederation Cup"
        articles={cafArticles}
        href="/competitions/caf-champions-league"
        linkText="More CAF"
        darkMode={darkMode}
      />

      <PlayersAbroadSection players={players} darkMode={darkMode} />

      <TransferCentreSection transfers={transfers} darkMode={darkMode} />

      <OpinionSection articles={opinionArticles} darkMode={darkMode} />

      {featuredVideo && (
        <VideoSection
          featuredVideo={featuredVideo}
          videos={latestVideos}
          darkMode={darkMode}
        />
      )}

      <NewsletterSection darkMode={darkMode} />
    </main>
  );
}
