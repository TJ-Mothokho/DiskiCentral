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

export function matchState(fixture: Fixture) {
  const status = fixture.fixture.status;
  if (["LIVE", "1H", "2H", "HT", "ET", "P", "BT"].includes(status.short)) {
    return status.elapsed ? `LIVE ${status.elapsed}′` : "LIVE";
  }
  if (["FT", "AET", "PEN"].includes(status.short)) return "Full time";
  if (["CANC", "ABD", "AWD", "WO"].includes(status.short)) return status.long;
  return formatMatchTime(fixture.fixture.date);
}

export function isLiveFixture(fixture: Fixture) {
  return ["LIVE", "1H", "2H", "HT", "ET", "P", "BT"].includes(
    fixture.fixture.status.short,
  );
}

export function isFinishedFixture(fixture: Fixture) {
  return ["FT", "AET", "PEN"].includes(fixture.fixture.status.short);
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
