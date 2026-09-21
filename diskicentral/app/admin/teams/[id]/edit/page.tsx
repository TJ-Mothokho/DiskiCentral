"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import TeamForm from "@/app/admin/teams/TeamForm";
import { TeamsService } from "@/services/TeamService";
import type { Team } from "@/types/team";

const teamsService = new TeamsService();

export default function EditTeamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [team, setTeam] = useState<Team | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    void params.then(({ id }) =>
      teamsService
        .getTeamById(id)
        .then((response) => setTeam(response.data))
        .catch(() => setError("This team could not be loaded.")),
    );
  }, [params]);

  if (error) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-red-300">{error}</p>
        <Link
          href="/admin/teams"
          className="text-sm text-[#00C853] hover:underline">
          Back to teams
        </Link>
      </div>
    );
  }
  if (!team) return <p className="text-sm text-gray-500">Loading team...</p>;
  return <TeamForm team={team} />;
}
