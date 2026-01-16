# Einkaufsliste (Buyke - Just buy it!)

Eine einfache React-Einkaufslisten-App, welche Express im Backend, sowie MongoDB als persistente Lösung zur Datenspeicherung verwendet.

## Features

- Einträge hinzufügen
- Einträge als "gekauft" markieren (Durchgestrichen & Checkmark)
- Einträge löschen
- Modernes UI mit Lucide Icons (opt.: Tailwind CSS)

## Voraussetzungen

- Node.js (v14 oder höher empfohlen)
- MongoDB (lokal installiert und laufend auf Standardport 27017)

## Installation & Setup

### 1. Repository klonen / Projekt öffnen

Wir stellen sicher, dass wir uns im Projektverzeichnis befinden.

### 2. Backend einrichten

Das Backend befindet sich im Ordner `server`.

```bash
cd server
npm install
```

### 3. Frontend einrichten

Das Frontend befindet sich im Hauptverzeichnis.

```bash
# Falls noch nicht geschehen, im Hauptverzeichnis:
npm install
```

## App starten

Backend und Frontend werden parallel gestartet.

### Backend starten

Wir nutzen die native Environment-File Eindung von Node.js (>V20!) .

- **Development:** Nutzt `.env.development`
- **Production:** Nutzt `.env.production`

Im Terminal führen wir aus:

```bash
cd server
npm run dev
```

Der Server läuft standardmäßig auf `http://localhost:5000`.
Stellen Sie sicher, dass Ihre lokale MongoDB-Instanz läuft (`mongod` oder als Service`).

---

## Remote testing & health checks ✅

You can verify the server is reachable from another device on your network with a simple HTTP health check:

- Using curl:

```bash
curl http://<host-ip>:5000/health
```

Expected response: `{"status":"ok"}`

- Using the packaged health-check script:

```bash
cd server
npm run health -- http://<host-ip>:5000/health
```

(The script accepts an optional URL argument; omit it to use `http://localhost:5000/health`.)

Notes:

- If the request fails, make sure the server process is running and the host's firewall allows inbound connections to port **5000**.
- Ensure the backend environment variable `FRONTEND_ORIGINS` includes the origin of the frontend you are using (for example `http://192.168.1.10:5173`) so that browser requests aren't blocked by CORS.
- To make the Vite dev server accessible remotely, start it with `npm run dev -- --host` or set `host: true` in `vite.config.ts`.

---

### Frontend starten

Öffnen Sie ein zweites Terminal im Hauptverzeichnis und führen Sie aus:

```bash
npm run dev
```

Das Frontend ist standardmäßig unter `http://localhost:5173` erreichbar.

## Technologien

- **Frontend:** React, TypeScript, pure CSS (Tailwind outfactored for showcasing purposes!), Lucide React, Axios, Vite
- **Backend:** Node.js (native --watch and --env-file), Express, TypeScript, Mongoose
- **Datenbank:** MongoDB

## Frontend environment variables

The frontend uses Vite. Client-facing environment variables must be prefixed with `VITE_`.

Create a local `.env` file (do not commit it) or copy `.env.example` and set the following variables:

```
VITE_APP_TITLE=Buyke
VITE_APP_SLOGAN=just buy it!
VITE_API_URL=https://api.example.com
```

- `VITE_APP_TITLE` — displayed app title (e.g., `Buyke` or `BlickBuy`)
- `VITE_APP_SLOGAN` — slogan text (e.g., `just buy it!`)
- `VITE_API_URL` — base URL of the backend API your app should talk to (e.g., `https://api.example.com`). If not set the app will default to `http://localhost:5000` for local development.

- If your backend is hosted separately, make sure the backend environment variable `FRONTEND_ORIGINS` includes the origin(s) of your frontend (e.g., `http://example.com` or `http://192.168.1.10:5173`) so browser requests are not blocked by CORS.

When deploying, set these variables in your hosting environment so they are available during the build. Ensure the backend sets CORS to allow requests from your frontend origin if hosted separately.

## Lizenz

MIT
