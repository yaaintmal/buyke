# Server — Buyke

This folder contains the Express + TypeScript backend for Buyke.

## Environment variables

Create a `.env` (or `.env.development`, `.env.production`) file in the `server` folder; you can copy `.env.example` as a starting point.

Required (in production):

- `MONGO_URI` — MongoDB connection string
- `PORT` — port to listen on (defaults to `5000`)

Optional / recommended:

- `FRONTEND_ORIGINS` — comma-separated origin list allowed for CORS (default `http://localhost:5173`)
- `NODE_ENV` — `development|production|test` (defaults to `development`)
- `DEBUG` — debug namespace for debugging
- `RATE_LIMIT_WINDOW_MS` — Optional; override the rate limiter window in milliseconds (default: 900000, i.e. 15 minutes)
- `RATE_LIMIT_MAX` — Optional; general max requests per window (default: 200)
- `RATE_LIMIT_MAX_WRITE` — Optional; stricter max for write operations (POST/PUT/DELETE) per window (default: 60)

Test-only overrides (useful for fast integration tests):

- `RATE_LIMIT_MAX_TEST` — Number of allowed requests during tests for general endpoints (default small number used when `NODE_ENV=test`).
- `RATE_LIMIT_MAX_TEST_WRITE` — Number of allowed write requests during tests (default small number used when `NODE_ENV=test`).

## Health check

A simple health-check script is included for convenience.

Run it locally:

```bash
cd server
npm run health # checks http://localhost:5000/health
```

Or pass an explicit URL:

```bash
npm run health -- http://192.168.1.10:5000/health
```

Expected response: `{"status":"ok"}`.

## Remote dev notes

- If you want to access the frontend over the LAN, start Vite with `--host` or set `host: true` in `vite.config.ts`.
- Ensure `FRONTEND_ORIGINS` contains the origin(s) of your frontend (for example `http://192.168.1.10:5173`).
