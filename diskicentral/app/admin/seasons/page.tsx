"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { SEASON_STATUS_LABELS } from "@/app/admin/seasons/SeasonForm";
import { TableSkeletonRows } from "@/components/admin/Skeletons";
import { SeasonsService } from "@/services/SeasonService";
import type { Season } from "@/types/season";

const seasonsService = new SeasonsService();

export default function AdminSeasonsPage() {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    seasonsService
      .getApiSeasons()
      .then((response) => setSeasons(response.data ?? []))
      .catch(() => setError("Failed to load seasons."))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(season: Season) {
    if (!confirm(`Delete "${season.name}"? This cannot be undone.`)) return;
    setDeletingId(season.id);
    setError("");
    try {
      await seasonsService.deleteSeason(season.id);
      setSeasons((prev) => prev.filter((entry) => entry.id !== season.id));
    } catch {
      setError("Failed to delete season.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-display font-bold text-white">Seasons</h1>
          <p className="text-xs text-gray-500 mt-1">
            {loading ? "Loading seasons..." : `${seasons.length} records`}
          </p>
        </div>
        <Link
          href="/admin/seasons/add"
          className="flex items-center gap-1.5 px-4 py-2 bg-[#00C853] text-black font-bold text-sm rounded-lg hover:bg-[#00A344]">
          <Plus size={14} /> Add Season
        </Link>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <div className="bg-[#111] border border-gray-800 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-900/50">
            <tr>
              {["Name", "Slug", "Status", "Competitions", "Actions"].map(
                (heading) => (
                  <th
                    key={heading}
                    className={`px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide ${heading === "Actions" ? "text-right" : "text-left"}`}>
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <TableSkeletonRows columns={5} />
            ) : (
              seasons.map((season) => (
                <tr key={season.id} className="border-t border-gray-800">
                  <td className="px-4 py-3 text-gray-200">
                    <Link
                      href={`/admin/seasons/${season.id}/edit`}
                      className="hover:text-[#00C853]">
                      {season.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {season.slug}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {SEASON_STATUS_LABELS[season.status] ?? "Unknown"}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {season.competitionIds.length}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/seasons/${season.id}/edit`}
                        aria-label={`Edit ${season.name}`}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800">
                        <Pencil size={14} />
                      </Link>
                      <button
                        type="button"
                        aria-label={`Delete ${season.name}`}
                        disabled={deletingId === season.id}
                        onClick={() => void handleDelete(season)}
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
        {!loading && seasons.length === 0 && (
          <p className="p-8 text-center text-sm text-gray-500">
            No seasons found.
          </p>
        )}
      </div>
    </div>
  );
}
