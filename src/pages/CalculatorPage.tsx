import { useState, useMemo } from 'react';
import { Calculator, Check, DollarSign, Send, Loader2, CheckCircle2, X } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { useNavigate } from '../lib/router';
import { supabase } from '../lib/supabase';
import { sendTelegram, formatLeadMessage } from '../lib/telegram';

const projectTypes = [
  { label: 'Business Website', base: 2500, cat: 'Basic' },
  { label: 'E-commerce Store', base: 5000, cat: 'Commerce' },
  { label: 'SaaS Platform', base: 15000, cat: 'Advanced' },
  { label: 'Mobile App', base: 12000, cat: 'Advanced' },
  { label: 'Custom Software', base: 10000, cat: 'Advanced' },
  { label: 'Security Audit', base: 3500, cat: 'Security' },
  { label: 'Portfolio / Personal Brand', base: 1800, cat: 'Basic' },
  { label: 'Landing Page / Microsite', base: 1200, cat: 'Basic' },
  { label: 'Corporate / Enterprise', base: 8000, cat: 'Advanced' },
  { label: 'Non-Profit / Charity', base: 2000, cat: 'Basic' },
  { label: 'News / Magazine / Blog', base: 4000, cat: 'Content' },
  { label: 'Wiki / Knowledge Base', base: 5000, cat: 'Content' },
  { label: 'Learning Management System (LMS)', base: 14000, cat: 'Advanced' },
  { label: 'Marketplace (Multi-Vendor)', base: 18000, cat: 'Commerce' },
  { label: 'Job Board', base: 6000, cat: 'Content' },
  { label: 'Real Estate / Property Listing', base: 7000, cat: 'Commerce' },
  { label: 'Hotel / Travel Booking', base: 9000, cat: 'Commerce' },
  { label: 'Restaurant / Food Delivery', base: 6500, cat: 'Commerce' },
  { label: 'Community / Forum', base: 5500, cat: 'Content' },
  { label: 'Membership / Subscription Site', base: 8000, cat: 'Commerce' },
  { label: 'Event / Conference', base: 6000, cat: 'Content' },
  { label: 'Telehealth / Medical Portal', base: 16000, cat: 'Advanced' },
  { label: 'Fintech / Banking Dashboard', base: 20000, cat: 'Advanced' },
  { label: 'Gaming / eSports', base: 15000, cat: 'Advanced' },
  { label: 'CRM System', base: 12000, cat: 'Advanced' },
  { label: 'ERP System', base: 18000, cat: 'Advanced' },
];

const featureGroups = [
  { group: 'Core', features: [
    { label: 'CMS / Admin Dashboard', price: 1500 },
    { label: 'User Authentication', price: 800 },
    { label: 'Payment Integration', price: 1200 },
    { label: 'AI / Chatbot', price: 2500 },
    { label: 'API Development', price: 2000 },
    { label: 'SEO Optimization', price: 600 },
    { label: 'Cloud Deployment', price: 1000 },
    { label: 'Penetration Testing', price: 3500 },
  ]},
  { group: 'User & Access', features: [
    { label: 'Social Login (Google/Facebook/Apple)', price: 700 },
    { label: 'Two-Factor Authentication (2FA)', price: 500 },
    { label: 'Single Sign-On (SSO)', price: 1500 },
    { label: 'User Roles & Permissions', price: 1000 },
    { label: 'GDPR / CCPA Consent & Data Portability', price: 800 },
  ]},
  { group: 'E-commerce & Payments', features: [
    { label: 'Shopping Cart & Wishlist', price: 800 },
    { label: 'Product Reviews & Ratings', price: 500 },
    { label: 'Inventory / Stock Management', price: 1000 },
    { label: 'Order Tracking & Invoicing', price: 800 },
    { label: 'Abandoned Cart Recovery', price: 600 },
    { label: 'Subscription / Recurring Billing', price: 1200 },
    { label: 'Multi-Currency & Tax Calculation', price: 700 },
    { label: 'Digital Download Delivery', price: 500 },
  ]},
  { group: 'Marketing & Engagement', features: [
    { label: 'Email Newsletter Integration', price: 400 },
    { label: 'SMS / Push Notifications', price: 600 },
    { label: 'Blog / News Module', price: 500 },
    { label: 'Live Chat (Customer Support)', price: 800 },
    { label: 'A/B Testing / Heatmaps', price: 700 },
    { label: 'Affiliate / Referral Tracking', price: 900 },
    { label: 'Coupon / Discount Code Engine', price: 500 },
  ]},
  { group: 'UI & User Experience', features: [
    { label: 'Dark / Light Mode Toggle', price: 300 },
    { label: 'Full Accessibility (WCAG 2.1 AA)', price: 800 },
    { label: 'Multi-Language (i18n)', price: 700 },
    { label: 'Advanced Search (Elasticsearch/Algolia)', price: 1200 },
    { label: 'Virtual Tours / 3D Models', price: 2000 },
    { label: 'Drag-and-Drop Page Builder', price: 1500 },
  ]},
  { group: 'Integrations & API', features: [
    { label: 'Third-party API Integrations', price: 1000 },
    { label: 'Webhooks / Zapier / Make', price: 600 },
    { label: 'Video Conferencing API (Zoom/WebRTC)', price: 1200 },
    { label: 'Maps & Geocoding', price: 500 },
    { label: 'Blockchain / Crypto Wallet', price: 2500 },
  ]},
  { group: 'Performance & Infrastructure', features: [
    { label: 'CDN Setup', price: 400 },
    { label: 'Auto-scaling / Load Balancing', price: 1500 },
    { label: 'Regular Automated Backups', price: 300 },
    { label: 'Uptime Monitoring & Alerts', price: 400 },
    { label: 'Staging / Development Environment', price: 600 },
  ]},
  { group: 'Advanced Security', features: [
    { label: 'DDoS Protection & WAF', price: 1000 },
    { label: 'Rate Limiting & Brute-force Protection', price: 500 },
    { label: 'End-to-End Data Encryption', price: 800 },
    { label: 'Session Management & Timeouts', price: 400 },
    { label: 'Compliance (HIPAA/SOC2/PCI-DSS)', price: 3000 },
  ]},
];

const complexity = [
  { label: 'Basic', mult: 1 },
  { label: 'Standard', mult: 1.5 },
  { label: 'Advanced', mult: 2.2 },
];

export function CalculatorPage() {
  const nav = useNavigate();
  const [type, setType] = useState(projectTypes[0]);
  const [selected, setSelected] = useState<string[]>([]);
  const [comp, setComp] = useState(complexity[1]);
  const [negotiable, setNegotiable] = useState(true);
  const [showLead, setShowLead] = useState(false);
  const [lead, setLead] = useState({ name: '', email: '', phone: '', notes: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const toggle = (label: string) => setSelected(s => s.includes(label) ? s.filter(x => x !== label) : [...s, label]);

  const featuresCost = useMemo(() => {
    return featureGroups.flatMap(g => g.features).filter(f => selected.includes(f.label)).reduce((sum, f) => sum + f.price, 0);
  }, [selected]);

  const total = Math.round((type.base + featuresCost) * comp.mult);
  const range = { low: Math.round(total * 0.85), high: Math.round(total * 1.15) };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const selectedFeatures = selected.join(', ');
    const leadData = {
      name: lead.name, email: lead.email, phone: lead.phone,
      project_type: type.label, complexity: comp.label,
      features: selectedFeatures, estimated_budget: `$${range.low} - $${range.high}`,
      negotiable: negotiable ? 'Yes' : 'No', notes: lead.notes,
    };
    // Save to Supabase
    await supabase.from('contact_leads').insert({
      name: lead.name, email: lead.email, service: `Calculator: ${type.label}`,
      message: `Complexity: ${comp.label}\nFeatures: ${selectedFeatures}\nEst. Budget: $${range.low}-$${range.high}\nNegotiable: ${negotiable ? 'Yes' : 'No'}\nPhone: ${lead.phone}\nNotes: ${lead.notes}`,
    });
    // Send to Telegram bot
    await sendTelegram(formatLeadMessage('Calculator Quote Request', leadData));
    setStatus('success');
  };

  return (
    <>
      {/* ✅ SEO – FIRST CHILD INSIDE THE FRAGMENT */}
      <SEO
        title="Website Cost Calculator | Free Project Estimate | BitSecureX Tech"
        description="Use our free website cost calculator to get an instant estimate for your project. Select your project type, features, and complexity. All prices are negotiable."
        keywords="website cost calculator, project cost estimator, web development pricing, budget calculator, project estimate, free estimate"
        url="https://bitsecurex.tech/calculator"
        type="website"
      />

      <div className="pt-28">
        {/* Header */}
        <section className="section-white section-pad pb-8">
          <div className="container-x text-center">
            <Reveal><span className="eyebrow-dark">Smart Quote Calculator</span></Reveal>
            <Reveal delay={80}><h1 className="section-title-dark mt-5 underline-accent inline-block">Estimate Your Project Cost</h1></Reveal>
            <Reveal delay={160}><p className="mx-auto mt-5 max-w-2xl text-slate-500">Select your project type, pick the features you need, and get an instant ballpark estimate. All prices are negotiable.</p></Reveal>
          </div>
        </section>

        {/* Calculator */}
        <section className="section-light section-pad py-8">
          <div className="container-x grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Left: Form */}
            <div className="space-y-6">
              {/* Project Type */}
              <Reveal>
                <div className="card-white rounded-2xl p-6">
                  <h3 className="flex items-center gap-2 font-display text-lg font-bold text-slate-900"><span className="grid h-7 w-7 place-items-center rounded-lg bg-cyber-500 text-white text-xs">1</span> Project Type</h3>
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {projectTypes.map((p) => (
                      <button key={p.label} onClick={() => setType(p)} className={`rounded-lg border px-3 py-2.5 text-left text-xs font-medium transition-all ${type.label === p.label ? 'border-cyber-500 bg-cyber-50 text-cyber-700 ring-1 ring-cyber-500/30' : 'border-slate-200 bg-white text-slate-600 hover:border-cyber-300'}`}>
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Features */}
              {featureGroups.map((fg, gi) => (
                <Reveal key={fg.group} delay={gi * 50}>
                  <div className="card-white rounded-2xl p-6">
                    <h3 className="flex items-center gap-2 font-display text-base font-bold text-slate-900">
                      <span className="grid h-7 w-7 place-items-center rounded-lg bg-cyber-500 text-white text-xs">2</span> {fg.group}
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {fg.features.map((f) => (
                        <button key={f.label} onClick={() => toggle(f.label)} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all ${selected.includes(f.label) ? 'border-electric-500 bg-electric-50 text-electric-700 ring-1 ring-electric-500/30' : 'border-slate-200 bg-white text-slate-600 hover:border-cyber-300'}`}>
                          {selected.includes(f.label) && <Check className="h-3 w-3 text-electric-600" />}
                          {f.label}
                          <span className="text-slate-400">+${f.price.toLocaleString()}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}

              {/* Complexity */}
              <Reveal>
                <div className="card-white rounded-2xl p-6">
                  <h3 className="flex items-center gap-2 font-display text-lg font-bold text-slate-900"><span className="grid h-7 w-7 place-items-center rounded-lg bg-cyber-500 text-white text-xs">3</span> Complexity</h3>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {complexity.map((c) => (
                      <button key={c.label} onClick={() => setComp(c)} className={`rounded-lg border px-3 py-3 text-sm font-medium transition-all ${comp.label === c.label ? 'border-cyber-500 bg-cyber-50 text-cyber-700 ring-1 ring-cyber-500/30' : 'border-slate-200 bg-white text-slate-600 hover:border-cyber-300'}`}>
                        {c.label}<span className="block text-xs text-slate-400">{c.mult}x</span>
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: Sticky summary */}
            <div className="lg:sticky lg:top-24 h-fit">
              <Reveal>
                <div className="card-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-2"><Calculator className="h-5 w-5 text-cyber-500" /><h3 className="font-display text-lg font-bold text-slate-900">Your Estimate</h3></div>

                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-slate-500">Project Type</span><span className="font-medium text-slate-900">{type.label}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Base Price</span><span className="font-medium text-slate-900">${type.base.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Features ({selected.length})</span><span className="font-medium text-slate-900">+${featuresCost.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Complexity</span><span className="font-medium text-slate-900">{comp.label} ({comp.mult}x)</span></div>
                  </div>

                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500"><DollarSign className="h-3.5 w-3.5" /> Estimated Range</p>
                    <p className="mt-1 text-center font-display text-3xl font-bold gradient-text-dark">${range.low.toLocaleString()} - ${range.high.toLocaleString()}</p>
                    {negotiable && <p className="mt-1 text-center text-xs font-medium text-electric-600">✓ Price is negotiable</p>}
                  </div>

                  <label className="mt-4 flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={negotiable} onChange={(e) => setNegotiable(e.target.checked)} className="h-4 w-4 rounded accent-cyber-500" />
                    <span className="text-xs text-slate-600">Budget is negotiable</span>
                  </label>

                  <button onClick={() => setShowLead(true)} className="btn-primary mt-5 w-full">
                    <Send className="h-4 w-4" /> Request This Quote
                  </button>
                  <button onClick={() => nav('/contact')} className="btn-ghost-dark mt-2 w-full text-sm">
                    Talk to Us First
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Lead capture modal */}
        {showLead && (
          <div className="fixed inset-0 z-[100] grid place-items-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowLead(false)}>
            <div className="card-white rounded-2xl p-7 max-w-md w-full" onClick={e => e.stopPropagation()}>
              {status === 'success' ? (
                <div className="text-center py-6">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-electric-500" />
                  <h3 className="mt-4 font-display text-xl font-bold text-slate-900">Quote Request Sent!</h3>
                  <p className="mt-2 text-sm text-slate-500">We've received your request and will contact you within one business day with a detailed proposal.</p>
                  <button onClick={() => { setShowLead(false); setStatus('idle'); }} className="btn-primary mt-6">Done</button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-display text-xl font-bold text-slate-900">Request Your Quote</h3>
                    <button onClick={() => setShowLead(false)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
                  </div>
                  <div className="mb-4 rounded-lg bg-cyber-50 p-3 text-sm">
                    <p className="font-medium text-cyber-700">{type.label}</p>
                    <p className="text-cyber-600">Est. ${range.low.toLocaleString()} - ${range.high.toLocaleString()} {negotiable && '· Negotiable'}</p>
                  </div>
                  <form onSubmit={submitLead} className="space-y-3">
                    <input required placeholder="Your Name" value={lead.name} onChange={e => setLead({ ...lead, name: e.target.value })} className="input-field-light" />
                    <input required type="email" placeholder="Email Address" value={lead.email} onChange={e => setLead({ ...lead, email: e.target.value })} className="input-field-light" />
                    <input placeholder="Phone Number" value={lead.phone} onChange={e => setLead({ ...lead, phone: e.target.value })} className="input-field-light" />
                    <textarea placeholder="Additional Notes (optional)" rows={3} value={lead.notes} onChange={e => setLead({ ...lead, notes: e.target.value })} className="input-field-light resize-none" />
                    <button type="submit" disabled={status === 'loading'} className="btn-primary w-full disabled:opacity-60">
                      {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Submit Quote Request
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default CalculatorPage;