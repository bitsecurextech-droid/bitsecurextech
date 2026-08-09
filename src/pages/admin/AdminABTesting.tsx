import { useState, useEffect } from 'react';
import { FlaskConical, Plus, Loader2, Pencil, Trash2, Save, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

// ✅ FIXED: "export function" makes it a NAMED export
export function AdminABTesting() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ headline: '', traffic_pct: 50 });

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('admin_ab_variants').select('*').order('created_at', { ascending: false });
    setItems(data ?? []); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await supabase.from('admin_ab_variants').update(form).eq('id', editing.id);
    } else {
      await supabase.from('admin_ab_variants').insert(form);
    }
    setOpen(false); setEditing(null); load();
  };

  const toggleActive = async (v: any) => { await supabase.from('admin_ab_variants').update({ active: !v.active }).eq('id', v.id); load(); };
  const del = async (id: string) => { await supabase.from('admin_ab_variants').delete().eq('id', id); load(); };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="font-display text-2xl font-bold text-white">A/B Testing Lab</h1><p className="text-sm text-slate-400">Experiment with headlines and accent colors.</p></div>
        <button onClick={() => { setEditing(null); setOpen(true); }} className="btn-primary px-4 py-2 text-xs"><Plus className="h-4 w-4" /> New Variant</button>
      </div>
      {loading ? <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
        : items.length === 0 ? <div className="flex flex-col items-center justify-center rounded-2xl glass py-16 text-center"><FlaskConical className="h-12 w-12 text-slate-600" /><p className="mt-4 text-sm text-slate-400">No variants yet.</p></div>
        : (
          <div className="space-y-3">
            {items.map((v) => (
              <div key={v.id} className="rounded-2xl glass p-5 card-hover">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-base font-semibold text-white">{v.headline}</h3>
                  <div className="flex items-center gap-2"><span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">{v.traffic_pct ?? 0}% traffic</span><button onClick={() => toggleActive(v)} className={`rounded-full px-3 py-1 text-xs ${v.active ? 'bg-electric-500/15 text-electric-400' : 'bg-white/5 text-slate-400'}`}>{v.active ? 'Active' : 'Inactive'}</button><div className="flex items-center gap-1.5"><button onClick={() => { setEditing(v); setForm(v); setOpen(true); }} className="rounded-lg p-1.5 text-slate-400 hover:bg-cyber-500/15 hover:text-cyber-300"><Pencil className="h-4 w-4" /></button><button onClick={() => del(v.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/15 hover:text-red-400"><Trash2 className="h-4 w-4" /></button></div></div>
                </div>
              </div>
            ))}
          </div>
        )}
      
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-2xl glass-strong p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between"><h2 className="font-display text-lg font-bold text-white">{editing ? 'Edit Variant' : 'New Variant'}</h2><button onClick={() => setOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"><X className="h-5 w-5" /></button></div>
            <form onSubmit={submit} className="mt-4 space-y-4">
              <div className="grid gap-4"><div><label className="text-xs uppercase tracking-wider text-slate-400">Headline</label><input value={form.headline} onChange={(e) => setForm({...form, headline: e.target.value})} className="input-field" /></div><div><label className="text-xs uppercase tracking-wider text-slate-400">Traffic %</label><input type="number" value={form.traffic_pct} onChange={(e) => setForm({...form, traffic_pct: Number(e.target.value)})} className="input-field" /></div></div>
              <button type="submit" className="btn-primary w-full py-2 text-xs"><Save className="h-4 w-4" /> Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}