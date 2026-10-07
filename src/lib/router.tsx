import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
  MouseEvent as ReactMouseEvent,
} from 'react';

export type Route = {
  path: string;
  params: Record<string, string>; // query params
};

interface RouterContextType {
  route: Route;
  navigate: (path: string, options?: { replace?: boolean }) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

// ------------------------------------------------------------
// PATH PARSING
// ------------------------------------------------------------
function parsePath(): Route {
  // Always use pathname now — no more hash-based routing.
  const path = window.location.pathname || '/';
  const params: Record<string, string> = {};

  const search = window.location.search.replace(/^\?/, '');
  if (search) {
    new URLSearchParams(search).forEach((value, key) => {
      params[key] = value;
    });
  }

  return { path: path || '/', params };
}

// ------------------------------------------------------------
// ROUTE MATCHING HELPERS (for :slug style routes)
// ------------------------------------------------------------
export function matchRoute(
  pattern: string,
  actualPath: string
): Record<string, string> | null {
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = actualPath.split('/').filter(Boolean);

  if (patternParts.length !== pathParts.length) return null;

  const result: Record<string, string> = {};

  for (let i = 0; i < patternParts.length; i++) {
    const p = patternParts[i];
    const a = pathParts[i];

    if (p.startsWith(':')) {
      result[p.slice(1)] = decodeURIComponent(a);
    } else if (p !== a) {
      return null;
    }
  }

  return result;
}

// ------------------------------------------------------------
// PROVIDER
// ------------------------------------------------------------
export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() => parsePath());

  useEffect(() => {
    const onPop = () => setRoute(parsePath());

    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback(
    (path: string, options?: { replace?: boolean }) => {
      if (!path) path = '/';

      // Preserve full URLs / external links as real navigations.
      if (/^(https?:)?\/\//i.test(path) || path.startsWith('mailto:') || path.startsWith('tel:')) {
        window.location.href = path;
        return;
      }

      // Normalize: ensure leading slash.
      const target = path.startsWith('/') ? path : `/${path}`;

      const current = window.location.pathname + window.location.search;
      if (current === target) {
        // Still update state in case search changed.
        setRoute(parsePath());
        return;
      }

      if (options?.replace) {
        window.history.replaceState({}, '', target);
      } else {
        window.history.pushState({}, '', target);
      }

      setRoute(parsePath());

      // Handle hash anchors within same page (e.g., /#pricing).
      const hashIndex = target.indexOf('#');
      if (hashIndex !== -1) {
        const id = target.slice(hashIndex + 1);
        requestAnimationFrame(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
    },
    []
  );

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

// ------------------------------------------------------------
// HOOKS
// ------------------------------------------------------------
export function useRoute(): Route {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRoute must be used within a RouterProvider');
  return ctx.route;
}

export function useNavigate() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useNavigate must be used within a RouterProvider');
  return ctx.navigate;
}

/**
 * Returns matched params for a given pattern.
 * Example:
 *   const { slug } = useParams('/blog/:slug');
 *   // URL: /blog/hello-world -> { slug: 'hello-world' }
 *
 * If no pattern is passed, returns the query params from the current route.
 */
export function useParams(pattern?: string): Record<string, string> {
  const { path, params } = useRoute();

  if (!pattern) return params;

  const matched = matchRoute(pattern, path);
  return matched ?? {};
}

/**
 * <Link> component. Use this instead of <a> for internal navigation.
 *
 *   <Link to="/blog/my-post">Read</Link>
 */
export function Link({
  to,
  children,
  className,
  onClick,
  ...rest
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: ReactMouseEvent<HTMLAnchorElement>) => void;
  [key: string]: any;
}) {
  const navigate = useNavigate();

  const handleClick = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;

    // Let modifier keys / middle-click behave normally.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
