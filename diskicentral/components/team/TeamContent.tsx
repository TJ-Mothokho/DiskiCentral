"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import ArticleCard from "@/components/article/ArticleCard";
import MatchCard from "@/components/match/MatchCard";
import type { Article } from "@/types/article";
import type { Fixture } from "@/types/fixture";
import type { Player } from "@/types/player";
import type { Standing } from "@/types/standing";
import type { Team } from "@/types/team";

interface TeamContentProps {
  team: Team;
  competitions: { id: string; name: string }[];
  articles: Article[];
  fixtures: Fixture[];
  results: Fixture[];
  players: Player[];
  standingsByCompetition: Record<string, Standing[]>;
}

type Tab = "overview" | "fixtures" | "results" | "table" | "stats" | "squad";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "fixtures", label: "Fixtures" },
  { id: "results", label: "Results" },
  { id: "table", label: "Table" },
  { id: "stats", label: "Stats" },
  { id: "squad", label: "Squad" },
];

const POSITION_GROUPS: { position: number; label: string }[] = [
  { position: 0, label: "Goalkeepers" },
  { position: 1, label: "Defenders" },
  { position: 2, label: "Midfielders" },
  { position: 3, label: "Forwards" },
];

const ALL_COMPETITIONS = "all";

export default function TeamContent({
  team,
  competitions,
  articles,
  fixtures,
  results,
  players,
  standingsByCompetition,
}: TeamContentProps) {
  const darkMode = false;
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [selectedCompetitionId, setSelectedCompetitionId] =
    useState<string>(ALL_COMPETITIONS);

  const panelClass = `rounded-xl border p-5 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`;
  const headingClass = `font-display font-bold ${darkMode ? "text-white" : "text-gray-900"}`;

  const tableCompetitionId =
    selectedCompetitionId === ALL_COMPETITIONS
      ? competitions[0]?.id
      : selectedCompetitionId;

  const filteredFixtures = useMemo(
    () =>
      selectedCompetitionId === ALL_COMPETITIONS
        ? fixtures
        : fixtures.filter(
            (fixture) => fixture.competitionId === selectedCompetitionId,
          ),
    [fixtures, selectedCompetitionId],
  );

  const filteredResults = useMemo(
    () =>
      selectedCompetitionId === ALL_COMPETITIONS
        ? results
        : results.filter(
            (result) => result.competitionId === selectedCompetitionId,
          ),
    [results, selectedCompetitionId],
  );

  const standings = tableCompetitionId
    ? (standingsByCompetition[tableCompetitionId] ?? [])
    : [];
  const teamStats = filteredResults.reduce(
    (acc, match) => {
      if (match.homeScore === null || match.awayScore === null) return acc;
      const isHome = match.homeTeamId === team.id;
      const goalsFor = isHome ? match.homeScore : match.awayScore;
      const goalsAgainst = isHome ? match.awayScore : match.homeScore;
      acc.played += 1;
      acc.goalsFor += goalsFor;
      acc.goalsAgainst += goalsAgainst;
      if (goalsFor > goalsAgainst) acc.wins += 1;
      else if (goalsFor === goalsAgainst) acc.draws += 1;
      else acc.losses += 1;
      return acc;
    },
    { played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
  );

  const fixtureMatches = filteredFixtures.map((fixture) => ({
    id: fixture.id,
    competition: fixture.competitionName ?? "Matchday",
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

  const resultMatches = filteredResults.map((result) => ({
    id: result.id,
    competition: result.competitionName ?? "Result",
    homeTeam: result.homeTeamName ?? "Home",
    awayTeam: result.awayTeamName ?? "Away",
    date: result.kickoff,
    venue: result.venue ?? undefined,
    homeScore: result.homeScore ?? undefined,
    awayScore: result.awayScore ?? undefined,
    status: "completed" as const,
  }));

  const squadByPosition = POSITION_GROUPS.map((group) => ({
    ...group,
    players: players.filter((player) => player.position === group.position),
  }));

  return (
    <main className="max-w-[1440px] mx-auto px-4 py-6">
      {/* Header */}
      <div className={`${panelClass} p-8 mb-6`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div
            className="w-20 h-20 rounded-xl overflow-hidden bg-gray-200 shrink-0"
            style={{
              borderBottom: `4px solid ${team.primarycolour ?? "#00C853"}`,
            }}>
            {team.logo && (
              <img
                src={team.logo}
                alt={team.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div>
            <div
              className={`text-sm font-semibold uppercase tracking-wide mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              {team.country ?? "South Africa"}
            </div>
            <h1 className={`${headingClass} text-3xl sm:text-4xl`}>
              {team.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Tabs + competition filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div
          className={`flex flex-wrap gap-1 p-1 rounded-xl w-fit ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === tab.id ? "bg-[#00C853] text-black shadow-sm" : darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-800"}`}>
              {tab.label}
            </button>
          ))}
        </div>
        {competitions.length > 0 && activeTab !== "squad" && (
          <select
            value={selectedCompetitionId}
            onChange={(e) => setSelectedCompetitionId(e.target.value)}
            className={`text-sm font-medium rounded-lg border px-3 py-2 outline-none focus:border-[#00C853] ${darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-700"}`}>
            <option value={ALL_COMPETITIONS}>All competitions</option>
            {competitions.map((competition) => (
              <option key={competition.id} value={competition.id}>
                {competition.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section className={panelClass}>
              <h2 className={`${headingClass} text-2xl mb-3`}>Club Profile</h2>
              <p
                className={`text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {team.description ??
                  `${team.name} is a football club based in ${team.city ?? team.country ?? "South Africa"}.`}
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
              <h3 className={`${headingClass} text-base mb-4`}>Club Info</h3>
              <div className="space-y-3">
                {[
                  ["Coach", team.coach ?? "Unknown"],
                  ["Stadium", team.stadium ?? "Unknown"],
                  ["City", team.city ?? "Unknown"],
                  ["Founded", team.founded ?? "Unknown"],
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

      {activeTab === "table" && (
        <div className="overflow-x-auto">
          <table
            className={`w-full text-sm rounded-xl overflow-hidden ${darkMode ? "bg-gray-900" : "bg-white"}`}>
            <thead
              className={`${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-600"}`}>
              <tr>
                {["#", "P", "W", "D", "L", "GD", "Pts"].map(
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

      {activeTab === "stats" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
          {teamStats.played > 0 ? (
            [
              ["Played", teamStats.played],
              ["Wins", teamStats.wins],
              ["Draws", teamStats.draws],
              ["Losses", teamStats.losses],
              ["Goals For", teamStats.goalsFor],
              ["Goals Against", teamStats.goalsAgainst],
              ["Goal Diff", teamStats.goalsFor - teamStats.goalsAgainst],
              ["Points", teamStats.wins * 3 + teamStats.draws],
            ].map(([label, value]) => (
              <div key={String(label)} className={`${panelClass} text-center`}>
                <div className="font-display font-bold text-2xl text-[#00C853]">
                  {value}
                </div>
                <div
                  className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {label}
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center py-12 text-gray-500">
              No stats available for this competition yet.
            </p>
          )}
        </div>
      )}

      {activeTab === "squad" && (
        <div className="space-y-8">
          {squadByPosition.map((group) => (
            <section key={group.label}>
              <h3 className={`${headingClass} text-lg mb-3`}>{group.label}</h3>
              {group.players.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.players.map((player) => (
                    <Link
                      key={player.id}
                      href={`/player/${player.slug}`}
                      className={`flex items-center gap-3 p-4 rounded-xl border hover:shadow-sm transition-all ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
                      <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden shrink-0">
                        {player.photo && (
                          <img
                            src={player.photo}
                            alt={player.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <div
                          className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {player.name}
                        </div>
                        <div
                          className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {player.nationality ?? "Player"}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No {group.label.toLowerCase()} listed.
                </p>
              )}
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
