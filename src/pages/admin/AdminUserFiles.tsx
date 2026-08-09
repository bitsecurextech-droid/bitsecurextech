import { useEffect, useState } from 'react';
import { FileText, Loader2, Download, Trash2, Calendar, User } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminUserFiles() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFiles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('portal_files')
      .select('*, user_profiles(email, full_name)')
      .order('created_at', { ascending: false });
    if (data) setFiles(data);
    setLoading(false);
  };

  useEffect(() => { loadFiles(); }, []);

  const deleteFile = async (id: string) => {
    if (!confirm('Delete this file?')) return;
    await supabase.from('portal_files').delete().eq('id', id);
    loadFiles();
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">User Files</h1>
          <p className="text-sm text-slate-400">Monitor files uploaded by your clients.</p>
        </div>
        <button onClick={loadFiles} className="btn-ghost px-4 py-2 text-xs">Refresh</button>
      </div>

      {files.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl glass py-16 text-center">
          <FileText className="h-12 w-12 text-slate-600" />
          <p className="mt-4 text-sm text-slate-400">No files uploaded yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {files.map((f) => (
            <div key={f.id} className="flex flex-wrap items-center justify-between rounded-2xl glass p-5 border border-white/5">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-cyber-500/15">
                  <FileText className="h-5 w-5 text-cyber-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{f.name}</p>
                  {f.purpose && <p className="text-xs text-slate-400 mt-0.5">Purpose: {f.purpose}</p>}
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" /> {f.user_profiles?.full_name || f.user_profiles?.email || 'Unknown'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {new Date(f.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {f.url && (
                  <a href={f.url} target="_blank" rel="noopener noreferrer" className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
                    <Download className="h-4 w-4" />
                  </a>
                )}
                <button onClick={() => deleteFile(f.id)} className="rounded-lg p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}