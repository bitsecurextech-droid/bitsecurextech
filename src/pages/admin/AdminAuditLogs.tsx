import { useState, useEffect } from 'react';
import { Activity, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminAuditLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(100);
      setLogs(data || []); setLoading(false);
    })();
  }, []);

  const getActionColor = (action: string) => {
    if (action === 'INSERT') return 'text-green-400';
    if (action === 'UPDATE') return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-5">
      <div><h1 className="font-display text-2xl font-bold text-white">Audit Logs</h1><p className="text-sm text-slate-400">Every admin action is tracked here.</p></div>
      {loading ? <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
        : logs.length === 0 ? <div className="flex flex-col items-center justify-center rounded-2xl glass py-16 text-center"><Activity className="h-12 w-12 text-slate-600" /><p className="mt-4 text-sm text-slate-400">No logs yet.</p></div>
        : (
          <div className="max-h-[600px] space-y-2 overflow-y-auto">
            {logs.map((log) => (
              <div key={log.id} className="rounded-xl border border-white/5 bg-white/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3"><span className={`font-mono text-sm font-bold ${getActionColor(log.action)}`}>{log.action}</span><span className="text-sm font-medium text-white">{log.table_name}</span><span className="text-xs text-slate-500">{log.record_id}</span></div>
                  <div className="flex items-center gap-3 text-xs text-slate-400"><span>{log.user_email || 'System'}</span><span>{new Date(log.created_at).toLocaleString()}</span></div>
                </div>
                {log.old_data && log.new_data && (
                  <details className="mt-2 text-xs text-slate-400"><summary className="cursor-pointer hover:text-white">View changes</summary><pre className="mt-2 overflow-x-auto rounded bg-navy-950 p-2">{JSON.stringify({ old: log.old_data, new: log.new_data }, null, 2)}</pre></details>
                )}
              </div>
            ))}
          </div>
        )}
    </div>
  );
}