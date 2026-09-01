"use client";

import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import ArticleCard from "@/components/article/ArticleCard";
import { ArticlesService } from "@/services/ArticleService";
import { PlayersService } from "@/services/PlayerService";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-[1440px] mx-auto px-4 py-6 text-gray-500">
          Loading search…
        </div>
      }>
      <SearchPageContent />
    </Suspense>
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [activeType, setActiveType] = useState("all");
  const [articles, setArticles] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const darkMode = false;

  useEffect(() => {
    const currentQuery = searchParams.get("q") ?? "";
    setQuery(currentQuery);

    const load = async () => {
      const [articlesResponse, playersResponse] = await Promise.all([
        ArticlesService.getApiArticles(),
        PlayersService.getApiPlayers(),
      ]);
      setArticles(articlesResponse.data ?? []);
      setPlayers(playersResponse.data ?? []);
      setTeams(
        (globalThis as any).TeamsService?.getApiTeams
          ? ((await (globalThis as any).TeamsService.getApiTeams()).data ?? [])
          : [],
      );
    };

    void load();
  }, [searchParams]);

  const q = query.trim().toLowerCase();

  const matchedArticles = useMemo(
    () =>
      q
        ? articles.filter((article) =>
            [
              article.title,
              article.excerpt,
              article.authorName,
              article.categoryName,
            ]
              .filter(Boolean)
              .some((value) => String(value).toLowerCase().includes(q)),
          )
        : [],
    [articles, q],
  );

  const matchedPlayers = useMemo(
    () =>
      q
        ? players.filter((player) =>
            [player.name, player.teamName, player.nationality, player.position]
              .filter(Boolean)
              .some((value) => String(value).toLowerCase().includes(q)),
          )
        : [],
    [players, q],
  );

  const matchedTeams = useMemo(
    () =>
      q
        ? teams.filter((team) =>
            [team.name, team.city, team.country]
              .filter(Boolean)
              .some((value) => String(value).toLowerCase().includes(q)),
          )
        : [],
    [q, teams],
  );

  const totalResults =
    matchedArticles.length + matchedPlayers.length + matchedTeams.length;
  const types = [
    { key: "all", label: "All Results", count: totalResults },
    { key: "articles", label: "Articles", count: matchedArticles.length },
    { key: "players", label: "Players", count: matchedPlayers.length },
    { key: "teams", label: "Teams", count: matchedTeams.length },
  ];

  return (
    <main className="max-w-[1440px] mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto mb-10">
        <h1
          className={`font-display font-bold text-4xl mb-6 text-center ${darkMode ? "text-white" : "text-gray-900"}`}>
          Search DiskiCentral
        </h1>
        <form className="flex gap-3">
          <div className="relative flex-1">
            <SearchIcon
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search articles, players, teams..."
              className={`w-full pl-11 pr-4 py-3.5 text-sm border rounded-xl outline-none focus:border-[#00C853] transition-colors ${darkMode ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-white border-gray-200 text-gray-900"}`}
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3.5 bg-[#00C853] text-black font-bold rounded-xl hover:bg-[#00A344] transition-colors">
            Search
          </button>
        </form>
      </div>

      {q && (
        <>
          <div className="mb-5">
            <p
              className={`text-sm mb-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              {totalResults} result{totalResults !== 1 ? "s" : ""} for "
              <strong className={darkMode ? "text-white" : "text-gray-900"}>
                {q}
              </strong>
              "
            </p>
            <div className="flex gap-2 flex-wrap">
              {types.map((type) => (
                <button
                  key={type.key}
                  type="button"
                  onClick={() => setActiveType(type.key)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    activeType === type.key
                      ? "bg-[#00C853] text-black"
                      : darkMode
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}>
                  {type.label} ({type.count})
                </button>
              ))}
            </div>
          </div>

          {totalResults === 0 ? (
            <div
              className={`text-center py-20 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              <div className="text-5xl mb-4">⚽</div>
              <h2 className="text-xl font-semibold mb-2">No results found</h2>
              <p>Try different search terms or browse our categories</p>
            </div>
          ) : (
            <div className="space-y-10">
              {(activeType === "all" || activeType === "articles") &&
                matchedArticles.length > 0 && (
                  <section>
                    <h2
                      className={`font-display font-bold text-xl mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Articles
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {matchedArticles.map((article) => (
                        <ArticleCard
                          key={article.id}
                          article={article}
                          darkMode={darkMode}
                        />
                      ))}
                    </div>
                  </section>
                )}

              {(activeType === "all" || activeType === "players") &&
                matchedPlayers.length > 0 && (
                  <section>
                    <h2
                      className={`font-display font-bold text-xl mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Players
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {matchedPlayers.map((player) => (
                        <Link
                          key={player.id}
                          href={`/player/${player.slug}`}
                          className={`block p-4 rounded-xl border ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
                          <div className="font-semibold text-[#00C853]">
                            {player.name}
                          </div>
                          <div
                            className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                            {player.teamName ?? "Club"}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

              {(activeType === "all" || activeType === "teams") &&
                matchedTeams.length > 0 && (
                  <section>
                    <h2
                      className={`font-display font-bold text-xl mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Teams
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {matchedTeams.map((team) => (
                        <Link
                          key={team.id}
                          href={`/team/${team.slug}`}
                          className={`block p-4 rounded-xl border ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
                          <div className="font-semibold text-[#00C853]">
                            {team.name}
                          </div>
                          <div
                            className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                            {team.city ?? "South Africa"}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
            </div>
          )}
        </>
      )}

      {!q && (
        <div
          className={`text-center py-16 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          <SearchIcon size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg">
            Search for articles, players, teams and more
          </p>
        </div>
      )}
    </main>
  );
}
