import { useEffect, useState } from 'react';
import { FolderKanban, Ticket, Receipt, ShieldCheck, Plus, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Reveal } from '../../components/Reveal';

export function Overview() {
  const [counts, setCounts] = useState({ projects: 0, tickets: 0, invoices: 0, audits: 0 });

  useEffect(() => {
    Promise.all([
      supabase.from('portal_projects').select('id', { count: 'exact', head: true }),
      supabase.from('portal_tickets').select('id', { count: 'exact', head: true }),
      supabase.from('portal_invoices').select('id', { count: 'exact', head: true }),
      supabase.from('portal_audit_requests').select('id', { count: 'exact', head: true }),
    ]).then(([p, t, i, a]) => {
      setCounts({ projects: p.count ?? 0, tickets: t.count ?? 0, invoices: i.count ?? 0, audits: a.count ?? 0 });
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="border-b border-white/5 pb-4">
        <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
        <p className="text-sm text-slate-400">Here is an overview of your projects and activity.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Projects', value: counts.projects, icon: FolderKanban, color: 'text-cyber-400' },
          { label: 'Tickets', value: counts.tickets, icon: Ticket, color: 'text-yellow-400' },
          { label: 'Invoices', value: counts.invoices, icon: Receipt, color: 'text-electric-400' },
          { label: 'Audits', value: counts.audits, icon: ShieldCheck, color: 'text-red-400' },
        ].map((c) => (
          <div key={c.label} className="rounded-xl bg-navy-800/50 p-4 border border-white/5">
            <c.icon className={`h-6 w-6 ${c.color}`} />
            <p className="mt-2 text-2xl font-bold text-white">{c.value}</p>
            <p className="text-xs text-slate-400">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export function Overview;