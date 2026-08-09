import { useState, useRef, useEffect } from 'react';
import { Upload, Loader2, FileText, Download, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function Files() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const { data } = await supabase.from('portal_files').select('*').order('created_at', { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const upload = async (file: File) => {
    if (!file) return;
    setUploading(true);
    const filePath = `user_uploads/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from('portal-files').upload(filePath, file);
    if (error) { alert('Error: ' + error.message); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from('portal-files').getPublicUrl(filePath);
    await supabase.from('portal_files').insert({ name: file.name, type: file.type, url: publicUrl });
    setUploading(false);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-white/5 pb-4">
        <h1 className="text-2xl font-bold text-white">Files</h1>
      </div>

      <div className="flex gap-3">
        <input ref={fileRef} type="file" className="hidden" onChange={e => { if (e.target.files?.[0]) upload(e.target.files[0]); }} />
        <button onClick={() => fileRef.current?.click()} disabled={uploading} className="btn-primary text-sm px-4 py-2">
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />} Upload File
        </button>
      </div>

      {loading ? <div className="flex justify-center py-10"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
        : items.length === 0 ? <div className="text-center py-10 text-slate-400">No files uploaded yet.</div>
        : <div className="grid gap-3 sm:grid-cols-2">{items.map(f => (
          <div key={f.id} className="flex items-center gap-3 rounded-xl bg-navy-800/50 p-4 border border-white/5">
            <FileText className="h-8 w-8 text-cyber-400 shrink-0" />
            <div className="flex-1 min-w-0"><p className="truncate text-sm font-medium text-white">{f.name}</p></div>
            {f.url && <a href={f.url} target="_blank" rel="noopener" className="p-1 text-slate-400 hover:text-white"><Download className="h-4 w-4" /></a>}
            <button onClick={() => supabase.from('portal_files').delete().eq('id', f.id).then(load)} className="p-1 text-slate-400 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}</div>}
    </div>
  );
}
export function Files;