import http from 'http';
import mongoose from 'mongoose';
import app from './app';
import { logger } from './utils/logger';
import { connectWithRetry } from './utils/database';

import config from './config';

const PORT = config.PORT;
const MONGO_URI = config.MONGO_URI;

const redactMongoUri = (uri: string) => {
  try {
    const lastAt = uri.lastIndexOf('@');
    if (lastAt === -1) return uri;
    const protocolEnd = uri.indexOf('://');
    const start = protocolEnd !== -1 ? protocolEnd + 3 : 0;
    return uri.slice(0, start) + '*****@' + uri.slice(lastAt + 1);
  } catch {
    return 'redacted';
  }
};

export async function start(): Promise<http.Server> {
  await connectWithRetry();

  const server = app.listen(PORT, '0.0.0.0', () => {
    logger.success(`🛒 Server is running on port ${PORT} 🛍️`);
    logger.info(`🛍️ MONGO_URI=${redactMongoUri(MONGO_URI)} 🛒`);
  });

  const gracefulShutdown = async (signal: string) => {
    logger.info(`Received ${signal}, shutting down...`);
    server.close(() => logger.info('HTTP server closed'));
    try {
      await mongoose.connection.close();
      logger.info('Mongo connection closed');
    } catch (err) {
      logger.error('Error closing Mongo connection', err);
    }
    process.exit(0);
  };

  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

  return server;
}

// If this file is executed directly, start the server
if (require.main === module) {
  start().catch((err) => {
    logger.error('Failed to start server', err);
    process.exit(1);
  });
}
