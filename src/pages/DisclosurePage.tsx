import { useState } from 'react';
import {
  ShieldCheck, Bug, Mail, Clock, Lock, Send, Loader2, CheckCircle2,
  Gavel, Target, FileText, AlertTriangle, Shield,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { supabase } from '../lib/supabase';

const vulnTypes = [
  'SQL Injection', 'Cross-Site Scripting (XSS)', 'Authentication Bypass',
  'Insecure Direct Object Reference (IDOR)', 'Cross-Site Request Forgery (CSRF)',
  'Server-Side Request Forgery (SSRF)', 'Broken Access Control', 'Sensitive Data Exposure',
  'Security Misconfiguration', 'Other',
];
const severities = ['Critical', 'High', 'Medium', 'Low', 'Informational'];

const policy = [
  {
    icon: Target, title: 'Scope',
    body: 'This policy covers any BitSecureX Tech-owned domain, product, or service explicitly listed in our scope. Out-of-scope assets include third-party providers, social engineering of staff, and any testing that impacts availability. If you are unsure whether an asset is in scope, contact us before testing.',
  },
  {
    icon: FileText, title: 'Reporting Guidelines',
    body: 'Reports must include a clear description of the vulnerability, the affected asset, step-by-step reproduction instructions, and the potential impact. Include screenshots, proof-of-concept code, and any mitigations you recommend. Submit reports through the form below or email security@bitsecurex.tech with PGP encryption.',
  },
  {
    icon: Gavel, title: 'Safe Harbor',
    body: 'We consider research conducted under this policy to be authorized and in good faith. Researchers who adhere to the guidelines will not face legal action. We will not pursue civil or criminal cases, or ask law enforcement to investigate, provided you avoid privacy violations, data destruction, and disruption of service.',
  },
  {
    icon: Clock, title: 'Response Timeline',
    body: 'We acknowledge valid reports within 48 hours. You will receive a status update within 5 business days, including a remediation plan and an estimated fix timeline. Once the issue is resolved, we confirm the fix with you and publicly credit your contribution, if desired.',
  },
];

export function DisclosurePage() {
  const [form, setForm] = useState({
    name: '', email: '', vulnType: vulnTypes[0], severity: severities[1], description: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const message = [
      `Vulnerability Type: ${form.vulnType}`,
      `Severity: ${form.severity}`,
      '',
      form.description,
    ].join('\n');
    const { error } = await supabase.from('contact_leads').insert({
      name: form.name,
      email: form.email,
      service: 'Vulnerability Disclosure',
      message,
    });
    setStatus(error ? 'error' : 'success');
    if (!error) {
      setForm({ name: '', email: '', vulnType: vulnTypes[0], severity: severities[1], description: '' });
    }
  };

  return (
    <>
      {/* ✅ SEO – FIRST CHILD INSIDE THE FRAGMENT */}
      <SEO
        title="Vulnerability Disclosure Policy | Responsible Disclosure | BitSecureX Tech"
        description="BitSecureX Tech's responsible disclosure policy for security researchers. Learn how to report vulnerabilities and our commitment to security."
        keywords="vulnerability disclosure, responsible disclosure, security policy, bug bounty, security research, ethical hacking, PGP encryption"
        url="https://bitsecurex.tech/disclosure"
        type="website"
      />

      <div className="pt-28">
        {/* Header */}
        <section className="section-pad pb-10">
          <div className="container-x text-center">
            <Reveal>
              <span className="eyebrow">
                <ShieldCheck className="h-3 w-3" /> Vulnerability Disclosure
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Responsible <span className="gradient-text">Disclosure Policy</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
                We welcome security researchers to help us keep our products and customers safe. If you find a vulnerability, report it responsibly and we will work with you to fix it.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Trust Badge */}
        <section className="section-dark section-pad py-4">
          <div className="container-x">
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2 rounded-full bg-cyber-500/10 px-4 py-2 text-sm text-cyber-300 ring-1 ring-cyber-500/30">
                <Shield className="h-4 w-4 text-cyber-400" /> 48-Hour Response
              </div>
              <div className="flex items-center gap-2 rounded-full bg-electric-500/10 px-4 py-2 text-sm text-electric-300 ring-1 ring-electric-500/30">
                <Lock className="h-4 w-4 text-electric-400" /> Encrypted Communication
              </div>
              <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-300 ring-1 ring-green-500/30">
                <Gavel className="h-4 w-4 text-green-400" /> Safe Harbor Protected
              </div>
            </div>
          </div>
        </section>

        {/* Policy sections */}
        <section className="section-pad py-10">
          <div className="container-x">
            <div className="grid gap-5 sm:grid-cols-2">
              {policy.map((p, i) => (
                <Reveal key={p.title} delay={i * 80}>
                  <div className="h-full rounded-2xl glass card-hover p-7">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyber-500/15 ring-1 ring-cyber-500/30">
                      <p.icon className="h-5 w-5 text-cyber-400" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-white">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Bug report form + contact info */}
        <section className="section-pad py-10">
          <div className="container-x grid gap-8 lg:grid-cols-[1fr_1.3fr]">
            {/* Researcher contact info */}
            <Reveal>
              <div className="space-y-4">
                <div className="rounded-2xl glass p-6">
                  <h3 className="font-display text-lg font-semibold text-white">Security Team Contact</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Reach our security team directly for sensitive disclosures or questions about scope.
                  </p>
                  <div className="mt-4 space-y-3 text-sm">
                    <p className="flex items-center gap-3 text-slate-300">
                      <Mail className="h-4 w-4 text-cyber-400" /> security@bitsecurex.tech
                    </p>
                    <p className="flex items-center gap-3 text-slate-300">
                      <Bug className="h-4 w-4 text-cyber-400" /> PGP key available on request
                    </p>
                    <p className="flex items-center gap-3 text-slate-300">
                      <Clock className="h-4 w-4 text-cyber-400" /> Response within 48 hours
                    </p>
                    <p className="flex items-center gap-3 text-slate-300">
                      <Lock className="h-4 w-4 text-cyber-400" /> Encrypted communication supported
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl glass p-6">
                  <h3 className="font-display text-lg font-semibold text-white">Safe Harbor Promise</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Researchers acting in good faith and within scope are protected. We will not pursue legal action against responsible disclosure.
                  </p>
                  <div className="mt-4 flex items-center gap-2 rounded-lg bg-electric-500/10 px-3 py-2.5 text-sm text-electric-400">
                    <ShieldCheck className="h-4 w-4" /> Good-faith research is authorized.
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Bug report form */}
            <Reveal delay={100}>
              <form onSubmit={submit} className="rounded-3xl glass-strong p-7 lg:p-9">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyber-500 to-electric-500">
                    <Bug className="h-5 w-5 text-white" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">Report a Vulnerability</h3>
                    <p className="text-sm text-slate-400">All reports are reviewed by our security team.</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="Name" required>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Jane Doe" />
                  </Field>
                  <Field label="Email" required>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="you@email.com" />
                  </Field>
                  <Field label="Vulnerability Type" required>
                    <select required value={form.vulnType} onChange={(e) => setForm({ ...form, vulnType: e.target.value })} className="input-field">
                      {vulnTypes.map((t) => <option key={t} className="bg-navy-900">{t}</option>)}
                    </select>
                  </Field>
                  <Field label="Severity" required>
                    <select required value={form.severity} onChange={(e) => setForm({ ...form, severity: e.target.value })} className="input-field">
                      {severities.map((s) => <option key={s} className="bg-navy-900">{s}</option>)}
                    </select>
                  </Field>
                </div>

                <div className="mt-4">
                  <Field label="Description" required>
                    <textarea required rows={6} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field resize-none" placeholder="Describe the vulnerability, affected asset, reproduction steps, and potential impact..." />
                  </Field>
                </div>

                <button type="submit" disabled={status === 'loading'} className="btn-primary mt-5 w-full disabled:opacity-60">
                  {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  Submit Report
                </button>

                {status === 'success' && (
                  <p className="mt-4 flex items-center gap-2 rounded-lg bg-electric-500/10 px-4 py-3 text-sm text-electric-400">
                    <CheckCircle2 className="h-4 w-4" /> Report received. Our security team will respond within 48 hours.
                  </p>
                )}
                {status === 'error' && (
                  <p className="mt-4 flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    <AlertTriangle className="h-4 w-4" /> Something went wrong. Please email security@bitsecurex.tech directly.
                  </p>
                )}
              </form>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-300">
        {label}{required && <span className="text-cyber-400"> *</span>}
      </span>
      {children}
    </label>
  );
}
export default DisclosurePage;