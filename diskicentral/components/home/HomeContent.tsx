"use client";

import { useState } from "react";
import { useTheme } from "@/themes/ThemeContext";

import { Article } from "@/types/article";

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
}

export default function HomeContent({ articles }: HomeContentProps) {
  const { darkMode } = useTheme();

  /*
   * Home page data
   *
   * These are currently placeholders for the other
   * API services/types we'll migrate next.
   */
  const videos = [];
  const fixtures = [];
  const results = [];
  const players = [];
  const transfers = [];

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

  const abroadPlayers = players.filter((player) => player.abroad).slice(0, 4);

  const recentTransfers = transfers.slice(0, 4);
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

      <PlayersAbroadSection players={abroadPlayers} darkMode={darkMode} />

      <TransferCentreSection transfers={recentTransfers} darkMode={darkMode} />

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
