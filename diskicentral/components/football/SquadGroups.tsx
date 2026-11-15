import Link from "next/link";
import type { SquadPlayer } from "@/api/types/players-squads.response";

const order = ["Goalkeeper", "Defender", "Midfielder", "Attacker", "Forward"];
export function SquadGroups({ players }: { players: SquadPlayer[] }) {
  const groups = new Map<string, SquadPlayer[]>();
  for (const player of players) { const position = player.position ?? "Other"; const key = position.toLowerCase().includes("goal") ? "Goalkeeper" : position.toLowerCase().includes("def") ? "Defender" : position.toLowerCase().includes("mid") ? "Midfielder" : position.toLowerCase().includes("for") || position.toLowerCase().includes("att") ? "Forward" : position; groups.set(key, [...(groups.get(key) ?? []), player]); }
  return <div className="space-y-6">{order.concat(Array.from(groups.keys()).filter((group) => !order.includes(group))).map((group) => { const items = groups.get(group) ?? []; if (!items.length) return null; return <section key={group}><p className="eyebrow">{group}s</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{items.map((player) => <Link key={player.id} href={`/players/${player.id}`} className="flex items-center justify-between rounded-xl border border-primary/10 bg-surface p-3 transition hover:-translate-y-0.5"><span className="font-semibold text-primary">{player.name}</span><span className="text-xs text-secondary">{player.number ?? "—"}</span></Link>)}</div></section>; })}</div>;
}
