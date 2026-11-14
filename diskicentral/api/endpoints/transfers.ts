import { unstable_cache } from "next/cache";
import type { TransfersResponse } from "@/api/types/transfers.response";
import { request } from "./request";

export interface GetTransfersParams {
  player?: number;
  team?: number;
}

const getCachedTransfers = unstable_cache(
  (params: GetTransfersParams) =>
    request<TransfersResponse>("transfers", {
      player: params.player,
      team: params.team,
    }),
  ["transfers"],
  { revalidate: 60 * 60 * 24 },
);

export async function getTransfers(
  params: GetTransfersParams,
): Promise<TransfersResponse> {
  if (params.player === undefined && params.team === undefined) {
    throw new Error(
      "The transfers endpoint requires either a player or team parameter.",
    );
  }

  return getCachedTransfers(params);
}