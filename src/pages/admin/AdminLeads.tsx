import { useEffect, useState } from 'react';
import { Download, Flag, Archive, Mail, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const PRIORITY_KEYWORDS = ['fortune 500', 'enterprise', 'urgent'];

function isHighPriority(msg: string) {
  const m = (msg ?? '').toLowerCase();
  return PRIORITY_KEYWORDS.some((k) => m.includes(k));
}

function exportLeadsCSV(leads: any[]) {
  const headers = ['name', 'email', 'company', 'service', 'message', 'created_at'];
  const escape = (v: any) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const rows = leads.map((l) => headers.map((h) => escape(l[h])).join(','));
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `leads-${Date.now()}.csv`; a.click();
  URL.revokeObjectURL(url);
}

export function AdminLeads() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('contact_leads').select('*').order('created_at', { ascending: false });
    setItems(data ?? []); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const archive = async (id: string) => {
    await supabase.from('contact_leads').delete().eq('id', id);
    load();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="font-display text-2xl font-bold text-white">Contact Leads</h1><p className="text-sm text-slate-400">Inbound leads from the website contact form.</p></div>
        <button onClick={() => exportLeadsCSV(items)} className="btn-ghost px-4 py-2 text-xs"><Download className="h-4 w-4" /> Export CSV</button>
      </div>
      {loading ? <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
        : items.length === 0 ? <div className="flex flex-col items-center justify-center rounded-2xl glass py-16 text-center"><Mail className="h-12 w-12 text-slate-600" /><p className="mt-4 text-sm text-slate-400">No leads yet.</p></div>
        : (
          <div className="space-y-3">
            {items.map((l) => {
              const priority = isHighPriority(l.message);
              return (
                <div key={l.id} className="rounded-2xl glass p-5 card-hover">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {priority && <Flag className="h-4 w-4 text-red-400" aria-label="High priority" />}
                      <h3 className="font-display text-base font-semibold text-white">{l.name}</h3>
                      <span className="text-slate-500">·</span>
                      <span className="text-sm text-slate-400">{l.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {l.service && <span className="rounded-full bg-cyber-500/15 px-3 py-1 text-xs font-medium text-cyber-200">{l.service}</span>}
                      {priority && <span className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-medium text-red-400">High Priority</span>}
                      <button onClick={() => archive(l.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/15 hover:text-red-400" title="Archive and Delete"><Archive className="h-4 w-4" /></button>
                    </div>
                  </div>
                  {l.company && <p className="mt-1 text-xs text-slate-500">{l.company}</p>}
                  <p className="mt-2 text-sm text-slate-300">{l.message}</p>
                </div>
              );
            })}
          </div>
        )}
    </div>
  );
}