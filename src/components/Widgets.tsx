import { useEffect, useState } from 'react';
import { ShieldAlert, Activity, Eye } from 'lucide-react';
import { useVisitorCount } from '../lib/useReveal';

export function ThreatLevelWidget() {
  const [attacks, setAttacks] = useState(1247);
  const [blocked, setBlocked] = useState(1247);
  const [level, setLevel] = useState<'LOW' | 'ELEVATED' | 'HIGH'>('LOW');

  useEffect(() => {
    const interval = setInterval(() => {
      const inc = Math.floor(Math.random() * 3) + 1;
      setAttacks((a) => a + inc);
      setBlocked((b) => b + inc);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setLevel(attacks % 50 > 40 ? 'HIGH' : attacks % 20 > 15 ? 'ELEVATED' : 'LOW');
  }, [attacks]);

  const color = level === 'HIGH' ? 'text-red-400' : level === 'ELEVATED' ? 'text-yellow-400' : 'text-electric-400';
  const dotColor = level === 'HIGH' ? 'bg-red-500' : level === 'ELEVATED' ? 'bg-yellow-500' : 'bg-electric-500';

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className={`h-5 w-5 ${color}`} />
          <span className="text-sm font-semibold text-white light:text-surface-900">Threat Level</span>
        </div>
        <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${color}`}>
          <span className={`h-2 w-2 animate-pulse rounded-full ${dotColor}`} /> {level}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-white/5 p-3">
          <p className="flex items-center gap-1 text-xs text-slate-400"><Activity className="h-3 w-3" /> Attack Attempts</p>
          <p className="mt-1 font-display text-xl font-bold text-white light:text-surface-900">{attacks.toLocaleString()}</p>
        </div>
        <div className="rounded-lg bg-white/5 p-3">
          <p className="flex items-center gap-1 text-xs text-slate-400"><ShieldAlert className="h-3 w-3" /> Blocked</p>
          <p className="mt-1 font-display text-xl font-bold text-electric-400">{blocked.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export function VisitorCounter() {
  const count = useVisitorCount();
  return (
    <div className="glass flex items-center gap-3 rounded-2xl p-5">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyber-500/15">
        <Eye className="h-5 w-5 text-cyber-400" />
      </span>
      <div>
        <p className="font-display text-2xl font-bold text-white light:text-surface-900">{count.toLocaleString()}</p>
        <p className="text-xs text-slate-400 light:text-surface-500">Total Unique Visitors</p>
      </div>
    </div>
  );
}
