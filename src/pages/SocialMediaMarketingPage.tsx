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
  Share2,
  Globe,
  MessageCircle,
  Heart,
  Sparkles,
  Crown,
  Rocket,
  Star,
  X,
  Eye,
  Code2,
  Calendar,
  DollarSign,
  PieChart,
  Award,
  Mail,
} from 'lucide-react';

export function SocialMediaMarketingPage() {
  const nav = useNavigate();

  // ============================================================
  // DATA
  // ============================================================
  const services = [
    {
      icon: Share2,
      title: 'Social Media Management',
      description: 'Full-service management of your social media accounts including content creation, scheduling, and community engagement.',
      features: ['Content planning', 'Content creation', 'Scheduling and publishing', 'Community management', 'Analytics reporting'],
    },
    {
      icon: Heart,
      title: 'Content Strategy and Creation',
      description: 'Strategic content that resonates with your audience, builds brand loyalty, and drives engagement.',
      features: ['Audience research', 'Content calendar', 'Visual content creation', 'Copywriting', 'Storytelling'],
    },
    {
      icon: TrendingUp,
      title: 'Community Growth and Engagement',
      description: 'Grow your social media following with authentic engagement and community-building strategies.',
      features: ['Follower growth strategies', 'Engagement campaigns', 'Community management', 'User-generated content', 'Social listening'],
    },
    {
      icon: Crown,
      title: 'Influencer Marketing',
      description: 'Connect with relevant influencers to amplify your brand reach and build trust with new audiences.',
      features: ['Influencer identification', 'Outreach and negotiation', 'Campaign management', 'Performance tracking', 'Affiliate partnerships'],
    },
    {
      icon: Sparkles,
      title: 'Viral Marketing Campaigns',
      description: 'Create campaigns that capture attention and spread organically across social platforms.',
      features: ['Campaign ideation', 'Creative development', 'Launch strategy', 'Amplification', 'Viral optimization'],
    },
    {
      icon: DollarSign,
      title: 'Paid Social Advertising',
      description: 'Targeted paid campaigns across all major social platforms to drive traffic, leads, and sales.',
      features: ['Audience targeting', 'Ad creation', 'Budget management', 'A/B testing', 'Conversion optimization'],
    },
  ];

  const stats = [
    { value: '450%', label: 'Average Engagement Increase' },
    { value: '300%', label: 'Follower Growth' },
    { value: '5.2x', label: 'Ad ROI' },
    { value: '50+', label: 'Brands Served' },
  ];

  // All social platforms using Globe icon
  const platforms = [
    { icon: Globe, name: 'Facebook', description: 'Build community and drive conversions with Facebook Pages, Groups, and Ads.', color: '#1877F2' },
    { icon: Globe, name: 'Instagram', description: 'Visual storytelling, Reels, Stories, and Shopping to grow your brand.', color: '#E4405F' },
    { icon: Globe, name: 'TikTok', description: 'Reach Gen Z and millennial audiences with creative short-form video content.', color: '#000000' },
    { icon: Globe, name: 'LinkedIn', description: 'B2B marketing, thought leadership, and professional networking.', color: '#0A66C2' },
    { icon: Globe, name: 'YouTube', description: 'Video content marketing and channel growth for long-form and Shorts.', color: '#FF0000' },
    { icon: Globe, name: 'X', description: 'Real-time engagement, brand voice, and community interaction.', color: '#000000' },
  ];

  const processSteps = [
    {
      icon: Target,
      title: 'Audit and Strategy',
      description: 'We analyze your current social presence and define clear goals and strategies.',
    },
    {
      icon: Code2,
      title: 'Content Creation',
      description: 'We create high-quality visual content and copy tailored to your brand and audience.',
    },
    {
      icon: BarChart3,
      title: 'Campaign Management',
      description: 'We execute organic and paid campaigns with continuous monitoring and optimization.',
    },
    {
      icon: TrendingUp,
      title: 'Reporting and Growth',
      description: 'We track performance and refine strategies to maximize your results.',
    },
  ];

  const faqs = [
    {
      q: 'What is social media marketing?',
      a: 'Social media marketing is the use of social media platforms to connect with your audience, build your brand, increase sales, and drive website traffic. At BitSecureX Tech, we create data-driven strategies to grow your social presence and achieve measurable business results.',
    },
    {
      q: 'How much does social media marketing cost?',
      a: 'Costs vary based on your goals, platforms, and scope. Our packages start from $600 per month for basic management, with custom enterprise solutions available.',
    },
    {
      q: 'Which social media platforms should I use?',
      a: 'It depends on your industry, target audience, and goals. We analyze your business and recommend the best platforms for your brand, including Facebook, Instagram, TikTok, LinkedIn, YouTube, or others.',
    },
    {
      q: 'Do you provide content creation services?',
      a: 'Yes. We provide full content creation services including graphic design, video production, copywriting, and content strategy.',
    },
    {
      q: 'How long does it take to see results?',
      a: 'You can typically see engagement growth within two to four weeks. Follower growth and conversions often take three to six months of consistent effort.',
    },
  ];

  return (
    <>
      {/* ✅ SEO – FIRST CHILD INSIDE THE FRAGMENT */}
      <SEO
        title="Social Media Marketing Agency | SMM Services | BitSecureX Tech"
        description="BitSecureX Tech offers expert social media marketing services including management, content creation, influencer partnerships, and paid social ads. Grow your brand on Facebook, Instagram, TikTok, LinkedIn, and more."
        keywords="social media marketing, SMM, influencer marketing, social media management, content strategy, paid social, Facebook ads, Instagram growth"
        url="https://bitsecurex.tech/social-media-marketing"
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
                <span className="eyebrow text-electric-400">Social Media Marketing Agency</span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Social Media <span className="gradient-text">Growth and Engagement</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
                  BitSecureX Tech helps you build a powerful social presence, engage your audience, and drive business growth through expert social media marketing. From content creation to paid ads and influencer partnerships, we provide comprehensive solutions.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button onClick={() => nav('/contact')} className="btn-primary">
                    Get Free Social Media Audit <ArrowRight className="h-4 w-4" />
                  </button>
                  <button onClick={() => nav('/tools')} className="btn-ghost">
                    <Share2 className="h-4 w-4" /> Check Your Social Score
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
                  <p className="text-xs text-slate-400">Happy Clients</p>
                </div>
              </div>

              <div className="h-8 w-px bg-white/10" />

              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-cyber-400" />
                <div>
                  <p className="text-2xl font-bold text-white">4.72</p>
                  <p className="text-xs text-slate-400">Average Social Score</p>
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

        {/* PLATFORMS */}
        <section className="section-pad py-10 bg-navy-800/50">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Platforms</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  We Master <span className="gradient-text">Every Platform</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  We specialize in all major social media platforms to help you reach your audience wherever they are.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {platforms.map((platform, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="glass rounded-2xl p-6 card-hover h-full">
                    <div className="flex items-center gap-3">
                      <platform.icon className="h-8 w-8" style={{ color: platform.color }} />
                      <h3 className="font-display text-lg font-semibold text-white">{platform.name}</h3>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{platform.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section-pad py-10">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Our Services</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  Complete <span className="gradient-text">Social Media Solutions</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  BitSecureX Tech provides end-to-end social media marketing services to help you build your brand, engage your audience, and drive measurable results.
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
        <section className="section-pad py-10 bg-navy-800/50">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Our Process</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  How We <span className="gradient-text">Grow Your Social Media</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  A proven process that delivers measurable social media growth and engagement for your brand.
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
                    Ready to <span className="gradient-text">Build Your Social Presence?</span>
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-slate-400">
                    Get a free, no-obligation social media audit and discover how BitSecureX Tech can help you grow your brand, engage your audience, and drive results.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button onClick={() => nav('/contact')} className="btn-primary">
                      Get Free Social Media Audit <ArrowRight className="h-4 w-4" />
                    </button>
                    <button onClick={() => nav('/services')} className="btn-ghost">
                      <Share2 className="h-4 w-4" /> Explore All Services
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

export default SocialMediaMarketingPage;