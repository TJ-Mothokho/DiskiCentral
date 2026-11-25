import { describe, expect, it } from "vitest";
import type { Fixture } from "@/api/types/fixtures.response";
import { getFixtureResult } from "./MatchScoreBreakdown";

function fixture(
  goals: { home: number | null; away: number | null },
  extratime: { home: number | null; away: number | null } = {
    home: null,
    away: null,
  },
  penalty: { home: number | null; away: number | null } = {
    home: null,
    away: null,
  },
): Fixture {
  return {
    fixture: {
      id: 1,
      referee: null,
      timezone: "UTC",
      date: "2026-11-24T12:00:00Z",
      timestamp: 1_795_521_600,
      periods: { first: null, second: null },
      venue: { id: null, name: null, city: null },
      status: { long: "Full Time", short: "FT", elapsed: null, extra: null },
    },
    league: {
      id: 1,
      name: "Cup",
      country: "",
      logo: "",
      flag: "",
      season: 2026,
      round: "Final",
    },
    teams: {
      home: { id: 10, name: "Home", logo: "", winner: null },
      away: { id: 20, name: "Away", logo: "", winner: null },
    },
    goals,
    score: {
      halftime: { home: null, away: null },
      fulltime: { home: null, away: null },
      extratime,
      penalty,
    },
  };
}

describe("getFixtureResult", () => {
  it("uses the actual shootout score to resolve a level match", () => {
    expect(
      getFixtureResult(
        fixture(
          { home: 1, away: 1 },
          { home: 1, away: 1 },
          { home: 4, away: 3 },
        ),
      ),
    ).toEqual({ homeTeamWon: true, draw: false });
  });

  it("uses final match goals for a regular-time draw", () => {
    expect(getFixtureResult(fixture({ home: 0, away: 0 }))).toEqual({
      homeTeamWon: false,
      draw: true,
    });
  });
});
