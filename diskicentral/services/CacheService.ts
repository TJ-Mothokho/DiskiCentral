import { BooleanResponse } from "@/types/common";
import { apiRequest, BASE_URL } from "@/services/ApiRequest";

export class CacheService {
  public static async clearCache(): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "POST",
        url: `${BASE_URL}/api/admin/cache/clear`,
      },
      "Failed to clear API cache.",
    );
  }
}
