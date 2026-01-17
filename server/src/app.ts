// node modules
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import itemsRouter from './routes/items';
import listsRouter from './routes/lists';
// middleware
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
// config
import config from './config';

const app = express();

// CORS configuration — allow requests from configured frontend origins
const allowedOrigins = (config.FRONTEND_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim());
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // allow requests with no origin (e.g., curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
    return callback(new Error('CORS policy violation'));
  },
  credentials: true,
};

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/items', itemsRouter);
app.use('/lists', listsRouter);

// Health
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Metrics / DB health
import { getDbStatus } from './utils/database';
app.get('/metrics', (_req, res) => {
  res.json({ status: 'ok', db: getDbStatus() });
});

// Error handler (global)
app.use(errorHandler);

export default app;
