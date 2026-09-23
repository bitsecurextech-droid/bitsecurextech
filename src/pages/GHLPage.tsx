import { useState } from 'react';
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
  Shield,
} from 'lucide-react';

// ============================================================
// REAL GHL LOGO COMPONENT (3 colored arrows)
// ============================================================
function GHLLogo({ className = 'h-10 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 60" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="GoHighLevel">
      {/* 3 Arrows - Yellow, Blue, Green */}
      {/* Yellow arrow (tall, left) */}
      <rect x="6" y="18" width="8" height="36" fill="#FFC107" />
      <polygon points="10,8 16,18 4,18" fill="#FFC107" />

      {/* Blue arrow (short, middle) */}
      <rect x="20" y="30" width="8" height="24" fill="#2196F3" />
      <polygon points="24,22 30,30 18,30" fill="#2196F3" />

      {/* Green arrow (tall, right) */}
      <rect x="34" y="18" width="8" height="36" fill="#4CAF50" />
      <polygon points="38,8 44,18 32,18" fill="#4CAF50" />

      {/* "HighLevel" text */}
      <text
        x="52"
        y="42"
        fontFamily="Inter, -apple-system, sans-serif"
        fontSize="28"
        fontWeight="700"
        fill="#0a0a1a"
        letterSpacing="-0.5"
      >
        High
        <tspan fontWeight="800">Level</tspan>
      </text>
    </svg>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export function GHLPage() {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState<'capture' | 'nurture' | 'close' | 'evangelize' | 'reactivate'>('capture');

  const WHATSAPP_NUMBER = '12762427102';
  const WHATSAPP_MESSAGE = encodeURIComponent('Hi, I need GoHighLevel services');
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  // ============================================================
  // TAB DATA — Capture / Nurture / Close / Evangelize / Reactivate
  // ============================================================
  const tabData = {
    capture: {
      label: 'Capture',
      title: 'Get more leads in the door',
      subtitle: 'Attract the right people, turn interest into leads and keep your pipeline full.',
      features: [
        'CRM',
        'Voice AI',
        'Forms, Surveys & Quizzes',
        'Websites, Funnels & Landing Pages',
        'Webinar Funnels',
        'Chat Widget / Conversation AI',
        'Call Tracking',
        'Inbound SMS & Social DMs',
        'Social Planner',
        'Missed Call Text-Back',
        'AI Biz Card Scanner',
        'QR Codes',
        'Prospecting Tool',
        'Ad Manager (Google/FB/Insta Ads)',
      ],
    },
    nurture: {
      label: 'Nurture',
      title: 'Build relationships that convert',
      subtitle: 'Keep leads engaged with personalized follow-ups and automated sequences.',
      features: [
        'Email Marketing',
        'SMS Marketing',
        'Workflow Automation',
        'Multi-Channel Sequences',
        'Lead Scoring',
        'Smart Lists & Segmentation',
        'Trigger-Based Campaigns',
        'Drip Campaigns',
        'Appointment Reminders',
        'Review Requests',
        'Birthday & Anniversary Campaigns',
        'Re-Engagement Flows',
      ],
    },
    close: {
      label: 'Close',
      title: 'Turn conversations into customers',
      subtitle: 'Give your sales team the tools to close faster and increase deal value.',
      features: [
        'Sales Pipelines',
        'Opportunity Management',
        'Calendar & Booking',
        'Proposals & Estimates',
        'Invoicing & Payments',
        'Stripe Integration',
        'Upsells & Cross-Sells',
        'Sales Automation',
        'Deal Tracking',
        'Team Collaboration',
        'Call Recordings',
        'Follow-Up Sequences',
      ],
    },
    evangelize: {
      label: 'Evangelize',
      title: 'Turn customers into promoters',
      subtitle: 'Build a reputation engine that generates referrals and repeat business.',
      features: [
        'Review Management',
        'Reputation Monitoring',
        'Referral Programs',
        'Loyalty Programs',
        'Automated Review Requests',
        'Multi-Platform Reviews',
        'Social Proof Widgets',
        'Testimonial Collection',
        'Brand Ambassador Tools',
        'Community Building',
      ],
    },
    reactivate: {
      label: 'Reactivate',
      title: 'Win back lost opportunities',
      subtitle: 'Re-engage cold leads and past customers with targeted campaigns.',
      features: [
        'Database Reactivation',
        'Dormant Lead Campaigns',
        'Win-Back Sequences',
        'Special Offers & Discounts',
        'Retargeting Ads',
        'Behavior-Triggered Messages',
        'Churn Prevention',
        'Customer Feedback Loop',
        'Segment-Based Campaigns',
        'Annual Check-Ins',
      ],
    },
  };

  // ============================================================
  // DATA (other sections)
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
    { icon: Rocket, title: 'Replace 10+ Tools', description: 'GoHighLevel replaces your CRM, email marketing, funnel builder, calendar, and more in one platform.' },
    { icon: Zap, title: 'Automate Everything', description: 'From lead capture to follow-up, everything runs on autopilot so you can focus on growing your business.' },
    { icon: Brain, title: 'AI-Powered', description: 'Built-in AI features including chatbots, voice AI, and predictive analytics to stay ahead.' },
    { icon: Users, title: 'Scale Your Team', description: 'Manage unlimited sub-accounts, team members, and clients from one dashboard.' },
    { icon: Shield, title: 'Secure & Reliable', description: 'Enterprise-grade security with 99.9% uptime guarantee and automatic backups.' },
    { icon: TrendingUp, title: 'Drive Revenue', description: 'Proven funnels, workflows, and automations that turn leads into paying customers.' },
  ];

  const processSteps = [
    { icon: Target, title: 'Discovery Call', description: 'We understand your business, goals, and current tools to plan the perfect GHL setup.' },
    { icon: Brain, title: 'Strategy & Planning', description: 'We map out the workflows, funnels, and automations needed for your success.' },
    { icon: Cpu, title: 'Setup & Integration', description: 'We build and configure everything inside your GHL account, ready to launch.' },
    { icon: Rocket, title: 'Testing & Launch', description: 'We test everything, fix issues, and launch your automated system.' },
    { icon: TrendingUp, title: 'Ongoing Support', description: 'We monitor, optimize, and support your GHL account as your business grows.' },
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
    { q: 'What is GoHighLevel?', a: 'GoHighLevel (GHL) is an all-in-one marketing and CRM platform that replaces dozens of tools. It includes funnels, websites, CRM, email/SMS marketing, calendars, automation, AI chatbots, and more, all under one roof.' },
    { q: 'Do I need technical skills to use GHL?', a: 'Not at all! We set everything up for you and provide training so you can manage your account with ease. Everything is designed to be user-friendly.' },
    { q: 'Can you migrate my existing data to GHL?', a: 'Yes! We can migrate your contacts, funnels, and other data from your existing tools into GoHighLevel. We handle the entire migration process for you.' },
    { q: 'How long does a typical GHL setup take?', a: 'A basic setup can be completed in 1-2 weeks. A comprehensive setup with multiple funnels, workflows, and automations may take 3-4 weeks. We provide a timeline during our discovery call.' },
    { q: 'Do you offer ongoing support after setup?', a: 'Yes! We offer ongoing support and optimization packages. We monitor your account, make improvements, and are available for questions and support.' },
    { q: 'Is there a free trial for GoHighLevel?', a: 'GoHighLevel offers a 14-day free trial. We can help you set up during the trial period so you can see the value before committing.' },
  ];

  const currentTab = tabData[activeTab];

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

              {/* ✅ REAL GHL LOGO */}
              <Reveal>
                <div className="flex justify-center mb-6">
                  <div className="rounded-2xl bg-white px-6 py-4 shadow-lg ring-1 ring-cyber-500/20">
                    <GHLLogo className="h-10 w-auto" />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={40}>
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
                  <button onClick={() => nav('/contact')} className="btn-primary">
                    Book a Free GHL Consultation <ArrowRight className="h-4 w-4" />
                  </button>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    <Phone className="h-4 w-4" /> Chat on WhatsApp
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============================================================
            NEW SECTION: All-in-one solution with TABS
            ============================================================ */}
        <section className="section-pad py-12 bg-navy-800/50">
          <div className="container-x">
            <div className="text-center max-w-3xl mx-auto">
              <Reveal>
                <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Your all-in-one solution for <br />
                  <span className="text-slate-400">business growth</span>
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="mt-4 text-lg text-slate-400">
                  All the tools you need in one AI-powered platform
                </p>
              </Reveal>
            </div>

            {/* TABS */}
            <Reveal delay={120}>
              <div className="mt-10 flex flex-wrap justify-center gap-2">
                {(Object.keys(tabData) as Array<keyof typeof tabData>).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`rounded-lg px-6 py-3 text-sm font-bold transition-all ${
                      activeTab === key
                        ? 'bg-yellow-400 text-navy-950 shadow-lg shadow-yellow-400/30 scale-105'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {tabData[key].label}
                  </button>
                ))}
              </div>
            </Reveal>

            {/* TAB CONTENT */}
            <Reveal delay={160}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 lg:p-12 backdrop-blur-sm">
                <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                  {/* Left: Text + Features */}
                  <div>
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400">
                      <Target className="h-7 w-7 text-navy-950" />
                    </div>
                    <h3 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      {currentTab.title}
                    </h3>
                    <p className="mt-3 text-base text-slate-400 leading-relaxed">
                      {currentTab.subtitle}
                    </p>

                    <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                      {currentTab.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                          <CheckCircle2 className="h-4 w-4 text-electric-500 shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => nav('/contact')}
                      className="mt-8 inline-flex items-center gap-2 rounded-lg bg-navy-950 px-6 py-3 text-sm font-bold text-white ring-1 ring-white/10 transition-all hover:bg-navy-900 hover:ring-cyber-500/50"
                    >
                      Start 14 Day Free Trial <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Right: Visual mockup */}
                  <div className="relative">
                    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyber-500/10 to-electric-500/10 p-6">
                      {/* Mock chat conversation */}
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 text-xs font-bold text-navy-950">
                            GHL
                          </div>
                          <div className="rounded-2xl rounded-tl-sm bg-blue-600 px-4 py-3 text-sm text-white max-w-[80%]">
                            Sorry we missed your call! Want to book an appointment?
                          </div>
                        </div>

                        <div className="flex items-start justify-end gap-3">
                          <div className="rounded-2xl rounded-tr-sm bg-white px-4 py-3 text-sm text-navy-950 max-w-[80%] shadow-lg">
                            Yes, is 2 PM next Tuesday free?
                          </div>
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-electric-500 to-cyber-500 text-xs font-bold text-white">
                            👤
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 text-xs font-bold text-navy-950">
                            GHL
                          </div>
                          <div className="rounded-2xl rounded-tl-sm bg-blue-600 px-4 py-3 text-sm text-white max-w-[80%]">
                            Yes! You're all set for 2 PM next Tuesday. Thank you!
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating badge */}
                    <div className="absolute -bottom-4 -right-4 rounded-xl bg-white px-4 py-3 shadow-2xl ring-1 ring-cyber-500/20">
                      <div className="flex items-center gap-2">
                        <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500">
                          <Zap className="h-4 w-4 text-navy-950" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-slate-400">Response Time</p>
                          <p className="text-sm font-bold text-navy-950">&lt; 5 seconds</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* STATS */}
        <section className="section-pad py-8">
          <div className="container-x">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="glass card-hover rounded-2xl p-5 text-center">
                    <p className="font-display text-3xl font-bold gradient-text sm:text-4xl">{stat.value}</p>
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
              <Reveal><span className="eyebrow">Why GoHighLevel</span></Reveal>
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
              <Reveal><span className="eyebrow">Our GHL Services</span></Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  Complete <span className="gradient-text">GoHighLevel Setup</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  We handle every aspect of GoHighLevel setup for your business.
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
              <Reveal><span className="eyebrow">Industries</span></Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  GHL for Every <span className="gradient-text">Industry</span>
                </h2>
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
              <Reveal><span className="eyebrow">Our Process</span></Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  How We Set Up <span className="gradient-text">Your GHL</span>
                </h2>
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
                    <span className="mt-3 inline-block text-xs font-medium text-cyber-400">Step {i + 1} of 5</span>
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
              <Reveal><span className="eyebrow">FAQ</span></Reveal>
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
                    <button onClick={() => nav('/contact')} className="btn-primary">
                      Book a Free Consultation <ArrowRight className="h-4 w-4" />
                    </button>
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-ghost">
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
