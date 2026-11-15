import type { Fixture } from "@/api/types/fixtures.response";
import { EmptyState, SectionHeading } from "@/components/football/Primitives";
import { scoreLabel } from "@/lib/football";

export function MatchHeadToHead({ meetings }: { meetings: Fixture[] }) {
  return (
    <section>
      <SectionHeading eyebrow="Head to head" title="Recent meetings" />
      {meetings.length ? (
        <div className="detail-panel">
          <div className="divide-y divide-primary/10">
            {meetings.map((meeting) => (
              <div
                key={meeting.fixture.id}
                className="flex justify-between gap-4 py-3 text-sm first:pt-0 last:pb-0"
              >
                <span className="truncate text-secondary">
                  {meeting.teams.home.name} v {meeting.teams.away.name}
                </span>
                <strong className="font-mono text-primary">
                  {scoreLabel(meeting)}
                </strong>
              </div>
            ))}
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
