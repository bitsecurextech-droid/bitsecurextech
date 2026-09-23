import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'supabase': ['@supabase/supabase-js'],
          'ui': ['lucide-react'],
          'tiptap': ['@tiptap/react', '@tiptap/starter-kit'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    sourcemap: true,          // ✅ CHANGED: was false — enables source maps for debugging
    cssCodeSplit: true,
    target: 'es2020',
    reportCompressedSize: false, // ✅ ADDED: speeds up builds
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@supabase/supabase-js', 'lucide-react'],
  },
});
