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
  awayEvent,
  homeTeamName,
  awayTeamName,
  playerPhoto,
}: {
  event: FixtureEvent;
  score: EventScore;
  awayEvent: boolean;
  homeTeamName: string;
  awayTeamName: string;
  playerPhoto?: string;
}) {
  const substitution = isSubstitution(event);
  const goal = event.type.toLowerCase() === "goal";
  const { label, colorClass } = getEventLabel(event);

  return (
    <div className="grid min-h-16 grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] border-b border-primary/10 last:border-b-0">
      <div className={`flex items-start gap-2 py-3 pr-2 sm:gap-3 sm:py-4 sm:pr-3 ${awayEvent ? "invisible" : ""}`}>
        {!awayEvent && (
          <>
            <span className="w-7 shrink-0 pt-1 text-right font-mono text-xs font-semibold text-primary sm:w-10 sm:text-sm">
              {event.time.elapsed}
              {event.time.extra ? `+${event.time.extra}` : ""}′
            </span>
            <MatchEventAvatar
              src={substitution ? event.team.logo : playerPhoto}
              name={event.player.name}
              team={substitution}
            />
            <EventDetails
              event={event}
              score={score}
              homeTeamName={homeTeamName}
              awayTeamName={awayTeamName}
              goal={goal}
              substitution={substitution}
              label={label}
              colorClass={colorClass}
              reverse={false}
            />
          </>
        )}
      </div>
      <div className="border-l border-primary/15" />
      <div className={`flex items-start gap-2 py-3 pl-2 sm:gap-3 sm:py-4 sm:pl-3 ${awayEvent ? "" : "invisible"}`}>
        {awayEvent && (
          <>
            <EventDetails
              event={event}
              score={score}
              homeTeamName={homeTeamName}
              awayTeamName={awayTeamName}
              goal={goal}
              substitution={substitution}
              label={label}
              colorClass={colorClass}
              reverse
            />
            <MatchEventAvatar
              src={substitution ? event.team.logo : playerPhoto}
              name={event.player.name}
              team={substitution}
            />
            <span className="w-7 shrink-0 pt-1 text-right font-mono text-xs font-semibold text-primary sm:w-10 sm:text-sm">
              {event.time.elapsed}
              {event.time.extra ? `+${event.time.extra}` : ""}′
            </span>
          </>
        )}
      </div>
    </div>
  );
}

function EventDetails({
  event,
  score,
  homeTeamName,
  awayTeamName,
  goal,
  substitution,
  label,
  colorClass,
  reverse,
}: {
  event: FixtureEvent;
  score: EventScore;
  homeTeamName: string;
  awayTeamName: string;
  goal: boolean;
  substitution: boolean;
  label: string;
  colorClass: string;
  reverse: boolean;
}) {
  return (
      <div className={`min-w-0 flex-1 ${reverse ? "text-right" : ""}`}>
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
        <p className={`flex flex-wrap items-center gap-x-1 text-sm text-secondary ${reverse ? "justify-end" : ""}`}>
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
  );
}
