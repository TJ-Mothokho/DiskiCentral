import type { Fixture } from "@/api/types/fixtures.response";
import Link from "next/link";
import { EmptyState, SectionHeading } from "@/components/football/Primitives";
import { scoreLabel } from "@/lib/football";
import { formatMatchDate } from "@/lib/football";
import { getFixtureResult, MatchScoreBreakdown } from "./MatchScoreBreakdown";

export function MatchHeadToHead({
  fixture,
  meetings,
  compact = false,
}: {
  fixture: Fixture;
  meetings: Fixture[];
  compact?: boolean;
}) {
  const summary = meetings.reduce(
    (totals, meeting) => {
      const result = getFixtureResult(meeting);
      if (!result) return totals;
      if (result.draw) {
        totals.draws += 1;
      } else {
        const meetingWinner = result.homeTeamWon
          ? meeting.teams.home.id
          : meeting.teams.away.id;
        if (meetingWinner === fixture.teams.home.id) totals.homeWins += 1;
        else if (meetingWinner === fixture.teams.away.id) totals.awayWins += 1;
      }
      return totals;
    },
    { homeWins: 0, draws: 0, awayWins: 0 },
  );
  const total = summary.homeWins + summary.draws + summary.awayWins;
  return (
    <section>
      <SectionHeading
        eyebrow="Head to head"
        title={compact ? "Recent meetings" : "Historical results"}
      />
      {total > 0 ? (
        <div className={`detail-panel ${compact ? "mb-4 p-4" : "mb-6"}`}>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <strong className="block font-mono text-2xl text-primary">{summary.homeWins}</strong>
              <span className="mt-1 block text-xs font-semibold text-secondary">Home wins</span>
            </div>
            <div>
              <strong className="block font-mono text-2xl text-primary">{summary.draws}</strong>
              <span className="mt-1 block text-xs font-semibold text-secondary">Draws</span>
            </div>
            <div>
              <strong className="block font-mono text-2xl text-primary">{summary.awayWins}</strong>
              <span className="mt-1 block text-xs font-semibold text-secondary">Away wins</span>
            </div>
          </div>
          <div
            className="mt-5 flex h-3 overflow-hidden rounded-full bg-primary/8"
            aria-label={`${summary.homeWins} home wins, ${summary.draws} draws, ${summary.awayWins} away wins`}
          >
            <span className="bg-accent" style={{ width: `${(summary.homeWins / total) * 100}%` }} />
            <span className="bg-secondary/40" style={{ width: `${(summary.draws / total) * 100}%` }} />
            <span className="bg-tertiary" style={{ width: `${(summary.awayWins / total) * 100}%` }} />
          </div>
        </div>
      ) : !compact ? (
        <EmptyState
          title="No historical results"
          message="No completed head-to-head results were returned."
        />
      ) : null}
      {!compact && (
        <h3 className="mb-4 text-lg font-bold text-primary">Recent meetings</h3>
      )}
      {meetings.length ? (
        <div className="detail-panel">
          <div className="divide-y divide-primary/10">
            {meetings.slice(0, compact ? 3 : meetings.length).map((meeting) => {
              const content = (
                <>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <img src={meeting.teams.home.logo} alt="" className="h-7 w-7 object-contain" />
                      <span className="truncate text-secondary">{meeting.teams.home.name}</span>
                      <span className="text-secondary">v</span>
                      <span className="truncate text-secondary">{meeting.teams.away.name}</span>
                      <img src={meeting.teams.away.logo} alt="" className="h-7 w-7 object-contain" />
                    </div>
                    <p className="mt-2 text-xs text-secondary">
                      {meeting.league.name} · {formatMatchDate(meeting.fixture.date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <strong className="font-mono text-primary">{scoreLabel(meeting)}</strong>
                    <MatchScoreBreakdown fixture={meeting} />
                  </div>
                </>
              );
              return meeting.fixture.id ? (
                <Link
                  key={meeting.fixture.id}
                  href={`/matches/${meeting.fixture.id}`}
                  className="flex items-center justify-between gap-4 py-4 transition-opacity hover:opacity-70 first:pt-0 last:pb-0"
                >
                  {content}
                </Link>
              ) : (
                <div key={`${meeting.fixture.date}-${meeting.teams.home.id}`} className="flex items-center justify-between gap-4 py-4">
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <EmptyState
          title="No recent meetings"
          message="No recent head-to-head matches were returned."
        />
      )}
    </section>
  );
}
