import { useState, useEffect } from 'react';
import { Clock, ArrowRight, Newspaper, X, Plus, Pencil, Trash2, Loader2, CheckCircle2, Eye, EyeOff, Calendar, Image as ImageIcon } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { blogPosts, blogCategories } from '../lib/data';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth';
import { MediaPickerModal } from '../components/admin/MediaPickerModal';

type DBPost = {
  id: string;
  title: string;
  slug: string | null;
  category: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
};

type Post = {
  id?: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content?: string;
  date: string;
  readTime: string;
  image: string;
  status?: string;
  isAdmin?: boolean;
};

export function BlogPage() {
  const { session } = useAuth();
  const [cat, setCat] = useState('All');
  const [dbPosts, setDbPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [previewContent, setPreviewContent] = useState<string | null>(null);

  // ✅ Check if user is admin
  const isAdmin = session?.user?.email === 'admin@bitsecurex.tech' || false;

  // ============================================================
  // FORM STATE
  // ============================================================
  const [formData, setFormData] = useState({
    title: '',
    category: 'Cybersecurity',
    excerpt: '',
    content: '',
    image_url: '',
    status: 'Draft',
  });

  // ============================================================
  // LOAD POSTS
  // ============================================================
  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('admin_blog_posts')
      .select('*')
      .order('published_at', { ascending: false })
      .order('created_at', { ascending: false });

    if (data) {
      const mapped: Post[] = (data as DBPost[]).map((p) => ({
        id: p.id,
        slug: p.slug || p.id,
        title: p.title,
        category: p.category,
        excerpt: p.excerpt || '',
        content: p.content || '',
        date: p.published_at
          ? new Date(p.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          : new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: `${Math.max(1, Math.ceil((p.content || p.excerpt || '').length / 1000))} min`,
        image: p.image_url || 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&w=1000',
        status: p.status,
        isAdmin: true,
      }));
      setDbPosts(mapped);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ============================================================
  // CREATE / UPDATE POST
  // ============================================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      title: formData.title,
      category: formData.category,
      excerpt: formData.excerpt,
      content: formData.content,
      image_url: formData.image_url || null,
      status: formData.status,
      published_at: formData.status === 'Published' ? new Date().toISOString() : null,
      slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    };

    let result;
    if (editingPost?.id) {
      result = await supabase
        .from('admin_blog_posts')
        .update(payload)
        .eq('id', editingPost.id);
    } else {
      result = await supabase
        .from('admin_blog_posts')
        .insert(payload);
    }

    if (result.error) {
      alert('Failed to save post. Please try again.');
      setIsSubmitting(false);
      return;
    }

    setFormData({ title: '', category: 'Cybersecurity', excerpt: '', content: '', image_url: '', status: 'Draft' });
    setEditingPost(null);
    setShowEditor(false);
    setIsSubmitting(false);
    fetchPosts();
  };

  // ============================================================
  // DELETE POST
  // ============================================================
  const deletePost = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This action cannot be undone.`)) return;
    const { error } = await supabase
      .from('admin_blog_posts')
      .delete()
      .eq('id', id);
    if (error) {
      alert('Failed to delete post.');
      return;
    }
    fetchPosts();
  };

  // ============================================================
  // TOGGLE PUBLISH STATUS
  // ============================================================
  const togglePublish = async (post: Post) => {
    const newStatus = post.status === 'Published' ? 'Draft' : 'Published';
    const { error } = await supabase
      .from('admin_blog_posts')
      .update({
        status: newStatus,
        published_at: newStatus === 'Published' ? new Date().toISOString() : null,
      })
      .eq('id', post.id);

    if (error) {
      alert('Failed to update status.');
      return;
    }
    fetchPosts();
  };

  // ============================================================
  // OPEN EDITOR FOR EDITING
  // ============================================================
  const openEditor = (post?: Post) => {
    if (post) {
      setEditingPost(post);
      setFormData({
        title: post.title,
        category: post.category,
        excerpt: post.excerpt || '',
        content: post.content || '',
        image_url: post.image || '',
        status: post.status || 'Draft',
      });
    } else {
      setEditingPost(null);
      setFormData({ title: '', category: 'Cybersecurity', excerpt: '', content: '', image_url: '', status: 'Draft' });
    }
    setShowEditor(true);
  };

  // ============================================================
  // RENDER
  // ============================================================
  const allPosts = [...dbPosts, ...blogPosts];
  
  const uniqueCategories = Array.from(new Set(blogCategories));
  const dbCategories = Array.from(new Set(dbPosts.map((p) => p.category)));
  const allCats = ['All', ...uniqueCategories, ...dbCategories].filter(
    (value, index, self) => self.indexOf(value) === index
  );
  
  const filtered = cat === 'All' ? allPosts : allPosts.filter((p) => p.category === cat);
  const featured = allPosts[0];

  return (
    <div className="pt-28">
      {/* ===== HERO ===== */}
      <section className="section-pad pb-8">
        <div className="container-x text-center">
          <Reveal><span className="eyebrow">Insights</span></Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              The <span className="gradient-text">BitSecureX</span> Blog
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
              Cybersecurity, development, and business insights from our team.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== ADMIN CONTROLS ===== */}
      {isAdmin && (
        <section className="section-pad py-4">
          <div className="container-x">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-400">Admin:</span>
                <button
                  onClick={() => openEditor()}
                  className="inline-flex items-center gap-2 rounded-full bg-electric-500/20 px-4 py-2 text-sm font-medium text-electric-400 ring-1 ring-electric-500/50 transition-all hover:bg-electric-500/30"
                >
                  <Plus className="h-4 w-4" /> Write New Post
                </button>
              </div>
              <span className="text-xs text-slate-500">{dbPosts.filter(p => p.status === 'Published').length} published · {dbPosts.filter(p => p.status === 'Draft').length} drafts</span>
            </div>
          </div>
        </section>
      )}

      {/* ===== FEATURED POST ===== */}
      {featured && (
        <section className="section-pad py-6">
          <div className="container-x">
            <Reveal>
              <button
                onClick={() => setActivePost(featured)}
                className="group grid w-full overflow-hidden rounded-3xl glass card-hover text-left lg:grid-cols-2"
              >
                <div className="relative h-56 overflow-hidden lg:h-full">
                  <img src={featured.image} alt={featured.title} className="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full bg-electric-500 px-3 py-1 text-xs font-bold text-navy-950">Featured</span>
                </div>
                <div className="p-8 lg:p-10">
                  <span className="text-xs font-medium uppercase tracking-wider text-cyber-400">{featured.category}</span>
                  <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">{featured.title}</h2>
                  
                  {/* ✅ RENDER EXCERPT WITH HTML */}
                  <div 
                    className="mt-3 text-slate-400 prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: featured.excerpt || '' }}
                  />
                  
                  <div className="mt-5 flex items-center gap-4 text-sm text-slate-500">
                    <span>{featured.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {featured.readTime}</span>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-cyber-400 transition-transform group-hover:translate-x-1">
                    Read article <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </button>
            </Reveal>
          </div>
        </section>
      )}

      {/* ===== CATEGORY FILTERS ===== */}
      <section className="section-pad py-6">
        <div className="container-x">
          <div className="flex flex-wrap justify-center gap-2">
            {allCats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  cat === c
                    ? 'bg-gradient-to-r from-cyber-500 to-electric-500 text-white'
                    : 'border border-white/10 bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* ===== POSTS GRID ===== */}
          {loading ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => <div key={i} className="h-72 animate-pulse rounded-2xl glass" />)}
            </div>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <Reveal key={p.slug + i} delay={i * 70}>
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl glass card-hover">
                    {/* Admin Controls on Card */}
                    {isAdmin && p.isAdmin && (
                      <div className="absolute right-2 top-2 z-10 flex gap-1">
                        <button
                          onClick={() => togglePublish(p)}
                          className="rounded-full bg-navy-950/80 p-1.5 text-slate-400 transition-colors hover:bg-navy-800 hover:text-white"
                          title={p.status === 'Published' ? 'Unpublish' : 'Publish'}
                        >
                          {p.status === 'Published' ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                        </button>
                        <button
                          onClick={() => openEditor(p)}
                          className="rounded-full bg-navy-950/80 p-1.5 text-slate-400 transition-colors hover:bg-navy-800 hover:text-white"
                          title="Edit"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => deletePost(p.id!, p.title)}
                          className="rounded-full bg-navy-950/80 p-1.5 text-slate-400 transition-colors hover:bg-red-500/30 hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}

                    {/* Status Badge */}
                    {p.status && p.status !== 'Published' && (
                      <span className="absolute left-2 top-2 z-10 rounded-full bg-yellow-500/80 px-2 py-0.5 text-[10px] font-bold text-navy-950">
                        Draft
                      </span>
                    )}

                    <button
                      onClick={() => p.content ? setActivePost(p) : null}
                      className="flex h-full w-full flex-col text-left"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover opacity-65 transition-all duration-700 group-hover:scale-110 group-hover:opacity-85" />
                        <span className="absolute left-4 top-4 rounded-full bg-navy-950/80 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                          {p.category}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="font-display text-lg font-semibold text-white">{p.title}</h3>
                        
                        {/* ✅ RENDER EXCERPT WITH HTML */}
                        <div 
                          className="mt-2 flex-1 text-sm text-slate-400 prose prose-invert max-w-none line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: p.excerpt || '' }}
                        />
                        
                        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                          <span>{p.date}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {p.readTime}</span>
                        </div>
                      </div>
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="mt-10 flex flex-col items-center justify-center py-16 text-center">
              <Newspaper className="h-10 w-10 text-slate-600" />
              <p className="mt-4 text-slate-400">No posts in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================
      BLOG POST MODAL (Reader) - ✅ RENDERS HTML
      ============================================================ */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy-950/80 p-4 backdrop-blur-sm sm:p-8" onClick={() => setActivePost(null)}>
          <div className="relative my-8 w-full max-w-3xl rounded-2xl glass p-8 sm:p-10" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActivePost(null)} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:text-white">
              <X className="h-4 w-4" />
            </button>
            <span className="text-xs font-medium uppercase tracking-wider text-cyber-400">{activePost.category}</span>
            <h2 className="mt-3 font-display text-2xl font-bold text-white">{activePost.title}</h2>
            <div className="mt-3 flex items-center gap-4 text-sm text-slate-500">
              <span>{activePost.date}</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {activePost.readTime}</span>
            </div>
            {activePost.image && <img src={activePost.image} alt={activePost.title} className="mt-6 h-56 w-full rounded-xl object-cover" />}
            
            {/* ✅ RENDER FULL CONTENT WITH HTML */}
            {activePost.content ? (
              <div 
                className="mt-6 prose prose-invert max-w-none text-slate-300"
                dangerouslySetInnerHTML={{ __html: activePost.content }}
              />
            ) : (
              <div 
                className="mt-6 text-sm text-slate-400 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: activePost.excerpt || '' }}
              />
            )}
          </div>
        </div>
      )}

      {/* ============================================================
      PREVIEW MODAL - ✅ RENDERS HTML
      ============================================================ */}
      {previewContent && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm overflow-y-auto"
          onClick={() => setPreviewContent(null)}
        >
          <div 
            className="w-full max-w-3xl rounded-2xl bg-white p-8 text-gray-900 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-gray-900">🔍 Preview</h2>
              <button 
                onClick={() => setPreviewContent(null)} 
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* ✅ RENDER HTML PREVIEW */}
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
      WRITE / EDIT POST MODAL - ✅ WITH LIVE PREVIEW
      ============================================================ */}
      {showEditor && isAdmin && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setShowEditor(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl glass-strong p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-white">
                {editingPost ? '✏️ Edit Post' : '✏️ Write New Post'}
              </h2>
              <button
                onClick={() => setShowEditor(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {/* Title */}
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  placeholder="My Amazing Blog Post"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-field"
                >
                  {['Cybersecurity', 'Development', 'AI', 'Business', 'Digital Marketing', 'SEO', 'News', 'SaaS', 'Automation'].map((c) => (
                    <option key={c} className="bg-navy-900">{c}</option>
                  ))}
                </select>
              </div>

              {/* Excerpt */}
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
                  Excerpt / Summary
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="input-field resize-none"
                  rows={2}
                  placeholder="Brief summary of your post..."
                />
              </div>

              {/* Content with Live Preview */}
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
                  Content *
                </label>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Editor */}
                  <textarea
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="input-field resize-none min-h-[300px] font-mono text-sm"
                    placeholder="Write your blog post content here... (Use HTML tags like &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;, etc.)"
                  />
                  
                  {/* ✅ Live Preview */}
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4 overflow-y-auto min-h-[300px] max-h-[500px]">
                    <p className="text-xs text-slate-400 mb-2">🔍 Live Preview</p>
                    {formData.content ? (
                      <div 
                        className="prose prose-invert max-w-none text-white"
                        dangerouslySetInnerHTML={{ __html: formData.content }}
                      />
                    ) : (
                      <p className="text-sm text-slate-500 italic">Start typing to see preview...</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
                  Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="input-field flex-1"
                    placeholder="https://example.com/image.jpg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowMediaPicker(true)}
                    className="btn-ghost px-4 py-2 text-sm"
                  >
                    <ImageIcon className="h-4 w-4" /> Browse
                  </button>
                </div>
                {formData.image_url && (
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="mt-2 h-32 w-full rounded-lg object-cover"
                    onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                  />
                )}
              </div>

              {/* Status */}
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="input-field"
                >
                  <option className="bg-navy-900" value="Draft">📝 Draft</option>
                  <option className="bg-navy-900" value="Published">🚀 Published</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                {/* ✅ Preview Button */}
                <button
                  type="button"
                  onClick={() => setPreviewContent(formData.content)}
                  className="btn-ghost flex-1 py-2.5 text-sm flex items-center justify-center gap-2"
                >
                  <Eye className="h-4 w-4" /> Preview
                </button>
                
                <button
                  type="button"
                  onClick={() => setShowEditor(false)}
                  className="btn-ghost flex-1 py-2.5 text-sm"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex-1 py-2.5 text-sm"
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {isSubmitting ? 'Saving...' : editingPost ? 'Update Post' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================
      MEDIA PICKER MODAL
      ============================================================ */}
      <MediaPickerModal
        open={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelect={(url) => {
          setFormData({ ...formData, image_url: url });
          setShowMediaPicker(false);
        }}
      />
    </div>
  );
}
export default BlogPage;
