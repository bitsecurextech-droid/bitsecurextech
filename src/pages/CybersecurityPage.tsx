import { ArrowRight, ShieldCheck, Lock, Bug, FileCheck, Target, CheckCircle2, ExternalLink, Star, Users, Award, Zap, Globe } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { securityServices, securityHeaders } from '../lib/data';
import { useNavigate } from '../lib/router';

const pentestGigs = [
  { title: 'Full Website Penetration Testing', desc: 'Comprehensive black-box and grey-box penetration test of your web application, covering OWASP Top 10, business logic, and authentication flaws.', url: 'https://www.fiverr.com/s/qDEwLmX', badge: 'Most Popular' },
  { title: 'Vulnerability Assessment', desc: 'Automated and manual vulnerability scan across your entire attack surface with a detailed remediation report.', url: 'https://www.fiverr.com/s/Eg35QmK', badge: 'Best Value' },
  { title: 'Security Audit', desc: 'Deep-dive security audit of your architecture, code, and infrastructure against industry frameworks.', url: 'https://www.fiverr.com/s/99KXyNE', badge: null },
  { title: 'Quick Security Check', desc: 'Fast, focused security check for a single endpoint or API, ideal for pre-launch validation.', url: 'https://www.fiverr.com/s/yvzLrdG', badge: null },
];

const process = [
  { icon: Target, title: 'Recon and Scope', desc: 'Define the attack surface, rules of engagement, and objectives.' },
  { icon: Bug, title: 'Active Testing', desc: 'Manual and automated testing aligned with OWASP, PTES, and CEH methodology.' },
  { icon: FileCheck, title: 'Reporting', desc: 'Developer-friendly report with severity, reproduction, and remediation guidance.' },
  { icon: ShieldCheck, title: 'Remediation', desc: 'Joint re-testing to confirm fixes and harden your defenses.' },
];

export function CybersecurityPage() {
  const nav = useNavigate();

  return (
    <>
      {/* ✅ SEO – FIRST CHILD INSIDE THE FRAGMENT */}
      <SEO
        title="Cybersecurity Agency | Penetration Testing & Security Audits | BitSecureX Tech"
        description="BitSecureX Tech offers comprehensive cybersecurity services including security audits, vulnerability assessments, penetration testing, and compliance. Protect your business from modern cyber threats."
        keywords="cybersecurity, security audits, vulnerability assessment, compliance, SOC2, HIPAA, PCI-DSS, security consulting, penetration testing"
        url="https://bitsecurex.tech/cybersecurity"
        type="website"
      />

      <div className="pt-28">
        {/* ===== HERO ===== */}
        <section className="section-pad pb-12">
          <div className="container-x">
            <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <Reveal>
                  <span className="eyebrow">
                    <Lock className="h-3 w-3" /> Cybersecurity Division
                  </span>
                </Reveal>
                <Reveal delay={80}>
                  <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                    We Hack To <span className="gradient-text">Secure.</span>
                  </h1>
                </Reveal>
                <Reveal delay={160}>
                  <p className="mt-5 max-w-xl text-lg text-slate-400">
                    Offensive security services that find your weaknesses before adversaries do. Aligned with OWASP, PTES, and CEH methodology, we break in so you can lock down.
                  </p>
                </Reveal>
                <Reveal delay={240}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <button onClick={() => nav('/contact')} className="btn-primary">
                      Request Security Audit <ArrowRight className="h-4 w-4" />
                    </button>
                    <button onClick={() => nav('/tools')} className="btn-ghost">
                      <ShieldCheck className="h-4 w-4" /> Free Risk Assessment
                    </button>
                  </div>
                </Reveal>
              </div>

              {/* Animated shield visual */}
              <Reveal delay={200}>
                <div className="relative mx-auto grid h-64 w-64 place-items-center">
                  <div className="absolute inset-0 rounded-full border border-cyber-500/20 animate-spin-slow" />
                  <div className="absolute inset-6 rounded-full border border-electric-500/20 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
                  <div className="absolute inset-12 rounded-full border border-cyber-500/30" />
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-electric-500/10 animate-spin-slow" style={{ animationDuration: '26s' }} />
                  <div className="grid h-32 w-32 place-items-center rounded-full bg-gradient-to-br from-cyber-500/20 to-electric-500/20 ring-1 ring-cyber-500/40">
                    <ShieldCheck className="h-14 w-14 text-electric-500" />
                  </div>
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-cyber-500 px-3 py-1 text-xs font-bold text-white">SECURE</span>
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-electric-500 px-3 py-1 text-xs font-bold text-navy-950">VERIFIED</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===== TRUST & RATINGS ===== */}
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

        {/* Security services grid */}
        <section className="section-pad py-10">
          <div className="container-x">
            <SectionHeading
              eyebrow="Security Services"
              title={<>Twelve ways we <span className="gradient-text">protect you</span></>}
              subtitle="From penetration testing to threat intelligence, full-spectrum offensive and defensive security."
            />
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {securityServices.map((s, i) => (
                <Reveal key={s.title} delay={i * 60}>
                  <div className="group h-full rounded-2xl glass card-hover p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyber-500/15 ring-1 ring-cyber-500/30 transition-transform group-hover:scale-110">
                      <s.icon className="h-5 w-5 text-cyber-400" />
                    </span>
                    <h3 className="mt-4 font-display text-base font-semibold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="section-pad py-10">
          <div className="container-x">
            <SectionHeading
              eyebrow="Our Methodology"
              title={<>A proven <span className="gradient-text">four-step process</span></>}
              subtitle="A structured, repeatable engagement from scoping to verified remediation."
            />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {process.map((p, i) => (
                <Reveal key={p.title} delay={i * 100}>
                  <div className="relative h-full rounded-2xl glass p-7">
                    <span className="absolute right-5 top-5 font-display text-4xl font-bold text-white/5">
                      0{i + 1}
                    </span>
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-cyber-500 to-electric-500">
                      <p.icon className="h-6 w-6 text-white" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold text-white">{p.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Security Badges */}
        <section className="section-pad py-10">
          <div className="container-x">
            <SectionHeading
              eyebrow="Security Posture"
              title={<>Visible <span className="gradient-text">security badges</span></>}
              subtitle="The security headers we enforce on every project we ship, verified and active."
            />
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {securityHeaders.map((h, i) => (
                <Reveal key={h.name} delay={i * 60}>
                  <div className="flex items-center gap-4 rounded-2xl glass card-hover p-5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-electric-500/15 ring-1 ring-electric-500/30">
                      <CheckCircle2 className="h-5 w-5 text-electric-500" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-sm font-semibold text-white">{h.name}</h3>
                      <p className="mt-0.5 truncate font-mono text-xs text-slate-400">
                        {h.status} · {h.value}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Fiverr Gig Previews */}
        <section className="section-pad py-10">
          <div className="container-x">
            <SectionHeading
              eyebrow="Fiverr Gigs"
              title={<>See Our Penetration Testing Gigs <span className="gradient-text">in Action</span></>}
              subtitle="Preview our Fiverr gigs and hire us directly, trusted by 100+ clients worldwide."
            />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {pentestGigs.map((gig, i) => (
                <Reveal key={gig.title} delay={i * 80}>
                  <a
                    href={gig.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-2xl glass card-hover p-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyber-500/20 to-electric-500/20 ring-1 ring-cyber-500/30 transition-transform group-hover:scale-110">
                        <Bug className="h-5 w-5 text-cyber-400" />
                      </span>
                      {gig.badge && (
                        <span className="rounded-full bg-electric-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-electric-400 ring-1 ring-electric-500/30">
                          {gig.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 font-display text-base font-semibold text-white">{gig.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{gig.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-cyber-400 transition-colors group-hover:text-electric-400">
                      Preview Now <ExternalLink className="h-3.5 w-3.5" />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-pad">
          <div className="container-x">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl glass-strong p-10 text-center lg:p-16">
                <div className="absolute inset-0 bg-grid bg-grid opacity-20" />
                <div className="absolute -top-20 left-1/2 h-60 w-[600px] -translate-x-1/2 rounded-full bg-radial-glow blur-2xl" />
                <div className="relative">
                  <Lock className="mx-auto h-10 w-10 text-electric-500" />
                  <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">
                    Don't wait for a breach. <span className="gradient-text">Test first.</span>
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-slate-400">
                    Request a security audit and our team will scope your engagement within one business day.
                  </p>
                  <button onClick={() => nav('/contact')} className="btn-primary mt-8">
                    Request Security Audit <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
export default CybersecurityPage;