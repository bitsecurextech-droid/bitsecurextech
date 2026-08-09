import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Route = { path: string; params: Record<string, string> };

interface RouterContextType {
  route: Route;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

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
