import { useState, useEffect, useRef } from 'react';
import { 
  // Core Icons
  Newspaper, Plus, Loader2, Pencil, Trash2, Copy, Save, X, 
  Eye, CheckCircle, AlertCircle, Image, Video, Calendar, 
  Tag, User, Link2, Bold, Italic, Underline, List, ListOrdered,
  Quote, Code, Upload, FileImage, Clock, EyeOff, Search,
  Filter, ArrowUpDown, ChevronDown, ChevronUp, 
  
  // Premium Features Icons
  Layout, Columns, Grid3x3, Type, Palette, Sparkles, 
  Share2, Mail, MessageCircle, ThumbsUp, Award, BarChart3,
  TrendingUp, Users, Globe, Languages, Shield, Lock,
  Bell, Settings, Download, FileSpreadsheet, Trash2 as TrashIcon,
  RotateCcw, History, Bookmark, Pin, Star, Zap,
  Box, Link, Code2, Braces, Server, Database,
  CloudUpload, CloudDownload, Image as ImageIcon, Film,
  Mic, Music, Podcast, Headphones, Video as VideoIcon,
  Play, Pause, Volume2, Maximize, Minimize, AlignLeft,
  AlignCenter, AlignRight, AlignJustify, Indent, Outdent,
  Highlighter, Eraser, Undo, Redo, Scissors, Copy as CopyIcon,
  Clipboard, FileText, FileCode, FileImage as FileImageIcon,
  Folder, FolderOpen, FolderPlus, Archive, RefreshCw,
  Send, MessageSquare, PhoneCall, Video as VideoCall,
  Gift, Ticket, Percent, DollarSign, CreditCard,
  Truck, Package, ShoppingBag, ShoppingCart, Store,
  Instagram, Twitter, Facebook, Linkedin, Youtube, Twitch,
  Figma, Github, Gitlab, Bitbucket, Slack, Discord,
  Zoom, Teams, Meet, Calender, Clock as ClockIcon,
  Timer, Hourglass, Stopwatch, AlarmClock, Sun, Moon,
  Monitor, Tablet, Smartphone, Laptop, Wifi, WifiOff,
  Bluetooth, Battery, BatteryFull, BatteryCharging,
  Signal, SignalHigh, SignalLow, SignalMedium,
  // Admin Icons
  Settings2, ShieldCheck, Users2, FileCheck, FileX,
  Star as StarIcon, Heart, Zap as ZapIcon, Flame,
  Crown, Medal, Trophy, Award as AwardIcon,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

type Post = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image_url: string;
  video_url: string;
  tags: string[];
  author: string;
  status: 'Draft' | 'Published' | 'Scheduled' | 'Archived';
  published_at: string | null;
  scheduled_at: string | null;
  views: number;
  read_time: number;
  seo_title: string;
  seo_description: string;
  likes: number;
  comments_count: number;
  is_featured: boolean;
  is_pinned: boolean;
  password: string | null;
  template: string;
  layout: 'full' | 'sidebar' | 'minimal';
  created_at: string;
  updated_at: string;
};

const CATEGORIES = ['Cybersecurity', 'Development', 'AI', 'Business', 'Digital Marketing', 'SEO', 'News', 'SaaS', 'Automation', 'Web Development'];
const STATUSES = ['Draft', 'Published', 'Scheduled', 'Archived'];
const TEMPLATES = ['Standard', 'Minimal', 'Full-Width', 'Sidebar-Left', 'Sidebar-Right', 'Magazine'];
const LAYOUTS = ['full', 'sidebar', 'minimal'];

export function AdminBlog() {
  // ============================================================
  // STATE
  // ============================================================
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterAuthor, setFilterAuthor] = useState('All');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [preview, setPreview] = useState<string | null>(null);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [authors, setAuthors] = useState<string[]>([]);

  // ============================================================
  // FORM STATE
  // ============================================================
  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: 'Cybersecurity',
    excerpt: '',
    content: '',
    image_url: '',
    video_url: '',
    tags: '',
    author: 'Admin',
    status: 'Draft' as 'Draft' | 'Published' | 'Scheduled' | 'Archived',
    scheduled_at: '',
    seo_title: '',
    seo_description: '',
    is_featured: false,
    is_pinned: false,
    password: '',
    template: 'Standard',
    layout: 'full' as 'full' | 'sidebar' | 'minimal',
  });

  // ============================================================
  // LOAD POSTS
  // ============================================================
  const load = async () => {
    setLoading(true);
    let query = supabase.from('admin_blog_posts').select('*');

    if (filterStatus !== 'All') query = query.eq('status', filterStatus);
    if (filterCategory !== 'All') query = query.eq('category', filterCategory);
    if (filterAuthor !== 'All') query = query.eq('author', filterAuthor);
    if (search) query = query.ilike('title', `%${search}%`);

    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    const { data } = await query;
    setPosts(data || []);
    
    // Extract unique authors
    const uniqueAuthors = [...new Set(data?.map(p => p.author).filter(Boolean) || [])];
    setAuthors(uniqueAuthors);
    
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [filterStatus, filterCategory, filterAuthor, search, sortBy, sortOrder]);

  // ============================================================
  // SUBMIT
  // ============================================================
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const wordCount = form.content.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    const payload = {
      title: form.title,
      slug: slug,
      category: form.category,
      excerpt: form.excerpt,
      content: form.content,
      image_url: form.image_url || null,
      video_url: form.video_url || null,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      author: form.author || 'Admin',
      status: form.status,
      scheduled_at: form.status === 'Scheduled' ? form.scheduled_at : null,
      published_at: form.status === 'Published' ? new Date().toISOString() : null,
      read_time: readTime,
      seo_title: form.seo_title || form.title,
      seo_description: form.seo_description || form.excerpt || '',
      is_featured: form.is_featured,
      is_pinned: form.is_pinned,
      password: form.password || null,
      template: form.template || 'Standard',
      layout: form.layout || 'full',
    };

    if (editing) {
      await supabase.from('admin_blog_posts').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('admin_blog_posts').insert(payload);
    }

    setOpen(false);
    setEditing(null);
    resetForm();
    load();
  };

  // ============================================================
  // BULK ACTIONS
  // ============================================================
  const bulkAction = async (action: string) => {
    if (selectedPosts.length === 0) return;
    
    const confirmMsg = `Are you sure you want to ${action} ${selectedPosts.length} posts?`;
    if (!confirm(confirmMsg)) return;

    let updateData: any = {};
    switch (action) {
      case 'publish': updateData = { status: 'Published', published_at: new Date().toISOString() }; break;
      case 'draft': updateData = { status: 'Draft' }; break;
      case 'archive': updateData = { status: 'Archived' }; break;
      case 'delete': 
        await supabase.from('admin_blog_posts').delete().in('id', selectedPosts);
        setSelectedPosts([]);
        load();
        return;
      case 'feature': updateData = { is_featured: true }; break;
      case 'unfeature': updateData = { is_featured: false }; break;
      default: return;
    }

    await supabase.from('admin_blog_posts').update(updateData).in('id', selectedPosts);
    setSelectedPosts([]);
    load();
  };

  // ============================================================
  // DELETE
  // ============================================================
  const del = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    await supabase.from('admin_blog_posts').delete().eq('id', id);
    load();
  };

  // ============================================================
  // DUPLICATE
  // ============================================================
  const duplicate = async (post: Post) => {
    const { data } = await supabase
      .from('admin_blog_posts')
      .insert({
        title: `${post.title} (Copy)`,
        slug: `${post.slug}-copy`,
        category: post.category,
        excerpt: post.excerpt,
        content: post.content,
        image_url: post.image_url,
        video_url: post.video_url,
        tags: post.tags,
        author: post.author,
        status: 'Draft',
        seo_title: post.seo_title,
        seo_description: post.seo_description,
        is_featured: false,
        is_pinned: false,
        template: post.template,
        layout: post.layout,
      })
      .select();
    if (data) load();
  };

  // ============================================================
  // TOGGLE SELECT
  // ============================================================
  const toggleSelect = (id: string) => {
    setSelectedPosts(prev => 
      prev.includes(id) ? prev.filter(p => p.id !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedPosts.length === posts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(posts.map(p => p.id));
    }
  };

  // ============================================================
  // RESET FORM
  // ============================================================
  const resetForm = () => {
    setForm({
      title: '',
      slug: '',
      category: 'Cybersecurity',
      excerpt: '',
      content: '',
      image_url: '',
      video_url: '',
      tags: '',
      author: 'Admin',
      status: 'Draft',
      scheduled_at: '',
      seo_title: '',
      seo_description: '',
      is_featured: false,
      is_pinned: false,
      password: '',
      template: 'Standard',
      layout: 'full',
    });
  };

  // ============================================================
  // OPEN EDITOR
  // ============================================================
  const openEditor = (post?: Post) => {
    if (post) {
      setEditing(post);
      setForm({
        title: post.title || '',
        slug: post.slug || '',
        category: post.category || 'Cybersecurity',
        excerpt: post.excerpt || '',
        content: post.content || '',
        image_url: post.image_url || '',
        video_url: post.video_url || '',
        tags: post.tags?.join(', ') || '',
        author: post.author || 'Admin',
        status: post.status || 'Draft',
        scheduled_at: post.scheduled_at || '',
        seo_title: post.seo_title || '',
        seo_description: post.seo_description || '',
        is_featured: post.is_featured || false,
        is_pinned: post.is_pinned || false,
        password: post.password || '',
        template: post.template || 'Standard',
        layout: post.layout || 'full',
      });
    } else {
      setEditing(null);
      resetForm();
    }
    setOpen(true);
  };

  // ============================================================
  // STATS
  // ============================================================
  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === 'Published').length,
    drafts: posts.filter(p => p.status === 'Draft').length,
    scheduled: posts.filter(p => p.status === 'Scheduled').length,
    featured: posts.filter(p => p.is_featured).length,
    totalViews: posts.reduce((sum, p) => sum + (p.views || 0), 0),
    totalLikes: posts.reduce((sum, p) => sum + (p.likes || 0), 0),
    totalComments: posts.reduce((sum, p) => sum + (p.comments_count || 0), 0),
    avgReadTime: Math.round(posts.reduce((sum, p) => sum + (p.read_time || 0), 0) / (posts.length || 1)),
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">📝 Blog Posts</h1>
          <p className="text-sm text-slate-400">Create, schedule, and manage blog content with premium features.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowStats(!showStats)}
            className="btn-ghost px-3 py-2 text-xs flex items-center gap-1"
          >
            <BarChart3 className="h-4 w-4" /> Stats
          </button>
          <button 
            onClick={() => openEditor()} 
            className="btn-primary px-4 py-2 text-xs flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Write New Post
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      {showStats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 p-4 rounded-2xl glass">
          <div className="text-center"><p className="text-2xl font-bold text-white">{stats.total}</p><p className="text-xs text-slate-400">Total</p></div>
          <div className="text-center"><p className="text-2xl font-bold text-green-400">{stats.published}</p><p className="text-xs text-slate-400">Published</p></div>
          <div className="text-center"><p className="text-2xl font-bold text-yellow-400">{stats.drafts}</p><p className="text-xs text-slate-400">Drafts</p></div>
          <div className="text-center"><p className="text-2xl font-bold text-blue-400">{stats.scheduled}</p><p className="text-xs text-slate-400">Scheduled</p></div>
          <div className="text-center"><p className="text-2xl font-bold text-purple-400">{stats.featured}</p><p className="text-xs text-slate-400">Featured</p></div>
          <div className="text-center"><p className="text-2xl font-bold text-cyan-400">{stats.totalViews}</p><p className="text-xs text-slate-400">Views</p></div>
          <div className="text-center"><p className="text-2xl font-bold text-pink-400">{stats.totalLikes}</p><p className="text-xs text-slate-400">Likes</p></div>
          <div className="text-center"><p className="text-2xl font-bold text-orange-400">{stats.avgReadTime}min</p><p className="text-xs text-slate-400">Avg Read</p></div>
        </div>
      )}

      {/* Filters & Search */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-9 py-2 text-sm"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="input-field py-2 text-sm w-32"
        >
          <option value="All">All Status</option>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="input-field py-2 text-sm w-40"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {authors.length > 0 && (
          <select
            value={filterAuthor}
            onChange={(e) => setFilterAuthor(e.target.value)}
            className="input-field py-2 text-sm w-32"
          >
            <option value="All">All Authors</option>
            {authors.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        )}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input-field py-2 text-sm w-32"
        >
          <option value="created_at">Date</option>
          <option value="title">Title</option>
          <option value="views">Views</option>
          <option value="likes">Likes</option>
          <option value="read_time">Read Time</option>
        </select>
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="btn-ghost px-3 py-2 text-sm"
        >
          {sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {/* Bulk Actions */}
      {selectedPosts.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-cyber-500/10 border border-cyber-500/30">
          <span className="text-sm text-white">{selectedPosts.length} selected</span>
          <div className="w-px h-6 bg-white/10" />
          <button onClick={() => bulkAction('publish')} className="btn-primary text-xs px-3 py-1">Publish</button>
          <button onClick={() => bulkAction('draft')} className="btn-ghost text-xs px-3 py-1">Draft</button>
          <button onClick={() => bulkAction('archive')} className="btn-ghost text-xs px-3 py-1">Archive</button>
          <button onClick={() => bulkAction('feature')} className="btn-ghost text-xs px-3 py-1">⭐ Feature</button>
          <button onClick={() => bulkAction('unfeature')} className="btn-ghost text-xs px-3 py-1">Unfeature</button>
          <button onClick={() => bulkAction('delete')} className="btn-ghost text-xs px-3 py-1 text-red-400 hover:bg-red-500/20">🗑️ Delete</button>
          <button onClick={() => setSelectedPosts([])} className="text-slate-400 hover:text-white text-xs">Clear</button>
        </div>
      )}

      {/* Posts List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-cyber-400" />
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl glass py-16 text-center">
          <Newspaper className="h-12 w-12 text-slate-600" />
          <p className="mt-4 text-sm text-slate-400">No blog posts found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div 
              key={p.id} 
              className={`rounded-2xl glass p-5 border transition-colors ${
                p.is_featured ? 'border-cyber-500/50 ring-1 ring-cyber-500/30' : 
                p.is_pinned ? 'border-yellow-500/50' : 
                'border-white/5 hover:border-cyber-500/30'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Select Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedPosts.includes(p.id)}
                  onChange={() => toggleSelect(p.id)}
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-cyber-500"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display text-base font-semibold text-white truncate">{p.title}</h3>
                    {p.is_featured && <span className="text-cyber-400 text-xs">⭐ Featured</span>}
                    {p.is_pinned && <span className="text-yellow-400 text-xs">📌 Pinned</span>}
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      p.status === 'Published' ? 'bg-green-500/15 text-green-400' :
                      p.status === 'Scheduled' ? 'bg-blue-500/15 text-blue-400' :
                      p.status === 'Archived' ? 'bg-gray-500/15 text-gray-400' :
                      'bg-yellow-500/15 text-yellow-400'
                    }`}>
                      {p.status === 'Published' ? '✅' :
                       p.status === 'Scheduled' ? '📅' :
                       p.status === 'Archived' ? '📦' : '📝'} {p.status}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="bg-white/5 px-2 py-0.5 rounded-full">{p.category}</span>
                    <span>👤 {p.author}</span>
                    {p.tags?.length > 0 && (
                      <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {p.tags.slice(0, 3).join(', ')}
                        {p.tags.length > 3 && ` +${p.tags.length - 3}`}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {p.read_time || 1} min
                    </span>
                    <span>👁️ {p.views || 0}</span>
                    <span>❤️ {p.likes || 0}</span>
                    <span>💬 {p.comments_count || 0}</span>
                    {p.password && <span className="text-yellow-400">🔒</span>}
                  </div>
                  {p.excerpt && (
                    <p className="mt-1 text-sm text-slate-400 line-clamp-2">{p.excerpt}</p>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {/* Expand/View More */}
                  <button 
                    onClick={() => setExpandedPost(expandedPost === p.id ? null : p.id)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-cyber-500/15 hover:text-cyber-300"
                    title="Expand"
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedPost === p.id ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Preview Button */}
                  <button 
                    onClick={() => setPreview(p.content)} 
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-cyber-500/15 hover:text-cyber-300"
                    title="Preview"
                  >
                    <Eye className="h-4 w-4" />
                  </button>

                  {/* Duplicate Button */}
                  <button 
                    onClick={() => duplicate(p)} 
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-cyber-500/15 hover:text-cyber-300"
                    title="Duplicate"
                  >
                    <Copy className="h-4 w-4" />
                  </button>

                  {/* Edit Button */}
                  <button 
                    onClick={() => openEditor(p)} 
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-cyber-500/15 hover:text-cyber-300"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>

                  {/* Delete Button */}
                  <button 
                    onClick={() => del(p.id, p.title)} 
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/15 hover:text-red-400"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedPost === p.id && (
                <div className="mt-3 pt-3 border-t border-white/10 text-sm text-slate-400 space-y-1">
                  <p><strong className="text-white">Slug:</strong> /blog/{p.slug}</p>
                  <p><strong className="text-white">SEO Title:</strong> {p.seo_title || 'Not set'}</p>
                  <p><strong className="text-white">SEO Desc:</strong> {p.seo_description || 'Not set'}</p>
                  <p><strong className="text-white">Template:</strong> {p.template || 'Standard'}</p>
                  <p><strong className="text-white">Layout:</strong> {p.layout || 'full'}</p>
                  <p><strong className="text-white">Created:</strong> {new Date(p.created_at).toLocaleString()}</p>
                  <p><strong className="text-white">Updated:</strong> {new Date(p.updated_at).toLocaleString()}</p>
                  {p.video_url && <p><strong className="text-white">Video:</strong> <a href={p.video_url} target="_blank" className="text-cyber-400">{p.video_url}</a></p>}
                  {p.password && <p><strong className="text-white">Password Protected:</strong> Yes</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ============================================================
      PREVIEW MODAL
      ============================================================ */}
      {preview && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm overflow-y-auto"
          onClick={() => setPreview(null)}
        >
          <div 
            className="w-full max-w-3xl rounded-2xl bg-white p-8 text-gray-900 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-gray-900">📄 Preview</h2>
              <button 
                onClick={() => setPreview(null)} 
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: preview }} 
            />
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setPreview(null)} 
                className="btn-primary"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
      EDITOR MODAL (Premium)
      ============================================================ */}
      {open && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm overflow-y-auto"
          onClick={() => setOpen(false)}
        >
          <div 
            className="max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-2xl glass-strong p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-white">
                {editing ? '✏️ Edit Post' : '✏️ Write New Post'}
              </h2>
              <button 
                onClick={() => setOpen(false)} 
                className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={submit} className="mt-4 space-y-4">
              {/* Title & Slug */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Title *</label>
                  <input 
                    required 
                    value={form.title} 
                    onChange={(e) => setForm({...form, title: e.target.value})} 
                    className="input-field" 
                    placeholder="My Amazing Blog Post"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Slug / URL</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">/blog/</span>
                    <input 
                      value={form.slug} 
                      onChange={(e) => setForm({...form, slug: e.target.value})} 
                      className="input-field flex-1" 
                      placeholder="my-amazing-post"
                    />
                  </div>
                </div>
              </div>

              {/* Category & Status & Template */}
              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Category</label>
                  <select 
                    value={form.category} 
                    onChange={(e) => setForm({...form, category: e.target.value})} 
                    className="input-field"
                  >
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Status</label>
                  <select 
                    value={form.status} 
                    onChange={(e) => setForm({...form, status: e.target.value as any})} 
                    className="input-field"
                  >
                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Template</label>
                  <select 
                    value={form.template} 
                    onChange={(e) => setForm({...form, template: e.target.value})} 
                    className="input-field"
                  >
                    {TEMPLATES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Layout</label>
                  <select 
                    value={form.layout} 
                    onChange={(e) => setForm({...form, layout: e.target.value as any})} 
                    className="input-field"
                  >
                    <option value="full">Full Width</option>
                    <option value="sidebar">Sidebar</option>
                    <option value="minimal">Minimal</option>
                  </select>
                </div>
              </div>

              {/* Schedule & Author */}
              <div className="grid gap-4 md:grid-cols-3">
                {form.status === 'Scheduled' && (
                  <div>
                    <label className="text-xs uppercase tracking-wider text-slate-400">Schedule Date</label>
                    <input 
                      type="datetime-local" 
                      value={form.scheduled_at} 
                      onChange={(e) => setForm({...form, scheduled_at: e.target.value})} 
                      className="input-field" 
                    />
                  </div>
                )}
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Author</label>
                  <input 
                    value={form.author} 
                    onChange={(e) => setForm({...form, author: e.target.value})} 
                    className="input-field" 
                    placeholder="Admin"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Password (Optional)</label>
                  <input 
                    type="password"
                    value={form.password} 
                    onChange={(e) => setForm({...form, password: e.target.value})} 
                    className="input-field" 
                    placeholder="🔒 Protect this post"
                  />
                </div>
              </div>

              {/* Featured & Pinned */}
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input 
                    type="checkbox" 
                    checked={form.is_featured} 
                    onChange={(e) => setForm({...form, is_featured: e.target.checked})} 
                    className="h-4 w-4 rounded border-white/20 bg-white/10 text-cyber-500"
                  />
                  ⭐ Featured Post
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input 
                    type="checkbox" 
                    checked={form.is_pinned} 
                    onChange={(e) => setForm({...form, is_pinned: e.target.checked})} 
                    className="h-4 w-4 rounded border-white/20 bg-white/10 text-yellow-500"
                  />
                  📌 Pin to Top
                </label>
              </div>

              {/* Excerpt */}
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Excerpt / Summary</label>
                <textarea 
                  value={form.excerpt} 
                  onChange={(e) => setForm({...form, excerpt: e.target.value})} 
                  rows={2} 
                  className="input-field resize-none" 
                  placeholder="Brief summary of your post..."
                />
              </div>

              {/* Content with Toolbar & Live Preview */}
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Content *</label>
                
                {/* Toolbar - Premium */}
                <div className="flex flex-wrap gap-1 p-2 border border-white/10 rounded-t-lg bg-white/5">
                  <button type="button" className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white"><Bold className="h-4 w-4" /></button>
                  <button type="button" className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white"><Italic className="h-4 w-4" /></button>
                  <button type="button" className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white"><Underline className="h-4 w-4" /></button>
                  <div className="w-px bg-white/10 mx-1" />
                  <button type="button" className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white"><List className="h-4 w-4" /></button>
                  <button type="button" className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white"><ListOrdered className="h-4 w-4" /></button>
                  <div className="w-px bg-white/10 mx-1" />
                  <button type="button" className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white"><Quote className="h-4 w-4" /></button>
                  <button type="button" className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white"><Code className="h-4 w-4" /></button>
                  <div className="w-px bg-white/10 mx-1" />
                  <button type="button" className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white"><Link2 className="h-4 w-4" /></button>
                  <button type="button" className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white"><Image className="h-4 w-4" /></button>
                  <button type="button" className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white"><Video className="h-4 w-4" /></button>
                  <div className="w-px bg-white/10 mx-1" />
                  <button type="button" className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white"><AlignLeft className="h-4 w-4" /></button>
                  <button type="button" className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white"><AlignCenter className="h-4 w-4" /></button>
                  <button type="button" className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white"><AlignRight className="h-4 w-4" /></button>
                  <div className="w-px bg-white/10 mx-1" />
                  <button type="button" className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white"><Undo className="h-4 w-4" /></button>
                  <button type="button" className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white"><Redo className="h-4 w-4" /></button>
                </div>

                {/* Editor + Live Preview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-white/10 rounded-b-lg p-4 bg-white/5">
                  <div>
                    <textarea
                      required
                      value={form.content}
                      onChange={(e) => setForm({...form, content: e.target.value})}
                      className="input-field min-h-[400px] font-mono text-sm resize-none"
                      placeholder="Write your content here... (HTML supported: &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, etc.)"
                    />
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                      <span>📝 {form.content.split(/\s+/).filter(w => w.length > 0).length} words</span>
                      <span>⏱️ {Math.max(1, Math.ceil(form.content.split(/\s+/).filter(w => w.length > 0).length / 200))} min read</span>
                      <span>📊 {form.content.length} characters</span>
                    </div>
                  </div>
                  
                  {/* Live Preview */}
                  <div className="rounded-lg border border-white/10 bg-navy-950/50 p-4 overflow-y-auto min-h-[400px] max-h-[600px]">
                    <p className="text-xs text-slate-400 mb-2">🔍 Live Preview</p>
                    {form.content ? (
                      <div 
                        className="prose prose-invert max-w-none text-white"
                        dangerouslySetInnerHTML={{ __html: form.content }}
                      />
                    ) : (
                      <p className="text-sm text-slate-500 italic">Start typing to see preview...</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Image & Video URLs */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Featured Image URL</label>
                  <div className="flex gap-2">
                    <input 
                      value={form.image_url} 
                      onChange={(e) => setForm({...form, image_url: e.target.value})} 
                      className="input-field flex-1" 
                      placeholder="https://example.com/image.jpg"
                    />
                    <button 
                      type="button"
                      className="btn-ghost px-3 py-2 text-sm"
                    >
                      <Upload className="h-4 w-4" />
                    </button>
                  </div>
                  {form.image_url && (
                    <img 
                      src={form.image_url} 
                      alt="Preview" 
                      className="mt-2 h-32 w-full rounded-lg object-cover border border-white/10"
                      onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                    />
                  )}
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Video URL (YouTube/Vimeo)</label>
                  <input 
                    value={form.video_url} 
                    onChange={(e) => setForm({...form, video_url: e.target.value})} 
                    className="input-field" 
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  {form.video_url && (
                    <div className="mt-2 rounded-lg overflow-hidden border border-white/10">
                      <iframe 
                        src={form.video_url.replace('watch?v=', 'embed/')} 
                        className="w-full h-48"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Tags (comma separated)</label>
                <input 
                  value={form.tags} 
                  onChange={(e) => setForm({...form, tags: e.target.value})} 
                  className="input-field" 
                  placeholder="security, wordpress, small business"
                />
              </div>

              {/* SEO Fields */}
              <div className="border-t border-white/10 pt-4">
                <h3 className="text-sm font-semibold text-white mb-2">🔍 SEO Settings</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-slate-400">SEO Title</label>
                    <input 
                      value={form.seo_title} 
                      onChange={(e) => setForm({...form, seo_title: e.target.value})} 
                      className="input-field" 
                      placeholder="My Amazing Blog Post | BitSecureX"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-slate-400">SEO Description</label>
                    <input 
                      value={form.seo_description} 
                      onChange={(e) => setForm({...form, seo_description: e.target.value})} 
                      className="input-field" 
                      placeholder="A practical guide to..."
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPreview(form.content)}
                  className="btn-ghost flex-1 py-2.5 text-sm flex items-center justify-center gap-2"
                >
                  <Eye className="h-4 w-4" /> Preview
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn-ghost flex-1 py-2.5 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 py-2.5 text-sm flex items-center justify-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {editing ? 'Update Post' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default AdminBlog;
