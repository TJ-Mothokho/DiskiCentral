import Link from "next/link";
import type { TopScorer } from "@/api/types/top-scorers.response";
import { statText } from "@/lib/stats";

export function TopPerformers({ title, items, metric }: { title: string; items: TopScorer[]; metric: "goals" | "assists" }) {
  return <div className="detail-panel"><p className="eyebrow">League stats</p><h2 className="mt-2 text-xl font-bold text-primary">{title}</h2>{items.length ? <div className="mt-5 space-y-3">{items.slice(0, 5).map((item) => { const stats = item.statistics[0]; const record = metric === "goals" ? stats?.goals : stats?.goals; const value = record && typeof record === "object" ? (record as Record<string, unknown>)[metric === "goals" ? "total" : "assists"] : undefined; return <Link key={item.player.id} href={`/players/${item.player.id}`} className="flex items-center justify-between gap-4 text-sm"><span className="font-semibold text-primary">{item.player.name}</span><span className="font-mono text-secondary">{statText(value)}</span></Link>; })}</div> : <p className="mt-4 text-sm text-secondary">No top-performer data is available for this season.</p>}</div>;
}
