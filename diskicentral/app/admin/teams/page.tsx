"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { TeamsService } from "@/services/TeamService";
import type { Team } from "@/types/team";
import { EditTeamModal } from "./EditTeam";
import { AddTeamModal } from "./AddTeam";

const teamsService = new TeamsService();

export default function AdminTeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [addingTeam, setAddingTeam] = useState(false);

  async function loadTeams() {
    setLoading(true);
    try {
      const response = await teamsService.getApiTeams();
      setTeams(response.data ?? []);
    } catch {
      setError("Failed to load teams.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchData() {
      await loadTeams();
    }
    void fetchData();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this team? This cannot be undone.")) return;
    setDeletingId(id);
    setError("");
    try {
      await teamsService.deleteTeam(id);
      setTeams((prev) => prev.filter((team) => team.id !== id));
    } catch {
      setError("Failed to delete team.");
    } finally {
      setDeletingId(null);
    }
  }

  function handleCreated(created: Team) {
    setTeams((prev) => [...prev, created]);
    setAddingTeam(false);
  }

  function handleUpdated(updated: Team) {
    setTeams((prev) =>
      prev.map((team) => (team.id === updated.id ? updated : team)),
    );
    setEditingTeam(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-display font-bold text-white">Teams</h1>
          <p className="text-xs text-gray-500 mt-1">
            {loading ? "Loading teams..." : `${teams.length} records`}
          </p>
        </div>
        <button
          type="button"
          aria-label={`Add team`}
          onClick={() => setAddingTeam(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#00C853] text-black font-bold text-sm rounded-lg hover:bg-[#00A344]">
          <Plus size={14} /> Add Team
        </button>

        {addingTeam && (
          <AddTeamModal
            onClose={() => setAddingTeam(false)}
            onCreated={handleCreated}
          />
        )}
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="bg-[#111] border border-gray-800 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-900/50">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Logo
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Name
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Slug
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.id} className="border-t border-gray-800">
                <td className="px-4 py-3 text-gray-200">
                  {team.logo ? (
                    <img
                      src={team.logo}
                      alt={`${team.name} logo`}
                      className="h-6 w-6 rounded-full"
                    />
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-gray-700" />
                  )}
                </td>
                <td className="px-4 py-3 text-gray-200">{team.name}</td>
                <td className="px-4 py-3 text-xs text-gray-400">{team.slug}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      aria-label={`Edit ${team.name}`}
                      onClick={() => setEditingTeam(team)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800">
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${team.name}`}
                      disabled={deletingId === team.id}
                      onClick={() => void handleDelete(team.id)}
                      className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-gray-800 disabled:opacity-50">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && teams.length === 0 && (
          <p className="p-8 text-center text-sm text-gray-500">
            No teams found.
          </p>
        )}
      </div>

      {editingTeam && (
        <EditTeamModal
          team={editingTeam}
          onClose={() => setEditingTeam(null)}
          onUpdated={handleUpdated}
        />
      )}
    </div>
  );
}
