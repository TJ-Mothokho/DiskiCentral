import type { Fixture } from "@/api/types/fixtures.response";

export function MatchScoreBreakdown({
  fixture,
  onDark = false,
}: {
  fixture: Fixture;
  onDark?: boolean;
}) {
  const fulltime = scoreText(
    fixture.score.fulltime.home,
    fixture.score.fulltime.away,
  );
  const extratime = scoreText(
    fixture.score.extratime.home,
    fixture.score.extratime.away,
  );
  const penalties = scoreText(
    fixture.score.penalty.home,
    fixture.score.penalty.away,
  );
  if (!extratime && !penalties) return null;

  return (
    <p className={`mt-2 text-xs ${onDark ? "text-surface/70" : "text-secondary"}`}>
      {fulltime && <span>After 90′ {fulltime}</span>}
      {extratime && <span>{fulltime ? " · " : ""}After extra time {extratime}</span>}
      {penalties && <span>{fulltime || extratime ? " · " : ""}Penalties {penalties}</span>}
    </p>
  );
}

export function getFixtureResult(fixture: Fixture) {
  const penaltyResult = compareScores(
    fixture.score.penalty.home,
    fixture.score.penalty.away,
  );
  if (penaltyResult !== null) {
    return {
      homeTeamWon:
        penaltyResult === 0 ? null : penaltyResult > 0,
      draw: penaltyResult === 0,
    };
  }

  const extraTimeResult = compareScores(
    fixture.score.extratime.home,
    fixture.score.extratime.away,
  );
  if (extraTimeResult !== null && extraTimeResult !== 0) {
    return { homeTeamWon: extraTimeResult > 0, draw: false };
  }

  const result = compareScores(fixture.goals.home, fixture.goals.away);
  if (result === null) return null;
  return { homeTeamWon: result > 0, draw: result === 0 };
}

function scoreText(home: number | null, away: number | null) {
  return home === null || away === null ? null : `${home}–${away}`;
}

function compareScores(home: number | null, away: number | null) {
  if (home === null || away === null) return null;
  return home - away;
}
