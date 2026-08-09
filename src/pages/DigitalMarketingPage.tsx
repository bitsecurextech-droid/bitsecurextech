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
  Megaphone,
  Globe,
  Mail,
  MessageSquare,
  Phone,
  Send,
  Rocket,
  Star,
  X,
  Eye,
  Code2,
  Calendar,
  DollarSign,
  PieChart,
  Search,
  Award,
} from 'lucide-react';

export function DigitalMarketingPage() {
  const nav = useNavigate();

  // Data
  const services = [
    {
      icon: Search,
      title: 'SEO and Organic Growth',
      description: 'Rank higher on Google and attract free, targeted traffic with our proven SEO strategies.',
      features: ['Technical SEO audits', 'Keyword research', 'Content optimization', 'Link building', 'Local SEO'],
    },
    {
      icon: DollarSign,
      title: 'PPC and Google Ads',
      description: 'Maximize your ROI with data-driven pay-per-click campaigns across Google, Bing, and social platforms.',
      features: ['Search ads', 'Display ads', 'Shopping ads', 'Retargeting', 'Performance analysis'],
    },
    {
      icon: Globe,
      title: 'Social Media Advertising',
      description: 'Run targeted ads across Facebook, Instagram, TikTok, LinkedIn, and more.',
      features: ['Audience targeting', 'Creative development', 'A/B testing', 'Conversion optimization', 'Retargeting'],
    },
    {
      icon: Globe,
      title: 'TikTok and Instagram Advertising',
      description: 'Engage Gen Z and millennial audiences with creative video ads on the fastest-growing platforms.',
      features: ['In-feed ads', 'Branded effects', 'Hashtag challenges', 'Reels ads', 'Story ads'],
    },
    {
      icon: Globe,
      title: 'LinkedIn and B2B Marketing',
      description: 'Connect with professionals and B2B decision-makers through targeted LinkedIn campaigns.',
      features: ['Sponsored content', 'Message ads', 'Dynamic ads', 'Lead gen forms', 'Matched audiences'],
    },
    {
      icon: Globe,
      title: 'YouTube and Video Advertising',
      description: 'Build brand awareness and drive conversions with video ads on the world\'s largest video platform.',
      features: ['TrueView ads', 'Bumper ads', 'Discovery ads', 'Masthead ads', 'YouTube Shorts'],
    },
    {
      icon: Mail,
      title: 'Email Marketing',
      description: 'Nurture leads and retain customers with automated email campaigns that convert.',
      features: ['Newsletter campaigns', 'Automated sequences', 'A/B testing', 'Personalization', 'Analytics'],
    },
    {
      icon: MessageSquare,
      title: 'SMS and WhatsApp Marketing',
      description: 'Connect with customers instantly through SMS and WhatsApp marketing campaigns.',
      features: ['Bulk SMS', 'WhatsApp Business', 'Automated replies', 'Campaign tracking', 'Opt-in management'],
    },
    {
      icon: PieChart,
      title: 'Analytics and Reporting',
      description: 'Make data-driven decisions with comprehensive analytics and performance reporting.',
      features: ['Custom dashboards', 'ROI tracking', 'Attribution modeling', 'Competitor analysis', 'Monthly reports'],
    },
  ];

  const stats = [
    { value: '250%', label: 'Average Lead Increase' },
    { value: '4.8x', label: 'Return on Ad Spend' },
    { value: '95%', label: 'Client Retention' },
    { value: '50+', label: 'Campaigns Managed' },
  ];

  const processSteps = [
    {
      icon: Target,
      title: 'Discovery and Strategy',
      description: 'We analyze your business, competitors, and audience to create a custom marketing plan.',
    },
    {
      icon: BarChart3,
      title: 'Campaign Setup',
      description: 'We set up campaigns across the right channels with precise targeting and compelling creatives.',
    },
    {
      icon: Zap,
      title: 'Execution and Optimization',
      description: 'We launch your campaigns and continuously optimize for better performance.',
    },
    {
      icon: TrendingUp,
      title: 'Reporting and Scaling',
      description: 'We track results, provide detailed reports, and scale what works.',
    },
  ];

  const channels = [
    'Google Ads',
    'Facebook Ads',
    'Instagram Ads',
    'TikTok Ads',
    'LinkedIn Ads',
    'YouTube Ads',
    'Email Marketing',
    'SMS Marketing',
    'WhatsApp Marketing',
  ];

  const faqs = [
    {
      q: 'What is digital marketing?',
      a: 'Digital marketing is the use of online channels like search engines, social media, email, and websites to connect with current and potential customers. At BitSecureX Tech, we create integrated strategies to drive traffic, generate leads, and grow your business.',
    },
    {
      q: 'How much does digital marketing cost?',
      a: 'Costs vary depending on your goals, channels, and competition. We offer packages starting from $500 per month for small businesses, with custom enterprise solutions available.',
    },
    {
      q: 'How long before I see results?',
      a: 'Many campaigns show initial results within two to four weeks, but we recommend a three-month minimum to gather sufficient data and optimize for maximum ROI.',
    },
    {
      q: 'Do you handle both organic and paid marketing?',
      a: 'Yes. We offer a full spectrum: SEO, content marketing, social media organic, paid ads (PPC), email marketing, and SMS marketing.',
    },
    {
      q: 'What industries do you work with?',
      a: 'We work with businesses across all industries including ecommerce, technology, healthcare, real estate, finance, professional services, and more.',
    },
  ];

  return (
    <>
      {/* ✅ SEO – FIRST CHILD INSIDE THE FRAGMENT */}
      <SEO
        title="Digital Marketing Agency | SEO, PPC & Social Media Marketing | BitSecureX Tech"
        description="BitSecureX Tech offers expert digital marketing services including SEO, PPC, social media, email marketing, and lead generation. Grow your business online with our proven strategies."
        keywords="digital marketing, PPC, social media marketing, email marketing, lead generation, online advertising, Google Ads, SEO"
        url="https://bitsecurex.tech/digital-marketing"
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
                <span className="eyebrow text-electric-400">Digital Marketing Agency</span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Digital Marketing <span className="gradient-text">That Drives Growth</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
                  BitSecureX Tech provides data-driven digital marketing services across all major channels. From SEO and PPC to social media and email marketing, we help you attract leads, increase sales, and scale your business online.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button onClick={() => nav('/contact')} className="btn-primary">
                    Get Free Marketing Strategy <ArrowRight className="h-4 w-4" />
                  </button>
                  <button onClick={() => nav('/tools')} className="btn-ghost">
                    <Megaphone className="h-4 w-4" /> Check Your Marketing Score
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
                  <p className="text-xs text-slate-400">Average Marketing Score</p>
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
                  Complete <span className="gradient-text">Marketing Solutions</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  BitSecureX Tech offers a full suite of digital marketing services to help you reach your target audience, generate leads, and grow your business.
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

        {/* PROCESS */}
        <section className="section-pad py-10">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Our Process</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  How We <span className="gradient-text">Drive Results</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  A proven, data-driven process that delivers measurable marketing results for your business.
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

        {/* CHANNELS */}
        <section className="section-pad py-10 bg-navy-800/50">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Marketing Channels</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  Multi-Channel <span className="gradient-text">Approach</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  We leverage the most effective channels to reach your target audience and achieve your business goals.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {channels.map((channel, i) => (
                <Reveal key={i} delay={i * 30}>
                  <span className="glass rounded-full px-5 py-2.5 text-sm text-slate-300 hover:border-cyber-400/50 hover:text-white transition-colors">
                    {channel}
                  </span>
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
                    Ready to <span className="gradient-text">Grow Your Business?</span>
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-slate-400">
                    Get a free, no-obligation digital marketing consultation and discover how BitSecureX Tech can help you achieve your business goals.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button onClick={() => nav('/contact')} className="btn-primary">
                      Get Free Consultation <ArrowRight className="h-4 w-4" />
                    </button>
                    <button onClick={() => nav('/services')} className="btn-ghost">
                      <Megaphone className="h-4 w-4" /> Explore All Services
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
export default DigitalMarketingPage;