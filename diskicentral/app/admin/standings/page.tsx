"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2, Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";
import { TableSkeletonRows } from "@/components/admin/Skeletons";
import { CompetitionsService } from "@/services/CompetitionService";
import { StandingsService } from "@/services/StandingService";
import type { Standing } from "@/types/standing";

const standingsService = new StandingsService();
const competitionsService = new CompetitionsService();

export default function AdminStandingsPage() {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [competitions, setCompetitions] = useState<
    { id: string; name: string }[]
  >([]);
  const [competitionId, setCompetitionId] = useState("all");
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      standingsService.getApiStandings(),
      competitionsService.getApiCompetitions(),
    ])
      .then(([standingResponse, competitionResponse]) => {
        setStandings(standingResponse.data ?? []);
        setCompetitions(competitionResponse.data ?? []);
      })
      .catch(() => setError("Failed to load standings."))
      .finally(() => setLoading(false));
  }, []);

  const rows = standings
    .filter(
      (row) => competitionId === "all" || row.competitionId === competitionId,
    )
    .sort(
      (a, b) =>
        (a.competitionName ?? "").localeCompare(b.competitionName ?? "") ||
        a.position - b.position,
    );

  async function handleGenerate() {
    if (competitionId === "all") return;
    if (!confirm("Generate standings from the API for this competition?"))
      return;
    setGenerating(true);
    setError("");
    try {
      await standingsService.generateStandingsFromApi(competitionId);
      const refreshed = await standingsService.getApiStandings();
      setStandings(refreshed.data ?? []);
    } catch {
      setError("Failed to generate standings.");
    } finally {
      setGenerating(false);
    }
  }

  async function handleDelete(standing: Standing) {
    if (!confirm("Delete this standing? This cannot be undone.")) return;
    setDeletingId(standing.id);
    setError("");
    try {
      await standingsService.deleteStanding(standing.id);
      setStandings((prev) => prev.filter((entry) => entry.id !== standing.id));
    } catch {
      setError("Failed to delete standing.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-display font-bold text-white">
            Standings
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {loading ? "Loading standings..." : `${rows.length} records`}
          </p>
        </div>
        <Link
          href="/admin/standings/add"
          className="flex items-center gap-1.5 px-4 py-2 bg-[#00C853] text-black font-bold text-sm rounded-lg hover:bg-[#00A344]">
          <Plus size={14} /> Add Standing
        </Link>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={competitionId}
          onChange={(event) => setCompetitionId(event.target.value)}
          className="px-3 py-2 bg-[#111] border border-gray-700 text-white rounded-lg text-sm outline-none focus:border-[#00C853]">
          <option value="all">All competitions</option>
          {competitions.map((competition) => (
            <option key={competition.id} value={competition.id}>
              {competition.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => void handleGenerate()}
          disabled={competitionId === "all" || generating}
          title={
            competitionId === "all"
              ? "Select a competition first"
              : "Generate from API"
          }
          className="flex items-center gap-1.5 rounded-lg border border-gray-700 px-3 py-2 text-xs font-semibold text-gray-300 hover:border-[#00C853] hover:text-[#00C853] disabled:cursor-not-allowed disabled:opacity-50">
          {generating ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <RefreshCw size={14} />
          )}
          Generate from API
        </button>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <div className="bg-[#111] border border-gray-800 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-900/50">
            <tr>
              {[
                "#",
                "Competition",
                "P",
                "W",
                "D",
                "L",
                "GF",
                "GA",
                "GD",
                "Pts",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className={`px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide ${heading === "Actions" ? "text-right" : "text-left"}`}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <TableSkeletonRows columns={11} />
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-t border-gray-800">
                  <td className="px-4 py-3 font-semibold text-[#00C853]">
                    {row.position}
                  </td>
                  <td className="px-4 py-3 text-gray-200">
                    <Link
                      href={`/admin/standings/${row.id}/edit`}
                      className="hover:text-[#00C853]">
                      {row.competitionName ?? "—"}
                    </Link>
                  </td>
                  {[
                    row.played,
                    row.wins,
                    row.draws,
                    row.losses,
                    row.goalsFor,
                    row.goalsAgainst,
                    row.goalDifference,
                    row.points,
                  ].map((value, index) => (
                    <td key={index} className="px-4 py-3 text-xs text-gray-400">
                      {value}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/standings/${row.id}/edit`}
                        aria-label="Edit standing"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800">
                        <Pencil size={14} />
                      </Link>
                      <button
                        type="button"
                        aria-label="Delete standing"
                        disabled={deletingId === row.id}
                        onClick={() => void handleDelete(row)}
                        className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-gray-800 disabled:opacity-50">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {!loading && rows.length === 0 && (
          <p className="p-8 text-center text-sm text-gray-500">
            No standings found.
          </p>
        )}
      </div>
    </div>
  );
}
