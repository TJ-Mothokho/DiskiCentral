"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { FORMAT_LABELS } from "@/app/admin/competitions/CompetitionForm";
import { TableSkeletonRows } from "@/components/admin/Skeletons";
import { CompetitionsService } from "@/services/CompetitionService";
import type { Competition } from "@/types/competition";

const competitionsService = new CompetitionsService();

export default function AdminCompetitionsPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    competitionsService
      .getApiCompetitions()
      .then((response) => setCompetitions(response.data ?? []))
      .catch(() => setError("Failed to load competitions."))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(competition: Competition) {
    if (!confirm(`Delete "${competition.name}"? This cannot be undone.`))
      return;
    setDeletingId(competition.id);
    setError("");
    try {
      await competitionsService.deleteCompetition(competition.id);
      setCompetitions((prev) =>
        prev.filter((entry) => entry.id !== competition.id),
      );
    } catch {
      setError("Failed to delete competition.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-display font-bold text-white">
            Competitions
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {loading
              ? "Loading competitions..."
              : `${competitions.length} records`}
          </p>
        </div>
        <Link
          href="/admin/competitions/add"
          className="flex items-center gap-1.5 px-4 py-2 bg-[#00C853] text-black font-bold text-sm rounded-lg hover:bg-[#00A344]">
          <Plus size={14} /> Add Competition
        </Link>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <div className="bg-[#111] border border-gray-800 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-900/50">
            <tr>
              {[
                "Logo",
                "Name",
                "Country",
                "Format",
                "Teams",
                "Seasons",
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
              <TableSkeletonRows columns={7} />
            ) : (
              competitions.map((competition) => (
                <tr key={competition.id} className="border-t border-gray-800">
                  <td className="px-4 py-3">
                    {competition.logo ? (
                      <img
                        src={competition.logo}
                        alt={`${competition.name} logo`}
                        className="h-6 w-6 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-6 w-6 rounded-full bg-gray-700" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-200">
                    <Link
                      href={`/admin/competitions/${competition.id}/edit`}
                      className="hover:text-[#00C853]">
                      {competition.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {competition.country}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {FORMAT_LABELS[competition.format] ?? "Unknown"}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {competition.teamIds.length}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {competition.seasonIds.length}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/competitions/${competition.id}/edit`}
                        aria-label={`Edit ${competition.name}`}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800">
                        <Pencil size={14} />
                      </Link>
                      <button
                        type="button"
                        aria-label={`Delete ${competition.name}`}
                        disabled={deletingId === competition.id}
                        onClick={() => void handleDelete(competition)}
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
        {!loading && competitions.length === 0 && (
          <p className="p-8 text-center text-sm text-gray-500">
            No competitions found.
          </p>
        )}
      </div>
    </div>
  );
}
