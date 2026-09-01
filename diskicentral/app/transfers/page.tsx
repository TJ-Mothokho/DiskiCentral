import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

import { TransfersService } from "@/services/TransferService";

export default async function TransfersPage() {
  const darkMode = false;
  const transfersResponse = await TransfersService.getApiTransfers();
  const transfers = transfersResponse.data ?? [];

  const tabs = [
    { key: "all", label: "All", count: transfers.length },
    {
      key: "official",
      label: "Official",
      count: transfers.filter((t) => t.status === 1).length,
    },
    {
      key: "rumour",
      label: "Rumours",
      count: transfers.filter((t) => t.status === 2).length,
    },
    {
      key: "loan",
      label: "Loans",
      count: transfers.filter((t) => t.status === 3).length,
    },
    {
      key: "released",
      label: "Released",
      count: transfers.filter((t) => t.status === 4).length,
    },
  ];

  const activeTab = "all";
  const filtered =
    activeTab === "all"
      ? transfers
      : transfers.filter((transfer) => {
          if (activeTab === "official") return transfer.status === 1;
          if (activeTab === "rumour") return transfer.status === 2;
          if (activeTab === "loan") return transfer.status === 3;
          return transfer.status === 4;
        });

  const typeConfig = {
    1: {
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
      label: "Official",
    },
    2: {
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
      label: "Rumour",
    },
    3: {
      icon: AlertCircle,
      color: "text-blue-600",
      bg: "bg-blue-100",
      label: "Loan",
    },
    4: {
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-100",
      label: "Released",
    },
  } as const;

  return (
    <main className="max-w-[1440px] mx-auto px-4 py-6">
      <div className="mb-8">
        <h1
          className={`font-display font-bold text-4xl mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Transfer Centre
        </h1>
        <p
          className={`text-base ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          All the latest transfer news, rumours and completed deals
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Official Deals",
            value: transfers.filter((t) => t.status === 1).length,
            color: "text-green-600",
          },
          {
            label: "Active Rumours",
            value: transfers.filter((t) => t.status === 2).length,
            color: "text-yellow-600",
          },
          {
            label: "Loans",
            value: transfers.filter((t) => t.status === 3).length,
            color: "text-blue-600",
          },
          {
            label: "Released",
            value: transfers.filter((t) => t.status === 4).length,
            color: "text-red-600",
          },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className={`rounded-xl border p-4 text-center ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
            <div className={`font-display font-bold text-3xl ${color}`}>
              {value}
            </div>
            <div
              className={`text-xs font-medium mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              {label}
            </div>
          </div>
        ))}
      </div>

      <div
        className={`flex gap-1 p-1 rounded-xl mb-6 w-fit ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === tab.key
                ? "bg-[#00C853] text-black shadow-sm"
                : darkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-800"
            }`}>
            {tab.label}
            <span
              className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === tab.key
                  ? "bg-black/20 text-black"
                  : darkMode
                    ? "bg-gray-700 text-gray-400"
                    : "bg-white text-gray-500"
              }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div className="relative">
        <div
          className={`absolute left-6 top-0 bottom-0 w-0.5 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}
        />
        <div className="space-y-4 pl-16">
          {filtered.map((transfer) => {
            const config =
              typeConfig[transfer.status as keyof typeof typeConfig] ??
              typeConfig[1];
            const Icon = config.icon;

            return (
              <div key={transfer.id} className="relative">
                <div
                  className={`absolute -left-10 w-8 h-8 rounded-full flex items-center justify-center ${config.bg}`}>
                  <Icon size={14} className={config.color} />
                </div>

                <div
                  className={`rounded-xl border p-5 hover:shadow-md transition-shadow ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-3 sm:w-48 shrink-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
                        <div className="w-full h-full bg-gradient-to-br from-[#00C853] to-[#0A0A0A]" />
                      </div>
                      <div>
                        <div
                          className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {transfer.playerName ?? "Player"}
                        </div>
                        <div
                          className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {config.label}
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 flex items-center gap-3">
                      <div
                        className={`flex-1 text-right text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                        {transfer.fromTeamName ?? "From"}
                      </div>
                      <div className="px-3 py-1.5 bg-[#0A0A0A] text-[#00C853] rounded-lg flex items-center gap-1">
                        <ArrowRight size={12} />
                        <span className="text-xs font-semibold">Move</span>
                      </div>
                      <div
                        className={`flex-1 text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                        {transfer.toTeamName ?? "To"}
                      </div>
                    </div>

                    <div className="flex flex-col items-end shrink-0 gap-1.5">
                      <div className={`text-xs font-semibold ${config.color}`}>
                        {config.label}
                      </div>
                      <div
                        className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {new Date(transfer.transferDate).toLocaleDateString(
                          "en-ZA",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </div>
                    </div>
                  </div>

                  {transfer.fee > 0 && (
                    <p
                      className={`text-xs mt-3 pt-3 border-t ${darkMode ? "border-gray-800 text-gray-400" : "border-gray-100 text-gray-500"}`}>
                      Fee: €{transfer.fee.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
