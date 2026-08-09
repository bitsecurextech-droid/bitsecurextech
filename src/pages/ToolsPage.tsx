import { useState } from 'react';
import { Calculator, ShieldAlert, Check, AlertTriangle, X, DollarSign, Gauge, Lock, Send, Loader2, CheckCircle2, Star, Users, Award, Zap, Shield } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { supabase } from '../lib/supabase';

const projectTypes = [
  { label: 'Business Website', base: 2500 },
  { label: 'E-commerce Store', base: 5000 },
  { label: 'SaaS Platform', base: 15000 },
  { label: 'Mobile App', base: 12000 },
  { label: 'Custom Software', base: 10000 },
  { label: 'Security Audit', base: 3500 },
];

const features = [
  { label: 'CMS and Admin Dashboard', price: 1500 },
  { label: 'User Authentication', price: 800 },
  { label: 'Payment Integration', price: 1200 },
  { label: 'AI and Chatbot', price: 2500 },
  { label: 'API Development', price: 2000 },
  { label: 'SEO Optimization', price: 600 },
  { label: 'Cloud Deployment', price: 1000 },
  { label: 'Penetration Testing', price: 3500 },
];

const complexity = [
  { label: 'Basic', mult: 1 },
  { label: 'Standard', mult: 1.5 },
  { label: 'Advanced', mult: 2.2 },
];

const riskQuestions = [
  { q: 'Do you use multi-factor authentication?', weight: 15 },
  { q: 'Are passwords enforced with a strong policy?', weight: 10 },
  { q: 'Is data encrypted at rest and in transit?', weight: 15 },
  { q: 'Do you run regular security updates and patching?', weight: 12 },
  { q: 'Have you had a penetration test in the last 12 months?', weight: 18 },
  { q: 'Do you back up data with tested recovery?', weight: 10 },
  { q: 'Is access reviewed on a regular basis?', weight: 8 },
  { q: 'Do you have an incident response plan?', weight: 12 },
];

export function ToolsPage() {
  return (
    <>
      {/* ✅ SEO – FIRST CHILD INSIDE THE FRAGMENT */}
      <SEO
        title="Free Tools | Cost Calculator & Security Assessment | BitSecureX Tech"
        description="Use our free tools including cost calculator, SEO audit, security risk assessment, and website speed test. Get instant estimates and assessments."
        keywords="free tools, cost calculator, SEO audit, security assessment, website speed test, free SEO audit, risk assessment"
        url="https://bitsecurex.tech/tools"
        type="website"
      />

      <div className="pt-28">
        {/* Hero */}
        <section className="section-pad pb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid bg-grid opacity-20" />
          <div className="absolute -top-20 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-radial-glow blur-2xl" />
          <div className="container-x relative text-center">
            <Reveal>
              <span className="eyebrow">Free Tools</span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Instant <span className="gradient-text">Estimates and Assessments</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
                Get a ballpark project cost or assess your security posture. No signup required.
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
                  <p className="text-xs text-slate-400">Businesses Assessed</p>
                </div>
              </div>

              <div className="h-8 w-px bg-white/10" />

              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-cyber-400" />
                <div>
                  <p className="text-2xl font-bold text-white">4.72</p>
                  <p className="text-xs text-slate-400">Tool Accuracy Score</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="section-pad py-8">
          <div className="container-x grid gap-8 lg:grid-cols-2">
            <CostCalculator />
            <RiskAssessment />
          </div>
        </section>

        {/* Security Assessment Form */}
        <section className="section-pad py-8">
          <div className="container-x">
            <SecurityAssessmentForm />
          </div>
        </section>
      </div>
    </>
  );
}

// ============================================================
// COST CALCULATOR COMPONENT
// ============================================================
function CostCalculator() {
  const [type, setType] = useState(projectTypes[0]);
  const [selected, setSelected] = useState<string[]>([]);
  const [comp, setComp] = useState(complexity[1]);

  const toggle = (label: string) => setSelected((s) => s.includes(label) ? s.filter((x) => x !== label) : [...s, label]);
  const featuresCost = features.filter((f) => selected.includes(f.label)).reduce((sum, f) => sum + f.price, 0);
  const total = Math.round((type.base + featuresCost) * comp.mult);

  return (
    <Reveal>
      <div className="rounded-3xl glass p-7 border border-white/5 hover:border-cyber-500/30 transition-all">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyber-500 to-electric-500 shadow-lg shadow-cyber-500/20">
            <Calculator className="h-5 w-5 text-white" />
          </span>
          <div>
            <h2 className="font-display text-xl font-bold text-white">Website Cost Calculator</h2>
            <p className="text-xs text-slate-400">Instant ballpark estimate</p>
          </div>
        </div>
        <div className="mt-6 space-y-5">
          <div>
            <p className="mb-2 text-sm font-medium text-slate-300">Project Type</p>
            <div className="grid grid-cols-2 gap-2">
              {projectTypes.map((p) => (
                <button
                  key={p.label}
                  onClick={() => setType(p)}
                  className={`rounded-xl border px-3 py-2.5 text-left text-sm transition-all ${
                    type.label === p.label
                      ? 'border-cyber-400/60 bg-cyber-500/15 text-white ring-1 ring-cyber-500/30'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:border-cyber-400/50 hover:text-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-slate-300">Features</p>
            <div className="flex flex-wrap gap-2">
              {features.map((f) => (
                <button
                  key={f.label}
                  onClick={() => toggle(f.label)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all ${
                    selected.includes(f.label)
                      ? 'border-electric-500/50 bg-electric-500/15 text-white ring-1 ring-electric-500/30'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:border-cyber-400/50 hover:text-white'
                  }`}
                >
                  {selected.includes(f.label) && <Check className="h-3 w-3 text-electric-400" />}
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-slate-300">Complexity</p>
            <div className="grid grid-cols-3 gap-2">
              {complexity.map((c) => (
                <button
                  key={c.label}
                  onClick={() => setComp(c)}
                  className={`rounded-xl border px-3 py-2 text-sm transition-all ${
                    comp.label === c.label
                      ? 'border-cyber-400/60 bg-cyber-500/15 text-white ring-1 ring-cyber-500/30'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:border-cyber-400/50 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-cyber-500/15 to-electric-500/15 p-5 text-center ring-1 ring-cyber-500/30">
            <p className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
              <DollarSign className="h-3.5 w-3.5" /> Estimated Cost
            </p>
            <p className="mt-1 font-display text-4xl font-bold gradient-text">${total.toLocaleString()}</p>
            <p className="mt-1 text-xs text-slate-500">Ballpark only. Request a quote for an exact proposal.</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ============================================================
// RISK ASSESSMENT COMPONENT
// ============================================================
function RiskAssessment() {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = riskQuestions.reduce((sum, q, i) => sum + (answers[i] ? q.weight : 0), 0);
  const level = score >= 75 ? 'Low Risk' : score >= 45 ? 'Moderate Risk' : 'High Risk';
  const levelColor = score >= 75 ? 'text-electric-400' : score >= 45 ? 'text-yellow-400' : 'text-red-400';
  const Icon = score >= 75 ? Check : score >= 45 ? AlertTriangle : X;

  return (
    <Reveal delay={100}>
      <div className="rounded-3xl glass p-7 border border-white/5 hover:border-cyber-500/30 transition-all">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyber-500 to-electric-500 shadow-lg shadow-cyber-500/20">
            <ShieldAlert className="h-5 w-5 text-white" />
          </span>
          <div>
            <h2 className="font-display text-xl font-bold text-white">Security Risk Assessment</h2>
            <p className="text-xs text-slate-400">8 quick questions</p>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          {riskQuestions.map((q, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-3.5 transition-colors hover:border-cyber-500/30">
              <p className="text-sm text-slate-200">{q.q}</p>
              <div className="mt-2.5 flex gap-2">
                <button
                  onClick={() => setAnswers((a) => ({ ...a, [i]: true }))}
                  className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-all ${
                    answers[i] === true
                      ? 'bg-electric-500/20 text-electric-400 ring-1 ring-electric-500/40'
                      : 'bg-white/5 text-slate-400 hover:bg-electric-500/10 hover:text-white'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setAnswers((a) => ({ ...a, [i]: false }))}
                  className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-all ${
                    answers[i] === false
                      ? 'bg-red-500/20 text-red-400 ring-1 ring-red-500/40'
                      : 'bg-white/5 text-slate-400 hover:bg-red-500/10 hover:text-white'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => setSubmitted(true)} className="btn-primary mt-5 w-full">
          <Gauge className="h-4 w-4" /> Calculate Risk Score
        </button>
        {submitted && (
          <div className="mt-5 rounded-2xl bg-gradient-to-br from-cyber-500/15 to-electric-500/15 p-5 text-center ring-1 ring-cyber-500/30 animate-fade-up">
            <Icon className={`mx-auto h-10 w-10 ${levelColor}`} />
            <p className="mt-2 font-display text-3xl font-bold text-white">
              {score}<span className="text-lg text-slate-400">/100</span>
            </p>
            <p className={`mt-1 font-display text-lg font-semibold ${levelColor}`}>{level}</p>
            <p className="mt-2 text-xs text-slate-400">
              {score >= 75
                ? 'Strong posture. Keep it up with regular pentests.'
                : score >= 45
                ? 'Some gaps identified. A security audit is recommended.'
                : 'Critical gaps detected. Request a security audit immediately.'}
            </p>
          </div>
        )}
      </div>
    </Reveal>
  );
}

// ============================================================
// SECURITY ASSESSMENT FORM
// ============================================================
function SecurityAssessmentForm() {
  const [form, setForm] = useState({ url: '', appType: 'Web Application', concerns: '', requirements: '', name: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const { error } = await supabase.from('contact_leads').insert({
      name: form.name || 'Assessment Request',
      email: form.email,
      service: 'Security Assessment',
      message: `URL: ${form.url}\nApp Type: ${form.appType}\nConcerns: ${form.concerns}\nRequirements: ${form.requirements}`,
    });
    setStatus(error ? 'error' : 'success');
    if (!error) setForm({ url: '', appType: 'Web Application', concerns: '', requirements: '', name: '', email: '' });
  };

  return (
    <Reveal>
      <div className="rounded-3xl glass-strong p-8 border border-white/5 shadow-xl shadow-cyber-500/5">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyber-500 to-electric-500 shadow-lg shadow-cyber-500/20">
            <Shield className="h-5 w-5 text-white" />
          </span>
          <div>
            <h2 className="font-display text-xl font-bold text-white">Security Assessment Request</h2>
            <p className="text-xs text-slate-400">Submit your assets for a professional security assessment</p>
          </div>
        </div>
        <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">Website URL</label>
            <input
              required
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              className="input-field"
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">Application Type</label>
            <select
              value={form.appType}
              onChange={(e) => setForm({ ...form, appType: e.target.value })}
              className="input-field"
            >
              {['Web Application', 'Mobile App', 'API', 'Network', 'Cloud Infrastructure', 'Other'].map((t) => (
                <option key={t} className="bg-navy-900">{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">Your Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-field"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">Your Email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input-field"
              placeholder="jane@company.com"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-300">Security Concerns</label>
            <textarea
              value={form.concerns}
              onChange={(e) => setForm({ ...form, concerns: e.target.value })}
              rows={3}
              className="input-field resize-none"
              placeholder="Describe your security concerns..."
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-300">Testing Requirements</label>
            <textarea
              value={form.requirements}
              onChange={(e) => setForm({ ...form, requirements: e.target.value })}
              rows={3}
              className="input-field resize-none"
              placeholder="What testing do you need? (pentest, vuln assessment, code review...)"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary sm:col-span-2 disabled:opacity-60"
          >
            {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Submit Assessment Request
          </button>
          {status === 'success' && (
            <p className="sm:col-span-2 flex items-center gap-2 rounded-lg bg-electric-500/10 px-4 py-3 text-sm text-electric-400">
              <CheckCircle2 className="h-4 w-4" /> Assessment request received! We will respond within one business day.
            </p>
          )}
          {status === 'error' && (
            <p className="sm:col-span-2 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
              Something went wrong. Please email hello@bitsecurex.tech directly.
            </p>
          )}
        </form>
      </div>
    </Reveal>
  );
}

export default ToolsPage;