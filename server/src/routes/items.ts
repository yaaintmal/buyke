import { Router } from 'express';
import * as controller from '../controllers/itemsController';

const router = Router();

import { generalLimiter, strictLimiter } from '../middleware/rateLimiter';

// apply a general limiter to all /items requests
router.use(generalLimiter);

router.get('/', controller.getItems); // supports optional ?listId= query param
// stricter limits for write operations
router.post('/', strictLimiter, controller.createItem);
router.put('/:id', strictLimiter, controller.updateItem);
router.delete('/', strictLimiter, controller.deleteAllItems);
router.delete('/:id', strictLimiter, controller.deleteItem);

// Test-only lightweight endpoint that avoids DB access so we can test middleware (rate limiting) reliably in CI
if (process.env.NODE_ENV === 'test') {
  router.get('/__ping', (_req, res) => res.json({ ok: true }));
}
export default router;
