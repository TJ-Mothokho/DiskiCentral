import type { Fixture } from "@/api/types/fixtures.response";
import type { Prediction } from "@/api/types/predictions.response";
import type { StandingRow } from "@/api/types/standings.response";
import { SectionHeading } from "@/components/football/Primitives";
import { formatMatchDate, formatMatchTime, formatRoundLabel, formatSeasonLabel } from "@/lib/football";
import { MatchHeadToHead } from "./MatchHeadToHead";
import { MatchPredictionSummary } from "./MatchPredictionSummary";

export function MatchPreMatchOverview({
  fixture,
  prediction,
  standings,
  tableAvailable,
  meetings,
  showPrediction,
}: {
  fixture: Fixture;
  prediction: Prediction | null;
  standings: StandingRow[];
  tableAvailable: boolean;
  meetings: Fixture[];
  showPrediction: boolean;
}) {
  const homePosition = standings.find(
    (row) => row.team.id === fixture.teams.home.id,
  );
  const awayPosition = standings.find(
    (row) => row.team.id === fixture.teams.away.id,
  );
  const timeZone = fixture.fixture.timezone || "Africa/Johannesburg";
  const kickOffDetail =
    fixture.fixture.status.short === "TBD"
      ? ["Date", formatMatchDate(fixture.fixture.date, timeZone)]
      : [
          "Kick-off",
          `${formatMatchDate(fixture.fixture.date, timeZone)} · ${formatMatchTime(fixture.fixture.date, timeZone)} (${timeZone})`,
        ];
  const fixtureDetails = [
    ["Season", formatSeasonLabel(fixture.league.season)],
    ["Round", formatRoundLabel(fixture.league.round)],
    kickOffDetail,
    ["Venue", fixture.fixture.venue.name],
    ["City", fixture.fixture.venue.city],
    ["Referee", fixture.fixture.referee?.name],
  ].filter((detail): detail is [string, string] => Boolean(detail[1]));

  return (
    <div className="space-y-8">
      <section>
        <SectionHeading eyebrow="Match details" title="Before kick-off" />
        <div className="detail-panel">
          <div className="flex items-center gap-4">
            {fixture.league.logo && (
              <img
                src={fixture.league.logo}
                alt=""
                className="h-12 w-12 object-contain"
              />
            )}
            <div>
              <h3 className="font-semibold text-primary">{fixture.league.name}</h3>
              {fixture.league.country && (
                <p className="mt-1 text-xs text-secondary">
                  {fixture.league.country}
                </p>
              )}
            </div>
          </div>
          {fixtureDetails.length > 0 && (
            <dl className="mt-5 grid gap-4 border-t border-primary/10 pt-5 sm:grid-cols-2 lg:grid-cols-3">
              {fixtureDetails.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs text-secondary">{label}</dt>
                  <dd className="mt-1 font-semibold text-primary">{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      {showPrediction && (
        <section>
          <SectionHeading eyebrow="Model outlook" title="Prediction summary" />
          <MatchPredictionSummary
            fixture={fixture}
            prediction={prediction}
            compact
          />
        </section>
      )}

      {tableAvailable && (homePosition || awayPosition) && (
        <section>
          <SectionHeading eyebrow="League standings" title="Team positions" />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                team: fixture.teams.home,
                position: homePosition?.rank,
                side: "Home",
              },
              {
                team: fixture.teams.away,
                position: awayPosition?.rank,
                side: "Away",
              },
            ]
              .filter((entry) => entry.position !== undefined)
              .map(({ team, position, side }) =>
                position === undefined ? null : (
                  <div
                    key={team.id}
                    className="detail-panel flex items-center gap-4 p-4"
                  >
                    <img
                      src={team.logo}
                      alt=""
                      className="h-10 w-10 object-contain"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="eyebrow">{side} team</p>
                      <h3 className="truncate font-semibold text-primary">
                        {team.name}
                      </h3>
                    </div>
                    <strong className="font-mono text-2xl text-primary">
                      {position}
                      <span className="text-sm">{ordinalSuffix(position)}</span>
                    </strong>
                  </div>
                ),
              )}
          </div>
        </section>
      )}

      <MatchHeadToHead
        fixture={fixture}
        meetings={meetings}
        compact
      />
    </div>
  );
}

function ordinalSuffix(position: number) {
  const lastTwoDigits = position % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return "th";
  switch (position % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
