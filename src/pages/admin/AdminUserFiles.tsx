import { useEffect, useState } from 'react';
import { FileText, Loader2, Download, Trash2, Calendar, User } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminUserFiles() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFiles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('portal_files')
        .select('*, user_profiles(full_name, role)')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Files error:', error);
        // If relationship error, get data without join
        if (error.code === 'PGRST200') {
          const fallbackData = await supabase
            .from('portal_files')
            .select('*')
            .order('created_at', { ascending: false });
          setFiles(fallbackData.data || []);
        }
      } else {
        setFiles(data || []);
      }
    } catch (err) {
      console.error('Load error:', err);
    }
    setLoading(false);
  };

  useEffect(() => { loadFiles(); }, []);

  const deleteFile = async (id: string) => {
    if (!confirm('Delete this file?')) return;
    try {
      const { error } = await supabase
        .from('portal_files')
        .delete()
        .eq('id', id);
      if (error) throw error;
      loadFiles();
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const getFileIcon = (fileType?: string) => {
    if (!fileType) return '📄';
    if (fileType.includes('pdf')) return '📕';
    if (fileType.includes('image')) return '🖼️';
    if (fileType.includes('video')) return '🎬';
    if (fileType.includes('audio')) return '🎵';
    if (fileType.includes('zip')) return '📦';
    if (fileType.includes('doc')) return '📝';
    return '📄';
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
    return (bytes / 1073741824).toFixed(1) + ' GB';
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-cyber-400" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">User Files</h1>
          <p className="text-sm text-slate-400">Monitor files uploaded by your clients.</p>
        </div>
        <button 
          onClick={loadFiles} 
          className="btn-ghost px-4 py-2 text-xs flex items-center gap-2"
        >
          <Loader2 className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {files.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl glass py-16 text-center">
          <FileText className="h-12 w-12 text-slate-600" />
          <p className="mt-4 text-sm text-slate-400">No files uploaded yet.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {files.map((f) => (
            <div key={f.id} className="flex flex-wrap items-center justify-between rounded-2xl glass p-5 border border-white/5 hover:border-cyber-500/30 transition-colors">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-cyber-500/15 text-2xl">
                  {f.file_type ? (
                    <span>{getFileIcon(f.file_type)}</span>
                  ) : (
                    <FileText className="h-5 w-5 text-cyber-400" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{f.file_name || f.name}</p>
                  {f.file_type && (
                    <span className="text-xs text-slate-500 capitalize">
                      {f.file_type.replace(/^.*\//, '').toUpperCase()}
                    </span>
                  )}
                  {f.file_size && (
                    <span className="ml-2 text-xs text-slate-500">
                      {formatFileSize(f.file_size)}
                    </span>
                  )}
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" /> 
                      {f.user_profiles?.full_name || 'Unknown User'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> 
                      {new Date(f.created_at).toLocaleDateString()}
                    </span>
                    {f.project_id && (
                      <span className="text-cyber-400">Project attached</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                {f.file_url && (
                  <a 
                    href={f.file_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                    title="Download file"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                )}
                <button 
                  onClick={() => deleteFile(f.id)} 
                  className="rounded-lg p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                  title="Delete file"
                >
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
