import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Skip minification to speed up build
    minify: false,
    // Increase chunk size limit
    chunkSizeWarningLimit: 2000,
    // No source maps
    sourcemap: false,
    // Target modern browsers
    target: 'es2020',
    rollupOptions: {
      output: {
        // Simple output format
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
        // Manual chunks to reduce memory
        manualChunks: undefined,
      },
    },
  },
  // Optimize deps
  optimizeDeps: {
    include: ['react', 'react-dom'],
    esbuildOptions: {
      target: 'es2020',
    },
  },
  // Use esbuild for faster builds
  esbuild: {
    logLevel: 'error',
  },
});
