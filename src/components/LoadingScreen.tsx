import { useEffect, useState, useRef } from 'react';

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start the progress counter
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        // Stop at exactly 100 using a safe ceiling
        if (p >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 100;
        }
        // Add a random burst, but ensure it never goes over 100
        const increment = Math.random() * 15 + 5;
        return Math.min(p + increment, 100);
      });
    }, 120);

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    // When progress hits 100, wait 400ms, then fade out
    if (progress >= 100) {
      const timer = setTimeout(() => setDone(true), 400);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  // Hide completely once done
  if (done) return null;

  // Use Math.min to safely clamp at 100
  const safeProgress = Math.min(Math.floor(progress), 100);

  return (
    <div 
      className={`fixed inset-0 z-[100] grid place-items-center bg-navy-950 transition-opacity duration-500 ${safeProgress >= 100 ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="relative grid place-items-center">
        {/* Orbiting rings */}
        <div className="absolute h-40 w-40 rounded-full border border-cyber-500/20 animate-spin-slow" />
        <div className="absolute h-28 w-28 rounded-full border border-electric-500/30 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '8s' }} />
        <div className="absolute h-16 w-16 rounded-full border-2 border-cyber-500/40 animate-spin-slow" style={{ animationDuration: '4s' }} />

        {/* Logo center */}
        <div className="relative grid h-20 w-20 place-items-center rounded-2xl bg-black shadow-2xl shadow-cyber-500/40 animate-pulse-slow overflow-hidden ring-2 ring-cyber-500/50">
          <img src="/icon.png" alt="BitSecureX" className="h-14 w-14 rounded-xl object-cover" />
        </div>

        {/* Orbiting dots */}
        <div className="absolute h-40 w-40 animate-spin-slow" style={{ animationDuration: '6s' }}>
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-electric-500 shadow-lg shadow-electric-500/50" />
        </div>
        <div className="absolute h-28 w-28 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '5s' }}>
          <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyber-400 shadow-lg shadow-cyber-400/50" />
        </div>
      </div>

      <div className="mt-10 w-48">
        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-cyber-500 to-electric-500 transition-all duration-200" 
            style={{ width: `${safeProgress}%` }} 
          />
        </div>
        <p className="mt-3 text-center font-mono text-xs text-slate-500">
          {/* Using String() here guarantees 100% no crashes */}
          INITIALIZING SECURE CONNECTION… {String(safeProgress)}%
        </p>
      </div>
    </div>
  );
}