# Buyke - Smart Shopping List (React/Express/TS)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Express](https://img.shields.io/badge/Express-4-green)

[🇺🇸 English Version](#english-version) | [🇩🇪 Deutsche Version](#deutsche-version)

---

<a name="english-version"></a>

## 🇺🇸 English Version

### About The Project

**Buyke** is a modern, full-stack shopping list application designed to demonstrate robust architectural patterns, type safety, and clean user experience. It solves the common problem of synchronizing shopping needs across a household with a focus on usability (aliases, normalized units) and reliability.

Built as a portfolio showcase, this project emphasizes **Clean Code** principles, **Separation of Concerns**, and strict **TypeScript** typing across the full stack.

### ✨ Key Features

- **Smart Unit System**: normalized units (e.g., input "schachtel", "bowl" -> automatically converts to standardized `pcs` or valid containers like `crate` or `pack`).
- **Real-time Synchronization**: Frontend updates reflect backend state immediately.
- **Bilingual Interface**: Fully internationalized (i18n) for English and German.
- **Robust Validation**: `Zod` schemas ensure data integrity on the server.
- **Shared Logic**: Shared constants and types between Client and Server to prevent contract drift.
- **Modern UI**: Clean, responsive interface with loading states and error handling.

### 🛠 Tech Stack & Architecture

#### Frontend (Client)

- **Framework**: React 19 with Vite (Fast HMR)
- **Language**: TypeScript (Strict Mode)
- **State Management**: React Context API (`useShoppingList`) for global state.
- **Styling**: Pure CSS with CSS Modules approach for component isolation.
- **Testing**: Vitest for unit and hook testing.
- **Internationalization**: Custom `i18n` context.

#### Backend (Server)

- **Runtime**: Node.js & Express
- **Database**: MongoDB (via Mongoose ODM)
- **Validation**: Zod (Runtime schema validation)
- **Testing**: Jest & Supertest for Integration tests.
- **Security**: Rate limiting, Helmet (headers), CORS configured.

#### 🏗 Architectural Decisions

1. **Monorepo-like Structure**: Both client and server live in the same repo to easily share types and logic (`shared/units.ts`), ensuring the frontend payload always matches backend expectations.
2. **Controller-Service-Repository Pattern**: The backend separates concerns:
   - _Routes_: Define endpoints.
   - _Controllers_: Handle HTTP req/res and validation.
   - _Services_: Business logic (normalization, DB interactions).
   - _Models_: Data structure definitions.
3. **Optimistic UI (Partial)**: The UI is designed to feel snappy, though currently relies on strictly consistent server responses for the "single source of truth".

### 🚀 Getting Started

#### Prerequisites

- Node.js (v20+)
- MongoDB (Running locally or via Atlas connection string)

#### Installation

1. **Clone & Install Dependencies**

   ```bash
   # Root (Frontend)
   npm install

   # Server
   cd server
   npm install
   ```

2. **Configuration**
   - Frontend: Configured in `src/lib/apiClient.ts`, defaults to `http://localhost:5000`.
   - Backend: Default assumes MongoDB at `mongodb://localhost:27017/buyke` and runs on port 5000.

3. **Running the App**

   ```bash
   # Terminal 1: Start Backend
   cd server
   npm run dev

   # Terminal 2: Start Frontend
   npm run dev
   ```

### 🧪 Quality Assurance

- **Frontend Tests**: `npm run test` (in root) - Validates hooks and components.
- **Backend Tests**: `npm test` (in server/) - Integration tests for API endpoints.

---

<a name="deutsche-version"></a>

## 🇩🇪 Deutsche Version

### Über das Projekt

**Buyke** ist eine moderne Full-Stack-Einkaufslisten-App, entwickelt als Showcase für robuste Software-Architektur, Typsicherheit und "Clean Code". Sie ermöglicht das synchrone Verwalten von Einkäufen und legt besonderen Wert auf intelligente Dateneingabe.

Das Projekt dient als Referenz für **professionelle Webentwicklung** mit dem MERN-Stack (MongoDB, Express, React, Node) und striktem TypeScript.

### ✨ Hauptfunktionen

- **Intelligentes Einheitensystem**: Automatische Normalisierung von Eingaben (z.B. wird "Schale" oder "Box" zu `Stk`, "Kasten" zu `Kiste`).
- **Echtzeit-ähnliche UX**: Schnelles Feedback und Synchronisation.
- **Mehrsprachigkeit**: Vollständige Unterstützung für Deutsch und Englisch.
- **Strikte Validierung**: `Zod` garantiert, dass nur valide Daten in die Datenbank gelangen.
- **Geteilte Logik**: Konstanten für Einheiten werden zwischen Server und Client geteilt, um Inkonsistenzen zu vermeiden.

### 🛠 Tech Stack & Architektur

#### Frontend (Client)

- **React 19 & Vite**: Schnelle Performance und modernes Tooling.
- **TypeScript**: Strenge Typisierung für wartbaren Code.
- **Context API**: Zustandsverwaltung ohne Overhead (Redux etc. nur bei Bedarf).
- **Vitest**: Modernes Testing-Framework für React-Komponenten.

#### Backend (Server)

- **Express & Node.js**: Solide REST API Struktur.
- **Mongoose & MongoDB**: Flexibles Datenmodell für schemalose Dokumente mit Schema-Enforcement durch Mongoose.
- **Zod**: Validierung der API-Payloads zur Laufzeit.
- **Jest & Supertest**: Umfassende Integrationstests der Endpunkte.

#### 🏗 Design-Entscheidungen

1. **Shared Code**: Die Datei `shared/units.ts` ist die _Single Source of Truth_ für Einheiten. Änderungen dort wirken sich auf Validierung (Backend) und Anzeige (Frontend) gleichermaßen aus.
2. **Schichtenarchitektur**: Klare Trennung im Backend (Route -> Controller -> Service -> Model) erleichtert Wartbarkeit und Testing.
3. **No UI-Lib Dependency**: Bewusster Verzicht auf schwere UI-Frameworks (MUI, Bootstrap) zugunsten von eigenem CSS, um grundlegendes CSS-Verständnis und Performance zu demonstrieren.

### 🚀 Startanleitung

1. **Installation**

   ```bash
   npm install       # Frontend
   cd server && npm install  # Backend
   ```

2. **Starten**

   ```bash
   # Backend
   cd server
   npm run dev

   # Frontend
   npm run dev
   ```

### 🛡 Sicherheit

- **Rate Limiting**: Verhindert Missbrauch der API.
- **Input Sanitization**: Durch Mongoose und Zod werden Injection-Angriffe erschwert.
- **Helmet**: Setzt wichtige HTTP-Security-Header.

---

**Author**: Malone  
**License**: MIT
