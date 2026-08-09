import { useEffect, useState } from 'react';
import { Mail, FolderKanban, Activity, ShieldAlert, TrendingUp, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminOverview() {
  const [stats, setStats] = useState({ leads: 0, projects: 0, tickets: 0, audits: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [l, p, t, a] = await Promise.all([
        supabase.from('contact_leads').select('id', { count: 'exact', head: true }),
        supabase.from('admin_projects').select('id', { count: 'exact', head: true }),
        supabase.from('portal_tickets').select('id', { count: 'exact', head: true }),
        supabase.from('portal_audit_requests').select('id', { count: 'exact', head: true }),
      ]);
      setStats({ leads: l.count ?? 0, projects: p.count ?? 0, tickets: t.count ?? 0, audits: a.count ?? 0 });
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>;

  const cards = [
    { label: 'Contact Leads', value: stats.leads, icon: Mail, color: 'text-cyber-400' },
    { label: 'Portfolio Projects', value: stats.projects, icon: FolderKanban, color: 'text-electric-400' },
    { label: 'Support Tickets', value: stats.tickets, icon: Activity, color: 'text-cyber-400' },
    { label: 'Audit Requests', value: stats.audits, icon: ShieldAlert, color: 'text-electric-400' },
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-2xl font-bold text-white">Analytics Dashboard</h1><p className="text-sm text-slate-400">Real-time overview of business activity.</p></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl glass p-5 card-hover">
            <c.icon className={`h-6 w-6 ${c.color}`} />
            <p className="mt-3 font-display text-3xl font-bold text-white">{c.value}</p>
            <p className="text-sm text-slate-400">{c.label}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl glass p-6">
        <div className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-electric-400" /><h2 className="font-display text-lg font-semibold text-white">Pipeline Health</h2></div>
        <div className="mt-4 space-y-3">
          {[
            { label: 'Leads to Quotes', pct: 68 },
            { label: 'Quotes to Projects', pct: 42 },
            { label: 'Projects to Delivered', pct: 91 },
          ].map((r) => (
            <div key={r.label}>
              <div className="flex justify-between text-sm"><span className="text-slate-300">{r.label}</span><span className="text-electric-400">{r.pct}%</span></div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-cyber-500 to-electric-500" style={{ width: `${r.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}