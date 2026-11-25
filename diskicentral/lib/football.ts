import type { Fixture } from "@/api/types/fixtures.response";

export function formatMatchDate(date: string, timeZone = "Africa/Johannesburg") {
  return new Intl.DateTimeFormat("en-ZA", {
    timeZone,
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(new Date(date));
}

export function formatMatchTime(date: string, timeZone = "Africa/Johannesburg") {
  return new Intl.DateTimeFormat("en-ZA", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(date));
}

export function formatSeasonLabel(season: number) {
  if (!Number.isFinite(season)) return "";
  return `${season}-${String(season + 1).slice(-2)}`;
}

export function formatRoundLabel(round: string) {
  const matchday = round.match(/(?:matchday|round|regular season)[^\d]*(\d+)/i);
  if (matchday) return `Matchday ${matchday[1]}`;
  const number = round.match(/\d+/);
  return number ? `Matchday ${number[0]}` : round;
}

export function matchState(fixture: Fixture) {
  const status = fixture.fixture.status;
  const timeZone = fixture.fixture.timezone || "Africa/Johannesburg";
  if (["LIVE", "1H", "2H", "HT", "ET", "P", "BT"].includes(status.short)) {
    return status.elapsed ? `LIVE ${status.elapsed}′` : "LIVE";
  }
  if (["FT", "AET", "PEN"].includes(status.short)) return "Full time";
  if (["PST", "SUSP", "INT", "CANC", "ABD", "AWD", "WO"].includes(status.short)) {
    return status.long;
  }
  if (status.short === "TBD") return status.long || "Kick-off time to be confirmed";
  return formatMatchTime(fixture.fixture.date, timeZone);
}

export function isLiveFixture(fixture: Fixture) {
  return ["LIVE", "1H", "2H", "HT", "ET", "P", "BT"].includes(
    fixture.fixture.status.short,
  );
}

export function isFinishedFixture(fixture: Fixture) {
  return ["FT", "AET", "PEN"].includes(fixture.fixture.status.short);
}

export type MatchPhase =
  | "upcoming"
  | "postponed"
  | "live"
  | "completed"
  | "other";

export function getMatchPhase(fixture: Fixture): MatchPhase {
  if (isLiveFixture(fixture)) return "live";
  if (isFinishedFixture(fixture) || ["AWD", "WO"].includes(fixture.fixture.status.short)) {
    return "completed";
  }
  if (fixture.fixture.status.short === "PST") return "postponed";
  if (["NS", "TBD"].includes(fixture.fixture.status.short)) return "upcoming";
  return "other";
}

export function isUpcomingFixture(fixture: Fixture) {
  return getMatchPhase(fixture) === "upcoming";
}

export function isPreMatchFixture(fixture: Fixture) {
  const phase = getMatchPhase(fixture);
  return phase === "upcoming" || phase === "postponed";
}

export function scoreLabel(fixture: Fixture) {
  const home = fixture.goals.home;
  const away = fixture.goals.away;
  if (home === null || away === null) return "— : —";
  return `${home} : ${away}`;
}

export function safeDisplay(value: unknown, fallback = "—") {
  if (typeof value === "number" || typeof value === "string") return String(value);
  return fallback;
}

export function numericValue(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace("%", ""));
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}
