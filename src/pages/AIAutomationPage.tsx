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
} from 'lucide-react';

export function AIAutomationPage() {
  const nav = useNavigate();

  // ============================================================
  // DATA
  // ============================================================
  const services = [
    {
      icon: Bot,
      title: 'AI Chatbots & Virtual Agents',
      description: 'Deploy intelligent chatbots that handle customer inquiries 24/7, reduce support costs, and improve customer satisfaction.',
      features: ['24/7 availability', 'Multi-language support', 'Intent recognition', 'Integration ready', 'Analytics dashboard'],
    },
    {
      icon: Brain,
      title: 'Business Process Automation',
      description: 'Automate repetitive tasks and streamline workflows with AI-powered business process automation.',
      features: ['Workflow automation', 'Task automation', 'Process optimization', 'Integration ready', 'Real-time monitoring'],
    },
    {
      icon: Cpu,
      title: 'AI Marketing Automation',
      description: 'Personalize marketing campaigns with AI-powered segmentation, predictive analytics, and automated workflows.',
      features: ['Audience segmentation', 'Predictive analytics', 'Campaign automation', 'Personalization', 'Performance tracking'],
    },
    {
      icon: Sparkles,
      title: 'AI Content Systems',
      description: 'Generate, optimize, and distribute content at scale with AI-powered content creation systems.',
      features: ['Content generation', 'SEO optimization', 'Multi-platform distribution', 'Performance tracking', 'Workflow automation'],
    },
    {
      icon: MessageCircle,
      title: 'AI Customer Support',
      description: 'Provide instant, accurate customer support with AI-powered systems that reduce response times and costs.',
      features: ['Instant responses', 'Ticket routing', 'Sentiment analysis', 'Knowledge base integration', 'Analytics dashboard'],
    },
    {
      icon: Layers,
      title: 'Workflow Automation',
      description: 'Design and deploy automated workflows that eliminate manual tasks and improve operational efficiency.',
      features: ['Workflow design', 'Integration ready', 'Trigger-based actions', 'Error handling', 'Performance monitoring'],
    },
  ];

  const stats = [
    { value: '40%', label: 'Average Cost Reduction' },
    { value: '85%', label: 'Efficiency Increase' },
    { value: '97%', label: 'Client Satisfaction' },
    { value: '100+', label: 'Automations Built' },
  ];

  const tools = [
    'OpenAI ChatGPT',
    'Anthropic Claude',
    'Google Gemini',
    'Microsoft Copilot',
    'Zapier',
    'Make (Integromat)',
    'n8n',
    'Voiceflow',
    'Bubble.io',
    'Retool',
    'Power Automate',
    'UiPath',
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
    'Hospitality',
    'Energy',
    'Telecommunications',
  ];

  const processSteps = [
    {
      icon: Target,
      title: 'Discovery & Assessment',
      description: 'We analyze your business processes to identify automation opportunities and define success metrics.',
    },
    {
      icon: Cpu,
      title: 'Solution Design',
      description: 'We design AI-powered solutions tailored to your specific business needs and workflows.',
    },
    {
      icon: Bot,
      title: 'Development & Training',
      description: 'We build and train your AI systems with your data to ensure accuracy and performance.',
    },
    {
      icon: Rocket,
      title: 'Deployment & Optimization',
      description: 'We deploy your automation systems and continuously optimize for better performance and results.',
    },
  ];

  const faqs = [
    {
      q: 'What is AI automation?',
      a: 'AI automation uses artificial intelligence to perform repetitive tasks, analyze data, and make decisions with minimal human intervention. At BitSecureX Tech, we help businesses automate customer support, marketing, operations, and more using cutting-edge AI technologies.',
    },
    {
      q: 'How much does AI automation cost?',
      a: 'Costs vary based on the complexity of your requirements. Our AI solutions start from $1,500/month for chatbot implementation, with custom enterprise automation solutions available.',
    },
    {
      q: 'Can you automate my existing business processes?',
      a: 'Yes! We analyze your current workflows and identify automation opportunities that save time, reduce costs, and improve efficiency. We integrate with your existing systems and tools.',
    },
    {
      q: 'How long does it take to deploy AI automation?',
      a: 'Simple automations can be deployed in 2-4 weeks. Complex AI systems like custom chatbots or enterprise automation may take 8-12 weeks. We provide a detailed timeline during the assessment phase.',
    },
    {
      q: 'What industries have you worked with?',
      a: 'We have delivered AI automation solutions across technology, healthcare, finance, e-commerce, real estate, education, logistics, manufacturing, retail, and more.',
    },
  ];

  return (
    <>
      {/* ✅ SEO – FIRST CHILD INSIDE THE FRAGMENT */}
      <SEO
        title="AI & Automation Agency | Business Automation Solutions | BitSecureX Tech"
        description="BitSecureX Tech offers AI automation services including AI chatbots, workflow automation, business process automation, and AI marketing solutions. Reduce costs and scale operations with intelligent automation."
        keywords="AI automation, chatbots, workflow automation, business automation, AI marketing, process automation, AI solutions, intelligent automation"
        url="https://bitsecurex.tech/ai-automation"
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
                <span className="eyebrow text-electric-400">AI & Automation Agency</span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  AI Automation <span className="gradient-text">For Business Growth</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
                  BitSecureX Tech harnesses the power of artificial intelligence to automate your business
                  operations, reduce costs, and scale your growth. From AI chatbots and workflow automation
                  to intelligent marketing systems, we build automation that drives real results.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button onClick={() => nav('/contact')} className="btn-primary">
                    Get Free Automation Assessment <ArrowRight className="h-4 w-4" />
                  </button>
                  <button onClick={() => nav('/tools')} className="btn-ghost">
                    <Bot className="h-4 w-4" /> Explore Automation
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
                  Intelligent <span className="gradient-text">Automation Solutions</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  BitSecureX Tech provides cutting-edge AI automation services to help you eliminate
                  manual tasks, reduce costs, and scale your business operations.
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

        {/* TOOLS */}
        <section className="section-pad py-10">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">AI Tools & Platforms</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">
                  Cutting-Edge <span className="gradient-text">AI Technologies</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  We leverage the most advanced AI tools and platforms to build intelligent automation
                  systems for your business.
                </p>
              </Reveal>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {tools.map((tool, i) => (
                <Reveal key={i} delay={i * 30}>
                  <span className="glass rounded-full px-5 py-2.5 text-sm text-slate-300 hover:border-cyber-400/50 hover:text-white transition-colors">
                    {tool}
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
                  Automation for Every <span className="gradient-text">Industry</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  BitSecureX Tech has delivered AI automation solutions across 30+ industries.
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
                  How We <span className="gradient-text">Automate Your Business</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  A proven process that delivers AI automation solutions that reduce costs and drive growth.
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
                    Ready to <span className="gradient-text">Automate Your Business?</span>
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-slate-400">
                    Get a free, no-obligation automation assessment and discover how BitSecureX Tech can
                    help you reduce costs, increase efficiency, and scale your business with AI automation.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button onClick={() => nav('/contact')} className="btn-primary">
                      Get Free Assessment <ArrowRight className="h-4 w-4" />
                    </button>
                    <button onClick={() => nav('/services')} className="btn-ghost">
                      <Bot className="h-4 w-4" /> Explore All Services
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
export default AIAutomationPage;