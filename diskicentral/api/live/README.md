# Server-side live games

`LiveGamePoller` maintains one shared upstream polling loop for all subscribers. The poller fetches the live fixture list once per cycle and fetches events/statistics once per watched fixture, then broadcasts each snapshot to every subscriber watching that fixture.

The default configuration polls once per minute, includes fixture events and statistics, keeps live odds disabled, and reserves part of the 7,500-request daily allowance through a 6,000-call live-service budget. Enable odds explicitly only when needed:

```ts
import { LiveGamePoller } from "@/api/live";

const livePoller = new LiveGamePoller({
  includeOdds: true,
  pollIntervalMs: 60_000,
});
```

The WebSocket adapter is transport-compatible and does not import a WebSocket package. With the `ws` package, a persistent Node server can mount it like this:

```ts
import { WebSocketServer } from "ws";
import { attachLiveGameSocket, LiveGamePoller } from "@/api/live";

const poller = new LiveGamePoller();
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket) => {
  attachLiveGameSocket(socket, poller);
});
```

Clients send JSON messages with either `{"type":"subscribe","fixtureId":123}` or `{"type":"unsubscribe","fixtureId":123}`. The server sends `subscribed`, `unsubscribed`, `snapshot`, `ended`, and `error` messages.

Create the poller once per persistent server process, not once per HTTP request or once per browser client. A serverless deployment that cannot keep a process alive should use a managed WebSocket service or a persistent worker instead.

## Local development

```bash
cp .env.example .env.local
cp .env.live.example .env.live
npm install
npm run dev
npm run live:dev
```

Set `NEXT_PUBLIC_LIVE_WS_URL=ws://localhost:8080` for the browser. Set `X_APISPORTS_KEY` in the live-service and Next.js environments.

## Message contract

Clients send:

```json
{"type":"subscribe","fixtureId":123}
{"type":"unsubscribe","fixtureId":123}
```

Servers send `subscribed`, `unsubscribed`, `snapshot`, `ended`, and `error`. Fixture IDs must be positive integers. Duplicate subscriptions on one connection are ignored by the adapter.

## Health and diagnostics

- `GET /health` or `GET /healthz` returns process, poller, connection and UTC budget-day status.
- Logs are structured key/value stdout/stderr messages and never include API keys.

The initial architecture is one persistent in-memory process. Subscriptions and polling state are local to that process. Do not scale horizontally until Redis or equivalent shared pub/sub and subscription coordination are added.
