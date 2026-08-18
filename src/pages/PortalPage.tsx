import { useEffect, useState, useRef } from 'react';
import {
  LayoutDashboard, FolderKanban, Ticket, FileText, Receipt, ShieldCheck,
  Upload, LogOut, Plus, Mail, Lock, Loader2, Trash2, X, Check, ArrowRight,
  Clock, AlertCircle, CheckCircle2, Zap, TrendingUp, Calendar, Download,
  Eye, Menu, Star, Send, MessageCircle, Phone, Shield,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth';
import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { sendTelegram, formatLeadMessage } from '../lib/telegram';
import { AIChat } from '../components/AIChat';

type Tab = 'overview' | 'projects' | 'tickets' | 'invoices' | 'audits' | 'chat' | 'feedback';

export function PortalPage() {
  const { session, user, loading, signIn, signUp, signOut } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [roleLoading, setRoleLoading] = useState(true);

  // 🌟 Forgot Password & Resend Confirmation States
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResendConfirm, setShowResendConfirm] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resendEmail, setResendEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Fetch the user's role from Supabase
  useEffect(() => {
    if (!user) {
      setRoleLoading(false);
      return;
    }

    const fetchRole = async () => {
      const { data } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      setUserRole(data?.role || 'user');
      setRoleLoading(false);
    };
    fetchRole();
  }, [user]);

  // Forgot Password
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setBusy(true);
    setError(null);
    setSuccess(null);
    
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail.trim(), {
      redirectTo: window.location.origin + '/portal',
    });
    
    setBusy(false);
    if (error) setError(error.message);
    else {
      setSuccess('✅ Password reset link sent! Please check your email.');
      setForgotEmail('');
      setTimeout(() => setShowForgotPassword(false), 3000);
    }
  };

  // Resend Confirmation
  const handleResendConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resendEmail.trim()) return;
    setBusy(true);
    setError(null);
    setSuccess(null);
    
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: resendEmail.trim(),
      options: { emailRedirectTo: window.location.origin + '/portal' },
    });
    
    setBusy(false);
    if (error) setError(error.message);
    else {
      setSuccess('✅ Confirmation email resent! Please check your inbox.');
      setResendEmail('');
      setTimeout(() => setShowResendConfirm(false), 3000);
    }
  };

  if (loading || roleLoading) {
    return <div className="grid min-h-screen place-items-center bg-navy-950"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>;
  }

  // --- PREMIUM LOGIN / SIGNUP FORM ---
  if (!session) {
    const submit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setSuccess(null);
      setBusy(true);

      if (mode === 'signup') {
        const res = await signUp(email, password);
        setBusy(false);
        if (res.error) {
          setError(res.error);
        } else {
          setSuccess('✅ Account created! Please check your email to confirm your account.');
          setEmail('');
          setPassword('');
        }
        return;
      }

      // Sign in logic
      const res = await signIn(email, password);
      setBusy(false);
      if (res.error) setError(res.error);
    };

    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-950 p-4">
        <div className="w-full max-w-md rounded-3xl glass-strong p-8 shadow-2xl shadow-cyber-500/10">
          <div className="text-center">
            <img src="/icon.webp" alt="BitSecureX" className="mx-auto h-16 w-16 rounded-2xl ring-2 ring-cyber-500/50" />
            <h1 className="mt-4 font-display text-2xl font-bold text-white">
              {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              {mode === 'signin' ? 'Sign in to manage your projects.' : 'Get started with your client dashboard.'}
            </p>
          </div>

          {success && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-electric-500/20 p-3 text-sm text-electric-300 border border-electric-500/30">
              <CheckCircle2 className="h-4 w-4 shrink-0" /> {success}
            </div>
          )}

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" className="input-field pl-10" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="input-field pl-10" />
            </div>
            
            {error && (
              <p className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-sm text-red-400 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" /> {error}
              </p>
            )}

            {mode === 'signin' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-400">
                  <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 rounded border-white/20 bg-white/5 text-cyber-500 focus:ring-cyber-500" />
                  Remember me
                </label>
                <button type="button" onClick={() => setShowForgotPassword(true)} className="text-sm text-cyber-400 hover:text-cyber-300 transition-colors">Forgot password?</button>
              </div>
            )}

            <button type="submit" disabled={busy} className="btn-primary w-full py-3 disabled:opacity-60">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>

            <p className="text-center text-sm text-slate-400">
              {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
              <button type="button" onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(null); setSuccess(null); }} className="font-medium text-cyber-400 hover:text-white transition-colors">
                {mode === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </p>

            {mode === 'signup' && (
              <div className="flex justify-center mt-2">
                <button type="button" onClick={() => setShowResendConfirm(true)} className="text-xs text-electric-400 hover:text-electric-300 transition-colors">
                  Didn't receive confirmation email? Resend it
                </button>
              </div>
            )}
          </form>
        </div>

        {showForgotPassword && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setShowForgotPassword(false)}>
            <div className="w-full max-w-md rounded-2xl glass-strong p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-bold text-white">Reset Password</h2>
                <button onClick={() => setShowForgotPassword(false)} className="text-slate-400 hover:text-white"><X className="h-5 w-5" /></button>
              </div>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input type="email" required value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} placeholder="you@company.com" className="input-field pl-10" />
                </div>
                <button type="submit" disabled={busy} className="btn-primary w-full py-2.5">
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Send Reset Link
                </button>
              </form>
            </div>
          </div>
        )}

        {showResendConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setShowResendConfirm(false)}>
            <div className="w-full max-w-md rounded-2xl glass-strong p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-bold text-white">Resend Confirmation</h2>
                <button onClick={() => setShowResendConfirm(false)} className="text-slate-400 hover:text-white"><X className="h-5 w-5" /></button>
              </div>
              <form onSubmit={handleResendConfirm} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input type="email" required value={resendEmail} onChange={e => setResendEmail(e.target.value)} placeholder="you@company.com" className="input-field pl-10" />
                </div>
                <button type="submit" disabled={busy} className="btn-primary w-full py-2.5">
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Resend Email
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- DASHBOARD ---
  const isAdmin = userRole === 'admin';

  return (
    <div className="min-h-screen bg-navy-950 relative">
      <Dashboard user={user!} onSignOut={signOut} isAdmin={isAdmin} />
      <AIChat />
    </div>
  );
}

// ============================================================
// MAIN DASHBOARD LAYOUT 
// ============================================================
function Dashboard({ user, onSignOut, isAdmin }: { user: { email?: string | null }; onSignOut: () => void; isAdmin: boolean }) {
  const [tab, setTab] = useState<Tab>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [agents, setAgents] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('admin_agents').select('*').eq('is_active', true).then(({ data }) => setAgents(data || []));
  }, []);

  const getTitle = () => {
    const map = { overview: 'Overview', projects: 'Projects', tickets: 'Support', invoices: 'Invoices', audits: 'Security Audits', chat: 'Chat & Agents', feedback: 'Feedback' };
    return map[tab];
  };

  return (
    <div className="flex h-screen w-full overflow-hidden text-slate-300">
      {/* Mobile Hamburger & Top Bar */}
      <div className="fixed top-0 left-0 z-40 flex w-full items-center justify-between border-b border-white/5 bg-navy-950/90 p-4 backdrop-blur lg:hidden">
        <button onClick={() => setIsSidebarOpen(true)} className="rounded-lg p-2 text-white hover:bg-white/10"><Menu className="h-6 w-6" /></button>
        <h2 className="font-display text-lg font-bold text-white">{getTitle()}</h2>
        <div className="w-10" /> 
      </div>

      {isSidebarOpen && <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setIsSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-navy-900 shadow-2xl transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-full flex-col border-r border-white/5">
          <div className="flex items-center justify-between border-b border-white/10 p-6">
            <div className="flex items-center gap-3">
              <img src="/icon.webp" alt="BSX" className="h-10 w-10 rounded-lg" />
              <div><p className="font-display text-lg font-bold text-white">BSX</p><p className="text-[10px] text-slate-500">CLIENT DASHBOARD</p></div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white"><X className="h-6 w-6" /></button>
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'projects', label: 'Projects', icon: FolderKanban },
              { id: 'tickets', label: 'Support', icon: Ticket },
              // 🚫 "Files" tab removed because Supabase upload is pending fix
              { id: 'chat', label: 'Chat & Agents', icon: MessageCircle },
              { id: 'feedback', label: 'Feedback', icon: Star },
              { id: 'invoices', label: 'Invoices', icon: Receipt },
              { id: 'audits', label: 'Security Audits', icon: ShieldCheck },
            ].map((item) => (
              <button key={item.id} onClick={() => { setTab(item.id as Tab); setIsSidebarOpen(false); }} className={`flex w-full items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${tab === item.id ? 'bg-cyber-500/20 text-cyber-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                <item.icon className={`h-5 w-5 ${tab === item.id ? 'text-cyber-400' : ''}`} /> {item.label}
              </button>
            ))}

            {/* ✅ SWITCH TO ADMIN - Only shows if user is Admin */}
            {isAdmin && (
              <div className="pt-4 mt-4 border-t border-white/10">
                <button
                  onClick={() => { window.location.href = '/admin'; }}
                  className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium text-cyber-400 transition-colors hover:bg-white/5"
                >
                  <Shield className="h-5 w-5" /> Switch to Admin
                </button>
              </div>
            )}
          </nav>
          <div className="border-t border-white/10 p-4">
            <button onClick={onSignOut} className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"><LogOut className="h-5 w-5" /> Sign Out</button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pt-16 lg:pt-6">
        <div className="p-6 lg:p-10 max-w-6xl mx-auto">
          {tab === 'overview' && <Overview />}
          {tab === 'projects' && <Projects />}
          {tab === 'tickets' && <Tickets />}
          {tab === 'invoices' && <Invoices />}
          {tab === 'audits' && <Audits />}
          {tab === 'chat' && <ChatAgents agents={agents} />}
          {tab === 'feedback' && <Feedback user={user} />}
        </div>
      </main>
    </div>
  );
}

// ============================================================
// TAB 1: OVERVIEW
// ============================================================
function Overview() {
  const [counts, setCounts] = useState({ projects: 0, tickets: 0, invoices: 0 });
  useEffect(() => {
    Promise.all([
      supabase.from('portal_projects').select('id', { count: 'exact', head: true }),
      supabase.from('portal_tickets').select('id', { count: 'exact', head: true }),
      supabase.from('portal_invoices').select('id', { count: 'exact', head: true }),
    ]).then(([p, t, i]) => setCounts({ projects: p.count ?? 0, tickets: t.count ?? 0, invoices: i.count ?? 0 }));
  }, []);
  return (
    <div className="space-y-6">
      <div className="border-b border-white/5 pb-4"><h2 className="text-2xl font-bold text-white">Overview</h2></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: 'Projects', value: counts.projects, icon: FolderKanban, color: 'text-cyber-400' },
          { label: 'Tickets', value: counts.tickets, icon: Ticket, color: 'text-yellow-400' },
          { label: 'Invoices', value: counts.invoices, icon: Receipt, color: 'text-electric-400' },
        ].map((c) => (
          <div key={c.label} className="rounded-xl bg-navy-800/50 p-5 border border-white/5">
            <c.icon className={`h-6 w-6 ${c.color}`} />
            <p className="mt-2 text-2xl font-bold text-white">{c.value}</p>
            <p className="text-xs text-slate-400">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// TAB 2: PROJECTS
// ============================================================
function Projects() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('portal_projects').select('*').order('created_at', { ascending: false });
    setItems(data ?? []); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await supabase.from('portal_projects').insert({ title, description: desc });
    setTitle(''); setDesc(''); setShow(false); load();
  };

  const remove = async (id: string) => {
    await supabase.from('portal_projects').delete().eq('id', id);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h2 className="text-2xl font-bold text-white">Projects</h2>
        <button onClick={() => setShow(!show)} className="btn-primary text-sm px-4 py-2"><Plus className="h-4 w-4" /> New</button>
      </div>

      {show && (
        <form onSubmit={add} className="rounded-xl border border-cyber-500/30 bg-navy-800/50 p-4 space-y-3">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Project Title" className="input-field" />
          <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" rows={3} className="input-field" />
          <button type="submit" className="btn-primary text-sm px-4 py-2"><Check className="h-4 w-4" /> Create</button>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-10 text-slate-400">No projects yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-xl bg-navy-800/50 p-4 border border-white/5">
              <h3 className="font-medium text-white">{p.title}</h3>
              <button onClick={() => remove(p.id)} className="p-1 text-slate-400 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// TAB 3: TICKETS
// ============================================================
function Tickets() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [subject, setSubject] = useState('');
  const [msg, setMsg] = useState('');

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('portal_tickets').select('*').order('created_at', { ascending: false });
    setItems(data ?? []); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;
    await supabase.from('portal_tickets').insert({ subject, message: msg, priority: 'Normal' });
    setSubject(''); setMsg(''); setShow(false); load();
  };

  const remove = async (id: string) => {
    await supabase.from('portal_tickets').delete().eq('id', id);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h2 className="text-2xl font-bold text-white">Support</h2>
        <button onClick={() => setShow(!show)} className="btn-primary text-sm px-4 py-2"><Plus className="h-4 w-4" /> New</button>
      </div>

      {show && (
        <form onSubmit={add} className="rounded-xl border border-cyber-500/30 bg-navy-800/50 p-4 space-y-3">
          <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" className="input-field" />
          <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="Message" rows={4} className="input-field" />
          <button type="submit" className="btn-primary text-sm px-4 py-2">Submit</button>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-10 text-slate-400">No tickets.</div>
      ) : (
        <div className="space-y-3">
          {items.map((t) => (
            <div key={t.id} className="rounded-xl bg-navy-800/50 p-4 border border-white/5">
              <div className="flex justify-between">
                <h3 className="font-medium text-white">{t.subject}</h3>
                <button onClick={() => remove(t.id)} className="p-1 text-slate-400 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
              </div>
              <p className="mt-2 text-sm text-slate-400">{t.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// TAB 4: INVOICES
// ============================================================
function Invoices() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('portal_invoices').select('*').order('created_at', { ascending: false }).then(({ data }) => { setItems(data ?? []); setLoading(false); });
  }, []);

  return (
    <div className="space-y-6">
      <div className="border-b border-white/5 pb-4"><h2 className="text-2xl font-bold text-white">Invoices</h2></div>
      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-10 text-slate-400">No invoices.</div>
      ) : (
        <div className="space-y-3">
          {items.map((i) => (
            <div key={i.id} className="flex items-center justify-between rounded-xl bg-navy-800/50 p-4 border border-white/5">
              <p className="font-medium text-white">{i.number}</p>
              <span className="text-lg font-bold text-white">${Number(i.amount).toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// TAB 5: AUDITS
// ============================================================
function Audits() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [company, setCompany] = useState('');
  const [scope, setScope] = useState('');

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('portal_audit_requests').select('*').order('created_at', { ascending: false });
    setItems(data ?? []); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim()) return;
    await supabase.from('portal_audit_requests').insert({ company, scope });
    setCompany(''); setScope(''); setShow(false); load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h2 className="text-2xl font-bold text-white">Audits</h2>
        <button onClick={() => setShow(!show)} className="btn-primary text-sm px-4 py-2"><ShieldCheck className="h-4 w-4" /> Request</button>
      </div>
      {show && (
        <form onSubmit={add} className="rounded-xl border border-cyber-500/30 bg-navy-800/50 p-4 space-y-3">
          <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Company" className="input-field" />
          <input value={scope} onChange={e => setScope(e.target.value)} placeholder="Scope" className="input-field" />
          <button type="submit" className="btn-primary text-sm px-4 py-2">Submit</button>
        </form>
      )}
      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-10 text-slate-400">No audits.</div>
      ) : (
        <div className="space-y-3">
          {items.map((a) => (
            <div key={a.id} className="rounded-xl bg-navy-800/50 p-4 border border-white/5">
              <h3 className="font-medium text-white">{a.company}</h3>
              <p className="text-sm text-slate-400">{a.scope}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// TAB 6: CHAT AGENTS
// ============================================================
function ChatAgents({ agents }: { agents: any[] }) {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/5 pb-4"><h2 className="text-2xl font-bold text-white">Chat & Agents</h2></div>
      {agents.length === 0 ? (
        <div className="text-center py-10 text-slate-400 border border-dashed border-white/10 rounded-xl">No agents available.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {agents.map((a) => (
            <div key={a.id} className="rounded-xl bg-navy-800/50 p-6 border border-white/5 text-center">
              <div className="mb-3 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-cyber-500 to-electric-500 text-xl font-bold text-white mx-auto overflow-hidden">
                {a.avatar_url ? <img src={a.avatar_url} className="h-full w-full object-cover" /> : a.name[0]}
              </div>
              <h3 className="font-semibold text-white">{a.name}</h3>
              <p className="text-sm text-slate-400">{a.role}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {a.whatsapp && (
                  <a href={`https://wa.me/${a.whatsapp.replace(/\D/g, '')}`} target="_blank" className="btn-primary text-sm py-2 px-4 flex-1">
                    <Phone className="inline h-4 w-4 mr-2" /> WhatsApp
                  </a>
                )}
                {a.telegram && (
                  <a href={`https://t.me/${a.telegram.replace('@', '')}`} target="_blank" className="btn-ghost text-sm py-2 px-4 flex-1">
                    <MessageCircle className="inline h-4 w-4 mr-2" /> Telegram
                  </a>
                )}
                {a.email && (
                  <a href={`mailto:${a.email}`} className="btn-ghost text-sm py-2 px-4 flex-1">
                    <Mail className="inline h-4 w-4 mr-2" /> Email
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// TAB 7: FEEDBACK
// ============================================================
function Feedback({ user }: { user: any }) {
  const [msg, setMsg] = useState(''); const [submitting, setSubmitting] = useState(false); const [done, setDone] = useState(false);
  const submit = async (e: React.FormEvent) => { e.preventDefault(); if (!msg.trim()) return; setSubmitting(true); await sendTelegram(formatLeadMessage('Client Feedback', { 'From': user.email, 'Message': msg })); setSubmitting(false); setDone(true); setTimeout(() => setDone(false), 4000); };
  return (
    <div className="space-y-6">
      <div className="border-b border-white/5 pb-4"><h2 className="text-2xl font-bold text-white">Feedback</h2></div>
      <form onSubmit={submit} className="rounded-xl border border-white/5 bg-navy-800/50 p-6 space-y-4">
        <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="Write your feedback..." rows={5} className="input-field" required />
        <button type="submit" disabled={submitting || done} className="btn-primary w-full py-3">
          {done ? <Check className="h-4 w-4" /> : submitting ? <Loader2 className="animate-spin" /> : <><Send className="h-4 w-4" /> Send</>}
        </button>
      </form>
    </div>
  );
}
