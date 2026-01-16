import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Allow overriding the dev proxy target with VITE_API_URL (useful for LAN/dev setups)
const proxyTarget = process.env.VITE_API_URL || 'http://localhost:5000';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy /items to local backend in development to avoid CORS
      '/items': {
        target: proxyTarget,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
