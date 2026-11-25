import type { FixtureEvent } from "@/api/types/events.response";
import type { FixturePlayerStatistics } from "@/api/types/players-statistics.response";
import { EmptyState } from "@/components/football/Primitives";
import { MatchEventRow } from "./MatchEventRow";
import { getEventScores, sortEventIndexes } from "./MatchEventUtils";

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
  const chronologicalIndexes = sortEventIndexes(events);
  const chronologicalScores = getEventScores(
    chronologicalIndexes.map((index) => events[index]),
    homeTeamId,
    awayTeamId,
  );
  const scores = new Map(
    chronologicalIndexes.map((eventIndex, index) => [
      eventIndex,
      chronologicalScores[index],
    ]),
  );
  const reverseIndexes = sortEventIndexes(events, true);

  return (
    <div className="detail-panel relative p-3 sm:p-6">
      {reverseIndexes.map((eventIndex, index) => {
        const event = events[eventIndex];
        const awayEvent = event.team.id === awayTeamId;
        return (
          <MatchEventRow
            key={`${event.time.elapsed}-${event.time.extra ?? ""}-${event.player.id}-${index}`}
            event={event}
            score={scores.get(eventIndex) ?? null}
            awayEvent={awayEvent}
            homeTeamName={homeTeamName}
            awayTeamName={awayTeamName}
            playerPhoto={
              event.player.id === null
                ? undefined
                : photos.get(event.player.id)
            }
          />
        );
      })}
    </div>
  );
}
