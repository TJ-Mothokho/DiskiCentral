"use client";

import { useParams } from "next/navigation";
import { Plus, Settings2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CategoriesService } from "@/services/CategoryService";
import { CompetitionsService } from "@/services/CompetitionService";
import { FixturesService } from "@/services/FixtureService";
import { PlayersService } from "@/services/PlayerService";
import { TeamsService } from "@/services/TeamService";
import { TransfersService } from "@/services/TransferService";
import { VideoService } from "@/services/VideoService";
import { AuthorsService } from "@/services/AuthorService";

const sectionLabels: Record<string, string> = {
  categories: "Categories",
  videos: "Videos",
  authors: "Authors",
  teams: "Teams",
  players: "Players",
  competitions: "Competitions",
  fixtures: "Fixtures",
  "transfers-mgmt": "Transfers",
  media: "Media Library",
  comments: "Comments",
  newsletter: "Newsletter",
  settings: "Settings",
  database: "JSON Database",
};

export default function GenericAdminPage() {
  const { section } = useParams<{ section: string }>();
  const title = sectionLabels[section] ?? "Admin module";
  const [records, setRecords] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        let response: { data?: unknown[] };
        if (section === "teams")
          response = await new TeamsService().getApiTeams();
        else if (section === "competitions")
          response = await new CompetitionsService().getApiCompetitions();
        else if (section === "categories")
          response = await new CategoriesService().getApiCategories();
        else if (section === "authors")
          response = await new AuthorsService().getApiAuthors();
        else if (section === "players")
          response = await PlayersService.getApiPlayers();
        else if (section === "videos")
          response = await VideoService.getApiVideos();
        else if (section === "fixtures")
          response = await FixturesService.getApiFixtures();
        else if (section === "transfers-mgmt")
          response = await TransfersService.getApiTransfers();
        else {
          setAvailable(false);
          return;
        }
        setRecords((response.data ?? []) as Record<string, unknown>[]);
      } catch {
        setRecords([]);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [section]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-display font-bold text-white">{title}</h1>
          <p className="text-xs text-gray-500 mt-1">
            {loading ? "Loading service data..." : `${records.length} records`}
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 px-4 py-2 bg-[#00C853] text-black font-bold text-sm rounded-lg hover:bg-[#00A344]">
          <Plus size={15} /> Add {title.replace(/s$/, "")}
        </button>
      </div>
      {available ? (
        <div className="bg-[#111] border border-gray-800 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Name
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  ID
                </th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr
                  key={String(record.id)}
                  className="border-t border-gray-800">
                  <td className="px-4 py-3 text-gray-200">
                    {String(
                      record.name ??
                        record.title ??
                        record.playerName ??
                        record.id,
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {String(record.status ?? "Active")}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {String(record.id)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && records.length === 0 && (
            <p className="p-8 text-center text-sm text-gray-500">
              No records returned by this service.
            </p>
          )}
        </div>
      ) : (
        <div className="bg-[#111] border border-gray-800 rounded-xl p-12 text-center">
          <Settings2 size={32} className="mx-auto mb-4 text-[#00C853]" />
          <h2 className="text-base font-semibold text-white mb-2">
            {title} service unavailable
          </h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            No service currently exposes data for this module.
          </p>
        </div>
      )}
    </div>
  );
}
