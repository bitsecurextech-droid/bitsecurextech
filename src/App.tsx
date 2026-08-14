import { Component, ReactNode } from 'react';
import { ThemeProvider } from './lib/useReveal';
import { AuthProvider } from './lib/auth';
import { RouterProvider } from './lib/router';
import { AppRoutes } from './AppRoutes';
import { Background } from './components/Background';
import { ParticleBackground } from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AIChat } from './components/AIChat';
import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';

// ============================================================
// ERROR BOUNDARY
// ============================================================
class ErrorBoundary extends Component<{ children: ReactNode }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.error('🔥 Error:', error);
    console.error('📂 Stack:', info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-navy-950 text-white p-6">
          <div className="text-center max-w-2xl">
            <h1 className="text-2xl font-bold text-red-400">Something went wrong</h1>
            <p className="mt-2 text-slate-400">Please refresh the page or try again later.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-6 bg-blue-600 px-6 py-2.5 rounded-lg hover:bg-blue-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ============================================================
// MAIN APP
// ============================================================
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider>
            <div className="relative min-h-screen">
              <LoadingScreen />
              <Background />
              <ParticleBackground />
              <CustomCursor />
              <ScrollProgress />
              <Navbar />
              <main>
                <AppRoutes />
              </main>
              <Footer />
              <AIChat />
            </div>
          </RouterProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
