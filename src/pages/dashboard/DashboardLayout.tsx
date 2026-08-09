import { useState } from 'react';
import { Menu, X, LayoutDashboard, FolderKanban, Ticket, FileText, MessageCircle, Star, Receipt, ShieldCheck, LogOut } from 'lucide-react';
import { useNavigate } from '../../lib/router';

type Tab = 'overview' | 'projects' | 'tickets' | 'files' | 'chat' | 'feedback' | 'invoices' | 'audits';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onSignOut: () => void;
  userEmail?: string | null;
}

export function DashboardLayout({ children, activeTab, onTabChange, onSignOut, userEmail }: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const nav = useNavigate();

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'tickets', label: 'Support', icon: Ticket },
    { id: 'files', label: 'Files', icon: FileText },
    { id: 'chat', label: 'Chat & Agents', icon: MessageCircle },
    { id: 'feedback', label: 'Feedback', icon: Star },
    { id: 'invoices', label: 'Invoices', icon: Receipt },
    { id: 'audits', label: 'Security Audits', icon: ShieldCheck },
  ];

  return (
    <div className="flex h-screen w-full bg-navy-950 overflow-hidden text-slate-300">
      {/* Mobile Hamburger */}
      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
        className="fixed left-4 top-4 z-50 rounded-lg bg-navy-800 p-2 text-white shadow-lg lg:hidden"
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar Overlay (Mobile) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-navy-900 shadow-xl transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-full flex-col border-r border-white/5">
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <img src="/icon.png" alt="BSX" className="h-10 w-10 rounded-lg object-cover" />
              <div>
                <p className="font-display text-lg font-bold text-white">BitSecure<span className="text-cyber-500">X</span></p>
                <p className="text-[10px] text-slate-500">CLIENT DASHBOARD</p>
              </div>
            </div>
            <p className="mt-3 truncate text-xs text-slate-400">{userEmail}</p>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onTabChange(item.id as Tab); setMobileMenuOpen(false); }}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-cyber-500/20 text-cyber-400'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className={`h-5 w-5 ${activeTab === item.id ? 'text-cyber-400' : 'text-slate-500'}`} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="border-t border-white/5 p-4">
            <button onClick={onSignOut} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400">
              <LogOut className="h-5 w-5" /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-navy-950 p-6 lg:p-10 w-full">
        <div className="mx-auto max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
}
export function DashboardLayout;