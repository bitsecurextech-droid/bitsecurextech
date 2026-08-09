import { useState, useEffect } from 'react';
import { ShieldAlert, Bug, Lock, Ban, Gauge, HardDrive, Database, Plus, Trash2, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { wafLogs, honeypotLogs, securityHeaders } from '../../lib/data';

export function AdminSecurityCenter() {
  const [blacklist, setBlacklist] = useState<any[]>([]);
  const [blLoading, setBlLoading] = useState(true);
  const [newIp, setNewIp] = useState({ ip: '', type: 'block', reason: '' });
  const [backupMsg, setBackupMsg] = useState('');

  const loadBlacklist = async () => {
    setBlLoading(true);
    const { data } = await supabase.from('admin_blacklist').select('*').order('created_at', { ascending: false });
    setBlacklist(data ?? []); setBlLoading(false);
  };
  useEffect(() => { loadBlacklist(); }, []);

  const addIp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIp.ip) return;
    await supabase.from('admin_blacklist').insert(newIp);
    setNewIp({ ip: '', type: 'block', reason: '' });
    loadBlacklist();
  };
  const delIp = async (id: string) => { await supabase.from('admin_blacklist').delete().eq('id', id); loadBlacklist(); };

  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-2xl font-bold text-white">Security Command Center</h1><p className="text-sm text-slate-400">Live threat monitoring and access controls.</p></div>

      <div className="rounded-2xl glass p-6">
        <div className="flex items-center gap-2"><ShieldAlert className="h-5 w-5 text-red-400" /><h2 className="font-display text-lg font-semibold text-white">Live WAF Logs</h2><span className="ml-2 h-2 w-2 animate-pulse rounded-full bg-red-500" /></div>
        <div className="mt-4 max-h-72 overflow-y-auto rounded-xl border border-white/5">
          <table className="w-full text-left text-xs">
            <thead className="sticky top-0 bg-navy-800/90 text-slate-400"><tr>{['IP', 'Type', 'Payload', 'Path', 'Country', 'Time'].map((h) => <th key={h} className="px-3 py-2 font-medium">{h}</th>)}</tr></thead>
            <tbody className="font-mono">
              {wafLogs.map((l, i) => (
                <tr key={i} className="border-t border-white/5 hover:bg-white/5">
                  <td className="px-3 py-2 text-cyber-300">{l.ip}</td>
                  <td className="px-3 py-2"><span className="rounded-full bg-red-500/15 px-2.5 py-0.5 text-xs font-medium text-red-400">{l.type}</span></td>
                  <td className="max-w-[200px] truncate px-3 py-2 text-slate-300" title={l.payload}>{l.payload}</td>
                  <td className="px-3 py-2 text-slate-400">{l.path}</td>
                  <td className="px-3 py-2 text-slate-400">{l.country}</td>
                  <td className="px-3 py-2 text-slate-500">{l.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl glass p-6">
        <div className="flex items-center gap-2"><Bug className="h-5 w-5 text-yellow-400" /><h2 className="font-display text-lg font-semibold text-white">Honeypot Dashboard</h2></div>
        <div className="mt-4 overflow-x-auto rounded-xl border border-white/5">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-800/90 text-slate-400"><tr>{['IP', 'Port', 'Attempts', 'Country', 'Fingerprint'].map((h) => <th key={h} className="px-3 py-2 font-medium">{h}</th>)}</tr></thead>
            <tbody className="font-mono">
              {honeypotLogs.map((l, i) => (
                <tr key={i} className="border-t border-white/5 hover:bg-white/5">
                  <td className="px-3 py-2 text-cyber-300">{l.ip}</td>
                  <td className="px-3 py-2 text-slate-300">{l.port}</td>
                  <td className="px-3 py-2"><span className="rounded-full px-2.5 py-0.5 text-xs font-medium">{l.attempts}</span></td>
                  <td className="px-3 py-2 text-slate-400">{l.country}</td>
                  <td className="px-3 py-2 text-slate-400">{l.fingerprint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl glass p-6">
        <div className="flex items-center gap-2"><Lock className="h-5 w-5 text-electric-400" /><h2 className="font-display text-lg font-semibold text-white">Security Headers</h2></div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {securityHeaders.map((h) => (<div key={h.name} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-2.5"><span className="text-sm text-slate-300">{h.name}</span><span className="rounded-full bg-electric-500/15 px-3 py-1 text-xs font-medium text-electric-400">{h.status}</span></div>))}
        </div>
      </div>

      <div className="rounded-2xl glass p-6">
        <div className="flex items-center gap-2"><Ban className="h-5 w-5 text-red-400" /><h2 className="font-display text-lg font-semibold text-white">IP Blacklist Manager</h2></div>
        <form onSubmit={addIp} className="mt-4 flex flex-wrap gap-2">
          <input value={newIp.ip} onChange={(e) => setNewIp({...newIp, ip: e.target.value})} placeholder="IP address" className="input-field max-w-[180px]" />
          <select value={newIp.type} onChange={(e) => setNewIp({...newIp, type: e.target.value})} className="input-field max-w-[120px]"><option value="block">block</option><option value="allow">allow</option></select>
          <input value={newIp.reason} onChange={(e) => setNewIp({...newIp, reason: e.target.value})} placeholder="Reason" className="input-field max-w-[200px]" />
          <button type="submit" className="btn-primary px-4 py-2 text-xs"><Plus className="h-4 w-4" /> Add</button>
        </form>
        <div className="mt-4 space-y-2">
          {blLoading ? <p className="text-sm text-slate-400">Loading...</p> : blacklist.length === 0 ? <p className="text-sm text-slate-500">No entries.</p> : blacklist.map((b) => (<div key={b.id} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-2.5"><div className="flex items-center gap-3"><span className="font-mono text-sm text-cyber-300">{b.ip}</span><span className="rounded-full px-3 py-1 text-xs font-medium">{b.type}</span></div><button onClick={() => delIp(b.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/15 hover:text-red-400"><Trash2 className="h-4 w-4" /></button></div>))}
        </div>
      </div>
    </div>
  );
}