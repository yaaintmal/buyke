# Buyke Refactoring Roadmap (Updated)

**Last updated**: 16. Januar 2026
**Status**: Implementation Phase (Foundation Complete)
**Priorities**: Security, Reliability, and UX Polish

---

## 🟢 Completed Tasks (Foundation Phase)

- **Backend Validation**: Zod schemas implemented for all item endpoints.
- **Backend Error Handling**: Centralized error middleware with formatted responses.
- **Backend Config**: Strict env validation with Zod (`config.ts`).
- **Backend Security**: `helmet` and configurable CORS policies added.
- **Frontend Architecture**: Custom hooks (`useShoppingList`, `useUIState`) extracted.
- **Frontend Optimization**: `DockItem` memoized properly.
- **Infra**: Health check script, LAN network binding, and environment-driven proxy configuration.
- **Backend Logging**: Implemented structured logger with `chalk` and request logging middleware.
- **Frontend Resilience**: Implemented API retry logic with `axios-retry` (exponential backoff).

---

## 🚀 Outstanding Tasks (Prioritized)

These tasks are pending and ordered by impact/priority.

### Tier 1: Resilience & UX (High Impact)

#### 4.2 [Frontend] Toast Notifications — **Completed (partial)**

- **Goal**: Replace blocking `alert()`/`window.confirm()` with non-blocking toasts (`react-hot-toast` or similar).
- **Why**: "Confirm deletion" dialogs break flow; toasts are modern and mobile-friendly.

- **Notes**: Added `react-hot-toast`, integrated `<Toaster/>` in `src/App.tsx`, replaced factory reset confirm/alerts in `src/components/Settings.tsx` with a non-blocking confirmation toast and success/error toasts. Consider replacing any additional `alert()`/`window.confirm()` usages (if present) and adding tests.

#### 3.2 [Backend] Database Connection Resilience — **Completed (partial)**

- **Goal**: Implement connection retry logic with exponential backoff in `database.ts`.
- **Why**: The app should recover if the DB restarts or network blips, rather than crashing immediately.

- **Notes**: Added `server/src/utils/database.ts` with `connectWithRetry()` (3 retries, exponential backoff) and `getDbStatus()`. Replaced `mongoose.connect` with `connectWithRetry()` in `server/src/server.ts` and exposed `/metrics` endpoint in `server/src/app.ts` returning DB status. Consider adding integration test or CI health-check that queries `/metrics` after dependent services start.

### Tier 2: Security & Testing (Medium Impact)

#### 3.4 [Backend] Rate Limiting

- **Goal**: Add `express-rate-limit` to `/items` routes.
- **Why**: Prevents abuse and simple DoS attacks on exposed API endpoints.

#### 4.5 [Frontend] Testing Strategy

- **Goal**: Add MSW (Mock Service Worker) for network-layer testing.
- **Why**: Test `useShoppingList` and error states without a running backend.

### Tier 3: Polish & Refactoring (Low Impact)

#### 4.3 [Frontend] Centralized Theme System

- **Goal**: Move CSS variables from `index.css` to a structured theme object/styled solution or consolidated CSS map.
- **Why**: Makes switching themes or adding a 3rd "High Contrast" theme easier.

#### 4.4 [Frontend] Loading Skeletons

- **Goal**: Replace the simple "Loading..." text with skeleton UI (gray bars/rectangles).
- **Why**: Perceived performance improvement.

#### 5.1 [Ops] CI/CD Pipeline Configuration

- **Goal**: Add GitHub Actions workflow for linting, testing, and building.
- **Why**: Automate the checks we are currently running manually.

---

## 📋 Suggested Next Steps

1.  **Frontend**: Implement **Toast Notifications** (Task 4.2) to immediately improve the mobile experience.
2.  **Backend**: Add **Structured Logging** (Task 3.1) to prepare for any future debugging needs.
3.  **Frontend**: Add **API Retry Logic** (Task 4.1) to harden the app against spotty Wi-Fi.
