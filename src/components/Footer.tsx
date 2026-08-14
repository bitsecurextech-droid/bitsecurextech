import { useState } from 'react';
import { Mail, MapPin, Phone, ArrowUpRight, Share2, Send, ShieldCheck, Zap, Globe, CheckCircle2, Briefcase, Users, BookOpen, Shield, Lock, Award, Clock, TrendingUp, Instagram, Facebook, Twitter } from 'lucide-react';
import { useNavigate } from '../lib/router';
import { supabase } from '../lib/supabase';

const footerColumns = [
  {
    title: 'Services',
    icon: Briefcase,
    links: [
      { label: 'Web Development', path: '/web-development' },
      { label: 'Software Solutions', path: '/software-solutions' },
      { label: 'AI & Automation', path: '/ai-automation' },
      { label: 'Cloud Solutions', path: '/cloud-solutions' },
      { label: 'Cybersecurity', path: '/cybersecurity' },
      { label: 'Penetration Testing', path: '/penetration-testing' },
    ],
  },
  {
    title: 'Company',
    icon: Users,
    links: [
      { label: 'About Us', path: '/about' },
      { label: 'Portfolio', path: '/portfolio' },
      { label: 'Case Studies', path: '/case-studies' },
      { label: 'Careers', path: '/careers' },
      { label: 'Partners', path: '/partners' },
      { label: 'Contact', path: '/contact' },
    ],
  },
  {
    title: 'Resources',
    icon: BookOpen,
    links: [
      { label: 'Blog', path: '/blog' },
      { label: 'Reports & Whitepapers', path: '/reports' },
      { label: 'Reviews', path: '/reviews' },
      { label: 'Cost Calculator', path: '/calculator' },
      { label: 'Free SEO Audit', path: '/tools' },
      { label: 'Risk Assessment', path: '/tools' },
    ],
  },
  {
    title: 'Security',
    icon: Shield,
    links: [
      { label: 'Vulnerability Disclosure', path: '/disclosure' },
      { label: 'Bug Bounty', path: '/bug-bounty' },
      { label: 'Security Badges', path: '/cybersecurity' },
      { label: 'Security Headers', path: '/cybersecurity' },
      { label: 'Client Portal', path: '/portal' },
      { label: 'Admin Dashboard', path: '/admin' },
    ],
  },
];

const trustBadges = [
  { icon: ShieldCheck, label: 'Security-First' },
  { icon: Zap, label: 'Rapid Delivery' },
  { icon: Globe, label: 'Global Remote Team' },
  { icon: Clock, label: '24/7 Support' },
];

export default function Footer() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  const share = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'BitSecureX Tech',
          text: 'We Build. We Automate. We Secure.',
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
    }
  };

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || subscribing) return;
    
    setSubscribing(true);
    
    try {
      const { error } = await supabase
        .from('email_subscribers')
        .insert({ 
          email: email.trim(),
          status: 'active',
          subscribed_at: new Date().toISOString()
        });

      if (error) {
        console.error('Subscription error:', error);
        setSubscribed(true);
        setTimeout(() => setSubscribed(false), 4000);
        setSubscribing(false);
        return;
      }

      const { sendTelegram, formatLeadMessage } = await import('../lib/telegram');
      
      const message = formatLeadMessage('Newsletter Subscription', {
        Email: email.trim(),
        Date: new Date().toLocaleString(),
        Source: 'Footer'
      });
      await sendTelegram(message);

      setSubscribed(true);
      setEmail('');
    } catch (err) {
      console.error('Subscription error:', err);
    } finally {
      setSubscribing(false);
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-sm dark:border-white/10 dark:bg-navy-950/95">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-500/60 to-transparent" />

      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-cyber-500/10 blur-[100px] dark:bg-cyber-500/5" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-electric-500/8 blur-[80px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-cyber-500/5 blur-[80px]" />

      <div className="container-x relative px-5 py-16 sm:px-8 lg:px-12">
        {/* TOP SECTION: Brand + CTA + Newsletter */}
        <div className="mb-14 grid gap-8 rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm dark:border-white/10 dark:from-navy-800/50 dark:to-navy-900/50 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-900 ring-1 ring-cyber-500/30">
                <img src="/icon.png" alt="BitSecureX" className="h-7 w-7 rounded-md object-cover" />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  BitSecure<span className="text-cyber-500">X</span> Tech
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Global Digital Growth Agency</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              We build, market, automate, and secure digital solutions for businesses worldwide.
              From web development to cybersecurity, we deliver enterprise-grade excellence.
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              {trustBadges.map((b) => (
                <div key={b.label} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <b.icon className="h-4 w-4 text-cyber-500" />
                  {b.label}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
              Subscribe to our <span className="gradient-text">Newsletter</span>
            </h4>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Get security insights, tech updates, and exclusive offers.
            </p>
            <form onSubmit={subscribe} className="mt-4 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  id="footer-email"
                  name="footer-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-cyber-500 focus:ring-2 focus:ring-cyber-500/20 dark:border-white/10 dark:bg-navy-800 dark:text-white dark:placeholder-slate-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={subscribing}
                className="btn-primary whitespace-nowrap dark:bg-cyber-600 dark:hover:bg-cyber-700 disabled:opacity-50"
              >
                {subscribing ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : 
                 subscribed ? <CheckCircle2 className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                {subscribing ? 'Subscribing...' : subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
            {subscribed && (
              <p className="mt-2 text-xs text-electric-500 dark:text-electric-400">
                ✅ Thank you for subscribing!
              </p>
            )}
          </div>
        </div>

        {/* FOOTER COLUMNS */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((col) => {
            const Icon = col.icon;
            return (
              <div key={col.title}>
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 text-cyber-500" />
                  <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
                    {col.title}
                  </h4>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => nav(link.path)}
                        className="group flex items-center gap-1 text-sm text-slate-500 transition-colors hover:text-cyber-600 dark:text-slate-400 dark:hover:text-cyber-400"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* BOTTOM SECTION: Social + Legal + Stats */}
        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-slate-200/80 pt-8 dark:border-white/10 sm:flex-row">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
            <p className="text-xs text-slate-400 dark:text-slate-500">
              © {new Date().getFullYear()} BitSecureX Tech. All rights reserved.
            </p>
            <span className="hidden h-4 w-px bg-slate-300 dark:bg-slate-700 sm:block" />
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Built with ❤️ for security & innovation
            </p>
          </div>

          {/* SOCIAL LINKS – Using Lucide Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/bitsecurextech"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200/80 text-slate-500 transition-all hover:border-cyber-500/50 hover:bg-cyber-50 hover:text-cyber-600 dark:border-white/10 dark:text-slate-400 dark:hover:border-cyber-400/50 dark:hover:bg-cyber-500/10 dark:hover:text-cyber-400"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>

            <a
              href="https://www.facebook.com/bitsecurextech"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200/80 text-slate-500 transition-all hover:border-cyber-500/50 hover:bg-cyber-50 hover:text-cyber-600 dark:border-white/10 dark:text-slate-400 dark:hover:border-cyber-400/50 dark:hover:bg-cyber-500/10 dark:hover:text-cyber-400"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>

            <a
              href="https://www.tiktok.com/@bitsecurex.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200/80 text-slate-500 transition-all hover:border-cyber-500/50 hover:bg-cyber-50 hover:text-cyber-600 dark:border-white/10 dark:text-slate-400 dark:hover:border-cyber-400/50 dark:hover:bg-cyber-500/10 dark:hover:text-cyber-400"
              aria-label="TikTok"
            >
              <span className="text-lg font-bold">♬</span>
            </a>

            <a
              href="https://x.com/BitSecureXTech"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200/80 text-slate-500 transition-all hover:border-cyber-500/50 hover:bg-cyber-50 hover:text-cyber-600 dark:border-white/10 dark:text-slate-400 dark:hover:border-cyber-400/50 dark:hover:bg-cyber-500/10 dark:hover:text-cyber-400"
              aria-label="X (Twitter)"
            >
              <Twitter className="h-5 w-5" />
            </a>

            <button
              onClick={share}
              className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200/80 text-slate-500 transition-all hover:border-cyber-500/50 hover:bg-cyber-50 hover:text-cyber-600 dark:border-white/10 dark:text-slate-400 dark:hover:border-cyber-400/50 dark:hover:bg-cyber-500/10 dark:hover:text-cyber-400"
              aria-label="Share"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 dark:text-slate-500">
            <a
              href="mailto:contact.bitsecurex@gmail.com"
              className="flex items-center gap-1.5 transition-colors hover:text-cyber-600 dark:hover:text-cyber-400"
            >
              <Mail className="h-3.5 w-3.5" /> contact.bitsecurex@gmail.com
            </a>
            <a
              href="tel:+2349011407095"
              className="flex items-center gap-1.5 transition-colors hover:text-cyber-600 dark:hover:text-cyber-400"
            >
              <Phone className="h-3.5 w-3.5" /> +234 901 140 7095
            </a>
          </div>
        </div>

        {/* Security trust bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 border-t border-slate-200/80 pt-6 dark:border-white/5">
          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
            <Shield className="h-3.5 w-3.5 text-cyber-500" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
            <Lock className="h-3.5 w-3.5 text-cyber-500" />
            <span>Data Protected</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
            <Award className="h-3.5 w-3.5 text-cyber-500" />
            <span>CEH Certified</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
            <TrendingUp className="h-3.5 w-3.5 text-cyber-500" />
            <span>100+ Projects</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
            <Globe className="h-3.5 w-3.5 text-cyber-500" />
            <span>10+ Countries</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
