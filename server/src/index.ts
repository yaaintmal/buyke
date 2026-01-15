import { start } from './server';

// Start the application when executed directly
if (require.main === module) {
  start().catch((err) => {
    console.error('Failed to start server', err);
    process.exit(1);
  });
}
