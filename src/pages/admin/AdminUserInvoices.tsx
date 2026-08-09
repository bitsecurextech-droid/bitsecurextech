import { useState, useEffect } from 'react';
import { Receipt, Plus, Loader2, Trash2, Save, X, User, Calendar, Download } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminUserInvoices() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ user_id: '', number: '', amount: 0, due_date: '', status: 'Unpaid' });

  const load = async () => {
    setLoading(true);
    const [invData, userData] = await Promise.all([
      supabase.from('portal_invoices').select('*, user_profiles(email, full_name)').order('created_at', { ascending: false }),
      supabase.from('user_profiles').select('id, email, full_name'),
    ]);
    setInvoices(invData.data || []);
    setUsers(userData.data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.user_id) return alert('Please select a user.');
    await supabase.from('portal_invoices').insert(form);
    setOpen(false); setForm({ user_id: '', number: '', amount: 0, due_date: '', status: 'Unpaid' }); load();
  };

  const del = async (id: string) => { if (!confirm('Delete this invoice?')) return; await supabase.from('portal_invoices').delete().eq('id', id); load(); };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="font-display text-2xl font-bold text-white">User Invoices</h1><p className="text-sm text-slate-400">Create and manage invoices for your clients.</p></div>
        <button onClick={() => setOpen(true)} className="btn-primary px-4 py-2 text-xs"><Plus className="h-4 w-4" /> New Invoice</button>
      </div>

      {loading ? <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
      : invoices.length === 0 ? <div className="flex flex-col items-center justify-center rounded-2xl glass py-16 text-center"><Receipt className="h-12 w-12 text-slate-600" /><p className="mt-4 text-sm text-slate-400">No invoices created yet.</p></div>
      : (
        <div className="space-y-3">
          {invoices.map((i) => (
            <div key={i.id} className="flex flex-wrap items-center justify-between rounded-2xl glass p-5 border border-white/5">
              <div className="flex items-center gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-electric-500/15"><Receipt className="h-5 w-5 text-electric-400" /></div>
                <div>
                  <p className="font-medium text-white">{i.number}</p>
                  <p className="text-xs text-slate-400">{i.user_profiles?.full_name || i.user_profiles?.email || 'Unknown User'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-display text-lg font-bold text-white">${Number(i.amount).toLocaleString()}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${i.status === 'Paid' ? 'bg-green-500/15 text-green-400' : 'bg-yellow-500/15 text-yellow-400'}`}>{i.status}</span>
                <button onClick={() => del(i.id)} className="rounded-lg p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl glass-strong p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between"><h2 className="font-display text-xl font-bold text-white">Create Invoice</h2><button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white"><X className="h-5 w-5" /></button></div>
            <form onSubmit={submit} className="mt-4 space-y-4">
              <div><label className="text-xs uppercase tracking-wider text-slate-400">Select User *</label>
                <select required value={form.user_id} onChange={e => setForm({...form, user_id: e.target.value})} className="input-field">
                  <option value="">Choose a user...</option>
                  {users.map(u => <option key={u.id} value={u.id}>{u.full_name || u.email}</option>)}
                </select>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div><label className="text-xs uppercase tracking-wider text-slate-400">Invoice Number *</label><input required value={form.number} onChange={e => setForm({...form, number: e.target.value})} className="input-field" /></div>
                <div><label className="text-xs uppercase tracking-wider text-slate-400">Amount ($) *</label><input required type="number" value={form.amount} onChange={e => setForm({...form, amount: Number(e.target.value)})} className="input-field" /></div>
              </div>
              <div><label className="text-xs uppercase tracking-wider text-slate-400">Due Date</label><input type="date" value={form.due_date} onChange={e => setForm({...form, due_date: e.target.value})} className="input-field" /></div>
              <button type="submit" className="btn-primary w-full py-2 text-sm"><Save className="h-4 w-4" /> Create Invoice</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}