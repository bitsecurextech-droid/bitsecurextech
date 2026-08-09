import { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { supabase } from '../lib/supabase';

export function CaseStudyPage() {
  const [selected, setSelected] = useState<any>(null);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH FROM SUPABASE INSTEAD OF LOCAL DATA
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('admin_case_studies')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching case studies:', error);
      } else if (data) {
        setCaseStudies(data);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="pt-28 text-center text-cyber-400">Loading case studies...</div>;

  return (
    <div className="pt-28">
      <SEO title="Case Studies | BitSecureX Tech" description="See how we solve complex digital challenges." url="https://bitsecurex.tech/case-studies" type="website" />
      
      <section className="section-pad pb-8"><div className="container-x text-center"><h1 className="font-display text-4xl font-bold text-white sm:text-5xl">Our <span className="gradient-text">Case Studies</span></h1><p className="mt-4 text-slate-400 max-w-2xl mx-auto">Real-world solutions for real-world problems.</p></div></section>

      {caseStudies.length === 0 ? (
        <div className="container-x text-center py-20 text-slate-400">No case studies published yet.</div>
      ) : (
        <section className="section-pad py-10"><div className="container-x">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs, i) => (
              <Reveal key={cs.id} delay={i * 80}>
                <button onClick={() => setSelected(cs)} className="group h-full w-full text-left rounded-2xl glass card-hover overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img src={cs.image_url || 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'} alt={cs.title} className="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-cyber-500/20 px-3 py-1 text-xs font-medium text-cyber-300">{cs.industry}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-white">{cs.title}</h3>
                    <p className="mt-2 text-sm text-slate-400 line-clamp-2">{cs.challenge}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-sm text-cyber-400 group-hover:translate-x-1 transition-transform">Read Study <ArrowRight className="h-4 w-4" /></span>
                      <span className="text-xs text-slate-500">{cs.client}</span>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div></section>
      )}

      {/* Detailed Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl glass-strong p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-white">{selected.title}</h2>
                <div className="flex items-center gap-3 mt-1"><span className="text-sm text-cyber-400">{selected.client}</span><span className="text-xs text-slate-500">·</span><span className="text-sm text-slate-400">{selected.industry}</span></div>
              </div>
              <button onClick={() => setSelected(null)} className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            {selected.image_url && <img src={selected.image_url} alt={selected.title} className="w-full h-56 object-cover rounded-xl mb-6" />}
            <div className="space-y-6 text-sm text-slate-300">
              <div className="rounded-xl bg-white/5 p-4 border-l-2 border-cyber-500"><p className="font-bold text-white mb-1">Challenge</p><p>{selected.challenge}</p></div>
              <div className="rounded-xl bg-white/5 p-4 border-l-2 border-electric-500"><p className="font-bold text-white mb-1">Strategy & Design</p><p>{selected.strategy} {selected.design}</p></div>
              <div className="rounded-xl bg-white/5 p-4 border-l-2 border-cyber-500"><p className="font-bold text-white mb-1">Development & Security</p><p>{selected.development} {selected.security}</p></div>
            </div>
            <div className="mt-6 border-t border-white/10 pt-4"><h3 className="font-bold text-white mb-2">Results</h3><div className="flex flex-wrap gap-2">{selected.results?.map((r:any) => (<span key={r.label} className="rounded-full bg-cyber-500/20 px-4 py-2 text-sm text-cyber-300">{r.label}: <span className="font-bold text-white">{r.value}</span></span>))}</div></div>
          </div>
        </div>
      )}
    </div>
  );
}