// Use require() cautiously to avoid ESM/CJS interop issues in the test runner
let rest: any | undefined;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const msw = require('msw');
  rest = msw.rest;
} catch (err) {
  // msw may not be resolvable in some environments; fall back to undefined and export empty handlers
  rest = undefined;
}

const API_BASE = process.env.VITE_API_URL || '';

export const handlers = rest
  ? [
      // GET /items
      rest.get(`${API_BASE}/items`, (req: any, res: any, ctx: any) => {
        return res(
          ctx.status(200),
          ctx.json([
            { _id: '1', name: 'Apples', bought: false, createdAt: new Date().toISOString() },
            { _id: '2', name: 'Bananas', bought: true, createdAt: new Date().toISOString() },
          ]),
        );
      }),
    ]
  : [];
