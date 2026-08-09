import { useState, useEffect } from 'react';
import { 
  ShoppingBag, Plus, Loader2, Pencil, Trash2, Save, X, 
  Star, Package, Users, Layers,
  DollarSign, CheckCircle, Award, Zap, FileText,
  Calendar, Search, SortAsc, SortDesc, Eye, Image as ImageIcon
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminShopify() {
  // ============================================================
  // STATE
  // ============================================================
  const [pricing, setPricing] = useState<any[]>([]);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'pricing' | 'studies'>('pricing');
  const [searchTerm, setSearchTerm] = useState('');
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
    badge_text: '',
    button_text: 'Get Started'
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
    image_url: ''
  });

  // ============================================================
  // LOAD DATA
  // ============================================================
  const load = async () => {
    setLoading(true);
    try {
      const [p, c] = await Promise.all([
        supabase.from('admin_shopify_pricing').select('*').order('created_at', { ascending: true }),
        supabase.from('admin_case_studies').select('*').order('created_at', { ascending: false }),
      ]);
      
      if (p.error) console.error('Pricing error:', p.error);
      if (c.error) console.error('Case studies error:', c.error);
      
      setPricing(p.data || []);
      setCaseStudies(c.data || []);
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
    const payload = { 
      title: priceForm.title,
      price: priceForm.price,
      description: priceForm.description,
      features: featuresArray,
      is_popular: priceForm.is_popular,
      badge_text: priceForm.badge_text,
      button_text: priceForm.button_text
    };
    
    try {
      if (editingPrice) {
        const { error } = await supabase
          .from('admin_shopify_pricing')
          .update(payload)
          .eq('id', editingPrice.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('admin_shopify_pricing')
          .insert(payload);
        if (error) throw error;
      }
      setPriceOpen(false);
      setEditingPrice(null);
      load();
    } catch (err: any) {
      console.error('Submit pricing error:', err);
      alert('Error: ' + err.message);
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
        challenge: studyForm.description,
        image_url: studyForm.image_url || ''
      };

      console.log('📝 Saving case study:', payload);

      if (editingStudy) {
        const { error } = await supabase
          .from('admin_case_studies')
          .update(payload)
          .eq('id', editingStudy.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('admin_case_studies')
          .insert(payload);
        if (error) throw error;
      }
      
      setStudyOpen(false);
      setEditingStudy(null);
      load();
    } catch (err: any) {
      console.error('Submit study error:', err);
      alert('Error: ' + err.message);
    }
  };

  // ============================================================
  // DELETE FUNCTIONS
  // ============================================================
  const delPrice = async (id: string) => {
    if (!confirm('Delete this pricing tier?')) return;
    try {
      const { error } = await supabase
        .from('admin_shopify_pricing')
        .delete()
        .eq('id', id);
      if (error) throw error;
      load();
    } catch (err: any) {
      console.error('Delete pricing error:', err);
      alert('Error: ' + err.message);
    }
  };
  
  const delStudy = async (id: string) => {
    if (!confirm('Delete this case study?')) return;
    try {
      const { error } = await supabase
        .from('admin_case_studies')
        .delete()
        .eq('id', id);
      if (error) throw error;
      load();
    } catch (err: any) {
      console.error('Delete study error:', err);
      alert('Error: ' + err.message);
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
    const aVal = a.created_at || '';
    const bVal = b.created_at || '';
    return sortOrder === 'desc' ? aVal < bVal ? 1 : -1 : aVal > bVal ? 1 : -1;
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
          <p className="text-sm text-slate-400">Manage pricing tiers and case studies</p>
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
              <Plus className="h-4 w-4" /> Add Pricing
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
          ) : pricing.length === 0 ? (
            <div className="text-center py-10 text-slate-400">No pricing tiers yet.</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pricing.map((p) => (
                <div key={p.id} className={`rounded-2xl glass p-5 border relative ${p.is_popular ? 'border-cyber-500/50 ring-1 ring-cyber-500/30' : 'border-white/5'}`}>
                  {p.is_popular && (
                    <span className="absolute -top-2 right-4 bg-cyber-500 text-white text-xs px-3 py-0.5 rounded-full font-medium">
                      <Award className="h-3 w-3 inline mr-1" /> Popular
                    </span>
                  )}
                  <div className="flex justify-between items-start mt-2">
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">{p.title}</h3>
                      <p className="text-2xl font-bold text-cyber-400">{p.price}</p>
                    </div>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => { 
                          setEditingPrice(p); 
                          setPriceForm({
                            ...p, 
                            features: p.features?.join(', ') || '',
                            badge_text: p.badge_text || '',
                            button_text: p.button_text || 'Get Started'
                          }); 
                          setPriceOpen(true); 
                        }} 
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
                    <div className="mt-3">
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
                title={sortOrder === 'asc' ? 'Oldest first' : 'Newest first'}
              >
                {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </button>
              <button 
                onClick={() => { 
                  setEditingStudy(null); 
                  setStudyForm({
                    title: '',
                    client: '',
                    industry: '',
                    description: '',
                    image_url: ''
                  });
                  setStudyOpen(true); 
                }} 
                className="btn-primary px-4 py-2 text-xs flex items-center gap-2"
              >
                <Plus className="h-4 w-4" /> Add Case Study
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
          ) : sortedStudies.length === 0 ? (
            <div className="text-center py-10 text-slate-400">No case studies yet. Click "Add Case Study" to create one.</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sortedStudies.map((cs) => (
                <div key={cs.id} className="rounded-2xl glass p-5 border border-white/5 overflow-hidden group hover:border-cyber-500/30 transition-colors">
                  {cs.image_url && (
                    <div className="relative w-full h-40 rounded-lg overflow-hidden mb-3 bg-navy-800">
                      <img 
                        src={cs.image_url} 
                        alt={cs.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-display text-base font-bold text-white group-hover:text-cyber-400 transition-colors">
                        {cs.title}
                      </h3>
                      <p className="text-sm text-cyber-400">{cs.client}</p>
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
                            description: cs.challenge || '',
                            image_url: cs.image_url || ''
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
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span>{new Date(cs.created_at).toLocaleDateString()}</span>
                    <span className="text-cyber-400">View →</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================
          PRICING MODAL
          ============================================================ */}
      {priceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={() => setPriceOpen(false)}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl glass-strong p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-white">
                {editingPrice ? 'Edit Pricing' : 'Add Pricing'}
              </h2>
              <button onClick={() => setPriceOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={submitPrice} className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Title *</label>
                <input 
                  required
                  value={priceForm.title} 
                  onChange={e => setPriceForm({...priceForm, title: e.target.value})} 
                  className="input-field" 
                  placeholder="Premium Plan"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Price *</label>
                <input 
                  required
                  value={priceForm.price} 
                  onChange={e => setPriceForm({...priceForm, price: e.target.value})} 
                  className="input-field" 
                  placeholder="$999"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Description *</label>
                <textarea 
                  required
                  value={priceForm.description} 
                  onChange={e => setPriceForm({...priceForm, description: e.target.value})} 
                  rows={2} 
                  className="input-field" 
                  placeholder="One-time setup fee includes..."
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Features (comma separated)</label>
                <input 
                  value={priceForm.features} 
                  onChange={e => setPriceForm({...priceForm, features: e.target.value})} 
                  className="input-field" 
                  placeholder="Design, SEO, Payment, Analytics"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Badge Text</label>
                  <input 
                    value={priceForm.badge_text} 
                    onChange={e => setPriceForm({...priceForm, badge_text: e.target.value})} 
                    className="input-field" 
                    placeholder="Best Value"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Button Text</label>
                  <input 
                    value={priceForm.button_text} 
                    onChange={e => setPriceForm({...priceForm, button_text: e.target.value})} 
                    className="input-field" 
                    placeholder="Get Started"
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input 
                  type="checkbox" 
                  checked={priceForm.is_popular} 
                  onChange={e => setPriceForm({...priceForm, is_popular: e.target.checked})} 
                  className="h-4 w-4 rounded border-white/20 bg-white/10"
                />
                Most Popular
              </label>
              <button type="submit" className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2">
                <Save className="h-4 w-4" /> {editingPrice ? 'Update' : 'Save'} Pricing
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* ============================================================
          CASE STUDY MODAL
          ============================================================ */}
      {studyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={() => setStudyOpen(false)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl glass-strong p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-white">
                {editingStudy ? 'Edit Case Study' : 'Add Case Study'}
              </h2>
              <button onClick={() => setStudyOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={submitStudy} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Title *</label>
                  <input 
                    required
                    value={studyForm.title} 
                    onChange={e => setStudyForm({...studyForm, title: e.target.value})} 
                    className="input-field" 
                    placeholder="The Promise We Make to Your Identity"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Client *</label>
                  <input 
                    required
                    value={studyForm.client} 
                    onChange={e => setStudyForm({...studyForm, client: e.target.value})} 
                    className="input-field" 
                    placeholder="GLIDEWITH"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Industry</label>
                <input 
                  value={studyForm.industry} 
                  onChange={e => setStudyForm({...studyForm, industry: e.target.value})} 
                  className="input-field" 
                  placeholder="E-commerce"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Full Description *</label>
                <textarea 
                  required
                  value={studyForm.description} 
                  onChange={e => setStudyForm({...studyForm, description: e.target.value})} 
                  rows={8} 
                  className="input-field" 
                  placeholder="Write the complete case study description here..."
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Image URL</label>
                <input 
                  value={studyForm.image_url} 
                  onChange={e => setStudyForm({...studyForm, image_url: e.target.value})} 
                  className="input-field" 
                  placeholder="https://res.cloudinary.com/..."
                />
                {studyForm.image_url && (
                  <div className="mt-2">
                    <img 
                      src={studyForm.image_url} 
                      alt="Preview" 
                      className="w-full h-40 object-cover rounded-lg border border-white/10"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
              <button type="submit" className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2">
                <Save className="h-4 w-4" /> {editingStudy ? 'Update' : 'Save'} Case Study
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
