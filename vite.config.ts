import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // ✅ Disable manual chunks to reduce complexity
    rollupOptions: {
      output: {
        // Simple output without manual chunks
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
    // ✅ Increase chunk size limit
    chunkSizeWarningLimit: 2000,
    // ✅ Disable minification for faster build
    minify: false,
    // ✅ No source maps
    sourcemap: false,
    // ✅ Target modern browsers
    target: 'es2020',
  },
  // ✅ Simplify optimize deps
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
