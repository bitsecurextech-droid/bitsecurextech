import { useEffect } from 'react';
import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { useNavigate } from '../lib/router';
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Target,
  Users,
  TrendingUp,
  BarChart3,
  ShoppingBag,
  ShoppingCart,
  Store,
  Shield,
  Rocket,
  Star,
  X,
  Eye,
  Calendar,
  DollarSign,
  PieChart,
  Award,
  MessageCircle,
  Sparkles,
  Crown,
  Code2,
  Globe,
  Lock,
  Gauge,
  Layers,
  Network,
  Smartphone,
  Package,
  Truck,
  CreditCard,
} from 'lucide-react';

export function EcommerceDevelopmentPage() {
  const nav = useNavigate();

  // ============================================================
  // DATA
  // ============================================================
  const services = [
    {
      icon: Store,
      title: 'Shopify Store Setup',
      description: 'Complete Shopify store setup including design, product catalog, payment integration, and launch.',
      features: ['Store design', 'Product catalog', 'Payment setup', 'Shipping configuration', 'Launch and optimization'],
    },
    {
      icon: ShoppingBag,
      title: 'Shopify Store Design and Redesign',
      description: 'Custom Shopify store designs that reflect your brand and drive conversions.',
      features: ['Custom theme design', 'Mobile responsive', 'Brand identity', 'User experience', 'Conversion focus'],
    },
    {
      icon: Code2,
      title: 'Shopify Theme Customization',
      description: 'Customize existing Shopify themes or build custom themes tailored to your brand and business needs.',
      features: ['Theme customization', 'Custom code', 'App integration', 'Performance optimization', 'Custom features'],
    },
    {
      icon: Layers,
      title: 'Shopify App Integration',
      description: 'Integrate essential apps for marketing, automation, inventory, and customer support.',
      features: ['App selection', 'Custom integration', 'Workflow automation', 'Inventory sync', 'Performance monitoring'],
    },
    {
      icon: CreditCard,
      title: 'Payment and Checkout Optimization',
      description: 'Optimize your checkout flow to reduce cart abandonment and increase conversion rates.',
      features: ['Multiple payment gateways', 'Checkout optimization', 'Cart abandonment recovery', 'Security compliance', 'Seamless user experience'],
    },
    {
      icon: TrendingUp,
      title: 'Ecommerce Growth Strategy',
      description: 'Comprehensive growth strategies including marketing, SEO, and conversion optimization for your store.',
      features: ['Marketing strategy', 'SEO optimization', 'Conversion optimization', 'Customer retention', 'Analytics tracking'],
    },
  ];

  const stats = [
    { value: '210%', label: 'Average Revenue Increase' },
    { value: '75%', label: 'Conversion Rate Improvement' },
    { value: '50+', label: 'Stores Launched' },
    { value: '98%', label: 'Client Satisfaction' },
  ];

  const platforms = [
    'Shopify',
    'Shopify Plus',
    'Amazon',
    'Etsy',
    'eBay',
    'Poshmark',
    'WooCommerce',
    'BigCommerce',
  ];

  const industries = [
    'Fashion and Apparel',
    'Electronics',
    'Health and Beauty',
    'Home and Furniture',
    'Food and Beverage',
    'Sports and Outdoors',
    'Books and Media',
    'Toys and Games',
    'Automotive',
    'Jewelry and Accessories',
    'Pet Supplies',
    'Dropshipping',
  ];

  const processSteps = [
    {
      icon: Target,
      title: 'Discovery and Strategy',
      description: 'We understand your products, audience, and goals to create a winning ecommerce strategy.',
    },
    {
      icon: Store,
      title: 'Store Design and Development',
      description: 'We design and build your online store with custom features and seamless functionality.',
    },
    {
      icon: Layers,
      title: 'App Integration and Optimization',
      description: 'We integrate essential apps and optimize your store for maximum conversions.',
    },
    {
      icon: Rocket,
      title: 'Launch and Growth',
      description: 'We launch your store, monitor performance, and provide ongoing growth strategies.',
    },
  ];

  const faqs = [
    {
      q: 'How much does an ecommerce store cost?',
      a: 'Store development costs vary based on complexity and features. Our Shopify store packages start from $3,000 for a basic store, $5,000 for a custom design, and $10,000 and up for enterprise solutions with custom features and integrations. Contact us for a custom quote.',
    },
    {
      q: 'How long does it take to build an ecommerce store?',
      a: 'Timelines vary based on complexity. A basic Shopify store takes three to six weeks, a custom-designed store takes six to ten weeks, and an enterprise solution with custom features takes ten to sixteen weeks. We provide a detailed timeline during the discovery phase.',
    },
    {
      q: 'Can you help with Amazon and Etsy stores?',
      a: 'Yes. We offer multi-channel ecommerce solutions including Amazon, Etsy, eBay, and Poshmark store setup, optimization, and growth strategies.',
    },
    {
      q: 'Do you provide ongoing support and maintenance?',
      a: 'Yes. We offer comprehensive maintenance plans including regular updates, performance monitoring, security patches, and technical support to keep your store running smoothly.',
    },
    {
      q: 'What industries have you worked with?',
      a: 'We have delivered ecommerce stores across fashion, electronics, health and beauty, home and furniture, food and beverage, sports, books, toys, automotive, jewelry, pet supplies, and dropshipping.',
    },
  ];

  return (
    <>
      {/* ✅ SEO – FIRST CHILD INSIDE THE FRAGMENT */}
      <SEO
        title="Ecommerce Development Agency | Shopify & Online Store Solutions | BitSecureX Tech"
        description="BitSecureX Tech offers expert ecommerce development services including Shopify store setup, custom theme development, payment integration, and ecommerce growth strategies. Launch and scale your online store with our proven solutions."
        keywords="ecommerce development, Shopify store, online store, ecommerce growth, Shopify partner, Amazon store, Etsy shop, payment integration"
        url="https://bitsecurex.tech/ecommerce-development"
        type="website"
      />

      <div className="pt-28">
        {/* HERO */}
        <section className="section-pad pb-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid bg-grid opacity-20" />
          <div className="absolute -top-20 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-radial-glow blur-2xl" />
          <div className="container-x relative">
            <div className="max-w-4xl mx-auto text-center">
              <Reveal>
                <span className="eyebrow text-electric-400">Ecommerce Development Agency</span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Ecommerce <span className="gradient-text">That Converts</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
                  BitSecureX Tech builds high-converting ecommerce stores that drive sales and scale your business. From Shopify store setup and custom theme development to payment integration and growth strategies, we deliver comprehensive ecommerce solutions.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button onClick={() => nav('/contact')} className="btn-primary">
                    Get Free Ecommerce Consultation <ArrowRight className="h-4 w-4" />
                  </button>
                  <button onClick={() => nav('/tools')} className="btn-ghost">
                    <ShoppingBag className="h-4 w-4" /> Explore Ecommerce Solutions
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* TRUST & RATINGS */}
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
                  <p className="text-xs text-slate-400">Happy Clients</p>
                </div>
              </div>

              <div className="h-8 w-px bg-white/10" />

              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-cyber-400" />
                <div>
                  <p className="text-2xl font-bold text-white">4.72</p>
                  <p className="text-xs text-slate-400">Average Ecommerce Score</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="section-pad py-8">
          <div className="container-x">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="glass card-hover rounded-2xl p-5 text-center">
                    <p className="font-display text-3xl font-bold gradient-text sm:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-slate-400 sm:text-sm">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section-pad py-10 bg-navy-800/50">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Our Services</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  Complete <span className="gradient-text">Ecommerce Solutions</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  BitSecureX Tech provides end-to-end ecommerce development services to help you launch, grow, and scale your online store.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="glass rounded-2xl p-6 card-hover h-full">
                    <service.icon className="h-8 w-8 text-cyber-400" />
                    <h3 className="mt-4 font-display text-lg font-semibold text-white">{service.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{service.description}</p>
                    <ul className="mt-4 space-y-1.5">
                      {service.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="h-3.5 w-3.5 text-electric-500 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PLATFORMS */}
        <section className="section-pad py-10">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Ecommerce Platforms</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  Multi-Platform <span className="gradient-text">Expertise</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  We are experts across all major ecommerce platforms, helping you choose the right solution for your online store.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {platforms.map((platform, i) => (
                <Reveal key={i} delay={i * 30}>
                  <span className="glass rounded-full px-5 py-2.5 text-sm text-slate-300 hover:border-cyber-400/50 hover:text-white transition-colors">
                    {platform}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* INDUSTRIES */}
        <section className="section-pad py-10 bg-navy-800/50">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Industries</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  Ecommerce for Every <span className="gradient-text">Industry</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  BitSecureX Tech has built ecommerce stores across 40-plus industries.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {industries.map((industry, i) => (
                <Reveal key={i} delay={i * 30}>
                  <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-slate-300 hover:border-cyber-400/50 hover:text-white transition-colors">
                    {industry}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="section-pad py-10">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Our Process</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  How We <span className="gradient-text">Build Your Store</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  A proven process that delivers high-converting ecommerce stores on time and within budget.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="glass rounded-2xl p-6 card-hover text-center h-full">
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-cyber-500/20 to-electric-500/20 ring-1 ring-cyber-500/30 mx-auto">
                      <step.icon className="h-7 w-7 text-cyber-400" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{step.description}</p>
                    <span className="mt-4 inline-block text-xs font-medium text-cyber-400">
                      Step {i + 1} of 4
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECURITY */}
        <section className="section-pad py-10 bg-navy-800/50">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Security First</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  Secure and <span className="gradient-text">Trustworthy</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  Every ecommerce store we build is engineered with enterprise-grade security to protect your business and your customers.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Shield, label: 'PCI-DSS Compliant' },
                { icon: Lock, label: 'SSL Encryption' },
                { icon: CreditCard, label: 'Secure Checkout' },
                { icon: CheckCircle2, label: 'Fraud Protection' },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="glass rounded-2xl p-5 text-center">
                    <item.icon className="h-8 w-8 text-cyber-400 mx-auto" />
                    <p className="mt-3 text-sm font-medium text-white">{item.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-pad py-10">
          <div className="container-x max-w-3xl mx-auto">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">FAQ</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  Frequently Asked <span className="gradient-text">Questions</span>
                </h2>
              </Reveal>
            </div>
            <div className="mt-10 space-y-4">
              {faqs.map((faq, i) => (
                <Reveal key={i} delay={i * 60}>
                  <details className="glass rounded-2xl p-6 group">
                    <summary className="flex cursor-pointer items-center justify-between list-none">
                      <h3 className="font-display text-base font-semibold text-white">{faq.q}</h3>
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cyber-500/15 text-cyber-400 transition-transform group-open:rotate-45">
                        <X className="h-4 w-4 rotate-45" />
                      </span>
                    </summary>
                    <p className="mt-4 text-sm text-slate-400">{faq.a}</p>
                  </details>
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
                  <Rocket className="mx-auto h-10 w-10 text-electric-500" />
                  <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                    Ready to <span className="gradient-text">Launch Your Store?</span>
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-slate-400">
                    Get a free, no-obligation ecommerce consultation and discover how BitSecureX Tech can help you build a high-converting online store that drives sales and scales your business.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button onClick={() => nav('/contact')} className="btn-primary">
                      Get Free Ecommerce Consultation <ArrowRight className="h-4 w-4" />
                    </button>
                    <button onClick={() => nav('/services')} className="btn-ghost">
                      <ShoppingBag className="h-4 w-4" /> Explore All Services
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
export default EcommerceDevelopmentPage;