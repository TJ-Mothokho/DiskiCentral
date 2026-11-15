"use client";

import Link from "next/link";
import type { CountryGroup } from "./leagueFilters";

export default function LeagueResults({
  groups,
  hasFilters,
}: {
  groups: CountryGroup[];
  hasFilters: boolean;
}) {
  return (
    <div aria-live="polite">
      {groups.length === 0 ? (
        <p className="rounded-2xl border border-primary/10 bg-surface p-6 text-secondary">
          {hasFilters ? "No leagues match these filters." : "No leagues found."}
        </p>
      ) : (
        <div className="divide-y divide-primary/10">
          {groups.map(({ country, leagues }) => (
            <details key={country} className="py-3">
              <summary className="cursor-pointer text-[22px] font-medium text-primary">
                {country}{" "}
                <span className="text-[10px] font-medium text-secondary">
                  ({leagues.length})
                </span>
              </summary>
              <ul className="mt-2 space-y-2 pl-5">
                {leagues.map(({ league }) => (
                  <li key={league.id}>
                    <Link
                      href={`/leagues/${league.id}`}
                      className="text-primary underline-offset-2 hover:underline"
                    >
                      {league.name}
                    </Link>
                    <span className="ml-2 text-secondary">{league.type}</span>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
