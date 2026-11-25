import { describe, expect, it } from "vitest";
import type { Fixture } from "@/api/types/fixtures.response";
import { getMatchPhase } from "./football";

function fixture(status: string): Fixture {
  return {
    fixture: {
      id: 1,
      referee: null,
      timezone: "Africa/Johannesburg",
      date: "2026-11-24T14:00:00+02:00",
      timestamp: 1_795_523_600,
      periods: { first: null, second: null },
      venue: { id: null, name: null, city: null },
      status: { long: status, short: status, elapsed: null, extra: null },
    },
    league: {
      id: 1,
      name: "League",
      country: "South Africa",
      logo: "",
      flag: "",
      season: 2026,
      round: "Regular Season - 1",
    },
    teams: {
      home: { id: 10, name: "Home", logo: "", winner: null },
      away: { id: 20, name: "Away", logo: "", winner: null },
    },
    goals: { home: null, away: null },
    score: {
      halftime: { home: null, away: null },
      fulltime: { home: null, away: null },
      extratime: { home: null, away: null },
      penalty: { home: null, away: null },
    },
  };
}

describe("getMatchPhase", () => {
  it("uses explicit fixture statuses rather than kick-off time alone", () => {
    expect(getMatchPhase(fixture("NS"))).toBe("upcoming");
    expect(getMatchPhase(fixture("PST"))).toBe("postponed");
    expect(getMatchPhase(fixture("SUSP"))).toBe("other");
    expect(getMatchPhase(fixture("1H"))).toBe("live");
    expect(getMatchPhase(fixture("FT"))).toBe("completed");
  });
});
