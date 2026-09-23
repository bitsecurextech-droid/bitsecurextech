import { useEffect, useState } from 'react';
import {
  LayoutDashboard, Mail, FolderKanban, FileText, Star, Award, Users, BookOpen,
  ShieldAlert, FlaskConical, Settings, Activity, Image as ImageIcon, LogOut,
  AlertCircle, Loader2, Newspaper, MessageSquare, Ticket, Receipt, X, Menu,
  ShoppingBag, Tag, // ✅ ADDED Tag FOR OFFERS
} from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { supabase } from '../../lib/supabase';

// === IMPORTS FROM YOUR EXACT FILE NAMES ===
import { AdminOverview } from './AdminOverview';
import { AdminLeads } from './AdminLeads';
import { AdminProjects } from './AdminProjects';
import { AdminCaseStudies } from './AdminCaseStudies';
import { AdminBlog } from './AdminBlog';
import { AdminTestimonials } from './AdminTestimonials';
import { AdminReviews } from './AdminReviews';
import { AdminCerts } from './AdminCerts';
import { AdminTeam } from './AdminTeam';
import { AdminResources } from './AdminResources';
import { AdminSecurityCenter } from './AdminSecurityCenter';
import { AdminABTesting } from './AdminABTesting';
import { AdminSettings } from './AdminSettings';
import { AdminSiteContent } from './AdminSiteContent';
import { AdminSubscribers } from './AdminSubscribers';
import { AdminMedia } from './AdminMedia';
import { AdminAuditLogs } from './AdminAuditLogs';
import { AdminUserManagement } from './AdminUserManagement';
import { AdminAgents } from './AdminAgents';
import { AdminUserProjects } from './AdminUserProjects';
import { AdminUserFiles } from './AdminUserFiles';
import { AdminUserInvoices } from './AdminUserInvoices';
import { AdminShopify } from './AdminShopify';
import { AdminOffers } from './AdminOffers'; // ✅ ADDED OFFERS

type AdminTab =
  | 'overview' | 'leads' | 'projects' | 'caseStudies' | 'blog' | 'testimonials' | 'reviews'
  | 'certs' | 'team' | 'resources' | 'security' | 'abtesting' | 'settings'
  | 'siteContent' | 'subscribers' | 'media' | 'audit' | 'users'
  | 'userProjects' | 'userTickets' | 'userFiles' | 'userInvoices'
  | 'agents' | 'shopify' | 'offers'; // ✅ ADDED OFFERS TAB

export default function AdminPage() {
  const { session, loading, signOut } = useAuth();
  const [tab, setTab] = useState<AdminTab>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (loading) {
    return <div className="grid min-h-screen place-items-center pt-28"><Loader2 className="h-8 w-8 animate-spin text-cyber-400" /></div>;
  }

  if (!session) {
    return (
      <div className="pt-28">
        <div className="container-x">
          <div className="mx-auto max-w-md rounded-3xl glass-strong p-8 text-center">
            <AlertCircle className="mx-auto h-10 w-10 text-yellow-400" />
            <h1 className="mt-4 font-display text-xl font-bold text-white">Admin access required</h1>
            <p className="mt-2 text-sm text-slate-400">Sign in via the Client Portal with an admin account to access the dashboard.</p>
          </div>
        </div>
      </div>
    );
  }

  const groups = [
    { label: 'Dashboard', tabs: [
      { id: 'overview', label: 'Analytics', icon: LayoutDashboard },
      { id: 'leads', label: 'Leads (CRM)', icon: Mail },
    ]},
    { label: 'Content', tabs: [
      { id: 'projects', label: 'Portfolio Projects', icon: FolderKanban },
      { id: 'caseStudies', label: 'Case Studies', icon: FileText },
      { id: 'blog', label: 'Blog Posts', icon: Newspaper },
      { id: 'siteContent', label: 'Site Content Editor', icon: FileText },
      { id: 'resources', label: 'Resources', icon: BookOpen },
    ]},
    { label: 'Social Proof', tabs: [
      { id: 'testimonials', label: 'Testimonials', icon: Star },
      { id: 'reviews', label: 'Reviews', icon: MessageSquare },
      { id: 'certs', label: 'Certifications', icon: Award },
      { id: 'team', label: 'Team Members', icon: Users },
      { id: 'agents', label: 'Support Agents', icon: Users },
    ]},
    { label: 'Marketing', tabs: [
      { id: 'offers', label: 'Offers & Deals', icon: Tag }, // ✅ ADDED OFFERS HERE
      { id: 'subscribers', label: 'Subscribers', icon: Mail },
      { id: 'media', label: 'Media Library', icon: ImageIcon },
      { id: 'shopify', label: 'Shopify Manager', icon: ShoppingBag },
    ]},
    { label: 'System', tabs: [
      { id: 'security', label: 'Security Center', icon: ShieldAlert },
      { id: 'audit', label: 'Audit Logs', icon: Activity },
      { id: 'users', label: 'User Management', icon: Users },
      { id: 'abtesting', label: 'A/B Testing', icon: FlaskConical },
      { id: 'settings', label: 'Settings', icon: Settings },
      { id: 'userProjects', label: 'User Projects', icon: FolderKanban },
      { id: 'userTickets', label: 'User Tickets', icon: Ticket },
      { id: 'userFiles', label: 'User Files', icon: FileText },
      { id: 'userInvoices', label: 'User Invoices', icon: Receipt },
    ]},
  ];

  return (
    <div className="flex h-screen w-full bg-navy-950 text-slate-300 overflow-hidden relative">
      
      {/* Mobile Hamburger Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden rounded-lg bg-navy-900 p-2 text-white border border-white/10"
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* === SIDEBAR === */}
      <aside className={`fixed inset-y-0 left-0 z-40 h-full w-64 transform border-r border-white/5 bg-navy-900 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-full flex-col p-6">
          <div className="mb-8 flex items-center gap-3">
            <img src="/icon.webp" alt="BSX" className="h-10 w-10 rounded-lg" />
            <div>
              <h1 className="text-lg font-bold text-white">BITSECURE<span className="text-cyber-500">X</span></h1>
              <p className="text-[10px] text-slate-500">ADMIN CONSOLE</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto">
            {groups.map((g) => (
              <div key={g.label}>
                <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">{g.label}</p>
                <div className="space-y-0.5">
                  {g.tabs.map((t) => (
                    <button key={t.id} onClick={() => { setTab(t.id as AdminTab); setIsMobileMenuOpen(false); }}
                      className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${tab === t.id ? 'bg-cyber-500/20 text-cyber-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                      <t.icon className="h-5 w-5" /> {t.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="border-t border-white/10 pt-4 space-y-2">
            <button onClick={() => { window.location.href = '/portal'; }} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-cyber-400 transition-colors hover:bg-white/5">
              <LayoutDashboard className="h-5 w-5" /> Switch to User Portal
            </button>
            <button onClick={signOut} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10">
              <LogOut className="h-5 w-5" /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* === MAIN CONTENT === */}
      <main className="ml-0 flex-1 overflow-y-auto bg-navy-950 p-6 pt-16 lg:pt-6 lg:ml-64">
        <div className="max-w-5xl mx-auto">
          {tab === 'overview' && <AdminOverview />}
          {tab === 'leads' && <AdminLeads />}
          {tab === 'projects' && <AdminProjects />}
          {tab === 'caseStudies' && <AdminCaseStudies />}
          {tab === 'blog' && <AdminBlog />}
          {tab === 'testimonials' && <AdminTestimonials />}
          {tab === 'reviews' && <AdminReviews />}
          {tab === 'certs' && <AdminCerts />}
          {tab === 'team' && <AdminTeam />}
          {tab === 'resources' && <AdminResources />}
          {tab === 'security' && <AdminSecurityCenter />}
          {tab === 'abtesting' && <AdminABTesting />}
          {tab === 'settings' && <AdminSettings />}
          {tab === 'siteContent' && <AdminSiteContent />}
          {tab === 'subscribers' && <AdminSubscribers />}
          {tab === 'media' && <AdminMedia />}
          {tab === 'audit' && <AdminAuditLogs />}
          {tab === 'users' && <AdminUserManagement />}
          {tab === 'agents' && <AdminAgents />}
          {tab === 'shopify' && <AdminShopify />}
          {tab === 'offers' && <AdminOffers />} {/* ✅ OFFERS ROUTE */}
          
          {tab === 'userProjects' && <AdminUserProjects />}
          {tab === 'userTickets' && <div className="rounded-2xl glass p-8 text-center text-slate-400">User Support Tickets view will be added here.</div>}
          {tab === 'userFiles' && <AdminUserFiles />}
          {tab === 'userInvoices' && <AdminUserInvoices />}
        </div>
      </main>
    </div>
  );
}
