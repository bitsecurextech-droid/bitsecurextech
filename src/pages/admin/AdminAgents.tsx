import { useEffect, useState } from 'react';
import { Users, Plus, Loader2, Pencil, Trash2, Save, X, Phone, MessageCircle, Mail } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminAgents() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  
  const [form, setForm] = useState({
    name: '',
    role: '',
    whatsapp: '',
    telegram: '',
    email: '',
    avatar_url: '',
    is_active: true,
  });

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('admin_agents').select('*').order('created_at', { ascending: false });
    setItems(data ?? []); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await supabase.from('admin_agents').update(form).eq('id', editing.id);
    } else {
      await supabase.from('admin_agents').insert(form);
    }
    setOpen(false); setEditing(null); load();
  };

  const del = async (id: string) => { if (!confirm('Delete this agent?')) return; await supabase.from('admin_agents').delete().eq('id', id); load(); };
  const toggleActive = async (id: string, current: boolean) => { await supabase.from('admin_agents').update({ is_active: !current }).eq('id', id); load(); };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="font-display text-2xl font-bold text-white">Support Agents</h1><p className="text-sm text-slate-400">Manage agents available for WhatsApp and Telegram chat.</p></div>
        <button onClick={() => { setEditing(null); setOpen(true); }} className="btn-primary px-4 py-2 text-xs"><Plus className="h-4 w-4" /> New Agent</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl glass py-16 text-center">
          <Users className="h-12 w-12 text-slate-600" />
          <p className="mt-4 text-sm text-slate-400">No agents added yet. Add one now!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((a) => (
            <div key={a.id} className="rounded-2xl glass p-5 card-hover border border-white/5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-cyber-500 to-electric-500 text-sm font-bold text-white overflow-hidden">
                    {a.avatar_url ? <img src={a.avatar_url} className="h-full w-full object-cover" /> : a.name?.[0] || 'A'}
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-white">{a.name}</h3>
                    <p className="text-xs text-slate-400">{a.role}</p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {a.whatsapp && <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] text-green-400"><Phone className="h-3 w-3" /> WA</span>}
                      {a.telegram && <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] text-blue-400"><MessageCircle className="h-3 w-3" /> TG</span>}
                      {a.email && <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-slate-400"><Mail className="h-3 w-3" /> Email</span>}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <button onClick={() => toggleActive(a.id, a.is_active)} className={`text-[10px] ${a.is_active ? 'text-electric-400' : 'text-slate-500'}`}>
                    {a.is_active ? 'Active' : 'Inactive'}
                  </button>
                  <div className="flex items-center gap-1">
                    <button onClick={() => { setEditing(a); setForm(a); setOpen(true); }} className="rounded-lg p-1 text-slate-400 hover:bg-cyber-500/15 hover:text-cyber-300"><Pencil className="h-3.5 w-3.5" /></button>
                    <button onClick={() => del(a.id)} className="rounded-lg p-1 text-slate-400 hover:bg-red-500/15 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AGENT FORM MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl glass-strong p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-white">{editing ? 'Edit Agent' : 'Add New Agent'}</h2>
              <button onClick={() => setOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={submit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div><label className="text-xs uppercase tracking-wider text-slate-400">Name *</label><input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" /></div>
                <div><label className="text-xs uppercase tracking-wider text-slate-400">Role</label><input value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="input-field" /></div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div><label className="text-xs uppercase tracking-wider text-slate-400">WhatsApp</label><input value={form.whatsapp} onChange={e => setForm({...form, whatsapp: e.target.value})} className="input-field" placeholder="+234..." /></div>
                <div><label className="text-xs uppercase tracking-wider text-slate-400">Telegram</label><input value={form.telegram} onChange={e => setForm({...form, telegram: e.target.value})} className="input-field" placeholder="@username" /></div>
                <div><label className="text-xs uppercase tracking-wider text-slate-400">Email</label><input value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input-field" /></div>
              </div>
              <div><label className="text-xs uppercase tracking-wider text-slate-400">Avatar URL</label><input value={form.avatar_url} onChange={e => setForm({...form, avatar_url: e.target.value})} className="input-field" placeholder="https://..." /></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={form.is_active} onChange={e => setForm({...form, is_active: e.target.checked})} className="h-4 w-4 rounded border-white/20 bg-white/10" /><label className="text-sm text-slate-300">Active</label></div>
              <button type="submit" className="btn-primary w-full py-2 text-xs"><Save className="h-4 w-4" /> Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}