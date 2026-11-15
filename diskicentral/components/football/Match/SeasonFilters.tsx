"use client";

import Link from "next/link";
import { useState } from "react";

type SeasonFiltersProps = {
  basePath: string;
  monthOptions: Array<{ value: string; label: string }>;
  teams: Array<{ id: number; name: string }>;
  selectedMonth?: string;
  selectedTeam?: string;
  extraQuery?: Record<string, string | undefined>;
};

export function SeasonFilters({
  basePath,
  monthOptions,
  teams,
  selectedMonth,
  selectedTeam,
  extraQuery = {},
}: SeasonFiltersProps) {
  const [month, setMonth] = useState(selectedMonth ?? "");
  const [team, setTeam] = useState(selectedTeam ?? "");

  function buildHref() {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(extraQuery)) {
      if (value) params.set(key, value);
    }
    if (month) params.set("month", month);
    if (team) params.set("team", team);
    return `${basePath}${params.toString() ? `?${params.toString()}` : ""}`;
  }

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-primary/10 bg-surface p-4">
      <label className="grid gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-secondary">
        Month
        <select
          className="min-h-9 rounded-lg border border-primary/10 bg-canvas px-3 text-sm font-normal normal-case tracking-normal text-primary"
          value={month}
          onChange={(event) => setMonth(event.target.value)}
          aria-label="Filter by month"
        >
          <option value="">All season</option>
          {monthOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-secondary">
        Team
        <select
          className="min-h-9 rounded-lg border border-primary/10 bg-canvas px-3 text-sm font-normal normal-case tracking-normal text-primary"
          value={team}
          onChange={(event) => setTeam(event.target.value)}
          aria-label="Filter by team"
        >
          <option value="">All teams</option>
          {teams.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <div className="flex gap-2">
        <Link href={buildHref()} className="ui-button ui-button--primary">
          Apply filters
        </Link>
        <Link href={basePath} className="ui-button ui-button--secondary">
          Reset
        </Link>
      </div>
    </div>
  );
}
