import { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle2, Star, ArrowRight, Phone, Mail, MessageCircle, Zap, ShieldCheck, TrendingUp } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { useNavigate } from '../lib/router';
import { supabase } from '../lib/supabase';
import { sendTelegram, formatLeadMessage } from '../lib/telegram';

export function ShopifyStoresPage() {
  const nav = useNavigate();
  const [pricing, setPricing] = useState<any[]>([]);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [project, setProject] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    (async () => {
      const [pricingData, caseData] = await Promise.all([
        supabase.from('admin_shopify_pricing').select('*').order('created_at', { ascending: true }),
        supabase.from('admin_shopify_case_studies').select('*').order('created_at', { ascending: false }),
      ]);
      setPricing(pricingData.data || []);
      setCaseStudies(caseData.data || []);
      setLoading(false);
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || submitting) return;
    setSubmitting(true);

    const message = formatLeadMessage('Shopify Store Request', { Name: name, Email: email, Phone: phone, Details: project });
    await sendTelegram(message);

    setSuccess(true);
    setName(''); setEmail(''); setPhone(''); setProject('');
    setSubmitting(false);
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <>
      <SEO
        title="Shopify Store Design & Development | BitSecureX Tech"
        description="We build, design, and optimize high-converting Shopify stores with security, payment integration, and SEO."
        keywords="shopify store, shopify design, shopify development, shopify seo, shopify payments"
        url="https://bitsecurex.tech/shopify-stores"
        type="website"
      />

      <div className="pt-28">
        {/* HERO */}
        <section className="section-pad pb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid bg-grid opacity-20" />
          <div className="absolute -top-20 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-radial-glow blur-2xl" />
          <div className="container-x relative text-center">
            <Reveal><span className="eyebrow">Shopify Experts</span></Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Build, Design & <span className="gradient-text">Scale</span> Your Shopify Store
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
                From custom theme design and payment integration to SEO, marketing, and security — we manage everything.
              </p>
            </Reveal>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section className="section-pad py-8 border-y border-white/5">
          <div className="container-x">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {[{ icon: Zap, label: 'Store Design & Redesign' },
                { icon: ShieldCheck, label: 'Payment & Security' },
                { icon: TrendingUp, label: 'SEO & Marketing' },
                { icon: Star, label: '24/7 Support' }].map((s, i) => (
                <Reveal key={s.label} delay={i * 60}>
                  <div className="flex flex-col items-center rounded-xl bg-navy-800/50 p-6 border border-white/5 text-center">
                    <s.icon className="h-8 w-8 text-cyber-400 mb-2" />
                    <p className="text-sm font-semibold text-white">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section className="section-pad py-10">
          <div className="container-x">
            <div className="text-center mb-10">
              <Reveal><h2 className="font-display text-3xl font-bold text-white">Transparent <span className="gradient-text">Pricing</span></h2></Reveal>
            </div>
            {loading ? <div className="flex justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-cyber-500 border-t-transparent" /></div> : (
              <div className="grid gap-6 md:grid-cols-3">
                {pricing.map((p) => (
                  <div key={p.id} className={`rounded-2xl glass p-8 text-center border ${p.is_popular ? 'border-cyber-500/50' : 'border-white/5'}`}>
                    {p.is_popular && <span className="inline-block bg-cyber-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">MOST POPULAR</span>}
                    <h3 className="font-display text-xl font-bold text-white">{p.title}</h3>
                    <p className="mt-2 text-3xl font-bold gradient-text">{p.price}</p>
                    <p className="mt-2 text-sm text-slate-400">{p.description}</p>
                    <ul className="mt-6 space-y-2 text-left">
                      {p.features?.map((f: string) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 className="h-4 w-4 text-cyber-400" /> {f}</li>
                      ))}
                    </ul>
                    <button onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary w-full mt-6">Get Started</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CASE STUDIES */}
        <section className="section-pad py-10 bg-navy-800/50 border-y border-white/5">
          <div className="container-x">
            <div className="text-center mb-10">
              <Reveal><h2 className="font-display text-3xl font-bold text-white">Recent <span className="gradient-text">Shopify Projects</span></h2></Reveal>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((cs, i) => (
                <Reveal key={cs.id} delay={i * 80}>
                  <div className="rounded-2xl glass overflow-hidden">
                    <img src={cs.image_url || 'https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg?auto=compress&w=600'} alt={cs.title} className="h-40 w-full object-cover" />
                    <div className="p-5">
                      <h3 className="font-display text-base font-semibold text-white">{cs.title}</h3>
                      {cs.client && <p className="text-xs text-cyber-400">{cs.client}</p>}
                      <p className="mt-2 text-sm text-slate-400">{cs.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT FORM */}
        <section className="section-pad py-10" id="contact-form">
          <div className="container-x max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Reveal><h2 className="font-display text-3xl font-bold text-white">Start Your <span className="gradient-text">Shopify Journey</span></h2></Reveal>
              <p className="mt-2 text-slate-400">Fill out the form and we'll get back to you within 24 hours.</p>
            </div>
            {success && <div className="mb-6 rounded-xl bg-electric-500/10 p-4 text-center text-electric-300 border border-electric-500/30">✅ Request sent! We'll contact you shortly.</div>}
            <form onSubmit={handleSubmit} className="space-y-4 glass p-8 rounded-2xl">
              <div><label className="text-xs uppercase tracking-wider text-slate-400">Name *</label><input required value={name} onChange={e => setName(e.target.value)} className="input-field mt-1" /></div>
              <div className="grid gap-4 md:grid-cols-2">
                <div><label className="text-xs uppercase tracking-wider text-slate-400">Email *</label><input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-field mt-1" /></div>
                <div><label className="text-xs uppercase tracking-wider text-slate-400">Phone *</label><input required value={phone} onChange={e => setPhone(e.target.value)} className="input-field mt-1" /></div>
              </div>
              <div><label className="text-xs uppercase tracking-wider text-slate-400">Tell us about your store</label><textarea value={project} onChange={e => setProject(e.target.value)} rows={3} className="input-field mt-1 resize-none" placeholder="e.g. I want a redesign for my fashion store..." /></div>
              <button type="submit" disabled={submitting || success} className="btn-primary w-full py-3">{submitting ? 'Sending...' : success ? 'Sent!' : 'Send Request'}</button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}