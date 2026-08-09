import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { Briefcase, Users, Globe, Zap, Shield, Code2, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from '../lib/router';

const openPositions = [
  {
    title: 'Senior Full-Stack Developer',
    department: 'Engineering',
    location: 'Remote (Global)',
    type: 'Full-time',
    description: 'Build scalable web applications and SaaS platforms using React, Node.js, and Supabase.',
    requirements: ['5+ years React experience', 'TypeScript expert', 'API design', 'Database architecture'],
  },
  {
    title: 'Penetration Tester',
    department: 'Security',
    location: 'Remote (Global)',
    type: 'Full-time',
    description: 'Conduct vulnerability assessments and penetration tests on web, mobile, and API surfaces.',
    requirements: ['CEH certification', '3+ years pentesting', 'OWASP expertise', 'Report writing'],
  },
  {
    title: 'Digital Marketing Specialist',
    department: 'Marketing',
    location: 'Remote (Global)',
    type: 'Full-time',
    description: 'Execute data-driven marketing campaigns across Google, Facebook, Instagram, and TikTok.',
    requirements: ['3+ years digital marketing', 'Google Ads certified', 'Analytics expertise', 'Content creation'],
  },
  {
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Remote (Global)',
    type: 'Full-time',
    description: 'Design beautiful, intuitive interfaces for web and mobile applications.',
    requirements: ['5+ years design', 'Figma expert', 'User research', 'Design systems'],
  },
];

const benefits = [
  { icon: Globe, title: 'Remote-First', desc: 'Work from anywhere in the world.' },
  { icon: Zap, title: 'Flexible Hours', desc: 'Choose your own schedule.' },
  { icon: Shield, title: 'Learning Budget', desc: '$2,000/year for courses and certifications.' },
  { icon: Code2, title: 'Cutting-Edge Tech', desc: 'Work with the latest tools and frameworks.' },
  { icon: Users, title: 'Global Team', desc: 'Collaborate with experts across 10+ countries.' },
  { icon: Mail, title: 'Growth Path', desc: 'Clear career progression and mentorship.' },
];

export function CareersPage() {
  const nav = useNavigate();

  return (
    <>
      {/* ✅ SEO – FIRST CHILD INSIDE THE FRAGMENT */}
      <SEO
        title="Careers | Join the BitSecureX Tech Team"
        description="Join the BitSecureX Tech team. We're hiring talented developers, cybersecurity experts, digital marketers, and creative designers. Remote positions available worldwide."
        keywords="careers, jobs, tech jobs, cybersecurity jobs, web developer jobs, remote jobs, hiring, join our team, full-stack developer, penetration tester"
        url="https://bitsecurex.tech/careers"
        type="website"
      />

      <div className="pt-28">
        {/* Hero */}
        <section className="section-pad pb-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid bg-grid opacity-20" />
          <div className="absolute -top-20 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-radial-glow blur-2xl" />
          <div className="container-x relative text-center">
            <Reveal>
              <span className="eyebrow text-electric-400">Careers</span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Join the <span className="gradient-text">BitSecureX</span> Team
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
                We're building a global team of passionate technologists, security experts, and creative thinkers.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Why Join */}
        <section className="section-pad py-10 bg-navy-800/50">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Why Join Us</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">Work That Matters</h2>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="glass rounded-2xl p-6 card-hover">
                    <benefit.icon className="h-8 w-8 text-cyber-400" />
                    <h3 className="mt-4 font-display text-lg font-semibold text-white">{benefit.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{benefit.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="section-pad py-10">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow">Open Positions</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-bold text-white">Join Our Team</h2>
              </Reveal>
            </div>
            <div className="mt-10 space-y-4">
              {openPositions.map((position, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="glass rounded-2xl p-6 card-hover">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-xl font-semibold text-white">{position.title}</h3>
                        <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-3.5 w-3.5" /> {position.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <Globe className="h-3.5 w-3.5" /> {position.location}
                          </span>
                          <span className="rounded-full bg-cyber-500/15 px-3 py-0.5 text-xs text-cyber-200">
                            {position.type}
                          </span>
                        </div>
                        <p className="mt-3 text-sm text-slate-400">{position.description}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {position.requirements.map((req, j) => (
                            <span key={j} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => nav('/contact')}
                        className="btn-primary shrink-0 text-sm"
                      >
                        Apply Now <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-pad py-10">
          <div className="container-x">
            <Reveal>
              <div className="glass-strong rounded-3xl p-10 text-center">
                <h2 className="font-display text-2xl font-bold text-white">Don't See Your Dream Role?</h2>
                <p className="mt-3 text-slate-400">We're always looking for talented people. Send us your CV.</p>
                <button onClick={() => nav('/contact')} className="btn-primary mt-6">
                  Send Your CV <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
export default CareersPage;