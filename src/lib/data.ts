import {
  Code2,
  ShieldCheck,
  Boxes,
  Bot,
  Smartphone,
  Cloud,
  Lock,
  Bug,
  Globe,
  Zap,
  Server,
  BrainCircuit,
  DollarSign,
  Layers,
  Megaphone,
  BarChart3,
  Share2,
  FileText,
  ShoppingBag,
  Search,
  ShoppingCart,
  Gamepad2, // <--- ADDED THIS MISSING IMPORT
  type LucideIcon,
} from 'lucide-react';

// ============================================================
// 1. SERVICES – NEW STRUCTURE (Categories + Sub-Services)
// ============================================================

export interface SubService {
  label: string;
  description?: string;
}

export interface Service {
  slug: string;
  title: string;
  category: 'Technology' | 'Marketing' | 'Security' | 'Commerce';
  icon: LucideIcon;
  short: string;
  description: string;
  subServices: SubService[];
  features?: string[];
}

export const services: Service[] = [
  // ========== TECHNOLOGY ==========
  {
    slug: 'web-development',
    title: 'Web Development',
    category: 'Technology',
    icon: Code2,
    short: 'Professional websites, portals, dashboards, and web applications.',
    description: 'High-performance websites and web applications engineered for speed, SEO, and conversion.',
    subServices: [
      { label: 'Business Websites' },
      { label: 'Landing Pages' },
      { label: 'Custom Web Applications' },
      { label: 'Website Redesign' },
      { label: 'Website Optimization' },
      { label: 'UI/UX Design' },
    ],
    features: ['Business & Corporate Sites', 'Portals & Dashboards', 'E-commerce Stores', 'Booking Platforms', 'SEO Optimized', 'Headless CMS'],
  },
  {
    slug: 'software-solutions',
    title: 'Software Solutions',
    category: 'Technology',
    icon: Boxes,
    short: 'Custom applications, SaaS platforms, CRM, ERP, and business systems.',
    description: 'Tailored software that automates operations and scales with your business.',
    subServices: [
      { label: 'Custom Software Development' },
      { label: 'SaaS Platform Development' },
      { label: 'Business Dashboards' },
      { label: 'API Development & Integration' },
      { label: 'Internal Business Systems' },
    ],
    features: ['SaaS Platforms', 'Admin Dashboards', 'CRM / ERP', 'Customer Portals', 'Inventory Systems', 'API Development'],
  },
  {
    slug: 'ai-automation',
    title: 'AI & Automation',
    category: 'Technology',
    icon: Bot,
    short: 'AI solutions, chatbots, workflow automation, and process automation.',
    description: 'Intelligent automation that reduces manual work and unlocks new capabilities.',
    subServices: [
      { label: 'AI Chatbots & Virtual Agents' },
      { label: 'Business Automation' },
      { label: 'Workflow Automation' },
      { label: 'AI Marketing Automation' },
      { label: 'AI Customer Support' },
      { label: 'AI Content Systems' },
    ],
    features: ['AI Chatbots', 'Workflow Automation', 'Business Process Automation', 'AI Integrations', 'Data Pipelines', 'LLM Solutions'],
  },
  {
    slug: 'cloud-solutions',
    title: 'Cloud Solutions',
    category: 'Technology',
    icon: Cloud,
    short: 'Cloud deployment, VPS management, hosting, and secure infrastructure.',
    description: 'Scalable, secure cloud infrastructure built for reliability and performance.',
    subServices: [
      { label: 'Cloud Migration' },
      { label: 'Cloud Infrastructure Setup' },
      { label: 'Cloud Security' },
      { label: 'Cloud Storage Solutions' },
      { label: 'Cloud DevOps' },
      { label: 'CDN Setup' },
    ],
    features: ['Cloud Deployment', 'VPS Management', 'CI/CD Pipelines', 'Containerization', 'Monitoring', 'Disaster Recovery'],
  },
  {
    slug: 'mobile-apps',
    title: 'Mobile App Development',
    category: 'Technology',
    icon: Smartphone,
    short: 'Android, iOS, and cross-platform applications.',
    description: 'Native and cross-platform mobile apps with premium UX and secure backends.',
    subServices: [
      { label: 'iOS Development' },
      { label: 'Android Development' },
      { label: 'Cross-Platform Apps' },
      { label: 'Mobile UX/UI Design' },
      { label: 'App Store Optimization' },
    ],
    features: ['iOS Development', 'Android Development', 'Cross-Platform', 'Push Notifications', 'Offline-First', 'App Store Deployment'],
  },
  // ✅ FIXED: MOVED GAME DEVELOPMENT INSIDE THE ARRAY
  {
    slug: 'game-development',
    title: 'Game Development',
    category: 'Technology',
    icon: Gamepad2,
    short: 'Build immersive gaming experiences across all platforms.',
    description: 'From concept to launch, we create engaging games that captivate players and drive revenue.',
    subServices: [
      { label: 'Unity Development' },
      { label: 'Unreal Engine Development' },
      { label: '2D Game Design' },
      { label: '3D Game Design' },
      { label: 'Mobile Game Development' },
      { label: 'PC Game Development' },
      { label: 'Console Game Development' },
      { label: 'Game Testing & QA' },
    ],
    features: ['Unity', 'Unreal Engine', '2D & 3D Design', 'Mobile & PC', 'Optimization', 'Testing'],
  },

  // ========== MARKETING ==========
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'Marketing',
    icon: Megaphone,
    short: 'Data-driven marketing strategies that generate leads, build brand awareness, and scale revenue.',
    description: 'Comprehensive digital marketing services from strategy to execution across all major platforms. We help businesses attract, engage, and convert their ideal customers through a multi-channel approach.',
    subServices: [
      { label: 'Digital Marketing Strategy', description: 'Custom marketing plans aligned with your business goals.' },
      { label: 'Google Ads & PPC Management', description: 'Search, display, shopping, and performance max campaigns.' },
      { label: 'Facebook Ads Manager', description: 'Targeted campaigns across Facebook and Instagram.' },
      { label: 'Instagram Advertising', description: 'Visual campaigns that drive engagement and sales.' },
      { label: 'TikTok Advertising', description: 'Reach Gen Z and millennial audiences on the fastest-growing platform.' },
      { label: 'LinkedIn Advertising', description: 'B2B targeting for professional audiences.' },
      { label: 'YouTube Advertising', description: 'Video campaigns that build brand awareness and drive conversions.' },
      { label: 'Lead Generation Campaigns', description: 'Capture high-quality leads through targeted campaigns.' },
      { label: 'Conversion Optimization', description: 'Turn visitors into customers with data-driven improvements.' },
      { label: 'Sales Funnel Creation', description: 'Build automated funnels that nurture leads into paying customers.' },
      { label: 'Retargeting Campaigns', description: 'Re-engage website visitors who didn\'t convert.' },
      { label: 'Brand Awareness Campaigns', description: 'Build recognition and trust with your target audience.' },
      { label: 'Growth Hacking', description: 'Rapid experimentation to find the fastest growth channels.' },
      { label: 'Competitor & Market Research', description: 'Understand your market and outmaneuver competitors.' },
    ],
    features: ['Digital Strategy', 'Brand Awareness', 'Lead Generation', 'Conversion Optimization', 'Growth Hacking', 'Competitor Research'],
  },
  {
    slug: 'seo',
    title: 'SEO & Organic Traffic',
    category: 'Marketing',
    icon: BarChart3,
    short: 'Technical SEO, local SEO, Google My Business, and content strategy.',
    description: 'Google-certified SEO expertise with proven strategies to dominate search results.',
    subServices: [
      { label: 'Technical SEO' },
      { label: 'On-Page SEO' },
      { label: 'Off-Page SEO' },
      { label: 'Local SEO' },
      { label: 'Google My Business (GMB) Setup & Optimization' },
      { label: 'Google Maps Ranking' },
      { label: 'International SEO' },
      { label: 'Keyword Research' },
      { label: 'Competitor SEO Analysis' },
      { label: 'Website SEO Audit' },
      { label: 'Google Ranking Optimization' },
      { label: 'Backlink Strategy' },
      { label: 'Content SEO' },
      { label: 'Blog SEO' },
      { label: 'Organic Traffic Growth' },
    ],
    features: ['Technical SEO Audit', 'Keyword Research', 'Content Strategy', 'Link Building', 'Analytics Setup', 'Conversion Optimization'],
  },
  {
    slug: 'social-media',
    title: 'Social Media Marketing',
    category: 'Marketing',
    icon: Share2,
    short: 'Social media management, influencer marketing, and paid social advertising.',
    description: 'Build a powerful social presence and grow your audience with expert social media services.',
    subServices: [
      { label: 'Social Media Management' },
      { label: 'Social Media Marketing (SMM)' },
      { label: 'Content Strategy' },
      { label: 'Community Growth' },
      { label: 'Influencer Marketing' },
      { label: 'Viral Marketing Campaigns' },
      { label: 'Paid Social Advertising' },
      { label: 'Facebook Business Page Growth' },
      { label: 'Instagram Growth' },
      { label: 'TikTok Promotion' },
      { label: 'LinkedIn Marketing' },
      { label: 'Pinterest Marketing' },
    ],
    features: ['SMM Management', 'Content Strategy', 'Community Growth', 'Influencer Marketing', 'Viral Campaigns', 'Paid Social Ads'],
  },
  {
    slug: 'content-marketing',
    title: 'Content Marketing',
    category: 'Marketing',
    icon: FileText,
    short: 'Blog marketing, guest posting, content creation, and authority building.',
    description: 'Establish authority and attract organic traffic with strategic content marketing and distribution.',
    subServices: [
      { label: 'Blog Marketing' },
      { label: 'Guest Posting' },
      { label: 'Content Creation' },
      { label: 'Authority Building' },
      { label: 'Brand Storytelling' },
      { label: 'Affiliate Content Marketing' },
      { label: 'Sponsored Articles' },
      { label: 'SEO Articles' },
      { label: 'Brand Mentions' },
      { label: 'Product Promotion' },
    ],
    features: ['Blog Marketing', 'Guest Posting', 'Content Creation', 'Authority Building', 'Brand Storytelling', 'Affiliate Content'],
  },

  // ========== SECURITY ==========
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity',
    category: 'Security',
    icon: ShieldCheck,
    short: 'Security testing, vulnerability assessments, penetration testing, and consulting.',
    description: 'Offensive and defensive security services to protect your business against modern cyber threats.',
    subServices: [
      { label: 'Security Audits' },
      { label: 'Vulnerability Assessment' },
      { label: 'Security Hardening' },
      { label: 'Compliance (SOC2 / HIPAA / PCI-DSS)' },
      { label: 'Security Consulting' },
      { label: 'Web Vulnerability Assessment' },
      { label: 'Malware Detection & Removal' },
      { label: 'SSL Configuration' },
      { label: 'Network Security Assessment' },
    ],
    features: ['Penetration Testing', 'Vulnerability Assessment', 'Web App Security', 'API Security', 'Secure Code Review', 'Threat Intelligence'],
  },
  {
    slug: 'penetration-testing',
    title: 'Penetration Testing',
    category: 'Security',
    icon: Bug,
    short: 'Simulated real-world attacks to uncover exploitable weaknesses before adversaries do.',
    description: 'Comprehensive penetration testing aligned with OWASP, PTES, and CEH methodology.',
    subServices: [
      { label: 'Web Application Pen Testing' },
      { label: 'API Pen Testing' },
      { label: 'Network Pen Testing' },
      { label: 'Mobile App Pen Testing' },
      { label: 'Social Engineering Testing' },
      { label: 'Security Headers Configuration' },
      { label: 'Detailed Remediation Reports' },
    ],
    features: ['OWASP Testing', 'API Security Testing', 'Network Testing', 'Mobile Testing', 'Secure Code Review', 'Compliance'],
  },

  // ========== COMMERCE ==========
  {
    slug: 'ecommerce',
    title: 'Ecommerce Development',
    category: 'Commerce',
    icon: ShoppingBag,
    short: 'Shopify, Amazon, Etsy, and custom ecommerce solutions.',
    description: 'Launch and scale your online store with expert ecommerce development and growth strategies.',
    subServices: [
      { label: 'Shopify Store Setup' },
      { label: 'Shopify Store Design' },
      { label: 'Shopify Store Redesign' },
      { label: 'Premium Theme Customization' },
      { label: 'Shopify Development' },
      { label: 'Shopify Dropshipping Stores' },
      { label: 'Amazon Store Setup' },
      { label: 'Etsy Shop Setup' },
      { label: 'eBay Store Setup' },
      { label: 'Product Store Optimization' },
      { label: 'Conversion Optimization' },
      { label: 'Payment Integration' },
      { label: 'App Integration' },
      { label: 'Shopify Marketing' },
      { label: 'Ecommerce Growth Strategy' },
      { label: 'Product Marketing' },
      { label: 'Store Branding' },
      { label: 'Customer Acquisition' },
    ],
    features: ['Shopify Store Setup', 'Theme Customization', 'Payment Integration', 'Ecommerce Growth Strategy', 'Product Marketing'],
  },
];

// ============================================================
// 2. HELPER FUNCTIONS
// ============================================================

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: Service['category']): Service[] {
  return services.filter((s) => s.category === category);
}

export function getAllServices(): Service[] {
  return services;
}

export const serviceCategories = [
  { label: 'Technology', icon: Code2, services: getServicesByCategory('Technology') },
  { label: 'Marketing', icon: Megaphone, services: getServicesByCategory('Marketing') },
  { label: 'Security', icon: ShieldCheck, services: getServicesByCategory('Security') },
  { label: 'Commerce', icon: ShoppingBag, services: getServicesByCategory('Commerce') },
] as const;

// ============================================================
// 3. EXISTING DATA (Preserved)
// ============================================================

export const coreServices: Service[] = services;

export const industries = [
  'Finance', 'Real Estate', 'Healthcare', 'Logistics', 'E-commerce',
  'Education', 'Construction', 'Beauty Industry', 'Technology Startups',
];

export const webDevTypes = [
  'Business Websites', 'Corporate Websites', 'Landing Pages', 'Portfolio Websites',
  'Personal Brand Websites', 'E-commerce Stores', 'Marketplace Websites',
  'Booking Websites', 'Real Estate Websites', 'Restaurant Websites',
  'Salon & Barbershop Websites', 'School Websites', 'Hospital Websites',
  'Logistics Websites', 'Delivery Websites', 'Moving Company Websites',
  'HR Recruitment Websites', 'Construction Websites', 'Football Academy Websites',
];

export const softwareTypes = [
  'SaaS Platforms', 'Admin Dashboards', 'CRM Systems', 'ERP Systems',
  'Customer Portals', 'Vendor Portals', 'Membership Platforms',
  'Booking Management Systems', 'Inventory Systems', 'Payment Systems',
  'API Development', 'Secure Web Applications',
];

export const fintechTypes = [
  'Banking Platforms', 'Banking Login Interfaces', 'Fintech Applications',
  'Digital Wallet Systems', 'Forex Broker Platforms', 'Trading Platforms',
  'Crypto Websites', 'Web3 Platforms', 'Blockchain Applications',
  'Crypto Research Platforms',
];

// ============================================================
// 4. SECURITY SERVICES
// ============================================================

export const securityServices = [
  { icon: Bug, title: 'Penetration Testing', desc: 'Simulated real-world attacks to uncover exploitable weaknesses before adversaries do.' },
  { icon: ShieldCheck, title: 'Vulnerability Assessment', desc: 'Comprehensive scanning and manual validation across your entire attack surface.' },
  { icon: Code2, title: 'Web Application Security Testing', desc: 'OWASP-aligned testing of your web apps for injection, auth, and logic flaws.' },
  { icon: Lock, title: 'API Security Testing', desc: 'Authorization, rate-limit, and schema abuse testing for REST and GraphQL APIs.' },
  { icon: Smartphone, title: 'Mobile Application Security Testing', desc: 'Static and dynamic analysis of Android and iOS applications and backends.' },
  { icon: Cloud, title: 'Network Security Testing', desc: 'Infrastructure, host, and perimeter testing to harden your network posture.' },
  { icon: ShieldCheck, title: 'Security Audits', desc: 'Policy, compliance, and architecture reviews against industry frameworks.' },
  { icon: Code2, title: 'Secure Code Review', desc: 'Line-by-line source review to catch vulnerabilities at the code level.' },
  { icon: Lock, title: 'Website Hardening', desc: 'Server, WAF, TLS, and header hardening to lock down production systems.' },
  { icon: Bug, title: 'Threat Intelligence', desc: 'Actionable intelligence on threats targeting your industry and stack.' },
  { icon: ShieldCheck, title: 'Security Research', desc: 'Custom research into zero-days and emerging attack vectors.' },
  { icon: Code2, title: 'CEH-Based Security Consulting', desc: 'Certified Ethical Hacker methodology consulting and remediation guidance.' },
];

// ============================================================
// 5. PROJECTS & PORTFOLIO
// ============================================================

export type Project = {
  slug: string;
  title: string;
  category: string;
  industry: string;
  problem: string;
  solution: string;
  tech: string[];
  results: { label: string; value: string }[];
  image: string;
  accent: string;
  liveDemo?: string;
  github?: string;
  isAdmin?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'real-estate-platform',
    title: 'EstateVue - Real Estate Platform',
    category: 'Web Apps',
    industry: 'Real Estate',
    problem: 'Client needed a modern platform to showcase properties with fast search and inquiry workflows.',
    solution: 'Built a responsive React platform with property listings, advanced filters, inquiry forms, and SEO optimization.',
    tech: ['React', 'Supabase', 'Tailwind', 'Mapbox'],
    results: [{ label: 'Page Speed', value: '98/100' }, { label: 'Inquiries', value: '+240%' }, { label: 'SEO Score', value: '100' }],
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&w=1200',
    accent: 'from-cyber-500 to-electric-500',
    liveDemo: '#/portfolio',
    github: '#',
  },
  {
    slug: 'fintech-wallet',
    title: 'PayVault - Digital Wallet',
    category: 'Fintech',
    industry: 'Finance',
    problem: 'A fintech startup needed a secure digital wallet with KYC and real-time transactions.',
    solution: 'Delivered a PCI-aware wallet platform with multi-factor auth, ledger system, and fraud monitoring.',
    tech: ['Next.js', 'Node', 'PostgreSQL', 'Stripe'],
    results: [{ label: 'Transactions', value: '50k+/mo' }, { label: 'Uptime', value: '99.99%' }, { label: 'Fraud Drop', value: '-87%' }],
    image: 'https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg?auto=compress&w=1200',
    accent: 'from-electric-500 to-cyber-500',
    liveDemo: '#/portfolio',
    github: '#',
  },
  {
    slug: 'saas-crm',
    title: 'NexusCRM - SaaS Platform',
    category: 'SaaS',
    industry: 'Technology Startups',
    problem: 'A B2B startup needed a multi-tenant CRM with automation and analytics.',
    solution: 'Built a multi-tenant SaaS CRM with role-based access, workflow automation, and a real-time analytics dashboard.',
    tech: ['React', 'Supabase', 'Edge Functions', 'Tailwind'],
    results: [{ label: 'Tenants', value: '300+' }, { label: 'MRR', value: '+180%' }, { label: 'Churn', value: '-32%' }],
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&w=1200',
    accent: 'from-cyber-400 to-cyber-600',
    liveDemo: '#/portfolio',
    github: '#',
  },
  {
    slug: 'pentest-banking',
    title: 'BankShield - Penetration Test',
    category: 'Security',
    industry: 'Finance',
    problem: 'A digital bank required a pre-launch penetration test to meet compliance and protect customer funds.',
    solution: 'Conducted black-box and grey-box penetration testing across web, API, and mobile surfaces with full remediation support.',
    tech: ['Burp Suite', 'Metasploit', 'OWASP ZAP', 'Custom Scripts'],
    results: [{ label: 'Vulns Found', value: '23' }, { label: 'Critical', value: '4' }, { label: 'Remediation', value: '100%' }],
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&w=1200',
    accent: 'from-electric-500 to-cyber-700',
    liveDemo: '#/cybersecurity',
    github: '#',
  },
  {
    slug: 'ecommerce-app',
    title: 'ShopFlow - E-commerce + Mobile',
    category: 'Web Apps',
    industry: 'E-commerce',
    problem: 'A retailer needed a unified web store and mobile app with inventory sync.',
    solution: 'Built a headless e-commerce platform with a React storefront and cross-platform mobile app sharing one API.',
    tech: ['React', 'React Native', 'Supabase', 'Stripe'],
    results: [{ label: 'Conversion', value: '+64%' }, { label: 'Mobile Orders', value: '48%' }, { label: 'Load Time', value: '0.8s' }],
    image: 'https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg?auto=compress&w=1200',
    accent: 'from-cyber-500 to-electric-400',
    liveDemo: '#/portfolio',
    github: '#',
  },
  {
    slug: 'automation-hr',
    title: 'AutoHR - Recruitment Automation',
    category: 'SaaS',
    industry: 'Technology Startups',
    problem: 'An HR firm spent 20+ hours/week screening candidates manually.',
    solution: 'Deployed an AI-powered screening pipeline with automated scheduling, scoring, and CRM integration.',
    tech: ['Python', 'OpenAI', 'Supabase', 'n8n'],
    results: [{ label: 'Hours Saved', value: '18/wk' }, { label: 'Time-to-Hire', value: '-41%' }, { label: 'Accuracy', value: '94%' }],
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&w=1200',
    accent: 'from-electric-600 to-cyber-500',
    liveDemo: '#/portfolio',
    github: '#',
  },
  {
    slug: 'crypto-trading-bot',
    title: 'AlphaBot - AI Crypto Trading Bot',
    category: 'Fintech',
    industry: 'Finance',
    problem: 'A trading firm needed an AI-powered bot to execute strategies 24/7 with risk management.',
    solution: 'Built a Python-based trading bot with ML market analysis, backtesting engine, and real-time risk controls.',
    tech: ['Python', 'TensorFlow', 'CCXT', 'PostgreSQL'],
    results: [{ label: 'Win Rate', value: '68%' }, { label: 'Trades/day', value: '340+' }, { label: 'Max Drawdown', value: '-4.2%' }],
    image: 'https://images.pexels.com/photos/8437009/pexels-photo-8437009.jpeg?auto=compress&w=1200',
    accent: 'from-cyber-500 to-electric-500',
    liveDemo: '#/portfolio',
    github: '#',
  },
];

export const portfolioCategories = ['All', 'Web Apps', 'SaaS', 'Security', 'Fintech'];

// ============================================================
// 6. CASE STUDIES
// ============================================================

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  strategy: string;
  design: string;
  development: string;
  security: string;
  results: { label: string; value: string }[];
  image: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'payvault-digital-wallet',
    title: 'PayVault - Securing a Digital Wallet at Scale',
    client: 'PayVault Fintech',
    industry: 'Finance / Fintech',
    challenge: 'A fast-growing fintech needed to launch a digital wallet supporting 50k+ monthly transactions while passing regulatory security review and preventing fraud.',
    strategy: 'We adopted a security-first SDLC: threat modeling before a single line of code, defense-in-depth architecture, and continuous penetration testing alongside development rather than after.',
    design: 'A clean, trustworthy interface with progressive disclosure for sensitive actions, biometric prompts, and real-time transaction feedback. Accessibility and clarity were prioritized for financial confidence.',
    development: 'Multi-tenant Node.js services on a PostgreSQL ledger, event-driven architecture, idempotent payment endpoints, and a React frontend with optimistic UI updates.',
    security: 'Multi-factor authentication, signed requests, rate limiting, fraud-detection heuristics, encrypted secrets vault, and a full penetration test before launch with remediation tracking.',
    results: [{ label: 'Transactions', value: '50k+/mo' }, { label: 'Uptime', value: '99.99%' }, { label: 'Fraud Drop', value: '-87%' }, { label: 'Compliance', value: 'Passed' }],
    image: 'https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg?auto=compress&w=1200',
  },
  {
    slug: 'bankshield-pentest',
    title: 'BankShield - Pre-Launch Penetration Test',
    client: 'A Digital Bank',
    industry: 'Finance / Cybersecurity',
    challenge: 'A digital bank preparing for launch needed to identify and remediate every critical vulnerability before going live to protect customer funds and meet compliance.',
    strategy: 'Black-box and grey-box penetration testing across web, API, and mobile surfaces, aligned with OWASP and PTES methodologies, with daily findings and joint remediation sessions.',
    design: 'Security findings were translated into developer-friendly reports with reproduction steps, severity ratings, and prioritized fix recommendations.',
    development: 'Custom automation for regression testing of fixes, plus integration of security checks into the CI/CD pipeline to prevent regressions.',
    security: '23 vulnerabilities discovered including 4 critical; all remediated and re-tested before launch. WAF rules and monitoring tuned based on attack patterns observed.',
    results: [{ label: 'Vulns Found', value: '23' }, { label: 'Critical', value: '4' }, { label: 'Remediation', value: '100%' }, { label: 'Launch', value: 'On Time' }],
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&w=1200',
  },
  {
    slug: 'autohr-recruitment',
    title: 'AutoHR - AI Recruitment Automation',
    client: 'A Recruitment Agency',
    industry: 'HR / Automation',
    challenge: 'An HR firm was spending 20+ hours per week manually screening resumes and scheduling interviews, slowing time-to-hire and limiting growth.',
    strategy: 'We mapped the recruitment funnel and identified automation points: resume parsing, AI scoring, automated scheduling, and CRM sync - all orchestrated through a single pipeline.',
    design: 'A simple recruiter dashboard surfacing AI scores, candidate summaries, and one-click scheduling, keeping humans in control of final decisions.',
    development: 'Python services with OpenAI for scoring, n8n for orchestration, Supabase for state, and a React dashboard. The pipeline processes candidates in under 30 seconds.',
    security: 'Candidate data encrypted at rest, role-based access for recruiters, audit logging, and PII redaction in AI prompts to protect privacy.',
    results: [{ label: 'Hours Saved', value: '18/wk' }, { label: 'Time-to-Hire', value: '-41%' }, { label: 'Accuracy', value: '94%' }, { label: 'Satisfaction', value: '+22%' }],
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&w=1200',
  },
];

// ============================================================
// 7. BLOG
// ============================================================

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'owasp-top-10-2025',
    title: 'The OWASP Top 10 in 2025: What Changed and Why It Matters',
    category: 'Cybersecurity',
    excerpt: 'A practical walkthrough of the latest OWASP Top 10 changes and how to defend against each category of web vulnerability.',
    date: 'Jun 28, 2025',
    readTime: '8 min',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&w=1000',
  },
  {
    slug: 'ethical-hacking-mindset',
    title: 'The Ethical Hacking Mindset: Thinking Like an Attacker',
    category: 'Ethical Hacking',
    excerpt: 'How security professionals model adversary behavior to find weaknesses before real attackers do.',
    date: 'Jun 14, 2025',
    readTime: '6 min',
    image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&w=1000',
  },
  {
    slug: 'saas-architecture-2025',
    title: 'Building Multi-Tenant SaaS That Scales',
    category: 'SaaS',
    excerpt: 'Architecture patterns for multi-tenant SaaS: row-level security, tenant isolation, and scalable billing.',
    date: 'May 30, 2025',
    readTime: '10 min',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&w=1000',
  },
  {
    slug: 'ai-automation-playbook',
    title: 'The AI Automation Playbook for Small Businesses',
    category: 'AI',
    excerpt: 'Concrete workflows you can automate today with AI to save hours every week - without replacing your team.',
    date: 'May 18, 2025',
    readTime: '7 min',
    image: 'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&w=1000',
  },
  {
    slug: 'vulnerability-research-intro',
    title: 'Getting Started With Vulnerability Research',
    category: 'Vulnerability Research',
    excerpt: 'A beginner-friendly guide to responsibly researching and reporting security vulnerabilities.',
    date: 'May 02, 2025',
    readTime: '9 min',
    image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&w=1000',
  },
  {
    slug: 'digital-transformation-guide',
    title: 'Digital Transformation Without the Chaos',
    category: 'Digital Transformation',
    excerpt: 'A phased approach to modernizing legacy systems without disrupting your business.',
    date: 'Apr 20, 2025',
    readTime: '11 min',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&w=1000',
  },
];

export const blogCategories = [
  'Cybersecurity', 'Ethical Hacking', 'Vulnerability Research',
  'Security Awareness', 'Malware Analysis', 'Web Development', 'SaaS',
  'AI', 'Automation', 'Digital Transformation', 'Online Growth',
];

// ============================================================
// 8. CERTIFICATIONS
// ============================================================

export const certifications = [
  { name: 'CompTIA Network+', issuer: 'CompTIA', color: '#e63946' },
  { name: 'CompTIA Security+', issuer: 'CompTIA', color: '#e63946' },
  { name: 'CompTIA A+', issuer: 'CompTIA', color: '#e63946' },
  { name: 'CompTIA Pentest+', issuer: 'CompTIA', color: '#e63946' },
  { name: 'Certified Ethical Hacker (CEH)', issuer: 'EC-Council', color: '#0066ff' },
  { name: 'CCNA Ethical Hacking', issuer: 'Cisco', color: '#00b85f' },
  { name: 'NIIT Full-Stack', issuer: 'NIIT', color: '#f59e0b' },
  { name: 'Udemy Certifications', issuer: 'Udemy', color: '#a855f7' },
  { name: 'Google Certified SEO', issuer: 'Google', color: '#0066ff' },
  { name: 'SEMrush Certified', issuer: 'SEMrush', color: '#00e676' },
];

// ============================================================
// 9. SKILL MATRIX & TECH STACK
// ============================================================

export const skillMatrix = [
  { skill: 'Pentesting', value: 95 },
  { skill: 'Networking', value: 88 },
  { skill: 'Full-Stack', value: 92 },
  { skill: 'SEO', value: 85 },
  { skill: 'Cloud', value: 90 },
];

export const techStack = [
  { name: 'React', icon: Code2 },
  { name: 'Next.js', icon: Layers },
  { name: 'Node.js', icon: Server },
  { name: 'TypeScript', icon: Code2 },
  { name: 'Supabase', icon: Boxes },
  { name: 'PostgreSQL', icon: Boxes },
  { name: 'Tailwind', icon: Code2 },
  { name: 'Docker', icon: Server },
  { name: 'AWS', icon: Cloud },
  { name: 'Python', icon: Code2 },
  { name: 'OpenAI', icon: BrainCircuit },
  { name: 'Stripe', icon: DollarSign },
];

// ============================================================
// 10. TEAM & TESTIMONIALS
// ============================================================

export const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO, PayVault',
    company: 'PayVault Fintech',
    project: 'Digital Wallet',
    rating: 5,
    text: 'BitSecureX delivered our wallet platform ahead of schedule and passed our compliance audit on the first try. Their security-first approach saved us months.',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&w=200',
  },
  {
    name: 'Marcus Johnson',
    role: 'Founder, EstateVue',
    company: 'EstateVue',
    project: 'Real Estate Platform',
    rating: 5,
    text: 'The platform they built doubled our inquiries in three months. Fast, beautiful, and SEO-optimized. Worth every penny.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&w=200',
  },
  {
    name: 'Elena Rodriguez',
    role: 'VP Engineering, NexusCRM',
    company: 'NexusCRM',
    project: 'SaaS Platform',
    rating: 5,
    text: 'They architected our multi-tenant SaaS from scratch. Clean code, proper RLS, and the automation features are a game-changer.',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&w=200',
  },
];

export type ClientReview = {
  name: string;
  role: string;
  company: string;
  project: string;
  rating: number;
  text: string;
  country: string;
  flag: string;
  date: string;
  recent?: boolean;
};

export const clientReviews: ClientReview[] = [
  {
    name: 'Aisha Bello',
    role: 'CEO',
    company: 'Lagos Retail Group',
    project: 'E-commerce Store',
    rating: 5,
    country: 'Nigeria',
    flag: 'NG',
    date: '2025-07-05',
    recent: true,
    text: 'BitSecureX built our online store in three weeks. Sales doubled in the first month. The team in Lagos was responsive and professional throughout.',
  },
  {
    name: 'David Okafor',
    role: 'Founder',
    company: 'Abuja FinTech',
    project: 'Banking Dashboard',
    rating: 5,
    country: 'Nigeria',
    flag: 'NG',
    date: '2025-07-02',
    recent: true,
    text: 'They delivered a secure banking dashboard that passed our central bank compliance review on the first attempt. Exceptional security expertise.',
  },
  {
    name: 'Priya Sharma',
    role: 'CTO',
    company: 'Mumbai Tech Labs',
    project: 'SaaS Platform',
    rating: 5,
    country: 'India',
    flag: 'IN',
    date: '2025-06-28',
    recent: true,
    text: 'The multi-tenant SaaS they built scales effortlessly. Clean architecture, proper RLS, and the automation saves us 20 hours a week.',
  },
  {
    name: 'Raj Patel',
    role: 'Product Manager',
    company: 'Bangalore Health',
    project: 'Telehealth Portal',
    rating: 5,
    country: 'India',
    flag: 'IN',
    date: '2025-06-25',
    text: 'HIPAA-compliant telehealth portal delivered on time. The video conferencing integration is seamless and our doctors love it.',
  },
  {
    name: 'James Wilson',
    role: 'Director',
    company: 'London Capital',
    project: 'Penetration Testing',
    rating: 5,
    country: 'United Kingdom',
    flag: 'GB',
    date: '2025-06-22',
    text: 'Thorough penetration test that found vulnerabilities we missed. Their remediation guidance was clear and actionable. Highly recommended.',
  },
  {
    name: 'Emily Carter',
    role: 'Owner',
    company: 'Austin Realty',
    project: 'Real Estate Website',
    rating: 5,
    country: 'United States',
    flag: 'US',
    date: '2025-06-20',
    text: 'Our new real estate website loads in under a second and inquiries are up 240%. The SEO optimization is incredible.',
  },
  {
    name: 'Michael Brown',
    role: 'VP Engineering',
    company: 'New York SaaS Co',
    project: 'CRM System',
    rating: 5,
    country: 'United States',
    flag: 'US',
    date: '2025-06-18',
    text: 'They built our CRM from scratch with proper role-based access and automation. The code quality is the best I have seen in years.',
  },
  {
    name: 'Olivia Martin',
    role: 'Marketing Head',
    company: 'Toronto Digital',
    project: 'SEO & Marketing',
    rating: 5,
    country: 'Canada',
    flag: 'CA',
    date: '2025-06-15',
    text: 'Our organic traffic tripled in four months after their SEO work. Google-certified expertise that actually delivers results.',
  },
  {
    name: 'William Davis',
    role: 'CEO',
    company: 'Vancouver Logistics',
    project: 'Inventory System',
    rating: 5,
    country: 'Canada',
    flag: 'CA',
    date: '2025-06-12',
    text: 'The inventory management system they built integrates perfectly with our existing tools. Saved us countless hours of manual work.',
  },
  {
    name: 'Wei Lin',
    role: 'CTO',
    company: 'Singapore Finance',
    project: 'Trading Bot AI',
    rating: 5,
    country: 'Singapore',
    flag: 'SG',
    date: '2025-06-10',
    text: 'The AI trading bot they developed has a 68% win rate. Their risk management controls are excellent and the backtesting engine is robust.',
  },
  {
    name: 'Sophie Dubois',
    role: 'Founder',
    company: 'Paris Beauty',
    project: 'E-commerce Store',
    rating: 5,
    country: 'France',
    flag: 'FR',
    date: '2025-06-08',
    text: 'Beautiful e-commerce store for our beauty brand. The design is elegant and the checkout flow converts beautifully. Très bien!',
  },
  {
    name: 'Ahmed Al-Sabah',
    role: 'Director',
    company: 'Kuwait Holdings',
    project: 'Corporate Website',
    rating: 5,
    country: 'Kuwait',
    flag: 'KW',
    date: '2025-06-05',
    text: 'Professional corporate website with Arabic and English support. The team understood our cultural requirements perfectly.',
  },
  {
    name: 'Fatima Hassan',
    role: 'Owner',
    company: 'Karachi Fashion',
    project: 'Online Store',
    rating: 5,
    country: 'Pakistan',
    flag: 'PK',
    date: '2025-06-03',
    text: 'Our fashion e-commerce store is stunning and fast. The team in Karachi was always available to help. Highly recommended.',
  },
  {
    name: 'Bilal Khan',
    role: 'CEO',
    company: 'Lahore Tech',
    project: 'Mobile App',
    rating: 5,
    country: 'Pakistan',
    flag: 'PK',
    date: '2025-06-01',
    text: 'They built our cross-platform mobile app with offline support and push notifications. The UX is premium and our users love it.',
  },
  {
    name: 'Mohammed Rahman',
    role: 'CTO',
    company: 'Dubai Properties',
    project: 'Real Estate Platform',
    rating: 5,
    country: 'UAE',
    flag: 'AE',
    date: '2025-05-28',
    text: 'A world-class real estate platform with advanced search and map integration. Inquiries increased by 200% in two months.',
  },
  {
    name: 'Carlos Santos',
    role: 'Founder',
    company: 'Madrid Startups',
    project: 'SaaS Platform',
    rating: 5,
    country: 'Spain',
    flag: 'ES',
    date: '2025-05-25',
    text: 'They architected our multi-tenant SaaS with Stripe billing and RBAC. The code is clean and the platform scales effortlessly.',
  },
  {
    name: 'Yuki Tanaka',
    role: 'Product Lead',
    company: 'Tokyo Robotics',
    project: 'API Development',
    rating: 5,
    country: 'Japan',
    flag: 'JP',
    date: '2025-05-22',
    text: 'Robust API development with excellent documentation and rate limiting. Their security-first approach gave us confidence.',
  },
  {
    name: 'Hans Mueller',
    role: 'CTO',
    company: 'Berlin Industries',
    project: 'ERP System',
    rating: 5,
    country: 'Germany',
    flag: 'DE',
    date: '2025-05-20',
    text: 'They built our ERP system with inventory, HR, and finance modules. German engineering quality with global expertise.',
  },
  {
    name: 'Anna Kowalski',
    role: 'Owner',
    company: 'Warsaw Beauty',
    project: 'Salon Website',
    rating: 5,
    country: 'Poland',
    flag: 'PL',
    date: '2025-05-18',
    text: 'A beautiful salon website with online booking. Our appointment bookings doubled in the first month. Fantastic work.',
  },
  {
    name: 'Lucas Silva',
    role: 'CEO',
    company: 'Sao Paulo Tech',
    project: 'Fintech App',
    rating: 5,
    country: 'Brazil',
    flag: 'BR',
    date: '2025-05-15',
    text: 'They built our fintech application with bank-grade security. The penetration test they conducted found zero critical issues.',
  },
  {
    name: 'Maria Garcia',
    role: 'Marketing Director',
    company: 'Mexico City Media',
    project: 'News Platform',
    rating: 5,
    country: 'Mexico',
    flag: 'MX',
    date: '2025-05-12',
    text: 'Our news platform handles millions of readers with zero downtime. The CDN setup and caching are excellent.',
  },
  {
    name: 'Liam OConnor',
    role: 'Founder',
    company: 'Dublin SaaS',
    project: 'Customer Portal',
    rating: 5,
    country: 'Ireland',
    flag: 'IE',
    date: '2025-05-10',
    text: 'The customer portal they built has tickets, files, invoices, and audits all in one place. Our clients love the transparency.',
  },
  {
    name: 'Emma Nilsson',
    role: 'CTO',
    company: 'Stockholm Green',
    project: 'IoT Dashboard',
    rating: 5,
    country: 'Sweden',
    flag: 'SE',
    date: '2025-05-08',
    text: 'They built a real-time IoT dashboard for our solar energy monitoring. The data visualization is beautiful and performant.',
  },
  {
    name: 'Noah Weber',
    role: 'Director',
    company: 'Zurich Finance',
    project: 'Security Audit',
    rating: 5,
    country: 'Switzerland',
    flag: 'CH',
    date: '2025-05-05',
    text: 'A comprehensive security audit that met our strict Swiss banking standards. Their report was detailed and professional.',
  },
  {
    name: 'Chloe Andre',
    role: 'CEO',
    company: 'Montreal Fashion',
    project: 'E-commerce Store',
    rating: 5,
    country: 'Canada',
    flag: 'CA',
    date: '2025-05-03',
    text: 'A stunning e-commerce store with bilingual support. The abandoned cart recovery feature recovered 15% of lost sales.',
  },
  {
    name: 'Daniel Kim',
    role: 'CTO',
    company: 'Seoul Tech',
    project: 'AI Chatbot',
    rating: 5,
    country: 'South Korea',
    flag: 'KR',
    date: '2025-04-30',
    text: 'The AI chatbot they built handles 80% of our customer queries automatically. The LLM integration is impressive.',
  },
  {
    name: 'Isabella Rossi',
    role: 'Owner',
    company: 'Milan Design',
    project: 'Portfolio Website',
    rating: 5,
    country: 'Italy',
    flag: 'IT',
    date: '2025-04-28',
    text: 'A portfolio website that showcases our design work beautifully. The animations and transitions are elegant and smooth.',
  },
  {
    name: 'Omar Farouk',
    role: 'CEO',
    company: 'Cairo Education',
    project: 'LMS Platform',
    rating: 5,
    country: 'Egypt',
    flag: 'EG',
    date: '2025-04-25',
    text: 'They built our learning management system with video conferencing and progress tracking. Our students love the experience.',
  },
  {
    name: 'Grace Adeyemi',
    role: 'Founder',
    company: 'Nairobi AgriTech',
    project: 'Mobile App',
    rating: 5,
    country: 'Nigeria',
    flag: 'NG',
    date: '2025-04-22',
    text: 'A mobile app for our agricultural platform that works offline in rural areas. The team understood our unique challenges.',
  },
  {
    name: 'Tunde Bakare',
    role: 'CTO',
    company: 'Port Harcourt Oil',
    project: 'Security Audit',
    rating: 5,
    country: 'Nigeria',
    flag: 'NG',
    date: '2025-04-20',
    text: 'Their penetration testing found critical vulnerabilities in our oil sector platform. The remediation support was excellent.',
  },
  {
    name: 'Arjun Mehta',
    role: 'Product Manager',
    company: 'Delhi E-commerce',
    project: 'Marketplace',
    rating: 5,
    country: 'India',
    flag: 'IN',
    date: '2025-04-18',
    text: 'They built our multi-vendor marketplace with escrow and commission management. The platform handles 10,000+ vendors.',
  },
  {
    name: 'Sneha Reddy',
    role: 'CEO',
    company: 'Hyderabad Health',
    project: 'Medical Portal',
    rating: 5,
    country: 'India',
    flag: 'IN',
    date: '2025-04-15',
    text: 'A HIPAA-compliant medical portal with telehealth and records management. Their security expertise is top-notch.',
  },
  {
    name: 'George Thompson',
    role: 'CTO',
    company: 'Manchester SaaS',
    project: 'Workflow Automation',
    rating: 5,
    country: 'United Kingdom',
    flag: 'GB',
    date: '2025-04-12',
    text: 'They automated our entire recruitment workflow with AI scoring. We save 18 hours per week and hiring is 41% faster.',
  },
  {
    name: 'Charlotte Davies',
    role: 'Owner',
    company: 'Cardiff Retail',
    project: 'E-commerce Store',
    rating: 5,
    country: 'United Kingdom',
    flag: 'GB',
    date: '2025-04-10',
    text: 'A beautiful online store with multi-currency support. Our international sales grew by 60% after launch.',
  },
  {
    name: 'Benjamin Lee',
    role: 'Director',
    company: 'San Francisco AI',
    project: 'LLM Integration',
    rating: 5,
    country: 'United States',
    flag: 'US',
    date: '2025-04-08',
    text: 'They integrated LLMs into our product with RAG and custom prompts. The AI capabilities they added are a game-changer.',
  },
  {
    name: 'Victoria Chang',
    role: 'CEO',
    company: 'Seattle Startups',
    project: 'Landing Page',
    rating: 5,
    country: 'United States',
    flag: 'US',
    date: '2025-04-05',
    text: 'A high-converting landing page that loads in 0.8 seconds. Our sign-up rate increased by 45% after the redesign.',
  },
  {
    name: 'Henry Walker',
    role: 'CTO',
    company: 'Calgary Energy',
    project: 'Data Pipeline',
    rating: 5,
    country: 'Canada',
    flag: 'CA',
    date: '2025-04-02',
    text: 'They built a robust data pipeline with ETL, analytics, and dashboards. We now make data-driven decisions in real-time.',
  },
  {
    name: 'Ruby Chen',
    role: 'Founder',
    company: 'Ottawa Education',
    project: 'Job Board',
    rating: 5,
    country: 'Canada',
    flag: 'CA',
    date: '2025-03-30',
    text: 'A job board platform with AI-powered candidate matching. Our placement rate improved by 35%.',
  },
  {
    name: 'Jia Hui Tan',
    role: 'CTO',
    company: 'Singapore Logistics',
    project: 'Inventory System',
    rating: 5,
    country: 'Singapore',
    flag: 'SG',
    date: '2025-03-28',
    text: 'A real-time inventory system with barcode scanning and supplier management. Our stock accuracy is now 99.8%.',
  },
  {
    name: 'Camille Laurent',
    role: 'Owner',
    company: 'Lyon Restaurant',
    project: 'Food Delivery',
    rating: 5,
    country: 'France',
    flag: 'FR',
    date: '2025-03-25',
    text: 'A food delivery platform with real-time tracking. Our delivery time decreased by 30% and customer satisfaction is up.',
  },
  {
    name: 'Abdullah Khalid',
    role: 'CEO',
    company: 'Kuwait Finance',
    project: 'Trading Platform',
    rating: 5,
    country: 'Kuwait',
    flag: 'KW',
    date: '2025-03-22',
    text: 'A secure trading platform with multi-currency support. Their security testing gave us complete confidence.',
  },
  {
    name: 'Zainab Ali',
    role: 'Director',
    company: 'Islamabad Education',
    project: 'School Website',
    rating: 5,
    country: 'Pakistan',
    flag: 'PK',
    date: '2025-03-20',
    text: 'A modern school website with online admissions and parent portal. Our enrollment inquiries increased by 80%.',
  },
  {
    name: 'Hassan Malik',
    role: 'CTO',
    company: 'Multan Industries',
    project: 'ERP System',
    rating: 5,
    country: 'Pakistan',
    flag: 'PK',
    date: '2025-03-18',
    text: 'They built our ERP with inventory, HR, and finance modules. Our operational efficiency improved by 40%.',
  },
  {
    name: 'Layla Mansour',
    role: 'Founder',
    company: 'Beirut Beauty',
    project: 'Membership Site',
    rating: 5,
    country: 'Lebanon',
    flag: 'LB',
    date: '2025-03-15',
    text: 'A membership platform with recurring billing and exclusive content. Our membership grew to 5,000+ in three months.',
  },
  {
    name: 'Adam Novak',
    role: 'CEO',
    company: 'Prague Tech',
    project: 'SaaS Dashboard',
    rating: 5,
    country: 'Czech Republic',
    flag: 'CZ',
    date: '2025-03-12',
    text: 'A beautiful SaaS dashboard with real-time analytics and custom reporting. Our clients love the insights.',
  },
  {
    name: 'Mia Costa',
    role: 'Marketing Head',
    company: 'Lisbon Travel',
    project: 'Booking Website',
    rating: 5,
    country: 'Portugal',
    flag: 'PT',
    date: '2025-03-10',
    text: 'A travel booking website with real-time availability and payment processing. Our bookings doubled in two months.',
  },
  {
    name: 'Sebastian Cruz',
    role: 'CTO',
    company: 'Buenos Aires FinTech',
    project: 'Crypto Platform',
    rating: 5,
    country: 'Argentina',
    flag: 'AR',
    date: '2025-03-08',
    text: 'They built our crypto trading platform with wallet integration and real-time market data. Security is bank-grade.',
  },
  {
    name: 'Ava Mitchell',
    role: 'Owner',
    company: 'Perth Real Estate',
    project: 'Property Platform',
    rating: 5,
    country: 'Australia',
    flag: 'AU',
    date: '2025-03-05',
    text: 'A property listing platform with virtual tours and map search. Our agent productivity increased by 50%.',
  },
  {
    name: 'Ethan Wright',
    role: 'Director',
    company: 'Auckland SaaS',
    project: 'Subscription Billing',
    rating: 5,
    country: 'New Zealand',
    flag: 'NZ',
    date: '2025-03-02',
    text: 'They implemented subscription billing with Stripe and automated invoicing. Our MRR tracking is now flawless.',
  },
  {
    name: 'Olivia Hayes',
    role: 'CEO',
    company: 'Cape Town Tourism',
    project: 'Tourism Platform',
    rating: 5,
    country: 'South Africa',
    flag: 'ZA',
    date: '2025-02-28',
    text: 'A tourism platform with multi-language support and booking management. Our international bookings grew by 70%.',
  },
  {
    name: 'Lucas Meyer',
    role: 'CTO',
    company: 'Hamburg Shipping',
    project: 'Logistics Dashboard',
    rating: 5,
    country: 'Germany',
    flag: 'DE',
    date: '2025-02-25',
    text: 'A logistics dashboard with real-time tracking and route optimization. Our delivery costs decreased by 22%.',
  },
  {
    name: 'Sofia Adina',
    role: 'Founder',
    company: 'Bucharest Startups',
    project: 'Community Forum',
    rating: 5,
    country: 'Romania',
    flag: 'RO',
    date: '2025-02-22',
    text: 'A community forum with gamification and moderation tools. Our user engagement is at an all-time high.',
  },
  {
    name: 'Mateo Vargas',
    role: 'CEO',
    company: 'Bogota Health',
    project: 'Telehealth Portal',
    rating: 5,
    country: 'Colombia',
    flag: 'CO',
    date: '2025-02-20',
    text: 'A telehealth portal with video conferencing and electronic prescriptions. Our patient satisfaction is 98%.',
  },
  {
    name: 'Amelia Brooks',
    role: 'CTO',
    company: 'Edinburgh Education',
    project: 'Learning Platform',
    rating: 5,
    country: 'United Kingdom',
    flag: 'GB',
    date: '2025-02-18',
    text: 'An LMS with progress tracking and certifications. Our course completion rate improved by 45%.',
  },
  {
    name: 'Nathan Cole',
    role: 'Director',
    company: 'Ottawa Gov',
    project: 'Security Audit',
    rating: 5,
    country: 'Canada',
    flag: 'CA',
    date: '2025-02-15',
    text: 'A thorough security audit for our government platform. Their compliance expertise with SOC2 was invaluable.',
  },
  {
    name: 'Isabella Wood',
    role: 'CEO',
    company: 'Brisbane Fashion',
    project: 'E-commerce Store',
    rating: 5,
    country: 'Australia',
    flag: 'AU',
    date: '2025-02-12',
    text: 'A fashion e-commerce store with AR try-on and social login. Our conversion rate increased by 35%.',
  },
  {
    name: 'Daniel Park',
    role: 'CTO',
    company: 'New Jersey SaaS',
    project: 'API Security',
    rating: 5,
    country: 'United States',
    flag: 'US',
    date: '2025-02-10',
    text: 'They secured our REST and GraphQL APIs with proper auth and rate limiting. The penetration test found zero issues after remediation.',
  },
];

// ============================================================
// 11. TEAM MEMBERS
// ============================================================

export const team = [
  {
    name: 'Alex "Cipher" Morgan',
    role: 'Lead Penetration Tester',
    bio: 'CEH-certified offensive security specialist. 8+ years breaking and rebuilding systems.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&w=300',
  },
  {
    name: 'Jordan Lee',
    role: 'Senior Full-Stack Developer',
    bio: 'React/Node expert. Ships production SaaS platforms with zero-downtime deploys.',
    image: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&w=300',
  },
  {
    name: 'Sam Rivera',
    role: 'Security Researcher',
    bio: 'Vulnerability researcher with published CVEs. Threat intelligence and malware analysis.',
    image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&w=300',
  },
  {
    name: 'Taylor Kim',
    role: 'Lead UI/UX Designer',
    bio: 'Designs interfaces that feel like Apple meets cyberpunk. Accessibility-first.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&w=300',
  },
];

// ============================================================
// 12. PRICING & SERVICE OFFERINGS
// ============================================================

export const pricingTiers = [
  {
    name: 'Starter',
    price: '$2,500',
    period: 'project',
    desc: 'Perfect for business websites and landing pages.',
    features: ['Up to 6 pages', 'Responsive design', 'SEO basics', 'Contact form', '2 weeks delivery', '30 days support'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Professional',
    price: '$8,000',
    period: 'project',
    desc: 'Custom web apps and e-commerce platforms.',
    features: ['Custom design', 'CMS / Dashboard', 'Payment integration', 'User authentication', 'API integration', '90 days support'],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'project',
    desc: 'SaaS platforms, fintech, and complex systems.',
    features: ['Multi-tenant architecture', 'Advanced security', 'CI/CD pipeline', 'Cloud deployment', 'Penetration testing', '365 days support'],
    cta: 'Request Quote',
    popular: false,
  },
  {
    name: 'Retainer',
    price: '$4,000',
    period: 'month',
    desc: 'Dedicated senior developer or security consultant.',
    features: ['Dedicated resource', 'Weekly sprints', 'Slack integration', 'Priority support', 'Code reviews', 'Security monitoring'],
    cta: 'Discuss',
    popular: false,
  },
];

export const serviceOfferings = [
  {
    icon: Zap,
    title: 'Transparent Engagements',
    desc: 'No hidden fees, no scope creep. Accurate scoping, secure builds, on-time delivery.',
    cta: 'Request a Calculator',
  },
  {
    icon: Layers,
    title: 'Team Augmentation',
    desc: 'Dedicated monthly retainers for senior React, Node.js, or security consultants integrated into your workflow.',
    cta: 'Discuss This Service',
  },
  {
    icon: Smartphone,
    title: 'Progressive Web Apps (PWA)',
    desc: 'Offline support, push notifications, app store installable, blazing fast load times.',
    cta: 'Discuss This Service',
  },
  {
    icon: Boxes,
    title: 'SaaS Platforms',
    desc: 'Multi-tenant, Stripe billing, RBAC, admin portals - built to scale.',
    cta: 'Discuss This Service',
  },
  {
    icon: ShieldCheck,
    title: 'Assume Breach. Engineer Resilience.',
    desc: 'Offensive security testing and defensive architecture design. We hack to secure.',
    cta: 'Request Security Audit',
  },
  {
    icon: BrainCircuit,
    title: 'AI Automation & Trading Bots',
    desc: 'AI chatbots, workflow automation, business process automation, and algorithmic trading bots powered by LLMs and ML.',
    cta: 'Discuss This Service',
  },
  {
    icon: Globe,
    title: 'SEO & Digital Marketing',
    desc: 'Google-certified SEO, SEMrush analytics, content strategy, and conversion optimization.',
    cta: 'Discuss This Service',
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    desc: 'Cloud deployment, CI/CD, containerization, monitoring, and disaster recovery.',
    cta: 'Discuss This Service',
  },
];

// ============================================================
// 13. BUG BOUNTY & SECURITY HEADERS
// ============================================================

export const bugBountyItems = [
  {
    cve: 'CVE-2025-XXXX1',
    severity: 'Critical',
    product: 'Banking Platform',
    status: 'Patched',
    date: '2025-06-20',
    desc: 'Authentication bypass via JWT algorithm confusion.',
  },
  {
    cve: 'CVE-2025-XXXX2',
    severity: 'High',
    product: 'E-commerce CMS',
    status: 'Patched',
    date: '2025-05-14',
    desc: 'SQL injection in product search endpoint.',
  },
  {
    cve: 'CVE-2025-XXXX3',
    severity: 'High',
    product: 'SaaS Dashboard',
    status: 'Patched',
    date: '2025-04-02',
    desc: 'IDOR allowing cross-tenant data access.',
  },
  {
    cve: 'CVE-2025-XXXX4',
    severity: 'Medium',
    product: 'Mobile Banking App',
    status: 'Patched',
    date: '2025-03-18',
    desc: 'Insecure storage of session tokens.',
  },
];

export const securityHeaders = [
  { name: 'SSL/TLS', status: 'Active', value: 'A+' },
  { name: 'HSTS', status: 'Enabled', value: 'max-age=63072000' },
  { name: 'Content-Security-Policy', status: 'Enabled', value: 'strict' },
  { name: 'SRI', status: 'Enabled', value: 'sha-384' },
  { name: 'X-Frame-Options', status: 'DENY', value: 'deny' },
  { name: 'X-Content-Type-Options', status: 'nosniff', value: 'nosniff' },
];

// ============================================================
// 14. RESOURCES
// ============================================================

export const resources = [
  { title: 'Cybersecurity Hardening Guide', type: 'Guide', desc: 'Step-by-step server and application hardening checklist.', icon: ShieldCheck },
  { title: 'React SaaS Architecture', type: 'Tutorial', desc: 'Build a multi-tenant SaaS with Supabase RLS.', icon: Code2 },
  { title: '2025 Threat Landscape Report', type: 'Report', desc: 'Industry analysis of emerging attack vectors.', icon: Bug },
  { title: 'Zero Trust Whitepaper', type: 'Whitepaper', desc: 'Implementing zero-trust architecture at scale.', icon: Lock },
  { title: 'AI Automation Playbook', type: 'E-book', desc: 'Automate business processes with LLMs.', icon: Bot },
  { title: 'SEO for SaaS', type: 'Guide', desc: 'Technical SEO strategies for SaaS platforms.', icon: Globe },
];

// ============================================================
// 15. LANGUAGES, CURRENCIES, CONTACT FORMS
// ============================================================

export const languages = [
  { code: 'EN', label: 'English' },
  { code: 'FR', label: 'Français' },
  { code: 'ES', label: 'Español' },
  { code: 'DE', label: 'Deutsch' },
  { code: 'AR', label: 'العربية' },
  { code: 'PT', label: 'Português' },
];

export const currencies = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'NGN', symbol: '₦' },
  { code: 'AED', symbol: 'د.إ' },
  { code: 'CAD', symbol: 'C$' },
];

export const contactFormTypes = [
  { id: 'general', label: 'General Inquiry', icon: Globe },
  { id: 'project', label: 'Project Request', icon: Code2 },
  { id: 'security', label: 'Security Audit Request', icon: ShieldCheck },
  { id: 'partnership', label: 'Partnership Request', icon: Layers },
  { id: 'career', label: 'Career Application', icon: Bot },
];

// ============================================================
// 16. WAF & HONEYPOT LOGS
// ============================================================

export const wafLogs = [
  { ip: '185.220.101.34', type: 'SQLi', payload: "' OR 1=1--", path: '/api/login', country: 'RU', time: '2s ago' },
  { ip: '45.148.10.22', type: 'XSS', payload: '<script>alert(1)</script>', path: '/search', country: 'NL', time: '14s ago' },
  { ip: '193.32.162.8', type: 'Path Traversal', payload: '../../etc/passwd', path: '/files', country: 'DE', time: '32s ago' },
  { ip: '92.255.85.11', type: 'SQLi', payload: "'; DROP TABLE users--", path: '/api/users', country: 'RU', time: '1m ago' },
  { ip: '104.244.72.5', type: 'XSS', payload: '"><img src=x onerror=alert(1)>', path: '/comment', country: 'US', time: '2m ago' },
  { ip: '176.10.99.20', type: 'Path Traversal', payload: '../../../var/log/auth.log', path: '/download', country: 'SE', time: '3m ago' },
];

export const honeypotLogs = [
  { ip: '45.148.10.22', port: 22, attempts: 142, country: 'NL', fingerprint: 'ssh-scan-bot' },
  { ip: '185.220.101.34', port: 3389, attempts: 87, country: 'RU', fingerprint: 'rdp-brute' },
  { ip: '193.32.162.8', port: 445, attempts: 203, country: 'DE', fingerprint: 'smb-worm' },
  { ip: '92.255.85.11', port: 8080, attempts: 56, country: 'RU', fingerprint: 'proxy-scan' },
];

// ============================================================
// NEW STATS
// ============================================================
export const agencyStats = [
  { value: '655+', label: 'Projects Completed', icon: 'Code2' },
  { value: '200+', label: 'SEO Campaigns', icon: 'Search' },
  { value: '100+', label: 'Security Audits', icon: 'ShieldCheck' },
  { value: '98%', label: 'Client Retention', icon: 'TrendingUp' },
  { value: '10+', label: 'Countries Served', icon: 'Globe2' },
  { value: '4.8/5', label: 'Client Satisfaction', icon: 'Star' },
];

// ============================================================
// GAME DEVELOPMENT TYPES (Added as Types List)
// ============================================================
export const gameDevTypes = [
  'Game Development',
  'Unity Game Development',
  'Unreal Engine Game Development',
  '2D Game Design',
  '3D Game Design',
  'Game Optimization',
  'Mobile Game Development',
  'PC Game Development',
  'Console Game Development',
  'Game Testing',
];