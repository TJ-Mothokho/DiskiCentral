import { describe, expect, it } from "vitest";
import type { FixtureEvent } from "@/api/types/events.response";
import { sortEventIndexes } from "./MatchEventUtils";

function event(elapsed: number, extra: number | null = null): FixtureEvent {
  return {
    time: { elapsed, extra },
    team: { id: 1, name: "Team", logo: "" },
    player: { id: null, name: null },
    assist: { id: null, name: null },
    type: "Card",
    detail: "Yellow Card",
    comments: null,
  };
}

describe("sortEventIndexes", () => {
  it("orders stoppage-time incidents after regular time and reverses the timeline", () => {
    const events = [event(45), event(7), event(45, 2), event(90, 4)];

    expect(sortEventIndexes(events)).toEqual([1, 0, 2, 3]);
    expect(sortEventIndexes(events, true)).toEqual([3, 2, 0, 1]);
  });

  it("preserves provider order when event times are identical", () => {
    const events = [event(67, 1), event(67, 1), event(67)];

    expect(sortEventIndexes(events, true)).toEqual([0, 1, 2]);
  });
});
