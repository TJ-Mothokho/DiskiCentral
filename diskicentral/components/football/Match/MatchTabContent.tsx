import type { Fixture } from "@/api/types/fixtures.response";
import type { FixtureEvent } from "@/api/types/events.response";
import type { FixtureTeamStatistics } from "@/api/types/fixtures-statistics.response";
import type { TeamLineup } from "@/api/types/lineups.response";
import type { FixturePlayerStatistics } from "@/api/types/players-statistics.response";
import type { StandingRow } from "@/api/types/standings.response";
import type { Prediction } from "@/api/types/predictions.response";
import { MatchHeadToHead } from "./MatchHeadToHead";
import { MatchLeagueTable } from "./MatchLeagueTable";
import { MatchLineups } from "./MatchLineups";
import { MatchOverview } from "./MatchOverview";
import { MatchPreMatchOverview } from "./MatchPreMatchOverview";
import { MatchPredictions } from "./MatchPredictions";
import { MatchStatistics } from "./MatchStatistics";
import type { MatchTab } from "./MatchNavigation";

export function MatchTabContent({
  activeTab,
  fixture,
  events,
  statistics,
  lineups,
  players,
  meetings,
  standings,
  tableAvailable,
  preMatch,
  predictionsAvailable,
  prediction,
  competitionType,
}: {
  activeTab: MatchTab;
  fixture: Fixture;
  events: FixtureEvent[];
  statistics: FixtureTeamStatistics[];
  lineups: TeamLineup[];
  players: FixturePlayerStatistics[];
  meetings: Fixture[];
  standings: StandingRow[];
  tableAvailable: boolean;
  preMatch: boolean;
  predictionsAvailable: boolean;
  prediction: Prediction | null;
  competitionType?: string;
}) {
  if (activeTab === "Table") {
    return <MatchLeagueTable fixture={fixture} rows={standings} />;
  }
  if (preMatch && activeTab === "Overview") {
    return (
      <MatchPreMatchOverview
        fixture={fixture}
        prediction={prediction}
        standings={standings}
        tableAvailable={tableAvailable}
        meetings={meetings}
        showPrediction={predictionsAvailable}
      />
    );
  }
  if (predictionsAvailable && activeTab === "Predictions") {
    return (
      <MatchPredictions
        fixture={fixture}
        prediction={prediction}
        competitionType={competitionType}
      />
    );
  }
  if (activeTab === "Lineups") {
    return <MatchLineups lineups={lineups} upcoming={preMatch} />;
  }
  if (activeTab === "Stats") {
    return (
      <MatchStatistics
        fixture={fixture}
        statistics={statistics}
        mode="full"
      />
    );
  }
  if (activeTab === "H2H") return (
    <MatchHeadToHead
      fixture={fixture}
      meetings={meetings}
    />
  );

  return (
    <MatchOverview
      fixture={fixture}
      events={events}
      statistics={statistics}
      players={players}
    />
  );
}
