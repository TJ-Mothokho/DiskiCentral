import type { Fixture } from "@/api/types/fixtures.response";
import type { FixtureEvent } from "@/api/types/events.response";
import type { FixtureTeamStatistics } from "@/api/types/fixtures-statistics.response";
import type { TeamLineup } from "@/api/types/lineups.response";
import type { FixturePlayerStatistics } from "@/api/types/players-statistics.response";
import { MatchHeadToHead } from "./MatchHeadToHead";
import { MatchLineups } from "./MatchLineups";
import { MatchOverview } from "./MatchOverview";
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
}: {
  activeTab: MatchTab;
  fixture: Fixture;
  events: FixtureEvent[];
  statistics: FixtureTeamStatistics[];
  lineups: TeamLineup[];
  players: FixturePlayerStatistics[];
  meetings: Fixture[];
}) {
  if (activeTab === "Lineups") return <MatchLineups lineups={lineups} />;
  if (activeTab === "Stats") {
    return (
      <MatchStatistics
        fixture={fixture}
        statistics={statistics}
        mode="full"
      />
    );
  }
  if (activeTab === "H2H") return <MatchHeadToHead meetings={meetings} />;

  return (
    <MatchOverview
      fixture={fixture}
      events={events}
      statistics={statistics}
      players={players}
    />
  );
}
