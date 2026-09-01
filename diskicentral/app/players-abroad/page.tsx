import Link from "next/link";
import { Globe, Star, TrendingUp } from "lucide-react";

import { ArticlesService } from "@/services/ArticleService";
import { PlayersService } from "@/services/PlayerService";

export default async function PlayersAbroadPage() {
  const darkMode = false;

  const [playersResponse, articlesResponse] = await Promise.all([
    PlayersService.getApiPlayers(),
    ArticlesService.getApiArticles(),
  ]);

  const abroad = (playersResponse.data ?? []).filter((player) => player.abroad);
  const countries = [
    "All",
    "England",
    "Egypt",
    "France",
    "Turkey",
    "Germany",
    "Portugal",
  ];

  const filtered = abroad;

  return (
    <main className="max-w-[1440px] mx-auto px-4 py-6">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Globe size={20} className="text-purple-500" />
          <h1
            className={`font-display font-bold text-4xl ${darkMode ? "text-white" : "text-gray-900"}`}>
            South Africans Abroad
          </h1>
        </div>
        <p
          className={`text-base ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          Tracking South African footballers making their mark on the world
          stage
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {countries.map((country) => (
          <button
            key={country}
            type="button"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              country === "All"
                ? "bg-purple-500 text-white"
                : darkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}>
            {country}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
        {filtered.map((player) => {
          const playerArticles = (articlesResponse.data ?? []).filter(
            (article) =>
              article.title.toLowerCase().includes(player.name.toLowerCase()) ||
              article.authorName
                ?.toLowerCase()
                .includes(player.name.toLowerCase()),
          );

          return (
            <Link
              key={player.id}
              href={`/player/${player.slug}`}
              className={`group rounded-xl border overflow-hidden hover:shadow-lg transition-all ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                {player.photo && (
                  <img
                    src={player.photo}
                    alt={player.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#00C853] text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                      Abroad
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3
                  className={`font-display font-bold text-base mb-0.5 group-hover:text-[#00C853] transition-colors ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                  {player.name}
                </h3>
                <p
                  className={`text-sm font-medium mb-1 ${darkMode ? "text-purple-400" : "text-purple-600"}`}>
                  {player.teamName ?? "Club"}
                </p>
                <p
                  className={`text-xs mb-3 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  {player.nationality ?? "South Africa"} · {player.position}
                </p>

                <div
                  className={`grid grid-cols-3 gap-2 py-3 border-y mb-3 ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
                  {[
                    { label: "Goals", value: 0 },
                    { label: "Assists", value: 0 },
                    { label: "Apps", value: 0 },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center">
                      <div className="font-display font-bold text-lg text-[#00C853]">
                        {value}
                      </div>
                      <div
                        className={`text-[10px] ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                        {label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star
                      size={14}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <span
                      className={`text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {player.rating ?? 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp size={14} className="text-[#00C853]" />
                    <span
                      className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      Form
                    </span>
                  </div>
                </div>

                {playerArticles.length > 0 && (
                  <div
                    className={`mt-3 pt-3 border-t text-xs ${darkMode ? "border-gray-800 text-gray-400" : "border-gray-100 text-gray-500"}`}>
                    Latest: {playerArticles[0].title}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <section>
        <h2
          className={`font-display font-bold text-2xl mb-5 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Latest from Abroad
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(articlesResponse.data ?? [])
            .filter((article) => article.categoryName === "Players Abroad")
            .slice(0, 6)
            .map((article) => (
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
                className={`group rounded-xl border overflow-hidden hover:shadow-md transition-all ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
                <div className="aspect-video overflow-hidden bg-gray-200">
                  {article.thumbnail && (
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3
                    className={`font-semibold text-sm leading-snug line-clamp-2 group-hover:text-[#00C853] transition-colors ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                    {article.title}
                  </h3>
                  <p
                    className={`text-xs mt-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                    {article.authorName ?? "DiskiCentral"} ·{" "}
                    {article.readingTime} min read
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
