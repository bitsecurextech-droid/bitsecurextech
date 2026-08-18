import { useState, useEffect } from 'react';
import { Newspaper, Plus, Loader2, Pencil, Trash2, Copy, Save, X, Eye, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { RichTextEditor } from '../../components/admin/RichTextEditor';

export function AdminBlog() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    category: 'Cybersecurity',
    excerpt: '',
    content: '',
    image_url: '',
    status: 'Draft',
    seo_title: '',
    seo_description: ''
  });

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('admin_blog_posts').select('*').order('created_at', { ascending: false });
    setItems(data ?? []); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // ✅ Always set status to 'Published' when saving
    const payload = {
      ...form,
      status: 'Published',
      published_at: new Date().toISOString(),
    };
    
    if (editing) {
      await supabase.from('admin_blog_posts').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('admin_blog_posts').insert(payload);
    }
    setOpen(false); setEditing(null); load();
  };

  // ✅ Save as Draft
  const saveDraft = async () => {
    const payload = {
      ...form,
      status: 'Draft',
    };
    
    if (editing) {
      await supabase.from('admin_blog_posts').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('admin_blog_posts').insert(payload);
    }
    setOpen(false); setEditing(null); load();
  };

  // ✅ Publish an existing draft
  const publishPost = async (id: string) => {
    if (!confirm('Publish this post?')) return;
    await supabase
      .from('admin_blog_posts')
      .update({ 
        status: 'Published', 
        published_at: new Date().toISOString() 
      })
      .eq('id', id);
    load();
  };

  const del = async (id: string) => { 
    if (!confirm('Delete this post?')) return; 
    await supabase.from('admin_blog_posts').delete().eq('id', id); 
    load(); 
  };

  const clonePost = async (post: any) => {
    const { data } = await supabase
      .from('admin_blog_posts')
      .insert({
        title: `${post.title} (Copy)`,
        category: post.category,
        excerpt: post.excerpt,
        content: post.content,
        image_url: post.image_url,
        status: 'Draft',
        seo_title: post.seo_title,
        seo_description: post.seo_description
      })
      .select();
    if (data) load();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-sm text-slate-400">Create, schedule, and manage blog content.</p>
        </div>
        <button 
          onClick={() => { 
            setEditing(null); 
            setForm({
              title: '',
              category: 'Cybersecurity',
              excerpt: '',
              content: '',
              image_url: '',
              status: 'Draft',
              seo_title: '',
              seo_description: ''
            });
            setOpen(true); 
          }} 
          className="btn-primary px-4 py-2 text-xs"
        >
          <Plus className="h-4 w-4" /> New
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-cyber-400" />
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl glass py-16 text-center">
          <Newspaper className="h-12 w-12 text-slate-600" />
          <p className="mt-4 text-sm text-slate-400">No blog posts yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((p) => (
            <div key={p.id} className="rounded-2xl glass p-5 border border-white/5 hover:border-cyber-500/30 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex-1">
                  <h3 className="font-display text-base font-semibold text-white">{p.title}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-cyber-500/15 px-3 py-1 text-xs font-medium text-cyber-200">{p.category}</span>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                      p.status === 'Published' 
                        ? 'bg-green-500/15 text-green-400' 
                        : 'bg-yellow-500/15 text-yellow-400'
                    }`}>
                      {p.status === 'Published' ? (
                        <CheckCircle className="h-3 w-3 inline mr-1" />
                      ) : (
                        <AlertCircle className="h-3 w-3 inline mr-1" />
                      )}
                      {p.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {/* ✅ Preview Button */}
                  <button 
                    onClick={() => setPreviewContent(p.content)} 
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-cyber-500/15 hover:text-cyber-300"
                    title="Preview"
                  >
                    <Eye className="h-4 w-4" />
                  </button>

                  {/* ✅ Publish Button (only for drafts) */}
                  {p.status !== 'Published' && (
                    <button 
                      onClick={() => publishPost(p.id)} 
                      className="rounded-lg p-1.5 text-green-400 hover:bg-green-500/15"
                      title="Publish Now"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </button>
                  )}

                  <button 
                    onClick={() => clonePost(p)} 
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-cyber-500/15 hover:text-cyber-300"
                    title="Clone"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  
                  <button 
                    onClick={() => { 
                      setEditing(p); 
                      setForm({
                        title: p.title || '',
                        category: p.category || 'Cybersecurity',
                        excerpt: p.excerpt || '',
                        content: p.content || '',
                        image_url: p.image_url || '',
                        status: p.status || 'Draft',
                        seo_title: p.seo_title || '',
                        seo_description: p.seo_description || ''
                      }); 
                      setOpen(true); 
                    }} 
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-cyber-500/15 hover:text-cyber-300"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  
                  <button 
                    onClick={() => del(p.id)} 
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/15 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {p.excerpt && <p className="mt-2 text-sm text-slate-400 line-clamp-2">{p.excerpt}</p>}
            </div>
          ))}
        </div>
      )}
      
      {/* ============================================================
      PREVIEW MODAL
      ============================================================ */}
      {previewContent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm overflow-y-auto"
          onClick={() => setPreviewContent(null)}
        >
          <div 
            className="w-full max-w-3xl rounded-2xl bg-white p-8 text-gray-900 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-gray-900">Preview</h2>
              <button 
                onClick={() => setPreviewContent(null)} 
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: previewContent }} 
            />
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setPreviewContent(null)} 
                className="btn-primary"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* ============================================================
      EDITOR MODAL
      ============================================================ */}
      {open && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto" 
          onClick={() => setOpen(false)}
        >
          <div 
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl glass-strong p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-white">
                {editing ? 'Edit Post' : 'New Post'}
              </h2>
              <button 
                onClick={() => setOpen(false)} 
                className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={submit} className="mt-4 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Title *</label>
                  <input 
                    required 
                    value={form.title} 
                    onChange={(e) => setForm({...form, title: e.target.value})} 
                    className="input-field" 
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Category</label>
                  <select 
                    value={form.category} 
                    onChange={(e) => setForm({...form, category: e.target.value})} 
                    className="input-field bg-navy-900 text-white"
                  >
                    {['Cybersecurity','Development','Business','AI','News','Digital Marketing','SEO'].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Excerpt</label>
                <textarea 
                  value={form.excerpt} 
                  onChange={(e) => setForm({...form, excerpt: e.target.value})} 
                  rows={2} 
                  className="input-field" 
                />
              </div>
              
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Content (Rich Text)</label>
                <RichTextEditor 
                  value={form.content} 
                  onChange={(html) => setForm({...form, content: html})} 
                />
              </div>
              
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Image URL</label>
                <input 
                  value={form.image_url} 
                  onChange={(e) => setForm({...form, image_url: e.target.value})} 
                  className="input-field" 
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="flex gap-3">
                {/* ✅ Preview Button */}
                <button 
                  type="button"
                  onClick={() => setPreviewContent(form.content)}
                  className="btn-ghost flex-1 py-2 text-xs flex items-center justify-center gap-2"
                >
                  <Eye className="h-4 w-4" /> Preview
                </button>
                
                {/* ✅ Save as Draft Button */}
                <button 
                  type="button"
                  onClick={saveDraft}
                  className="btn-ghost flex-1 py-2 text-xs flex items-center justify-center gap-2 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                >
                  <Save className="h-4 w-4" /> Save Draft
                </button>
                
                {/* ✅ Publish Button */}
                <button 
                  type="submit"
                  className="btn-primary flex-1 py-2 text-xs flex items-center justify-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" /> Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
