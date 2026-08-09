import { useState, useEffect, useRef } from 'react';
import { Image as ImageIcon, Upload, Loader2, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminMedia() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = async () => { const { data } = await supabase.from('media_library').select('*').order('created_at', { ascending: false }); setMedia(data || []); setLoading(false); };
  useEffect(() => { load(); }, []);

  const upload = async (file: File) => {
    if (!file) return;
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;
    const { error: uploadError } = await supabase.storage.from('media').upload(filePath, file);
    if (uploadError) { console.error('Upload error:', uploadError); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath);
    await supabase.from('media_library').insert({ name: file.name, url: publicUrl, type: file.type, size: file.size });
    setUploading(false); load();
  };

  const remove = async (id: string) => { await supabase.from('media_library').delete().eq('id', id); load(); };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="font-display text-2xl font-bold text-white">Media Library</h1><p className="text-sm text-slate-400">All uploaded images, videos, and files.</p></div>
        <button onClick={() => fileInputRef.current?.click()} className="btn-primary px-4 py-2 text-xs"><Upload className="h-4 w-4" /> Upload</button>
      </div>
      <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => { if (e.target.files?.[0]) upload(e.target.files[0]); }} />
      {loading ? <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
        : media.length === 0 ? <div className="flex flex-col items-center justify-center rounded-2xl glass py-16 text-center"><ImageIcon className="h-12 w-12 text-slate-600" /><p className="mt-4 text-sm text-slate-400">No media uploaded.</p></div>
        : (
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {media.map((m) => (
              <div key={m.id} className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5">
                {m.type.startsWith('image/') ? (<img src={m.url} alt={m.name} className="aspect-square w-full object-cover" />) : (<div className="flex aspect-square items-center justify-center bg-navy-800"><span className="text-xs text-slate-400">{m.type.split('/')[1]?.toUpperCase()}</span></div>)}
                <button onClick={() => remove(m.id)} className="absolute right-1 top-1 rounded bg-red-500/80 p-1 opacity-0 transition-opacity group-hover:opacity-100"><Trash2 className="h-3 w-3 text-white" /></button>
                <p className="truncate px-2 py-1 text-xs text-slate-400">{m.name}</p>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}