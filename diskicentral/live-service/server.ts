import http from "node:http";
import { WebSocketServer, type WebSocket } from "ws";
import {
  LiveGamePoller,
  attachLiveGameSocket,
} from "../api/live";

function numberFromEnv(name: string, fallback: number): number {
  const value = Number(process.env[name]);
  return Number.isInteger(value) && value > 0 ? value : fallback;
}

const port = numberFromEnv("LIVE_SERVICE_PORT", 8080);
const pollIntervalMs = numberFromEnv("LIVE_POLL_INTERVAL_MS", 60_000);
const maxApiCallsPerDay = numberFromEnv("LIVE_API_BUDGET_DAILY", 1_000);
const maxConnections = numberFromEnv("LIVE_MAX_CONNECTIONS", 500);
const maxSubscriptions = numberFromEnv("LIVE_MAX_FIXTURES_PER_CONNECTION", 10);
const allowedOrigins = (process.env.LIVE_ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const poller = new LiveGamePoller({
  pollIntervalMs,
  includeStatistics: process.env.LIVE_INCLUDE_STATISTICS !== "false",
  includeOdds: process.env.LIVE_INCLUDE_ODDS === "true",
  maxApiCallsPerDay,
});

const server = http.createServer((request, response) => {
  if (request.url === "/health" || request.url === "/healthz") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({
      status: "ok",
      poller: poller.status,
      connections: wss?.clients.size ?? 0,
      budgetDayUtc: new Date().toISOString().slice(0, 10),
    }));
    return;
  }
  response.writeHead(404);
  response.end();
});

const wss = new WebSocketServer({
  server,
  maxPayload: numberFromEnv("LIVE_MAX_MESSAGE_BYTES", 8_192),
});

let activeConnections = 0;

wss.on("connection", (socket: WebSocket, request) => {
  if (activeConnections >= maxConnections) {
    console.warn("Live WebSocket connection rejected: connection limit reached");
    socket.close(1013, "Connection limit reached");
    return;
  }
  const origin = request.headers.origin;
  if (allowedOrigins.length > 0 && (!origin || !allowedOrigins.includes(origin))) {
    console.warn("Live WebSocket connection rejected: untrusted origin");
    socket.close(1008, "Untrusted origin");
    return;
  }
  activeConnections += 1;

  console.log("Live WebSocket connected", { origin: origin ?? "none" });
  const cleanup = attachLiveGameSocket(socket, poller, {
    maxSubscriptions,
  });
  socket.on("close", () => {
    activeConnections -= 1;
    cleanup();
    console.log("Live WebSocket disconnected");
  });
  socket.on("error", (error) => {
    console.error("Live WebSocket error", { message: error.message });
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log("Live WebSocket service listening", { port, pollIntervalMs });
});

let shuttingDown = false;
function shutdown(signal: string): void {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log("Live service shutting down", { signal });
  poller.stop();
  wss.close(() => {
    server.close(() => process.exit(0));
  });
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
