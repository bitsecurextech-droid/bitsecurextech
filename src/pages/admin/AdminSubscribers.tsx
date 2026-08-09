import { useEffect, useState } from 'react';
import { Download, Mail, Trash2, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase.from('email_subscribers').select('*').order('subscribed_at', { ascending: false });
    setSubscribers(data || []); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const exportCSV = () => {
    const csv = ['Email,Status,Subscribed At'].concat(subscribers.map(s => `${s.email},${s.status},${s.subscribed_at}`)).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'subscribers.csv'; a.click();
  };

  const removeSubscriber = async (id: string) => { await supabase.from('email_subscribers').delete().eq('id', id); load(); };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="font-display text-2xl font-bold text-white">Email Subscribers</h1><p className="text-sm text-slate-400">Manage your newsletter list.</p></div>
        <button onClick={exportCSV} className="btn-ghost px-4 py-2 text-xs"><Download className="h-4 w-4" /> Export CSV</button>
      </div>
      {loading ? <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
        : subscribers.length === 0 ? <div className="flex flex-col items-center justify-center rounded-2xl glass py-16 text-center"><Mail className="h-12 w-12 text-slate-600" /><p className="mt-4 text-sm text-slate-400">No subscribers yet.</p></div>
        : (
          <div className="space-y-2">
            {subscribers.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-2xl glass p-4">
                <div><p className="font-medium text-white">{s.email}</p><p className="text-xs text-slate-400">Subscribed: {new Date(s.subscribed_at).toLocaleDateString()}</p></div>
                <div className="flex items-center gap-2"><span className={`rounded-full px-3 py-1 text-xs font-medium ${s.status === 'active' ? 'bg-electric-500/15 text-electric-400' : 'bg-white/5 text-slate-400'}`}>{s.status}</span><button onClick={() => removeSubscriber(s.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/15 hover:text-red-400"><Trash2 className="h-4 w-4" /></button></div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}