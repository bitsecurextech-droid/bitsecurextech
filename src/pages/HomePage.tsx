import { ArrowRight, ShieldCheck, Zap, Star, CheckCircle2, Lock, Globe2, ExternalLink, Award, BookOpen, Briefcase, Code2, Brain, GraduationCap, Sparkles, Users, TrendingUp, Search, ShoppingBag, Megaphone, Bot, Gamepad2, Layers, Rocket, BarChart3, Smartphone, Cpu, Cloud, Mail, Phone } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Hero } from '../components/Hero';
import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { ThreatLevelWidget, VisitorCounter } from '../components/Widgets';
import { coreServices, industries, projects, techStack, certifications, skillMatrix, team, securityHeaders, clientReviews, type Project, agencyStats } from '../lib/data';
import { useNavigate } from '../lib/router';
import { useReveal } from '../lib/useReveal';
import { supabase } from '../lib/supabase';

type TeamMember = { name: string; role: string; bio: string; image_url: string; service_name: string | null; experience: string | null };
type Testimonial = { name: string; role: string; company: string; rating: number; text: string };
type ClientLogo = { id: string; name: string; logo_url: string; website_url: string; category: string };

// ============================================================
// CERTIFICATION DATA
// ============================================================
const certificationItems = [
  {
    name: 'Cisco CCNA',
    category: 'Networking & Infrastructure',
    description: 'Advanced networking, routing, switching, and infrastructure knowledge.',
    icon: <Globe2 className="h-8 w-8" />,
    color: '#1ba0e1',
    bgColor: 'rgba(27, 160, 225, 0.1)',
  },
  {
    name: 'EC-Council CEH',
    category: 'Cybersecurity & Ethical Hacking',
    description: 'Certified Ethical Hacker – offensive security and penetration testing expertise.',
    icon: <ShieldCheck className="h-8 w-8" />,
    color: '#00e676',
    bgColor: 'rgba(0, 230, 118, 0.1)',
  },
  {
    name: 'NIIT',
    category: 'Technology Training',
    description: 'Professional technology and software development training programs.',
    icon: <GraduationCap className="h-8 w-8" />,
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.1)',
  },
  {
    name: 'HIIT',
    category: 'IT & Digital Skills',
    description: 'Advanced IT and digital skills training and certifications.',
    icon: <Brain className="h-8 w-8" />,
    color: '#a855f7',
    bgColor: 'rgba(168, 85, 247, 0.1)',
  },
  {
    name: 'Google Certifications',
    category: 'Digital Marketing & Business Growth',
    description: 'Google-certified expertise in digital marketing, analytics, and business growth strategies.',
    icon: <Code2 className="h-8 w-8" />,
    color: '#ea4335',
    bgColor: 'rgba(234, 67, 53, 0.1)',
  },
  {
    name: 'Microsoft Certifications',
    category: 'Cloud, Productivity & Technology',
    description: 'Microsoft-certified expertise in cloud computing, productivity, and enterprise solutions.',
    icon: <Briefcase className="h-8 w-8" />,
    color: '#00a4ef',
    bgColor: 'rgba(0, 164, 239, 0.1)',
  },
  {
    name: 'SEMrush Academy',
    category: 'SEO & Digital Intelligence',
    description: 'SEMrush certified expertise in SEO, content marketing, and competitive intelligence.',
    icon: <TrendingUp className="h-8 w-8" />,
    color: '#ff642d',
    bgColor: 'rgba(255, 100, 45, 0.1)',
  },
  {
    name: 'LinkedIn Learning',
    category: 'Continuous Professional Development',
    description: 'Ongoing professional development through curated technology and business courses.',
    icon: <BookOpen className="h-8 w-8" />,
    color: '#0077b5',
    bgColor: 'rgba(0, 119, 181, 0.1)',
  },
  {
    name: 'Udemy',
    category: 'Technology & Skills Training',
    description: 'Comprehensive technology, development, and cybersecurity training courses.',
    icon: <GraduationCap className="h-8 w-8" />,
    color: '#a435f0',
    bgColor: 'rgba(164, 53, 240, 0.1)',
  },
  {
    name: 'Alison',
    category: 'Professional Education',
    description: 'Professional education and career development programs across multiple disciplines.',
    icon: <BookOpen className="h-8 w-8" />,
    color: '#2e7d32',
    bgColor: 'rgba(46, 125, 50, 0.1)',
  },
  {
    name: 'Class Central',
    category: 'Online Learning & Development',
    description: 'Curated online learning and professional development programs.',
    icon: <Globe2 className="h-8 w-8" />,
    color: '#6c63ff',
    bgColor: 'rgba(108, 99, 255, 0.1)',
  },
];

const trustStats = [
  { value: '10+', label: 'Professional Certifications', icon: Award },
  { value: '5+', label: 'Technology Platforms', icon: Code2 },
  { value: '100+', label: 'Hours of Continuous Learning', icon: BookOpen },
  { value: 'Global', label: 'Digital Technology Knowledge', icon: Globe2 },
];

// ============================================================
// SKILL RADAR COMPONENT
// ============================================================
function SkillRadar() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const size = 260; 
  const center = size / 2; 
  const maxR = 90;
  const points = skillMatrix.map((s, i) => {
    const angle = (Math.PI * 2 * i) / skillMatrix.length - Math.PI / 2;
    const r = shown ? (s.value / 100) * maxR : 0;
    return { 
      x: center + Math.cos(angle) * r, 
      y: center + Math.sin(angle) * r, 
      labelX: center + Math.cos(angle) * (maxR + 22), 
      labelY: center + Math.sin(angle) * (maxR + 22), 
      ...s 
    };
  });
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join('') + 'Z';
  
  return (
    <div ref={ref}>
      <svg width={size} height={size} className="overflow-visible">
        {[0.25, 0.5, 0.75, 1].map((r) => <circle key={r} cx={center} cy={center} r={maxR * r} fill="none" stroke="rgba(0,102,255,0.15)" />)}
        {skillMatrix.map((_, i) => { const a = (Math.PI * 2 * i) / skillMatrix.length - Math.PI / 2; return <line key={i} x1={center} y1={center} x2={center + Math.cos(a) * maxR} y2={center + Math.sin(a) * maxR} stroke="rgba(0,102,255,0.1)" />; })}
        <path d={path} fill="rgba(0,102,255,0.12)" stroke="#00e676" strokeWidth="2" style={{ transition: 'all 1.5s ease' }} />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="#00e676" />
            <text x={p.labelX} y={p.labelY} textAnchor="middle" className="fill-slate-600 text-[10px] font-medium">{p.skill}</text>
            <text x={p.labelX} y={p.labelY + 12} textAnchor="middle" className="fill-cyber-600 text-[9px]">{p.value}%</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export function HomePage() {
  const nav = useNavigate();
  const [adminProjects, setAdminProjects] = useState<Project[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>([]);
  const [hoveredCert, setHoveredCert] = useState<number | null>(null);
  const [counters, setCounters] = useState({ projects: 0, seo: 0, audits: 0, clients: 0 });
  const marqueeRef = useRef<HTMLDivElement>(null);

  // ============================================================
  // FETCH DATA
  // ============================================================
  useEffect(() => {
    (async () => {
      const [{ data: projData }, { data: teamData }, { data: reviewData }, { data: logoData }] = await Promise.all([
        supabase.from('admin_projects').select('*').order('created_at', { ascending: false }),
        supabase.from('admin_team_members').select('*').order('created_at', { ascending: false }),
        supabase.from('public_reviews').select('*').eq('status', 'Approved').order('created_at', { ascending: false }).limit(3),
        supabase.from('client_logos').select('*').eq('is_active', true).order('display_order', { ascending: true }),
      ]);
      if (projData) {
        const mapped: Project[] = (projData as any[]).map((p) => ({
          slug: `admin-${p.id}`,
          title: p.title,
          category: p.category || 'Web Apps',
          industry: p.industry || '-',
          problem: p.description || p.problem || '',
          solution: p.solution || '',
          tech: p.tech || [],
          results: [],
          image: p.image_url || 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&w=1200',
          accent: p.accent || 'from-cyber-500 to-electric-500',
          liveDemo: p.live_demo_url || undefined,
          isAdmin: true,
        }));
        setAdminProjects(mapped);
      }
      if (teamData) setTeamMembers(teamData as TeamMember[]);
      if (reviewData) setTestimonials(reviewData as Testimonial[]);
      if (logoData) setClientLogos(logoData as ClientLogo[]);
    })();
  }, []);

  // ============================================================
  // ANIMATED COUNTERS
  // ============================================================
  useEffect(() => {
    const target = { projects: 655, seo: 200, audits: 100, clients: 98 };
    const duration = 2000;
    const steps = 60;
    const increment = {
      projects: target.projects / steps,
      seo: target.seo / steps,
      audits: target.audits / steps,
      clients: target.clients / steps,
    };
    let current = 0;
    const timer = setInterval(() => {
      current++;
      setCounters({
        projects: Math.min(Math.round(increment.projects * current), target.projects),
        seo: Math.min(Math.round(increment.seo * current), target.seo),
        audits: Math.min(Math.round(increment.audits * current), target.audits),
        clients: Math.min(Math.round(increment.clients * current), target.clients),
      });
      if (current >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, []);

  const featured = [...adminProjects, ...projects].slice(0, 6);
  const doubledCertifications = [...certificationItems, ...certificationItems];

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <>
      <SEO
        title="BitSecureX Tech – We Build. We Automate. We Secure."
        description="Web development, cybersecurity, AI automation, and cloud solutions for businesses worldwide. Free consultation available."
        keywords="web development, cybersecurity, AI automation, cloud solutions, software development, penetration testing, digital growth agency"
        url="https://bitsecurex.tech/"
        type="website"
      />

      <Hero />

      {/* ============================================================
      SECTION 1: STATS (Animated Counters) - FIXED CLS with min-h-[80px]
      ============================================================ */}
      <section className="section-dark section-pad py-8 border-t border-white/5">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Reveal>
              <div className="text-center min-h-[80px]">
                <p className="font-display text-4xl font-bold gradient-text sm:text-5xl">
                  {counters.projects}+
                </p>
                <p className="mt-1 text-sm text-slate-400">Projects Delivered</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="text-center min-h-[80px]">
                <p className="font-display text-4xl font-bold gradient-text sm:text-5xl">
                  {counters.seo}+
                </p>
                <p className="mt-1 text-sm text-slate-400">SEO Campaigns</p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="text-center min-h-[80px]">
                <p className="font-display text-4xl font-bold gradient-text sm:text-5xl">
                  {counters.audits}+
                </p>
                <p className="mt-1 text-sm text-slate-400">Security Audits</p>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="text-center min-h-[80px]">
                <p className="font-display text-4xl font-bold gradient-text sm:text-5xl">
                  {counters.clients}%
                </p>
                <p className="mt-1 text-sm text-slate-400">Client Retention</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================
      SECTION 2: GOOGLE & TRUSTPILOT RATINGS
      ============================================================ */}
      <section className="section-dark section-pad py-4">
        <div className="container-x">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-bold text-white">4.8</span>
                  <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}</div>
                </div>
                <p className="text-xs text-slate-400">Google Reviews</p>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L14.5 8.5L21 9.5L16 14.5L17 21L12 18L7 21L8 14.5L3 9.5L9.5 8.5L12 2Z" fill="#00B67A"/>
                  <path d="M12 4.5L13.8 9.3L14.6 11.2L16.6 11.4L19.5 11.8L17.4 13.8L16.3 14.9L16.5 16.9L17.1 19.8L14.5 18.4L12.8 17.5L11 18.4L8.4 19.8L9 16.9L9.2 14.9L8.1 13.8L6 11.8L8.9 11.4L10.9 11.2L11.7 9.3L12 4.5Z" fill="#00B67A"/>
                  <path d="M12 7L12.8 9.3L13.6 10.8L15.2 11L17 11.2L15.6 12.6L14.9 13.3L15.1 14.9L15.6 17.2L13.8 16.2L12.4 15.5L11 16.2L9.2 17.2L9.7 14.9L9.9 13.3L9.2 12.6L7.8 11.2L9.6 11L11.2 10.8L12 9.3L12 7Z" fill="white"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-bold text-white">4.9</span>
                  <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}</div>
                </div>
                <p className="text-xs text-slate-400">Trustpilot Reviews</p>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-cyber-400" />
              <div>
                <p className="text-2xl font-bold text-white">100+</p>
                <p className="text-xs text-slate-400">Happy Clients</p>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex items-center gap-3">
              <Globe2 className="h-8 w-8 text-cyber-400" />
              <div>
                <p className="text-2xl font-bold text-white">10+</p>
                <p className="text-xs text-slate-400">Countries Served</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
      SECTION 3: CLIENT LOGOS
      ============================================================ */}
      <section className="section-white section-pad py-6">
        <div className="container-x">
          <p className="text-center text-sm uppercase tracking-wider text-slate-400">
            Trusted by businesses worldwide
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-8 opacity-60">
            {clientLogos.length > 0 ? (
              clientLogos.map((logo) => (
                <img
                  key={logo.id}
                  src={logo.logo_url}
                  alt={logo.name}
                  className="max-h-10 w-auto object-contain"
                  loading="lazy"
                />
              ))
            ) : (
              <>
                <span className="text-sm font-medium text-slate-400">Client 1</span>
                <span className="text-sm font-medium text-slate-400">Client 2</span>
                <span className="text-sm font-medium text-slate-400">Client 3</span>
                <span className="text-sm font-medium text-slate-400">Client 4</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================
      SECTION 4: CERTIFICATIONS & PROFESSIONAL DEVELOPMENT
      ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid opacity-20" />
        <div className="pointer-events-none absolute -top-20 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-cyber-500/5 blur-3xl" />
        <div className="container-x relative px-5 sm:px-8 lg:px-12">
          <div className="text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyber-500/30 bg-cyber-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-cyber-400">
                <Award className="h-3.5 w-3.5" /> Trust & Credibility
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Certified Skills. Trusted Technology. <span className="gradient-text">Continuous Innovation.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-5 max-w-2xl text-base text-slate-400">
                At BitSecureX, we continuously expand our expertise through recognized technology certifications, cybersecurity training, digital marketing education, and professional development programs to deliver reliable solutions for businesses worldwide.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {trustStats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80}>
                <div className="glass rounded-2xl p-6 text-center transition-all hover:-translate-y-1">
                  <stat.icon className="mx-auto h-8 w-8 text-cyber-400" />
                  <p className="mt-3 font-display text-3xl font-bold gradient-text">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium text-slate-400">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Logo Marquee */}
          <div className="mt-16 overflow-hidden rounded-2xl glass-strong p-8">
            <div
              className="relative overflow-hidden"
              onMouseEnter={() => { if (marqueeRef.current) marqueeRef.current.style.animationPlayState = 'paused'; }}
              onMouseLeave={() => { if (marqueeRef.current) marqueeRef.current.style.animationPlayState = 'running'; }}
            >
              <div ref={marqueeRef} className="flex animate-marquee items-center gap-12">
                {doubledCertifications.map((cert, index) => (
                  <div
                    key={index}
                    className="group relative flex min-w-[120px] flex-col items-center justify-center"
                    onMouseEnter={() => setHoveredCert(index)}
                    onMouseLeave={() => setHoveredCert(null)}
                  >
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-full transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
                      style={{ backgroundColor: cert.bgColor, boxShadow: hoveredCert === index ? `0 0 30px ${cert.color}40` : 'none' }}
                    >
                      <span style={{ color: cert.color }}>{cert.icon}</span>
                    </div>
                    <span className="mt-3 text-xs font-medium text-slate-400 transition-colors group-hover:text-white" style={{ color: hoveredCert === index ? cert.color : undefined }}>
                      {cert.name}
                    </span>
                    {hoveredCert === index && (
                      <div className="absolute -bottom-28 left-1/2 z-20 w-64 -translate-x-1/2 rounded-xl glass-strong p-4 text-center shadow-2xl">
                        <p className="text-sm font-semibold text-white">{cert.name}</p>
                        <p className="mt-1 text-xs font-medium text-cyber-400">{cert.category}</p>
                        <p className="mt-2 text-xs text-slate-300">{cert.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-cyber-500/10 px-4 py-2 text-sm text-cyber-300 ring-1 ring-cyber-500/30">
              <CheckCircle2 className="h-4 w-4 text-cyber-400" /> Certified Professionals
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-electric-500/10 px-4 py-2 text-sm text-electric-300 ring-1 ring-electric-500/30">
              <CheckCircle2 className="h-4 w-4 text-electric-400" /> Continuous Learning
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 text-sm text-purple-300 ring-1 ring-purple-500/30">
              <CheckCircle2 className="h-4 w-4 text-purple-400" /> Industry Recognized
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-2 text-sm text-orange-300 ring-1 ring-orange-500/30">
              <CheckCircle2 className="h-4 w-4 text-orange-400" /> Global Expertise
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================
      SECTION 5: INDUSTRIES WE SERVE
      ============================================================ */}
      <section className="section-white section-pad">
        <div className="container-x">
          <div className="text-center">
            <Reveal><span className="eyebrow-dark">Industries We Serve</span></Reveal>
            <Reveal delay={80}><h2 className="section-title-dark mt-5 underline-accent inline-block">Trusted Across Industries</h2></Reveal>
            <Reveal delay={160}><p className="mx-auto mt-5 max-w-2xl text-slate-500">From finance to beauty, we deliver digital solutions tailored to each industry's unique challenges.</p></Reveal>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {industries.map((ind, i) => (
              <Reveal key={ind} delay={i * 50}>
                <span className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-cyber-500 hover:text-cyber-600 hover:shadow-md">
                  {ind}
                </span>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            <Reveal><VisitorCounter /></Reveal>
            <Reveal delay={100}><ThreatLevelWidget /></Reveal>
            <Reveal delay={200}>
              <div className="card-white rounded-2xl p-5">
                <div className="flex items-center gap-2"><Lock className="h-5 w-5 text-electric-600" /><span className="text-sm font-semibold text-slate-900">Security Headers</span></div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {securityHeaders.map((h) => (
                    <span key={h.name} className="inline-flex items-center gap-1 rounded-full bg-electric-50 px-2.5 py-1 text-xs text-electric-600">
                      <CheckCircle2 className="h-3 w-3" /> {h.name}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================
      SECTION 6: GLOBAL PRESENCE
      ============================================================ */}
      <section className="section-dark section-pad">
        <div className="container-x">
          <Reveal>
            <div className="rounded-3xl glass-strong p-8 lg:p-10 text-center">
              <span className="eyebrow"><Globe2 className="h-3.5 w-3.5" /> Global Presence</span>
              <h2 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Active agents in <span className="gradient-text">10+ countries</span></h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400">With certified hands-on practice experts and local agents across the globe, we deliver and support projects wherever you are.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {['PK','NG','IN','GB','US','CA','SG','FR','KW','AE'].map((flag) => (
                  <span key={flag} className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-cyber-500/20 to-electric-500/20 ring-1 ring-cyber-500/30 text-sm font-bold text-cyber-400">
                    {flag}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <button onClick={() => nav('/about')} className="btn-ghost">Learn more about us <ArrowRight className="h-4 w-4" /></button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
      SECTION 7: CORE SERVICES
      ============================================================ */}
      <section className="section-dark section-pad">
        <div className="container-x">
          <div className="text-center">
            <Reveal><span className="eyebrow">Core Services</span></Reveal>
            <Reveal delay={80}><h2 className="section-title-light mt-5">Everything you need to <span className="gradient-text">build & secure</span></h2></Reveal>
            <Reveal delay={160}><p className="mx-auto mt-5 max-w-2xl text-slate-400">Eight disciplines, one team. From first line of code to final security audit.</p></Reveal>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {coreServices.slice(0, 8).map((s, i) => (
              <Reveal key={s.slug} delay={i * 60}>
                <button onClick={() => nav('/services')} className="group h-full w-full rounded-2xl glass card-hover p-6 text-left">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-cyber-500/20 to-electric-500/20 ring-1 ring-cyber-500/30 transition-transform group-hover:scale-110">
                    <s.icon className="h-6 w-6 text-cyber-400" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyber-400 transition-transform group-hover:translate-x-1">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
      SECTION 8: SKILL MATRIX + TECH STACK
      ============================================================ */}
      <section className="section-light section-pad">
        <div className="container-x">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Reveal><span className="eyebrow-dark">Skill Matrix</span></Reveal>
              <Reveal delay={80}><h2 className="section-title-dark mt-5 underline-accent inline-block">The Vulnerability Radar</h2></Reveal>
              <Reveal delay={160}><p className="mt-5 text-slate-500">A gamified view of our capabilities across five core disciplines, pentesting, networking, full-stack, SEO, and cloud.</p></Reveal>
              <div className="mt-8 space-y-4">
                {skillMatrix.map((s, i) => (
                  <Reveal key={s.skill} delay={i * 80}>
                    <div>
                      <div className="flex justify-between text-sm"><span className="font-medium text-slate-700">{s.skill}</span><span className="font-bold text-cyber-600">{s.value}%</span></div>
                      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-slate-200">
                        <div className="h-full rounded-full bg-gradient-to-r from-cyber-500 to-electric-500 transition-all duration-1000" style={{ width: `${s.value}%` }} />
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal delay={200}>
              <div className="flex justify-center">
                <SkillRadar />
              </div>
            </Reveal>
          </div>

          <div className="mt-16">
            <Reveal><h3 className="text-center font-display text-xl font-bold text-slate-900">Technology Stack</h3></Reveal>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {techStack.map((t, i) => (
                <Reveal key={t.name} delay={i * 30}>
                  <div className="group flex items-center gap-2.5 rounded-xl card-white px-5 py-3 transition-all hover:-translate-y-1">
                    <t.icon className="h-5 w-5 text-cyber-500 transition-transform group-hover:scale-125" />
                    <span className="text-sm font-medium text-slate-700">{t.name}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
      SECTION 9: FEATURED WORK
      ============================================================ */}
      <section className="section-dark section-pad">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Reveal><span className="eyebrow">Selected Work</span></Reveal>
              <Reveal delay={80}><h2 className="section-title-light mt-5">Recent <span className="gradient-text">case studies</span></h2></Reveal>
            </div>
            <Reveal><button onClick={() => nav('/portfolio')} className="btn-ghost">View all <ArrowRight className="h-4 w-4" /></button></Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <div className="group block w-full overflow-hidden rounded-2xl glass card-hover text-left">
                  <div className="relative h-48 overflow-hidden">
                    <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover object-top opacity-70 transition-all duration-700 group-hover:scale-110 group-hover:opacity-90" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${p.accent} opacity-30 mix-blend-overlay`} />
                    <span className="absolute left-4 top-4 rounded-full bg-navy-950/80 px-3 py-1 text-xs font-medium text-white backdrop-blur">{p.category}</span>
                    {p.liveDemo && (
                      <a href={p.liveDemo} target="_blank" rel="noopener noreferrer" className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-cyber-500/90 px-3 py-1 text-xs font-medium text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                        <ExternalLink className="h-3 w-3" /> Preview
                      </a>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-white">{p.title}</h3>
                    {p.problem && <p className="mt-2 text-sm text-slate-400 line-clamp-2">{p.problem}</p>}
                    {p.tech?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">{p.tech.map((t) => <span key={t} className="rounded-md bg-white/5 px-2 py-1 text-[11px] text-slate-400">{t}</span>)}</div>
                    )}
                    <div className="mt-4 flex items-center gap-3">
                      {!p.isAdmin && (
                        <button onClick={() => nav(`/case-studies?slug=${p.slug}`)} className="inline-flex items-center gap-1 text-sm font-medium text-cyber-400 transition-transform group-hover:translate-x-1">
                          View case study <ArrowRight className="h-4 w-4" />
                        </button>
                      )}
                      {p.liveDemo && (
                        <a href={p.liveDemo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-electric-400 hover:text-electric-300">
                          Visit site <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
      SECTION 10: CERTIFICATIONS
      ============================================================ */}
      <section className="section-white section-pad">
        <div className="container-x">
          <div className="text-center">
            <Reveal><span className="eyebrow-dark">Certifications</span></Reveal>
            <Reveal delay={80}><h2 className="section-title-dark mt-5 underline-accent inline-block">Certified Expertise</h2></Reveal>
            <Reveal delay={160}><p className="mx-auto mt-5 max-w-2xl text-slate-500">Industry-recognized credentials backing every project.</p></Reveal>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {certifications.map((c, i) => (
              <Reveal key={c.name} delay={i * 50}>
                <div className="group rounded-2xl card-white p-5 text-center transition-all hover:-translate-y-1">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full ring-2 transition-transform group-hover:scale-110" style={{ borderColor: c.color, boxShadow: `0 0 20px ${c.color}30` }}>
                    <ShieldCheck className="h-7 w-7" style={{ color: c.color }} />
                  </div>
                  <p className="mt-3 text-xs font-semibold text-slate-900">{c.name}</p>
                  <p className="mt-0.5 text-[10px] text-slate-500">{c.issuer}</p>
                  <a href="#" className="mt-2 inline-block text-[10px] text-cyber-600 hover:underline">Verify →</a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
      SECTION 11: TESTIMONIALS
      ============================================================ */}
      <section className="section-dark section-pad">
        <div className="container-x">
          <div className="text-center">
            <Reveal><span className="eyebrow"><Globe2 className="h-3.5 w-3.5" /> 50+ Reviews Worldwide</span></Reveal>
            <Reveal delay={80}><h2 className="section-title-light mt-5">What <span className="gradient-text">clients say</span></h2></Reveal>
            <Reveal delay={160}><p className="mx-auto mt-5 max-w-2xl text-slate-400">Verified reviews from clients across the globe. All reviews are approved by our admin team.</p></Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {(testimonials.length > 0 ? testimonials : clientReviews.slice(0, 3)).map((t, i) => (
              <Reveal key={t.name + i} delay={i * 100}>
                <div className="flex h-full flex-col rounded-2xl glass card-hover p-7">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">{[...Array(t.rating || 5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-electric-500 text-electric-500" />)}</div>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">"{t.text}"</p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-cyber-500/20 text-sm font-bold text-cyber-400">{t.name[0]}</div>
                    <div>
                      <p className="flex items-center gap-1.5 text-sm font-semibold text-white">{t.name} <CheckCircle2 className="h-3.5 w-3.5 text-electric-500" /></p>
                      <p className="text-xs text-slate-500">{t.role}{t.company ? ` · ${t.company}` : ''}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Reveal><button onClick={() => nav('/reviews')} className="btn-ghost">View all 50+ reviews <ArrowRight className="h-4 w-4" /></button></Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================
      SECTION 12: TEAM
      ============================================================ */}
      <section className="section-white section-pad">
        <div className="container-x">
          <div className="text-center">
            <Reveal><span className="eyebrow-dark">The Team</span></Reveal>
            <Reveal delay={80}><h2 className="section-title-dark mt-5 underline-accent inline-block">Meet the Operators</h2></Reveal>
            <Reveal delay={160}><p className="mx-auto mt-5 max-w-2xl text-slate-500">Certified, hands-on experts who build, market, automate, and secure your digital solutions.</p></Reveal>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(teamMembers.length > 0 ? teamMembers : team).map((m: any, i) => (
              <Reveal key={m.name} delay={i * 80}>
                <div className="group overflow-hidden rounded-2xl card-white transition-all hover:-translate-y-1">
                  <div className="relative h-56 overflow-hidden">
                    <img src={m.image_url || m.image} alt={m.name} loading="lazy" className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-base font-semibold text-slate-900">{m.name}</h3>
                    <p className="text-xs text-cyber-600">{m.role}</p>
                    {m.service_name && <p className="mt-0.5 text-[11px] font-medium text-electric-600">{m.service_name}</p>}
                    <p className="mt-2 text-xs text-slate-500">{m.bio}</p>
                    {m.experience && <p className="mt-1.5 text-[11px] font-semibold text-cyber-600">{m.experience}</p>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
      SECTION 13: FINAL CTA
      ============================================================ */}
      <section className="section-dark section-pad">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl glass-strong p-10 text-center lg:p-16">
              <div className="absolute inset-0 bg-grid bg-grid opacity-20" />
              <div className="absolute -top-20 left-1/2 h-60 w-[600px] -translate-x-1/2 rounded-full bg-radial-glow blur-2xl" />
              <div className="relative">
                <Zap className="mx-auto h-10 w-10 text-electric-500" />
                <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">Ready to build something <span className="gradient-text">secure?</span></h2>
                <p className="mx-auto mt-4 max-w-xl text-slate-400">Get a free quote, request a security audit, or book a consultation with our team.</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button onClick={() => nav('/contact')} className="btn-primary">Get A Free Quote <ArrowRight className="h-4 w-4" /></button>
                  <button onClick={() => nav('/cybersecurity')} className="btn-ghost"><ShieldCheck className="h-4 w-4" /> Request Security Audit</button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
export default HomePage;
