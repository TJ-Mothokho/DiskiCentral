import { getLeagues } from "@/api/endpoints/leagues";
import { notFound } from "next/navigation";

export default async function LeaguePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();

  const leagueId = Number(id);
  if (!Number.isSafeInteger(leagueId) || leagueId < 1) notFound();

  const result = await getLeagues({ id: leagueId });
  const league = result.response[0]?.league;
  if (!league) notFound();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <h1>{league.name}</h1>
    </main>
  );
}
