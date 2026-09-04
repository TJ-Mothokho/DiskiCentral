"use client";

import Link from "next/link";
import { useState } from "react";

import ArticleCard from "@/components/article/ArticleCard";
import MatchCard from "@/components/match/MatchCard";
import type { Article } from "@/types/article";
import type { Competition } from "@/types/competition";
import type { Fixture } from "@/types/fixture";
import type { Result } from "@/types/result";
import type { Standing } from "@/types/standing";

interface CompetitionContentProps {
  competition: Competition;
  articles: Article[];
  fixtures: Fixture[];
  results: Result[];
  fixtureById: Map<string, Fixture>;
  standings: Standing[];
}

type Tab = "overview" | "news" | "fixtures" | "results" | "standings";

export default function CompetitionContent({
  competition,
  articles,
  fixtures,
  results,
  fixtureById,
  standings,
}: CompetitionContentProps) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const darkMode = false;
  const tabs: Tab[] = ["overview", "news", "fixtures", "results", "standings"];
  const panelClass = `rounded-xl border p-5 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`;
  const headingClass = `font-display font-bold ${darkMode ? "text-white" : "text-gray-900"}`;

  const fixtureMatches = fixtures.map((fixture) => ({
    id: fixture.id,
    competition: fixture.competitionName ?? competition.name,
    homeTeam: fixture.homeTeamName ?? "Home",
    awayTeam: fixture.awayTeamName ?? "Away",
    date: fixture.kickoff,
    time: new Date(fixture.kickoff).toLocaleTimeString("en-ZA", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    venue: fixture.venue ?? undefined,
    status: "scheduled" as const,
  }));

  const resultMatches = results.map((result) => {
    const fixture = fixtureById.get(result.fixtureId);
    return {
      id: result.id,
      competition: fixture?.competitionName ?? competition.name,
      homeTeam: fixture?.homeTeamName ?? "Home",
      awayTeam: fixture?.awayTeamName ?? "Away",
      date: fixture?.kickoff ?? result.createdAt,
      venue: fixture?.venue ?? undefined,
      homeScore: result.homeScore,
      awayScore: result.awayScore,
      status: "completed" as const,
    };
  });

  return (
    <main className="max-w-[1440px] mx-auto px-4 py-6">
      <div className={`${panelClass} p-8 mb-6`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div
            className="w-20 h-20 rounded-xl overflow-hidden bg-gray-200 shrink-0"
            style={{
              borderBottom: `4px solid ${competition.colour ?? "#00C853"}`,
            }}>
            {competition.logo && (
              <img
                src={competition.logo}
                alt={competition.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div>
            <div
              className={`text-sm font-semibold uppercase tracking-wide mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              {competition.country} · Season {competition.season ?? "Current"}
            </div>
            <h1 className={`${headingClass} text-3xl sm:text-4xl`}>
              {competition.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <span
                className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                {competition.teamIds.length} teams
              </span>
              <span
                className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Format {competition.format}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                <span className="w-1.5 h-1.5 rounded-full bg-current" /> Active
                competition
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`flex flex-wrap gap-1 p-1 rounded-xl mb-6 w-fit ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${activeTab === tab ? "bg-[#00C853] text-black shadow-sm" : darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-800"}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section className={panelClass}>
              <h2 className={`${headingClass} text-2xl mb-3`}>About</h2>
              <p
                className={`text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {competition.country} competition covering the{" "}
                {competition.season ?? "current"} season.
              </p>
            </section>
            {articles.length > 0 && (
              <section>
                <h2 className={`${headingClass} text-2xl mb-4`}>Latest News</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {articles.slice(0, 4).map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      darkMode={darkMode}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
          <div className="space-y-5">
            <section className={panelClass}>
              <h3 className={`${headingClass} text-base mb-4`}>
                Competition Info
              </h3>
              <div className="space-y-3">
                {[
                  ["Season", competition.season ?? "Current"],
                  ["Teams", competition.teamIds.length],
                  ["Country", competition.country],
                  ["Seasons", competition.seasonIds.length],
                ].map(([label, value]) => (
                  <div
                    key={String(label)}
                    className="flex justify-between gap-4">
                    <span
                      className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                      {label}
                    </span>
                    <span
                      className={`text-xs font-semibold text-right ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </section>
            {fixtureMatches.length > 0 && (
              <section>
                <h3 className={`${headingClass} text-base mb-3`}>
                  Upcoming Fixtures
                </h3>
                <div className="space-y-3">
                  {fixtureMatches.slice(0, 2).map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      darkMode={darkMode}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      )}

      {activeTab === "news" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                darkMode={darkMode}
              />
            ))
          ) : (
            <p className="col-span-full text-center py-12 text-gray-500">
              No articles for this competition yet.
            </p>
          )}
        </div>
      )}
      {activeTab === "fixtures" && (
        <div className="space-y-3 max-w-2xl">
          {fixtureMatches.length > 0 ? (
            fixtureMatches.map((match) => (
              <MatchCard key={match.id} match={match} darkMode={darkMode} />
            ))
          ) : (
            <p className="text-center py-12 text-gray-500">
              No upcoming fixtures.
            </p>
          )}
        </div>
      )}
      {activeTab === "results" && (
        <div className="space-y-3 max-w-2xl">
          {resultMatches.length > 0 ? (
            resultMatches.map((match) => (
              <MatchCard key={match.id} match={match} darkMode={darkMode} />
            ))
          ) : (
            <p className="text-center py-12 text-gray-500">No results yet.</p>
          )}
        </div>
      )}

      {activeTab === "standings" && (
        <div className="overflow-x-auto">
          <table
            className={`w-full text-sm rounded-xl overflow-hidden ${darkMode ? "bg-gray-900" : "bg-white"}`}>
            <thead
              className={`${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-600"}`}>
              <tr>
                {["#", "Team", "P", "W", "D", "L", "GD", "Pts"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {standings.map((row) => (
                <tr
                  key={row.id}
                  className={`border-t ${darkMode ? "border-gray-800 hover:bg-gray-800" : "border-gray-50 hover:bg-gray-50"}`}>
                  <td className="px-4 py-3 font-semibold text-[#00C853]">
                    {row.position}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/team/${row.teamName?.toLowerCase().replace(/\s+/g, "-")}`}
                      className={`${headingClass} hover:text-[#00C853]`}>
                      {row.teamName ?? "Unknown team"}
                    </Link>
                  </td>
                  <td className="text-center px-3 py-3">{row.played}</td>
                  <td className="text-center px-3 py-3">{row.wins}</td>
                  <td className="text-center px-3 py-3">{row.draws}</td>
                  <td className="text-center px-3 py-3">{row.losses}</td>
                  <td className="text-center px-3 py-3">
                    {row.goalDifference > 0
                      ? `+${row.goalDifference}`
                      : row.goalDifference}
                  </td>
                  <td className={`${headingClass} text-center px-3 py-3`}>
                    {row.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {standings.length === 0 && (
            <p className="text-center py-12 text-gray-500">
              No standings available yet.
            </p>
          )}
        </div>
      )}
    </main>
  );
}
