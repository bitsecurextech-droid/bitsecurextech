import { useEffect, useState } from 'react';
import { Award, Plus, Loader2, Pencil, Trash2, Save, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminCerts() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ name: '', issuer: '', color: '#0066ff', expiry_date: '', sort_order: 0 });

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('admin_certifications').select('*').order('sort_order', { ascending: true });
    setItems(data ?? []); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await supabase.from('admin_certifications').update(form).eq('id', editing.id);
    } else {
      await supabase.from('admin_certifications').insert(form);
    }
    setOpen(false); setEditing(null); load();
  };

  const del = async (id: string) => { await supabase.from('admin_certifications').delete().eq('id', id); load(); };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="font-display text-2xl font-bold text-white">Certifications</h1><p className="text-sm text-slate-400">Manage certifications and reorder.</p></div>
        <button onClick={() => { setEditing(null); setOpen(true); }} className="btn-primary px-4 py-2 text-xs"><Plus className="h-4 w-4" /> New</button>
      </div>
      {loading ? <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
        : items.length === 0 ? <div className="flex flex-col items-center justify-center rounded-2xl glass py-16 text-center"><Award className="h-12 w-12 text-slate-600" /><p className="mt-4 text-sm text-slate-400">No certifications yet.</p></div>
        : (
          <div className="space-y-3">
            {items.map((c) => (
              <div key={c.id} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl glass p-5 card-hover">
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-full" style={{ background: c.color ?? '#0066ff' }} />
                  <div><h3 className="font-display text-base font-semibold text-white">{c.name}</h3><p className="text-xs text-slate-500">{c.issuer} · expires {c.expiry_date ?? '—'}</p></div>
                </div>
                <div className="flex items-center gap-2"><span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">Order: {c.sort_order ?? 0}</span><div className="flex items-center gap-1.5"><button onClick={() => { setEditing(c); setForm(c); setOpen(true); }} className="rounded-lg p-1.5 text-slate-400 hover:bg-cyber-500/15 hover:text-cyber-300"><Pencil className="h-4 w-4" /></button><button onClick={() => del(c.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/15 hover:text-red-400"><Trash2 className="h-4 w-4" /></button></div></div>
              </div>
            ))}
          </div>
        )}
      
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-2xl glass-strong p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between"><h2 className="font-display text-lg font-bold text-white">{editing ? 'Edit Certification' : 'New Certification'}</h2><button onClick={() => setOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"><X className="h-5 w-5" /></button></div>
            <form onSubmit={submit} className="mt-4 space-y-4">
              <div className="grid gap-4"><div><label className="text-xs uppercase tracking-wider text-slate-400">Name</label><input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="input-field" /></div><div><label className="text-xs uppercase tracking-wider text-slate-400">Issuer</label><input value={form.issuer} onChange={(e) => setForm({...form, issuer: e.target.value})} className="input-field" /></div></div>
              <div className="grid gap-4"><div><label className="text-xs uppercase tracking-wider text-slate-400">Color (hex)</label><input value={form.color} onChange={(e) => setForm({...form, color: e.target.value})} className="input-field" /></div><div><label className="text-xs uppercase tracking-wider text-slate-400">Expiry Date</label><input type="date" value={form.expiry_date} onChange={(e) => setForm({...form, expiry_date: e.target.value})} className="input-field" /></div></div>
              <button type="submit" className="btn-primary w-full py-2 text-xs"><Save className="h-4 w-4" /> Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}