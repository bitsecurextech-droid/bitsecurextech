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
  Boxes,
  Layers,
  Server,
  Database,
  Cloud,
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
  Smartphone,
  Globe,
  Lock,
  Gauge,
} from 'lucide-react';

export function SoftwareSolutionsPage() {
  const nav = useNavigate();

  // ============================================================
  // DATA
  // ============================================================
  const services = [
    {
      icon: Boxes,
      title: 'Custom Software Development',
      description: 'Bespoke software solutions designed specifically for your business needs and workflows.',
      features: ['Tailored solutions', 'Scalable architecture', 'Secure by design', 'Integration ready', 'Ongoing support'],
    },
    {
      icon: Layers,
      title: 'SaaS Platform Development',
      description: 'Build and scale multi-tenant SaaS platforms with subscription billing and advanced features.',
      features: ['Multi-tenant architecture', 'Subscription billing', 'User management', 'Analytics dashboards', 'API-first design'],
    },
    {
      icon: Database,
      title: 'CRM and ERP Systems',
      description: 'Custom customer relationship management and enterprise resource planning systems.',
      features: ['Customer management', 'Sales automation', 'Inventory tracking', 'Financial reporting', 'Workflow automation'],
    },
    {
      icon: Server,
      title: 'Business Dashboards and Analytics',
      description: 'Real-time dashboards and analytics tools that help you make data-driven decisions.',
      features: ['Real-time data', 'Custom metrics', 'Interactive charts', 'Exportable reports', 'Role-based access'],
    },
    {
      icon: Code2,
      title: 'API Development and Integration',
      description: 'Build robust APIs and integrate seamlessly with third-party services and platforms.',
      features: ['REST and GraphQL APIs', 'API documentation', 'Rate limiting', 'Authentication', 'Webhook support'],
    },
    {
      icon: Globe,
      title: 'Internal Business Systems',
      description: 'Streamline operations with custom internal tools and business process automation.',
      features: ['Workflow automation', 'Process optimization', 'User management', 'Reporting', 'Integration ready'],
    },
  ];

  const stats = [
    { value: '50+', label: 'Software Projects' },
    { value: '300+', label: 'Enterprise Clients' },
    { value: '99.99%', label: 'Uptime' },
    { value: '50+', label: 'Industries Served' },
  ];

  const technologies = [
    'React',
    'Next.js',
    'Node.js',
    'TypeScript',
    'Python',
    'Supabase',
    'PostgreSQL',
    'MongoDB',
    'AWS',
    'Docker',
    'Kubernetes',
    'GraphQL',
    'REST APIs',
    'Redis',
    'ElasticSearch',
    'Kafka',
  ];

  const industries = [
    'Finance',
    'Healthcare',
    'E-commerce',
    'Logistics',
    'Real Estate',
    'Education',
    'Technology',
    'Manufacturing',
    'Retail',
    'Energy',
    'Telecommunications',
    'Insurance',
    'Automotive',
    'Media',
    'Agriculture',
    'Government',
  ];

  const processSteps = [
    {
      icon: Target,
      title: 'Discovery and Requirements',
      description: 'We work with you to understand your business needs and define clear software requirements.',
    },
    {
      icon: Layers,
      title: 'Architecture and Design',
      description: 'We design scalable architecture and user-centric interfaces for your software solution.',
    },
    {
      icon: Code2,
      title: 'Development and Testing',
      description: 'We build your software with clean code, continuous testing, and regular feedback.',
    },
    {
      icon: Rocket,
      title: 'Deployment and Support',
      description: 'We deploy your software, provide training, and offer ongoing support and maintenance.',
    },
  ];

  const faqs = [
    {
      q: 'What is custom software development?',
      a: 'Custom software development is the process of designing, building, and deploying software tailored specifically to your business needs. At BitSecureX Tech, we create bespoke solutions that address your unique challenges and workflows, unlike off-the-shelf software that tries to fit every business.',
    },
    {
      q: 'How much does custom software cost?',
      a: 'Costs vary based on complexity, features, and scope. We provide detailed quotes after understanding your requirements. Our solutions start from $5,000 for simple applications, with enterprise solutions ranging from $15,000 to $100,000 and up for complex platforms.',
    },
    {
      q: 'How long does it take to build custom software?',
      a: 'Timelines vary based on project scope and complexity. A simple application takes four to eight weeks, a SaaS platform takes twelve to twenty-four weeks, and an enterprise system takes twenty-four to forty-eight weeks. We provide a detailed timeline during the discovery phase.',
    },
    {
      q: 'What industries do you work with?',
      a: 'We work with businesses across all industries including finance, healthcare, e-commerce, logistics, real estate, education, technology, manufacturing, and more.',
    },
    {
      q: 'Do you provide ongoing software maintenance?',
      a: 'Yes. We offer comprehensive maintenance plans including bug fixes, security updates, feature enhancements, and 24/7 support to keep your software running smoothly.',
    },
  ];

  return (
    <>
      {/* ✅ SEO – FIRST CHILD INSIDE THE FRAGMENT */}
      <SEO
        title="Software Solutions Agency | Custom Software Development | BitSecureX Tech"
        description="BitSecureX Tech offers custom software development services including SaaS platforms, CRM, ERP, business dashboards, and API development. Build scalable, secure software solutions tailored to your business."
        keywords="software development, SaaS, CRM, ERP, business dashboards, API development, custom software, enterprise software"
        url="https://bitsecurex.tech/software-solutions"
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
                <span className="eyebrow text-electric-400">Software Solutions Agency</span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Custom Software <span className="gradient-text">That Scales</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
                  BitSecureX Tech builds custom software solutions that automate operations, drive efficiency, and scale with your business. From SaaS platforms and CRM systems to business dashboards and API development, we deliver enterprise-grade software tailored to your needs.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button onClick={() => nav('/contact')} className="btn-primary">
                    Get Free Software Consultation <ArrowRight className="h-4 w-4" />
                  </button>
                  <button onClick={() => nav('/tools')} className="btn-ghost">
                    <Boxes className="h-4 w-4" /> Explore Our Solutions
                  </button>
                </div>
              </Reveal>
            </div>
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
                  <p className="text-xs text-slate-400">Enterprise Clients</p>
                </div>
              </div>

              <div className="h-8 w-px bg-white/10" />

              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-cyber-400" />
                <div>
                  <p className="text-2xl font-bold text-white">4.72</p>
                  <p className="text-xs text-slate-400">Average Software Score</p>
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
                  Complete <span className="gradient-text">Software Solutions</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  BitSecureX Tech provides end-to-end software development services to help you automate, optimize, and scale your business operations.
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

        {/* TECHNOLOGIES */}
        <section className="section-pad py-10">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Technology Stack</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  Enterprise-Grade <span className="gradient-text">Technologies</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  We use the most advanced technologies to build scalable, secure, and high-performance software.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {technologies.map((tech, i) => (
                <Reveal key={i} delay={i * 30}>
                  <span className="glass rounded-full px-5 py-2.5 text-sm text-slate-300 hover:border-cyber-400/50 hover:text-white transition-colors">
                    {tech}
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
                  Software for Every <span className="gradient-text">Industry</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  BitSecureX Tech has delivered software solutions across 50-plus industries.
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
                  How We <span className="gradient-text">Build Your Software</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  A proven process that delivers exceptional software on time and within budget.
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
                  Secure by <span className="gradient-text">Design</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  Every software solution we build is engineered with enterprise-grade security to protect your data and your customers.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Shield, label: 'Zero-Trust Architecture' },
                { icon: Lock, label: 'End-to-End Encryption' },
                { icon: Server, label: 'ISO-Compliant Security' },
                { icon: CheckCircle2, label: 'Regular Security Audits' },
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
                    Ready to <span className="gradient-text">Build Your Software?</span>
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-slate-400">
                    Get a free, no-obligation software consultation and discover how BitSecureX Tech can help you automate, optimize, and scale your business with custom software.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button onClick={() => nav('/contact')} className="btn-primary">
                      Get Free Consultation <ArrowRight className="h-4 w-4" />
                    </button>
                    <button onClick={() => nav('/services')} className="btn-ghost">
                      <Boxes className="h-4 w-4" /> Explore All Services
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
export default SoftwareSolutionsPage;