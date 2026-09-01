import Link from "next/link";

import { Player } from "@/types/player";

interface Props {
  players: Player[];
  darkMode: boolean;
}

export default function PlayersAbroadSection({ players, darkMode }: Props) {
  const abroadPlayers = players.filter((player) => player.abroad).slice(0, 4);

  return (
    <section className="max-w-[1440px] mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-teal-500 rounded-full" />
          <h2
            className={`font-display font-bold text-2xl uppercase tracking-wide ${darkMode ? "text-white" : "text-gray-900"}`}>
            South Africans Abroad
          </h2>
        </div>
        <Link
          href="/players-abroad"
          className="text-sm text-teal-600 font-semibold">
          All Players
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {abroadPlayers.map((player) => (
          <Link
            key={player.id}
            href={`/player/${player.slug}`}
            className={`group border p-4 rounded-lg hover:border-[#00C853]/30 hover:shadow-md transition-all ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
                {player.photo && (
                  <img
                    src={player.photo}
                    alt={player.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="min-w-0">
                <h3
                  className={`font-display font-bold text-sm group-hover:text-[#00C853] transition-colors truncate ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                  {player.name}
                </h3>
                <p
                  className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  {player.teamName ?? "Club unavailable"}
                </p>
              </div>
            </div>
            <div
              className={`flex justify-between mt-4 pt-3 border-t text-xs ${darkMode ? "border-gray-800 text-gray-400" : "border-gray-100 text-gray-500"}`}>
              <span>Rating</span>
              <span className="font-bold text-[#00C853]">
                {player.rating.toFixed(1)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
