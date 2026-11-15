import type { FixtureEvent } from "@/api/types/events.response";

export type EventScore = { home: number; away: number } | null;

export function isSubstitution(event: FixtureEvent) {
  const type = event.type.toLowerCase();
  return type === "subst" || type === "substitution";
}

export function getEventLabel(event: FixtureEvent) {
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

export function getEventScores(
  events: FixtureEvent[],
  homeTeamId: number,
  awayTeamId: number,
): EventScore[] {
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
