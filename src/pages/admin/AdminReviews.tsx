import { useEffect, useState } from 'react';
import { Star, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminReviews() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('public_reviews').select('*').order('created_at', { ascending: false });
    setItems(data ?? []); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const approve = async (id: string) => { await supabase.from('public_reviews').update({ status: 'Approved' }).eq('id', id); load(); };
  const reject = async (id: string) => { await supabase.from('public_reviews').update({ status: 'Rejected' }).eq('id', id); load(); };
  const del = async (id: string) => { if (!confirm('Delete this review?')) return; await supabase.from('public_reviews').delete().eq('id', id); load(); };

  return (
    <div className="space-y-5">
      <div><h1 className="font-display text-2xl font-bold text-white">Public Reviews</h1><p className="text-sm text-slate-400">Approve, reject, or delete customer reviews.</p></div>
      {loading ? <p className="text-sm text-slate-400">Loading...</p> : items.length === 0 ? <div className="flex flex-col items-center justify-center rounded-2xl glass py-16 text-center"><Star className="h-12 w-12 text-slate-600" /><p className="mt-4 text-sm text-slate-400">No reviews submitted yet.</p></div> : (
        <div className="space-y-3">
          {items.map((r) => (
            <div key={r.id} className="rounded-2xl glass p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2"><h3 className="font-display text-base font-semibold text-white">{r.name}</h3><span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${r.status === 'Approved' ? 'bg-electric-500/15 text-electric-400' : r.status === 'Rejected' ? 'bg-red-500/15 text-red-400' : 'bg-yellow-500/15 text-yellow-400'}`}>{r.status}</span></div>
                  <p className="text-xs text-slate-500">{r.role}{r.company ? ` · ${r.company}` : ''}{r.project ? ` · ${r.project}` : ''}</p>
                  <div className="mt-1 flex gap-0.5">{[...Array(r.rating)].map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />)}</div>
                  <p className="mt-2 text-sm text-slate-300">"{r.text}"</p>
                </div>
                <div className="flex flex-col gap-2">
                  {r.status !== 'Approved' && <button onClick={() => approve(r.id)} className="rounded-lg bg-electric-500/15 px-3 py-1.5 text-xs font-medium text-electric-400 hover:bg-electric-500/25">Approve</button>}
                  {r.status !== 'Rejected' && <button onClick={() => reject(r.id)} className="rounded-lg bg-yellow-500/15 px-3 py-1.5 text-xs font-medium text-yellow-400 hover:bg-yellow-500/25">Reject</button>}
                  <button onClick={() => del(r.id)} className="rounded-lg bg-red-500/15 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/25">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}