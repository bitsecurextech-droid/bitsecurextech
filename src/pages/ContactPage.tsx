import { useState, useMemo } from 'react';
import { Mail, Phone, MapPin, Send, Calendar, CheckCircle2, Loader2, Clock, Globe2, Share2, Calculator, Check, DollarSign, X, ExternalLink, ShieldCheck } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { supabase } from '../lib/supabase';
import { sendTelegram, formatLeadMessage } from '../lib/telegram';
import { contactFormTypes } from '../lib/data';
import { useNavigate } from '../lib/router';

const fiverrSpecialists = [
  { name: 'BitsecureX Lab', role: 'Lead Penetration Tester', tagline: 'CEH-certified offensive security, full-scope penetration testing and vulnerability assessment.', profileUrl: 'https://www.fiverr.com/bitsecxlab', gigUrl: 'https://www.fiverr.com/s/qDEwLmX', avatar: 'BL' },
  { name: 'Daniel Ganiy', role: 'Penetration Testing Agent', tagline: 'Security audits, vulnerability scanning, and web app pentest, fast delivery, detailed reports.', profileUrl: 'https://www.fiverr.com/s/pdDLegE', gigUrl: 'https://www.fiverr.com/s/pdDLegE', avatar: 'DG' },
  { name: 'NG Team', role: 'Fiverr Nigeria Team', tagline: 'Web development, e-commerce, and maintenance, trusted by 100+ clients across Africa and beyond.', profileUrl: 'https://www.fiverr.com/s/1qm3v00', gigUrl: 'https://www.fiverr.com/s/1qm3v00', avatar: 'NG' },
];

const services = ['Web Development','Software Development','AI & Automation','Mobile Apps','Cloud Solutions','Cybersecurity','Penetration Testing','Trading Bot AI','SEO & Marketing','Partnership','Career','Other'];

const slots = ['Mon 10:00','Mon 14:00','Tue 09:00','Tue 15:00','Wed 11:00','Wed 16:00','Thu 10:00','Thu 13:00','Fri 09:00','Fri 14:00'];

const globalAgents = [
  { country: 'Pakistan', flag: 'PK', city: 'Lahore / Karachi' },
  { country: 'Nigeria', flag: 'NG', city: 'Lagos / Abuja' },
  { country: 'India', flag: 'IN', city: 'Mumbai / Bangalore' },
  { country: 'United Kingdom', flag: 'GB', city: 'London' },
  { country: 'United States', flag: 'US', city: 'New York / Austin' },
  { country: 'Canada', flag: 'CA', city: 'Toronto / Vancouver' },
  { country: 'Singapore', flag: 'SG', city: 'Singapore' },
  { country: 'France', flag: 'FR', city: 'Paris' },
  { country: 'Kuwait', flag: 'KW', city: 'Kuwait City' },
  { country: 'UAE', flag: 'AE', city: 'Dubai' },
];

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

export function ContactPage() {
  const nav = useNavigate();
  const [formType, setFormType] = useState('general');
  const [form, setForm] = useState({ name: '', email: '', company: '', service: services[0], message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [emailSub, setEmailSub] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'success'>('idle');
  const [selectedSlot, setSelectedSlot] = useState('');

  // Full calculator state
  const [type, setType] = useState(projectTypes[0]);
  const [selected, setSelected] = useState<string[]>([]);
  const [comp, setComp] = useState(complexity[1]);
  const [negotiable, setNegotiable] = useState(true);
  const [showLead, setShowLead] = useState(false);
  const [lead, setLead] = useState({ name: '', email: '', phone: '', notes: '' });
  const [leadStatus, setLeadStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const toggle = (label: string) => setSelected(s => s.includes(label) ? s.filter(x => x !== label) : [...s, label]);

  const featuresCost = useMemo(() => {
    return featureGroups.flatMap(g => g.features).filter(f => selected.includes(f.label)).reduce((sum, f) => sum + f.price, 0);
  }, [selected]);

  const total = Math.round((type.base + featuresCost) * comp.mult);
  const range = { low: Math.round(total * 0.85), high: Math.round(total * 1.15) };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const ft = contactFormTypes.find((f) => f.id === formType);
    const leadData = {
      name: form.name, email: form.email, company: form.company,
      service: `${ft?.label ?? formType}${selectedSlot ? ` (Slot: ${selectedSlot})` : ''}`,
      message: form.message, slot: selectedSlot,
    };
    const { error } = await supabase.from('contact_leads').insert({
      name: form.name, email: form.email, company: form.company,
      service: leadData.service, message: form.message,
    });
    await sendTelegram(formatLeadMessage(`Contact: ${ft?.label ?? formType}`, leadData));
    setStatus(error ? 'error' : 'success');
    if (!error) { setForm({ name: '', email: '', company: '', service: services[0], message: '' }); setSelectedSlot(''); }
  };

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSub.trim()) return;
    sendTelegram(formatLeadMessage('Newsletter Subscription', { email: emailSub }));
    setSubStatus('success'); setEmailSub('');
  };

  const share = () => {
    if (navigator.share) navigator.share({ title: 'BitSecureX Tech', url: window.location.href }).catch(() => {});
    else navigator.clipboard?.writeText(window.location.href);
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadStatus('loading');
    const selectedFeatures = selected.join(', ');
    const leadData = {
      name: lead.name, email: lead.email, phone: lead.phone,
      project_type: type.label, complexity: comp.label,
      features: selectedFeatures, estimated_budget: `$${range.low} - $${range.high}`,
      negotiable: negotiable ? 'Yes' : 'No', notes: lead.notes,
    };
    await supabase.from('contact_leads').insert({
      name: lead.name, email: lead.email, service: `Calculator: ${type.label}`,
      message: `Complexity: ${comp.label}\nFeatures: ${selectedFeatures}\nEst. Budget: $${range.low}-$${range.high}\nNegotiable: ${negotiable ? 'Yes' : 'No'}\nPhone: ${lead.phone}\nNotes: ${lead.notes}`,
    });
    await sendTelegram(formatLeadMessage('Calculator Quote Request', leadData));
    setLeadStatus('success');
  };

  return (
    <>
      {/* ✅ SEO – FIRST CHILD INSIDE THE FRAGMENT */}
      <SEO
        title="Contact BitSecureX Tech – Get a Free Consultation"
        description="Contact BitSecureX Tech for a free consultation. We offer web development, cybersecurity, AI automation, and digital marketing services for businesses worldwide. Get a free quote today."
        keywords="contact, free consultation, web development quote, cybersecurity consultation, digital marketing quote, reach out, get in touch, book a consultation"
        url="https://bitsecurex.tech/contact"
        type="website"
      />

      <div className="pt-28">
        <section className="section-pad pb-8">
          <div className="container-x text-center">
            <Reveal><span className="eyebrow">Contact</span></Reveal>
            <Reveal delay={80}><h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">Let's build <span className="gradient-text">something secure</span></h1></Reveal>
            <Reveal delay={160}><p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">Request a free quote, a security audit, or book a consultation. We respond within one business day.</p></Reveal>
            <Reveal delay={240}>
              <button onClick={share} className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-cyber-400/50 hover:text-white">
                <Share2 className="h-4 w-4" /> Share this page
              </button>
            </Reveal>
          </div>
        </section>

        {/* Global agents section */}
        <section className="section-pad py-8">
          <div className="container-x">
            <Reveal>
              <div className="rounded-3xl glass-strong p-8 lg:p-10">
                <div className="text-center">
                  <span className="eyebrow"><Globe2 className="h-3.5 w-3.5" /> Global Presence</span>
                  <h2 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Active agents in <span className="gradient-text">10+ countries</span></h2>
                  <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400">With certified hands-on practice experts and local agents across the globe, we deliver and support projects wherever you are.</p>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {globalAgents.map((a, i) => (
                    <Reveal key={a.country} delay={i * 40}>
                      <div className="group rounded-2xl border border-white/10 bg-white/5 p-4 text-center transition-all hover:border-cyber-400/50 hover:bg-cyber-500/10">
                        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-cyber-500/20 to-electric-500/20 ring-1 ring-cyber-500/30">
                          <span className="text-lg font-bold text-cyber-400">{a.flag}</span>
                        </div>
                        <p className="mt-3 text-sm font-semibold text-white">{a.country}</p>
                        <p className="mt-0.5 text-xs text-slate-400">{a.city}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-center">
                  <span className="inline-flex items-center gap-2 rounded-full bg-electric-500/10 px-4 py-2 text-sm text-electric-400"><CheckCircle2 className="h-4 w-4" /> 10+ Country Partnerships</span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-cyber-500/10 px-4 py-2 text-sm text-cyber-400"><CheckCircle2 className="h-4 w-4" /> Certified Hands-on Experts</span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300"><CheckCircle2 className="h-4 w-4 text-electric-400" /> Remote Worldwide</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-pad py-8">
          <div className="container-x grid gap-8 lg:grid-cols-[1fr_1.3fr]">
            <Reveal>
              <div className="space-y-4">
                <div className="rounded-2xl glass p-6">
                  <h3 className="font-display text-lg font-semibold text-white">Get in touch</h3>
                  <div className="mt-4 space-y-3 text-sm">
                    <a href="mailto:contact.bitsecurex@gmail.com" className="flex items-center gap-3 text-slate-300 hover:text-cyber-400 transition-colors"><Mail className="h-4 w-4 text-cyber-400 shrink-0" /> contact.bitsecurex@gmail.com</a>
                    <a href="mailto:bitsecurex.tech@gmail.com" className="flex items-center gap-3 text-slate-300 hover:text-cyber-400 transition-colors"><Mail className="h-4 w-4 text-cyber-400 shrink-0" /> bitsecurex.tech@gmail.com</a>
                    <a href="tel:+2349011407095" className="flex items-center gap-3 text-slate-300 hover:text-cyber-400 transition-colors"><Phone className="h-4 w-4 text-cyber-400 shrink-0" /> +234 901 140 7095</a>
                    <p className="flex items-center gap-3 text-slate-300"><MapPin className="h-4 w-4 text-cyber-400 shrink-0" /> Remote Worldwide · Agents across 10+ countries</p>
                    <p className="flex items-center gap-3 text-slate-300"><Clock className="h-4 w-4 text-cyber-400 shrink-0" /> Mon–Fri, 9am–6pm</p>
                    <p className="flex items-center gap-3 text-slate-300"><Globe2 className="h-4 w-4 text-cyber-400 shrink-0" /> Serving clients globally</p>
                  </div>
                </div>

                <div className="rounded-2xl glass p-6">
                  <h3 className="font-display text-lg font-semibold text-white">Book a consultation</h3>
                  <p className="mt-2 text-sm text-slate-400">Pick a time slot for a free 30-minute consultation.</p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {slots.map((slot) => (
                      <button key={slot} onClick={() => setSelectedSlot(slot)} className={`rounded-xl border px-3 py-2.5 text-sm transition-all ${selectedSlot === slot ? 'border-cyber-400/60 bg-cyber-500/15 text-white' : 'border-white/10 bg-white/5 text-slate-300 hover:border-cyber-400/50 hover:text-white'}`}>
                        <Calendar className="mr-1 inline h-3.5 w-3.5" /> {slot}
                      </button>
                    ))}
                  </div>
                  {selectedSlot && <p className="mt-3 text-xs text-electric-400">Selected: {selectedSlot}, we'll confirm via email.</p>}
                </div>

                <div className="rounded-2xl glass p-6">
                  <h3 className="font-display text-lg font-semibold text-white">Newsletter</h3>
                  <p className="mt-2 text-sm text-slate-400">Security insights monthly. No spam.</p>
                  {subStatus === 'success' ? (
                    <p className="mt-4 flex items-center gap-2 rounded-lg bg-electric-500/10 px-3 py-2.5 text-sm text-electric-400"><CheckCircle2 className="h-4 w-4" /> Subscribed! Check your inbox.</p>
                  ) : (
                    <form onSubmit={subscribe} className="mt-4 flex gap-2">
                      <input value={emailSub} onChange={(e) => setEmailSub(e.target.value)} type="email" placeholder="you@email.com" className="input-field flex-1" />
                      <button type="submit" className="btn-primary shrink-0">Subscribe</button>
                    </form>
                  )}
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <form onSubmit={submit} className="rounded-3xl glass-strong p-7 lg:p-9">
                <div className="mb-5">
                  <p className="mb-2 text-sm font-medium text-slate-300">Inquiry type</p>
                  <div className="flex flex-wrap gap-2">
                    {contactFormTypes.map((ft) => (
                      <button key={ft.id} type="button" onClick={() => setFormType(ft.id)} className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-all ${formType === ft.id ? 'border-cyber-400/60 bg-cyber-500/15 text-white' : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'}`}>
                        <ft.icon className="h-3.5 w-3.5" /> {ft.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block"><span className="mb-1.5 block text-sm font-medium text-slate-300">Full Name <span className="text-cyber-400">*</span></span><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Jane Doe" /></label>
                  <label className="block"><span className="mb-1.5 block text-sm font-medium text-slate-300">Email <span className="text-cyber-400">*</span></span><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="jane@company.com" /></label>
                  <label className="block"><span className="mb-1.5 block text-sm font-medium text-slate-300">Company</span><input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="input-field" placeholder="Acme Inc." /></label>
                  <label className="block"><span className="mb-1.5 block text-sm font-medium text-slate-300">Service</span>
                    <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="input-field">
                      {services.map((s) => <option key={s} className="bg-navy-900">{s}</option>)}
                    </select>
                  </label>
                </div>
                <label className="mt-4 block"><span className="mb-1.5 block text-sm font-medium text-slate-300">Message <span className="text-cyber-400">*</span></span><textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-field resize-none" placeholder="Tell us about your project or security needs…" /></label>

                <button type="submit" disabled={status === 'loading'} className="btn-primary mt-5 w-full disabled:opacity-60">
                  {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Send Message
                </button>

                {status === 'success' && <p className="mt-4 flex items-center gap-2 rounded-lg bg-electric-500/10 px-4 py-3 text-sm text-electric-400"><CheckCircle2 className="h-4 w-4" /> Thanks! We'll be in touch within one business day.</p>}
                {status === 'error' && <p className="mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">Something went wrong. Please email contact.bitsecurex@gmail.com directly.</p>}
              </form>
            </Reveal>
          </div>
        </section>

        {/* Hire Us on Fiverr */}
        <section className="section-pad py-10">
          <div className="container-x">
            <div className="text-center">
              <Reveal><span className="eyebrow"><ShieldCheck className="h-3.5 w-3.5" /> Fiverr Verified</span></Reveal>
              <Reveal delay={80}><h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">Hire Us Directly on Fiverr, <span className="gradient-text">Trusted by 100+ Clients</span></h2></Reveal>
              <Reveal delay={160}><p className="mx-auto mt-4 max-w-2xl text-slate-400">Connect with our Fiverr specialists directly. Each profile links to live gigs you can order today.</p></Reveal>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {fiverrSpecialists.map((s, i) => (
                <Reveal key={s.name} delay={i * 100}>
                  <div className="flex h-full flex-col rounded-2xl glass card-hover p-7">
                    <div className="flex items-center gap-4">
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-black font-display text-lg font-bold text-cyber-400 ring-2 ring-cyber-500/30">
                        {s.avatar}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-lg font-semibold text-white">{s.name}</h3>
                        <p className="text-sm text-cyber-400">{s.role}</p>
                      </div>
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-400">{s.tagline}</p>
                    <div className="mt-6 flex flex-col gap-2.5">
                      <a
                        href={s.gigUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary w-full text-sm"
                      >
                        View Gig <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <a
                        href={s.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-cyber-400/60 hover:bg-cyber-500/10"
                      >
                        Fiverr Profile <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Full Cost Calculator */}
        <section className="section-white section-pad">
          <div className="container-x">
            <div className="text-center">
              <Reveal><span className="eyebrow-dark">Cost Calculator</span></Reveal>
              <Reveal delay={80}><h2 className="section-title-dark mt-5 underline-accent inline-block">Website Cost Calculator</h2></Reveal>
              <Reveal delay={160}><p className="mx-auto mt-4 max-w-xl text-slate-500">Get an instant, detailed ballpark estimate. Select your project type, pick features, and choose complexity, all prices are negotiable.</p></Reveal>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
              {/* Left: Form */}
              <div className="space-y-6">
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
                    <button onClick={() => nav('/calculator')} className="btn-ghost-dark mt-2 w-full text-sm">
                      Open Full Calculator
                    </button>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Lead capture modal */}
        {showLead && (
          <div className="fixed inset-0 z-[100] grid place-items-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowLead(false)}>
            <div className="card-white rounded-2xl p-7 max-w-md w-full" onClick={e => e.stopPropagation()}>
              {leadStatus === 'success' ? (
                <div className="text-center py-6">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-electric-500" />
                  <h3 className="mt-4 font-display text-xl font-bold text-slate-900">Quote Request Sent!</h3>
                  <p className="mt-2 text-sm text-slate-500">We've received your request and will contact you within one business day with a detailed proposal.</p>
                  <button onClick={() => { setShowLead(false); setLeadStatus('idle'); }} className="btn-primary mt-6">Done</button>
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
                    <button type="submit" disabled={leadStatus === 'loading'} className="btn-primary w-full disabled:opacity-60">
                      {leadStatus === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Submit Quote Request
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
export default ContactPage;