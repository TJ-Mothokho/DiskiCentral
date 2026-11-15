import Link from "next/link";
import type { FixtureEvent } from "@/api/types/events.response";
import type { FixturePlayerStatistics } from "@/api/types/players-statistics.response";
import { EmptyState } from "@/components/football/Primitives";

type MatchEventsProps = {
  events: FixtureEvent[];
  players: FixturePlayerStatistics[];
  homeTeamId: number;
  awayTeamId: number;
  homeTeamName: string;
  awayTeamName: string;
};

function isSubstitution(event: FixtureEvent) {
  const type = event.type.toLowerCase();
  return type === "subst" || type === "substitution";
}

function getEventLabel(event: FixtureEvent) {
  const type = event.type.toLowerCase();
  const detail = event.detail.toLowerCase();

  if (type === "goal" && detail.includes("missed penalty")) {
    return { label: "Missed Penalty", colorClass: "" };
  }
  if (type === "goal") return { label: "Goal", colorClass: "" };
  if (type === "card") {
    const cardInfo = `${event.detail} ${event.comments ?? ""}`.toLowerCase();
    if (cardInfo.includes("red")) {
      return { label: "Red Card", colorClass: "text-red-600" };
    }
    if (cardInfo.includes("yellow")) {
      return { label: "Yellow Card", colorClass: "text-yellow-600" };
    }
    return { label: "Card", colorClass: "" };
  }
  if (isSubstitution(event)) return { label: "Substitude", colorClass: "" };

  return { label: event.type, colorClass: "" };
}

function getEventScores(
  events: FixtureEvent[],
  homeTeamId: number,
  awayTeamId: number,
): Array<{ home: number; away: number } | null> {
  let homeScore = 0;
  let awayScore = 0;

  return events.map((event) => {
    if (
      event.type.toLowerCase() !== "goal" ||
      event.detail.toLowerCase().includes("missed penalty")
    ) {
      return null;
    }

    if (event.team.id === homeTeamId) homeScore += 1;
    else if (event.team.id === awayTeamId) awayScore += 1;
    else return null;

    return { home: homeScore, away: awayScore };
  });
}

function PlayerAvatar({
  playerId,
  name,
  photos,
}: {
  playerId: number | null;
  name: string | null;
  photos: Map<number, string>;
}) {
  const photo = playerId === null ? undefined : photos.get(playerId);
  const sizeClass = "h-10 w-10";

  return photo ? (
    <img
      src={photo}
      alt=""
      aria-hidden="true"
      className={`${sizeClass} shrink-0 rounded-full object-cover`}
    />
  ) : (
    <span
      aria-hidden="true"
      className={`${sizeClass} flex shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary`}
    >
      {name?.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}

function PlayerLink({
  playerId,
  name,
}: {
  playerId: number | null;
  name: string;
}) {
  return playerId === null ? (
    <span>{name}</span>
  ) : (
    <Link
      href={`/players/${playerId}`}
      className="text-inherit underline-offset-2 hover:underline"
    >
      {name}
    </Link>
  );
}

export function MatchEvents({
  events,
  players,
  homeTeamId,
  awayTeamId,
  homeTeamName,
  awayTeamName,
}: MatchEventsProps) {
  if (events.length === 0) {
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
      {events.map((event, index) => {
        const substitution = isSubstitution(event);
        const goal = event.type.toLowerCase() === "goal";
        const { label, colorClass } = getEventLabel(event);
        const score = scores[index];

        return (
          <div
            key={`${event.time.elapsed}-${event.player.id}-${index}`}
            className="flex items-start gap-4 border-b border-primary/10 pb-4 last:border-0 last:pb-0"
          >
            <span className="w-10 shrink-0 pt-1 font-mono text-sm font-semibold text-primary">
              {event.time.elapsed}′
            </span>
            {substitution ? (
              <img
                src={event.team.logo}
                alt=""
                aria-hidden="true"
                className="h-10 w-10 shrink-0 rounded-full bg-surface object-contain p-1"
              />
            ) : (
              <PlayerAvatar
                playerId={event.player.id}
                name={event.player.name}
                photos={photos}
              />
            )}
            <div className="min-w-0">
              <p className="font-semibold text-primary">
                {substitution
                  ? (
                    <>
                      <PlayerLink
                        playerId={event.assist.id}
                        name={event.assist.name ?? "Unknown player"}
                      />{" "}
                      <span className="text-green-600">IN</span> -{" "}
                      <PlayerLink
                        playerId={event.player.id}
                        name={event.player.name ?? "Unknown player"}
                      />{" "}
                      <span className="text-red-600">OUT</span>
                    </>
                  )
                  : (
                    <PlayerLink
                      playerId={event.player.id}
                      name={event.player.name ?? event.detail}
                    />
                  )}
              </p>
              <p className="flex flex-wrap items-center gap-x-1 text-sm text-secondary">
                <span className={colorClass}>{label}</span>
                {goal && score ? (
                  <span>
                    · {homeTeamName} {score.home} - {score.away} {awayTeamName}
                  </span>
                ) : (
                  <span>· {event.team.name}</span>
                )}
                {goal && event.assist.name ? (
                  <span>
                    · Assist:{" "}
                    <PlayerLink
                      playerId={event.assist.id}
                      name={event.assist.name}
                    />
                  </span>
                ) : null}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
