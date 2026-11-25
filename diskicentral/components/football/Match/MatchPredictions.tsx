import type {
  FixtureTeamPrediction,
  Prediction,
  PredictionHomeAwayNumbers,
  PredictionMinuteBreakdown,
  PredictionRecord,
} from "@/api/types/predictions.response";
import type { Fixture } from "@/api/types/fixtures.response";
import { EmptyState, SectionHeading } from "@/components/football/Primitives";
import { MatchPredictionSummary, parsePredictionPercent } from "./MatchPredictionSummary";

const comparisonLabels: Array<[string, string]> = [
  ["form", "Form"],
  ["att", "Attack"],
  ["def", "Defence"],
  ["poisson_distribution", "Poisson comparison"],
  ["h2h", "Head-to-head"],
  ["goals", "Goals"],
  ["total", "Overall comparison"],
];

export function MatchPredictions({
  fixture,
  prediction,
  competitionType,
}: {
  fixture: Fixture;
  prediction: Prediction | null;
  competitionType?: string;
}) {
  if (!prediction) {
    return (
      <section>
        <SectionHeading eyebrow="Before kick-off" title="Match predictions" />
        <EmptyState
          title="Predictions unavailable"
          message="The provider has not returned predictions and team analysis for this fixture."
        />
      </section>
    );
  }

  const teamComparisons = comparisonLabels.flatMap(([key, label]) => {
    const value = prediction.comparison?.[key];
    const hasValue = [value?.home, value?.away].some(
      (percentage) =>
        typeof percentage === "string" && percentage.trim().length > 0,
    );
    return value && hasValue
      ? [{ key, label, home: value.home, away: value.away }]
      : [];
  });
  const teams = [
    { prediction: prediction.teams.home, side: "home" as const },
    { prediction: prediction.teams.away, side: "away" as const },
  ];
  const hasRecentForm = teams.some(({ prediction: team }) => {
    const recent = team.last_5;
    return Boolean(
      recent &&
        [
          recent.form,
          recent.att,
          recent.def,
          recent.goals?.for?.total,
          recent.goals?.for?.average,
          recent.goals?.against?.total,
          recent.goals?.against?.average,
        ].some((value) => value !== null && value !== undefined && value !== ""),
    );
  });
  const hasSeasonData = teams.some(
    ({ prediction: team }) =>
      team.league && Object.keys(team.league).length > 0,
  );
  const homeScoring = prediction.teams.home.league?.goals?.for?.minute;
  const awayScoring = prediction.teams.away.league?.goals?.for?.minute;
  const homeConceding = prediction.teams.home.league?.goals?.against?.minute;
  const awayConceding = prediction.teams.away.league?.goals?.against?.minute;
  const competitionKind = competitionType?.toLowerCase();

  return (
    <div className="space-y-8">
      <section>
        <SectionHeading eyebrow="Before kick-off" title="Match predictions" />
        <MatchPredictionSummary fixture={fixture} prediction={prediction} />
      </section>

      {teamComparisons.length > 0 && (
        <section>
          <SectionHeading
            eyebrow="Team comparison"
            title="How the teams compare"
            description="Comparative indicators from the prediction provider, not match-winning probabilities."
          />
          <div className="detail-panel">
            <div className="mb-5 grid grid-cols-[1fr_auto_1fr] gap-3 text-xs font-semibold text-secondary">
              <span className="truncate">{fixture.teams.home.name}</span>
              <span>Metric</span>
              <span className="truncate text-right">{fixture.teams.away.name}</span>
            </div>
            <div className="space-y-5">
              {teamComparisons.map((item) => (
                <TeamComparisonRow
                  key={item.key}
                  label={item.label}
                  home={item.home}
                  away={item.away}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {hasRecentForm && (
        <section>
          <SectionHeading
            eyebrow="Recent results"
            title="Last five matches"
            description="Recent form and goal output from each team's latest available matches."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {teams.map(({ prediction: team }) => (
              <RecentFormCard key={team.id} team={team} />
            ))}
          </div>
        </section>
      )}

      {hasSeasonData && (
        <section>
          <SectionHeading
            eyebrow={
              competitionKind === "cup"
                ? "League-season background"
                : competitionKind === "league"
                  ? "League season"
                  : "Team season context"
            }
            title="Season performance"
            description={
              competitionKind === "cup"
                ? "These are league-season records, not cup competition records."
                : competitionKind === "league"
                  ? `${prediction.league.name} · ${prediction.league.season}`
                  : "Historical team-season statistics returned by the prediction provider."
            }
          />
          <div className="grid gap-4 md:grid-cols-2">
            {teams.map(({ prediction: team, side }) => (
              <SeasonPerformanceCard
                key={team.id}
                team={team}
                fallbackLogo={side === "home" ? fixture.teams.home.logo : fixture.teams.away.logo}
              />
            ))}
          </div>
        </section>
      )}

          {(hasGoalTiming(homeScoring) ||
            hasGoalTiming(awayScoring) ||
            hasGoalTiming(homeConceding) ||
            hasGoalTiming(awayConceding)) && (
        <section>
          <SectionHeading
            eyebrow="Goal trends"
            title="When the teams score and concede"
            description="Historical goal timing is context only and does not guarantee future outcomes."
          />
          <div className="grid gap-4 lg:grid-cols-2">
            <GoalTimingSection
              title="Goals scored"
              homeName={fixture.teams.home.name}
              awayName={fixture.teams.away.name}
              home={homeScoring}
              away={awayScoring}
            />
            <GoalTimingSection
              title="Goals conceded"
              homeName={fixture.teams.home.name}
              awayName={fixture.teams.away.name}
              home={homeConceding}
              away={awayConceding}
            />
          </div>
        </section>
      )}
    </div>
  );
}

function TeamComparisonRow({
  label,
  home,
  away,
}: {
  label: string;
  home?: string | null;
  away?: string | null;
}) {
  const homeValue = parsePredictionPercent(home);
  const awayValue = parsePredictionPercent(away);
  const validBar =
    homeValue !== null &&
    awayValue !== null &&
    Math.abs(homeValue + awayValue - 100) < 0.1;

  return (
    <div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-sm">
        <span className="font-mono font-semibold text-primary">
          {homeValue === null ? "—" : home}
        </span>
        <span className="text-center text-xs font-semibold text-secondary">
          {label}
        </span>
        <span className="text-right font-mono font-semibold text-primary">
          {awayValue === null ? "—" : away}
        </span>
      </div>
      {validBar && (
        <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-primary/8">
          <span className="bg-accent" style={{ width: `${homeValue}%` }} />
          <span className="bg-tertiary" style={{ width: `${awayValue}%` }} />
        </div>
      )}
    </div>
  );
}

function RecentFormCard({ team }: { team: FixtureTeamPrediction }) {
  const lastFive = team.last_5;
  if (!lastFive) return null;
  const form = (lastFive.form ?? "").toUpperCase().match(/[WDL]/g) ?? [];
  const metrics = [
    ["Attack", lastFive.att],
    ["Defence", lastFive.def],
    ["Goals scored", goalOutput(lastFive.goals?.for?.total, lastFive.goals?.for?.average)],
    ["Goals conceded", goalOutput(lastFive.goals?.against?.total, lastFive.goals?.against?.average)],
  ].filter((entry): entry is [string, string] => typeof entry[1] === "string" && entry[1] !== "");

  return (
    <div className="detail-panel">
      <TeamTitle team={team} />
      {form.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-semibold text-secondary">Recent results</span>
            <span className="text-xs text-secondary">{form.length} matches</span>
          </div>
          <FormIndicators form={form} />
        </div>
      )}
      {metrics.length > 0 && (
        <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-primary/10 pt-4">
          {metrics.map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs text-secondary">{label}</dt>
              <dd className="mt-1 text-sm font-semibold text-primary">{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

function SeasonPerformanceCard({
  team,
  fallbackLogo,
}: {
  team: FixtureTeamPrediction;
  fallbackLogo: string;
}) {
  const league = team.league;
  if (!league) return null;
  const played = league.fixtures?.played;
  const wins = league.fixtures?.wins;
  const draws = league.fixtures?.draws;
  const losses = league.fixtures?.loses;
  const goalsFor = league.goals?.for;
  const goalsAgainst = league.goals?.against;
  const candidateMetrics: Array<[string, string | null | undefined]> = [
    ["Matches played", displayNumber(played?.total)],
    ["Wins", displayNumber(wins?.total)],
    ["Draws", displayNumber(draws?.total)],
    ["Losses", displayNumber(losses?.total)],
    ["Goals scored", goalOutput(goalsFor?.total?.total, goalsFor?.average?.total)],
    ["Goals conceded", goalOutput(goalsAgainst?.total?.total, goalsAgainst?.average?.total)],
    ["Clean sheets", displayNumber(league.clean_sheet?.total)],
    ["Failed to score", displayNumber(league.failed_to_score?.total)],
    ["Penalties scored", predictionRecord(league.penalty?.scored)],
    ["Penalties missed", predictionRecord(league.penalty?.missed)],
    ["Yellow cards", displayNumber(minuteBreakdownTotal(league.cards?.yellow))],
    ["Red cards", displayNumber(minuteBreakdownTotal(league.cards?.red))],
  ];
  const metrics = candidateMetrics.filter(
    (metric): metric is [string, string] => typeof metric[1] === "string",
  );
  const homeAwayStats: Array<
    [string, PredictionHomeAwayNumbers | null | undefined]
  > = [
    ["Played", played],
    ["Wins", wins],
    ["Goals for", goalsFor?.total],
    ["Goals against", goalsAgainst?.total],
  ];
  const homeAwayAvailable = homeAwayStats.some(
    ([, values]) =>
      typeof values?.home === "number" || typeof values?.away === "number",
  );
  const formations = [...(league.lineups ?? [])]
    .filter((lineup) => lineup.formation && Number.isFinite(lineup.played))
    .sort((a, b) => b.played - a.played)
    .slice(0, 3);

  if (!metrics.length && !homeAwayAvailable && formations.length === 0) return null;

  return (
    <div className="detail-panel">
      <TeamTitle team={team} fallbackLogo={fallbackLogo} />
      {league.form && (
        <div className="mt-4">
          <p className="text-xs font-semibold text-secondary">League form</p>
          <FormIndicators
            form={league.form.toUpperCase().match(/[WDL]/g) ?? []}
          />
        </div>
      )}
      {metrics.length > 0 && (
        <dl className="mt-4 grid grid-cols-2 gap-3">
          {metrics.map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs text-secondary">{label}</dt>
              <dd className="mt-1 text-sm font-semibold text-primary">{value}</dd>
            </div>
          ))}
        </dl>
      )}
      {homeAwayAvailable && (
        <div className="mt-4 border-t border-primary/10 pt-4">
          <p className="eyebrow">Home / away breakdown</p>
          <dl className="mt-3 space-y-2 text-sm">
            {homeAwayStats.map(([label, values]) =>
              typeof values?.home === "number" || typeof values?.away === "number" ? (
                <div key={label} className="flex justify-between gap-3">
                  <dt className="text-secondary">{label}</dt>
                  <dd className="font-mono text-primary">
                    {displayNumber(values?.home) ?? "—"} home ·{" "}
                    {displayNumber(values?.away) ?? "—"} away
                  </dd>
                </div>
              ) : null,
            )}
          </dl>
        </div>
      )}
      {formations.length > 0 && (
        <div className="mt-4 border-t border-primary/10 pt-4">
          <p className="eyebrow">Previously used formations</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {formations.map((lineup) => (
              <span
                key={lineup.formation}
                className="rounded-full bg-primary/5 px-3 py-1.5 text-xs text-primary"
              >
                {lineup.formation} · {lineup.played} {lineup.played === 1 ? "match" : "matches"}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function GoalTimingSection({
  title,
  homeName,
  awayName,
  home,
  away,
}: {
  title: string;
  homeName: string;
  awayName: string;
  home?: PredictionMinuteBreakdown | null;
  away?: PredictionMinuteBreakdown | null;
}) {
  const periods = ["0-15", "16-30", "31-45", "46-60", "61-75", "76-90"];
  const availablePeriods = periods.filter((period) =>
    [home?.[period], away?.[period]].some(
      (value) =>
        typeof value?.total === "number" ||
        typeof value?.percentage === "string" &&
        value.percentage.trim().length > 0,
    ),
  );
  if (!availablePeriods.length) return null;

  return (
    <div className="detail-panel">
      <h3 className="text-lg font-bold text-primary">{title}</h3>
      <div className="mt-4 grid grid-cols-[3.5rem_1fr_1fr] gap-2 text-xs font-semibold text-secondary">
        <span>Period</span>
        <span className="truncate">{homeName}</span>
        <span className="truncate text-right">{awayName}</span>
      </div>
      <div className="mt-2 divide-y divide-primary/10">
        {availablePeriods.map((period) => {
          const homeValue = home?.[period];
          const awayValue = away?.[period];
          const homeCount = homeValue?.total;
          const awayCount = awayValue?.total;
          const total = (homeCount ?? 0) + (awayCount ?? 0);
          return (
            <div key={period} className="py-3">
              <div className="grid grid-cols-[3.5rem_1fr_1fr] gap-2 text-xs">
                <span className="font-semibold text-secondary">{period}</span>
                <span className="text-primary">
                  {goalPeriodValue(homeValue?.total, homeValue?.percentage)}
                </span>
                <span className="text-right text-primary">
                  {goalPeriodValue(awayValue?.total, awayValue?.percentage)}
                </span>
              </div>
              {total > 0 && (
                <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-primary/8">
                  <span className="bg-accent" style={{ width: `${((homeCount ?? 0) / total) * 100}%` }} />
                  <span className="bg-tertiary" style={{ width: `${((awayCount ?? 0) / total) * 100}%` }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TeamTitle({
  team,
  fallbackLogo,
}: {
  team: FixtureTeamPrediction;
  fallbackLogo?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {(team.logo || fallbackLogo) && (
        <img
          src={team.logo || fallbackLogo}
          alt=""
          className="h-9 w-9 object-contain"
        />
      )}
      <h3 className="font-semibold text-primary">{team.name}</h3>
    </div>
  );
}

function FormIndicators({ form }: { form: string[] }) {
  return (
    <div className="mt-2 flex gap-2">
      {form.map((result, index) => (
        <span
          key={`${result}-${index}`}
          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
            result === "W"
              ? "bg-accent/40 text-primary"
              : result === "D"
                ? "bg-primary/8 text-secondary"
                : "bg-live/10 text-live"
          }`}
          aria-label={result === "W" ? "Win" : result === "D" ? "Draw" : "Loss"}
        >
          {result}
        </span>
      ))}
    </div>
  );
}

function displayNumber(value: number | null | undefined) {
  return typeof value === "number" && Number.isFinite(value)
    ? String(value)
    : null;
}

function goalOutput(
  total: number | null | undefined,
  average: string | null | undefined,
) {
  if (typeof total !== "number" && !average) return null;
  if (typeof total === "number" && average) return `${total} · ${average} avg`;
  return typeof total === "number" ? String(total) : `${average} avg`;
}

function predictionRecord(
  value: PredictionRecord | null | undefined,
) {
  if (!value) return null;
  if (typeof value.total === "number") {
    return value.percentage
      ? `${value.total} (${value.percentage})`
      : String(value.total);
  }
  return value.percentage?.trim() || null;
}

function hasGoalTiming(data?: PredictionMinuteBreakdown | null) {
  const periods = ["0-15", "16-30", "31-45", "46-60", "61-75", "76-90"];
  return periods.some((period) => {
    const value = data?.[period];
    return (
      typeof value?.total === "number" ||
      (typeof value?.percentage === "string" &&
        value.percentage.trim().length > 0)
    );
  });
}

function minuteBreakdownTotal(data?: PredictionMinuteBreakdown | null) {
  const values = data ? Object.values(data) : [];
  if (
    values.length === 0 ||
    values.some((value) => typeof value?.total !== "number")
  ) {
    return null;
  }
  return values.reduce((total, value) => total + (value?.total ?? 0), 0);
}

function goalPeriodValue(
  total: number | null | undefined,
  percentage: string | null | undefined,
) {
  if (total === null || total === undefined) {
    return percentage?.trim() || "—";
  }
  return percentage?.trim() ? `${total} (${percentage})` : `${total}`;
}
