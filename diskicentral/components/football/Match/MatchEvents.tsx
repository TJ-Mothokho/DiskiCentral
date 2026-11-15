import type { FixtureEvent } from "@/api/types/events.response";
import type { FixturePlayerStatistics } from "@/api/types/players-statistics.response";
import { EmptyState } from "@/components/football/Primitives";
import { MatchEventRow } from "./MatchEventRow";
import { getEventScores } from "./MatchEventUtils";

export function MatchEvents({
  events,
  players,
  homeTeamId,
  awayTeamId,
  homeTeamName,
  awayTeamName,
}: {
  events: FixtureEvent[];
  players: FixturePlayerStatistics[];
  homeTeamId: number;
  awayTeamId: number;
  homeTeamName: string;
  awayTeamName: string;
}) {
  if (!events.length) {
    return (
      <EmptyState
        title="No timeline yet"
        message="Match events become available when the provider returns them."
      />
    );
  }

  const photos = new Map(
    players.flatMap((group) =>
      group.players.map(({ player }) => [player.id, player.photo] as const),
    ),
  );
  const scores = getEventScores(events, homeTeamId, awayTeamId);

  return (
    <div className="detail-panel space-y-4">
      {events.map((event, index) => (
        <MatchEventRow
          key={`${event.time.elapsed}-${event.player.id}-${index}`}
          event={event}
          score={scores[index]}
          homeTeamName={homeTeamName}
          awayTeamName={awayTeamName}
          playerPhoto={
            event.player.id === null
              ? undefined
              : photos.get(event.player.id)
          }
        />
      ))}
    </div>
  );
}
