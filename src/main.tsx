import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from './lib/router';
import { AuthProvider } from './lib/auth';
import { ThemeProvider } from './lib/useReveal';
import './index.css';

// ✅ LAZY LOAD APP
const App = lazy(() => import('./App'));

// ✅ LOADING FALLBACK
const LoadingFallback = () => (
  <div className="flex h-screen items-center justify-center bg-navy-950">
    <div className="text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-cyber-500 border-t-transparent" />
      <p className="mt-4 text-sm text-slate-400">Loading...</p>
    </div>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider>
          <Suspense fallback={<LoadingFallback />}>
            <App />
          </Suspense>
        </RouterProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
