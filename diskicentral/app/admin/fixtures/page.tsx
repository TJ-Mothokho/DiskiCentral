"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { FIXTURE_STATUS_LABELS } from "@/app/admin/fixtures/FixtureForm";
import { TableSkeletonRows } from "@/components/admin/Skeletons";
import { FixturesService } from "@/services/FixtureService";
import { type Fixture, FixtureStatus } from "@/types/fixture";

type View = "all" | "upcoming" | "results";

const VIEWS: { id: View; label: string }[] = [
  { id: "all", label: "All" },
  { id: "upcoming", label: "Upcoming" },
  { id: "results", label: "Results" },
];

export default function AdminFixturesPage() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>("all");
  const [search, setSearch] = useState("");
  const [competitionFilter, setCompetitionFilter] = useState("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    FixturesService.getApiFixtures()
      .then((response) => setFixtures(response.data ?? []))
      .catch(() => setError("Failed to load fixtures."))
      .finally(() => setLoading(false));
  }, []);

  const competitions = useMemo(
    () =>
      Array.from(
        new Map(
          fixtures.map((fixture) => [
            fixture.competitionId,
            fixture.competitionName ?? "Unknown",
          ]),
        ),
      ),
    [fixtures],
  );

  const filtered = fixtures
    .filter((fixture) => {
      if (view === "results") return fixture.status === FixtureStatus.Finished;
      if (view === "upcoming") return fixture.status !== FixtureStatus.Finished;
      return true;
    })
    .filter(
      (fixture) =>
        competitionFilter === "all" ||
        fixture.competitionId === competitionFilter,
    )
    .filter((fixture) =>
      [fixture.homeTeamName, fixture.awayTeamName, fixture.venue].some(
        (value) => value?.toLowerCase().includes(search.toLowerCase()),
      ),
    )
    .sort((a, b) =>
      view === "results"
        ? new Date(b.kickoff).getTime() - new Date(a.kickoff).getTime()
        : new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime(),
    );

  async function handleDelete(fixture: Fixture) {
    if (!confirm("Delete this fixture? This cannot be undone.")) return;
    setDeletingId(fixture.id);
    setError("");
    try {
      await FixturesService.deleteFixture(fixture.id);
      setFixtures((prev) => prev.filter((entry) => entry.id !== fixture.id));
    } catch {
      setError("Failed to delete fixture.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-display font-bold text-white">
            Fixtures &amp; Results
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {loading ? "Loading fixtures..." : `${filtered.length} records`}
          </p>
        </div>
        <Link
          href="/admin/fixtures/add"
          className="flex items-center gap-1.5 px-4 py-2 bg-[#00C853] text-black font-bold text-sm rounded-lg hover:bg-[#00A344]">
          <Plus size={14} /> Add Fixture
        </Link>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1 rounded-lg bg-gray-900 p-1">
          {VIEWS.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => setView(entry.id)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold ${view === entry.id ? "bg-[#00C853] text-black" : "text-gray-400 hover:text-white"}`}>
              {entry.label}
            </button>
          ))}
        </div>
        <div className="relative max-w-sm flex-1 min-w-50">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search teams or venue..."
            className="w-full pl-9 pr-3 py-2 bg-[#111] border border-gray-700 text-white rounded-lg text-sm outline-none focus:border-[#00C853]"
          />
        </div>
        <select
          value={competitionFilter}
          onChange={(event) => setCompetitionFilter(event.target.value)}
          className="px-3 py-2 bg-[#111] border border-gray-700 text-white rounded-lg text-sm outline-none focus:border-[#00C853]">
          <option value="all">All competitions</option>
          {competitions.map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <div className="bg-[#111] border border-gray-800 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-900/50">
            <tr>
              {[
                "Match",
                "Competition",
                "Kickoff",
                "Score",
                "Status",
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
              <TableSkeletonRows columns={6} />
            ) : (
              filtered.map((fixture) => (
                <tr key={fixture.id} className="border-t border-gray-800">
                  <td className="px-4 py-3 text-gray-200 min-w-56">
                    <Link
                      href={`/admin/fixtures/${fixture.id}/edit`}
                      className="hover:text-[#00C853]">
                      {fixture.homeTeamName ?? "Home"} vs{" "}
                      {fixture.awayTeamName ?? "Away"}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {fixture.competitionName ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {new Date(fixture.kickoff).toLocaleString("en-ZA", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-300">
                    {fixture.homeScore !== null && fixture.awayScore !== null
                      ? `${fixture.homeScore} - ${fixture.awayScore}`
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {FIXTURE_STATUS_LABELS[fixture.status] ?? "Unknown"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/fixtures/${fixture.id}/edit`}
                        aria-label="Edit fixture"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800">
                        <Pencil size={14} />
                      </Link>
                      <button
                        type="button"
                        aria-label="Delete fixture"
                        disabled={deletingId === fixture.id}
                        onClick={() => void handleDelete(fixture)}
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
        {!loading && filtered.length === 0 && (
          <p className="p-8 text-center text-sm text-gray-500">
            No fixtures found.
          </p>
        )}
      </div>
    </div>
  );
}
