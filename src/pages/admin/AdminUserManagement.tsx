import { useState, useEffect } from 'react';
import { Users, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminUserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const load = async () => { const { data } = await supabase.from('user_profiles').select('*'); setUsers(data || []); setLoading(false); };
  useEffect(() => { load(); }, []);

  const updateRole = async (id: string, role: string) => {
    setUpdating(true);
    await supabase.from('user_profiles').update({ role }).eq('id', id);
    setUpdating(false); load();
  };

  const toggleActive = async (id: string, current: boolean) => {
    setUpdating(true);
    await supabase.from('user_profiles').update({ is_active: !current }).eq('id', id);
    setUpdating(false); load();
  };

  return (
    <div className="space-y-5">
      <div><h1 className="font-display text-2xl font-bold text-white">User Management</h1><p className="text-sm text-slate-400">Manage admin roles and permissions.</p></div>
      {loading ? <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
        : users.length === 0 ? <div className="flex flex-col items-center justify-center rounded-2xl glass py-16 text-center"><Users className="h-12 w-12 text-slate-600" /><p className="mt-4 text-sm text-slate-400">No users found.</p></div>
        : (
          <div className="space-y-3">
            {users.map((u) => (
              <div key={u.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl glass p-5">
                <div><p className="font-display text-base font-semibold text-white">{u.full_name || u.id}</p><p className="text-sm text-slate-400">Role: <span className="font-mono text-cyber-400">{u.role}</span></p><p className="text-xs text-slate-500">Status: {u.is_active ? '✅ Active' : '⛔ Inactive'}</p></div>
                <div className="flex flex-wrap items-center gap-2">
                  <select value={u.role} onChange={(e) => updateRole(u.id, e.target.value)} disabled={updating} className="rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm text-white"><option value="editor">Editor</option><option value="admin">Admin</option><option value="super_admin">Super Admin</option><option value="security">Security</option></select>
                  <button onClick={() => toggleActive(u.id, u.is_active)} disabled={updating} className={`rounded-lg px-3 py-2 text-sm ${u.is_active ? 'bg-yellow-500/15 text-yellow-400' : 'bg-green-500/15 text-green-400'}`}>{u.is_active ? 'Deactivate' : 'Activate'}</button>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}