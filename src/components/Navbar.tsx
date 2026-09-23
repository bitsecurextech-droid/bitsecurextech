import { useEffect, useState } from 'react';
import { useRoute, useNavigate } from '../lib/router';
import { useTheme } from '../lib/useReveal';
import { useAuth } from '../lib/auth';
import {
  import {
  Menu, X, Sun, Moon, ChevronDown, LogIn, Calculator,
  Home, Code2, Globe, Layers, Bot, Cloud, Smartphone, Megaphone,
  Search, Share2, FileText, Shield, Target, ShoppingBag,
  Store, Tags, Rocket,
  Users, UserCheck, Briefcase, Handshake, Lightbulb, Newspaper,
  Wrench, ShieldAlert, Gauge, Tag, Mail, type LucideIcon,
} from 'lucide-react';

// ============================================================
// 1. TYPES
// ============================================================
interface NavLink {
  label: string;
  path: string;
  icon: LucideIcon;
}

interface DropdownLink extends NavLink {
  sub?: NavLink[];
}

// ============================================================
// 2. NAVIGATION DATA
// ============================================================
const navLinks: DropdownLink[] = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Technology', path: '/web-development', icon: Code2, sub: [
  { label: 'Web Development', path: '/web-development', icon: Globe },
  { label: 'Software Solutions', path: '/software-solutions', icon: Layers },
  { label: 'AI & Automation', path: '/ai-automation', icon: Bot },
  { label: 'GoHighLevel (GHL)', path: '/gohighlevel', icon: Rocket },
  { label: 'Cloud Solutions', path: '/cloud-solutions', icon: Cloud },
  { label: 'Mobile App Dev', path: '/mobile-app-development', icon: Smartphone },
]},
  { label: 'Marketing', path: '/digital-marketing', icon: Megaphone, sub: [
    { label: 'Digital Marketing', path: '/digital-marketing', icon: Megaphone },
    { label: 'SEO & Organic Traffic', path: '/seo', icon: Search },
    { label: 'Social Media Marketing', path: '/social-media-marketing', icon: Share2 },
    { label: 'Content Marketing', path: '/content-marketing', icon: FileText },
  ]},
  { label: 'Security', path: '/cybersecurity', icon: Shield, sub: [
    { label: 'Cybersecurity', path: '/cybersecurity', icon: Shield },
    { label: 'Penetration Testing', path: '/penetration-testing', icon: Target },
  ]},
  { label: 'Commerce', path: '/commerce', icon: ShoppingBag, sub: [
    { label: 'Ecommerce Development', path: '/ecommerce-development', icon: ShoppingBag },
    { label: 'Shopify Stores', path: '/shopify-stores', icon: Store },
    { label: 'Marketplace', path: '/marketplace', icon: Tags },
  ]},
  { label: 'Ecosystem', path: '/ecosystem', icon: Layers },
  { label: 'About', path: '/about', icon: Users, sub: [
    { label: 'Our Story', path: '/about', icon: Users },
    { label: 'Leadership Team', path: '/about', icon: UserCheck },
    { label: 'Careers', path: '/careers', icon: Briefcase },
    { label: 'Partners', path: '/partners', icon: Handshake },
  ]},
  { label: 'Insights', path: '/blog', icon: Lightbulb, sub: [
    { label: 'Case Studies', path: '/case-studies', icon: FileText },
    { label: 'Blog', path: '/blog', icon: Newspaper },
    { label: 'Reports & Whitepapers', path: '/reports', icon: FileText },
  ]},
  { label: 'Tools', path: '/tools', icon: Wrench, sub: [
    { label: 'Cost Calculator', path: '/calculator', icon: Calculator },
    { label: 'Free SEO Audit', path: '/tools', icon: Search },
    { label: 'Security Risk Assessment', path: '/tools', icon: ShieldAlert },
    { label: 'Website Speed Test', path: '/tools', icon: Gauge },
  ]},
  { label: 'Offers', path: '/offers', icon: Tag },
  { label: 'Contact', path: '/contact', icon: Mail },
];

// ============================================================
// 3. COMPONENT
// ============================================================
export default function Navbar() {
  const route = useRoute();
  const nav = useNavigate();
  const { theme, toggle } = useTheme();
  const { session } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const isLight = theme === 'light';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDropdown(null);
  }, [route.path]);

  const isActive = (path: string) => {
    if (path === '/') return route.path === '/';
    return route.path.startsWith(path);
  };

  return (
    <>
      {route.path === '/admin' || route.path === '/portal' ? null : (
        <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? isLight
              ? 'bg-white shadow-sm border-b border-slate-100'
              : 'bg-navy-950/95 backdrop-blur-xl shadow-lg shadow-black/30 border-b border-white/10'
            : isLight
            ? 'bg-white/90 backdrop-blur-sm'
            : 'bg-transparent'
        }`}>
          <div className="container-x flex items-center justify-between px-4 py-3 sm:px-6 lg:px-12">
            
            {/* Logo */}
            <button 
              onClick={() => nav('/')} 
              className="flex items-center gap-2.5 group shrink-0"
              aria-label="Go to homepage"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-black ring-1 ring-cyber-500/30 transition-transform group-hover:scale-105">
                <img src="/icon.webp" alt="BSX" className="h-7 w-7 rounded-md object-cover" />
              </span>
              <span className={`font-display text-xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <span className="hidden sm:inline">BITSECURE</span>
                <span className="sm:hidden">BS</span>
                <span className="text-cyber-500">X</span>
                <span className={`block text-[10px] font-medium tracking-widest ${isLight ? 'text-slate-500' : 'text-slate-400'}`} style={{ marginTop: '-4px' }}>TECH</span>
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 xl:flex">
              {navLinks.map((l) => {
                const hasSub = l.sub && l.sub.length > 0;
                const isDropdownOpen = dropdown === l.label;
                return (
                  <div key={l.path} className="relative">
                    <button
                      onClick={() => {
                        if (hasSub && !isDropdownOpen) setDropdown(l.label);
                        else if (!hasSub) nav(l.path);
                      }}
                      onMouseEnter={() => hasSub && setDropdown(l.label)}
                      onMouseLeave={() => setDropdown(null)}
                      className={`flex items-center gap-0.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive(l.path) ? (isLight ? 'text-slate-900' : 'text-white') : (isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 hover:text-white')}`}
                    >
                      {l.label}
                      {hasSub && <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />}
                    </button>

                    {hasSub && isDropdownOpen && (
                      <div 
                        className={`absolute left-0 top-full mt-1 w-64 max-h-[70vh] overflow-y-auto rounded-xl border p-2 shadow-xl z-10 ${isLight ? 'bg-white border-slate-100' : 'bg-navy-900 border-white/10'}`}
                        onMouseEnter={() => setDropdown(l.label)}
                        onMouseLeave={() => setDropdown(null)}
                      >
                        {l.sub!.map((subItem) => (
                          <button
                            key={subItem.path}
                            onClick={() => {
                              nav(subItem.path);
                              setDropdown(null);
                            }}
                            className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm transition-colors ${isActive(subItem.path) ? 'bg-cyber-500/10 text-cyber-500' : isLight ? 'text-slate-600 hover:bg-cyber-50 hover:text-cyber-600' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                          >
                            <subItem.icon className="h-4 w-4 text-cyber-400" /> {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button 
                onClick={() => nav('/calculator')} 
                className={`hidden lg:inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isLight ? 'text-cyber-600 hover:bg-cyber-50' : 'text-cyber-400 hover:bg-cyber-500/10'}`}
                aria-label="Web Cost Calculator"
              >
                <Calculator className="h-4 w-4" /> Web Cost Calculator
              </button>
              <button 
                onClick={toggle} 
                className={`grid h-9 w-9 place-items-center rounded-lg border transition-colors ${isLight ? 'border-slate-200 text-slate-600 hover:border-cyber-500 hover:text-cyber-500' : 'border-white/10 text-slate-400 hover:border-cyber-400/50 hover:text-white'}`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              <button 
                onClick={() => nav('/portal')} 
                className={`flex items-center gap-1 rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors sm:hidden ${isLight ? 'border-slate-200 text-slate-700 hover:border-cyber-500' : 'border-white/10 text-slate-300 hover:border-cyber-400/50'}`}
                aria-label="Sign in"
              >
                <LogIn className="h-3.5 w-3.5" /> Sign In
              </button>

              <button 
                onClick={() => nav('/portal')} 
                className={`hidden sm:inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${isLight ? 'border-slate-200 text-slate-700 hover:border-cyber-500 hover:text-cyber-500' : 'border-white/15 text-slate-300 hover:border-cyber-400/50 hover:text-white'}`}
                aria-label="Sign in"
              >
                <LogIn className="h-4 w-4" /> Sign In
              </button>

              <button 
                onClick={() => nav('/contact')} 
                className="hidden lg:inline-flex btn-primary text-sm"
                aria-label="Get a quote"
              >
                Get a Quote →
              </button>
              <button 
                className={`grid h-9 w-9 place-items-center rounded-lg border transition-colors xl:hidden ${isLight ? 'border-slate-200 text-slate-700' : 'border-white/10 text-white'}`} 
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? 'Close menu' : 'Open menu'}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {open && (
            <div className={`border-t xl:hidden ${isLight ? 'bg-white border-slate-100' : 'bg-navy-950/95 backdrop-blur-xl border-white/10'}`}>
              <div className="flex flex-col gap-1 px-5 py-4 max-h-[70vh] overflow-y-auto">
                {navLinks.map((l) => {
                  const hasSub = l.sub && l.sub.length > 0;
                  return (
                    <div key={l.path} className="space-y-1">
                      <button 
                        onClick={() => { if (!hasSub) { nav(l.path); setOpen(false); } }} 
                        className={`flex items-center justify-between w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${isActive(l.path) ? 'bg-cyber-500/15 text-cyber-400' : isLight ? 'text-slate-700 hover:bg-slate-50' : 'text-slate-300 hover:bg-white/5'}`}
                      >
                        <span className="flex items-center gap-3">
                          <l.icon className={`h-4 w-4 shrink-0 ${isActive(l.path) ? 'text-cyber-400' : 'text-slate-400'}`} /> {l.label}
                        </span>
                        {hasSub && <ChevronDown className="h-4 w-4 opacity-60" />}
                      </button>
                      {hasSub && (
                        <div className="ml-4 space-y-1 border-l-2 border-cyber-500/30 pl-3">
                          {l.sub!.map((subItem) => (
                            <button 
                              key={subItem.path} 
                              onClick={() => { nav(subItem.path); setOpen(false); }} 
                              className={`flex items-center gap-3 w-full rounded-lg px-4 py-2 text-left text-sm transition-colors ${isActive(subItem.path) ? 'bg-cyber-500/10 text-cyber-500' : isLight ? 'text-slate-600 hover:bg-cyber-50 hover:text-cyber-600' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                            >
                              <subItem.icon className="h-4 w-4 shrink-0 text-cyber-400" /> {subItem.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {/* Calculator inside Mobile Menu */}
                <button 
                  onClick={() => { nav('/calculator'); setOpen(false); }} 
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium ${isLight ? 'text-cyber-600 hover:bg-cyber-50' : 'text-cyber-400 hover:bg-cyber-500/10'}`}
                >
                  <Calculator className="h-4 w-4 shrink-0" /> Web Cost Calculator
                </button>

                {/* Sign In / Create Account at bottom */}
                <div className="mt-3 border-t pt-3" style={{ borderColor: isLight ? '#e2e8f0' : 'rgba(255,255,255,0.1)' }}>
                  <button 
                    onClick={() => { nav('/portal'); setOpen(false); }} 
                    className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isLight ? 'bg-cyber-500 text-white hover:bg-cyber-600' : 'bg-cyber-500 text-white hover:bg-cyber-600'}`}
                    aria-label="Sign in or create account"
                  >
                    <LogIn className="h-4 w-4" /> Sign In / Create Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </header>
      )}
    </>
  );
}
