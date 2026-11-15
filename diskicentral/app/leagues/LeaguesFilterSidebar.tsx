"use client";

import { Button } from "@/components/ui/Button";
import {
  ageGroups,
  continentalFilters,
  createDefaultLeagueFilters,
  hasLeagueFilters,
  type AgeGroup,
  type ContinentalFilter,
  type LeagueFilterState,
} from "./leagueFilters";

export default function LeaguesFilterSidebar({
  filters,
  onChange,
}: {
  filters: LeagueFilterState;
  onChange: (filters: LeagueFilterState) => void;
}) {
  function toggleAgeGroup(age: AgeGroup) {
    const next = new Set(filters.ageGroups);
    if (next.has(age)) next.delete(age);
    else next.add(age);
    onChange({ ...filters, ageGroups: next });
  }

  function toggleContinent(continent: ContinentalFilter) {
    const next = new Set(filters.continents);
    if (next.has(continent)) next.delete(continent);
    else next.add(continent);
    onChange({ ...filters, continents: next });
  }

  return (
    <aside
      aria-label="League filters"
      className="h-fit rounded-2xl border border-primary/10 bg-surface p-4 md:sticky md:top-4"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold">Filters</h2>
        {hasLeagueFilters(filters) && (
          <button
            type="button"
            onClick={() => onChange(createDefaultLeagueFilters())}
            className="text-xs font-medium text-secondary underline underline-offset-2 hover:text-primary"
          >
            Clear all
          </button>
        )}
      </div>

      <section
        aria-labelledby="competition-filter"
        className="border-t border-primary/10 py-4"
      >
        <h3
          id="competition-filter"
          className="mb-3 text-xs font-semibold uppercase tracking-wide text-secondary"
        >
          Competition
        </h3>
        <div className="flex flex-wrap gap-2">
          {(["League", "Cup"] as const).map((value) => (
            <Button
              key={value}
              variant="filter"
              active={filters.competitionType === value}
              onClick={() =>
                onChange({
                  ...filters,
                  competitionType:
                    filters.competitionType === value ? null : value,
                })
              }
            >
              {value === "League" ? "Leagues" : "Cups"}
            </Button>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="gender-filter"
        className="border-t border-primary/10 py-4"
      >
        <h3
          id="gender-filter"
          className="mb-3 text-xs font-semibold uppercase tracking-wide text-secondary"
        >
          Gender
        </h3>
        <div className="flex flex-wrap gap-2">
          {(["Men", "Women"] as const).map((value) => (
            <Button
              key={value}
              variant="filter"
              active={filters.gender === value}
              onClick={() =>
                onChange({
                  ...filters,
                  gender: filters.gender === value ? null : value,
                })
              }
            >
              {value}
            </Button>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="age-filter"
        className="border-t border-primary/10 py-4"
      >
        <h3
          id="age-filter"
          className="mb-3 text-xs font-semibold uppercase tracking-wide text-secondary"
        >
          Age group
        </h3>
        <div className="flex flex-wrap gap-2">
          {ageGroups.map((age) => (
            <Button
              key={age}
              variant="filter"
              active={filters.ageGroups.has(age)}
              onClick={() => toggleAgeGroup(age)}
            >
              {age}
            </Button>
          ))}
        </div>
        <p className="mt-2 text-xs text-secondary">Select one or more</p>
      </section>

      <section
        aria-labelledby="featured-filter"
        className="border-t border-primary/10 pt-4"
      >
        <h3
          id="featured-filter"
          className="mb-3 text-xs font-semibold uppercase tracking-wide text-secondary"
        >
          Featured competitions
        </h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="filter"
            active={filters.topFiveOnly}
            onClick={() =>
              onChange({ ...filters, topFiveOnly: !filters.topFiveOnly })
            }
          >
            Top 5
          </Button>
          {continentalFilters.map((continent) => (
            <Button
              key={continent}
              variant="filter"
              active={filters.continents.has(continent)}
              onClick={() => toggleContinent(continent)}
              title={
                continent === "UEFA"
                  ? "Champions League, Women's Champions League, Europa League, and Conference League"
                  : continent === "CAF"
                    ? "CAF Champions League and CAF Confederation Cup"
                    : continent === "Asia/Oceania"
                      ? "AFC Champions League, AFC Women's Champions League, AFC Challenge League, and OFC Champions League"
                      : "CONCACAF Champions League, CONMEBOL Libertadores, and CONMEBOL Sudamericana"
              }
            >
              {continent}
            </Button>
          ))}
        </div>
      </section>
    </aside>
  );
}
