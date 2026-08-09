import { useState, useEffect } from 'react';
import { ShoppingBag, Plus, Loader2, Pencil, Trash2, Save, X, Star, Grip } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminShopify() {
  const [pricing, setPricing] = useState<any[]>([]);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'pricing' | 'studies'>('pricing');
  
  // Pricing Form
  const [priceOpen, setPriceOpen] = useState(false);
  const [editingPrice, setEditingPrice] = useState<any>(null);
  const [priceForm, setPriceForm] = useState({ title: '', price: '', description: '', features: '', is_popular: false });

  // Case Study Form
  const [studyOpen, setStudyOpen] = useState(false);
  const [editingStudy, setEditingStudy] = useState<any>(null);
  const [studyForm, setStudyForm] = useState({ title: '', client: '', description: '', image_url: '' });

  const load = async () => {
    setLoading(true);
    const [p, c] = await Promise.all([
      supabase.from('admin_shopify_pricing').select('*').order('created_at', { ascending: true }),
      supabase.from('admin_shopify_case_studies').select('*').order('created_at', { ascending: false }),
    ]);
    setPricing(p.data || []);
    setCaseStudies(c.data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  // Submit Pricing
  const submitPrice = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...priceForm, features: priceForm.features.split(',').map(f => f.trim()).filter(Boolean) };
    if (editingPrice) await supabase.from('admin_shopify_pricing').update(payload).eq('id', editingPrice.id);
    else await supabase.from('admin_shopify_pricing').insert(payload);
    setPriceOpen(false); setEditingPrice(null); load();
  };

  // Submit Case Study
  const submitStudy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudy) await supabase.from('admin_shopify_case_studies').update(studyForm).eq('id', editingStudy.id);
    else await supabase.from('admin_shopify_case_studies').insert(studyForm);
    setStudyOpen(false); setEditingStudy(null); load();
  };

  const delPrice = async (id: string) => { await supabase.from('admin_shopify_pricing').delete().eq('id', id); load(); };
  const delStudy = async (id: string) => { await supabase.from('admin_shopify_case_studies').delete().eq('id', id); load(); };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><h1 className="font-display text-2xl font-bold text-white">Shopify Store Manager</h1><p className="text-sm text-slate-400">Manage pricing, features, and case studies.</p></div>
        <div className="flex gap-2 border border-white/10 rounded-xl p-1">
          <button onClick={() => setTab('pricing')} className={`px-4 py-2 text-sm rounded-lg transition-colors ${tab === 'pricing' ? 'bg-cyber-500/20 text-cyber-400' : 'text-slate-400'}`}>Pricing</button>
          <button onClick={() => setTab('studies')} className={`px-4 py-2 text-sm rounded-lg transition-colors ${tab === 'studies' ? 'bg-cyber-500/20 text-cyber-400' : 'text-slate-400'}`}>Case Studies</button>
        </div>
      </div>

      {/* PRICING TAB */}
      {tab === 'pricing' && (
        <div className="space-y-4">
          <div className="flex justify-end"><button onClick={() => { setEditingPrice(null); setPriceOpen(true); }} className="btn-primary px-4 py-2 text-xs"><Plus className="h-4 w-4" /> Add Pricing</button></div>
          {loading ? <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div> : pricing.length === 0 ? <div className="text-center py-10 text-slate-400">No pricing tiers yet.</div> : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pricing.map((p) => (
                <div key={p.id} className={`rounded-2xl glass p-5 border ${p.is_popular ? 'border-cyber-500/50' : 'border-white/5'}`}>
                  <div className="flex justify-between items-start">
                    <div><h3 className="font-display text-lg font-bold text-white">{p.title}</h3><p className="text-cyber-400">{p.price}</p></div>
                    <div className="flex gap-1"><button onClick={() => { setEditingPrice(p); setPriceForm({...p, features: p.features?.join(', ') || ''}); setPriceOpen(true); }} className="p-1 text-slate-400 hover:text-cyber-400"><Pencil className="h-4 w-4" /></button><button onClick={() => delPrice(p.id)} className="p-1 text-slate-400 hover:text-red-400"><Trash2 className="h-4 w-4" /></button></div>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1">{p.features?.map((f: string) => <span key={f} className="text-xs bg-white/5 px-2 py-1 rounded-full text-slate-300">{f}</span>)}</div>
                  {p.is_popular && <span className="mt-3 inline-block text-xs font-bold text-cyber-400">★ Popular</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CASE STUDIES TAB */}
      {tab === 'studies' && (
        <div className="space-y-4">
          <div className="flex justify-end"><button onClick={() => { setEditingStudy(null); setStudyOpen(true); }} className="btn-primary px-4 py-2 text-xs"><Plus className="h-4 w-4" /> Add Case Study</button></div>
          {loading ? <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div> : caseStudies.length === 0 ? <div className="text-center py-10 text-slate-400">No case studies yet.</div> : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((cs) => (
                <div key={cs.id} className="rounded-2xl glass p-5 border border-white/5 overflow-hidden">
                  {cs.image_url && <img src={cs.image_url} alt={cs.title} className="w-full h-32 object-cover rounded-lg mb-3" />}
                  <div className="flex justify-between items-start">
                    <div><h3 className="font-display text-lg font-bold text-white">{cs.title}</h3><p className="text-xs text-cyber-400">{cs.client}</p></div>
                    <div className="flex gap-1"><button onClick={() => { setEditingStudy(cs); setStudyForm(cs); setStudyOpen(true); }} className="p-1 text-slate-400 hover:text-cyber-400"><Pencil className="h-4 w-4" /></button><button onClick={() => delStudy(cs.id)} className="p-1 text-slate-400 hover:text-red-400"><Trash2 className="h-4 w-4" /></button></div>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{cs.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODALS */}
      {priceOpen && <Modal title={editingPrice ? 'Edit Pricing' : 'Add Pricing'} onClose={() => setPriceOpen(false)}><form onSubmit={submitPrice} className="space-y-4"><div><label className="text-xs uppercase tracking-wider text-slate-400">Title</label><input value={priceForm.title} onChange={e => setPriceForm({...priceForm, title: e.target.value})} className="input-field" /></div><div className="grid gap-4 md:grid-cols-2"><div><label className="text-xs uppercase tracking-wider text-slate-400">Price</label><input value={priceForm.price} onChange={e => setPriceForm({...priceForm, price: e.target.value})} className="input-field" /></div><div><label className="text-xs uppercase tracking-wider text-slate-400">Description</label><input value={priceForm.description} onChange={e => setPriceForm({...priceForm, description: e.target.value})} className="input-field" /></div></div><div><label className="text-xs uppercase tracking-wider text-slate-400">Features (comma separated)</label><input value={priceForm.features} onChange={e => setPriceForm({...priceForm, features: e.target.value})} className="input-field" placeholder="Design, SEO, Payment" /></div><div className="flex items-center gap-2"><input type="checkbox" checked={priceForm.is_popular} onChange={e => setPriceForm({...priceForm, is_popular: e.target.checked})} className="h-4 w-4 rounded border-white/20 bg-white/10" /><label className="text-sm text-slate-300">Mark as Most Popular</label></div><button type="submit" className="btn-primary w-full py-2 text-sm"><Save className="h-4 w-4" /> Save</button></form></Modal>}
      
      {studyOpen && <Modal title={editingStudy ? 'Edit Case Study' : 'Add Case Study'} onClose={() => setStudyOpen(false)}><form onSubmit={submitStudy} className="space-y-4"><div><label className="text-xs uppercase tracking-wider text-slate-400">Title</label><input value={studyForm.title} onChange={e => setStudyForm({...studyForm, title: e.target.value})} className="input-field" /></div><div><label className="text-xs uppercase tracking-wider text-slate-400">Client</label><input value={studyForm.client} onChange={e => setStudyForm({...studyForm, client: e.target.value})} className="input-field" /></div><div><label className="text-xs uppercase tracking-wider text-slate-400">Description</label><textarea value={studyForm.description} onChange={e => setStudyForm({...studyForm, description: e.target.value})} rows={3} className="input-field" /></div><div><label className="text-xs uppercase tracking-wider text-slate-400">Image URL</label><input value={studyForm.image_url} onChange={e => setStudyForm({...studyForm, image_url: e.target.value})} className="input-field" /></div><button type="submit" className="btn-primary w-full py-2 text-sm"><Save className="h-4 w-4" /> Save</button></form></Modal>}
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={onClose}><div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl glass-strong p-6" onClick={(e) => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h2 className="font-display text-lg font-bold text-white">{title}</h2><button onClick={onClose} className="text-slate-400 hover:text-white"><X className="h-5 w-5" /></button></div>{children}</div></div>;
}