import { useState, useEffect } from 'react';
import { Plus, Loader2, Trash2, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function Tickets() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [subject, setSubject] = useState('');
  const [msg, setMsg] = useState('');

  const load = async () => {
    const { data } = await supabase.from('portal_tickets').select('*').order('created_at', { ascending: false });
    setItems(data ?? []); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('portal_tickets').insert({ subject, message: msg, priority: 'Normal' });
    setSubject(''); setMsg(''); setShow(false); load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h1 className="text-2xl font-bold text-white">Support Tickets</h1>
        <button onClick={() => setShow(!show)} className="btn-primary text-sm px-4 py-2"><Plus className="h-4 w-4" /> New</button>
      </div>

      {show && (
        <form onSubmit={submit} className="rounded-xl border border-cyber-500/30 bg-navy-800/50 p-4 space-y-3">
          <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" className="input-field" />
          <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="Describe your issue" rows={3} className="input-field" />
          <button type="submit" className="btn-primary text-sm px-4 py-2">Submit</button>
        </form>
      )}

      {loading ? <div className="flex justify-center py-10"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
        : items.length === 0 ? <div className="text-center py-10 text-slate-400">No tickets.</div>
        : <div className="space-y-3">{items.map(t => (
          <div key={t.id} className="rounded-xl bg-navy-800/50 p-4 border border-white/5">
            <div className="flex justify-between"><h3 className="font-medium text-white">{t.subject}</h3><button onClick={() => supabase.from('portal_tickets').delete().eq('id', t.id).then(load)} className="text-slate-400 hover:text-red-400"><Trash2 className="h-4 w-4" /></button></div>
            <p className="mt-2 text-sm text-slate-400">{t.message}</p>
          </div>
        ))}</div>}
    </div>
  );
}
export function Tickets;