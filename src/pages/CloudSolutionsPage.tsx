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
  Cloud,
  Server,
  Database,
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
  HardDrive,
  Cpu,
} from 'lucide-react';

export function CloudSolutionsPage() {
  const nav = useNavigate();

  // ============================================================
  // DATA
  // ============================================================
  const services = [
    {
      icon: Cloud,
      title: 'Cloud Migration',
      description: 'Seamlessly migrate your applications and data to the cloud with minimal downtime and maximum security.',
      features: ['Discovery & assessment', 'Migration planning', 'Seamless execution', 'Data integrity', 'Post-migration support'],
    },
    {
      icon: Server,
      title: 'Cloud Infrastructure Setup',
      description: 'Design and deploy robust cloud infrastructure tailored to your business needs and growth requirements.',
      features: ['Infrastructure design', 'Auto-scaling setup', 'Load balancing', 'Network configuration', 'Disaster recovery'],
    },
    {
      icon: Shield,
      title: 'Cloud Security',
      description: 'Protect your cloud assets with comprehensive security measures including IAM, encryption, and compliance.',
      features: ['IAM setup', 'Data encryption', 'Security monitoring', 'Compliance', 'Vulnerability scanning'],
    },
    {
      icon: Database,
      title: 'Cloud Storage Solutions',
      description: 'Secure, scalable storage solutions for all your data needs with automatic backup and disaster recovery.',
      features: ['Data backup', 'Disaster recovery', 'Data archiving', 'Version control', 'Access management'],
    },
    {
      icon: Code2,
      title: 'Cloud DevOps',
      description: 'Implement CI/CD pipelines, containerization, and automated deployments for faster, more reliable releases.',
      features: ['CI/CD pipelines', 'Containerization', 'Automated deployments', 'Monitoring', 'Infrastructure as Code'],
    },
    {
      icon: Globe,
      title: 'CDN Setup & Optimization',
      description: 'Deliver content faster to global audiences with optimized CDN configuration and edge caching.',
      features: ['CDN configuration', 'Edge caching', 'Performance optimization', 'Global delivery', 'Analytics monitoring'],
    },
  ];

  const stats = [
    { value: '99.99%', label: 'Average Uptime' },
    { value: '70%', label: 'Cost Reduction' },
    { value: '50+', label: 'Cloud Projects' },
    { value: '24/7', label: 'Monitoring' },
  ];

  const platforms = [
    'AWS',
    'Microsoft Azure',
    'Google Cloud Platform',
    'DigitalOcean',
    'Vultr',
    'Linode',
    'Cloudflare',
    'Fastly',
  ];

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'E-commerce',
    'Real Estate',
    'Education',
    'Logistics',
    'Manufacturing',
    'Retail',
    'Media',
    'Energy',
    'Government',
  ];

  const processSteps = [
    {
      icon: Target,
      title: 'Assessment & Planning',
      description: 'We analyze your existing infrastructure and create a comprehensive cloud migration plan.',
    },
    {
      icon: Cloud,
      title: 'Migration & Setup',
      description: 'We migrate your applications and data to the cloud with zero downtime and data integrity.',
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'We implement enterprise-grade security and ensure compliance with industry standards.',
    },
    {
      icon: Rocket,
      title: 'Optimization & Monitoring',
      description: 'We continuously optimize your cloud infrastructure and monitor performance 24/7.',
    },
  ];

  const faqs = [
    {
      q: 'What is cloud migration?',
      a: 'Cloud migration is the process of moving your applications, data, and infrastructure from on-premises or other cloud providers to a new cloud environment. At BitSecureX Tech, we help businesses migrate to the cloud with minimal disruption and maximum security.',
    },
    {
      q: 'How much does cloud infrastructure cost?',
      a: 'Cloud infrastructure costs vary based on your requirements. We help you optimize costs with our cost management strategies. Our cloud setup packages start from $2,000, with custom enterprise solutions available.',
    },
    {
      q: 'How long does cloud migration take?',
      a: 'Timelines vary based on complexity. Simple migrations take 2-4 weeks, while complex enterprise migrations may take 8-12 weeks. We provide a detailed timeline during the assessment phase.',
    },
    {
      q: 'What cloud platforms do you work with?',
      a: 'We are experts in AWS, Microsoft Azure, Google Cloud Platform, DigitalOcean, Vultr, and more. We help you choose the right platform for your specific needs.',
    },
    {
      q: 'What industries have you worked with?',
      a: 'We have delivered cloud solutions across technology, healthcare, finance, e-commerce, real estate, education, logistics, manufacturing, retail, and more.',
    },
  ];

  return (
    <>
      {/* ✅ SEO – FIRST CHILD INSIDE THE FRAGMENT */}
      <SEO
        title="Cloud Solutions Agency | Cloud Infrastructure Services | BitSecureX Tech"
        description="BitSecureX Tech offers expert cloud solutions including cloud migration, infrastructure setup, cloud security, DevOps, and CDN optimization. Scale your business with secure, reliable cloud infrastructure."
        keywords="cloud solutions, cloud migration, cloud infrastructure, cloud security, DevOps, CDN, cloud computing, AWS, Azure, Google Cloud"
        url="https://bitsecurex.tech/cloud-solutions"
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
                <span className="eyebrow text-electric-400">Cloud Solutions Agency</span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Cloud Solutions <span className="gradient-text">That Scale</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
                  BitSecureX Tech helps you build, migrate, and optimize cloud infrastructure that scales
                  with your business. From cloud migration and security to DevOps and CDN optimization,
                  we deliver enterprise-grade cloud solutions.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button onClick={() => nav('/contact')} className="btn-primary">
                    Get Free Cloud Consultation <ArrowRight className="h-4 w-4" />
                  </button>
                  <button onClick={() => nav('/tools')} className="btn-ghost">
                    <Cloud className="h-4 w-4" /> Explore Cloud Solutions
                  </button>
                </div>
              </Reveal>
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
                  Complete <span className="gradient-text">Cloud Solutions</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  BitSecureX Tech provides end-to-end cloud services to help you build, migrate, and
                  optimize your cloud infrastructure.
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
                <span className="eyebrow">Cloud Platforms</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  Multi-Cloud <span className="gradient-text">Expertise</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  We are experts across all major cloud platforms, helping you choose the right solution
                  for your business needs.
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
                  Cloud for Every <span className="gradient-text">Industry</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  BitSecureX Tech has delivered cloud solutions across 30+ industries.
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
                  How We <span className="gradient-text">Build Your Cloud</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  A proven process that delivers reliable, secure, and scalable cloud infrastructure.
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
                  Enterprise-Grade <span className="gradient-text">Cloud Security</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  Every cloud solution we build is engineered with enterprise-grade security to protect your
                  data and ensure compliance.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Shield, label: 'IAM & Access Control' },
                { icon: Lock, label: 'End-to-End Encryption' },
                { icon: Server, label: 'DDoS Protection' },
                { icon: CheckCircle2, label: 'Compliance Ready' },
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
                    Ready to <span className="gradient-text">Scale with the Cloud?</span>
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-slate-400">
                    Get a free, no-obligation cloud consultation and discover how BitSecureX Tech can help
                    you build, migrate, and optimize your cloud infrastructure.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button onClick={() => nav('/contact')} className="btn-primary">
                      Get Free Cloud Consultation <ArrowRight className="h-4 w-4" />
                    </button>
                    <button onClick={() => nav('/services')} className="btn-ghost">
                      <Cloud className="h-4 w-4" /> Explore All Services
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
export default CloudSolutionsPage;