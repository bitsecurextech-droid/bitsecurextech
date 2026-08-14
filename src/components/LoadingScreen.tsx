import { useState, useEffect } from 'react';

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-950">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyber-500/30 border-t-cyber-500" />
      <p className="mt-4 text-xs text-slate-500 animate-pulse">Loading...</p>
    </div>
  );
}
