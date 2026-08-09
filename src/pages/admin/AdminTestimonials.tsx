import { useEffect, useState } from 'react';
import { Star, Plus, Loader2, Pencil, Trash2, CheckCircle, BadgeCheck, X, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminTestimonials() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ name: '', role: '', company: '', rating: 5, text: '', image_url: '', status: 'Pending', verified: false });

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('admin_testimonials').select('*').order('created_at', { ascending: false });
    setItems(data ?? []); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await supabase.from('admin_testimonials').update(form).eq('id', editing.id);
    } else {
      await supabase.from('admin_testimonials').insert(form);
    }
    setOpen(false); setEditing(null); load();
  };

  const setStatus = async (id: string, status: string) => { await supabase.from('admin_testimonials').update({ status }).eq('id', id); load(); };
  const toggleVerified = async (p: any) => { await supabase.from('admin_testimonials').update({ verified: !p.verified }).eq('id', p.id); load(); };
  const del = async (id: string) => { await supabase.from('admin_testimonials').delete().eq('id', id); load(); };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="font-display text-2xl font-bold text-white">Testimonials</h1><p className="text-sm text-slate-400">Approve and manage client testimonials.</p></div>
        <button onClick={() => { setEditing(null); setOpen(true); }} className="btn-primary px-4 py-2 text-xs"><Plus className="h-4 w-4" /> New</button>
      </div>
      {loading ? <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
        : items.length === 0 ? <div className="flex flex-col items-center justify-center rounded-2xl glass py-16 text-center"><Star className="h-12 w-12 text-slate-600" /><p className="mt-4 text-sm text-slate-400">No testimonials yet.</p></div>
        : (
          <div className="space-y-3">
            {items.map((t) => (
              <div key={t.id} className="rounded-2xl glass p-5 card-hover">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2"><h3 className="font-display text-base font-semibold text-white">{t.name}</h3><span className="text-xs text-slate-500">{t.role} · {t.company}</span>{t.verified && <BadgeCheck className="h-4 w-4 text-electric-400" />}</div>
                  <div className="flex items-center gap-2"><span className="rounded-full bg-yellow-500/15 px-3 py-1 text-xs font-medium text-yellow-400">{'★'.repeat(t.rating ?? 5)}</span><span className={`rounded-full px-3 py-1 text-xs font-medium ${t.status === 'Approved' ? 'bg-electric-500/15 text-electric-400' : 'bg-yellow-500/15 text-yellow-400'}`}>{t.status ?? 'Pending'}</span></div>
                </div>
                {t.text && <p className="mt-2 text-sm text-slate-400">{t.text}</p>}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button onClick={() => setStatus(t.id, 'Approved')} className="btn-ghost px-3 py-1.5 text-xs"><CheckCircle className="h-3.5 w-3.5" /> Approve</button>
                  <button onClick={() => setStatus(t.id, 'Pending')} className="btn-ghost px-3 py-1.5 text-xs"><X className="h-3.5 w-3.5" /> Reject</button>
                  <button onClick={() => toggleVerified(t)} className="btn-ghost px-3 py-1.5 text-xs"><BadgeCheck className="h-3.5 w-3.5" /> Toggle Verified</button>
                  <div className="flex items-center gap-1.5"><button onClick={() => { setEditing(t); setForm(t); setOpen(true); }} className="rounded-lg p-1.5 text-slate-400 hover:bg-cyber-500/15 hover:text-cyber-300"><Pencil className="h-4 w-4" /></button><button onClick={() => del(t.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/15 hover:text-red-400"><Trash2 className="h-4 w-4" /></button></div>
                </div>
              </div>
            ))}
          </div>
        )}
      
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-2xl glass-strong p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between"><h2 className="font-display text-lg font-bold text-white">{editing ? 'Edit Testimonial' : 'New Testimonial'}</h2><button onClick={() => setOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"><X className="h-5 w-5" /></button></div>
            <form onSubmit={submit} className="mt-4 space-y-4">
              {['name','role','company'].map((field) => (<div key={field}><label className="text-xs uppercase tracking-wider text-slate-400">{field}</label><input value={form[field]} onChange={(e) => setForm({...form, [field]: e.target.value})} className="input-field" /></div>))}
              <div><label className="text-xs uppercase tracking-wider text-slate-400">Rating (1-5)</label><input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({...form, rating: Number(e.target.value)})} className="input-field" /></div>
              <div><label className="text-xs uppercase tracking-wider text-slate-400">Testimonial</label><textarea value={form.text} onChange={(e) => setForm({...form, text: e.target.value})} rows={4} className="input-field" /></div>
              <button type="submit" className="btn-primary w-full py-2 text-xs"><Save className="h-4 w-4" /> Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}