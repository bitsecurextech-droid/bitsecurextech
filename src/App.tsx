import { Component, ReactNode, Suspense } from 'react';
import { useRoute } from './lib/router';
import { useAuth } from './lib/auth';
import { Background } from './components/Background';
import { ParticleBackground } from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AIChat } from './components/AIChat';
import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';

// IMPORT ALL PAGES DIRECTLY
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { OffersPage } from './pages/OffersPage';
import { CybersecurityPage } from './pages/CybersecurityPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { BlogPage } from './pages/BlogPage';
import { ToolsPage } from './pages/ToolsPage';
import { ContactPage } from './pages/ContactPage';
import { PortalPage } from './pages/PortalPage';
import AdminPage from './pages/AdminPage';
import { AboutPage } from './pages/AboutPage';
import { PricingPage } from './pages/PricingPage';
import { DigitalEcosystemPage } from './pages/DigitalEcosystemPage';

import { WebDevelopmentPage } from './pages/WebDevelopmentPage';
import { SoftwareSolutionsPage } from './pages/SoftwareSolutionsPage';
import { AIAutomationPage } from './pages/AIAutomationPage';
import { CloudSolutionsPage } from './pages/CloudSolutionsPage';
import { MobileAppDevelopmentPage } from './pages/MobileAppDevelopmentPage';
import { DigitalMarketingPage } from './pages/DigitalMarketingPage';
import { SEOPage } from './pages/SEOPage';
import { SocialMediaMarketingPage } from './pages/SocialMediaMarketingPage';
import { ContentMarketingPage } from './pages/ContentMarketingPage';
import { PenetrationTestingPage } from './pages/PenetrationTestingPage';
import { EcommerceDevelopmentPage } from './pages/EcommerceDevelopmentPage';
import { CareersPage } from './pages/CareersPage';
import { PartnersPage } from './pages/PartnersPage';
import { ReportsPage } from './pages/ReportsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { DisclosurePage } from './pages/DisclosurePage';
import { BugBountyPage } from './pages/BugBountyPage';
import { CalculatorPage } from './pages/CalculatorPage';

// ============================================================
// 🚨 GLOBAL ERROR BOUNDARY (Prints errors to console)
// ============================================================
class ErrorBoundary extends Component<{ children: ReactNode }> {
  state = { hasError: false, error: null as any };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    console.error("🚨 GLOBAL CRASH DETECTED:", error);
    console.error("📂 Component Stack:", info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-navy-950 p-6 text-center">
          <div className="max-w-2xl rounded-2xl border border-red-500/30 bg-red-500/10 p-8">
            <h1 className="text-2xl font-bold text-red-400">App Crash Detected</h1>
            <p className="mt-2 text-sm text-slate-400">
              An error occurred while rendering the page. Check your browser console (F12 - Console) to see the exact error.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-6 rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white hover:bg-blue-700"
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
  useAuth();
  const route = useRoute();
  const path = route.path;

  // ✅ This is the CRITICAL FIX: It reads the hash path correctly
  let PageComponent = HomePage;

  // Home
  if (path === '/') PageComponent = HomePage;

  // Services
  else if (path === '/services') PageComponent = ServicesPage;
  else if (path.startsWith('/services/')) PageComponent = ServiceDetailPage;

  // Marketing & Tech & Dropdown Pages
  else if (path === '/web-development') PageComponent = WebDevelopmentPage;
  else if (path === '/software-solutions') PageComponent = SoftwareSolutionsPage;
  else if (path === '/ai-automation') PageComponent = AIAutomationPage;
  else if (path === '/cloud-solutions') PageComponent = CloudSolutionsPage;
  else if (path === '/mobile-app-development') PageComponent = MobileAppDevelopmentPage;
  else if (path === '/digital-marketing') PageComponent = DigitalMarketingPage;
  else if (path === '/seo') PageComponent = SEOPage;
  else if (path === '/social-media-marketing') PageComponent = SocialMediaMarketingPage;
  else if (path === '/content-marketing') PageComponent = ContentMarketingPage;
  else if (path === '/cybersecurity') PageComponent = CybersecurityPage;
  else if (path === '/penetration-testing') PageComponent = PenetrationTestingPage;
  else if (path === '/ecommerce-development') PageComponent = EcommerceDevelopmentPage;
  else if (path === '/ecosystem') PageComponent = DigitalEcosystemPage;

  // Standard Pages
  else if (path === '/offers') PageComponent = OffersPage;
  else if (path === '/portfolio') PageComponent = PortfolioPage;
  else if (path === '/case-studies') PageComponent = CaseStudyPage;
  else if (path === '/blog') PageComponent = BlogPage;
  else if (path === '/tools') PageComponent = ToolsPage;
  else if (path === '/contact') PageComponent = ContactPage;
  else if (path === '/portal') PageComponent = PortalPage;
  else if (path === '/admin') PageComponent = AdminPage;
  else if (path === '/about') PageComponent = AboutPage;
  else if (path === '/pricing') PageComponent = PricingPage;
  else if (path === '/careers') PageComponent = CareersPage;
  else if (path === '/partners') PageComponent = PartnersPage;
  else if (path === '/reports') PageComponent = ReportsPage;
  else if (path === '/reviews') PageComponent = ReviewsPage;
  else if (path === '/disclosure') PageComponent = DisclosurePage;
  else if (path === '/bug-bounty') PageComponent = BugBountyPage;
  else if (path === '/calculator') PageComponent = CalculatorPage;

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen">
        <LoadingScreen />
        <Background />
        <ParticleBackground />
        <CustomCursor />
        <ScrollProgress />
        
        {/* SHOW NAVBAR EVERYWHERE EXCEPT ADMIN AND PORTAL */}
        {path !== '/admin' && path !== '/portal' && <Navbar />}
        
        <main>
          <Suspense fallback={<div className="flex h-[60vh] items-center justify-center text-white">Loading...</div>}>
            <PageComponent />
          </Suspense>
        </main>

        {/* HIDE FOOTER ON ADMIN AND PORTAL */}
        {path !== '/admin' && path !== '/portal' && <Footer />}
        
        <AIChat />
      </div>
    </ErrorBoundary>
  );
}

export default App;
