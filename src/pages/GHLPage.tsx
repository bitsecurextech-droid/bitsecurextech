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
  Bot,
  Brain,
  Cpu,
  Sparkles,
  Rocket,
  Star,
  X,
  Eye,
  Calendar,
  DollarSign,
  PieChart,
  Award,
  MessageCircle,
  Crown,
  Code2,
  Globe,
  Lock,
  Gauge,
  Server,
  Database,
  Layers,
  Phone,
  Mail,
  MessageSquare,
  Video,
  Mic,
  Headphones,
  FileText,
  Send,
  Workflow,
  Filter,
  Layout,
  FormInput,
  Clock,
  Bell,
  Repeat,
  GitBranch,
  Users2,
  Building2,
  ShoppingCart,
  Stethoscope,
  Dumbbell,
  GraduationCap,
  Briefcase,
  Home,
} from 'lucide-react';

export function GHLPage() {
  const nav = useNavigate();

  // ============================================================
  // DATA
  // ============================================================
  const services = [
    {
      icon: Globe,
      title: 'GHL Website Setup',
      description: 'Complete GoHighLevel website build with custom design, mobile optimization, and SEO-ready structure.',
      features: ['Custom design', 'Mobile responsive', 'SEO optimized', 'Fast loading', 'Lead capture built-in'],
    },
    {
      icon: Workflow,
      title: 'Workflow Setup',
      description: 'Automated workflows that trigger actions based on customer behavior, saving hours of manual work.',
      features: ['Trigger-based automation', 'Multi-step sequences', 'Conditional logic', 'Error handling', 'Performance tracking'],
    },
    {
      icon: Filter,
      title: 'Funnel Setup',
      description: 'High-converting sales funnels designed to turn visitors into customers, with A/B testing built in.',
      features: ['Landing pages', 'Upsell/downsell', 'Order forms', 'A/B testing', 'Conversion tracking'],
    },
    {
      icon: Layout,
      title: 'Landing Page Setup',
      description: 'Beautiful, conversion-focused landing pages designed to capture leads and drive action.',
      features: ['Custom templates', 'Mobile optimized', 'Fast loading', 'Form integration', 'Analytics ready'],
    },
    {
      icon: Users2,
      title: 'CRM Setup',
      description: 'Complete CRM configuration to manage contacts, track deals, and organize your entire sales pipeline.',
      features: ['Contact management', 'Deal tracking', 'Custom fields', 'Tag organization', 'Bulk operations'],
    },
    {
      icon: Calendar,
      title: 'Calendar & Booking Setup',
      description: 'Integrated booking system with automated confirmations, reminders, and calendar sync.',
      features: ['Custom availability', 'Auto confirmations', 'SMS/Email reminders', 'Calendar sync', 'Payment collection'],
    },
    {
      icon: Mail,
      title: 'Email & SMS Automation',
      description: 'Automated email and SMS campaigns that nurture leads and keep customers engaged.',
      features: ['Drip campaigns', 'Broadcast messages', 'Trigger-based sends', 'A/B testing', 'Performance analytics'],
    },
    {
      icon: Star,
      title: 'Review Automation',
      description: 'Automated review requests that grow your online reputation on autopilot.',
      features: ['Auto review requests', 'Multi-platform support', 'Reputation monitoring', 'Response automation', 'Analytics dashboard'],
    },
    {
      icon: Bot,
      title: 'AI Chatbot Setup',
      description: 'Intelligent chatbots that handle customer inquiries 24/7, qualify leads, and book appointments.',
      features: ['24/7 availability', 'Lead qualification', 'Appointment booking', 'Multi-channel', 'Analytics'],
    },
    {
      icon: Mic,
      title: 'Voice AI Setup',
      description: 'AI-powered voice agents that handle calls, qualify leads, and book appointments automatically.',
      features: ['Inbound/outbound calls', 'Lead qualification', 'Appointment booking', 'Call recording', 'Transcription'],
    },
    {
      icon: GitBranch,
      title: 'Pipeline Setup',
      description: 'Visual sales pipelines that show exactly where every lead is in your sales process.',
      features: ['Custom stages', 'Drag & drop', 'Automation triggers', 'Reporting', 'Team collaboration'],
    },
    {
      icon: FormInput,
      title: 'Lead Capture Forms',
      description: 'High-converting forms that capture leads and feed them directly into your CRM.',
      features: ['Custom fields', 'Multi-step forms', 'Conditional logic', 'Auto-populate', 'Analytics'],
    },
    {
      icon: Bell,
      title: 'Appointment Reminder System',
      description: 'Automated reminders via SMS, email, and voicemail to reduce no-shows.',
      features: ['Multi-channel reminders', 'Custom timing', 'Confirmation links', 'Reschedule options', 'No-show tracking'],
    },
    {
      icon: Repeat,
      title: 'Lead Nurturing System',
      description: 'Long-term nurture campaigns that keep your brand top-of-mind and convert leads over time.',
      features: ['Drip sequences', 'Behavior triggers', 'Content delivery', 'Engagement tracking', 'Conversion optimization'],
    },
  ];

  const stats = [
    { value: '14+', label: 'GHL Services' },
    { value: '100+', label: 'Workflows Built' },
    { value: '500+', label: 'Hours Saved for Clients' },
    { value: '24/7', label: 'Automation Running' },
  ];

  const benefits = [
    {
      icon: Rocket,
      title: 'Replace 10+ Tools',
      description: 'GoHighLevel replaces your CRM, email marketing, funnel builder, calendar, and more in one platform.',
    },
    {
      icon: Zap,
      title: 'Automate Everything',
      description: 'From lead capture to follow-up, everything runs on autopilot so you can focus on growing your business.',
    },
    {
      icon: Brain,
      title: 'AI-Powered',
      description: 'Built-in AI features including chatbots, voice AI, and predictive analytics to stay ahead.',
    },
    {
      icon: Users,
      title: 'Scale Your Team',
      description: 'Manage unlimited sub-accounts, team members, and clients from one dashboard.',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee and automatic backups.',
    },
    {
      icon: TrendingUp,
      title: 'Drive Revenue',
      description: 'Proven funnels, workflows, and automations that turn leads into paying customers.',
    },
  ];

  const processSteps = [
    {
      icon: Target,
      title: 'Discovery Call',
      description: 'We understand your business, goals, and current tools to plan the perfect GHL setup.',
    },
    {
      icon: Brain,
      title: 'Strategy & Planning',
      description: 'We map out the workflows, funnels, and automations needed for your success.',
    },
    {
      icon: Cpu,
      title: 'Setup & Integration',
      description: 'We build and configure everything inside your GHL account, ready to launch.',
    },
    {
      icon: Rocket,
      title: 'Testing & Launch',
      description: 'We test everything, fix issues, and launch your automated system.',
    },
    {
      icon: TrendingUp,
      title: 'Ongoing Support',
      description: 'We monitor, optimize, and support your GHL account as your business grows.',
    },
  ];

  const industries = [
    { icon: Building2, name: 'Real Estate' },
    { icon: Stethoscope, name: 'Healthcare' },
    { icon: Dumbbell, name: 'Fitness' },
    { icon: ShoppingCart, name: 'E-commerce' },
    { icon: GraduationCap, name: 'Education' },
    { icon: Briefcase, name: 'Professional Services' },
    { icon: Home, name: 'Home Services' },
    { icon: Code2, name: 'SaaS & Tech' },
    { icon: Users, name: 'Coaches & Consultants' },
    { icon: Star, name: 'Beauty & Wellness' },
    { icon: Globe, name: 'Agencies' },
    { icon: DollarSign, name: 'Finance' },
  ];

  const faqs = [
    {
      q: 'What is GoHighLevel?',
      a: 'GoHighLevel (GHL) is an all-in-one marketing and CRM platform that replaces dozens of tools. It includes funnels, websites, CRM, email/SMS marketing, calendars, automation, AI chatbots, and more, all under one roof.',
    },
    {
      q: 'Do I need technical skills to use GHL?',
      a: 'Not at all! We set everything up for you and provide training so you can manage your account with ease. Everything is designed to be user-friendly.',
    },
    {
      q: 'Can you migrate my existing data to GHL?',
      a: 'Yes! We can migrate your contacts, funnels, and other data from your existing tools into GoHighLevel. We handle the entire migration process for you.',
    },
    {
      q: 'How long does a typical GHL setup take?',
      a: 'A basic setup can be completed in 1-2 weeks. A comprehensive setup with multiple funnels, workflows, and automations may take 3-4 weeks. We provide a timeline during our discovery call.',
    },
    {
      q: 'Do you offer ongoing support after setup?',
      a: 'Yes! We offer ongoing support and optimization packages. We monitor your account, make improvements, and are available for questions and support.',
    },
    {
      q: 'Is there a free trial for GoHighLevel?',
      a: 'GoHighLevel offers a 14-day free trial. We can help you set up during the trial period so you can see the value before committing.',
    },
  ];

  return (
    <>
      <SEO
        title="GoHighLevel Automation Services | GHL Setup & Management | BitSecureX Tech"
        description="BitSecureX Tech offers expert GoHighLevel (GHL) setup services including workflows, funnels, CRM, calendars, AI chatbots, voice AI, email/SMS automation, and more. Automate your business today."
        keywords="GoHighLevel, GHL setup, GHL automation, GoHighLevel agency, GHL funnel, GHL CRM, GHL workflow, AI chatbot, voice AI, marketing automation"
        url="https://bitsecurextech.com/gohighlevel"
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
                <span className="eyebrow text-electric-400">GoHighLevel Automation Agency</span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  GoHighLevel <span className="gradient-text">Automation Services</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
                  BitSecureX Tech is your GoHighLevel expert. We set up, configure, and manage GHL for
                  your business, including workflows, funnels, CRM, AI chatbots, voice AI, and more.
                  Automate everything and grow faster with GoHighLevel.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button onClick={() => nav('/contact?service=gohighlevel')} className="btn-primary">
                    Book a Free GHL Consultation <ArrowRight className="h-4 w-4" />
                  </button>
                  <a href="https://wa.me/2349011407095?text=Hi%2C%20I%20need%20GoHighLevel%20services" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    <Phone className="h-4 w-4" /> Chat on WhatsApp
                  </a>
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

        {/* WHY GOHIGHLEVEL */}
        <section className="section-pad py-10 bg-navy-800/50">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Why GoHighLevel</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  One Platform <span className="gradient-text">Replaces Them All</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  Stop paying for 10+ separate tools. GoHighLevel brings everything into one powerful platform.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="glass rounded-2xl p-6 card-hover h-full">
                    <benefit.icon className="h-8 w-8 text-cyber-400" />
                    <h3 className="mt-4 font-display text-lg font-semibold text-white">{benefit.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{benefit.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section className="section-pad py-10">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Our GHL Services</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  Complete <span className="gradient-text">GoHighLevel Setup</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  We handle every aspect of GoHighLevel setup for your business. Here are all the services we offer.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => (
                <Reveal key={i} delay={i * 40}>
                  <div className="glass rounded-2xl p-6 card-hover h-full flex flex-col">
                    <service.icon className="h-8 w-8 text-cyber-400" />
                    <h3 className="mt-4 font-display text-lg font-semibold text-white">{service.title}</h3>
                    <p className="mt-2 text-sm text-slate-400 flex-1">{service.description}</p>
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

        {/* INDUSTRIES */}
        <section className="section-pad py-10 bg-navy-800/50">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Industries</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  GHL for Every <span className="gradient-text">Industry</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  We've set up GoHighLevel for businesses across all industries.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {industries.map((industry, i) => (
                <Reveal key={i} delay={i * 40}>
                  <div className="glass rounded-2xl p-5 text-center card-hover">
                    <industry.icon className="mx-auto h-7 w-7 text-cyber-400" />
                    <p className="mt-3 text-sm font-medium text-white">{industry.name}</p>
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
                  How We Set Up <span className="gradient-text">Your GHL</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  A proven 5-step process that gets your GoHighLevel account running in weeks, not months.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              {processSteps.map((step, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="glass rounded-2xl p-6 card-hover text-center h-full">
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-cyber-500/20 to-electric-500/20 ring-1 ring-cyber-500/30 mx-auto">
                      <step.icon className="h-7 w-7 text-cyber-400" />
                    </div>
                    <h3 className="mt-4 font-display text-base font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-xs text-slate-400">{step.description}</p>
                    <span className="mt-3 inline-block text-xs font-medium text-cyber-400">
                      Step {i + 1} of 5
                    </span>
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
                    Ready to <span className="gradient-text">Automate with GHL?</span>
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-slate-400">
                    Get a free GoHighLevel consultation and discover how BitSecureX Tech can help you
                    automate your business, save time, and grow faster with GoHighLevel.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button onClick={() => nav('/contact?service=gohighlevel')} className="btn-primary">
                      Book a Free Consultation <ArrowRight className="h-4 w-4" />
                    </button>
                    <a href="https://wa.me/2349011407095?text=Hi%2C%20I%20need%20GoHighLevel%20services" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                      <Phone className="h-4 w-4" /> Chat on WhatsApp
                    </a>
                    <a href="mailto:contact.bitsecurex@gmail.com?subject=GoHighLevel%20Inquiry" className="btn-ghost">
                      <Mail className="h-4 w-4" /> Send Email
                    </a>
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
export default GHLPage;
