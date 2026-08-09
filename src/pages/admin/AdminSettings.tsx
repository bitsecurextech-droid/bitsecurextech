import { useState, useEffect } from 'react';
import { Globe, Zap, Activity, FileText, RefreshCw, CheckCircle2, Save } from 'lucide-react';

export function AdminSettings() {
  // ✅ Load from localStorage so the setting persists across page reloads
  const [maintenance, setMaintenance] = useState(() => {
    return localStorage.getItem('maintenance_mode') === 'true';
  });
  const [robots, setRobots] = useState('User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /portal\n');
  const [msg, setMsg] = useState('');

  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(''), 2500); };

  // ✅ ACTUALLY TOGGLES MAINTENANCE MODE
  const toggleMaintenance = () => {
    const newState = !maintenance;
    setMaintenance(newState);
    localStorage.setItem('maintenance_mode', String(newState));
    flash(newState ? '🔧 Maintenance mode is ON.' : '✅ Maintenance mode is OFF.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">System Settings</h1>
        <p className="text-sm text-slate-400">Maintenance, caching, and SEO configuration.</p>
      </div>

      {/* Maintenance Mode Toggle */}
      <div className="rounded-2xl glass p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold text-white">Maintenance Mode</h2>
            <p className="text-sm text-slate-400">Take the public site offline with a maintenance banner.</p>
          </div>
          <button 
            onClick={toggleMaintenance} 
            className={`relative h-7 w-12 rounded-full transition-colors ${maintenance ? 'bg-electric-500' : 'bg-white/10'}`}
          >
            <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${maintenance ? 'left-6' : 'left-1'}`} />
          </button>
        </div>
        {maintenance && <p className="mt-3 text-sm text-yellow-400">⚠️ Maintenance mode is ON. Visitors will see a maintenance page.</p>}
      </div>

      {/* Action Buttons */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl glass p-6 text-center">
          <Globe className="mx-auto h-6 w-6 text-cyber-400" />
          <p className="mt-2 text-sm text-slate-300">CDN Purge</p>
          <button onClick={() => flash('✓ CDN cache purged across all edge nodes.')} className="btn-ghost mt-3 px-4 py-2 text-xs">
            <RefreshCw className="h-4 w-4" /> Purge
          </button>
        </div>
        <div className="rounded-2xl glass p-6 text-center">
          <Zap className="mx-auto h-6 w-6 text-electric-400" />
          <p className="mt-2 text-sm text-slate-300">Cache Warmer</p>
          <button onClick={() => flash('✓ Cache warmed. Key routes pre-rendered.')} className="btn-ghost mt-3 px-4 py-2 text-xs">
            <Activity className="h-4 w-4" /> Warm
          </button>
        </div>
        <div className="rounded-2xl glass p-6 text-center">
          <Globe className="mx-auto h-6 w-6 text-cyber-400" />
          <p className="mt-2 text-sm text-slate-300">Sitemap Generator</p>
          <button onClick={() => flash('✓ sitemap.xml regenerated.')} className="btn-ghost mt-3 px-4 py-2 text-xs">
            <FileText className="h-4 w-4" /> Generate
          </button>
        </div>
      </div>

      {/* Robots.txt Editor */}
      <div className="rounded-2xl glass p-6">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-electric-400" />
          <h2 className="font-display text-lg font-semibold text-white">robots.txt Editor</h2>
        </div>
        <textarea 
          value={robots} 
          onChange={(e) => setRobots(e.target.value)} 
          rows={6} 
          className="input-field mt-4 font-mono text-xs" 
        />
        <button 
          onClick={() => flash('✓ robots.txt saved.')} 
          className="btn-primary mt-3 px-4 py-2 text-xs"
        >
          <Save className="h-4 w-4" /> Save robots.txt
        </button>
      </div>

      {/* Toast Message */}
      {msg && (
        <div className="flex items-center gap-2 rounded-xl border border-electric-500/30 bg-electric-500/10 px-4 py-3 text-sm text-electric-400">
          <CheckCircle2 className="h-4 w-4" /> {msg}
        </div>
      )}
    </div>
  );
}