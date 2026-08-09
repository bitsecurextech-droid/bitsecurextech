import { useState, useEffect } from 'react';
import {
  Globe2,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Target,
  Eye,
  Award,
  Users,
  MapPin,
  ArrowRight,
  Code2,
  TrendingUp,
  Megaphone,
  BarChart3,
  Share2,
  FileText,
  ShoppingBag,
  Briefcase,
  Sparkles,
  Building2,
  Rocket,
  Heart,
  Star,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { certifications, team, skillMatrix, techStack } from '../lib/data';
import { useNavigate } from '../lib/router';
import { supabase } from '../lib/supabase';
import { SEO } from '../components/SEO';

// ============================================================
// DATA
// ============================================================

const globalAgents = [
  { country: 'Pakistan', flag: 'PK', city: 'Lahore / Karachi', agents: 3 },
  { country: 'Nigeria', flag: 'NG', city: 'Lagos / Abuja', agents: 4 },
  { country: 'India', flag: 'IN', city: 'Mumbai / Bangalore', agents: 3 },
  { country: 'United Kingdom', flag: 'GB', city: 'London', agents: 2 },
  { country: 'United States', flag: 'US', city: 'New York / Austin', agents: 3 },
  { country: 'Canada', flag: 'CA', city: 'Toronto / Vancouver', agents: 2 },
  { country: 'Singapore', flag: 'SG', city: 'Singapore', agents: 1 },
  { country: 'France', flag: 'FR', city: 'Paris', agents: 1 },
  { country: 'Kuwait', flag: 'KW', city: 'Kuwait City', agents: 1 },
  { country: 'UAE', flag: 'AE', city: 'Dubai', agents: 2 },
];

const values = [
  {
    icon: ShieldCheck,
    title: 'Security First',
    desc: 'We engineer resilience into every system. Assume breach, build defenses, and verify with real testing.',
  },
  {
    icon: Zap,
    title: 'Speed & Quality',
    desc: 'Fast delivery without cutting corners. Clean code, proper architecture, and zero-downtime deploys.',
  },
  {
    icon: Target,
    title: 'Outcome-Driven',
    desc: 'We measure success by your results - more revenue, fewer vulnerabilities, happier users.',
  },
  {
    icon: Users,
    title: 'True Partnership',
    desc: 'We act as an extension of your team. Transparent communication, no scope creep, no hidden fees.',
  },
  {
    icon: Rocket,
    title: 'Innovation First',
    desc: 'We stay ahead of the curve with cutting-edge technology and forward-thinking strategies.',
  },
  {
    icon: Heart,
    title: 'Client Success',
    desc: 'Your success is our success. We are committed to delivering excellence in everything we do.',
  },
];

const milestones = [
  {
    year: '2021',
    title: 'Founded',
    desc: 'BitSecureX Tech launched with a mission to build and secure digital solutions for businesses worldwide.',
  },
  {
    year: '2022',
    title: 'First 50 Projects',
    desc: 'Delivered 50+ websites, web apps, and security audits across 5 countries with a 100% satisfaction rate.',
  },
  {
    year: '2023',
    title: 'Global Expansion',
    desc: 'Expanded operations with certified agents in 10+ countries including the US, UK, Canada, and Singapore.',
  },
  {
    year: '2024',
    title: 'AI & Automation',
    desc: 'Launched AI automation, trading bot, and LLM integration services, helping businesses scale intelligently.',
  },
  {
    year: '2025',
    title: 'Full-Service Agency',
    desc: 'Evolved into a complete digital growth agency - Technology, Marketing, Security, and Commerce.',
  },
];

const stats = [
  { value: '120+', label: 'Projects Completed' },
  { value: '85+', label: 'Websites Built' },
  { value: '40+', label: 'Security Audits' },
  { value: '50+', label: 'Marketing Campaigns' },
  { value: '10+', label: 'Countries Served' },
  { value: '50+', label: 'Client Reviews' },
];

const pillars = [
  {
    icon: Code2,
    title: 'Technology',
    color: 'cyber',
    description: 'Web development, software solutions, AI automation, cloud infrastructure, and mobile apps.',
    items: ['Web Development', 'Software Solutions', 'AI & Automation', 'Cloud Solutions', 'Mobile Apps'],
  },
  {
    icon: Megaphone,
    title: 'Marketing',
    color: 'electric',
    description: 'Digital marketing, SEO, social media, content marketing, and lead generation campaigns.',
    items: ['Digital Marketing', 'SEO & Organic Traffic', 'Social Media Marketing', 'Content Marketing'],
  },
  {
    icon: ShieldCheck,
    title: 'Security',
    color: 'red',
    description: 'Cybersecurity, penetration testing, vulnerability assessments, and compliance.',
    items: ['Cybersecurity', 'Penetration Testing', 'Security Audits', 'Compliance'],
  },
  {
    icon: ShoppingBag,
    title: 'Commerce',
    color: 'yellow',
    description: 'Shopify development, ecommerce platforms, and online store optimization.',
    items: ['Shopify Development', 'Ecommerce Growth', 'Store Optimization', 'Multi-Platform Setup'],
  },
];

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image_url: string;
  service_name: string | null;
  experience: string | null;
};

// ============================================================
// COMPONENT
// ============================================================

export function AboutPage() {
  const nav = useNavigate();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('admin_team_members')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setTeamMembers(data as TeamMember[]);
    })();
  }, []);

  const displayTeam = teamMembers.length > 0 ? teamMembers : team;

  return (
    <>
      <SEO
        title="About BitSecureX Tech – Our Mission & Team"
        description="BitSecureX Tech is a global digital growth agency specializing in web development, cybersecurity, AI automation, and digital marketing. Meet our team of certified experts."
        keywords="about BitSecureX, tech agency, cybersecurity experts, digital growth agency, our team, mission, vision"
        url="https://bitsecurex.tech/about"
        type="website"
      />
      <div className="pt-28">
        {/* ============================================================
        HERO
        ============================================================ */}
        <section className="section-pad pb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid bg-grid opacity-20" />
          <div className="absolute -top-20 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-radial-glow blur-2xl" />
          <div className="container-x relative text-center">
            <Reveal>
              <span className="eyebrow text-electric-400">About BitSecureX</span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                We Build. We Market. <span className="gradient-text">We Secure.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
                BitSecureX is a global technology, marketing, ecommerce, and digital growth agency.
                We help businesses build, promote, automate, and scale their digital presence
                through advanced technology, marketing systems, and growth strategies.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============================================================
        STATS
        ============================================================ */}
        <section className="section-pad py-8">
          <div className="container-x">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 60}>
                  <div className="glass card-hover rounded-2xl p-5 text-center">
                    <p className="font-display text-3xl font-bold gradient-text sm:text-4xl">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs text-slate-400 sm:text-sm">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
        FOUR PILLARS
        ============================================================ */}
        <section className="section-dark section-pad">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow text-electric-400">Our Expertise</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="section-title-light mt-5">
                  Four Pillars of <span className="gradient-text">Digital Growth</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mx-auto mt-5 max-w-2xl text-slate-400">
                  We combine technology, marketing, security, and commerce to deliver
                  complete digital solutions that drive real business growth.
                </p>
              </Reveal>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div
                    className={`glass rounded-2xl p-6 card-hover h-full border-t-2 ${
                      pillar.color === 'cyber'
                        ? 'border-cyber-500/50'
                        : pillar.color === 'electric'
                        ? 'border-electric-500/50'
                        : pillar.color === 'red'
                        ? 'border-red-500/50'
                        : 'border-yellow-500/50'
                    }`}
                  >
                    <pillar.icon
                      className={`h-8 w-8 ${
                        pillar.color === 'cyber'
                          ? 'text-cyber-400'
                          : pillar.color === 'electric'
                          ? 'text-electric-400'
                          : pillar.color === 'red'
                          ? 'text-red-400'
                          : 'text-yellow-400'
                      }`}
                    />
                    <h3 className="mt-4 font-display text-lg font-semibold text-white">{pillar.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{pillar.description}</p>
                    <ul className="mt-4 space-y-1.5 text-sm text-slate-400">
                      {pillar.items.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <CheckCircle2
                            className={`h-3.5 w-3.5 ${
                              pillar.color === 'cyber'
                                ? 'text-cyber-400'
                                : pillar.color === 'electric'
                                ? 'text-electric-400'
                                : pillar.color === 'red'
                                ? 'text-red-400'
                                : 'text-yellow-400'
                            }`}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
        MISSION & VISION
        ============================================================ */}
        <section className="section-white section-pad">
          <div className="container-x">
            <div className="grid gap-8 lg:grid-cols-2">
              <Reveal>
                <div className="card-white rounded-3xl p-8 shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-cyber-500 to-electric-500">
                      <Target className="h-6 w-6 text-white" />
                    </span>
                    <h2 className="font-display text-2xl font-bold text-slate-900">Our Mission</h2>
                  </div>
                  <p className="mt-5 text-base leading-relaxed text-slate-600">
                    To empower businesses worldwide with powerful, secure, and intelligent digital solutions.
                    We combine certified expertise with hands-on practice to deliver websites, software,
                    marketing systems, and security services that drive real business outcomes, whether
                    you're a startup, a growing business, or an enterprise.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">
                    We believe marketing should drive growth, security should be built in, and technology
                    should enable scale. Every project we deliver is engineered with a growth-first mindset,
                    tested by certified experts, and backed by ongoing support.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="card-white rounded-3xl p-8 shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-electric-500 to-cyber-500">
                      <Eye className="h-6 w-6 text-white" />
                    </span>
                    <h2 className="font-display text-2xl font-bold text-slate-900">Our Vision</h2>
                  </div>
                  <p className="mt-5 text-base leading-relaxed text-slate-600">
                    To be the most trusted global digital growth partner, the team businesses call when
                    they need to build something powerful, market something effectively, automate something
                    complex, or secure something critical.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">
                    We envision a world where every business, regardless of size or location, has access
                    to enterprise-grade development, marketing, and security expertise. With active agents
                    in 10+ countries and certified hands-on experts, we're making that vision a reality
                    every day.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============================================================
        VALUES
        ============================================================ */}
        <section className="section-dark section-pad">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">What We Stand For</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="section-title-light mt-5">
                  Our Core <span className="gradient-text">Values</span>
                </h2>
              </Reveal>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 80}>
                  <div className="flex h-full flex-col rounded-2xl glass card-hover p-7">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-cyber-500/20 to-electric-500/20 ring-1 ring-cyber-500/30">
                      <v.icon className="h-6 w-6 text-cyber-400" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-white">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{v.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
        GLOBAL PRESENCE
        ============================================================ */}
        <section className="section-white section-pad">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow-dark">
                  <Globe2 className="h-3.5 w-3.5" /> Global Presence
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="section-title-dark mt-5 underline-accent inline-block">
                  Active Agents in 10+ Countries
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mx-auto mt-5 max-w-2xl text-slate-500">
                  With certified hands-on practice experts and local agents across the globe,
                  we deliver and support projects wherever you are.
                </p>
              </Reveal>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {globalAgents.map((a, i) => (
                <Reveal key={a.country} delay={i * 50}>
                  <div className="group rounded-2xl card-white p-5 text-center transition-all hover:-translate-y-1">
                    <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-cyber-500/10 to-electric-500/10 ring-2 ring-cyber-500/20 transition-transform group-hover:scale-110">
                      <span className="text-xl font-bold text-cyber-600">{a.flag}</span>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-slate-900">{a.country}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{a.city}</p>
                    <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-electric-50 px-2.5 py-1 text-[11px] font-medium text-electric-600">
                      <Users className="h-3 w-3" /> {a.agents} agent{a.agents > 1 ? 's' : ''}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-electric-50 px-5 py-2.5 text-sm font-medium text-electric-600">
                <CheckCircle2 className="h-4 w-4" /> 10+ Country Partnerships
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-cyber-50 px-5 py-2.5 text-sm font-medium text-cyber-600">
                <CheckCircle2 className="h-4 w-4" /> Certified Hands-on Experts
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-2.5 text-sm font-medium text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-electric-600" /> Remote Worldwide
              </span>
            </div>
          </div>
        </section>

        {/* ============================================================
        CERTIFICATIONS
        ============================================================ */}
        <section className="section-light section-pad">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow-dark">
                  <Award className="h-3.5 w-3.5" /> Certifications
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="section-title-dark mt-5 underline-accent inline-block">
                  Certified Expertise
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mx-auto mt-5 max-w-2xl text-slate-500">
                  Industry-recognized credentials backing every project. Our team holds certifications
                  from CompTIA, EC-Council, Cisco, Google, and more.
                </p>
              </Reveal>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {certifications.map((c, i) => (
                <Reveal key={c.name} delay={i * 50}>
                  <div className="group rounded-2xl card-white p-5 text-center transition-all hover:-translate-y-1">
                    <div
                      className="mx-auto grid h-14 w-14 place-items-center rounded-full ring-2 transition-transform group-hover:scale-110"
                      style={{ borderColor: c.color, boxShadow: `0 0 20px ${c.color}30` }}
                    >
                      <ShieldCheck className="h-7 w-7" style={{ color: c.color }} />
                    </div>
                    <p className="mt-3 text-xs font-semibold text-slate-900">{c.name}</p>
                    <p className="mt-0.5 text-[10px] text-slate-500">{c.issuer}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
        SKILL MATRIX
        ============================================================ */}
        <section className="section-white section-pad">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow-dark">Capabilities</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="section-title-dark mt-5 underline-accent inline-block">
                  Skill Matrix
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mx-auto mt-5 max-w-2xl text-slate-500">
                  Our capabilities across five core disciplines - pentesting, networking,
                  full-stack, SEO, and cloud.
                </p>
              </Reveal>
            </div>
            <div className="mx-auto mt-10 max-w-2xl space-y-4">
              {skillMatrix.map((s, i) => (
                <Reveal key={s.skill} delay={i * 80}>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-700">{s.skill}</span>
                      <span className="font-bold text-cyber-600">{s.value}%</span>
                    </div>
                    <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyber-500 to-electric-500 transition-all duration-1000"
                        style={{ width: `${s.value}%` }}
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
        TECH STACK
        ============================================================ */}
        <section className="section-light section-pad">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow-dark">
                  <Code2 className="h-3.5 w-3.5" /> Technology Stack
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="section-title-dark mt-5 underline-accent inline-block">
                  Tools We Master
                </h2>
              </Reveal>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
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
        </section>

        {/* ============================================================
        TIMELINE
        ============================================================ */}
        <section className="section-dark section-pad">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">
                  <TrendingUp className="h-3.5 w-3.5" /> Our Journey
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="section-title-light mt-5">
                  Milestones & <span className="gradient-text">Growth</span>
                </h2>
              </Reveal>
            </div>
            <div className="mx-auto mt-12 max-w-3xl">
              {milestones.map((m, i) => (
                <Reveal key={m.year} delay={i * 80}>
                  <div className="relative flex gap-6 pb-8 last:pb-0">
                    {i < milestones.length - 1 && (
                      <div className="absolute left-6 top-14 h-full w-0.5 bg-gradient-to-b from-cyber-500/50 to-electric-500/20" />
                    )}
                    <div className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyber-500 to-electric-500 font-display text-xs font-bold text-white shadow-lg shadow-cyber-500/30">
                      {m.year}
                    </div>
                    <div className="flex-1 rounded-2xl glass p-6">
                      <h3 className="font-display text-lg font-semibold text-white">{m.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">{m.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
        FOUNDER / CEO
        ============================================================ */}
        <section className="section-white section-pad">
          <div className="container-x">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              {/* Image - Circular Frame */}
              <Reveal>
                <div className="flex justify-center">
                  <div className="relative">
                    {/* Glow ring */}
                    <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-cyber-500/20 to-electric-500/20 blur-2xl opacity-50 animate-pulse" />
                    {/* Circular Image */}
                    <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden ring-4 ring-cyber-500/30 shadow-2xl">
                      <img
                        src="/founder.jpg"
                        alt="Daniel Ganiyu - Founder & CEO"
                        className="w-full h-full object-cover object-top"
                      />
                      {/* Verification Badge */}
                      <div className="absolute bottom-4 right-4 rounded-full bg-cyber-500 p-2 shadow-lg">
                        <CheckCircle2 className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    {/* Floating tag */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full glass-strong px-6 py-2 shadow-xl whitespace-nowrap">
                      <p className="text-sm font-semibold text-white">Founder & CEO</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Founder Info */}
              <Reveal delay={100}>
                <div>
                  <span className="eyebrow-dark text-cyber-600">Leadership</span>
                  <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
                    Meet the Founder
                  </h2>

                  <div className="mt-6">
                    <p className="text-2xl font-display font-bold text-slate-900">
                      Daniel Ganiyu
                    </p>
                    <p className="text-sm text-cyber-600 font-medium">Founder & CEO of BitSecureX</p>
                  </div>

                  {/* Bio */}
                  <div className="mt-4 space-y-3 text-slate-600 leading-relaxed">
                    <p>
                      Daniel Ganiyu is the Founder and CEO of BitSecureX, a technology and cybersecurity
                      company focused on building secure digital solutions for businesses, startups, and
                      organizations. With a passion for innovation, software development, and cybersecurity,
                      he helps companies create powerful digital platforms while protecting their systems,
                      data, and online presence from modern threats.
                    </p>
                    <p>
                      BitSecureX was created with a mission to keep the digital world secure by helping
                      businesses, startups, and entrepreneurs build, protect, and scale their technology
                      with confidence.
                    </p>
                  </div>

                  {/* Expertise Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-cyber-50 px-3 py-1 text-xs font-medium text-cyber-600">
                      Cybersecurity
                    </span>
                    <span className="rounded-full bg-cyber-50 px-3 py-1 text-xs font-medium text-cyber-600">
                      Ethical Hacking
                    </span>
                    <span className="rounded-full bg-cyber-50 px-3 py-1 text-xs font-medium text-cyber-600">
                      Penetration Testing
                    </span>
                    <span className="rounded-full bg-cyber-50 px-3 py-1 text-xs font-medium text-cyber-600">
                      Full-Stack Development
                    </span>
                    <span className="rounded-full bg-cyber-50 px-3 py-1 text-xs font-medium text-cyber-600">
                      Web Application Security
                    </span>
                    <span className="rounded-full bg-cyber-50 px-3 py-1 text-xs font-medium text-cyber-600">
                      Cloud Security
                    </span>
                    <span className="rounded-full bg-cyber-50 px-3 py-1 text-xs font-medium text-cyber-600">
                      Digital Transformation
                    </span>
                    <span className="rounded-full bg-cyber-50 px-3 py-1 text-xs font-medium text-cyber-600">
                      DevSecOps
                    </span>
                  </div>

                  {/* Quote */}
                  <div className="mt-6 border-l-4 border-cyber-500 pl-4">
                    <p className="text-sm italic text-slate-600">
                      "Security is not just about protecting what you have today; it is about building
                      the confidence to create what comes next. At BitSecureX, we secure your vision,
                      protect your growth, and empower your future in the digital world."
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-500"> Daniel Ganiyu, Founder & CEO</p>
                  </div>

                  {/* Tagline */}
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-cyber-50 px-4 py-2">
                    <ShieldCheck className="h-4 w-4 text-cyber-600" />
                    <span className="text-xs font-medium text-cyber-700">
                      Building Secure Technology. Protecting Digital Futures.
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============================================================
        TEAM
        ============================================================ */}
        <section className="section-white section-pad">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow-dark">
                  <Users className="h-3.5 w-3.5" /> The Team
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="section-title-dark mt-5 underline-accent inline-block">
                  Meet the Operators
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mx-auto mt-5 max-w-2xl text-slate-500">
                  Certified, hands-on experts who build, market, automate, and secure your digital solutions.
                </p>
              </Reveal>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {displayTeam.map((m: any, i) => (
                <Reveal key={m.name} delay={i * 80}>
                  <div className="group overflow-hidden rounded-2xl card-white transition-all hover:-translate-y-1">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={m.image_url || m.image}
                        alt={m.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-base font-semibold text-slate-900">{m.name}</h3>
                      <p className="text-xs text-cyber-600">{m.role}</p>
                      {m.service_name && (
                        <p className="mt-0.5 text-[11px] font-medium text-electric-600">{m.service_name}</p>
                      )}
                      <p className="mt-2 text-xs text-slate-500">{m.bio}</p>
                      {m.experience && (
                        <p className="mt-1.5 text-[11px] font-semibold text-cyber-600">{m.experience}</p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
        CTA
        ============================================================ */}
        <section className="section-dark section-pad">
          <div className="container-x">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl glass-strong p-10 text-center lg:p-16">
                <div className="absolute inset-0 bg-grid bg-grid opacity-20" />
                <div className="absolute -top-20 left-1/2 h-60 w-[600px] -translate-x-1/2 rounded-full bg-radial-glow blur-2xl" />
                <div className="relative">
                  <Building2 className="mx-auto h-10 w-10 text-electric-500" />
                  <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                    Ready to work with a <span className="gradient-text">global team?</span>
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-slate-400">
                    With agents in 10+ countries and certified experts across technology, marketing,
                    security, and commerce, we're ready to build, market, automate, and secure your
                    next project.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button onClick={() => nav('/contact')} className="btn-primary">
                      Get A Free Quote <ArrowRight className="h-4 w-4" />
                    </button>
                    <button onClick={() => nav('/portfolio')} className="btn-ghost">
                      View Our Work
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}