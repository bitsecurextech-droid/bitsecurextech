import { useEffect, useState } from 'react';
import { FileText, Plus, Loader2, Pencil, Trash2, Save, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminCaseStudies() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({
    title: '', client: '', industry: '', challenge: '', strategy: '', design: '', development: '', security: '', image_url: ''
  });

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('admin_case_studies').select('*').order('created_at', { ascending: false });
    setItems(data ?? []); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await supabase.from('admin_case_studies').update(form).eq('id', editing.id);
    } else {
      await supabase.from('admin_case_studies').insert(form);
    }
    setOpen(false); setEditing(null); load();
  };

  const del = async (id: string) => { await supabase.from('admin_case_studies').delete().eq('id', id); load(); };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Case Studies</h1>
          <p className="text-sm text-slate-400">Full CRUD for case studies.</p>
        </div>
        <button onClick={() => { setEditing(null); setOpen(true); }} className="btn-primary px-4 py-2 text-xs">
          <Plus className="h-4 w-4" /> New
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl glass py-16 text-center">
          <FileText className="h-12 w-12 text-slate-600" />
          <p className="mt-4 text-sm text-slate-400">No case studies yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl glass p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-display text-base font-semibold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-500">{item.client} · {item.industry}</p>
                  {item.challenge && <p className="mt-2 text-sm text-slate-400 line-clamp-2">{item.challenge}</p>}
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => { setEditing(item); setForm(item); setOpen(true); }} className="rounded-lg p-1.5 text-slate-400 hover:bg-cyber-500/15 hover:text-cyber-300">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => del(item.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/15 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Editor Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-2xl glass-strong p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-white">{editing ? 'Edit Case Study' : 'New Case Study'}</h2>
              <button onClick={() => setOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={submit} className="mt-4 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Title</label>
                  <input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="input-field" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Client</label>
                  <input value={form.client} onChange={(e) => setForm({...form, client: e.target.value})} className="input-field" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Industry</label>
                  <input value={form.industry} onChange={(e) => setForm({...form, industry: e.target.value})} className="input-field" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Image URL</label>
                  <input value={form.image_url} onChange={(e) => setForm({...form, image_url: e.target.value})} className="input-field" />
                </div>
              </div>
              {['challenge','strategy','design','development','security'].map((field) => (
                <div key={field}>
                  <label className="text-xs uppercase tracking-wider text-slate-400">{field}</label>
                  <textarea value={form[field]} onChange={(e) => setForm({...form, [field]: e.target.value})} rows={3} className="input-field" />
                </div>
              ))}
              <button type="submit" className="btn-primary w-full py-2 text-xs">
                <Save className="h-4 w-4" /> Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}