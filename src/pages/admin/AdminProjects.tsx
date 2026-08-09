import { useState, useEffect } from 'react';
import { FolderKanban, Plus, ExternalLink, Loader2, Pencil, Trash2, Save, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminProjects() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({
    title: '', category: 'Web Apps', industry: '', image_url: '', live_demo_url: '',
    description: '', tech: '', problem: '', solution: '', github_url: '', featured: false
  });

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('admin_projects').select('*').order('created_at', { ascending: false });
    setItems(data ?? []); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, tech: typeof form.tech === 'string' ? form.tech.split(',').map((s: string) => s.trim()).filter(Boolean) : form.tech };
    if (editing) {
      await supabase.from('admin_projects').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('admin_projects').insert(payload);
    }
    setEditing(null); setOpen(false); load();
  };

  const del = async (id: string) => { await supabase.from('admin_projects').delete().eq('id', id); load(); };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="font-display text-2xl font-bold text-white">Projects</h1><p className="text-sm text-slate-400">Manage portfolio projects.</p></div>
        <button onClick={() => { setEditing(null); setOpen(true); }} className="btn-primary px-4 py-2 text-xs"><Plus className="h-4 w-4" /> New</button>
      </div>
      {loading ? <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
        : items.length === 0 ? <div className="flex flex-col items-center justify-center rounded-2xl glass py-16 text-center"><FolderKanban className="h-12 w-12 text-slate-600" /><p className="mt-4 text-sm text-slate-400">No projects yet.</p></div>
        : (
          <div className="space-y-3">
            {items.map((p) => (
              <div key={p.id} className="rounded-2xl glass p-5 card-hover">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {p.image_url ? (<img src={p.image_url} alt={p.title} className="h-14 w-20 rounded-lg object-cover ring-1 ring-white/10" />) : (<div className="grid h-14 w-20 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10"><FolderKanban className="h-5 w-5 text-slate-500" /></div>)}
                    <div>
                      <div className="flex items-center gap-2"><h3 className="font-display text-base font-semibold text-white">{p.title}</h3>{p.featured && <span className="rounded-full bg-electric-500/15 px-3 py-1 text-xs font-medium text-electric-400">Featured</span>}</div>
                      {p.description && <p className="mt-0.5 text-xs text-slate-400 line-clamp-1">{p.description}</p>}
                      {p.live_demo_url && (<a href={p.live_demo_url} target="_blank" rel="noopener noreferrer" className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-cyber-400 hover:underline"><ExternalLink className="h-3 w-3" /> {p.live_demo_url}</a>)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-cyber-500/15 px-3 py-1 text-xs font-medium text-cyber-200">{p.category}</span>
                    <div className="flex items-center gap-1.5"><button onClick={() => { setEditing(p); setForm(p); setOpen(true); }} className="rounded-lg p-1.5 text-slate-400 hover:bg-cyber-500/15 hover:text-cyber-300" title="Edit"><Pencil className="h-4 w-4" /></button><button onClick={() => del(p.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/15 hover:text-red-400" title="Delete"><Trash2 className="h-4 w-4" /></button></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      
      {/* Crud Form Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-2xl glass-strong p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between"><h2 className="font-display text-lg font-bold text-white">{editing ? 'Edit Project' : 'New Project'}</h2><button onClick={() => setOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"><X className="h-5 w-5" /></button></div>
            <form onSubmit={submit} className="mt-4 space-y-4">
              {['title', 'category', 'industry', 'image_url', 'live_demo_url'].map((field) => (
                <div key={field}><label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">{field.replace('_', ' ')}</label><input type="text" value={form[field]} onChange={(e) => setForm({...form, [field]: e.target.value})} className="input-field" /></div>
              ))}
              <div><label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">Description</label><textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows={3} className="input-field" /></div>
              <div><label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">Tech Stack (comma-separated)</label><input type="text" value={form.tech} onChange={(e) => setForm({...form, tech: e.target.value})} className="input-field" /></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({...form, featured: e.target.checked})} className="h-4 w-4 rounded border-white/20 bg-white/10" /><label className="text-sm text-slate-300">Featured on homepage</label></div>
              <button type="submit" className="btn-primary w-full py-2 text-xs"><Save className="h-4 w-4" /> Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}