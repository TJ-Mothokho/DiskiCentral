"use client";

import { useState } from "react";
import LeaguesFilterSidebar from "./LeaguesFilterSidebar";
import LeagueResults from "./LeagueResults";
import {
  createDefaultLeagueFilters,
  filterLeagueGroups,
  hasLeagueFilters,
  type CountryGroup,
} from "./leagueFilters";

export default function LeaguesBrowser({ groups }: { groups: CountryGroup[] }) {
  const [filters, setFilters] = useState(createDefaultLeagueFilters);
  const filteredGroups = filterLeagueGroups(groups, filters);

  return (
    <div className="grid gap-6 md:grid-cols-[220px_minmax(0,1fr)]">
      <LeaguesFilterSidebar filters={filters} onChange={setFilters} />
      <LeagueResults
        groups={filteredGroups}
        hasFilters={hasLeagueFilters(filters)}
      />
    </div>
  );
}
