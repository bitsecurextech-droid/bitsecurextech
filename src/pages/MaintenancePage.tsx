import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface MaintenancePageProps {
  message?: string;
}

export function MaintenancePage({ message }: MaintenancePageProps) {
  const [time, setTime] = useState(new Date());
  const [estimatedTime, setEstimatedTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Generate random estimated time
    const mins = Math.floor(Math.random() * 30) + 15;
    setEstimatedTime(`${mins} minutes`);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 px-4">
      <div className="text-center max-w-2xl">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-cyber-500/10 flex items-center justify-center ring-1 ring-cyber-500/30 animate-pulse">
            <svg className="w-12 h-12 text-cyber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-yellow-500/10 px-4 py-2 text-sm text-yellow-400 border border-yellow-500/20 mb-6">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400"></span>
          </span>
          Scheduled Maintenance
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-white font-display mb-4">
          Under Maintenance
        </h1>

        {/* Message */}
        <p className="text-xl text-slate-400 leading-relaxed">
          {message || "We're currently working on making things better. We'll be back soon!"}
        </p>

        {/* Estimated Time */}
        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-sm text-slate-400">
            ⏱️ Estimated downtime: <span className="text-cyber-400 font-medium">{estimatedTime}</span>
          </p>
        </div>

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
        <p className="mt-4 text-sm text-slate-500">
          For urgent matters, contact us at{' '}
          <a 
            href="mailto:support@bitsecurex.tech" 
            className="text-cyber-400 hover:text-cyber-300 transition-colors"
          >
            support@bitsecurex.tech
          </a>
        </p>

        {/* Social Links */}
        <div className="mt-6 flex justify-center gap-4">
          <a href="#" className="text-slate-500 hover:text-cyber-400 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
          </a>
          <a href="#" className="text-slate-500 hover:text-cyber-400 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
          </a>
          <a href="#" className="text-slate-500 hover:text-cyber-400 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.468-2.381 1.235-3.221-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.874.118 3.176.77.84 1.233 1.911 1.233 3.221 0 4.61-2.806 5.62-5.478 5.921.43.372.823 1.102.823 2.222 0 1.604-.015 2.896-.015 3.29 0 .322.217.696.825.578C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>

        {/* Refresh button */}
        <button
          onClick={() => window.location.reload()}
          className="mt-8 text-sm text-slate-500 hover:text-cyber-400 transition-colors"
        >
          ↻ Check status
        </button>
      </div>
    </div>
  );
}

export default MaintenancePage;
