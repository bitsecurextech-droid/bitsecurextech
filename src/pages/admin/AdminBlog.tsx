import { useState, useEffect } from 'react';
import { Newspaper, Plus, Loader2, Pencil, Trash2, Copy, Save, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { RichTextEditor } from '../../components/admin/RichTextEditor';

export function AdminBlog() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({
    title: '', category: 'Cybersecurity', excerpt: '', content: '', image_url: '', status: 'Draft', seo_title: '', seo_description: ''
  });

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('admin_blog_posts').select('*').order('created_at', { ascending: false });
    setItems(data ?? []); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await supabase.from('admin_blog_posts').update(form).eq('id', editing.id);
    } else {
      await supabase.from('admin_blog_posts').insert(form);
    }
    setOpen(false); setEditing(null); load();
  };

  const del = async (id: string) => { if (!confirm('Delete this post?')) return; await supabase.from('admin_blog_posts').delete().eq('id', id); load(); };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="font-display text-2xl font-bold text-white">Blog Posts</h1><p className="text-sm text-slate-400">Create, schedule, and manage blog content.</p></div>
        <button onClick={() => { setEditing(null); setOpen(true); }} className="btn-primary px-4 py-2 text-xs"><Plus className="h-4 w-4" /> New</button>
      </div>
      {loading ? <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
        : items.length === 0 ? <div className="flex flex-col items-center justify-center rounded-2xl glass py-16 text-center"><Newspaper className="h-12 w-12 text-slate-600" /><p className="mt-4 text-sm text-slate-400">No blog posts yet.</p></div>
        : (
          <div className="space-y-3">
            {items.map((p) => (
              <div key={p.id} className="rounded-2xl glass p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-base font-semibold text-white">{p.title}</h3>
                  <div className="flex items-center gap-1">
                    <span className="rounded-full bg-cyber-500/15 px-3 py-1 text-xs font-medium text-cyber-200">{p.category}</span>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${p.status === 'Published' ? 'bg-electric-500/15 text-electric-400' : 'bg-yellow-500/15 text-yellow-400'}`}>{p.status}</span>
                    <button onClick={() => { }} className="rounded-lg p-1.5 text-slate-400 hover:bg-cyber-500/15 hover:text-cyber-300" title="Clone"><Copy className="h-4 w-4" /></button>
                    <div className="flex items-center gap-1.5"><button onClick={() => { setEditing(p); setForm(p); setOpen(true); }} className="rounded-lg p-1.5 text-slate-400 hover:bg-cyber-500/15 hover:text-cyber-300"><Pencil className="h-4 w-4" /></button><button onClick={() => del(p.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/15 hover:text-red-400"><Trash2 className="h-4 w-4" /></button></div>
                  </div>
                </div>
                {p.excerpt && <p className="mt-2 text-sm text-slate-400 line-clamp-2">{p.excerpt}</p>}
              </div>
            ))}
          </div>
        )}
      
      {/* Editor Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl glass-strong p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between"><h2 className="font-display text-lg font-bold text-white">{editing ? 'Edit Post' : 'New Post'}</h2><button onClick={() => setOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"><X className="h-5 w-5" /></button></div>
            <form onSubmit={submit} className="mt-4 space-y-4">
              <div className="grid gap-4 md:grid-cols-2"><div><label className="text-xs uppercase tracking-wider text-slate-400">Title *</label><input required value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="input-field" /></div><div><label className="text-xs uppercase tracking-wider text-slate-400">Category</label><select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="input-field bg-navy-900 text-white">{['Cybersecurity','Development','Business','AI','News','Digital Marketing','SEO'].map(c => <option key={c}>{c}</option>)}</select></div></div>
              <div><label className="text-xs uppercase tracking-wider text-slate-400">Excerpt</label><textarea value={form.excerpt} onChange={(e) => setForm({...form, excerpt: e.target.value})} rows={2} className="input-field" /></div>
              <div><label className="text-xs uppercase tracking-wider text-slate-400">Content (Rich Text)</label><RichTextEditor value={form.content} onChange={(html) => setForm({...form, content: html})} /></div>
              <button type="submit" className="btn-primary w-full py-2 text-xs"><Save className="h-4 w-4" /> Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}