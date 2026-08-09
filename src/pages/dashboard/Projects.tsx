import { useState, useEffect } from 'react';
import { Plus, Loader2, Trash2, Pencil, Check, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const STATUS_COLORS: Record<string, string> = {
  Planning: 'bg-blue-500/20 text-blue-400',
  'In Progress': 'bg-yellow-500/20 text-yellow-400',
  Review: 'bg-purple-500/20 text-purple-400',
  Completed: 'bg-green-500/20 text-green-400',
};

export function Projects() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('portal_projects').select('*').order('created_at', { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const addProject = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('portal_projects').insert({ title, description: desc });
    setTitle(''); setDesc(''); setShowForm(false); load();
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await supabase.from('portal_projects').delete().eq('id', id);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm px-4 py-2"><Plus className="h-4 w-4" /> New</button>
      </div>

      {showForm && (
        <form onSubmit={addProject} className="rounded-xl border border-cyber-500/30 bg-navy-800/50 p-4 space-y-3">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Project Title" className="input-field" />
          <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" rows={3} className="input-field" />
          <button type="submit" className="btn-primary text-sm px-4 py-2"><Check className="h-4 w-4" /> Create</button>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-10 text-slate-400">No projects yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map((p) => (
            <div key={p.id} className="flex flex-wrap items-center justify-between rounded-xl bg-navy-800/50 p-4 border border-white/5">
              <div>
                <h3 className="font-medium text-white">{p.title}</h3>
                {p.description && <p className="text-sm text-slate-400">{p.description}</p>}
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_COLORS[p.status] || 'bg-white/10 text-slate-400'}`}>
                  {p.status || 'Pending'}
                </span>
                <button onClick={() => deleteProject(p.id)} className="p-1 text-slate-400 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export function Projects;