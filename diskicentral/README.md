# DiskiCentral

This is the Next.js application for DiskiCentral. Production deployment is prepared for Azure App Service and a separate Azure Container Apps live WebSocket service.

## Local development

```bash
npm install
npm run dev
npm run live:dev
```

Open `http://localhost:3000`. Copy `.env.example` to `.env.local` and `.env.live.example` to `.env.live`.

Required server-side configuration:

- `X_APISPORTS_KEY`
- `NEXT_PUBLIC_API_URL` when using the existing article/auth API
- `NEXT_PUBLIC_LIVE_WS_URL` to enable browser live updates

Do not use `NEXT_PUBLIC_` for API-Football credentials.

## Live service

The persistent WebSocket process starts with `npm run live:start`. It listens on `LIVE_SERVICE_PORT` (default `8080`) and exposes `/health` and `/healthz`. See [api/live/README.md](./api/live/README.md) and [docs/azure-deployment.md](./docs/azure-deployment.md).
