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
          // ✅ Split tiptap separately
          'tiptap': ['@tiptap/react', '@tiptap/starter-kit', '@tiptap/extension-image', '@tiptap/extension-youtube'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    sourcemap: false,
    cssCodeSplit: true,
    target: 'es2020',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@supabase/supabase-js', 'lucide-react'],
  },
});
