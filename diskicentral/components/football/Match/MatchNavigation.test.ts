import { describe, expect, it } from "vitest";
import { getMatchTab } from "./MatchNavigation";

describe("getMatchTab", () => {
  it("limits scheduled and postponed matches to their available tabs", () => {
    expect(getMatchTab("stats", true, true, true)).toBe("Overview");
    expect(getMatchTab("h2h", true, true, true)).toBe("Overview");
    expect(getMatchTab("predictions", true, true, false)).toBe("Overview");
    expect(getMatchTab("predictions", true, true, true)).toBe("Predictions");
  });

  it("preserves live and completed match tabs", () => {
    expect(getMatchTab("stats", true, false, false)).toBe("Stats");
    expect(getMatchTab("h2h", true, false, false)).toBe("H2H");
    expect(getMatchTab("predictions", true, false, false)).toBe("Overview");
  });
});
