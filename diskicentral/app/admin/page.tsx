"use client";

import Link from "next/link";
import { Activity, FileText, Trophy, Users, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { ArticlesService } from "@/services/ArticleService";
import { CompetitionsService } from "@/services/CompetitionService";
import { PlayersService } from "@/services/PlayerService";
import { TeamsService } from "@/services/TeamService";
import { VideoService } from "@/services/VideoService";

const cards = [
  {
    label: "Articles",
    href: "/admin/articles",
    icon: FileText,
    color: "text-blue-400",
  },
  {
    label: "Players",
    href: "/admin/players",
    icon: Users,
    color: "text-yellow-400",
  },
  {
    label: "Teams",
    href: "/admin/teams",
    icon: Trophy,
    color: "text-pink-400",
  },
  {
    label: "Videos",
    href: "/admin/videos",
    icon: Video,
    color: "text-cyan-400",
  },
];

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const competitionsService = new CompetitionsService();
    const teamsService = new TeamsService();
    void Promise.all([
      ArticlesService.getApiArticles(),
      PlayersService.getApiPlayers(),
      teamsService.getApiTeams(),
      VideoService.getApiVideos(),
      competitionsService.getApiCompetitions(),
    ])
      .then(([articles, players, teams, videos, competitions]) =>
        setCounts({
          Articles: articles.data?.length ?? 0,
          Players: players.data?.length ?? 0,
          Teams: teams.data?.length ?? 0,
          Videos: videos.data?.length ?? 0,
          Competitions: competitions.data?.length ?? 0,
        }),
      )
      .catch(() => setCounts({}));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-display font-bold text-white">Dashboard</h1>
        <p className="text-xs text-gray-500 mt-1">
          Overview of DiskiCentral administration
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map(({ label, href, icon: Icon, color }) => (
          <Link
            key={href}
            href={href}
            className="bg-[#111] border border-gray-800 rounded-xl p-5 hover:border-[#00C853]/50 transition-colors">
            <Icon size={18} className={`${color} mb-5`} />
            <div className="text-2xl font-display font-bold text-white">
              {counts[label] ?? "-"}
            </div>
            <div className="text-xs text-gray-500 mt-1">{label}</div>
          </Link>
        ))}
      </div>
      <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Activity size={16} className="text-[#00C853]" />
          <h2 className="text-sm font-semibold text-white">
            Live content totals
          </h2>
        </div>
        <p className="text-sm text-gray-400">
          Articles, players, teams, videos, and competitions are loaded from the
          API services.
        </p>
        <div className="mt-4 text-xs text-gray-500">
          Competitions:{" "}
          <span className="text-gray-300">{counts.Competitions ?? "-"}</span>
        </div>
      </div>
    </div>
  );
}
