import { Bug, ShieldCheck, AlertTriangle, CheckCircle2, ArrowRight, Calendar, Package } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { bugBountyItems } from '../lib/data';
import { useNavigate } from '../lib/router';

const severityStyles: Record<string, string> = {
  Critical: 'bg-red-500/15 text-red-400 ring-red-500/30',
  High: 'bg-orange-500/15 text-orange-400 ring-orange-500/30',
  Medium: 'bg-yellow-500/15 text-yellow-400 ring-yellow-500/30',
};

const stats = [
  { label: 'Total Found', value: bugBountyItems.length, icon: Bug, color: 'text-cyber-400' },
  { label: 'Critical', value: bugBountyItems.filter((b) => b.severity === 'Critical').length, icon: AlertTriangle, color: 'text-red-400' },
  { label: 'Patched', value: bugBountyItems.filter((b) => b.status === 'Patched').length, icon: CheckCircle2, color: 'text-electric-500' },
  { label: 'Active', value: 0, icon: ShieldCheck, color: 'text-electric-500' },
];

export function BugBountyPage() {
  const nav = useNavigate();

  return (
    <>
      {/* ✅ SEO – FIRST CHILD INSIDE THE FRAGMENT */}
      <SEO
        title="Bug Bounty Program | Patched Vulnerabilities | BitSecureX Tech"
        description="BitSecureX Tech's bug bounty program and patched vulnerabilities log. We practice transparent security and responsible disclosure."
        keywords="bug bounty, patched vulnerabilities, security disclosures, CVE, responsible disclosure, vulnerability reports, ethical hacking"
        url="https://bitsecurex.tech/bug-bounty"
        type="website"
      />

      <div className="pt-28">
        {/* Header */}
        <section className="section-pad pb-10">
          <div className="container-x text-center">
            <Reveal>
              <span className="eyebrow">
                <Bug className="h-3 w-3" /> Bug Bounty
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Recently <span className="gradient-text">Patched Vulnerabilities</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
                Transparency is part of security. Here's a public log of
                vulnerabilities we've discovered and patched across client
                engagements.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Stats summary */}
        <section className="pb-4">
          <div className="container-x">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 80}>
                  <div className="rounded-2xl glass card-hover p-6 text-center">
                    <s.icon className={`mx-auto h-7 w-7 ${s.color}`} />
                    <div className="mt-3 font-display text-3xl font-bold text-white">{s.value}</div>
                    <div className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Vulnerability grid */}
        <section className="section-pad py-10">
          <div className="container-x">
            <SectionHeading
              eyebrow="Disclosure Log"
              title={<>Vulnerabilities <span className="gradient-text">we've closed</span></>}
              subtitle="Each entry shows the CVE ID, severity, affected product, and current patch status."
            />
            <div className="mt-14 grid gap-5 sm:grid-cols-2">
              {bugBountyItems.map((b, i) => (
                <Reveal key={b.cve} delay={i * 80}>
                  <div className="h-full rounded-2xl glass card-hover p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <span className="font-mono text-sm font-semibold text-cyber-300">{b.cve}</span>
                        <h3 className="mt-1 font-display text-base font-semibold text-white">{b.product}</h3>
                      </div>
                      <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${severityStyles[b.severity] ?? severityStyles.Medium}`}>
                        {b.severity}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{b.desc}</p>

                    <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-white/5 pt-4 text-xs text-slate-400">
                      <span className="inline-flex items-center gap-1.5">
                        <Package className="h-3.5 w-3.5 text-cyber-400" /> {b.product}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-cyber-400" /> {b.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-electric-500/15 px-2.5 py-1 font-semibold text-electric-500 ring-1 ring-electric-500/30">
                        <CheckCircle2 className="h-3.5 w-3.5" /> {b.status}
                      </span>
                    </div>
                  </div>
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
                  <Bug className="mx-auto h-10 w-10 text-cyber-400" />
                  <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">
                    Found a <span className="gradient-text">vulnerability?</span>
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-slate-400">
                    Report it responsibly through our disclosure program. We
                    acknowledge valid reports within 48 hours.
                  </p>
                  <button onClick={() => nav('/disclosure')} className="btn-primary mt-8">
                    Report a Vulnerability <ArrowRight className="h-4 w-4" />
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
export default BugBountyPage;