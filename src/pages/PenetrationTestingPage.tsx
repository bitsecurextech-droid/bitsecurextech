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
  Shield,
  Lock,
  Bug,
  Crosshair,
  Eye,
  Rocket,
  Star,
  X,
  Calendar,
  DollarSign,
  Award,
  MessageCircle,
  Crown,
  Code2,
  Globe,
  Server,
  Smartphone,
  Network,
  FileCheck,
  AlertTriangle,
  Scan,
  Key,
  Handshake,
} from 'lucide-react';

export function PenetrationTestingPage() {
  const nav = useNavigate();

  // ============================================================
  // DATA
  // ============================================================
  const services = [
    {
      icon: Code2,
      title: 'Web Application Penetration Testing',
      description: 'Comprehensive security testing of your web applications aligned with OWASP Top 10 and industry standards.',
      features: ['OWASP Top 10 testing', 'Injection attacks', 'Authentication testing', 'Session management', 'Business logic testing'],
    },
    {
      icon: Network,
      title: 'API Penetration Testing',
      description: 'Identify vulnerabilities in REST, GraphQL, and SOAP APIs that could expose sensitive data or functionality.',
      features: ['REST API testing', 'GraphQL testing', 'Authentication testing', 'Rate limit bypass', 'Data exposure testing'],
    },
    {
      icon: Server,
      title: 'Network Penetration Testing',
      description: 'Test your network infrastructure for vulnerabilities that could lead to unauthorized access or data breaches.',
      features: ['External testing', 'Internal testing', 'Firewall testing', 'VPN testing', 'Wireless testing'],
    },
    {
      icon: Smartphone,
      title: 'Mobile App Penetration Testing',
      description: 'Identify security vulnerabilities in iOS and Android applications that could compromise user data.',
      features: ['iOS testing', 'Android testing', 'Data storage testing', 'Secure communication', 'Binary analysis'],
    },
    {
      icon: Users,
      title: 'Social Engineering Testing',
      description: 'Test your organization\'s human vulnerabilities through simulated phishing and social engineering attacks.',
      features: ['Phishing campaigns', 'Vishing testing', 'Physical testing', 'Policy review', 'Training recommendations'],
    },
    {
      icon: FileCheck,
      title: 'Remediation and Reporting',
      description: 'Detailed reports with prioritized findings, evidence, and actionable remediation guidance.',
      features: ['Executive summaries', 'Technical reports', 'Proof of concepts', 'Remediation guidance', 'Retesting services'],
    },
  ];

  const stats = [
    { value: '500+', label: 'Vulnerabilities Found' },
    { value: 'A+', label: 'Security Score' },
    { value: '100%', label: 'Client Trust' },
    { value: '50+', label: 'Enterprise Clients' },
  ];

  const tools = [
    'Burp Suite Professional',
    'Metasploit Framework',
    'Nmap',
    'OWASP ZAP',
    'Nessus',
    'Nikto',
    'Hydra',
    'John the Ripper',
    'Wireshark',
    'SQLmap',
    'Maltego',
    'Cobalt Strike',
  ];

  const industries = [
    'Finance',
    'Healthcare',
    'Technology',
    'E-commerce',
    'Government',
    'Education',
    'Energy',
    'Telecommunications',
    'Retail',
    'Insurance',
    'Legal',
    'Manufacturing',
  ];

  const processSteps = [
    {
      icon: Target,
      title: 'Reconnaissance and Scoping',
      description: 'We define the scope, gather intelligence, and identify attack surfaces.',
    },
    {
      icon: Crosshair,
      title: 'Vulnerability Discovery',
      description: 'We conduct automated and manual testing to identify vulnerabilities.',
    },
    {
      icon: Bug,
      title: 'Exploitation and Proof of Concept',
      description: 'We attempt to exploit vulnerabilities to demonstrate real-world impact.',
    },
    {
      icon: FileCheck,
      title: 'Reporting and Remediation',
      description: 'We deliver comprehensive reports with prioritized remediation guidance.',
    },
  ];

  const faqs = [
    {
      q: 'What is penetration testing?',
      a: 'Penetration testing, or ethical hacking, is a simulated cyber attack against your systems to check for exploitable vulnerabilities. At BitSecureX Tech, we conduct comprehensive penetration testing aligned with OWASP, PTES, and CEH methodology to identify and help fix security weaknesses before real attackers can exploit them.',
    },
    {
      q: 'How much does penetration testing cost?',
      a: 'Costs vary based on scope, complexity, and number of systems tested. Our penetration testing packages start from $2,500 for a web application test, with enterprise packages ranging from $5,000 to $15,000 and up for comprehensive testing of multiple systems and networks.',
    },
    {
      q: 'How long does a penetration test take?',
      a: 'Timelines vary based on scope and complexity. A web application test takes one to two weeks, a comprehensive network test takes two to four weeks, and an enterprise-wide assessment takes four to eight weeks. We provide a detailed timeline during the scoping phase.',
    },
    {
      q: 'Do you provide remediation support?',
      a: 'Yes. We provide detailed remediation guidance, support your team in fixing vulnerabilities, and offer retesting services to verify that all issues have been properly addressed.',
    },
    {
      q: 'What certifications do you hold?',
      a: 'Our team holds industry-recognized certifications including CEH (Certified Ethical Hacker), CompTIA Security+, CompTIA Pentest+, and OSCP (Offensive Security Certified Professional).',
    },
  ];

  return (
    <>
      {/* ✅ SEO – FIRST CHILD INSIDE THE FRAGMENT */}
      <SEO
        title="Penetration Testing Services | Security Testing Agency | BitSecureX Tech"
        description="BitSecureX Tech offers professional penetration testing services including web, API, network, and mobile app security testing. Identify and fix vulnerabilities before attackers exploit them."
        keywords="penetration testing, ethical hacking, security testing, vulnerability assessment, web app security, API security, network security, CEH certified"
        url="https://bitsecurex.tech/penetration-testing"
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
                <span className="eyebrow text-red-400">Penetration Testing Agency</span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Penetration Testing <span className="gradient-text">That Secures</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
                  BitSecureX Tech identifies vulnerabilities in your systems before attackers do. Our CEH-certified penetration testers conduct comprehensive security assessments aligned with OWASP, PTES, and industry standards to protect your business from cyber threats.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button onClick={() => nav('/contact')} className="btn-primary">
                    Request Security Assessment <ArrowRight className="h-4 w-4" />
                  </button>
                  <button onClick={() => nav('/disclosure')} className="btn-ghost">
                    <Bug className="h-4 w-4" /> Vulnerability Disclosure
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
                  <p className="text-xs text-slate-400">Businesses Secured</p>
                </div>
              </div>

              <div className="h-8 w-px bg-white/10" />

              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-cyber-400" />
                <div>
                  <p className="text-2xl font-bold text-white">4.72</p>
                  <p className="text-xs text-slate-400">Average Security Score</p>
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
                  Comprehensive <span className="gradient-text">Penetration Testing</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  BitSecureX Tech provides end-to-end penetration testing services to help you identify, understand, and fix security vulnerabilities in your systems.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="glass rounded-2xl p-6 card-hover h-full border-t-2 border-red-500/30">
                    <service.icon className="h-8 w-8 text-red-400" />
                    <h3 className="mt-4 font-display text-lg font-semibold text-white">{service.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{service.description}</p>
                    <ul className="mt-4 space-y-1.5">
                      {service.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="h-3.5 w-3.5 text-red-400 shrink-0" />
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

        {/* TOOLS */}
        <section className="section-pad py-10">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Security Tools</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  Industry-Leading <span className="gradient-text">Security Tools</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  We leverage the most advanced security tools to conduct comprehensive penetration testing and vulnerability assessments.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {tools.map((tool, i) => (
                <Reveal key={i} delay={i * 30}>
                  <span className="glass rounded-full px-5 py-2.5 text-sm text-slate-300 hover:border-red-500/50 hover:text-white transition-colors">
                    {tool}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* METHODOLOGY */}
        <section className="section-pad py-10 bg-navy-800/50">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Methodology</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  Our <span className="gradient-text">Testing Approach</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  We follow industry-standard methodologies including OWASP, PTES, and CEH to ensure comprehensive and ethical security testing.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Shield, label: 'OWASP Top 10' },
                { icon: Target, label: 'PTES Framework' },
                { icon: Award, label: 'CEH Methodology' },
                { icon: FileCheck, label: 'Compliance Ready' },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="glass rounded-2xl p-5 text-center">
                    <item.icon className="h-8 w-8 text-red-400 mx-auto" />
                    <p className="mt-3 text-sm font-medium text-white">{item.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PARTNERSHIPS */}
        <section className="section-pad py-10">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Partnerships</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  Trusted <span className="gradient-text">Security Partnerships</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  We collaborate with industry-leading security organizations to deliver world-class penetration testing services.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Shield, label: 'EC-Council CEH', desc: 'Certified Ethical Hacker Program' },
                { icon: Award, label: 'CompTIA Pentest+', desc: 'Penetration Testing Certification' },
                { icon: Handshake, label: 'Infoshore', desc: 'Penetration Testing Partnership' },
                { icon: Shield, label: 'Ghost-Shell', desc: 'CEH Partnership and Ethical Hacking' },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="glass rounded-2xl p-5 text-center">
                    <item.icon className="h-8 w-8 text-cyber-400 mx-auto" />
                    <p className="mt-3 text-sm font-semibold text-white">{item.label}</p>
                    <p className="mt-1 text-xs text-slate-400">{item.desc}</p>
                  </div>
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
                  How We <span className="gradient-text">Secure Your Systems</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  A proven process that delivers comprehensive penetration testing and actionable results.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="glass rounded-2xl p-6 card-hover text-center h-full border-t-2 border-red-500/30">
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 ring-1 ring-red-500/30 mx-auto">
                      <step.icon className="h-7 w-7 text-red-400" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{step.description}</p>
                    <span className="mt-4 inline-block text-xs font-medium text-red-400">
                      Step {i + 1} of 4
                    </span>
                  </div>
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
                  Security Testing for Every <span className="gradient-text">Industry</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  BitSecureX Tech has conducted penetration testing across 40-plus industries.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {industries.map((industry, i) => (
                <Reveal key={i} delay={i * 30}>
                  <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-slate-300 hover:border-red-500/50 hover:text-white transition-colors">
                    {industry}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECURITY CERTIFICATIONS */}
        <section className="section-pad py-10">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Certifications</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  Certified <span className="gradient-text">Security Experts</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  Our team holds industry-recognized certifications that validate our expertise in cybersecurity and penetration testing.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Shield, label: 'CEH Certified' },
                { icon: Award, label: 'CompTIA Security+' },
                { icon: Award, label: 'CompTIA Pentest+' },
                { icon: Shield, label: 'OSCP Trained' },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="glass rounded-2xl p-5 text-center border-t-2 border-red-500/30">
                    <item.icon className="h-8 w-8 text-red-400 mx-auto" />
                    <p className="mt-3 text-sm font-medium text-white">{item.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-pad py-10 bg-navy-800/50">
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
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-red-500/15 text-red-400 transition-transform group-open:rotate-45">
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
                  <Shield className="mx-auto h-10 w-10 text-electric-500" />
                  <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                    Ready to <span className="gradient-text">Secure Your Systems?</span>
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-slate-400">
                    Get a free, no-obligation security consultation and discover how BitSecureX Tech can help you identify and fix vulnerabilities before attackers exploit them.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button onClick={() => nav('/contact')} className="btn-primary">
                      Request Security Assessment <ArrowRight className="h-4 w-4" />
                    </button>
                    <button onClick={() => nav('/disclosure')} className="btn-ghost">
                      <Bug className="h-4 w-4" /> Vulnerability Disclosure
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
export default PenetrationTestingPage;