import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

export type Route = { path: string; params: Record<string, string> };

interface RouterContextType {
  route: Route;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

// 🟢 Handles both Clean URLs and Hash URLs perfectly
function parsePath(): Route {
  let path = '';
  let query = '';

  if (window.location.hash) {
    const hash = window.location.hash.replace(/^#/, '') || '/';
    const split = hash.split('?');
    path = split[0] || '/';
    query = split[1] || '';
  } else {
    path = window.location.pathname || '/';
    query = window.location.search.replace('?', '');
  }

  const params: Record<string, string> = {};
  if (query) new URLSearchParams(query).forEach((v, k) => (params[k] = v));
  return { path: path || '/', params };
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(parsePath());
  
  useEffect(() => {
    const onHash = () => {
      setRoute(parsePath());
    };
    window.addEventListener('hashchange', onHash);
    window.addEventListener('popstate', onHash);
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('popstate', onHash);
    };
  }, []);

  const navigate = (path: string) => {
    const cleanPath = path.replace(/#/g, '');
    const formattedPath = cleanPath.startsWith('/') ? `#${cleanPath}` : `#/${cleanPath}`;
    window.location.hash = formattedPath;
  };

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRoute(): Route {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useRoute must be used within a RouterProvider');
  return context.route;
}

export function useNavigate() {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useNavigate must be used within a RouterProvider');
  return context.navigate;
}

// ============================================================
// ✅ ROUTER COMPONENT - MAPS PATHS TO COMPONENTS
// ============================================================
import { 
  HomePage,
  WebDevelopmentPage,
  SoftwareSolutionsPage,
  AIAutomationPage,
  CloudSolutionsPage,
  MobileAppDevelopmentPage,
  DigitalMarketingPage,
  SEOPage,
  SocialMediaMarketingPage,
  ContentMarketingPage,
  CybersecurityPage,
  PenetrationTestingPage,
  EcommerceDevelopmentPage,
  ShopifyStoresPage,      // ✅ FIXED
  MarketplacePage,         // ✅ FIXED
  DigitalEcosystemPage,
  AboutPage,
  CareersPage,
  PartnersPage,
  BlogPage,
  CaseStudyPage,
  ReportsPage,
  ToolsPage,
  CalculatorPage,
  OffersPage,
  ContactPage,
  PortalPage,
  AdminPage,
} from '../pages';

export function Router() {
  const route = useRoute();
  
  // ✅ COMPLETE ROUTE MAPPING - ALL PAGES
  const routeMap: Record<string, () => JSX.Element> = {
    '/': () => <HomePage />,
    
    // Technology
    '/web-development': () => <WebDevelopmentPage />,
    '/software-solutions': () => <SoftwareSolutionsPage />,
    '/ai-automation': () => <AIAutomationPage />,
    '/cloud-solutions': () => <CloudSolutionsPage />,
    '/mobile-app-development': () => <MobileAppDevelopmentPage />,
    
    // Marketing
    '/digital-marketing': () => <DigitalMarketingPage />,
    '/seo': () => <SEOPage />,
    '/social-media-marketing': () => <SocialMediaMarketingPage />,
    '/content-marketing': () => <ContentMarketingPage />,
    
    // Security
    '/cybersecurity': () => <CybersecurityPage />,
    '/penetration-testing': () => <PenetrationTestingPage />,
    
    // Commerce ✅ FIXED - These were missing!
    '/ecommerce-development': () => <EcommerceDevelopmentPage />,
    '/shopify-stores': () => <ShopifyStoresPage />,        // ✅ ADDED
    '/marketplace': () => <MarketplacePage />,              // ✅ ADDED
    
    // Ecosystem
    '/ecosystem': () => <DigitalEcosystemPage />,
    
    // About
    '/about': () => <AboutPage />,
    '/careers': () => <CareersPage />,
    '/partners': () => <PartnersPage />,
    
    // Insights
    '/blog': () => <BlogPage />,
    '/case-studies': () => <CaseStudyPage />,
    '/reports': () => <ReportsPage />,
    
    // Tools
    '/tools': () => <ToolsPage />,
    '/calculator': () => <CalculatorPage />,
    
    // Other
    '/offers': () => <OffersPage />,
    '/contact': () => <ContactPage />,
    '/portal': () => <PortalPage />,
    '/admin': () => <AdminPage />,
  };

  // Get the component or fallback to HomePage
  const Page = routeMap[route.path] || routeMap['/'];
  return <Page />;
}
