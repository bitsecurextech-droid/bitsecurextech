import { useEffect, useState } from 'react';
import { Users, Plus, Loader2, Pencil, Trash2, Save, X, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminTeam() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ name: '', role: '', service_name: '', experience: '', bio: '', image_url: '', is_active: true });

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('admin_team_members').select('*').order('created_at', { ascending: false });
    setItems(data ?? []); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await supabase.from('admin_team_members').update(form).eq('id', editing.id);
    } else {
      await supabase.from('admin_team_members').insert(form);
    }
    setOpen(false); setEditing(null); load();
  };

  const del = async (id: string) => { await supabase.from('admin_team_members').delete().eq('id', id); load(); };
  const toggleActive = async (id: string, current: boolean) => { await supabase.from('admin_team_members').update({ is_active: !current }).eq('id', id); load(); };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><h1 className="font-display text-3xl font-bold text-white">Team Members</h1><p className="text-sm text-slate-400">Manage the team shown on the site.</p></div>
        <button onClick={() => { setEditing(null); setOpen(true); }} className="btn-primary px-5 py-2.5 text-sm"><Plus className="h-4 w-4" /> Add Member</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl glass py-16 text-center"><Users className="h-12 w-12 text-slate-600" /><p className="mt-4 text-sm text-slate-400">No team members yet.</p></div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((m) => (
            <div key={m.id} className="group relative overflow-hidden rounded-2xl glass-strong border border-white/5 hover:border-cyber-500/50 transition-all p-6">
              
              {/* Top Section: Image, Name, Role */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-cyber-500 to-electric-500 ring-2 ring-cyber-500/30 overflow-hidden">
                    {m.image_url ? <img src={m.image_url} alt={m.name} className="h-full w-full object-cover" /> : <span className="text-2xl font-bold text-white">{m.name?.[0]}</span>}
                  </div>
                  <div className="absolute -bottom-1 -right-1 rounded-full bg-navy-950 p-1">
                    {m.is_active ? <CheckCircle className="h-4 w-4 text-electric-400" /> : <XCircle className="h-4 w-4 text-red-400" />}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl font-bold text-white truncate">{m.name}</h3>
                  <p className="text-sm text-cyber-400 truncate">{m.role}</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {m.service_name && <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] text-slate-300">{m.service_name}</span>}
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${m.is_active ? 'bg-electric-500/10 text-electric-400' : 'bg-red-500/10 text-red-400'}`}>
                      {m.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                
                {/* Admin Actions */}
                <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => toggleActive(m.id, m.is_active)} className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10">
                    {m.is_active ? <XCircle className="h-4 w-4 text-yellow-400" /> : <CheckCircle className="h-4 w-4 text-electric-400" />}
                  </button>
                  <button onClick={() => { setEditing(m); setForm(m); setOpen(true); }} className="rounded-lg p-1.5 text-slate-400 hover:bg-cyber-500/15 hover:text-cyber-300"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => del(m.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/15 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>

              {/* Bottom Section: Bio & Experience */}
              <div className="mt-4 border-t border-white/5 pt-4">
                {m.bio && <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">{m.bio}</p>}
                {m.experience && <p className="mt-2 text-xs font-medium text-cyber-400"><span className="text-slate-500">EXP:</span> {m.experience}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl glass-strong p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between"><h2 className="font-display text-xl font-bold text-white">{editing ? 'Edit Member' : 'New Member'}</h2><button onClick={() => setOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"><X className="h-5 w-5" /></button></div>
            <form onSubmit={submit} className="mt-4 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div><label className="text-xs uppercase tracking-wider text-slate-400">Name *</label><input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" /></div>
                <div><label className="text-xs uppercase tracking-wider text-slate-400">Role</label><input value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="input-field" /></div>
              </div>
              <div><label className="text-xs uppercase tracking-wider text-slate-400">Service & Team Name</label><input value={form.service_name} onChange={e => setForm({...form, service_name: e.target.value})} className="input-field" /></div>
              <div><label className="text-xs uppercase tracking-wider text-slate-400">Experience</label><input value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} className="input-field" /></div>
              <div><label className="text-xs uppercase tracking-wider text-slate-400">Bio</label><textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} rows={4} className="input-field" /></div>
              <div><label className="text-xs uppercase tracking-wider text-slate-400">Image URL</label><input value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} className="input-field" /></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={form.is_active} onChange={e => setForm({...form, is_active: e.target.checked})} className="h-4 w-4 rounded border-white/20 bg-white/10" /><label className="text-sm text-slate-300">Active</label></div>
              <button type="submit" className="btn-primary w-full py-2 text-sm"><Save className="h-4 w-4" /> Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}