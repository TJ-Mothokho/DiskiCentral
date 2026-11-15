import Link from "next/link";
import type { FixturePlayerStatistics } from "@/api/types/players-statistics.response";

export function MatchPlayerRatings({
  players,
}: {
  players: FixturePlayerStatistics[];
}) {
  const topPlayers = players.flatMap((group) => group.players).slice(0, 6);

  return (
    <div className="detail-panel">
      <p className="eyebrow">Player match data</p>
      <h2 className="mt-2 text-xl font-bold text-primary">Ratings and output</h2>
      {topPlayers.length ? (
        <div className="mt-5 space-y-5">
          {topPlayers.map((entry) => {
            const games = entry.statistics[0]?.games as
              | Record<string, unknown>
              | undefined;
            const rating =
              typeof games?.rating === "string" ||
              typeof games?.rating === "number"
                ? String(games.rating)
                : "—";

            return (
              <div
                key={entry.player.id}
                className="flex items-center justify-between gap-4"
              >
                <Link
                  href={`/players/${entry.player.id}`}
                  className="font-semibold text-primary underline-offset-2 hover:underline"
                >
                  {entry.player.name}
                </Link>
                <span className="font-mono text-sm text-secondary">
                  {rating}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-4 text-sm text-secondary">
          Player statistics are not available for this fixture.
        </p>
      )}
    </div>
  );
}
