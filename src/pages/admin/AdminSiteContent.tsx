import { useState, useEffect } from 'react';
import { Loader2, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminSiteContent() {
  const [content, setContent] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadContent = async () => {
    const { data } = await supabase.from('site_content').select('*');
    const obj: Record<string, any> = {};
    data?.forEach((item) => { obj[item.key] = item.value; });
    setContent(obj); setLoading(false);
  };
  useEffect(() => { loadContent(); }, []);

  const saveContent = async (key: string, value: any) => {
    setSaving(true);
    const { error } = await supabase.from('site_content').upsert({ key, value, updated_at: new Date().toISOString() });
    if (!error) { setMessage(`✅ ${key} saved!`); setTimeout(() => setMessage(''), 3000); }
    setSaving(false);
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>;

  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-2xl font-bold text-white">Site Content Editor</h1><p className="text-sm text-slate-400">Edit static text on the live site.</p></div>
      {message && <div className="rounded-lg bg-electric-500/10 px-4 py-3 text-sm text-electric-400">{message}</div>}
      <div className="grid gap-6 lg:grid-cols-2">
        {Object.entries(content).map(([key, value]) => (
          <div key={key} className="rounded-2xl glass p-6">
            <h3 className="font-display text-lg font-semibold text-white capitalize">{key.replace('_', ' ')}</h3>
            <input value={value} onChange={(e) => setContent({ ...content, [key]: e.target.value })} className="input-field mt-3" />
            <button onClick={() => saveContent(key, content[key])} disabled={saving} className="btn-primary mt-4 px-4 py-2 text-sm">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save</button>
          </div>
        ))}
      </div>
    </div>
  );
}