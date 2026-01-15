import express from 'express';
import cors from 'cors';
import itemsRouter from './routes/items';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/items', itemsRouter);

// Health
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export default app;
