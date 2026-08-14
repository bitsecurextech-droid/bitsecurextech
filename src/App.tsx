import { Component, ReactNode, Suspense, useState, useEffect, lazy } from 'react';
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
import { supabase } from './lib/supabase';

// ✅ LAZY LOAD ADMIN PAGES (Only loaded when needed)
const AdminPage = lazy(() => import('./pages/AdminPage'));
const PortalPage = lazy(() => import('./pages/PortalPage'));

// ✅ IMPORT ALL OTHER PAGES DIRECTLY
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
import { ShopifyStoresPage } from './pages/ShopifyStoresPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { CareersPage } from './pages/CareersPage';
import { PartnersPage } from './pages/PartnersPage';
import { ReportsPage } from './pages/ReportsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { DisclosurePage } from './pages/DisclosurePage';
import { BugBountyPage } from './pages/BugBountyPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { MaintenancePage } from './pages/MaintenancePage';

// ============================================================
// ERROR BOUNDARY
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
              An error occurred while rendering the page. Check your browser console.
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
// MAINTENANCE CHECK HOOK
// ============================================================
function useMaintenance() {
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkMaintenance = async () => {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('key, value')
          .in('key', ['maintenance_mode', 'maintenance_message']);

        if (error) {
          console.error('Error checking maintenance:', error);
          setLoading(false);
          return;
        }

        const mode = data?.find((d: any) => d.key === 'maintenance_mode');
        const message = data?.find((d: any) => d.key === 'maintenance_message');

        setIsMaintenance(mode?.value === 'true' || mode?.value === true);
        setMaintenanceMessage(message?.value || 'We are currently performing maintenance. We will be back soon!');
      } catch (err) {
        console.error('Maintenance check error:', err);
      } finally {
        setLoading(false);
      }
    };

    checkMaintenance();
    const interval = setInterval(checkMaintenance, 30000);
    return () => clearInterval(interval);
  }, []);

  return { isMaintenance, maintenanceMessage, loading };
}

// ============================================================
// LOADING FALLBACK
// ============================================================
const PageLoader = () => (
  <div className="flex h-[60vh] items-center justify-center">
    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-cyber-500 border-t-transparent" />
  </div>
);

// ============================================================
// MAIN APP
// ============================================================
function App() {
  useAuth();
  const route = useRoute();
  const path = route.path;
  const { isMaintenance, maintenanceMessage, loading } = useMaintenance();

  const showMaintenance = isMaintenance && path !== '/admin' && path !== '/portal';

  if (showMaintenance) {
    return (
      <ErrorBoundary>
        <MaintenancePage message={maintenanceMessage} />
      </ErrorBoundary>
    );
  }

  let PageComponent = HomePage;

  if (path === '/') PageComponent = HomePage;
  else if (path === '/services') PageComponent = ServicesPage;
  else if (path.startsWith('/services/')) PageComponent = ServiceDetailPage;
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
  else if (path === '/shopify-stores') PageComponent = ShopifyStoresPage;
  else if (path === '/marketplace') PageComponent = MarketplacePage;
  else if (path === '/ecosystem') PageComponent = DigitalEcosystemPage;
  else if (path === '/about') PageComponent = AboutPage;
  else if (path === '/careers') PageComponent = CareersPage;
  else if (path === '/partners') PageComponent = PartnersPage;
  else if (path === '/blog') PageComponent = BlogPage;
  else if (path === '/case-studies') PageComponent = CaseStudyPage;
  else if (path === '/reports') PageComponent = ReportsPage;
  else if (path === '/tools') PageComponent = ToolsPage;
  else if (path === '/calculator') PageComponent = CalculatorPage;
  else if (path === '/offers') PageComponent = OffersPage;
  else if (path === '/portfolio') PageComponent = PortfolioPage;
  else if (path === '/contact') PageComponent = ContactPage;
  else if (path === '/portal') PageComponent = PortalPage;
  else if (path === '/admin') PageComponent = AdminPage;
  else if (path === '/pricing') PageComponent = PricingPage;
  else if (path === '/reviews') PageComponent = ReviewsPage;
  else if (path === '/disclosure') PageComponent = DisclosurePage;
  else if (path === '/bug-bounty') PageComponent = BugBountyPage;

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen">
        <LoadingScreen />
        <Background />
        <ParticleBackground />
        <CustomCursor />
        <ScrollProgress />
        
        {path !== '/admin' && path !== '/portal' && <Navbar />}
        
        <main>
          <Suspense fallback={<PageLoader />}>
            <PageComponent />
          </Suspense>
        </main>

        {path !== '/admin' && path !== '/portal' && <Footer />}
        
        <AIChat />
      </div>
    </ErrorBoundary>
  );
}

export default App;
