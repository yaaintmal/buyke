import http from 'http';
import mongoose from 'mongoose';
import app from './app';

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
  await mongoose.connect(MONGO_URI);

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🛒 Server is running on port ${PORT} 🛍️`);
    console.log(`🛍️ MONGO_URI=${redactMongoUri(MONGO_URI)} 🛒`);
  });

  const gracefulShutdown = async (signal: string) => {
    console.log(`Received ${signal}, shutting down...`);
    server.close(() => console.log('HTTP server closed'));
    try {
      await mongoose.connection.close();
      console.log('Mongo connection closed');
    } catch (err) {
      console.error('Error closing Mongo connection', err);
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
    console.error('Failed to start server', err);
    process.exit(1);
  });
}
