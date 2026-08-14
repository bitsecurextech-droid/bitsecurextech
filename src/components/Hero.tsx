import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ShieldCheck, Calendar, Lock, Terminal } from 'lucide-react';
import { useNavigate } from '../lib/router';
import { useCountUp, useReveal } from '../lib/useReveal';
import { certifications } from '../lib/data';

const heroServices = ['Web Development','Mobile Apps','SaaS Platforms','AI Automation','Cloud Solutions','Cybersecurity','Trading Bot AI','SEO'];

const stats = [
  { value: 580, suffix: '+', label: 'Projects Completed' },
  { value: 100, suffix: '+', label: 'Security Audits' },
  { value: 85, suffix: '+', label: 'Websites Delivered' },
  { value: 40, suffix: '+', label: 'Businesses Secured' },
];

const terminalBoot = [
  { text: '> initializing bitsecurex_secure_shell v2.5...', delay: 0 },
  { text: '> loading certification modules...', delay: 400 },
  { text: '> [OK] CompTIA Network+ loaded', delay: 800 },
  { text: '> [OK] CompTIA Security+ loaded', delay: 1100 },
  { text: '> [OK] CompTIA A+ loaded', delay: 1400 },
  { text: '> [OK] CompTIA Pentest+ loaded', delay: 1700 },
  { text: '> [OK] CEH (Certified Ethical Hacker) loaded', delay: 2000 },
  { text: '> [OK] CCNA Ethical Hacking loaded', delay: 2300 },
  { text: '> [OK] NIIT Full-Stack loaded', delay: 2600 },
  { text: '> [OK] Google Certified SEO loaded', delay: 2900 },
  { text: '> [OK] SEMrush Certified loaded', delay: 3100 },
  { text: '> all systems secure. type "help" for commands.', delay: 3400 },
];

const commands: Record<string, string[]> = {
  help: ['Available commands:', '  help          - show this menu', '  scan_network  - simulate network scan', '  show_certs    - display certifications', '  contact_secure - contact info', '  clear         - clear terminal'],
  scan_network: ['> scanning 192.168.1.0/24...', '> [ALIVE] 192.168.1.1   (router)', '> [ALIVE] 192.168.1.10  (web-server)', '> [ALIVE] 192.168.1.24  (db-server)', '> [ALIVE] 192.168.1.42  (api-gateway)', '> scan complete. 4 hosts up. 0 vulnerabilities.'],
  show_certs: certifications.map((c) => `> ${c.name} - ${c.issuer}`),
  contact_secure: ['> Email: contact.bitsecurex@gmail.com', '> Email: bitsecurex.tech@gmail.com', '> Phone: +234 901 140 7095', '> Location: Remote Worldwide · Agents across Nigeria', '> Response time: < 1 business day'],
};

export function Hero() {
  const nav = useNavigate();
  return (
    <section className="relative overflow-hidden pt-32 pb-12 lg:pt-40 lg:pb-16">
      <div className="container-x px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left: Text */}
          <div className="animate-fade-up">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric-500" />
              Global Technology Partner
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              WE BUILD <span className="gradient-text">POWERFUL</span> DIGITAL SOLUTIONS.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              From business websites and custom applications to cybersecurity, AI automation, and trading bots, BitSecureX Tech helps businesses grow, scale, and stay secure.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => nav('/contact')} className="btn-primary">Get A Free Quote <ArrowRight className="h-4 w-4" /></button>
              <button onClick={() => nav('/cybersecurity')} className="btn-ghost"><Lock className="h-4 w-4" /> Request Security Audit</button>
              <button onClick={() => nav('/contact')} className="btn-ghost"><Calendar className="h-4 w-4" /> Book Consultation</button>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {heroServices.map((s) => (
                <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300">{s}</span>
              ))}
            </div>
          </div>

          {/* Right: Device mockup + Terminal */}
          <div className="hidden lg:block">
            <HeroVisual />
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => <StatCounter key={s.label} {...s} delay={i * 100} />)}
        </div>
      </div>
    </section>
  );
}

function StatCounter({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const count = useCountUp(value, 2000, shown);
  return (
    <div ref={ref} className="glass card-hover rounded-2xl p-5 text-center" style={{ transitionDelay: `${delay}ms` }}>
      <p className="font-display text-3xl font-bold gradient-text sm:text-4xl">{count}{suffix}</p>
      <p className="mt-1 text-xs text-slate-400 sm:text-sm">{label}</p>
    </div>
  );
}

const heroScreenshot = '/bitsecurex_uiux.webp';
const phoneScreenshot = '/bitsecurex_uiux.webp';

function HeroVisual() {
  return (
    <div className="relative h-[500px] animate-fade-up" style={{ animationDelay: '200ms' }}>
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyber-500/15 to-electric-500/15 blur-2xl" />

      {/* Laptop */}
      <div className="absolute left-1/2 top-0 w-[420px] -translate-x-1/2 animate-float">
        <div className="rounded-t-xl border border-white/10 bg-navy-800 p-2.5 shadow-2xl shadow-cyber-500/20">
          <div className="flex gap-1.5 pb-2 pl-1">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
          </div>
          <div className="overflow-hidden rounded-lg bg-navy-950">
            {/* Browser chrome */}
            <div className="relative flex items-center gap-2 border-b border-white/10 bg-navy-950 px-3 py-2">
              <div className="flex items-center gap-1.5">
                <span className="grid h-5 w-5 place-items-center rounded bg-black">
                  <img src="/icon.webp" alt="" className="h-3.5 w-3.5 rounded-sm object-cover" loading="eager" fetchpriority="high" />
                </span>
                <span className="font-display text-[11px] font-bold text-white">bitsecurex.tech</span>
              </div>
              <div className="ml-auto flex gap-2.5 text-[9px] text-slate-400">
                <span className="text-cyber-400">Home</span><span>Services</span><span>About</span><span>Pricing</span><span>Contact</span>
              </div>
            </div>
            {/* Website screenshot preview */}
            <div className="relative h-52 overflow-hidden bg-navy-900">
              <img
                src={heroScreenshot}
                alt="Website preview"
                className="h-full w-full object-cover object-top"
                loading="eager"
                fetchpriority="high"
                decoding="async"
                width="800"
                height="400"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
              {/* Floating UI overlay elements */}
              <div className="absolute left-3 top-3 flex items-center gap-1.5">
                <span className="rounded bg-cyber-500/90 px-2 py-0.5 text-[8px] font-bold text-white">LIVE</span>
                <span className="rounded bg-black/60 px-2 py-0.5 text-[8px] text-slate-300 backdrop-blur">React · Supabase</span>
              </div>
              <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-black/70 px-2.5 py-1.5 backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric-500" />
                <span className="text-[8px] font-medium text-electric-400">98/100 Speed</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto h-2.5 w-[460px] rounded-b-xl border border-t-0 border-white/10 bg-navy-800" />
      </div>

      {/* Phone - mobile website preview */}
      <div className="absolute -bottom-2 left-0 w-32 animate-float" style={{ animationDelay: '1.5s' }}>
        <div className="rounded-[1.6rem] border border-white/15 bg-navy-800 p-1.5 shadow-xl shadow-electric-500/20">
          <div className="rounded-[1.2rem] bg-black p-1.5">
            <div className="mx-auto mb-1.5 h-1 w-7 rounded-full bg-white/20" />
            {/* Phone screen - mobile website screenshot */}
            <div className="relative overflow-hidden rounded-lg bg-navy-900">
              {/* Mobile browser bar */}
              <div className="flex items-center gap-1 border-b border-white/10 bg-navy-950 px-1.5 py-1">
                <span className="grid h-3 w-3 place-items-center rounded bg-black">
                  <img src="/icon.webp" alt="" className="h-2 w-2 rounded-sm object-cover" loading="lazy" />
                </span>
                <span className="text-[5px] font-bold text-white">bitsecurex.tech</span>
              </div>
              <div className="relative h-44">
                <img
                  src={phoneScreenshot}
                  alt="Mobile website preview"
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                  width="200"
                  height="300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
                <div className="absolute bottom-2 left-2 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric-500" />
                  <span className="text-[6px] font-medium text-electric-400">Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal */}
      <div className="absolute bottom-0 right-0 w-64 animate-float" style={{ animationDelay: '0.8s' }}>
        <TerminalBox />
      </div>

      {/* Shield badge */}
      <div className="absolute right-2 top-2 grid h-16 w-16 place-items-center rounded-2xl glass-strong animate-float" style={{ animationDelay: '0.8s' }}>
        <ShieldCheck className="h-7 w-7 text-electric-500" />
        <span className="absolute -bottom-1.5 rounded-full bg-electric-500 px-2 py-0.5 text-[9px] font-bold text-navy-950">SECURE</span>
      </div>
    </div>
  );
}

function TerminalBox() {
  const [lines, setLines] = useState<{ text: string; user?: boolean }[]>([]);
  const [input, setInput] = useState('');
  const [bootDone, setBootDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: number[] = [];
    terminalBoot.forEach((l) => { timers.push(window.setTimeout(() => setLines((p) => [...p, { text: l.text }]), l.delay)); });
    timers.push(window.setTimeout(() => setBootDone(true), 3600));
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }); }, [lines]);

  const runCommand = (cmd: string) => {
    const c = cmd.trim().toLowerCase();
    setLines((p) => [...p, { text: `$ ${cmd}`, user: true }]);
    if (c === 'clear') { setLines([]); return; }
    const out = commands[c];
    if (out) out.forEach((line, i) => setTimeout(() => setLines((p) => [...p, { text: line }]), i * 80));
    else setLines((p) => [...p, { text: `command not found: ${cmd}. type "help".` }]);
  };

  return (
    <div className="rounded-xl glass-strong p-3 shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <Terminal className="h-3.5 w-3.5 text-electric-500" />
        <span className="font-mono text-[10px] text-slate-400">secure_shell</span>
      </div>
      <div ref={scrollRef} className="mt-2 h-36 overflow-y-auto font-mono text-[10px] leading-relaxed">
        {lines.map((l, i) => <div key={i} className={`terminal-line ${l.user ? 'text-cyber-400' : 'text-slate-300'}`} style={{ animationDelay: `${i * 30}ms` }}>{l.text}</div>)}
        {bootDone && (
          <form onSubmit={(e) => { e.preventDefault(); runCommand(input); setInput(''); }} className="mt-1 flex">
            <span className="text-electric-500">$</span>
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              className="ml-1.5 flex-1 bg-transparent text-slate-200 outline-none" 
              placeholder="type help…"
              aria-label="Terminal command input"
              id="terminal-input"
              name="terminal-input"
            />
          </form>
        )}
      </div>
    </div>
  );
}
