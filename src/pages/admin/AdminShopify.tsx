import { useState, useEffect } from 'react';
import { 
  ShoppingBag, Plus, Loader2, Pencil, Trash2, Save, X, 
  Star, Grip, Tag, Package, Users, Settings, Layers,
  DollarSign, Clock, CheckCircle, Award, Zap, Shield,
  TrendingUp, BarChart3, FileText, Image, Link, Calendar,
  Filter, Search, SortAsc, SortDesc, ChevronDown, Eye
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminShopify() {
  // ============================================================
  // STATE
  // ============================================================
  const [pricing, setPricing] = useState<any[]>([]);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'pricing' | 'studies' | 'categories'>('pricing');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // ============================================================
  // PRICING FORM
  // ============================================================
  const [priceOpen, setPriceOpen] = useState(false);
  const [editingPrice, setEditingPrice] = useState<any>(null);
  const [priceForm, setPriceForm] = useState({
    title: '',
    price: '',
    description: '',
    features: '',
    is_popular: false,
    category: '',
    discount_label: '',
    discount_value: '',
    badge_text: '',
    button_text: 'Get Started',
    button_link: '#',
    color: 'cyan',
    featured: false
  });

  // ============================================================
  // CASE STUDY FORM
  // ============================================================
  const [studyOpen, setStudyOpen] = useState(false);
  const [editingStudy, setEditingStudy] = useState<any>(null);
  const [studyForm, setStudyForm] = useState({
    title: '',
    client: '',
    industry: '',
    description: '',
    image_url: '',
    images: [] as string[],
    challenge: '',
    strategy: '',
    design: '',
    development: '',
    security: '',
    results: '',
    metrics: [{ label: '', value: '' }],
    technologies: '',
    categories: [] as string[],
    featured: false,
    published: true,
    date: new Date().toISOString().split('T')[0]
  });

  // ============================================================
  // CATEGORY FORM
  // ============================================================
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    description: '',
    icon: '',
    color: 'blue',
    count: 0
  });

  // ============================================================
  // LOAD DATA
  // ============================================================
  const load = async () => {
    setLoading(true);
    try {
      const [p, c, cat] = await Promise.all([
        supabase.from('admin_shopify_pricing').select('*').order('created_at', { ascending: true }),
        supabase.from('admin_case_studies').select('*').order('created_at', { ascending: false }),
        supabase.from('admin_shopify_categories').select('*').order('name', { ascending: true }),
      ]);
      
      if (p.error) console.error('Pricing error:', p.error);
      if (c.error) console.error('Case studies error:', c.error);
      if (cat.error) console.error('Categories error:', cat.error);
      
      setPricing(p.data || []);
      setCaseStudies(c.data || []);
      setCategories(cat.data || []);
    } catch (err) {
      console.error('Load error:', err);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  // ============================================================
  // SUBMIT PRICING
  // ============================================================
  const submitPrice = async (e: React.FormEvent) => {
    e.preventDefault();
    const featuresArray = priceForm.features.split(',').map(f => f.trim()).filter(Boolean);
    const payload = { ...priceForm, features: featuresArray };
    
    try {
      if (editingPrice) {
        await supabase.from('admin_shopify_pricing').update(payload).eq('id', editingPrice.id);
      } else {
        await supabase.from('admin_shopify_pricing').insert(payload);
      }
      setPriceOpen(false);
      setEditingPrice(null);
      load();
    } catch (err) {
      console.error('Submit pricing error:', err);
      alert('Error saving pricing. Check console.');
    }
  };

  // ============================================================
  // SUBMIT CASE STUDY
  // ============================================================
  const submitStudy = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const payload = {
        title: studyForm.title,
        client: studyForm.client,
        industry: studyForm.industry || 'E-commerce',
        challenge: studyForm.challenge || studyForm.description,
        strategy: studyForm.strategy || '',
        design: studyForm.design || '',
        development: studyForm.development || '',
        security: studyForm.security || '',
        image_url: studyForm.image_url,
        results: studyForm.results || '',
        technologies: studyForm.technologies || '',
        featured: studyForm.featured || false,
        published: studyForm.published !== false,
        date: studyForm.date || new Date().toISOString().split('T')[0]
      };

      if (editingStudy) {
        await supabase.from('admin_case_studies').update(payload).eq('id', editingStudy.id);
      } else {
        await supabase.from('admin_case_studies').insert(payload);
      }
      
      setStudyOpen(false);
      setEditingStudy(null);
      load();
    } catch (err) {
      console.error('Submit study error:', err);
      alert('Error saving case study. Check console.');
    }
  };

  // ============================================================
  // SUBMIT CATEGORY
  // ============================================================
  const submitCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const payload = {
        name: categoryForm.name,
        slug: categoryForm.slug || categoryForm.name.toLowerCase().replace(/\s+/g, '-'),
        description: categoryForm.description,
        icon: categoryForm.icon || 'Package',
        color: categoryForm.color || 'blue',
        count: categoryForm.count || 0
      };

      if (editingCategory) {
        await supabase.from('admin_shopify_categories').update(payload).eq('id', editingCategory.id);
      } else {
        await supabase.from('admin_shopify_categories').insert(payload);
      }
      
      setCategoryOpen(false);
      setEditingCategory(null);
      load();
    } catch (err) {
      console.error('Submit category error:', err);
      alert('Error saving category. Check console.');
    }
  };

  // ============================================================
  // DELETE FUNCTIONS
  // ============================================================
  const delPrice = async (id: string) => {
    if (!confirm('Delete this pricing tier?')) return;
    try {
      await supabase.from('admin_shopify_pricing').delete().eq('id', id);
      load();
    } catch (err) {
      console.error('Delete pricing error:', err);
    }
  };
  
  const delStudy = async (id: string) => {
    if (!confirm('Delete this case study?')) return;
    try {
      await supabase.from('admin_case_studies').delete().eq('id', id);
      load();
    } catch (err) {
      console.error('Delete study error:', err);
    }
  };

  const delCategory = async (id: string) => {
    if (!confirm('Delete this category?')) return;
    try {
      await supabase.from('admin_shopify_categories').delete().eq('id', id);
      load();
    } catch (err) {
      console.error('Delete category error:', err);
    }
  };

  // ============================================================
  // FILTER & SORT
  // ============================================================
  const filteredStudies = caseStudies.filter(s => 
    s.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.industry?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStudies = [...filteredStudies].sort((a, b) => {
    const aVal = a[sortField] || '';
    const bVal = b[sortField] || '';
    if (sortOrder === 'asc') return aVal > bVal ? 1 : -1;
    return aVal < bVal ? 1 : -1;
  });

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Shopify Store Manager</h1>
          <p className="text-sm text-slate-400">Manage pricing, case studies, and categories.</p>
        </div>
        <div className="flex gap-2 border border-white/10 rounded-xl p-1">
          <button 
            onClick={() => setTab('pricing')} 
            className={`px-4 py-2 text-sm rounded-lg transition-colors flex items-center gap-2 ${tab === 'pricing' ? 'bg-cyber-500/20 text-cyber-400' : 'text-slate-400'}`}
          >
            <DollarSign className="h-4 w-4" /> Pricing
          </button>
          <button 
            onClick={() => setTab('studies')} 
            className={`px-4 py-2 text-sm rounded-lg transition-colors flex items-center gap-2 ${tab === 'studies' ? 'bg-cyber-500/20 text-cyber-400' : 'text-slate-400'}`}
          >
            <FileText className="h-4 w-4" /> Case Studies
          </button>
          <button 
            onClick={() => setTab('categories')} 
            className={`px-4 py-2 text-sm rounded-lg transition-colors flex items-center gap-2 ${tab === 'categories' ? 'bg-cyber-500/20 text-cyber-400' : 'text-slate-400'}`}
          >
            <Layers className="h-4 w-4" /> Categories
          </button>
        </div>
      </div>

      {/* ============================================================
          PRICING TAB
          ============================================================ */}
      {tab === 'pricing' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button 
              onClick={() => { setEditingPrice(null); setPriceOpen(true); }} 
              className="btn-primary px-4 py-2 text-xs flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> Add Pricing Tier
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
          ) : pricing.length === 0 ? (
            <div className="text-center py-10 text-slate-400">No pricing tiers yet. Create your first one!</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pricing.map((p) => (
                <div key={p.id} className={`rounded-2xl glass p-5 border relative ${p.is_popular ? 'border-cyber-500/50 ring-1 ring-cyber-500/30' : 'border-white/5'}`}>
                  {p.is_popular && (
                    <span className="absolute -top-2 right-4 bg-cyber-500 text-white text-xs px-3 py-0.5 rounded-full font-medium">
                      <Award className="h-3 w-3 inline mr-1" /> Most Popular
                    </span>
                  )}
                  {p.featured && (
                    <span className="absolute -top-2 left-4 bg-purple-500 text-white text-xs px-3 py-0.5 rounded-full font-medium">
                      <Zap className="h-3 w-3 inline mr-1" /> Featured
                    </span>
                  )}
                  <div className="flex justify-between items-start mt-2">
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">{p.title}</h3>
                      <p className="text-2xl font-bold text-cyber-400">{p.price}</p>
                      {p.discount_label && (
                        <span className="inline-block mt-1 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                          {p.discount_label}: {p.discount_value}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => { setEditingPrice(p); setPriceForm({...p, features: p.features?.join(', ') || ''}); setPriceOpen(true); }} 
                        className="p-1.5 text-slate-400 hover:text-cyber-400 rounded-lg hover:bg-cyber-500/10"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => delPrice(p.id)} 
                        className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {p.features?.map((f: string) => (
                      <span key={f} className="text-xs bg-white/5 px-2 py-1 rounded-full text-slate-300 border border-white/5">
                        <CheckCircle className="h-3 w-3 inline mr-1 text-cyber-400" />
                        {f}
                      </span>
                    ))}
                  </div>
                  {p.badge_text && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs bg-cyber-500/10 text-cyber-400 px-2 py-1 rounded-full">{p.badge_text}</span>
                    </div>
                  )}
                  <button className="mt-4 w-full btn-primary text-sm py-2">
                    {p.button_text || 'Get Started'} →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================
          CASE STUDIES TAB
          ============================================================ */}
      {tab === 'studies' && (
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 max-w-sm">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search case studies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyber-500/50 flex-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="text-slate-400 hover:text-white p-2 rounded-lg border border-white/10"
              >
                {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </button>
              <button 
                onClick={() => { setEditingStudy(null); setStudyOpen(true); }} 
                className="btn-primary px-4 py-2 text-xs flex items-center gap-2"
              >
                <Plus className="h-4 w-4" /> Add Case Study
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
          ) : sortedStudies.length === 0 ? (
            <div className="text-center py-10 text-slate-400">No case studies yet. Create your first one!</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sortedStudies.map((cs) => (
                <div key={cs.id} className="rounded-2xl glass p-5 border border-white/5 overflow-hidden group hover:border-cyber-500/30 transition-colors">
                  {cs.image_url && (
                    <div className="relative w-full h-40 rounded-lg overflow-hidden mb-3">
                      <img src={cs.image_url} alt={cs.title} className="w-full h-full object-cover" />
                      {cs.featured && (
                        <span className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
                          <Star className="h-3 w-3 inline" /> Featured
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-display text-base font-bold text-white group-hover:text-cyber-400 transition-colors">
                        {cs.title}
                      </h3>
                      <p className="text-xs text-cyber-400">{cs.client}</p>
                      {cs.industry && (
                        <span className="inline-block mt-1 text-xs bg-white/5 px-2 py-0.5 rounded-full text-slate-400">
                          {cs.industry}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => { 
                          setEditingStudy(cs); 
                          setStudyForm({
                            title: cs.title || '',
                            client: cs.client || '',
                            industry: cs.industry || '',
                            description: cs.challenge || cs.description || '',
                            image_url: cs.image_url || '',
                            images: [],
                            challenge: cs.challenge || '',
                            strategy: cs.strategy || '',
                            design: cs.design || '',
                            development: cs.development || '',
                            security: cs.security || '',
                            results: cs.results || '',
                            metrics: [{ label: '', value: '' }],
                            technologies: cs.technologies || '',
                            categories: [],
                            featured: cs.featured || false,
                            published: cs.published !== false,
                            date: cs.date || new Date().toISOString().split('T')[0]
                          });
                          setStudyOpen(true); 
                        }} 
                        className="p-1.5 text-slate-400 hover:text-cyber-400 rounded-lg hover:bg-cyber-500/10"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => delStudy(cs.id)} 
                        className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-400 line-clamp-3">
                    {cs.challenge || cs.description}
                  </p>
                  {cs.technologies && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {cs.technologies.split(',').map((t: string) => (
                        <span key={t} className="text-xs bg-cyber-500/10 px-2 py-0.5 rounded-full text-cyber-300">
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Calendar className="h-3 w-3" />
                      {cs.date || new Date(cs.created_at).toLocaleDateString()}
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${cs.published !== false ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {cs.published !== false ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================
          CATEGORIES TAB
          ============================================================ */}
      {tab === 'categories' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button 
              onClick={() => { setEditingCategory(null); setCategoryOpen(true); }} 
              className="btn-primary px-4 py-2 text-xs flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> Add Category
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
          ) : categories.length === 0 ? (
            <div className="text-center py-10 text-slate-400">No categories yet. Create your first one!</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat) => (
                <div key={cat.id} className="rounded-2xl glass p-5 border border-white/5 flex items-start justify-between group hover:border-cyber-500/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-${cat.color || 'blue'}-500/20 flex items-center justify-center text-${cat.color || 'blue'}-400`}>
                      <Package className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-white">{cat.name}</h3>
                      <p className="text-xs text-slate-400">{cat.description}</p>
                      <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                        <span>Slug: {cat.slug}</span>
                        <span>{cat.count || 0} items</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => { setEditingCategory(cat); setCategoryForm(cat); setCategoryOpen(true); }} 
                      className="p-1.5 text-slate-400 hover:text-cyber-400 rounded-lg hover:bg-cyber-500/10"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => delCategory(cat.id)} 
                      className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================
          MODALS
          ============================================================ */}

      {/* Pricing Modal */}
      {priceOpen && (
        <Modal title={editingPrice ? 'Edit Pricing Tier' : 'Add Pricing Tier'} onClose={() => setPriceOpen(false)}>
          <form onSubmit={submitPrice} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Title *</label>
                <input required value={priceForm.title} onChange={e => setPriceForm({...priceForm, title: e.target.value})} className="input-field" placeholder="Premium Plan" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Price *</label>
                <input required value={priceForm.price} onChange={e => setPriceForm({...priceForm, price: e.target.value})} className="input-field" placeholder="$999" />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400">Description *</label>
              <textarea required value={priceForm.description} onChange={e => setPriceForm({...priceForm, description: e.target.value})} rows={2} className="input-field" placeholder="One-time setup fee includes..." />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400">Features (comma separated)</label>
              <input value={priceForm.features} onChange={e => setPriceForm({...priceForm, features: e.target.value})} className="input-field" placeholder="Design, SEO, Payment, Analytics" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Discount Label</label>
                <input value={priceForm.discount_label} onChange={e => setPriceForm({...priceForm, discount_label: e.target.value})} className="input-field" placeholder="Save 20%" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Discount Value</label>
                <input value={priceForm.discount_value} onChange={e => setPriceForm({...priceForm, discount_value: e.target.value})} className="input-field" placeholder="$200 off" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Button Text</label>
                <input value={priceForm.button_text} onChange={e => setPriceForm({...priceForm, button_text: e.target.value})} className="input-field" placeholder="Get Started" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Badge Text</label>
                <input value={priceForm.badge_text} onChange={e => setPriceForm({...priceForm, badge_text: e.target.value})} className="input-field" placeholder="Best Value" />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" checked={priceForm.is_popular} onChange={e => setPriceForm({...priceForm, is_popular: e.target.checked})} className="h-4 w-4 rounded border-white/20 bg-white/10" />
                Most Popular
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" checked={priceForm.featured} onChange={e => setPriceForm({...priceForm, featured: e.target.checked})} className="h-4 w-4 rounded border-white/20 bg-white/10" />
                Featured
              </label>
            </div>
            <button type="submit" className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2">
              <Save className="h-4 w-4" /> {editingPrice ? 'Update' : 'Save'} Pricing
            </button>
          </form>
        </Modal>
      )}
      
      {/* Case Study Modal */}
      {studyOpen && (
        <Modal title={editingStudy ? 'Edit Case Study' : 'Add Case Study'} onClose={() => setStudyOpen(false)}>
          <form onSubmit={submitStudy} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Title *</label>
                <input required value={studyForm.title} onChange={e => setStudyForm({...studyForm, title: e.target.value})} className="input-field" placeholder="Project Name" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Client *</label>
                <input required value={studyForm.client} onChange={e => setStudyForm({...studyForm, client: e.target.value})} className="input-field" placeholder="Client Name" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Industry</label>
                <input value={studyForm.industry} onChange={e => setStudyForm({...studyForm, industry: e.target.value})} className="input-field" placeholder="E-commerce, SaaS, etc." />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Date</label>
                <input type="date" value={studyForm.date} onChange={e => setStudyForm({...studyForm, date: e.target.value})} className="input-field" />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400">Full Description *</label>
              <textarea required value={studyForm.description} onChange={e => setStudyForm({...studyForm, description: e.target.value})} rows={6} className="input-field" placeholder="Write the complete case study..." />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400">Image URL</label>
              <input value={studyForm.image_url} onChange={e => setStudyForm({...studyForm, image_url: e.target.value})} className="input-field" placeholder="https://example.com/image.jpg" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400">Technologies Used</label>
              <input value={studyForm.technologies} onChange={e => setStudyForm({...studyForm, technologies: e.target.value})} className="input-field" placeholder="Shopify, React, Node.js" />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" checked={studyForm.featured} onChange={e => setStudyForm({...studyForm, featured: e.target.checked})} className="h-4 w-4 rounded border-white/20 bg-white/10" />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" checked={studyForm.published} onChange={e => setStudyForm({...studyForm, published: e.target.checked})} className="h-4 w-4 rounded border-white/20 bg-white/10" />
                Published
              </label>
            </div>
            <button type="submit" className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2">
              <Save className="h-4 w-4" /> {editingStudy ? 'Update' : 'Save'} Case Study
            </button>
          </form>
        </Modal>
      )}

      {/* Category Modal */}
      {categoryOpen && (
        <Modal title={editingCategory ? 'Edit Category' : 'Add Category'} onClose={() => setCategoryOpen(false)}>
          <form onSubmit={submitCategory} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Name *</label>
                <input required value={categoryForm.name} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} className="input-field" placeholder="Accessories" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Slug</label>
                <input value={categoryForm.slug} onChange={e => setCategoryForm({...categoryForm, slug: e.target.value})} className="input-field" placeholder="accessories" />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400">Description</label>
              <input value={categoryForm.description} onChange={e => setCategoryForm({...categoryForm, description: e.target.value})} className="input-field" placeholder="Category description" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Icon</label>
                <select value={categoryForm.icon} onChange={e => setCategoryForm({...categoryForm, icon: e.target.value})} className="input-field">
                  <option value="Package">Package</option>
                  <option value="ShoppingBag">ShoppingBag</option>
                  <option value="Tag">Tag</option>
                  <option value="Star">Star</option>
                  <option value="Award">Award</option>
                  <option value="Zap">Zap</option>
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Color</label>
                <select value={categoryForm.color} onChange={e => setCategoryForm({...categoryForm, color: e.target.value})} className="input-field">
                  <option value="blue">Blue</option>
                  <option value="cyan">Cyan</option>
                  <option value="green">Green</option>
                  <option value="purple">Purple</option>
                  <option value="red">Red</option>
                  <option value="orange">Orange</option>
                  <option value="pink">Pink</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2">
              <Save className="h-4 w-4" /> {editingCategory ? 'Update' : 'Save'} Category
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ============================================================
// MODAL COMPONENT
// ============================================================
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl glass-strong p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
