import type { Fixture } from "@/api/types/fixtures.response";
import type { Prediction } from "@/api/types/predictions.response";
import { EmptyState } from "@/components/football/Primitives";

export function parsePredictionPercent(value: string | null | undefined) {
  if (!value) return null;
  const match = value.trim().match(/^(\d+(?:\.\d+)?)\s*%?$/);
  if (!match) return null;
  const percentage = Number(match[1]);
  return percentage >= 0 && percentage <= 100 ? percentage : null;
}

export function formatGoalLine(value: string | null | undefined) {
  if (!value?.trim()) return null;
  const line = value.trim();
  const numeric = Number(line);
  if (!Number.isFinite(numeric) || numeric === 0) return null;
  const mark = line.replace(/^[+-]/, "");
  return `${numeric < 0 ? "Under" : "Over"} ${mark}`;
}

export function MatchPredictionSummary({
  fixture,
  prediction,
  compact = false,
}: {
  fixture: Fixture;
  prediction: Prediction | null;
  compact?: boolean;
}) {
  if (!prediction) {
    return compact ? (
      <div className="detail-panel">
        <p className="eyebrow">Prediction outlook</p>
        <p className="mt-2 text-sm text-secondary">
          Prediction information is not available at the moment.
        </p>
      </div>
    ) : (
      <EmptyState
        title="Predictions unavailable"
        message="The provider has not returned predictions for this fixture."
      />
    );
  }

  const outcome = prediction.predictions;
  const percentages = [
    { key: "home", label: fixture.teams.home.name, raw: outcome.percent?.home },
    { key: "draw", label: "Draw", raw: outcome.percent?.draw },
    { key: "away", label: fixture.teams.away.name, raw: outcome.percent?.away },
  ].map((item) => ({
    ...item,
    value: parsePredictionPercent(item.raw),
  }));
  const hasDistribution =
    percentages.every((item) => item.value !== null) &&
    Math.abs(
      percentages.reduce((total, item) => total + (item.value ?? 0), 0) - 100,
    ) < 0.1;
  const winner =
    outcome.winner?.id === fixture.teams.home.id
      ? fixture.teams.home.name
      : outcome.winner?.id === fixture.teams.away.id
        ? fixture.teams.away.name
        : outcome.winner?.name;
  const totalGoals = formatGoalLine(outcome.under_over);
  const homeGoals = formatGoalLine(outcome.goals?.home);
  const awayGoals = formatGoalLine(outcome.goals?.away);

  return (
    <div className="detail-panel">
      <p className="eyebrow">Prediction outlook</p>
      <h2 className="mt-2 text-xl font-bold text-primary">
        {winner ? `Predicted outcome: ${winner}` : "Predicted outcome"}
      </h2>
      {outcome.winner?.comment && (
        <p className="mt-2 text-sm text-secondary">{outcome.winner.comment}</p>
      )}
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {typeof outcome.win_or_draw === "boolean" && (
          <span className="rounded-full bg-primary/5 px-3 py-1.5 font-semibold text-primary">
            {outcome.win_or_draw ? "Win or draw selection" : "Win-only selection"}
          </span>
        )}
        {outcome.advice && !compact && (
          <span className="rounded-full bg-primary/5 px-3 py-1.5 text-secondary">
            {outcome.advice}
          </span>
        )}
      </div>
      {percentages.some((item) => item.value !== null) && (
        <div className="mt-5">
          <div className="grid grid-cols-3 gap-2 text-center">
            {percentages.map((item) => (
              <div key={item.key}>
                <strong className="block font-mono text-lg text-primary">
                  {item.value === null ? "—" : item.raw}
                </strong>
                <span className="mt-1 block truncate text-xs text-secondary">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          {hasDistribution && (
            <div
              className="mt-3 flex h-3 overflow-hidden rounded-full bg-primary/8"
              aria-label={`Model probabilities: ${percentages.map((item) => `${item.label} ${item.raw}`).join(", ")}`}
            >
              {percentages.map((item, index) => (
                <span
                  key={item.key}
                  className={
                    index === 0
                      ? "bg-accent"
                      : index === 1
                        ? "bg-secondary/40"
                        : "bg-tertiary"
                  }
                  style={{ width: `${item.value}%` }}
                />
              ))}
            </div>
          )}
        </div>
      )}
      {(totalGoals || (!compact && (homeGoals || awayGoals))) && (
        <div className="mt-5 border-t border-primary/10 pt-4">
          <p className="eyebrow">Goal outlook</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-primary">
            {totalGoals && <span>Total goals: {totalGoals}</span>}
            {!compact && homeGoals && (
              <span>{fixture.teams.home.name}: {homeGoals}</span>
            )}
            {!compact && awayGoals && (
              <span>{fixture.teams.away.name}: {awayGoals}</span>
            )}
          </div>
        </div>
      )}
      <p className="mt-4 text-xs text-secondary">
        These are model predictions, not guaranteed outcomes.
      </p>
    </div>
  );
}
