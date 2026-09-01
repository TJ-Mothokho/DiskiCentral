import Link from "next/link";

import { Transfer } from "@/types/transfer";

interface Props {
  transfers: Transfer[];
  darkMode: boolean;
}

export default function TransferCentreSection({ transfers, darkMode }: Props) {
  const recentTransfers = transfers.slice(0, 4);

  return (
    <section
      className={`border-y py-8 ${darkMode ? "border-gray-800 bg-gray-950" : "border-gray-100 bg-gray-50"}`}>
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-orange-500 rounded-full" />
            <h2
              className={`font-display font-bold text-2xl uppercase tracking-wide ${darkMode ? "text-white" : "text-gray-900"}`}>
              Transfer Centre
            </h2>
          </div>
          <Link
            href="/transfers"
            className="text-sm text-orange-500 font-semibold">
            All Transfers
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recentTransfers.map((transfer) => (
            <div
              key={transfer.id}
              className={`flex items-center justify-between gap-4 p-4 rounded-lg border ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
              <div className="min-w-0">
                <h3
                  className={`font-semibold text-sm truncate ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                  {transfer.playerName ?? "Player unavailable"}
                </h3>
                <p
                  className={`text-xs mt-1 truncate ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {transfer.fromTeamName ?? "Unknown club"} to{" "}
                  {transfer.toTeamName ?? "Unknown club"}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p
                  className={`text-sm font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                  {transfer.fee
                    ? `R${transfer.fee.toLocaleString("en-ZA")}`
                    : "Undisclosed"}
                </p>
                <p
                  className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  {new Date(transfer.transferDate).toLocaleDateString("en-ZA", {
                    day: "numeric",
                    month: "short",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
