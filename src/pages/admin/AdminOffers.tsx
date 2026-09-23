import { useState, useEffect } from 'react';
import { Tag, Plus, Loader2, Pencil, Trash2, Save, X, Star, StarOff, Eye, EyeOff, Image as ImageIcon, Calendar, DollarSign, Percent, Link2, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabase';

type Offer = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  original_price: number | null;
  sale_price: number | null;
  discount_percentage: number | null;
  deadline: string | null;
  cta_text: string;
  cta_link: string;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
};

const CATEGORIES = ['Web Development', 'Ecommerce', 'Digital Marketing', 'SEO and Traffic', 'Creator Promotion', 'Seasonal'];

const emptyForm = {
  title: '',
  description: '',
  category: 'Web Development',
  image_url: '',
  original_price: '' as string | number,
  sale_price: '' as string | number,
  discount_percentage: '' as string | number,
  deadline: '',
  cta_text: 'Claim Offer',
  cta_link: '/contact',
  is_featured: false,
  is_active: true,
};

export function AdminOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Offer | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });

  const load = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('offers').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Load offers error:', error);
      } else {
        setOffers(data || []);
      }
    } catch (err) {
      console.error('Load exception:', err);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      category: form.category,
      image_url: form.image_url.trim() || null,
      original_price: form.original_price === '' ? null : Number(form.original_price),
      sale_price: form.sale_price === '' ? null : Number(form.sale_price),
      discount_percentage: form.discount_percentage === '' ? null : Number(form.discount_percentage),
      deadline: form.deadline || null,
      cta_text: form.cta_text.trim() || 'Claim Offer',
      cta_link: form.cta_link.trim() || '/contact',
      is_featured: form.is_featured,
      is_active: form.is_active,
    };

    try {
      let result;
      if (editing) {
        result = await supabase.from('offers').update(payload).eq('id', editing.id);
      } else {
        result = await supabase.from('offers').insert(payload);
      }

      if (result.error) {
        alert('Error saving offer: ' + result.error.message);
        return;
      }

      setOpen(false);
      setEditing(null);
      setForm({ ...emptyForm });
      load();
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const del = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      const { error } = await supabase.from('offers').delete().eq('id', id);
      if (error) { alert('Error: ' + error.message); return; }
      load();
    } catch (err: any) { alert('Error: ' + err.message); }
  };

  const toggleFeatured = async (offer: Offer) => {
    try {
      await supabase.from('offers').update({ is_featured: !offer.is_featured }).eq('id', offer.id);
      load();
    } catch (err: any) { alert('Error: ' + err.message); }
  };

  const toggleActive = async (offer: Offer) => {
    try {
      await supabase.from('offers').update({ is_active: !offer.is_active }).eq('id', offer.id);
      load();
    } catch (err: any) { alert('Error: ' + err.message); }
  };

  const openEditor = (offer?: Offer) => {
    if (offer) {
      setEditing(offer);
      setForm({
        title: offer.title || '',
        description: offer.description || '',
        category: offer.category || 'Web Development',
        image_url: offer.image_url || '',
        original_price: offer.original_price ?? '',
        sale_price: offer.sale_price ?? '',
        discount_percentage: offer.discount_percentage ?? '',
        deadline: offer.deadline ? offer.deadline.slice(0, 10) : '',
        cta_text: offer.cta_text || 'Claim Offer',
        cta_link: offer.cta_link || '/contact',
        is_featured: offer.is_featured || false,
        is_active: offer.is_active !== false,
      });
    } else {
      setEditing(null);
      setForm({ ...emptyForm });
    }
    setOpen(true);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Offers & Deals</h1>
          <p className="text-sm text-slate-400">Manage public offers shown on the /offers page.</p>
        </div>
        <button onClick={() => openEditor()} className="btn-primary px-4 py-2 text-xs flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Offer
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="glass rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-white">{offers.length}</p>
          <p className="text-xs text-slate-400">Total</p>
        </div>
        <div className="glass rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-green-400">{offers.filter(o => o.is_active).length}</p>
          <p className="text-xs text-slate-400">Active</p>
        </div>
        <div className="glass rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-yellow-400">{offers.filter(o => o.is_featured).length}</p>
          <p className="text-xs text-slate-400">Featured</p>
        </div>
        <div className="glass rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-red-400">{offers.filter(o => !o.is_active).length}</p>
          <p className="text-xs text-slate-400">Hidden</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
      ) : offers.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl glass py-16 text-center">
          <Tag className="h-12 w-12 text-slate-600" />
          <p className="mt-4 text-sm text-slate-400">No offers yet. Click "Add Offer" to create one.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <div key={offer.id} className={`rounded-2xl glass p-5 border transition-all ${offer.is_featured ? 'border-yellow-500/50 ring-1 ring-yellow-500/30' : 'border-white/5'} ${!offer.is_active ? 'opacity-60' : ''}`}>
              {offer.image_url && (
                <div className="overflow-hidden rounded-lg h-32 mb-3">
                  <img src={offer.image_url} alt={offer.title} className="h-full w-full object-cover" onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')} />
                </div>
              )}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base font-semibold text-white truncate">{offer.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{offer.category}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => toggleFeatured(offer)} className="rounded-lg p-1.5 text-slate-400 hover:bg-yellow-500/15 hover:text-yellow-400">
                    {offer.is_featured ? <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> : <StarOff className="h-4 w-4" />}
                  </button>
                  <button onClick={() => toggleActive(offer)} className="rounded-lg p-1.5 text-slate-400 hover:bg-cyber-500/15 hover:text-cyber-300">
                    {offer.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  <button onClick={() => openEditor(offer)} className="rounded-lg p-1.5 text-slate-400 hover:bg-cyber-500/15 hover:text-cyber-300">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => del(offer.id, offer.title)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/15 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {offer.description && <p className="mt-2 text-sm text-slate-400 line-clamp-2">{offer.description}</p>}
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                {offer.original_price && <span className="text-sm text-slate-500 line-through">${offer.original_price}</span>}
                {offer.sale_price && <span className="text-lg font-bold text-cyber-400">${offer.sale_price}</span>}
                {offer.discount_percentage && <span className="rounded-full bg-electric-500/20 px-2 py-0.5 text-[10px] font-bold text-electric-400">{offer.discount_percentage}% OFF</span>}
              </div>
              {offer.deadline && (
                <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                  <Calendar className="h-3 w-3" /> Ends {new Date(offer.deadline).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm overflow-y-auto" onClick={() => !saving && setOpen(false)}>
          <div className="max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-2xl glass-strong p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-cyber-400" />
                {editing ? 'Edit Offer' : 'Add New Offer'}
              </h2>
              <button onClick={() => setOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white" disabled={saving}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Title *</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field" placeholder="e.g. 30% Off Website Design" disabled={saving} />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field" disabled={saving}>
                    {CATEGORIES.map((c) => <option key={c} className="bg-navy-900">{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Deadline</label>
                  <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="input-field" disabled={saving} />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="input-field resize-none" placeholder="Short description of the offer..." disabled={saving} />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <ImageIcon className="h-3 w-3" /> Image URL
                </label>
                <input type="url" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="input-field" placeholder="https://example.com/offer.jpg" disabled={saving} />
                {form.image_url && (
                  <img src={form.image_url} alt="Preview" className="mt-2 h-32 w-full rounded-lg object-cover border border-white/10" onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')} />
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1"><DollarSign className="h-3 w-3" /> Original Price</label>
                  <input type="number" value={form.original_price} onChange={(e) => setForm({ ...form, original_price: e.target.value })} className="input-field" placeholder="1000" disabled={saving} />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1"><DollarSign className="h-3 w-3" /> Sale Price</label>
                  <input type="number" value={form.sale_price} onChange={(e) => setForm({ ...form, sale_price: e.target.value })} className="input-field" placeholder="700" disabled={saving} />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1"><Percent className="h-3 w-3" /> Discount %</label>
                  <input type="number" value={form.discount_percentage} onChange={(e) => setForm({ ...form, discount_percentage: e.target.value })} className="input-field" placeholder="30" disabled={saving} />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1"><Link2 className="h-3 w-3" /> CTA Text</label>
                  <input value={form.cta_text} onChange={(e) => setForm({ ...form, cta_text: e.target.value })} className="input-field" placeholder="Claim Offer" disabled={saving} />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1"><Link2 className="h-3 w-3" /> CTA Link</label>
                  <input value={form.cta_link} onChange={(e) => setForm({ ...form, cta_link: e.target.value })} className="input-field" placeholder="/contact" disabled={saving} />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-2">
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="h-4 w-4 rounded border-white/20 bg-white/10" disabled={saving} />
                  <Star className="h-4 w-4 text-yellow-400" /> Feature
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="h-4 w-4 rounded border-white/20 bg-white/10" disabled={saving} />
                  <Eye className="h-4 w-4 text-cyber-400" /> Active
                </label>
              </div>

              <button type="submit" disabled={saving} className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {saving ? 'Saving...' : editing ? 'Update Offer' : 'Create Offer'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOffers;
