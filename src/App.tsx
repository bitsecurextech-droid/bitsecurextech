import { Component, ReactNode, Suspense, lazy, useState, useEffect } from 'react';
import { useRoute } from './lib/router';
import { useAuth } from './lib/auth';
import { supabase } from './lib/supabase';

// ✅ IMPORT COMPONENTS NORMALLY (NOT LAZY) - Fixes the error
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Background from './components/Background';
import ParticleBackground from './components/ParticleBackground';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import LoadingScreen from './components/LoadingScreen';
import AIChat from './components/AIChat';

// ✅ LAZY LOAD ONLY PAGES (with proper default exports)
const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const OffersPage = lazy(() => import('./pages/OffersPage'));
const CybersecurityPage = lazy(() => import('./pages/CybersecurityPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ToolsPage = lazy(() => import('./pages/ToolsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PortalPage = lazy(() => import('./pages/PortalPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const DigitalEcosystemPage = lazy(() => import('./pages/DigitalEcosystemPage'));
const WebDevelopmentPage = lazy(() => import('./pages/WebDevelopmentPage'));
const SoftwareSolutionsPage = lazy(() => import('./pages/SoftwareSolutionsPage'));
const AIAutomationPage = lazy(() => import('./pages/AIAutomationPage'));
const CloudSolutionsPage = lazy(() => import('./pages/CloudSolutionsPage'));
const MobileAppDevelopmentPage = lazy(() => import('./pages/MobileAppDevelopmentPage'));
const DigitalMarketingPage = lazy(() => import('./pages/DigitalMarketingPage'));
const SEOPage = lazy(() => import('./pages/SEOPage'));
const SocialMediaMarketingPage = lazy(() => import('./pages/SocialMediaMarketingPage'));
const ContentMarketingPage = lazy(() => import('./pages/ContentMarketingPage'));
const PenetrationTestingPage = lazy(() => import('./pages/PenetrationTestingPage'));
const EcommerceDevelopmentPage = lazy(() => import('./pages/EcommerceDevelopmentPage'));
const ShopifyStoresPage = lazy(() => import('./pages/ShopifyStoresPage'));
const MarketplacePage = lazy(() => import('./pages/MarketplacePage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const PartnersPage = lazy(() => import('./pages/PartnersPage'));
const ReportsPage = lazy(() => import('./pages/ReportsPage'));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'));
const DisclosurePage = lazy(() => import('./pages/DisclosurePage'));
const BugBountyPage = lazy(() => import('./pages/BugBountyPage'));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'));
const MaintenancePage = lazy(() => import('./pages/MaintenancePage'));

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
    <div className="text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-cyber-500 border-t-transparent" />
      <p className="mt-4 text-sm text-slate-400">Loading page...</p>
    </div>
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

  // ✅ CHECK MAINTENANCE FIRST
  const showMaintenance = isMaintenance && path !== '/admin' && path !== '/portal';

  if (showMaintenance) {
    return (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <MaintenancePage message={maintenanceMessage} />
        </Suspense>
      </ErrorBoundary>
    );
  }

  let PageComponent = HomePage;

  // Home
  if (path === '/') PageComponent = HomePage;

  // Services
  else if (path === '/services') PageComponent = ServicesPage;
  else if (path.startsWith('/services/')) PageComponent = ServiceDetailPage;

  // Technology
  else if (path === '/web-development') PageComponent = WebDevelopmentPage;
  else if (path === '/software-solutions') PageComponent = SoftwareSolutionsPage;
  else if (path === '/ai-automation') PageComponent = AIAutomationPage;
  else if (path === '/cloud-solutions') PageComponent = CloudSolutionsPage;
  else if (path === '/mobile-app-development') PageComponent = MobileAppDevelopmentPage;

  // Marketing
  else if (path === '/digital-marketing') PageComponent = DigitalMarketingPage;
  else if (path === '/seo') PageComponent = SEOPage;
  else if (path === '/social-media-marketing') PageComponent = SocialMediaMarketingPage;
  else if (path === '/content-marketing') PageComponent = ContentMarketingPage;

  // Security
  else if (path === '/cybersecurity') PageComponent = CybersecurityPage;
  else if (path === '/penetration-testing') PageComponent = PenetrationTestingPage;

  // Commerce
  else if (path === '/ecommerce-development') PageComponent = EcommerceDevelopmentPage;
  else if (path === '/shopify-stores') PageComponent = ShopifyStoresPage;
  else if (path === '/marketplace') PageComponent = MarketplacePage;

  // Ecosystem
  else if (path === '/ecosystem') PageComponent = DigitalEcosystemPage;

  // About
  else if (path === '/about') PageComponent = AboutPage;
  else if (path === '/careers') PageComponent = CareersPage;
  else if (path === '/partners') PageComponent = PartnersPage;

  // Insights
  else if (path === '/blog') PageComponent = BlogPage;
  else if (path === '/case-studies') PageComponent = CaseStudyPage;
  else if (path === '/reports') PageComponent = ReportsPage;

  // Tools
  else if (path === '/tools') PageComponent = ToolsPage;
  else if (path === '/calculator') PageComponent = CalculatorPage;

  // Other
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
