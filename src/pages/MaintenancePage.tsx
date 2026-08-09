import { useEffect, useState } from 'react';

interface MaintenancePageProps {
  message?: string;
}

export function MaintenancePage({ message }: MaintenancePageProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 px-4">
      <div className="text-center max-w-2xl">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-cyber-500/10 flex items-center justify-center ring-1 ring-cyber-500/30">
            <svg className="w-12 h-12 text-cyber-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-white font-display mb-4">
          Under Maintenance
        </h1>

        {/* Message */}
        <p className="text-xl text-slate-400 leading-relaxed">
          {message || "We're currently working on making things better. We'll be back soon!"}
        </p>

        {/* Animated dots */}
        <div className="mt-8 flex justify-center gap-3">
          <div className="w-3 h-3 rounded-full bg-cyber-500 animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-3 h-3 rounded-full bg-cyber-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-3 h-3 rounded-full bg-cyber-300 animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>

        {/* Time */}
        <p className="mt-8 text-sm text-slate-500">
          Current time: {time.toLocaleTimeString()}
        </p>

        {/* Contact */}
        <p className="mt-6 text-sm text-slate-500">
          For urgent matters, contact us at{' '}
          <a 
            href="mailto:support@bitsecurex.tech" 
            className="text-cyber-400 hover:text-cyber-300 transition-colors"
          >
            support@bitsecurex.tech
          </a>
        </p>

        {/* Status badge */}
        <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-yellow-500/10 px-4 py-2 text-sm text-yellow-400 border border-yellow-500/20">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400"></span>
          </span>
          Scheduled Maintenance
        </div>
      </div>
    </div>
  );
}

export default MaintenancePage;
