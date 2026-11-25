import Link from "next/link";
import type { Fixture } from "@/api/types/fixtures.response";
import type { StandingRow } from "@/api/types/standings.response";
import { EmptyState, SectionHeading } from "@/components/football/Primitives";

export function MatchLeagueTable({
  fixture,
  rows,
}: {
  fixture: Fixture;
  rows: StandingRow[];
}) {
  const homeTeamId = fixture.teams.home.id;
  const awayTeamId = fixture.teams.away.id;

  return (
    <section>
      <SectionHeading
        eyebrow={`${fixture.league.name} · ${fixture.league.season}`}
        title="League table"
      />
      {rows.length ? (
        <div className="detail-panel overflow-x-auto">
          <table className="data-table min-w-[760px]">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Club</th>
                <th scope="col">MP</th>
                <th scope="col">W</th>
                <th scope="col">D</th>
                <th scope="col">L</th>
                <th scope="col">GF</th>
                <th scope="col">GA</th>
                <th scope="col">GD</th>
                <th scope="col">Pts</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const isHomeTeam = row.team.id === homeTeamId;
                const isAwayTeam = row.team.id === awayTeamId;
                const highlighted = isHomeTeam || isAwayTeam;
                return (
                  <tr
                    key={`${row.group}-${row.team.id}`}
                    className={highlighted ? "bg-accent/20" : ""}
                  >
                    <td className="font-mono text-secondary">{row.rank}</td>
                    <td>
                      <Link
                        href={`/teams/${row.team.id}`}
                        className="flex min-w-48 items-center gap-3 font-semibold text-primary"
                      >
                        <img
                          src={row.team.logo}
                          alt=""
                          className="h-7 w-7 object-contain"
                        />
                        <span className="min-w-0 flex-1 truncate">
                          {row.team.name}
                        </span>
                        {isHomeTeam && (
                          <span className="text-[10px] font-bold text-secondary">HOME</span>
                        )}
                        {isAwayTeam && (
                          <span className="text-[10px] font-bold text-secondary">AWAY</span>
                        )}
                      </Link>
                    </td>
                    <td>{row.all.played}</td>
                    <td>{row.all.win}</td>
                    <td>{row.all.draw}</td>
                    <td>{row.all.lose}</td>
                    <td>{row.all.goals.for}</td>
                    <td>{row.all.goals.against}</td>
                    <td>{row.goalsDiff}</td>
                    <td className="font-semibold">{row.points}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          title="Standings unavailable"
          message="The competition has league standings, but none are currently available for this season."
        />
      )}
    </section>
  );
}
