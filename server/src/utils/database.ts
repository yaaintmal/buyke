import mongoose from 'mongoose';
import { logger } from './logger';
import config from '../config';

export async function connectWithRetry(maxRetries = 3, baseDelay = 500): Promise<void> {
  const uri = config.MONGO_URI;

  if (!uri) {
    logger.warn('MONGO_URI is not set — skipping MongoDB connection (likely test environment)');
    return;
  }

  let attempt = 0;
  while (true) {
    try {
      await mongoose.connect(uri);
      logger.success('Connected to MongoDB');
      return;
    } catch (err) {
      attempt += 1;
      if (attempt > maxRetries) {
        logger.error(`Failed to connect to MongoDB after ${maxRetries} attempts`, err);
        throw err;
      }

      const delay = baseDelay * Math.pow(2, attempt - 1);
      logger.warn(
        `MongoDB connection failed (attempt ${attempt}/${maxRetries}). Retrying in ${delay}ms...`,
      );
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

export function getDbStatus(): 'connected' | 'disconnected' | 'connecting' | 'unknown' {
  const state = mongoose.connection.readyState;
  // mongoose.readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  switch (state) {
    case 0:
      return 'disconnected';
    case 1:
      return 'connected';
    case 2:
      return 'connecting';
    case 3:
      return 'unknown';
    default:
      return 'unknown';
  }
}
