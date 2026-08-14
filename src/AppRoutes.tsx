import { Suspense, lazy } from 'react';
import { useRoute } from './lib/router';

// LAZY LOAD ALL PAGES
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

const PageLoader = () => (
  <div className="flex h-[60vh] items-center justify-center">
    <div className="text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-cyber-500 border-t-transparent" />
      <p className="mt-4 text-sm text-slate-400">Loading page...</p>
    </div>
  </div>
);

export function AppRoutes() {
  const route = useRoute();
  const path = route.path;

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
    <Suspense fallback={<PageLoader />}>
      <PageComponent />
    </Suspense>
  );
}
