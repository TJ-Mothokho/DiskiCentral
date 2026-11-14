"use client";

import { useSyncExternalStore } from "react";

interface Match {
  id: string;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time?: string;
  venue?: string;
  homeScore?: number;
  awayScore?: number;
  status: string;
}

interface MatchCardProps {
  match: Match;
  darkMode?: boolean;
}

const subscribeToTimeZone = () => () => {};

export default function MatchCard({ match, darkMode }: MatchCardProps) {
  const isResult =
    match.status === "completed" || match.homeScore !== undefined;
  const getLocalDate = () => {
    const kickoff = new Date(match.date);
    if (Number.isNaN(kickoff.getTime())) {
      return "Date unavailable";
    }

    return kickoff.toLocaleDateString(undefined, {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };
  const getLocalTime = () => {
    const kickoff = new Date(match.date);
    return Number.isNaN(kickoff.getTime())
      ? "—"
      : kickoff.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        });
  };
  const localDate = useSyncExternalStore(
    subscribeToTimeZone,
    getLocalDate,
    () => null,
  );
  const localTime = useSyncExternalStore(
    subscribeToTimeZone,
    getLocalTime,
    () => null,
  );

  return (
    <div
      className={`rounded-xl border p-4 transition-colors ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
      <div
        className={`text-xs font-semibold uppercase tracking-wide mb-3 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
        {match.competition} · {localDate ?? "—"}
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 text-right">
          <span
            className={`font-display font-bold text-sm sm:text-base ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
            {match.homeTeam}
          </span>
        </div>
        {isResult ? (
          <div className="flex items-center gap-1 px-3">
            <span
              className={`font-display font-bold text-xl ${darkMode ? "text-white" : "text-gray-900"}`}>
              {match.homeScore}
            </span>
            <span
              className={`mx-1 ${darkMode ? "text-gray-600" : "text-gray-300"}`}>
              —
            </span>
            <span
              className={`font-display font-bold text-xl ${darkMode ? "text-white" : "text-gray-900"}`}>
              {match.awayScore}
            </span>
          </div>
        ) : (
          <div className="px-3 text-center">
            <div
              className={`text-lg font-bold font-display ${darkMode ? "text-gray-400" : "text-gray-400"}`}>
              vs
            </div>
            <div className="text-xs text-[#00C853] font-semibold">
              {localTime ?? "—"}
            </div>
          </div>
        )}
        <div className="flex-1 text-left">
          <span
            className={`font-display font-bold text-sm sm:text-base ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
            {match.awayTeam}
          </span>
        </div>
      </div>
      {match.venue && (
        <div
          className={`text-xs text-center mt-2 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
          {match.venue}
        </div>
      )}
    </div>
  );
}
