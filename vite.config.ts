import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // ✅ Simple build, no complex options
    chunkSizeWarningLimit: 2000,
    minify: false,
    sourcemap: false,
    target: 'es2020',
  },
});
