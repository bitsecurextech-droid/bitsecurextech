import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from './lib/router';
import { AuthProvider } from './lib/auth';
import { ThemeProvider } from './lib/useReveal';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider>
          <App />
        </RouterProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
