import type { Fixture } from "@/api/types/fixtures.response";
import type { FixtureEvent } from "@/api/types/events.response";
import type { FixtureTeamStatistics } from "@/api/types/fixtures-statistics.response";
import type { FixturePlayerStatistics } from "@/api/types/players-statistics.response";
import { MatchEvents } from "./MatchEvents";
import { MatchPlayerRatings } from "./MatchPlayerRatings";
import { MatchStatistics } from "./MatchStatistics";

export function MatchOverview({
  fixture,
  events,
  statistics,
  players,
}: {
  fixture: Fixture;
  events: FixtureEvent[];
  statistics: FixtureTeamStatistics[];
  players: FixturePlayerStatistics[];
}) {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="eyebrow">Match timeline</h2>
        <h3 className="mb-4 mt-1 text-2xl font-bold text-primary">
          What happened
        </h3>
        <MatchEvents
          events={events}
          players={players}
          homeTeamId={fixture.teams.home.id}
          awayTeamId={fixture.teams.away.id}
          homeTeamName={fixture.teams.home.name}
          awayTeamName={fixture.teams.away.name}
        />
      </section>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,.7fr)]">
        <MatchStatistics
          fixture={fixture}
          statistics={statistics}
          mode="overview"
        />
        <MatchPlayerRatings players={players} />
      </div>
    </div>
  );
}
