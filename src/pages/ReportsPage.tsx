import { useState } from 'react';
import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { FileText, Download, ArrowRight, Shield, Lock, Globe, Code2, Bot, Cloud, Search, Calendar, TrendingUp, Filter, Star, Users, Award } from 'lucide-react';
import { useNavigate } from '../lib/router';

const reports = [
  {
    id: 1,
    title: '2025 Cybersecurity Threat Landscape Report',
    category: 'Security',
    type: 'Report',
    date: 'June 2025',
    description: 'Comprehensive analysis of emerging cyber threats, attack vectors, and defense strategies for 2025.',
    icon: Shield,
    downloadUrl: '#',
  },
  {
    id: 2,
    title: 'Zero Trust Architecture Implementation Guide',
    category: 'Security',
    type: 'Whitepaper',
    date: 'May 2025',
    description: 'Step-by-step guide to implementing zero-trust security in modern enterprises.',
    icon: Lock,
    downloadUrl: '#',
  },
  {
    id: 3,
    title: 'SaaS Architecture Best Practices',
    category: 'Development',
    type: 'Guide',
    date: 'April 2025',
    description: 'Architectural patterns, security considerations, and scaling strategies for SaaS platforms.',
    icon: Code2,
    downloadUrl: '#',
  },
  {
    id: 4,
    title: 'AI Automation in Business: 2025 Playbook',
    category: 'AI',
    type: 'E-book',
    date: 'March 2025',
    description: 'Practical AI implementation strategies for business automation and growth.',
    icon: Bot,
    downloadUrl: '#',
  },
  {
    id: 5,
    title: 'Cloud Security Best Practices',
    category: 'Cloud',
    type: 'Whitepaper',
    date: 'February 2025',
    description: 'Secure cloud architecture, compliance, and threat protection strategies.',
    icon: Cloud,
    downloadUrl: '#',
  },
  {
    id: 6,
    title: 'SEO Ranking Factors 2025',
    category: 'Marketing',
    type: 'Report',
    date: 'January 2025',
    description: 'Data-driven analysis of Google ranking factors and SEO strategies.',
    icon: Search,
    downloadUrl: '#',
  },
  {
    id: 7,
    title: 'The State of Digital Transformation',
    category: 'Technology',
    type: 'Report',
    date: 'December 2024',
    description: 'How businesses are transforming their digital presence and operations.',
    icon: TrendingUp,
    downloadUrl: '#',
  },
  {
    id: 8,
    title: 'Cybersecurity Compliance Guide',
    category: 'Security',
    type: 'Guide',
    date: 'November 2024',
    description: 'Navigate HIPAA, SOC2, and PCI-DSS compliance requirements.',
    icon: Shield,
    downloadUrl: '#',
  },
];

const categories = ['All', 'Security', 'Development', 'AI', 'Cloud', 'Marketing', 'Technology'];

export function ReportsPage() {
  const nav = useNavigate();
  const [category, setCategory] = useState('All');

  const filteredReports = category === 'All' ? reports : reports.filter(r => r.category === category);

  return (
    <>
      {/* ✅ SEO – FIRST CHILD INSIDE THE FRAGMENT */}
      <SEO
        title="Reports & Whitepapers | Free Cybersecurity & Technology Guides | BitSecureX Tech"
        description="Download free reports, whitepapers, and guides on cybersecurity, AI automation, SaaS development, and digital marketing from BitSecureX Tech."
        keywords="reports, whitepapers, cybersecurity reports, AI whitepapers, SaaS guides, digital marketing reports, download, free resources"
        url="https://bitsecurex.tech/reports"
        type="website"
      />

      <div className="pt-28">
        {/* Hero */}
        <section className="section-pad pb-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid bg-grid opacity-20" />
          <div className="absolute -top-20 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-radial-glow blur-2xl" />
          <div className="container-x relative text-center">
            <Reveal>
              <span className="eyebrow text-electric-400">Resources</span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Reports and <span className="gradient-text">Whitepapers</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
                In-depth research, analysis, and guides from our security and technology experts.
              </p>
            </Reveal>
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
                  <p className="text-xs text-slate-400">Resource Quality Score</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="section-pad py-4">
          <div className="container-x">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    category === cat
                      ? 'bg-gradient-to-r from-cyber-500 to-electric-500 text-white shadow-lg shadow-cyber-500/30'
                      : 'border border-white/10 bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Summary */}
        <section className="section-pad py-2">
          <div className="container-x">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="glass rounded-2xl p-4 text-center">
                <p className="font-display text-2xl font-bold gradient-text">8+</p>
                <p className="text-xs text-slate-400">Reports Available</p>
              </div>
              <div className="glass rounded-2xl p-4 text-center">
                <p className="font-display text-2xl font-bold gradient-text">6</p>
                <p className="text-xs text-slate-400">Categories</p>
              </div>
              <div className="glass rounded-2xl p-4 text-center">
                <p className="font-display text-2xl font-bold gradient-text">100%</p>
                <p className="text-xs text-slate-400">Free Downloads</p>
              </div>
              <div className="glass rounded-2xl p-4 text-center">
                <p className="font-display text-2xl font-bold gradient-text">50+</p>
                <p className="text-xs text-slate-400">Pages of Insights</p>
              </div>
            </div>
          </div>
        </section>

        {/* Reports Grid */}
        <section className="section-pad py-6">
          <div className="container-x">
            {filteredReports.length === 0 ? (
              <div className="text-center py-16">
                <FileText className="mx-auto h-12 w-12 text-slate-600" />
                <p className="mt-4 text-slate-400">No reports available in this category.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredReports.map((report, i) => (
                  <Reveal key={i} delay={i * 60}>
                    <div className="glass rounded-2xl p-6 card-hover flex flex-col border border-white/5 transition-all hover:border-cyber-500/30 hover:-translate-y-1">
                      <div className="flex items-start justify-between">
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyber-500/20 to-electric-500/20 ring-1 ring-cyber-500/30">
                          <report.icon className="h-5 w-5 text-cyber-400" />
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
                          {report.type}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-lg font-semibold text-white group-hover:text-cyber-300 transition-colors">
                        {report.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm text-slate-400">{report.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Calendar className="h-3.5 w-3.5" />
                          {report.date}
                        </span>
                        <button
                          onClick={() => window.open(report.downloadUrl, '_blank')}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-cyber-500/15 px-4 py-2 text-sm font-medium text-cyber-200 transition-colors hover:bg-cyber-500/30 hover:text-white"
                        >
                          <Download className="h-4 w-4" /> Download
                        </button>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="section-pad py-10">
          <div className="container-x">
            <Reveal>
              <div className="glass-strong rounded-3xl p-10 text-center border border-white/10">
                <FileText className="mx-auto h-10 w-10 text-electric-500" />
                <h2 className="mt-4 font-display text-2xl font-bold text-white">Need a Custom Report?</h2>
                <p className="mt-3 text-slate-400">Contact us for custom research and analysis tailored to your industry.</p>
                <button onClick={() => nav('/contact')} className="btn-primary mt-6">
                  Request Custom Report <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}

export default ReportsPage;