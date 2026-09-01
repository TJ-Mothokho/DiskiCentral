import Link from "next/link";
import { notFound } from "next/navigation";

import ArticleCard from "@/components/article/ArticleCard";
import MatchCard from "@/components/match/MatchCard";
import { ArticlesService } from "@/services/ArticleService";
import { FixturesService } from "@/services/FixtureService";
import { PlayersService } from "@/services/PlayerService";
import { ResultsService } from "@/services/ResultService";

export const dynamic = "force-dynamic";

export default async function TeamPage({ params }: PageProps<"/team/[slug]">) {
  const { slug } = await params;

  const teamsResponse = (await (
    globalThis as any
  ).TeamsService?.getApiTeams?.()) ?? { success: true, data: [] };

  const [articlesResponse, fixturesResponse, resultsResponse, playersResponse] =
    await Promise.all([
      ArticlesService.getApiArticles(),
      FixturesService.getApiFixtures(),
      ResultsService.getApiResults(),
      PlayersService.getApiPlayers(),
    ]);

  const team = (teamsResponse.data ?? []).find(
    (entry: any) => entry.slug === slug,
  );
  if (!team) {
    notFound();
  }

  const teamArticles = (articlesResponse.data ?? [])
    .filter(
      (article) =>
        article.teamName === team.name ||
        article.title.toLowerCase().includes(team.name.toLowerCase()),
    )
    .slice(0, 6);

  const teamFixtures = (fixturesResponse.data ?? []).filter(
    (fixture) =>
      fixture.homeTeamName === team.name || fixture.awayTeamName === team.name,
  );

  const teamResults = (resultsResponse.data ?? []).filter(
    (result) =>
      result.homeScore !== undefined && result.awayScore !== undefined,
  );

  const teamPlayers = (playersResponse.data ?? []).filter(
    (player) => player.teamName === team.name,
  );

  const darkMode = false;
  const tabs = ["overview", "news", "squad", "fixtures", "results"] as const;
  const activeTab: string = "overview";

  const fixtureMatches = teamFixtures.map((fixture) => ({
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

  const resultMatches = teamResults.map((result) => {
    const fixture = (fixturesResponse.data ?? []).find(
      (entry) => entry.id === result.fixtureId,
    );

    return {
      id: result.id,
      competition: fixture?.competitionName ?? "Result",
      homeTeam: fixture?.homeTeamName ?? "Home",
      awayTeam: fixture?.awayTeamName ?? "Away",
      date: fixture?.kickoff ?? result.createdAt,
      time: fixture
        ? new Date(fixture.kickoff).toLocaleTimeString("en-ZA", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        : undefined,
      venue: fixture?.venue ?? undefined,
      homeScore: result.homeScore,
      awayScore: result.awayScore,
      status: "completed" as const,
    };
  });

  return (
    <main className="max-w-[1440px] mx-auto px-4 py-6">
      <div
        className={`rounded-2xl p-8 mb-6 ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-100"}`}
        style={{ borderTop: `4px solid ${team.colour ?? "#00C853"}` }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-200 shrink-0">
            {team.logo && (
              <img
                src={team.logo}
                alt={team.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex-1">
            <h1
              className={`font-display font-bold text-3xl sm:text-4xl ${darkMode ? "text-white" : "text-gray-900"}`}>
              {team.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span
                className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                {team.city ?? "South Africa"}
              </span>
              <span
                className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                ·
              </span>
              <span
                className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                {team.coach ?? "Coach"}
              </span>
            </div>
          </div>
          <div
            className={`rounded-xl border px-6 py-4 text-center ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-100"}`}>
            <div className="font-display font-bold text-3xl text-[#00C853]">
              {team.founded ?? "N/A"}
            </div>
            <div
              className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Founded
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
            className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${
              activeTab === tab
                ? "bg-[#00C853] text-black"
                : darkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-800"
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div
              className={`rounded-xl border p-5 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
              <h2
                className={`font-display font-bold text-xl mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Club Profile
              </h2>
              <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                {team.description ??
                  "A proud South African football club competing with ambition and identity in the domestic landscape."}
              </p>
            </div>

            {teamArticles.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {teamArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    darkMode={darkMode}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div
              className={`rounded-xl border p-5 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
              <h3
                className={`font-display font-bold text-base mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Club Details
              </h3>
              <ul
                className={`space-y-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                <li>Stadium: {team.stadium ?? "Home ground"}</li>
                <li>City: {team.city ?? "South Africa"}</li>
                <li>Country: {team.country ?? "South Africa"}</li>
              </ul>
            </div>

            {teamFixtures.length > 0 && (
              <div
                className={`rounded-xl border p-5 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
                <h3
                  className={`font-display font-bold text-base mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Upcoming Fixtures
                </h3>
                <div className="space-y-3">
                  {fixtureMatches.slice(0, 3).map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      darkMode={darkMode}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "news" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {teamArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              darkMode={darkMode}
            />
          ))}
        </div>
      )}

      {activeTab === "squad" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamPlayers.map((player) => (
            <Link
              key={player.id}
              href={`/player/${player.slug}`}
              className={`flex items-center gap-3 p-4 rounded-xl border hover:shadow-sm transition-all ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
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
                  {player.position ?? "Player"}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {activeTab === "fixtures" && (
        <div className="space-y-3 max-w-2xl">
          {fixtureMatches.length > 0 ? (
            fixtureMatches.map((match) => (
              <MatchCard key={match.id} match={match} darkMode={darkMode} />
            ))
          ) : (
            <p
              className={`text-center py-12 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
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
            <p
              className={`text-center py-12 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              No recent results.
            </p>
          )}
        </div>
      )}
    </main>
  );
}
