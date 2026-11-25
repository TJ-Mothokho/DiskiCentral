import { describe, expect, it } from "vitest";
import {
  formatGoalLine,
  parsePredictionPercent,
} from "./MatchPredictionSummary";

describe("prediction display helpers", () => {
  it("parses only valid percentage values", () => {
    expect(parsePredictionPercent("45%")).toBe(45);
    expect(parsePredictionPercent("32.5")).toBe(32.5);
    expect(parsePredictionPercent("101%")).toBeNull();
    expect(parsePredictionPercent("unavailable")).toBeNull();
    expect(parsePredictionPercent(null)).toBeNull();
  });

  it("interprets negative goal lines as under and positive lines as over", () => {
    expect(formatGoalLine("-3.5")).toBe("Under 3.5");
    expect(formatGoalLine("2.5")).toBe("Over 2.5");
    expect(formatGoalLine("0")).toBeNull();
    expect(formatGoalLine("unknown")).toBeNull();
  });
});
