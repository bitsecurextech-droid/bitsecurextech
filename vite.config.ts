import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js'],
          ui: ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: false, // ✅ Disable minification for faster build
    sourcemap: false,
    cssCodeSplit: true,
    target: 'es2020',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@supabase/supabase-js', 'lucide-react'],
  },
});
