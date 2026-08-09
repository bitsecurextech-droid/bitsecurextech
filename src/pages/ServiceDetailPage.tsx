import { useEffect } from 'react';
import { useRoute, useNavigate } from '../lib/router';
import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { Loader2, ArrowRight, Zap, X, CheckCircle2, Shield, Code2, Megaphone, ShoppingBag } from 'lucide-react';
import { coreServices } from '../lib/data';

// Map category to icon
const categoryIcons: Record<string, any> = {
  Technology: Code2,
  Marketing: Megaphone,
  Security: Shield,
  Commerce: ShoppingBag,
};

export function ServiceDetailPage() {
  const route = useRoute();
  const nav = useNavigate();
  const slug = route.params?.slug || window.location.pathname.replace('/services/', '');
  
  // Find the service from static data
  const page = coreServices.find((s) => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!page) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-28 text-center">
        <h1 className="text-4xl font-display text-white">Service Not Found</h1>
        <p className="text-slate-400 mt-4">The service you are looking for does not exist.</p>
        <button onClick={() => nav('/services')} className="btn-primary mt-6">
          View All Services <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  const CategoryIcon = categoryIcons[page.category as keyof typeof categoryIcons] || Code2;

  // Sub-services from the service data
  const subServices = page.subServices || [];

  return (
    <>
      {/* ✅ SEO – DYNAMIC BASED ON SERVICE */}
      <SEO
        title={`${page.title} Agency | BitSecureX Tech`}
        description={page.description || `${page.title} services from BitSecureX Tech. Expert solutions tailored to your business needs.`}
        keywords={`${page.title.toLowerCase()}, ${page.category.toLowerCase()}, digital solutions, BitSecureX Tech`}
        url={`https://bitsecurex.tech/services/${page.slug}`}
        type="website"
      />

      <div className="pt-28">
        {/* Hero */}
        <section className="section-pad pb-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid bg-grid opacity-20" />
          <div className="absolute -top-20 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-radial-glow blur-2xl" />
          <div className="container-x relative">
            <div className="max-w-3xl mx-auto text-center">
              <Reveal>
                <span className="eyebrow">{page.category}</span>
              </Reveal>
              <Reveal delay={80}>
                <div className="flex items-center justify-center gap-3 mt-4">
                  <CategoryIcon className="h-10 w-10 text-cyber-400" />
                  <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                    {page.title}
                  </h1>
                </div>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 text-lg text-slate-400 leading-relaxed">{page.description}</p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button onClick={() => nav('/contact')} className="btn-primary">
                    Get Free Consultation <ArrowRight className="h-4 w-4" />
                  </button>
                  <button onClick={() => nav('/services')} className="btn-ghost">
                    View All Services
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Sub-Services Section */}
        {subServices && subServices.length > 0 && (
          <section className="section-pad py-10 bg-navy-800/50">
            <div className="container-x">
              <div className="text-center">
                <Reveal>
                  <span className="eyebrow">Our Services</span>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="mt-4 font-display text-3xl font-bold text-white">
                    What We Offer in <span className="gradient-text">{page.title}</span>
                  </h2>
                </Reveal>
                <Reveal delay={160}>
                  <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                    Explore our comprehensive range of {page.title.toLowerCase()} services designed to help you grow and succeed.
                  </p>
                </Reveal>
              </div>
              <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {subServices.map((sub: any, i: number) => (
                  <Reveal key={i} delay={i * 40}>
                    <div className="glass rounded-2xl p-5 card-hover">
                      <div className="flex items-start gap-3">
                        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-cyber-500/15 text-cyber-400 font-display text-xs font-bold">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <div>
                          <h3 className="font-display text-sm font-semibold text-white">
                            {sub.label}
                          </h3>
                          {sub.description && (
                            <p className="mt-1 text-xs text-slate-400">
                              {sub.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        {page.features && page.features.length > 0 && (
          <section className="section-pad py-10">
            <div className="container-x">
              <div className="text-center">
                <Reveal>
                  <span className="eyebrow">Key Capabilities</span>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="mt-4 font-display text-3xl font-bold text-white">
                    What We <span className="gradient-text">Deliver</span>
                  </h2>
                </Reveal>
                <Reveal delay={160}>
                  <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                    Our {page.title.toLowerCase()} services are built on a foundation of excellence, innovation, and security.
                  </p>
                </Reveal>
              </div>
              <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {page.features.map((feature: string, i: number) => (
                  <Reveal key={i} delay={i * 60}>
                    <div className="glass rounded-2xl p-5 flex items-start gap-3 card-hover">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-electric-500 mt-0.5" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Process / How We Work */}
        <section className="section-pad py-10 bg-navy-800/50">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Our Process</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  How We <span className="gradient-text">Work</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  A proven, transparent process that delivers exceptional results for our clients.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: CheckCircle2, title: 'Discovery', desc: 'We understand your business, goals, and challenges.' },
                { icon: Zap, title: 'Strategy', desc: 'We create a tailored plan to achieve your objectives.' },
                { icon: Code2, title: 'Execution', desc: 'We deliver high-quality solutions with precision and care.' },
                { icon: Shield, title: 'Support', desc: 'We provide ongoing support to ensure your success.' },
              ].map((step, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="glass rounded-2xl p-6 card-hover text-center h-full">
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-cyber-500/20 to-electric-500/20 ring-1 ring-cyber-500/30 mx-auto">
                      <step.icon className="h-7 w-7 text-cyber-400" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{step.desc}</p>
                    <span className="mt-4 inline-block text-xs font-medium text-cyber-400">
                      Step {i + 1} of 4
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
              <div className="relative overflow-hidden rounded-3xl glass-strong p-10 text-center lg:p-16">
                <div className="absolute inset-0 bg-grid bg-grid opacity-20" />
                <div className="absolute -top-20 left-1/2 h-60 w-[600px] -translate-x-1/2 rounded-full bg-radial-glow blur-2xl" />
                <div className="relative">
                  <Zap className="mx-auto h-10 w-10 text-electric-500" />
                  <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                    Ready to <span className="gradient-text">Get Started?</span>
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-slate-400">
                    Contact us today for a free consultation tailored to your needs.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button onClick={() => nav('/contact')} className="btn-primary">
                      Get Your Free Consultation <ArrowRight className="h-4 w-4" />
                    </button>
                    <button onClick={() => nav('/services')} className="btn-ghost">
                      View All Services
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

export default ServiceDetailPage;