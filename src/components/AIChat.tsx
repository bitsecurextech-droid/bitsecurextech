import { useEffect, useRef, useState } from 'react';
import { Bot, X, Send, Sparkles, Calendar, FileText } from 'lucide-react';
import { useNavigate } from '../lib/router';

type Msg = { role?: 'bot' | 'user'; text: string; action?: string };

const quick = [
  'What services do you offer?',
  'How much does a website cost?',
  'Do you do penetration testing?',
  'Schedule a consultation',
  'Are you available for hire?',
];

function answer(q: string): Msg {
  const t = q.toLowerCase();
  if (t.includes('cost') || t.includes('price') || t.includes('quote'))
    return { text: "Project pricing depends on scope. Business websites start ~$2,500, SaaS from $15k, pentesting from $3,500. Use the Cost Calculator under Tools for an instant estimate, or request a free quote on the Contact page.", action: '/tools' };
  if (t.includes('penetration') || t.includes('pentest') || t.includes('security audit'))
    return { text: "Yes — we offer penetration testing, vulnerability assessments, web/API/mobile security testing, secure code review, and CEH-based consulting. Visit the Cybersecurity page or request a security audit.", action: '/cybersecurity' };
  if (t.includes('service') || t.includes('offer') || t.includes('do you'))
    return { text: "BitSecureX Tech offers Web Development, Software Development, AI & Automation, Mobile Apps, Cloud & Infrastructure, and full Cybersecurity services. We Build. We Automate. We Secure.", action: '/services' };
  if (t.includes('hire') || t.includes('available') || t.includes('work with'))
    return { text: "Yes! I'm available for project work, team augmentation, and security consulting. Let's talk — book a consultation or send a message via the Contact page and I'll respond within one business day.", action: '/contact' };
  if (t.includes('schedule') || t.includes('consultation') || t.includes('book') || t.includes('meeting'))
    return { text: "I'd love to chat. You can book a free 30-minute consultation on the Contact page — pick a time slot that works for you and I'll confirm via email.", action: '/contact' };
  if (t.includes('secure') || t.includes('protect') || t.includes('hack'))
    return { text: "We secure apps through defense-in-depth: MFA, encryption, input validation, rate limiting, WAFs, secure code review, and regular penetration testing. Tell me about your app and I'll point you to the right service.", action: '/cybersecurity' };
  if (t.includes('ai') || t.includes('automation') || t.includes('chatbot'))
    return { text: "We build AI chatbots, workflow automation, and business process automation tailored to your operations. Check the Services page for our Automation & AI offerings.", action: '/services' };
  if (t.includes('cert') || t.includes('certification') || t.includes('qualification'))
    return { text: "Our team holds CompTIA N+/S+/A+/Pentest+, CEH, CCNA Ethical Hacking, NIIT Full-Stack, Google Certified SEO, and SEMrush certifications. Security and expertise you can trust.", action: '/' };
  if (t.includes('hello') || t.includes('hi') || t.includes('hey'))
    return { text: "Hi! I'm the BitSecureX AI assistant. Ask me about services, pricing, cybersecurity, or hiring — or pick a quick question below." };
  return { text: "Great question! A specialist can give you a detailed answer. Use the Contact page to request a free quote or security audit, and our team will reach out within one business day.", action: '/contact' };
}

export function AIChat() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([
    { text: "Hi! I'm the BitSecureX AI assistant — your 'Hire Me' concierge. Ask me about services, pricing, cybersecurity, or booking a consultation." },
  ]);
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, typing, open]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMsgs((m) => [...m, { role: 'user', text: q }]);
    setInput('');
    setTyping(true);
    setTimeout(() => { setTyping(false); setMsgs((m) => [...m, answer(q)]); }, 700);
  };

  return (
    <>
      {/* Floating Hire Me FAB */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-cyber-500 to-electric-500 shadow-lg shadow-cyber-500/40 transition-transform hover:scale-110 active:scale-95"
        aria-label="Open AI assistant"
      >
        {open ? <X className="h-6 w-6 text-white" /> : <Bot className="h-6 w-6 text-white" />}
        {!open && <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 animate-ping rounded-full bg-electric-500" />}
        {!open && <span className="absolute -bottom-1 right-0 whitespace-nowrap rounded-full bg-electric-500 px-2 py-0.5 text-[9px] font-bold text-navy-950 animate-pulse">HIRE ME</span>}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[480px] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl glass-strong shadow-2xl shadow-black/50 animate-fade-up">
          <div className="flex items-center gap-3 border-b border-white/10 bg-cyber-500/10 px-4 py-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-cyber-500 to-electric-500"><Sparkles className="h-5 w-5 text-white" /></span>
            <div>
              <p className="text-sm font-semibold text-white">BitSecureX Assistant</p>
              <p className="text-xs text-electric-400">● Online · AI-powered · Hire Me</p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${m.role === 'user' ? 'bg-gradient-to-br from-cyber-500 to-cyber-600 text-white' : 'glass text-slate-200 light:text-surface-700'}`}>
                  {m.text}
                  {m.action && (
                    <button onClick={() => { nav(m.action!); setOpen(false); }} className="mt-2 flex items-center gap-1 rounded-lg bg-cyber-500/20 px-2.5 py-1.5 text-xs font-medium text-cyber-300 hover:bg-cyber-500/30">
                      {m.action.includes('contact') ? <Calendar className="h-3 w-3" /> : <FileText className="h-3 w-3" />} Open page
                    </button>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="glass flex gap-1 rounded-2xl px-4 py-3">
                  {[0,1,2].map((i) => <span key={i} className="h-2 w-2 animate-bounce rounded-full bg-cyber-400" style={{ animationDelay: `${i * 150}ms` }} />)}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {msgs.length <= 2 && (
            <div className="flex flex-wrap gap-2 px-4 pb-2">
              {quick.map((q) => (
                <button key={q} onClick={() => send(q)} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-cyber-400/50 hover:text-white">{q}</button>
              ))}
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 border-t border-white/10 p-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything…" className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-cyber-400/50" />
            <button type="submit" className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-cyber-500 to-electric-500 transition-transform hover:scale-105 active:scale-95" aria-label="Send"><Send className="h-4 w-4 text-white" /></button>
          </form>
        </div>
      )}
    </>
  );
}
