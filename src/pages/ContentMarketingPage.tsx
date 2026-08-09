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
  FileText,
  Share2,
  Globe,
  MessageCircle,
  Video,
  Image as ImageIcon,
  PenTool,
  Megaphone,
  Rocket,
  PieChart,
  Crown,
  Sparkles,
  X,
  Search,
} from 'lucide-react';

// ✅ EXPORTED WITH 'export' TO MATCH APP.TSX
export function ContentMarketingPage() {
  const nav = useNavigate();

  const contentServices = [
    {
      icon: FileText,
      title: 'Content Strategy Development',
      description: 'Create a data-driven content marketing strategy that aligns with your business goals and target audience needs.',
      features: ['Audience persona creation', 'Content gap analysis', 'Topic cluster development', 'Editorial calendar planning', 'Competitor analysis'],
    },
    {
      icon: PenTool,
      title: 'Blog Content Creation',
      description: 'SEO-optimized blog posts that attract organic traffic, build authority, and convert readers into customers.',
      features: ['SEO keyword research', 'In-depth articles and guides', 'Listicles and how-to posts', 'Expert interviews', 'Industry news coverage'],
    },
    {
      icon: Video,
      title: 'Video Content Marketing',
      description: 'Engaging video content that captures attention, tells your brand story, and drives action on YouTube and social media.',
      features: ['YouTube video creation', 'Social media short videos', 'Video SEO optimization', 'Product demonstrations', 'Brand storytelling'],
    },
    {
      icon: ImageIcon,
      title: 'Visual Content and Infographics',
      description: 'Eye-catching visual content that simplifies complex information and drives engagement across platforms.',
      features: ['Custom infographics', 'Data visualization', 'Social media graphics', 'Presentation decks', 'Brand visual identity'],
    },
    {
      icon: Share2,
      title: 'Social Media Content',
      description: 'Tailored content for every social platform that drives engagement, builds community, and promotes your brand.',
      features: ['Platform-specific content', 'Engagement posts', 'Story content', 'Live video content', 'User-generated content campaigns'],
    },
    {
      icon: MessageCircle,
      title: 'Email Newsletter Content',
      description: 'Compelling email content that nurtures leads, builds relationships, and drives conversions through your email list.',
      features: ['Welcome email sequences', 'Educational newsletters', 'Promotional emails', 'Abandoned cart recovery', 'Segmented content campaigns'],
    },
    {
      icon: Globe,
      title: 'Guest Posting and Content Distribution',
      description: 'Expand your reach and build authority through guest posts on high-authority websites and strategic content distribution.',
      features: ['High-authority guest posting', 'Content syndication', 'PR content distribution', 'Industry publication placement', 'Backlink acquisition'],
    },
    {
      icon: Megaphone,
      title: 'Brand Storytelling and Authority Building',
      description: 'Build a powerful brand narrative that connects with your audience emotionally and positions you as an industry authority.',
      features: ['Brand voice development', 'Founder storytelling', 'Case study creation', 'Thought leadership content', 'Brand values communication'],
    },
  ];

  const stats = [
    { value: '300%', label: 'Average Traffic Increase' },
    { value: '50+', label: 'Content Clients Served' },
    { value: '1,000+', label: 'Articles and Content Published' },
    { value: '98%', label: 'Client Retention Rate' },
  ];

  const processSteps = [
    {
      icon: Target,
      title: 'Discovery and Strategy',
      description: 'We analyze your business, audience, and competitors to create a data-driven content marketing strategy.',
    },
    {
      icon: PenTool,
      title: 'Content Creation',
      description: 'Our expert team creates high-quality, SEO-optimized content that engages your audience and drives action.',
    },
    {
      icon: Share2,
      title: 'Distribution and Promotion',
      description: 'We distribute your content across the right channels to maximize reach, engagement, and conversions.',
    },
    {
      icon: BarChart3,
      title: 'Measurement and Optimization',
      description: 'We track performance metrics and continuously optimize your content strategy for maximum ROI.',
    },
  ];

  const contentTypes = [
    'Blog Posts',
    'Case Studies',
    'Whitepapers and Ebooks',
    'Infographics',
    'Video Content',
    'Podcasts and Audio Content',
    'Email Newsletters',
    'Social Media Posts',
    'Landing Pages',
    'Product Descriptions',
    'Webinar Presentations',
    'Guides and Tutorials',
    'Checklists and Templates',
    'Interview Content',
    'Industry Reports',
    'Thought Leadership Articles',
    'Press Releases',
    'Whiteboard Videos',
  ];

  const faqs = [
    {
      q: 'How long does it take to see results from content marketing?',
      a: 'Content marketing is a long-term strategy. While you may see initial traction in 1-2 months, significant organic traffic and lead generation results typically take 3-6 months of consistent, high-quality content production.',
    },
    {
      q: 'How much does content marketing cost?',
      a: 'Our content marketing packages start at $1,200 per month for 4-6 blog posts and social media content. Custom enterprise packages are available for businesses with more complex needs.',
    },
    {
      q: 'Do you provide content in different languages?',
      a: 'Yes. We offer content creation in English, French, Spanish, German, Arabic, Portuguese, and more. We can also create multi-language content for international audiences.',
    },
    {
      q: 'What types of businesses benefit most from content marketing?',
      a: 'Content marketing works for businesses in all industries, especially those selling services, B2B companies, ecommerce stores, SaaS platforms, and professional service providers like consultants and agencies.',
    },
    {
      q: 'Do you offer a content marketing audit?',
      a: 'Yes, we provide a comprehensive content marketing audit that analyzes your current content, identifies gaps, and provides a roadmap for improvement. Contact us to schedule your audit.',
    },
  ];

  return (
    <>
      {/* SEO */}
      <SEO
        title="Content Marketing Agency | BitSecureX Tech"
        description="BitSecureX Tech provides expert content marketing services to grow your brand authority, attract organic traffic, and convert leads. Get a free content audit today."
        keywords="content marketing, content strategy, blog writing, content creation, SEO content, brand storytelling, content distribution"
        url="https://bitsecurex.tech/content-marketing"
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
                <span className="eyebrow text-electric-400">Content Marketing</span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Content Marketing that <span className="gradient-text">Converts</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
                  Build authority, attract organic traffic, and convert leads with data-driven content marketing strategies from BitSecureX Tech. We create content that your audience loves and search engines rank.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button onClick={() => nav('/contact')} className="btn-primary">
                    Get Free Content Audit <ArrowRight className="h-4 w-4" />
                  </button>
                  <button onClick={() => nav('/portfolio')} className="btn-ghost">
                    <Search className="h-4 w-4" /> View Our Work
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
                  Content Marketing <span className="gradient-text">Solutions</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  End-to-end content marketing services designed to build your brand, attract customers, and grow your business.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {contentServices.map((service, i) => (
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
                  How We <span className="gradient-text">Create Content</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  A proven process that turns your business goals into compelling content that drives results.
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

        {/* CONTENT TYPES */}
        <section className="section-pad py-10 bg-navy-800/50">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Content Types</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  We Create Every <span className="gradient-text">Type of Content</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  From blog posts to video scripts, we create all types of content to engage your audience and drive conversions.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {contentTypes.map((type, i) => (
                <Reveal key={i} delay={i * 30}>
                  <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-slate-300 hover:border-cyber-400/50 hover:text-white transition-colors">
                    {type}
                  </span>
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
                    Ready to Build Your <span className="gradient-text">Content Strategy?</span>
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-slate-400">
                    Get a free, no-obligation content audit and discover how BitSecureX Tech can help you create content that converts.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button onClick={() => nav('/contact')} className="btn-primary">
                      Get Free Content Audit <ArrowRight className="h-4 w-4" />
                    </button>
                    <button onClick={() => nav('/portfolio')} className="btn-ghost">
                      <Search className="h-4 w-4" /> View Our Work
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
export default ContentMarketingPage;