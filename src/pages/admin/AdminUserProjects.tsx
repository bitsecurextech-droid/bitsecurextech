import { useEffect, useState } from 'react';
import { FolderKanban, Loader2, User, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminUserProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('portal_projects')
      .select('*, user_profiles(email, full_name)')
      .order('created_at', { ascending: false });
    if (data) setProjects(data);
    setLoading(false);
  };

  useEffect(() => { loadProjects(); }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">User Projects</h1>
          <p className="text-sm text-slate-400">Monitor and manage projects created by your clients.</p>
        </div>
        <button onClick={loadProjects} className="btn-ghost px-4 py-2 text-xs">Refresh</button>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl glass py-16 text-center">
          <FolderKanban className="h-12 w-12 text-slate-600" />
          <p className="mt-4 text-sm text-slate-400">No user projects created yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p.id} className="rounded-2xl glass p-5 border border-white/5 hover:border-cyber-500/30 transition-colors">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-base font-semibold text-white">{p.title}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      p.status === 'Completed' ? 'bg-electric-500/15 text-electric-400' :
                      p.status === 'In Progress' ? 'bg-yellow-500/15 text-yellow-400' :
                      'bg-slate-500/15 text-slate-400'
                    }`}>
                      {p.status || 'Planning'}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" /> 
                      {p.user_profiles?.full_name || p.user_profiles?.email || 'Unknown User'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> 
                      {new Date(p.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  {p.description && (
                    <p className="mt-2 text-sm text-slate-400 line-clamp-2">{p.description}</p>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="w-full sm:w-48 mt-3 sm:mt-0">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Progress</span>
                    <span>{p.progress || 0}%</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-cyber-500 to-electric-500 transition-all duration-500"
                      style={{ width: `${p.progress || 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}