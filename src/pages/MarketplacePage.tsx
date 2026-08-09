import { useState } from 'react';
import { ShoppingBag, Star, Users, ArrowRight, Tag, ShieldCheck, Zap, Globe } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { useNavigate } from '../lib/router';

// Mock data for the marketplace (You will replace this with Supabase later)
const marketplaceItems = [
  {
    id: 1,
    title: 'Premium E-commerce Store Template',
    description: 'A fully responsive, SEO-optimized React + Tailwind e-commerce starter kit with Stripe integration.',
    price: '$499',
    category: 'Web Templates',
    rating: 4.9,
    sales: 124,
    image: 'https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg?auto=compress&w=600',
  },
  {
    id: 2,
    title: 'AI-Powered Chatbot Plugin',
    description: 'Integrate an intelligent OpenAI chatbot into your website in under 5 minutes.',
    price: '$299',
    category: 'Software',
    rating: 5.0,
    sales: 87,
    image: 'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&w=600',
  },
  {
    id: 3,
    title: 'Security Audit Service',
    description: 'Complete penetration testing and vulnerability assessment for your web application.',
    price: '$1,200',
    category: 'Services',
    rating: 5.0,
    sales: 45,
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&w=600',
  },
];

export function MarketplacePage() {
  const nav = useNavigate();

  return (
    <>
      <SEO
        title="Marketplace | BitSecureX Tech"
        description="Buy premium digital products, web templates, software tools, and security services from BitSecureX Tech."
        keywords="marketplace, digital products, web templates, software, security services"
        url="https://bitsecurex.tech/marketplace"
        type="website"
      />

      <div className="pt-28">
        {/* Hero */}
        <section className="section-pad pb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid bg-grid opacity-20" />
          <div className="absolute -top-20 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-radial-glow blur-2xl" />
          <div className="container-x relative text-center">
            <Reveal>
              <span className="eyebrow">Marketplace</span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Digital Products, <span className="gradient-text">Source Code & Services</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
                Premium web templates, software tools, and expert security services. Built by us, ready for you.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Categories */}
        <section className="section-pad py-4 border-b border-white/5">
          <div className="container-x">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {['All', 'Web Templates', 'Software', 'Services'].map((c) => (
                <button key={c} className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-slate-400 hover:text-white hover:border-cyber-400/50 transition-colors">
                  {c}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="section-pad py-10">
          <div className="container-x">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {marketplaceItems.map((item, i) => (
                <Reveal key={item.id} delay={i * 80}>
                  <div className="group relative overflow-hidden rounded-2xl glass card-hover hover:-translate-y-1 transition-all">
                    <div className="relative h-48 overflow-hidden">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-110 group-hover:opacity-90" />
                      <span className="absolute left-3 top-3 rounded-full bg-navy-950/80 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                        <Tag className="inline h-3 w-3 mr-1" /> {item.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                        <span className="font-display text-lg font-bold text-electric-400">{item.price}</span>
                      </div>
                      <p className="mt-2 text-sm text-slate-400 line-clamp-2">{item.description}</p>
                      <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" /> {item.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" /> {item.sales} sold
                        </span>
                      </div>
                      <button className="btn-primary w-full mt-4 py-2.5 text-sm">
                        Buy Now <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}