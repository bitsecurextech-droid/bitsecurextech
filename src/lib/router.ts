import { useEffect, useState, useCallback } from 'react';

export type Route = { path: string; params: Record<string, string> };

function parseHash(): Route {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  const [path, query] = hash.split('?');
  const params: Record<string, string> = {};
  if (query) new URLSearchParams(query).forEach((v, k) => (params[k] = v));
  return { path: path || '/', params };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parseHash());
  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

export function navigate(path: string) {
  window.location.hash = path;
}
export const useNavigate = () => useCallback((path: string) => navigate(path), []);
