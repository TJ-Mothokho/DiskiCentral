# Azure deployment

This repository is prepared for two independent Azure workloads:

- Next.js App Service: server-rendered application and HTTP API routes.
- Live WebSocket service: Azure Container Apps with one replica initially.

No Azure resources are provisioned or modified by this repository.

## Environment variables

Next.js App Service:

| Variable | Purpose |
|---|---|
| `X_APISPORTS_KEY` | Server-side API-Football credential |
| `NEXT_PUBLIC_API_URL` | Existing application API base URL |
| `NEXT_PUBLIC_LIVE_WS_URL` | Public `wss://` live-service URL |

Live Container App:

| Variable | Purpose |
|---|---|
| `LIVE_SERVICE_PORT` | Listening port, normally `8080` |
| `LIVE_POLL_INTERVAL_MS` | Live-fixture polling interval |
| `LIVE_API_BUDGET_DAILY` | Conservative process-local API-Football call budget |
| `LIVE_INCLUDE_STATISTICS` | `true` or `false` |
| `LIVE_INCLUDE_ODDS` | Keep `false` unless explicitly required |
| `LIVE_ALLOWED_ORIGINS` | Comma-separated exact browser origins |
| `LIVE_MAX_CONNECTIONS` | Maximum simultaneous connections |
| `LIVE_MAX_FIXTURES_PER_CONNECTION` | Maximum subscriptions per connection |
| `LIVE_MAX_MESSAGE_BYTES` | Maximum JSON message size |
| `X_APISPORTS_KEY` | Server-side API-Football credential |

The process-local live budget is not a global API-Football quota. The Next.js process and other consumers use the same provider account and do not share this counter.

## Local startup

```bash
cd diskicentral
npm install
npm run dev
npm run live:dev
```

Use `ws://localhost:8080` locally and `wss://` for production.

## Next.js App Service

1. Create a Linux App Service plan and Node.js web app.
2. Configure startup to `npm run start`.
3. Set `WEBSITE_NODE_DEFAULT_VERSION` to a supported Node 22 release if available in the target region.
4. Configure `X_APISPORTS_KEY` and public variables in App Service settings or through Key Vault references.
5. Deploy with `npm ci && npm run build && npm run start`.
6. Configure the App Service health check at `/` or a route that performs no external API dependency.

The match page renders from server-loaded fixture data and remains functional if the WebSocket URL is absent or unavailable.

## Container Apps live service

Build and push `diskicentral/Dockerfile.live` to Azure Container Registry.

```bash
az acr build --registry <acr-name> --image diskicentral-live:latest --file diskicentral/Dockerfile.live diskicentral
```

Create a Container App environment and app with:

- Ingress enabled on port `8080`
- Transport `http`, because WebSocket upgrades use HTTP ingress
- External ingress for browser access
- One replica (`minReplicas=1`, `maxReplicas=1`)
- Readiness/liveness probes against `/health`
- The environment variables listed above

No client requests need to reach Next.js through the live ingress.

## Key Vault and managed identity

Use Azure Key Vault references or managed identity to supply `X_APISPORTS_KEY`. Do not put API-Football credentials in `NEXT_PUBLIC_*` variables or container image build arguments.

For App Service and Container Apps:

1. Create secrets in Key Vault.
2. Enable system-assigned managed identity on the workload.
3. Grant that identity `Key Vault Secrets User`.
4. Reference the secret from App Service or Container Apps configuration.

The repository deliberately contains no Key Vault secret values or resource names.

## Azure DevOps

The included `azure-pipelines.yml` builds and tests Next.js and builds the live image. It requires human-supplied pipeline variables and a service connection.

Deployment stages are placeholders and must be completed only after the Azure subscription, App Service, ACR and Container App names are confirmed.

## Monitoring and troubleshooting

- Inspect Container App console logs for connection, origin rejection, subscription, upstream error and shutdown messages.
- Inspect App Service logs for server-rendering and API-Football failures.
- Use `/health` to verify poller status and process-local budget state.
- An origin rejected with close code `1008` indicates `LIVE_ALLOWED_ORIGINS` mismatch.
- Budget status `stoppedForBudget` means the live process has paused upstream polling for the UTC day; it will reset on the next poll after the UTC date changes.
- If the provider returns missing live fixtures, the poller waits through three cycles and performs an authoritative fixture lookup before publishing `ended`.

## Single-replica limitation

WebSocket connections and subscriptions are process-local. One browser reconnecting to a different replica may receive no subscription state. Initial production assumes one replica. Before horizontal scaling, add shared subscription registry/pub-sub and reconcile per-instance connection ownership. Redis and other infrastructure are intentionally not enabled initially.
