import { useState } from 'react';
import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { Handshake, Shield, Award, Users, Globe, Code2, CheckCircle2, ArrowRight, Filter, Star, Cloud, Server, Zap, Lock, TrendingUp } from 'lucide-react';
import { useNavigate } from '../lib/router';

const partners = [
  // ===== CLOUD & INFRASTRUCTURE =====
  {
    name: 'Google Cloud',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
    description: 'Strategic partner for cloud infrastructure and AI solutions.',
    category: 'Cloud & Infrastructure',
  },
  {
    name: 'Microsoft Azure',
    logo: 'https://res.cloudinary.com/db5b2bks8/image/upload/v1786709034/download_eyrzjn.png',
    description: 'Partner for enterprise cloud and AI services.',
    category: 'Cloud & Infrastructure',
  },
  {
    name: 'AWS',
    logo: 'https://res.cloudinary.com/db5b2bks8/image/upload/v1786709034/AWS_gah0l1.png',
    description: 'Premier partner for cloud hosting and DevOps solutions.',
    category: 'Cloud & Infrastructure',
  },
  {
    name: 'Cloudflare',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg',
    description: 'Partner for CDN, DDoS protection, and edge computing.',
    category: 'Cloud & Infrastructure',
  },
  {
    name: 'DigitalOcean',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg',
    description: 'Partner for scalable cloud hosting and developer infrastructure.',
    category: 'Cloud & Infrastructure',
  },
  {
    name: 'Vercel',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
    description: 'Partner for frontend deployment and serverless hosting.',
    category: 'Cloud & Infrastructure',
  },

  // ===== TECHNOLOGY & DEVELOPMENT =====
  {
    name: 'GitHub',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    description: 'Partner for version control, CI/CD, and open source collaboration.',
    category: 'Technology',
  },
{
  name: 'Supabase',
  logo: 'https://res.cloudinary.com/db5b2bks8/image/upload/v1786709034/logo-preview_1_xczxfa.webp',
  description: 'Preferred partner for database and backend solutions.',
  category: 'Technology',
},

  // ===== ECOMMERCE & PAYMENTS =====
  {
    name: 'Shopify',
    logo: 'https://res.cloudinary.com/db5b2bks8/image/upload/v1786709035/shopify_de2joz.svg',
    description: 'Certified Shopify partner for ecommerce development and store optimization.',
    category: 'Ecommerce',
  },
  {
    name: 'Stripe',
    logo: 'https://res.cloudinary.com/db5b2bks8/image/upload/v1786709036/Stripe-Emblem_tzgep9.png',
    description: 'Partner for payment processing, subscription billing, and fintech solutions.',
    category: 'Fintech',
  },
  {
    name: 'PayPal',
    logo: 'https://res.cloudinary.com/db5b2bks8/image/upload/v1786709034/paypal-logo-png_seeklogo-249214_wcutxn.png',
    description: 'Partner for secure payment processing and global money transfers.',
    category: 'Fintech',
  },

  // ===== SECURITY & CERTIFICATIONS =====
  {
    name: 'EC-Council',
    logo: 'https://res.cloudinary.com/db5b2bks8/image/upload/v1786709036/eccouncilcehbadge_zkiuhi.jpg',
    description: 'Partner for CEH and ethical hacking certifications.',
    category: 'Security',
  },
  {
    name: 'CompTIA',
    logo: 'https://res.cloudinary.com/db5b2bks8/image/upload/v1786709035/How_to_get_CompTIA_Certifications1_uvy6p4.webp',
    description: 'Certification partner for cybersecurity and IT training.',
    category: 'Security',
  },
  {
    name: 'Infoshore',
    logo: '',
    description: 'Penetration testing partnership delivering comprehensive security assessments.',
    category: 'Security',
  },
  {
    name: 'Ghost-Shell',
    logo: 'https://res.cloudinary.com/db5b2bks8/image/upload/v1786709200/logo_2_vuy2vo.png',
    description: 'CEH partnership for advanced ethical hacking and penetration testing.',
    category: 'Security',
  },
  {
    name: 'Microsoft AI Cloud Partner Program',
    logo: 'https://res.cloudinary.com/db5b2bks8/image/upload/v1786709034/download_eyrzjn.png',
    description: 'Partner for AI-powered cloud solutions and enterprise intelligence.',
    category: 'Cloud & Infrastructure',
  },
];

const certifications = [
  { icon: Shield, label: 'CEH Certified', desc: 'Ethical Hacking Certification' },
  { icon: Shield, label: 'CompTIA Security+', desc: 'Security Certification' },
  { icon: Shield, label: 'CompTIA Pentest+', desc: 'Penetration Testing Certification' },
  { icon: Shield, label: 'Google Certified SEO', desc: 'SEO Certification' },
  { icon: Shield, label: 'SEMrush Certified', desc: 'Digital Marketing Certification' },
  { icon: Award, label: 'NIIT Certified', desc: 'Technology Training Certification' },
  { icon: Award, label: 'HIIT Certified', desc: 'IT and Digital Skills Certification' },
  { icon: Shield, label: 'CCNA Certified', desc: 'Cisco Certified Network Associate' },
  { icon: Shield, label: 'EC-Council Certified', desc: 'Cybersecurity and Ethical Hacking' },
  { icon: Shield, label: 'Shopify Partner', desc: 'Certified Ecommerce Development Partner' },
];

const categories = [
  'All',
  'Cloud & Infrastructure',
  'Technology',
  'Ecommerce',
  'Fintech',
  'Security',
];

export function PartnersPage() {
  const nav = useNavigate();
  const [category, setCategory] = useState('All');

  const filteredPartners = category === 'All' ? partners : partners.filter(p => p.category === category);

  return (
    <>
      <SEO
        title="Partners | Technology & Security Partnerships | BitSecureX Tech"
        description="Meet our trusted partners at BitSecureX Tech. We collaborate with industry leaders including Google Cloud, Shopify, Stripe, EC-Council, and more to deliver world-class solutions."
        keywords="partners, technology partners, Google Cloud partner, AWS partner, Shopify partner, Stripe partner, certifications, EC-Council, CompTIA"
        url="https://bitsecurex.tech/partners"
        type="website"
      />

      <div className="pt-28">
        {/* Hero */}
        <section className="section-pad pb-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid bg-grid opacity-20" />
          <div className="absolute -top-20 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-radial-glow blur-2xl" />
          <div className="container-x relative text-center">
            <Reveal>
              <span className="eyebrow text-electric-400">Partners</span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Our <span className="gradient-text">Trusted Partners</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
                We partner with industry leaders to deliver world-class solutions to our clients.
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
                      {[1,2,3,4,5].map((i) => (
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
                      {[1,2,3,4,5].map((i) => (
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
                  <p className="text-xs text-slate-400">Enterprise Clients</p>
                </div>
              </div>

              <div className="h-8 w-px bg-white/10" />

              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-cyber-400" />
                <div>
                  <p className="text-2xl font-bold text-white">4.72</p>
                  <p className="text-xs text-slate-400">Partner Satisfaction Score</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Partners Section */}
        <section className="section-pad py-6">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow text-cyber-400">Powered by Industry-Leading Technologies</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">Trusted Technologies</h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400">
                  We leverage the most trusted platforms and technologies to deliver secure, scalable, and innovative solutions for our clients.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="section-pad py-6">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Certifications</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">Our Credentials</h2>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {certifications.map((cert, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="glass rounded-2xl p-5 text-center card-hover">
                    <cert.icon className="mx-auto h-8 w-8 text-cyber-400" />
                    <p className="mt-3 font-display text-sm font-semibold text-white">{cert.label}</p>
                    <p className="mt-1 text-xs text-slate-400">{cert.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Grid */}
        <section className="section-pad py-6">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Partners</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">Who We Work With</h2>
              </Reveal>
            </div>

            {/* Filters */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    category === cat
                      ? 'bg-cyber-500 text-white'
                      : 'border border-white/10 bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredPartners.map((partner, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="glass rounded-2xl p-6 card-hover text-center">
                    {/* Circular Logo */}
                    <div className="h-20 w-20 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                      {partner.logo ? (
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="h-16 w-16 object-contain"
                          onError={(e) => {
                            // Fallback if image fails to load
                            (e.target as HTMLImageElement).style.display = 'none';
                            const parent = e.target as HTMLElement;
                            const placeholder = document.createElement('div');
                            placeholder.className = 'flex h-16 w-16 items-center justify-center rounded-full bg-cyber-500/20';
                            placeholder.innerHTML = '<span class="text-2xl font-bold text-cyber-400">' + partner.name.charAt(0) + '</span>';
                            parent.parentNode?.replaceChild(placeholder, parent);
                          }}
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyber-500/20">
                          <Handshake className="h-8 w-8 text-cyber-400" />
                        </div>
                      )}
                    </div>
                    <h3 className="mt-4 font-display text-base font-semibold text-white">{partner.name}</h3>
                    <p className="mt-2 text-sm text-slate-400">{partner.description}</p>
                    <span className="mt-3 inline-block rounded-full bg-cyber-500/15 px-3 py-1 text-xs text-cyber-200">
                      {partner.category}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-pad py-10">
          <div className="container-x">
            <Reveal>
              <div className="glass-strong rounded-3xl p-10 text-center">
                <Handshake className="mx-auto h-10 w-10 text-electric-500" />
                <h2 className="mt-4 font-display text-2xl font-bold text-white">Become a Partner</h2>
                <p className="mt-3 text-slate-400">Let's collaborate and build something great together.</p>
                <button onClick={() => nav('/contact')} className="btn-primary mt-6">
                  Partner With Us <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
export default PartnersPage;
