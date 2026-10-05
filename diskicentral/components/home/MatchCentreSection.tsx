import MatchCard from "@/components/match/MatchCard";
import { Fixture } from "@/types/fixture";

interface MatchCentreSectionProps {
  fixtures: Fixture[];
  results: Fixture[];
  darkMode: boolean;
}

export default function MatchCentreSection({
  fixtures,
  results,
  darkMode,
}: MatchCentreSectionProps) {
  const upcomingMatches = fixtures.map((fixture) => ({
    id: fixture.id,
    competition: fixture.competitionName ?? "Football",
    homeTeam: fixture.homeTeamName ?? "Home team",
    awayTeam: fixture.awayTeamName ?? "Away team",
    date: fixture.kickoff,
    time: new Date(fixture.kickoff).toLocaleTimeString("en-ZA", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    venue: fixture.venue ?? undefined,
    status: "upcoming",
  }));
  const resultMatches = results.map((result) => ({
    id: result.id,
    competition: result.competitionName ?? "Football",
    homeTeam: result.homeTeamName ?? "Home team",
    awayTeam: result.awayTeamName ?? "Away team",
    date: result.kickoff,
    venue: result.venue ?? undefined,
    homeScore: result.homeScore ?? undefined,
    awayScore: result.awayScore ?? undefined,
    status: "completed",
  }));

  return (
    <section
      className={`border-y py-8 ${darkMode ? "border-gray-800 bg-gray-950" : "border-gray-100 bg-gray-50"}`}>
      <div className="max-w-[1440px] mx-auto px-4">
        <h2
          className={`font-display font-bold text-2xl uppercase tracking-wide mb-5 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Match Centre
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3
              className={`text-sm font-semibold uppercase tracking-widest mb-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Upcoming Fixtures
            </h3>
            <div className="space-y-3">
              {upcomingMatches.map((match) => (
                <MatchCard key={match.id} match={match} darkMode={darkMode} />
              ))}
            </div>
          </div>
          <div>
            <h3
              className={`text-sm font-semibold uppercase tracking-widest mb-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Recent Results
            </h3>
            <div className="space-y-3">
              {resultMatches.map((match) => (
                <MatchCard key={match.id} match={match} darkMode={darkMode} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
