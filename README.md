# Einkaufsliste (Buyke)

Eine einfache Einkaufslisten-App, entwickelt mit React (Frontend) und Express (Backend), die MongoDB als Datenbank verwendet.

## Features
- Einträge hinzufügen
- Einträge als "gekauft" markieren (Durchgestrichen & Checkmark)
- Einträge löschen
- Modernes UI mit Tailwind CSS und Lucide Icons

## Voraussetzungen
- Node.js (v14 oder höher empfohlen)
- MongoDB (lokal installiert und laufend auf Standardport 27017)

## Installation & Setup

### 1. Repository klonen / Projekt öffnen
Stellen Sie sicher, dass Sie sich im Projektverzeichnis befinden.

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

Sie müssen Backend und Frontend parallel starten.

### Backend starten
Das Backend verwendet nun native Node.js Environment-Files.
- **Development:** Nutzt `.env.development`
- **Production:** Nutzt `.env.production`

Öffnen Sie ein Terminal und führen Sie aus:

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

## Lizenz
ISC