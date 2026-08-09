import { useEffect, useState } from 'react';
import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { useNavigate } from '../lib/router';
import { supabase } from '../lib/supabase';
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Code2,
  ShoppingBag,
  Megaphone,
  Search,
  Bot,
  Brain,
  Users,
  Star,
  Globe2,
  Award,
  TrendingUp,
  Rocket,
  Sparkles,
  BarChart3,
  Smartphone,
  Gamepad2,
  Loader2,
} from 'lucide-react';

// ============================================================
// DATA
// ============================================================
const divisions = [
  {
    id: 'digital-experience',
    icon: Code2,
    title: 'Digital Experience Division',
    description: 'Create powerful online identities that captivate and convert.',
    services: ['Premium Website Design', 'Website Development', 'Website Redesign', 'Landing Pages', 'Web Applications', 'UI/UX Design', 'Conversion Optimization', 'Website Speed Optimization', 'Mobile Responsive Design'],
    slug: 'web-development',
    color: 'from-cyber-500 to-electric-500',
  },
  {
    id: 'ecommerce-growth',
    icon: ShoppingBag,
    title: 'Ecommerce Growth Division',
    description: 'Help brands sell more online with powerful ecommerce solutions.',
    services: ['Shopify Development', 'Shopify Store Design', 'Shopify Redesign', 'Shopify Partner Solutions', 'WooCommerce', 'Amazon Store Setup', 'Etsy Store Setup', 'eBay Store Setup', 'Dropshipping Stores', 'Ecommerce SEO', 'Product Marketing', 'Conversion Optimization'],
    slug: 'ecommerce-development',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'marketing-command',
    icon: Megaphone,
    title: 'Digital Marketing Command Center',
    description: 'A complete marketing department for your business.',
    services: ['SEO', 'Google Business Profile Growth', 'Google Maps Ranking', 'Facebook Ads', 'Instagram Ads', 'TikTok Ads', 'Google Ads', 'YouTube Ads', 'Email Marketing', 'SMS Marketing', 'MMS Marketing', 'Influencer Marketing', 'Content Marketing', 'Affiliate Marketing', 'Social Media Management'],
    slug: 'digital-marketing',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'seo-growth',
    icon: Search,
    title: 'Search Engine Growth Division',
    description: 'Dedicated SEO department for organic dominance.',
    services: ['Technical SEO Audit', 'On-Page SEO', 'Off-Page SEO', 'Local SEO', 'Google Business Profile', 'Google Maps Ranking', 'Keyword Research', 'Backlink Strategy', 'Content SEO', 'Schema Markup', 'Core Web Vitals', 'Sitemap Generation'],
    slug: 'seo',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'ai-automation',
    icon: Bot,
    title: 'AI Automation Division',
    description: 'The future of business automation.',
    services: ['AI Chatbots', 'AI Customer Support', 'AI Sales Assistant', 'AI Lead Qualification', 'AI Workflow Automation', 'AI Content Systems', 'Business Process Automation'],
    slug: 'ai-automation',
    color: 'from-purple-500 to-violet-500',
  },
  {
    id: 'cybersecurity',
    icon: ShieldCheck,
    title: 'Cybersecurity Division',
    description: 'The biggest BitSecureX advantage.',
    services: ['Website Security Audit', 'Penetration Testing', 'Web Vulnerability Assessment', 'Malware Detection', 'Security Hardening', 'SSL Implementation', 'Network Security Assessment', 'Cybersecurity Consulting'],
    slug: 'cybersecurity',
    color: 'from-red-500 to-rose-500',
  },
  {
    id: 'business-intelligence',
    icon: Brain,
    title: 'Business Growth Intelligence',
    description: 'Smarter decisions for better growth.',
    services: ['Competitor Analysis', 'Market Research', 'Growth Strategy', 'Customer Research', 'Analytics Setup', 'Conversion Tracking', 'Business Consultation'],
    slug: 'digital-marketing',
    color: 'from-teal-500 to-emerald-500',
  },
  {
    id: 'creator-media',
    icon: Star,
    title: 'Creator and Media Promotion Division',
    description: 'Helping creators and brands grow visibility.',
    services: ['YouTube Promotion', 'Music Promotion', 'Ebook Promotion', 'BookTok Promotion', 'TikTok Promotion', 'Influencer Campaigns', 'Blog Promotion', 'Guest Posting'],
    slug: 'content-marketing',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    id: 'game-development',
    icon: Gamepad2,
    title: 'Game Development Division',
    description: 'Building immersive gaming experiences.',
    services: ['Game Development', 'Unity Game Development', 'Unreal Engine Game Development', '2D and 3D Game Design', 'Game Optimization', 'Mobile Game Development', 'PC Game Development'],
    slug: 'game-development',
    color: 'from-green-500 to-emerald-500',
  },
];

const stats = [
  { value: '655+', label: 'Projects Completed', icon: Code2 },
  { value: '200+', label: 'SEO Campaigns', icon: Search },
  { value: '100+', label: 'Security Audits', icon: ShieldCheck },
  { value: '98%', label: 'Client Retention', icon: TrendingUp },
  { value: '10+', label: 'Countries Served', icon: Globe2 },
  { value: '4.8/5', label: 'Client Satisfaction', icon: Star },
];

const advantages = [
  { icon: ShieldCheck, title: 'Free Website Audit', desc: 'Comprehensive security and performance review.' },
  { icon: Search, title: 'Free SEO Audit', desc: 'Full SEO analysis with actionable insights.' },
  { icon: Code2, title: 'Free Homepage Mockup', desc: 'Visual preview before you commit.' },
  { icon: Users, title: 'Free Digital Growth Consultation', desc: 'Strategy session with our experts.' },
  { icon: Rocket, title: 'Startup Growth Package', desc: 'Special offers for early-stage businesses.' },
  { icon: Sparkles, title: 'Seasonal Promotions', desc: 'Limited-time offers on select services.' },
];

// ============================================================
// COMPONENT
// ============================================================
export function DigitalEcosystemPage() {
  const nav = useNavigate();
  const [clientLogos, setClientLogos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogos = async () => {
      const { data } = await supabase
        .from('client_logos')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      setClientLogos(data || []);
      setLoading(false);
    };
    fetchLogos();
  }, []);

  return (
    <>
      <SEO
        title="Digital Ecosystem | The Secure Growth Engine | BitSecureX Tech"
        description="BitSecureX is a complete digital growth and technology ecosystem. Build, secure, market, automate, and scale your business with our 9 divisions."
        keywords="digital ecosystem, digital growth, technology ecosystem, cybersecurity, AI automation, digital marketing, web development"
        url="https://bitsecurex.tech/ecosystem"
        type="website"
      />

      <div className="pt-28">
        {/* HERO */}
        <section className="section-pad pb-10 relative overflow-hidden min-h-[70vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <img
              src="/anim.gif"
              alt="BitSecureX Ecosystem"
              className="w-full h-full object-cover opacity-30"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/60 to-navy-950/90" />
          </div>

          <div className="container-x relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Reveal>
                <span className="eyebrow text-electric-400">BitSecureX Digital Ecosystem</span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  The Secure Growth Engine <br />
                  <span className="gradient-text">For Businesses In The Digital Era</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
                  BitSecureX is not simply a service provider. We are a complete digital infrastructure
                  partner helping businesses build, secure, market, automate, and scale.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button onClick={() => nav('/contact')} className="btn-primary">
                    Join the Ecosystem <ArrowRight className="h-4 w-4" />
                  </button>
                  <button onClick={() => nav('/services')} className="btn-ghost">
                    Explore Divisions
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="section-dark section-pad py-8 border-t border-white/5">
          <div className="container-x">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {stats.map((stat, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="text-center">
                    <stat.icon className="mx-auto h-6 w-6 text-cyber-400" />
                    <p className="mt-2 font-display text-2xl font-bold gradient-text sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 9 DIVISIONS */}
        <section className="section-pad py-10 bg-gradient-to-b from-navy-950 to-navy-900">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Our Ecosystem</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
                  9 Divisions, <span className="gradient-text">One Mission</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mx-auto mt-3 max-w-2xl text-slate-400">
                  Each division is a specialized department working together to deliver complete digital solutions.
                </p>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {divisions.map((div, i) => {
                const Icon = div.icon;
                return (
                  <Reveal key={i} delay={i * 60}>
                    <button
                      onClick={() => nav(`/services/${div.slug}`)}
                      className="group relative h-full w-full rounded-2xl glass p-6 text-left transition-all hover:-translate-y-1 hover:border-cyber-500/30"
                    >
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${div.color} opacity-0 transition-opacity group-hover:opacity-5`} />
                      <div className="relative">
                        <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-cyber-500/20 to-electric-500/20 ring-1 ring-cyber-500/30">
                          <Icon className="h-6 w-6 text-cyber-400" />
                        </span>
                        <h3 className="mt-4 font-display text-lg font-semibold text-white">{div.title}</h3>
                        <p className="mt-1 text-sm text-slate-400">{div.description}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {div.services.slice(0, 4).map((service, j) => (
                            <span key={j} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
                              {service}
                            </span>
                          ))}
                          {div.services.length > 4 && (
                            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
                              +{div.services.length - 4}
                            </span>
                          )}
                        </div>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyber-400 transition-transform group-hover:translate-x-1">
                          Explore <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* CLIENT LOGOS */}
        <section className="section-white section-pad">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow-dark">Trusted By</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="section-title-dark mt-4 underline-accent inline-block">
                  Our Clients
                </h2>
              </Reveal>
            </div>

            {loading ? (
              <div className="mt-8 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-cyber-400" />
              </div>
            ) : clientLogos.length === 0 ? (
              <p className="mt-8 text-center text-slate-400">No client logos added yet.</p>
            ) : (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-8 opacity-70">
                {clientLogos.map((logo) => (
                  <div key={logo.id} className="flex items-center gap-2">
                    <img
                      src={logo.logo_url}
                      alt={logo.name}
                      className="max-h-12 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* TECHNOLOGY PARTNERS */}
        <section className="section-light section-pad">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow-dark">Technology Partners</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="section-title-dark mt-4 underline-accent inline-block">
                  Built With Trusted Platforms
                </h2>
              </Reveal>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 opacity-60">
              {[
                { name: 'Google Cloud' },
                { name: 'AWS' },
                { name: 'Shopify' },
                { name: 'Stripe' },
                { name: 'Supabase' },
                { name: 'GitHub' },
                { name: 'EC-Council' },
                { name: 'CompTIA' },
              ].map((partner, i) => (
                <Reveal key={i} delay={i * 30}>
                  <span className="text-sm font-medium text-slate-600">{partner.name}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* BUSINESS ADVANTAGE PROGRAM */}
        <section className="section-dark section-pad">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow text-electric-400">BitSecureX Business Advantage Program</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="section-title-light mt-4">
                  Unlock Your <span className="gradient-text">Growth Potential</span>
                </h2>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {advantages.map((adv, i) => {
                const Icon = adv.icon;
                return (
                  <Reveal key={i} delay={i * 60}>
                    <div className="glass rounded-2xl p-6 card-hover text-center">
                      <Icon className="mx-auto h-8 w-8 text-cyber-400" />
                      <h3 className="mt-3 font-display text-base font-semibold text-white">{adv.title}</h3>
                      <p className="mt-1 text-sm text-slate-400">{adv.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <div className="mt-10 text-center">
              <button onClick={() => nav('/offers')} className="btn-primary">
                Explore All Offers <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* FOUNDER MESSAGE */}
        <section className="section-white section-pad">
          <div className="container-x">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <Reveal>
                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-cyber-500/20 to-electric-500/20 blur-2xl opacity-50" />
                  <img
                    src="/founder.jpg"
                    alt="Daniel Ganiyu - Founder & CEO"
                    className="relative rounded-2xl w-full object-cover max-h-[500px] shadow-2xl"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              </Reveal>
              <Reveal delay={100}>
                <span className="eyebrow-dark text-cyber-600">Leadership</span>
                <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
                  A Message From Our <span className="gradient-text-dark">Founder</span>
                </h2>
                <div className="mt-4 space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    "At BitSecureX, we believe in your vision and leverage our extensive expertise to bring it to life. Our success is not defined only by numbers or projects, but by the impact we create."
                  </p>
                  <p>
                    "We are transforming ideas into digital power, helping businesses adapt, grow, and thrive in this rapidly changing world. Each step forward is built on the dedication, creativity, and passion of our incredible team."
                  </p>
                </div>
                <div className="mt-6 border-l-4 border-cyber-500 pl-4">
                  <p className="text-sm italic text-slate-600">
                    "Security is not just about protecting what you have today; it is about building the confidence to create what comes next."
                  </p>
                  <p className="mt-1 text-xs font-medium text-cyber-600"> Daniel Ganiyu, Founder & CEO</p>
                </div>
                <button onClick={() => nav('/about')} className="btn-ghost-dark mt-6">
                  Learn More About Us <ArrowRight className="h-4 w-4" />
                </button>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="section-dark section-pad">
          <div className="container-x">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl glass-strong p-10 text-center lg:p-16">
                <div className="absolute inset-0 bg-grid bg-grid opacity-20" />
                <div className="absolute -top-20 left-1/2 h-60 w-[600px] -translate-x-1/2 rounded-full bg-radial-glow blur-2xl" />
                <div className="relative">
                  <Rocket className="mx-auto h-10 w-10 text-electric-500" />
                  <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                    Ready to <span className="gradient-text">Join the Ecosystem?</span>
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-slate-400">
                    Let's build, secure, market, automate, and scale your business together.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button onClick={() => nav('/contact')} className="btn-primary">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </button>
                    <button onClick={() => nav('/services')} className="btn-ghost">
                      Explore All Services
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
export default DigitalEcosystemPage;