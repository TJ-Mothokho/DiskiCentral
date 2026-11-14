import axios from "axios";

const API_FOOTBALL_BASE_URL = "https://v3.football.api-sports.io";

const API_FOOTBALL_API_KEY =
  process.env["x-apisports-key"] ?? process.env.X_APISPORTS_KEY;

if (!API_FOOTBALL_API_KEY) {
  throw new Error(
    "Missing API-Football API key. Add x-apisports-key to your .env file.",
  );
}

export class ApiFootballError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiFootballError";
  }
}

export async function request<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean | null | undefined>,
): Promise<T> {
  const response = await axios.get<string>(
    `${API_FOOTBALL_BASE_URL}/${endpoint.replace(/^\/+/, "")}`,
    {
      headers: {
        "x-apisports-key": API_FOOTBALL_API_KEY,
      },
      params: Object.fromEntries(
        Object.entries(params ?? {}).filter(
          ([, value]) => value !== undefined && value !== null,
        ),
      ),
      responseType: "text",
      validateStatus: () => true,
    },
  );

  let body: unknown;

  try {
    body = JSON.parse(response.data);
  } catch {
    throw new ApiFootballError(
      "API-Football returned an invalid JSON response.",
      response.status,
    );
  }

  if (response.status < 200 || response.status >= 300) {
    throw new ApiFootballError(
      `API-Football request failed with status ${response.status}.`,
      response.status,
      body,
    );
  }

  if (
    response.status !== 204 &&
    body &&
    typeof body === "object" &&
    "errors" in body &&
    body.errors &&
    typeof body.errors === "object" &&
    Object.keys(body.errors).length > 0
  ) {
    throw new ApiFootballError(
      "API-Football returned an error.",
      response.status,
      body,
    );
  }

  return body as T;
}
