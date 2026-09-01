import Link from "next/link";
import { MapPin, Star, Trophy, TrendingUp } from "lucide-react";
import { notFound } from "next/navigation";

import ArticleCard from "@/components/article/ArticleCard";
import { ArticlesService } from "@/services/ArticleService";
import { PlayersService } from "@/services/PlayerService";

export const dynamic = "force-dynamic";

export default async function PlayerPage({
  params,
}: PageProps<"/player/[slug]">) {
  const { slug } = await params;
  const [playersResponse, articlesResponse] = await Promise.all([
    PlayersService.getApiPlayers(),
    ArticlesService.getApiArticles(),
  ]);

  const player = (playersResponse.data ?? []).find(
    (entry) => entry.slug === slug,
  );
  if (!player) {
    notFound();
  }

  const playerArticles = (articlesResponse.data ?? []).filter(
    (article) =>
      article.title.toLowerCase().includes(player.name.toLowerCase()) ||
      article.authorName?.toLowerCase().includes(player.name.toLowerCase()) ||
      article.categoryName?.toLowerCase().includes("abroad"),
  );

  const suggestedArticles = (articlesResponse.data ?? [])
    .filter(
      (article) => !playerArticles.some((entry) => entry.id === article.id),
    )
    .slice(0, 3);

  const darkMode = false;
  const positionColors: Record<string, string> = {
    Striker: "bg-red-100 text-red-700",
    Winger: "bg-orange-100 text-orange-700",
    Midfielder: "bg-blue-100 text-blue-700",
    "Central Midfielder": "bg-blue-100 text-blue-700",
    "Right Back": "bg-green-100 text-green-700",
    "Centre Back": "bg-purple-100 text-purple-700",
  };

  return (
    <main className="max-w-[1440px] mx-auto px-4 py-6">
      <div
        className={`rounded-2xl overflow-hidden mb-8 ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-100"}`}>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-72 xl:w-80 shrink-0 aspect-[4/3] lg:aspect-auto bg-gray-200 overflow-hidden">
            {player.photo && (
              <img
                src={player.photo}
                alt={player.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="flex-1 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${positionColors[String(player.position)] ?? "bg-gray-100 text-gray-600"}`}>
                {player.position ?? "Player"}
              </span>
              {player.abroad && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700">
                  Abroad
                </span>
              )}
            </div>

            <h1
              className={`font-display font-bold text-3xl sm:text-4xl mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
              {player.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-5">
              <div className="flex items-center gap-1.5 text-sm">
                <MapPin size={14} className="text-[#00C853]" />
                <span>{player.nationality ?? "South Africa"}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <Trophy size={14} className="text-[#00C853]" />
                <span>{player.teamName ?? "Club"}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <TrendingUp size={14} className="text-[#00C853]" />
                <span>Rating {player.rating ?? 0}</span>
              </div>
            </div>

            <div
              className={`grid grid-cols-5 gap-3 p-4 rounded-xl mb-5 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              {[
                { label: "Apps", value: 0 },
                { label: "Goals", value: 0 },
                { label: "Assists", value: 0 },
                { label: "Yellow", value: 0 },
                { label: "Red", value: 0 },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <div className="font-display font-bold text-2xl text-[#00C853]">
                    {value}
                  </div>
                  <div
                    className={`text-[10px] ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p
                className={`text-xs font-semibold uppercase tracking-wide mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Recent form
              </p>
              <div className="flex gap-1.5">
                {Array.from({ length: 5 }, (_, index) => (
                  <div
                    key={`${player.id}-${index}`}
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${index % 2 === 0 ? "bg-[#00C853] text-black" : "bg-gray-200 text-gray-700"}`}>
                    {index % 2 === 0 ? "W" : "D"}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section
            className={`rounded-xl border p-6 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
            <h2
              className={`font-display font-bold text-xl mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Biography
            </h2>
            <p
              className={`text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {player.biography ??
                "A South African footballer with talent, ambition and a growing profile across domestic and international football."}
            </p>
          </section>

          <section>
            <h2
              className={`font-display font-bold text-xl mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Career Timeline
            </h2>
            <div className="relative">
              <div
                className={`absolute left-3 top-0 bottom-0 w-0.5 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
              />
              <div className="space-y-3 pl-10">
                {[
                  {
                    year: "2024",
                    text: "Continuing his development with top-level football and national team attention.",
                  },
                  {
                    year: "2023",
                    text: "Impressed at club level and became a recognized talent in South African football.",
                  },
                  {
                    year: "2022",
                    text: "Broke through with standout performances and wider recognition.",
                  },
                ].map((item) => (
                  <div key={item.year} className="relative">
                    <div className="absolute -left-[2.25rem] top-1 w-3 h-3 rounded-full bg-[#00C853]" />
                    <div
                      className={`rounded-lg border p-3 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
                      <div className="text-xs font-semibold text-[#00C853] mb-1">
                        {item.year}
                      </div>
                      <p
                        className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {playerArticles.length > 0 && (
            <section>
              <h2
                className={`font-display font-bold text-xl mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Latest News
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {playerArticles.slice(0, 2).map((article) => (
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
          <div
            className={`rounded-xl border p-5 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
            <h3
              className={`font-display font-bold text-base mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Club Info
            </h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#00C853]/10 flex items-center justify-center">
                <Star
                  size={16}
                  className="text-[#00C853]"
                  fill="currentColor"
                />
              </div>
              <div>
                <div
                  className={`font-semibold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                  {player.teamName ?? "Current Club"}
                </div>
                <div
                  className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {player.position ?? "Player"}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl border p-5 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
            <h3
              className={`font-display font-bold text-base mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Previous Clubs
            </h3>
            <div className="space-y-2">
              {[
                "Mamelodi Sundowns",
                "Orlando Pirates",
                "Maritzburg United",
              ].map((club) => (
                <div
                  key={club}
                  className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  {club}
                </div>
              ))}
            </div>
          </div>

          {suggestedArticles.length > 0 && (
            <div
              className={`rounded-xl border p-4 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
              <h3
                className={`font-display font-bold text-base mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Suggested Articles
              </h3>
              <div className="space-y-3">
                {suggestedArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/article/${article.slug}`}
                    className="block hover:text-[#00C853] text-sm">
                    {article.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
