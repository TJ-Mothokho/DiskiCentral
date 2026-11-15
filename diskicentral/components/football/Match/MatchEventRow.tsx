import Link from "next/link";
import type { FixtureEvent } from "@/api/types/events.response";
import { MatchEventAvatar } from "./MatchEventAvatar";
import {
  getEventLabel,
  isSubstitution,
  type EventScore,
} from "./MatchEventUtils";

function EventPlayerLink({
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

export function MatchEventRow({
  event,
  score,
  homeTeamName,
  awayTeamName,
  playerPhoto,
}: {
  event: FixtureEvent;
  score: EventScore;
  homeTeamName: string;
  awayTeamName: string;
  playerPhoto?: string;
}) {
  const substitution = isSubstitution(event);
  const goal = event.type.toLowerCase() === "goal";
  const { label, colorClass } = getEventLabel(event);

  return (
    <div className="flex items-start gap-4 border-b border-primary/10 pb-4 last:border-0 last:pb-0">
      <span className="w-10 shrink-0 pt-1 font-mono text-sm font-semibold text-primary">
        {event.time.elapsed}′
      </span>
      <MatchEventAvatar
        src={substitution ? event.team.logo : playerPhoto}
        name={event.player.name}
        team={substitution}
      />
      <div className="min-w-0">
        <p className="font-semibold text-primary">
          {substitution ? (
            <>
              <EventPlayerLink
                playerId={event.assist.id}
                name={event.assist.name ?? "Unknown player"}
              />{" "}
              <span className="text-green-600">IN</span> -{" "}
              <EventPlayerLink
                playerId={event.player.id}
                name={event.player.name ?? "Unknown player"}
              />{" "}
              <span className="text-red-600">OUT</span>
            </>
          ) : (
            <EventPlayerLink
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
              <EventPlayerLink
                playerId={event.assist.id}
                name={event.assist.name}
              />
            </span>
          ) : null}
        </p>
      </div>
    </div>
  );
}
