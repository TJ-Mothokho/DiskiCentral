import Link from "next/link";
import type { FixturePlayerStatistics } from "@/api/types/players-statistics.response";

export function MatchPlayerRatings({
  players,
}: {
  players: FixturePlayerStatistics[];
}) {
  const ratedPlayers = new Map<
    number,
    { id: number; name: string; rating: string; numericRating: number }
  >();

  for (const entry of players.flatMap((group) => group.players)) {
    const games = entry.statistics.find(
      (statistic) =>
        statistic.games !== null && typeof statistic.games === "object",
    )?.games;
    if (!games || typeof games !== "object") continue;
    const gameStats = games as Record<string, unknown>;
    const minutes = Number(gameStats.minutes);
    const rawRating = gameStats.rating;
    if (!Number.isFinite(minutes) || minutes <= 0) continue;
    if (
      (typeof rawRating !== "string" && typeof rawRating !== "number") ||
      String(rawRating).trim() === ""
    ) {
      continue;
    }

    const numericRating = Number(rawRating);
    if (!Number.isFinite(numericRating)) continue;
    const player = {
      id: entry.player.id,
      name: entry.player.name,
      rating: String(rawRating),
      numericRating,
    };
    const existing = ratedPlayers.get(player.id);
    if (!existing || player.numericRating > existing.numericRating) {
      ratedPlayers.set(player.id, player);
    }
  }

  const sortedPlayers = Array.from(ratedPlayers.values()).sort(
    (a, b) => b.numericRating - a.numericRating,
  );

  return (
    <div className="detail-panel">
      <p className="eyebrow">Player match data</p>
      <h2 className="mt-2 text-xl font-bold text-primary">Ratings and output</h2>
      {sortedPlayers.length ? (
        <div className="mt-5 space-y-5">
          {sortedPlayers.map((player) => {
            return (
              <div
                key={player.id}
                className="flex items-center justify-between gap-4"
              >
                <Link
                  href={`/players/${player.id}`}
                  className="font-semibold text-primary underline-offset-2 hover:underline"
                >
                  {player.name}
                </Link>
                <span className="font-mono text-sm text-secondary">
                  {player.rating}
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
