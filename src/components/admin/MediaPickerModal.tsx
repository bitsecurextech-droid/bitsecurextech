import { useState, useEffect, useRef } from 'react';
import { X, Upload, Image as ImageIcon, Loader2, Trash2, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  created_at: string;
}

interface MediaPickerModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export function MediaPickerModal({ open, onClose, onSelect }: MediaPickerModalProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadMedia = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('media_library')
      .select('*')
      .order('created_at', { ascending: false });
    setFiles(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (open) loadMedia();
  }, [open]);

  const uploadFile = async (file: File) => {
    if (!file) return;
    setUploading(true);

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);

    await supabase.from('media_library').insert({
      name: file.name,
      url: publicUrl,
      type: file.type,
      size: file.size,
    });

    setUploading(false);
    loadMedia();
  };

  const deleteFile = async (id: string) => {
    if (!confirm('Delete this file?')) return;
    await supabase.from('media_library').delete().eq('id', id);
    loadMedia();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="h-[85vh] w-full max-w-4xl rounded-2xl bg-navy-900 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-white">Media Library</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="btn-primary flex items-center gap-2"
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            Upload
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) uploadFile(e.target.files[0]);
            }}
          />
          <span className="self-center text-sm text-slate-400">Supported: PNG, JPG, WEBP, MP4, PDF</span>
        </div>

        <div className="mt-4 h-[calc(100%-100px)] overflow-y-auto rounded-xl border border-white/10 bg-white/5 p-4">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-cyber-400" />
            </div>
          ) : files.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ImageIcon className="h-12 w-12 text-slate-600" />
              <p className="mt-4 text-slate-400">No media uploaded yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
              {files.map((file) => (
                <div key={file.id} className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5">
                  <button
                    onClick={() => setSelected(file.url)}
                    className="relative block aspect-square w-full overflow-hidden"
                  >
                    {file.type.startsWith('image/') ? (
                      <img src={file.url} alt={file.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-navy-800">
                        <span className="text-xs text-slate-400">{file.type.split('/')[1]?.toUpperCase()}</span>
                      </div>
                    )}
                    {selected === file.url && (
                      <div className="absolute inset-0 flex items-center justify-center bg-cyber-500/30">
                        <Check className="h-8 w-8 text-white" />
                      </div>
                    )}
                  </button>
                  <div className="absolute right-1 top-1 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => deleteFile(file.id)}
                      className="rounded bg-red-500/80 p-1 text-white hover:bg-red-600"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="truncate px-2 py-1 text-xs text-slate-400">{file.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-end gap-2 border-t border-white/10 pt-4">
          <button onClick={onClose} className="btn-ghost px-4 py-2 text-sm">
            Cancel
          </button>
          {selected && (
            <button
              onClick={() => {
                onSelect(selected);
                onClose();
              }}
              className="btn-primary px-4 py-2 text-sm"
            >
              Insert Image URL
            </button>
          )}
        </div>
      </div>
    </div>
  );
}