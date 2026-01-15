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
Stellen Sie sicher, dass Ihre lokale MongoDB-Instanz läuft (`mongod` oder als Service).

### Frontend starten

Öffnen Sie ein zweites Terminal im Hauptverzeichnis und führen Sie aus:

```bash
npm run dev
```

Das Frontend ist standardmäßig unter `http://localhost:5173` erreichbar.

## Technologien

- **Frontend:** React, TypeScript, Tailwind CSS, Lucide React, Axios, Vite
- **Backend:** Node.js (native --watch and --env-file), Express, TypeScript, Mongoose
- **Datenbank:** MongoDB

## Frontend environment variables

The frontend uses Vite. Client-facing environment variables must be prefixed with `VITE_`.

Create a local `.env` file (do not commit it) or copy `.env.example` and set the following variables:

```
VITE_APP_TITLE=Buyke
VITE_APP_SLOGAN=just buy it!
```

- `VITE_APP_TITLE` — displayed app title (e.g., `Buyke`)
- `VITE_APP_SLOGAN` — slogan text (e.g., `just buy it!`)

When deploying, set these variables in your hosting environment so they are available during the build.

## Lizenz

MIT
