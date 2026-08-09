import { useEffect, useState } from 'react';
import { FileText, Plus, Loader2, Pencil, Trash2, Save, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminCaseStudies() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '', 
    client: '', 
    industry: '', 
    challenge: '', 
    strategy: '', 
    design: '', 
    development: '', 
    security: '', 
    image_url: '', 
    features: ''
  });

  const load = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('admin_case_studies')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error loading:', error);
        alert('Error loading case studies: ' + error.message);
      } else {
        setItems(data ?? []);
      }
    } catch (err) {
      console.error('Exception loading:', err);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    console.log('📝 Saving form data:', form);
    console.log('📝 Editing mode:', editing ? 'Yes' : 'No');
    console.log('📝 Table name: admin_case_studies');
    
    try {
      let result;
      
      if (editing) {
        console.log('🔧 Updating existing record with ID:', editing.id);
        result = await supabase
          .from('admin_case_studies')
          .update({
            title: form.title,
            client: form.client,
            industry: form.industry,
            challenge: form.challenge,
            strategy: form.strategy,
            design: form.design,
            development: form.development,
            security: form.security,
            image_url: form.image_url,
            features: form.features
          })
          .eq('id', editing.id);
      } else {
        console.log('➕ Creating new record');
        result = await supabase
          .from('admin_case_studies')
          .insert({
            title: form.title,
            client: form.client,
            industry: form.industry,
            challenge: form.challenge,
            strategy: form.strategy,
            design: form.design,
            development: form.development,
            security: form.security,
            image_url: form.image_url,
            features: form.features
          });
      }
      
      console.log('📊 Result:', result);
      
      if (result.error) {
        console.error('❌ Supabase error:', result.error);
        alert('Error saving: ' + result.error.message);
      } else {
        console.log('✅ Save successful!');
        alert('Case study saved successfully! ✅');
        setOpen(false);
        setEditing(null);
        setForm({
          title: '', 
          client: '', 
          industry: '', 
          challenge: '', 
          strategy: '', 
          design: '', 
          development: '', 
          security: '', 
          image_url: '', 
          features: ''
        });
        await load();
      }
    } catch (err) {
      console.error('❌ Exception caught:', err);
      alert('Something went wrong. Check console for details.');
    } finally {
      setSaving(false);
    }
  };

  const del = async (id: string) => {
    if (!confirm('Delete this case study? This cannot be undone.')) return;
    
    console.log('🗑️ Deleting record with ID:', id);
    
    try {
      const { error } = await supabase
        .from('admin_case_studies')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Delete error:', error);
        alert('Error deleting: ' + error.message);
      } else {
        console.log('✅ Delete successful!');
        await load();
      }
    } catch (err) {
      console.error('Exception deleting:', err);
      alert('Error deleting case study.');
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Case Studies</h1>
          <p className="text-sm text-slate-400">Full CRUD for case studies.</p>
        </div>
        <button 
          onClick={() => { 
            setEditing(null); 
            setForm({
              title: '', client: '', industry: '', challenge: '', strategy: '', 
              design: '', development: '', security: '', image_url: '', features: ''
            });
            setOpen(true); 
          }} 
          className="btn-primary px-4 py-2 text-xs flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> New Case Study
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-cyber-400" />
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl glass py-16 text-center">
          <FileText className="h-12 w-12 text-slate-600" />
          <p className="mt-4 text-sm text-slate-400">No case studies yet. Click "New Case Study" to add one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl glass p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-display text-base font-semibold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-500">{item.client} · {item.industry}</p>
                  {item.challenge && (
                    <p className="mt-2 text-sm text-slate-400 line-clamp-2">{item.challenge}</p>
                  )}
                  {item.features && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.features.split(',').map((f: string, i: number) => (
                        <span key={i} className="rounded-full bg-cyber-500/10 px-2 py-0.5 text-xs text-cyber-300">
                          {f.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => { 
                      setEditing(item); 
                      setForm({
                        title: item.title || '',
                        client: item.client || '',
                        industry: item.industry || '',
                        challenge: item.challenge || '',
                        strategy: item.strategy || '',
                        design: item.design || '',
                        development: item.development || '',
                        security: item.security || '',
                        image_url: item.image_url || '',
                        features: item.features || ''
                      }); 
                      setOpen(true); 
                    }} 
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-cyber-500/15 hover:text-cyber-300"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => del(item.id)} 
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/15 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {open && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" 
          onClick={() => !saving && setOpen(false)}
        >
          <div 
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl glass-strong p-6" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-white">
                {editing ? '✏️ Edit Case Study' : '➕ New Case Study'}
              </h2>
              <button 
                onClick={() => !saving && setOpen(false)} 
                className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
                disabled={saving}
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
                    placeholder="e.g. The Promise We Make to Your Identity"
                    disabled={saving}
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Client *</label>
                  <input 
                    required
                    value={form.client} 
                    onChange={(e) => setForm({...form, client: e.target.value})} 
                    className="input-field" 
                    placeholder="e.g. GLIDEWITH"
                    disabled={saving}
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Industry *</label>
                  <input 
                    required
                    value={form.industry} 
                    onChange={(e) => setForm({...form, industry: e.target.value})} 
                    className="input-field" 
                    placeholder="e.g. E-commerce"
                    disabled={saving}
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Image URL</label>
                  <input 
                    value={form.image_url} 
                    onChange={(e) => setForm({...form, image_url: e.target.value})} 
                    className="input-field" 
                    placeholder="https://example.com/image.jpg"
                    disabled={saving}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Full Description *</label>
                <textarea 
                  required
                  value={form.challenge} 
                  onChange={(e) => setForm({...form, challenge: e.target.value})} 
                  rows={8} 
                  className="input-field" 
                  placeholder="Write the complete case study description here..."
                  disabled={saving}
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400">Features (comma separated)</label>
                <input 
                  value={form.features} 
                  onChange={(e) => setForm({...form, features: e.target.value})} 
                  className="input-field" 
                  placeholder="Shopify Store, SEO, Social Media Ads, Brand Design"
                  disabled={saving}
                />
              </div>
              <button 
                type="submit" 
                className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    {editing ? 'Update Case Study' : 'Create Case Study'}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
