import { Check, ArrowRight, Calculator, Zap, Star, ShieldCheck, Clock, Sparkles, X, Globe, Code2, Boxes, Smartphone, Bot, Cloud, BarChart3, Users, Award, DollarSign, Rocket } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { pricingTiers } from '../lib/data';
import { useNavigate } from '../lib/router';

const servicePricing = [
  {
    category: 'Web Development',
    icon: Code2,
    items: [
      { name: 'Business Website', price: '$2,500', desc: 'Up to 6 pages, responsive, SEO basics', popular: true },
      { name: 'Landing Page', price: '$1,200', desc: 'Single page, high conversion, fast load' },
      { name: 'E-commerce Store', price: '$5,000', desc: 'Product catalog, cart, payments, inventory' },
      { name: 'Corporate and Enterprise', price: '$8,000', desc: 'Multi-page, CMS, custom design, integrations' },
      { name: 'Real Estate Platform', price: '$7,000', desc: 'Listings, search, maps, inquiry forms' },
      { name: 'Multi-Vendor Marketplace', price: '$18,000', desc: 'Vendor portals, commissions, escrow' },
    ],
  },
  {
    category: 'Software and SaaS',
    icon: Boxes,
    items: [
      { name: 'SaaS Platform', price: '$15,000', desc: 'Multi-tenant, billing, RBAC, dashboards', popular: true },
      { name: 'CRM System', price: '$12,000', desc: 'Contacts, pipeline, automation, reports' },
      { name: 'ERP System', price: '$18,000', desc: 'Inventory, HR, finance, procurement' },
      { name: 'Customer Portal', price: '$8,000', desc: 'Auth, tickets, files, invoices, audits' },
      { name: 'Admin Dashboard', price: '$6,000', desc: 'Analytics, CRUD, role-based access' },
      { name: 'API Development', price: '$5,000', desc: 'REST and GraphQL, docs, rate limiting, auth' },
    ],
  },
  {
    category: 'Mobile Apps',
    icon: Smartphone,
    items: [
      { name: 'Cross-Platform App', price: '$12,000', desc: 'iOS and Android, React Native, push notifications', popular: true },
      { name: 'iOS Native App', price: '$15,000', desc: 'Swift, native APIs, App Store deployment' },
      { name: 'Android Native App', price: '$14,000', desc: 'Kotlin, native APIs, Play Store deployment' },
      { name: 'Progressive Web App (PWA)', price: '$6,000', desc: 'Offline support, installable, push notifications' },
    ],
  },
  {
    category: 'Cybersecurity',
    icon: ShieldCheck,
    items: [
      { name: 'Security Audit', price: '$3,500', desc: 'Policy, compliance, architecture review', popular: true },
      { name: 'Penetration Testing', price: '$5,000', desc: 'Web, API, network, OWASP aligned' },
      { name: 'Vulnerability Assessment', price: '$2,500', desc: 'Automated and manual scanning, reporting' },
      { name: 'Web App Security Testing', price: '$4,000', desc: 'Injection, auth, logic flaws, OWASP Top 10' },
      { name: 'API Security Testing', price: '$3,000', desc: 'Auth, rate limits, schema abuse, REST and GraphQL' },
      { name: 'Secure Code Review', price: '$3,000', desc: 'Line-by-line source review, remediation guidance' },
    ],
  },
  {
    category: 'AI and Automation',
    icon: Bot,
    items: [
      { name: 'AI Chatbot', price: '$4,000', desc: 'LLM-powered, custom training, multi-channel' },
      { name: 'Workflow Automation', price: '$3,500', desc: 'n8n and Zapier, process automation, integrations' },
      { name: 'Trading Bot AI', price: '$8,000', desc: 'Crypto, forex, stocks, ML analysis, risk management', popular: true },
      { name: 'LLM Integration', price: '$5,000', desc: 'OpenAI and Anthropic, RAG, custom prompts' },
      { name: 'Data Pipeline', price: '$6,000', desc: 'ETL, analytics, dashboards, scheduling' },
    ],
  },
  {
    category: 'Cloud and DevOps',
    icon: Cloud,
    items: [
      { name: 'Cloud Deployment', price: '$2,000', desc: 'AWS, GCP, Azure, Docker, CI/CD setup' },
      { name: 'CI/CD Pipeline', price: '$1,500', desc: 'GitHub Actions, automated testing, deploys' },
      { name: 'Containerization', price: '$2,500', desc: 'Docker, Kubernetes, orchestration' },
      { name: 'Monitoring and Alerts', price: '$1,000', desc: 'Uptime, logs, metrics, incident response' },
    ],
  },
  {
    category: 'SEO and Marketing',
    icon: BarChart3,
    items: [
      { name: 'Technical SEO Audit', price: '$800', desc: 'Site speed, schema, crawlability, indexation' },
      { name: 'SEO Monthly Retainer', price: '$1,500/mo', desc: 'Content, links, analytics, reporting' },
      { name: 'Content Strategy', price: '$1,200', desc: 'Keyword research, calendar, guidelines' },
      { name: 'Conversion Optimization', price: '$2,000', desc: 'A/B testing, heatmaps, funnel analysis' },
    ],
  },
];

const faqs = [
  {
    q: 'Are prices negotiable?',
    a: 'Yes. All our prices are negotiable and depend on project scope, timeline, and complexity. Use our cost calculator for an instant estimate, then contact us for a custom quote.',
  },
  {
    q: 'What is included in the support period?',
    a: 'Support includes bug fixes, minor updates, and technical assistance. Starter includes 30 days, Professional 90 days, Enterprise 365 days, and Retainer is ongoing monthly support.',
  },
  {
    q: 'Do you offer payment plans?',
    a: 'Yes. For projects above $5,000, we typically split payment into milestones: 50 percent upfront, 25 percent at midpoint, and 25 percent on delivery. We can customize this to fit your budget.',
  },
  {
    q: 'How long does a project take?',
    a: 'Timelines vary by scope. A business website takes two to three weeks, a SaaS platform takes eight to sixteen weeks, and a mobile app takes six to twelve weeks. We provide a detailed timeline after scoping.',
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Absolutely. We sign mutual NDAs before any sensitive project discussion and protect your intellectual property throughout the engagement.',
  },
  {
    q: 'What if I need changes after delivery?',
    a: 'Minor changes during the support period are free. For larger changes or new features, we scope and quote separately. Retainer clients get priority access.',
  },
];

const included = [
  'Free initial consultation and scoping',
  'Transparent and negotiable pricing',
  'Security-first development',
  'Certified hands-on experts',
  'Global support across 10-plus countries',
  'Ongoing maintenance and support',
];

export function PricingPage() {
  const nav = useNavigate();

  return (
    <>
      {/* ✅ SEO – FIRST CHILD INSIDE THE FRAGMENT */}
      <SEO
        title="Pricing | Transparent Web Development & Cybersecurity Pricing | BitSecureX Tech"
        description="Transparent pricing for web development, cybersecurity, AI automation, and digital marketing services. Get a custom quote for your business."
        keywords="pricing, web development cost, cybersecurity pricing, digital marketing packages, transparent pricing, custom quote, SaaS pricing"
        url="https://bitsecurex.tech/pricing"
        type="website"
      />

      <div className="pt-28">
        {/* Header */}
        <section className="section-pad pb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid bg-grid opacity-20" />
          <div className="absolute -top-20 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-radial-glow blur-2xl" />
          <div className="container-x relative text-center">
            <Reveal>
              <span className="eyebrow">Pricing</span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Transparent <span className="gradient-text">Pricing</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
                Clear, negotiable pricing for every service. No hidden fees and no scope creep. Pick a plan or get a custom quote tailored to your project.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button onClick={() => nav('/calculator')} className="btn-primary">
                  <Calculator className="h-4 w-4" /> Cost Calculator
                </button>
                <button onClick={() => nav('/contact')} className="btn-ghost">
                  Get Custom Quote <ArrowRight className="h-4 w-4" />
                </button>
              </div>
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
                  <p className="text-xs text-slate-400">Average Client Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="section-pad py-8">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Engagement Models</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="section-title-light mt-5">Choose Your <span className="gradient-text">Plan</span></h2>
              </Reveal>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-4">
              {pricingTiers.map((tier, i) => (
                <Reveal key={tier.name} delay={i * 80}>
                  <div className={`relative flex h-full flex-col rounded-3xl p-7 transition-all ${tier.popular ? 'glass-strong ring-2 ring-cyber-500/50 lg:-translate-y-3' : 'glass'}`}>
                    {tier.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyber-500 to-electric-500 px-4 py-1 text-xs font-bold text-white shadow-lg shadow-cyber-500/30">
                        <Star className="mr-1 inline h-3 w-3" /> MOST POPULAR
                      </span>
                    )}
                    <h3 className="font-display text-xl font-bold text-white">{tier.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">{tier.desc}</p>
                    <div className="mt-5">
                      <span className="font-display text-4xl font-bold gradient-text">{tier.price}</span>
                      <span className="ml-1 text-sm text-slate-400">/{tier.period}</span>
                    </div>
                    <ul className="mt-6 flex-1 space-y-3">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric-500" /> {f}
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => nav('/contact')} className={`mt-7 w-full ${tier.popular ? 'btn-primary' : 'btn-ghost'}`}>
                      {tier.cta} <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="section-white section-pad">
          <div className="container-x">
            <Reveal>
              <div className="mx-auto max-w-4xl rounded-3xl card-white p-8 lg:p-10 shadow-xl">
                <div className="text-center">
                  <span className="eyebrow-dark">
                    <Sparkles className="h-3.5 w-3.5" /> Every Plan Includes
                  </span>
                  <h2 className="mt-4 font-display text-2xl font-bold text-slate-900">What You Always Get</h2>
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {included.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-electric-100">
                        <Check className="h-4 w-4 text-electric-600" />
                      </span>
                      <p className="text-sm font-medium text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Service Pricing Breakdown */}
        <section className="section-light section-pad">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow-dark">Detailed Breakdown</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="section-title-dark mt-5 underline-accent inline-block">Service-by-Service Pricing</h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mx-auto mt-5 max-w-2xl text-slate-500">
                  Starting prices for each service category. Final pricing depends on scope, features, and complexity, all negotiable.
                </p>
              </Reveal>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {servicePricing.map((cat, ci) => (
                <Reveal key={cat.category} delay={ci * 60}>
                  <div className="card-white rounded-3xl p-7 shadow-md hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyber-500/10 to-electric-500/10">
                        <cat.icon className="h-6 w-6 text-cyber-600" />
                      </span>
                      <h3 className="font-display text-lg font-bold text-slate-900">{cat.category}</h3>
                    </div>
                    <div className="mt-4 space-y-3">
                      {cat.items.map((item) => (
                        <div key={item.name} className="flex items-start justify-between gap-4 rounded-xl p-3 transition-colors hover:bg-slate-50">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                              {item.popular && (
                                <span className="rounded-full bg-cyber-100 px-2 py-0.5 text-[10px] font-bold text-cyber-700">POPULAR</span>
                              )}
                            </div>
                            <p className="mt-0.5 text-xs text-slate-500">{item.desc}</p>
                          </div>
                          <p className="shrink-0 font-display text-sm font-bold text-cyber-600">{item.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons */}
        <section className="section-white section-pad">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow-dark">Add-Ons and Extras</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="section-title-dark mt-5 underline-accent inline-block">Optional Enhancements</h2>
              </Reveal>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: ShieldCheck, name: 'Penetration Testing', price: '$3,500', desc: 'Full security test before launch' },
                { icon: Zap, name: 'Express Delivery', price: '+30%', desc: 'Priority queue, faster timeline' },
                { icon: Clock, name: 'Extended Support', price: '$500/mo', desc: 'Ongoing maintenance after period' },
                { icon: Star, name: 'Premium Design', price: '$2,000', desc: 'Custom illustrations and animations' },
              ].map((a, i) => (
                <Reveal key={a.name} delay={i * 60}>
                  <div className="card-white rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyber-500/10 to-electric-500/10">
                      <a.icon className="h-5 w-5 text-cyber-600" />
                    </span>
                    <h3 className="mt-4 font-display text-base font-semibold text-slate-900">{a.name}</h3>
                    <p className="mt-1 text-xs text-slate-500">{a.desc}</p>
                    <p className="mt-3 font-display text-lg font-bold text-cyber-600">{a.price}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-light section-pad">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow-dark">FAQ</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="section-title-dark mt-5 underline-accent inline-block">Pricing Questions</h2>
              </Reveal>
            </div>
            <div className="mx-auto mt-10 max-w-3xl space-y-4">
              {faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 60}>
                  <details className="group card-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                      <h3 className="font-display text-base font-semibold text-slate-900">{f.q}</h3>
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cyber-50 text-cyber-600 transition-transform group-open:rotate-45">
                        <X className="h-4 w-4 rotate-45" />
                      </span>
                    </summary>
                    <p className="mt-4 text-sm leading-relaxed text-slate-600">{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-dark section-pad">
          <div className="container-x">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl glass-strong p-10 text-center lg:p-16">
                <div className="absolute inset-0 bg-grid bg-grid opacity-20" />
                <div className="absolute -top-20 left-1/2 h-60 w-[600px] -translate-x-1/2 rounded-full bg-radial-glow blur-2xl" />
                <div className="relative">
                  <Rocket className="mx-auto h-10 w-10 text-electric-500" />
                  <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                    Not sure which plan <span className="gradient-text">fits you?</span>
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-slate-400">
                    Use our cost calculator for an instant estimate, or contact us for a custom quote tailored to your exact needs.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button onClick={() => nav('/calculator')} className="btn-primary">
                      <Calculator className="h-4 w-4" /> Try Cost Calculator
                    </button>
                    <button onClick={() => nav('/contact')} className="btn-ghost">
                      Talk to Us <ArrowRight className="h-4 w-4" />
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

export default PricingPage;