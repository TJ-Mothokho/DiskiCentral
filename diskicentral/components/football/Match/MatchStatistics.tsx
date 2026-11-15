import type { Fixture } from "@/api/types/fixtures.response";
import type { FixtureTeamStatistics } from "@/api/types/fixtures-statistics.response";
import { EmptyState, SectionHeading } from "@/components/football/Primitives";
import { MatchBasicStats } from "./MatchBasicStats";
import { MatchStatRows } from "./MatchStatRows";
import { groupMatchStatistics } from "./MatchStatisticsUtils";

export function MatchStatistics({
  fixture,
  statistics,
  mode,
}: {
  fixture: Fixture;
  statistics: FixtureTeamStatistics[];
  mode: "overview" | "full";
}) {
  if (mode === "overview") {
    return <MatchBasicStats fixture={fixture} statistics={statistics} />;
  }

  const categories = groupMatchStatistics(statistics);
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Match intelligence"
        title="The numbers behind the game"
      />
      <MatchBasicStats fixture={fixture} statistics={statistics} />
      {categories.length ? (
        categories.map((category) => (
          <section key={category.label}>
            <h2 className="mb-3 text-lg font-bold text-primary">
              {category.label}
            </h2>
            <MatchStatRows
              rows={category.statistics}
              fixture={fixture}
              statistics={statistics}
            />
          </section>
        ))
      ) : (
        <EmptyState
          title="Statistics unavailable"
          message="This competition may not provide detailed match statistics."
        />
      )}
    </div>
  );
}
