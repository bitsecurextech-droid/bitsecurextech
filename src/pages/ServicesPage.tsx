import { useState, useEffect } from 'react';
import { ArrowRight, Check, Code2, Boxes, Coins, Zap, X, Calculator, ExternalLink, Globe, Star, Users, Award, Briefcase } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { coreServices, webDevTypes, softwareTypes, fintechTypes, serviceOfferings, pricingTiers } from '../lib/data';
import { useNavigate } from '../lib/router';

const liveProjects = [
  { name: 'ORAMINDANDBODY', type: 'Yoga and Wellness', url: 'https://oramindandbody.com/', image: 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&w=800' },
  { name: 'HotGistLoaded', type: 'Entertainment Blog', url: 'https://hotgistloaded.com.ng', image: 'https://images.pexels.com/photos/3561918/pexels-photo-3561918.jpeg?auto=compress&w=800' },
  { name: 'MakeMoneyArena', type: 'Business and Finance', url: 'https://makemoneyarena.com.ng', image: 'https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg?auto=compress&w=800' },
  { name: 'Ashmil Home', type: 'E-Commerce and Home Goods', url: 'https://ashmilhome.com.ng', image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=800' },
];

const groups = [
  { icon: Code2, title: 'Website Design and Development', tag: 'Web', items: webDevTypes, desc: 'From business websites to specialized industry platforms, built for speed, SEO, and conversion.' },
  { icon: Boxes, title: 'Custom Software Solutions', tag: 'Software', items: softwareTypes, desc: 'SaaS platforms, dashboards, and business systems engineered to scale with you.' },
  { icon: Coins, title: 'Fintech and Web3 Solutions', tag: 'Fintech', items: fintechTypes, desc: 'Banking, trading, and blockchain platforms built with security at the core.' },
];

const projectTypes = [
  { label: 'Business Website', base: 2500 },
  { label: 'E-commerce Store', base: 5000 },
  { label: 'SaaS Platform', base: 15000 },
  { label: 'Mobile App', base: 12000 },
  { label: 'Custom Software', base: 10000 },
  { label: 'Cybersecurity Audit', base: 3500 },
];

const features = [
  { label: 'CMS and Admin Dashboard', price: 1500 },
  { label: 'User Authentication', price: 800 },
  { label: 'Payment Integration', price: 1200 },
  { label: 'AI and Chatbot', price: 2500 },
  { label: 'API Development', price: 2000 },
  { label: 'SEO Optimization', price: 600 },
  { label: 'Cloud Deployment', price: 1000 },
  { label: 'Penetration Testing', price: 3500 },
];

const complexity = [
  { label: 'Basic', mult: 1 },
  { label: 'Standard', mult: 1.5 },
  { label: 'Advanced', mult: 2.2 },
];

export function ServicesPage() {
  const nav = useNavigate();
  const [calcOpen, setCalcOpen] = useState(false);

  return (
    <>
      {/* ✅ SEO – FIRST CHILD INSIDE THE FRAGMENT */}
      <SEO
        title="Our Services | BitSecureX Tech"
        description="Explore our full range of digital services including web development, cybersecurity, AI automation, cloud solutions, digital marketing, and ecommerce development."
        keywords="web services, cybersecurity services, AI automation, cloud solutions, digital marketing, ecommerce development, tech services"
        url="https://bitsecurex.tech/services"
        type="website"
      />

      <div className="pt-28">
        {/* Header */}
        <section className="section-pad pb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid bg-grid opacity-20" />
          <div className="absolute -top-20 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-radial-glow blur-2xl" />
          <div className="container-x relative text-center">
            <Reveal>
              <span className="eyebrow">Our Services</span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Full-stack <span className="gradient-text">digital solutions</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
                We Build. We Automate. We Secure. Six disciplines covering everything from your first website to enterprise fintech platforms.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Trust & Ratings */}
        <section className="section-dark section-pad py-6">
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
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
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
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
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
                <Award className="h-8 w-8 text-cyber-400" />
                <div>
                  <p className="text-2xl font-bold text-white">4.72</p>
                  <p className="text-xs text-slate-400">Average Service Score</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core services grid */}
        <section className="section-pad py-10">
          <div className="container-x">
            <SectionHeading
              eyebrow="Core Capabilities"
              title={<>Six disciplines, <span className="gradient-text">one team</span></>}
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {coreServices.map((s, i) => (
                <Reveal key={s.slug} delay={i * 70}>
                  <button
                    onClick={() => nav(`/services/${s.slug}`)}
                    className="group h-full w-full rounded-2xl glass card-hover p-7 text-left transition-all hover:border-cyber-400/30"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-cyber-500/20 to-electric-500/20 ring-1 ring-cyber-500/30 transition-transform group-hover:scale-105">
                      <s.icon className="h-6 w-6 text-cyber-400" />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-semibold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.description}</p>
                    <ul className="mt-5 space-y-2">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                          <Check className="h-4 w-4 shrink-0 text-electric-500" /> {f}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cyber-400 transition-transform group-hover:translate-x-1">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed solution groups */}
        <section className="section-pad py-10">
          <div className="container-x">
            <SectionHeading
              eyebrow="Detailed Offerings"
              title={<>Specialized solutions for <span className="gradient-text">every industry</span></>}
              subtitle="Three solution families covering 40-plus specialized product types."
            />
            <div className="mt-14 space-y-8">
              {groups.map((g, i) => (
                <Reveal key={g.title} delay={i * 100}>
                  <div className="overflow-hidden rounded-3xl glass">
                    <div className="grid lg:grid-cols-[1fr_1.4fr]">
                      <div className="relative border-b border-white/10 bg-gradient-to-br from-navy-800 to-navy-900 p-8 lg:border-b-0 lg:border-r">
                        <div className="absolute inset-0 bg-grid bg-grid opacity-20" />
                        <div className="relative">
                          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyber-500 to-electric-500 shadow-lg shadow-cyber-500/30">
                            <g.icon className="h-7 w-7 text-white" />
                          </span>
                          <h3 className="mt-5 font-display text-2xl font-bold text-white">{g.title}</h3>
                          <p className="mt-3 text-sm leading-relaxed text-slate-400">{g.desc}</p>
                          <span className="mt-5 inline-block rounded-full bg-cyber-500/15 px-3 py-1 text-xs font-medium text-cyber-200">
                            {g.items.length} product types
                          </span>
                        </div>
                      </div>
                      <div className="p-8">
                        <div className="grid gap-2.5 sm:grid-cols-2">
                          {g.items.map((item) => (
                            <div
                              key={item}
                              className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-slate-300 transition-colors hover:border-cyber-400/40 hover:bg-cyber-500/10 hover:text-white"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-electric-500" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Service Offerings */}
        <section className="section-pad py-10">
          <div className="container-x">
            <SectionHeading
              eyebrow="Service Offerings"
              title={<>Engagements <span className="gradient-text">built for you</span></>}
              subtitle="Flexible engagement models, from one-off projects to dedicated retainers and instant estimates."
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {serviceOfferings.map((o, i) => (
                <Reveal key={o.title} delay={i * 70}>
                  <div className="group flex h-full flex-col rounded-2xl glass card-hover p-7">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-cyber-500/20 to-electric-500/20 ring-1 ring-cyber-500/30">
                      <o.icon className="h-6 w-6 text-cyber-400" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold text-white">{o.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{o.desc}</p>
                    <button
                      onClick={() => {
                        if (o.cta === 'Request a Calculator') setCalcOpen(true);
                        else nav('/contact');
                      }}
                      className="mt-5 inline-flex items-center gap-1.5 self-start rounded-full border border-cyber-500/30 bg-cyber-500/10 px-4 py-2 text-sm font-medium text-cyber-200 transition-all hover:border-cyber-400/60 hover:bg-cyber-500/20 hover:text-white"
                    >
                      {o.cta} <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Live Sites We've Built and Secured */}
        <section className="section-pad py-10">
          <div className="container-x">
            <SectionHeading
              eyebrow="Featured Projects"
              title={<>Live Sites We Have Built <span className="gradient-text">and Secured</span></>}
              subtitle="Real client websites live in production. Click to visit and see our work in action."
            />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {liveProjects.map((p, i) => (
                <Reveal key={p.name} delay={i * 80}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-2xl glass card-hover"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <span className="rounded-full bg-cyber-500/20 px-2.5 py-1 text-[10px] font-medium text-cyber-200 ring-1 ring-cyber-500/30 backdrop-blur-sm">
                          {p.type}
                        </span>
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur-sm transition-colors group-hover:bg-cyber-500 group-hover:ring-cyber-500">
                          <ExternalLink className="h-4 w-4 text-white" />
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg font-semibold text-white">{p.name}</h3>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
                        <Globe className="h-3.5 w-3.5 text-cyber-400" />
                        {p.url.replace('https://', '')}
                      </p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="section-pad py-10">
          <div className="container-x">
            <SectionHeading
              eyebrow="Pricing"
              title={<>Transparent <span className="gradient-text">engagement tiers</span></>}
              subtitle="Clear pricing for every stage, from your first website to enterprise systems and dedicated retainers."
            />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {pricingTiers.map((t, i) => (
                <Reveal key={t.name} delay={i * 80}>
                  <div className={`relative flex h-full flex-col rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1.5 ${t.popular ? 'glass-strong ring-2 ring-electric-500/50' : 'glass card-hover'}`}>
                    {t.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyber-500 to-electric-500 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-electric-500/30">
                        Popular
                      </span>
                    )}
                    <h3 className="font-display text-lg font-semibold text-white">{t.name}</h3>
                    <div className="mt-3 flex items-baseline gap-1.5">
                      <span className="font-display text-3xl font-bold gradient-text">{t.price}</span>
                      <span className="text-sm text-slate-500">/ {t.period}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{t.desc}</p>
                    <ul className="mt-5 flex-1 space-y-2.5">
                      {t.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                          <Check className="h-4 w-4 shrink-0 text-electric-500" /> {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => nav('/contact')}
                      className={`mt-6 w-full ${t.popular ? 'btn-primary' : 'btn-ghost'}`}
                    >
                      {t.cta} <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Reveal><button onClick={() => nav('/pricing')} className="btn-ghost">View full pricing breakdown <ArrowRight className="h-4 w-4" /></button></Reveal>
            </div>
          </div>
        </section>

        {/* CTA banner */}
        <section className="section-pad">
          <div className="container-x">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl glass-strong p-10 text-center lg:p-16">
                <div className="absolute inset-0 bg-grid bg-grid opacity-20" />
                <div className="absolute -top-20 left-1/2 h-60 w-[600px] -translate-x-1/2 rounded-full bg-radial-glow blur-2xl" />
                <div className="relative">
                  <Zap className="mx-auto h-10 w-10 text-electric-500" />
                  <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                    Have a project in mind? <span className="gradient-text">Let's build it.</span>
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-slate-400">
                    Tell us what you are building. We will send a free quote within 24 hours, or run an instant estimate with our cost calculator.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button onClick={() => nav('/contact')} className="btn-primary">
                      Get A Free Quote <ArrowRight className="h-4 w-4" />
                    </button>
                    <button onClick={() => setCalcOpen(true)} className="btn-ghost">
                      <Calculator className="h-4 w-4" /> Estimate My Project
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {calcOpen && <CalculatorModal onClose={() => setCalcOpen(false)} />}
      </div>
    </>
  );
}

function CalculatorModal({ onClose }: { onClose: () => void }) {
  const nav = useNavigate();
  const [type, setType] = useState(projectTypes[0]);
  const [selected, setSelected] = useState<string[]>([]);
  const [comp, setComp] = useState(complexity[1]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const toggle = (label: string) =>
    setSelected((s) => (s.includes(label) ? s.filter((x) => x !== label) : [...s, label]));

  const featuresCost = features
    .filter((f) => selected.includes(f.label))
    .reduce((sum, f) => sum + f.price, 0);
  const total = Math.round((type.base + featuresCost) * comp.mult);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl glass-strong p-7 shadow-2xl shadow-cyber-500/20">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyber-500 to-electric-500">
              <Calculator className="h-5 w-5 text-white" />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold text-white">Project Cost Calculator</h2>
              <p className="text-xs text-slate-400">Instant ballpark estimate</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
            aria-label="Close calculator"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <p className="mb-2 text-sm font-medium text-slate-300">Project type</p>
            <div className="grid grid-cols-2 gap-2">
              {projectTypes.map((p) => (
                <button
                  key={p.label}
                  onClick={() => setType(p)}
                  className={`rounded-xl border px-3 py-2.5 text-left text-sm transition-all ${type.label === p.label ? 'border-cyber-400/60 bg-cyber-500/15 text-white' : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-slate-300">Features</p>
            <div className="flex flex-wrap gap-2">
              {features.map((f) => (
                <button
                  key={f.label}
                  onClick={() => toggle(f.label)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all ${selected.includes(f.label) ? 'border-electric-500/50 bg-electric-500/15 text-white' : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'}`}
                >
                  {selected.includes(f.label) ? <Check className="h-3 w-3 text-electric-400" /> : null}
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-slate-300">Complexity</p>
            <div className="grid grid-cols-3 gap-2">
              {complexity.map((c) => (
                <button
                  key={c.label}
                  onClick={() => setComp(c)}
                  className={`rounded-xl border px-3 py-2 text-sm transition-all ${comp.label === c.label ? 'border-cyber-400/60 bg-cyber-500/15 text-white' : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-cyber-500/15 to-electric-500/15 p-5 text-center ring-1 ring-cyber-500/30">
            <p className="text-xs text-slate-400">Estimated Cost</p>
            <p className="mt-1 font-display text-4xl font-bold gradient-text">${total.toLocaleString()}</p>
            <p className="mt-1 text-xs text-slate-500">Ballpark only. Request a quote for an exact proposal.</p>
          </div>

          <button onClick={() => { onClose(); nav('/contact'); }} className="btn-primary w-full">
            Request This Quote <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;