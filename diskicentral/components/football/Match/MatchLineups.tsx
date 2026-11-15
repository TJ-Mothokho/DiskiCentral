import Link from "next/link";
import type { TeamLineup } from "@/api/types/lineups.response";
import { EmptyState, SectionHeading } from "@/components/football/Primitives";

export function MatchLineups({ lineups }: { lineups: TeamLineup[] }) {
  return (
    <section>
      <SectionHeading eyebrow="Team sheets" title="Lineups" />
      {lineups.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {lineups.map((lineup) => (
            <div key={lineup.team.id} className="detail-panel">
              <div className="flex items-center gap-3">
                <img
                  src={lineup.team.logo}
                  alt=""
                  className="h-8 w-8 object-contain"
                />
                <div>
                  <h3 className="font-semibold text-primary">
                    {lineup.team.name}
                  </h3>
                  <p className="text-xs text-secondary">
                    {lineup.formation ?? "Formation unavailable"}
                  </p>
                </div>
              </div>
              <ol className="mt-5 space-y-2 text-sm">
                {lineup.startXI.map(({ player }) => (
                  <li
                    key={player.id}
                    className="flex justify-between gap-3"
                  >
                    <Link
                      href={`/players/${player.id}`}
                      className="underline-offset-2 hover:underline"
                    >
                      {player.name}
                    </Link>
                    <span className="text-secondary">{player.pos ?? ""}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Lineups unavailable"
          message="The provider has not returned team sheets for this match."
        />
      )}
    </section>
  );
}
