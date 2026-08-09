import { useState, useEffect, useCallback, useMemo } from 'react';
import { Star, Send, CheckCircle2, Loader2, MessageSquare, Quote, ChevronLeft, ChevronRight, Globe2, Sparkles, Users, Award } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { supabase } from '../lib/supabase';
import { clientReviews, testimonials, type ClientReview } from '../lib/data';
import { sendTelegram, formatLeadMessage } from '../lib/telegram';

type Review = ClientReview & { source: 'static' | 'db'; created_at?: string };

export function ReviewsPage() {
  const [form, setForm] = useState({ name: '', role: '', company: '', project: '', rating: 5, text: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [hoverRating, setHoverRating] = useState(0);
  const [approvedReviews, setApprovedReviews] = useState<Array<Record<string, unknown>>>([]);
  const [slideIndex, setSlideIndex] = useState(0);

  const loadReviews = useCallback(async () => {
    const { data } = await supabase.from('public_reviews').select('*').eq('status', 'Approved').order('created_at', { ascending: false });
    setApprovedReviews(data ?? []);
  }, []);

  useEffect(() => { loadReviews(); }, [loadReviews]);

  // Build combined review list: approved from DB + static client reviews + testimonials
  const allReviews = useMemo<Review[]>(() => {
    const dbReviews: Review[] = approvedReviews.map(r => ({
      name: r.name as string,
      role: r.role as string ?? '',
      company: r.company as string ?? '',
      project: r.project as string ?? '',
      rating: r.rating as number,
      text: r.text as string,
      country: '',
      flag: '',
      date: r.created_at as string ?? new Date().toISOString(),
      source: 'db' as const,
      created_at: r.created_at as string,
    }));
    const staticReviews: Review[] = [...clientReviews, ...testimonials.map(t => ({
      ...t,
      country: '',
      flag: '',
      date: '2025-01-01',
      source: 'static' as const,
    }))];
    // Sort: DB reviews first (newest), then static by date desc
    const sortedDb = dbReviews.sort((a, b) => (b.created_at ?? '').localeCompare(a.created_at ?? ''));
    const sortedStatic = staticReviews.sort((a, b) => b.date.localeCompare(a.date));
    return [...sortedDb, ...sortedStatic];
  }, [approvedReviews]);

  // Mark the 5 most recent as "recent"
  const recentNames = useMemo(() => new Set(allReviews.slice(0, 5).map(r => r.name + r.text.slice(0, 20))), [allReviews]);

  // Auto-advance slideshow
  useEffect(() => {
    if (allReviews.length <= 1) return;
    const interval = setInterval(() => {
      setSlideIndex(i => (i + 1) % allReviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [allReviews.length]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const { error } = await supabase.from('public_reviews').insert({
      name: form.name,
      role: form.role,
      company: form.company,
      project: form.project,
      rating: form.rating,
      text: form.text,
      status: 'Pending',
    });
    await sendTelegram(formatLeadMessage('New Review Submitted', {
      name: form.name,
      role: form.role,
      company: form.company,
      project: form.project,
      rating: `${form.rating}/5`,
      review: form.text,
    }));
    setStatus(error ? 'error' : 'success');
    if (!error) {
      setForm({ name: '', role: '', company: '', project: '', rating: 5, text: '' });
      setTimeout(() => loadReviews(), 2000);
    }
  };

  const current = allReviews[slideIndex];
  const isRecent = (r: Review) => r.source === 'db' || r.recent || recentNames.has(r.name + r.text.slice(0, 20));

  // Count reviews from different sources
  const totalReviews = allReviews.length;
  const dbReviewCount = approvedReviews.length;

  return (
    <>
      {/* ✅ SEO – FIRST CHILD INSIDE THE FRAGMENT */}
      <SEO
        title="Client Reviews | Verified Testimonials | BitSecureX Tech"
        description="Read verified client reviews for BitSecureX Tech. See what businesses say about our web development, cybersecurity, and digital marketing services."
        keywords="client reviews, testimonials, customer feedback, Google reviews, verified reviews, trust signals, social proof"
        url="https://bitsecurex.tech/reviews"
        type="website"
      />

      <div className="pt-28">
        {/* WHITE: Header + form */}
        <section className="section-white section-pad">
          <div className="container-x">
            <div className="text-center">
              <Reveal>
                <span className="eyebrow-dark">Client Reviews</span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="section-title-dark mt-5 underline-accent inline-block">Share Your Experience</h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mx-auto mt-5 max-w-2xl text-slate-500">
                  We value your feedback. Leave a review and help other businesses discover BitSecureX Tech. All reviews are verified and approved by our team.
                </p>
              </Reveal>
            </div>

            {/* Trust & Ratings */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyber-50">
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-bold text-slate-900">4.8</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">Google Reviews</p>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-200" />

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyber-50">
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L14.5 8.5L21 9.5L16 14.5L17 21L12 18L7 21L8 14.5L3 9.5L9.5 8.5L12 2Z" fill="#00B67A"/>
                    <path d="M12 4.5L13.8 9.3L14.6 11.2L16.6 11.4L19.5 11.8L17.4 13.8L16.3 14.9L16.5 16.9L17.1 19.8L14.5 18.4L12.8 17.5L11 18.4L8.4 19.8L9 16.9L9.2 14.9L8.1 13.8L6 11.8L8.9 11.4L10.9 11.2L11.7 9.3L12 4.5Z" fill="#00B67A"/>
                    <path d="M12 7L12.8 9.3L13.6 10.8L15.2 11L17 11.2L15.6 12.6L14.9 13.3L15.1 14.9L15.6 17.2L13.8 16.2L12.4 15.5L11 16.2L9.2 17.2L9.7 14.9L9.9 13.3L9.2 12.6L7.8 11.2L9.6 11L11.2 10.8L12 9.3L12 7Z" fill="white"/>
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-bold text-slate-900">4.9</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">Trustpilot Reviews</p>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-200" />

              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-cyber-600" />
                <div>
                  <p className="text-2xl font-bold text-slate-900">{totalReviews}+</p>
                  <p className="text-xs text-slate-500">Total Reviews</p>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-200" />

              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-cyber-600" />
                <div>
                  <p className="text-2xl font-bold text-slate-900">{dbReviewCount}</p>
                  <p className="text-xs text-slate-500">Verified Reviews</p>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-12 max-w-2xl">
              <Reveal>
                <form onSubmit={submit} className="card-white rounded-3xl p-8 shadow-lg border border-slate-100">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyber-500 to-electric-500">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </span>
                    <h2 className="font-display text-xl font-bold text-slate-900">Drop Your Review</h2>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium text-slate-700">
                        Your Name <span className="text-cyber-500">*</span>
                      </span>
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field-light" placeholder="Jane Doe" />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium text-slate-700">Role and Title</span>
                      <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="input-field-light" placeholder="CTO" />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium text-slate-700">Company</span>
                      <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="input-field-light" placeholder="Acme Inc." />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium text-slate-700">Project Type</span>
                      <input value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} className="input-field-light" placeholder="Web Development" />
                    </label>
                  </div>

                  <div className="mt-4">
                    <span className="mb-2 block text-sm font-medium text-slate-700">Rating</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setForm({ ...form, rating: n })}
                          onMouseEnter={() => setHoverRating(n)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star className={`h-7 w-7 ${(hoverRating || form.rating) >= n ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="mt-4 block">
                    <span className="mb-1.5 block text-sm font-medium text-slate-700">
                      Your Review <span className="text-cyber-500">*</span>
                    </span>
                    <textarea
                      required
                      rows={4}
                      value={form.text}
                      onChange={(e) => setForm({ ...form, text: e.target.value })}
                      className="input-field-light resize-none"
                      placeholder="Tell us about your experience working with BitSecureX Tech..."
                    />
                  </label>

                  <button type="submit" disabled={status === 'loading'} className="btn-primary mt-6 w-full disabled:opacity-60">
                    {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    Submit Review
                  </button>

                  {status === 'success' && (
                    <p className="mt-4 flex items-center gap-2 rounded-lg bg-electric-50 px-4 py-3 text-sm text-electric-600">
                      <CheckCircle2 className="h-4 w-4" /> Thank you! Your review has been submitted and will appear once approved by our team.
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              </Reveal>
            </div>
          </div>
        </section>

        {/* DARK: Slideshow Reviews */}
        {allReviews.length > 0 && (
          <section className="section-dark section-pad">
            <div className="container-x">
              <div className="text-center">
                <Reveal>
                  <span className="eyebrow">
                    <Globe2 className="h-3.5 w-3.5" /> {totalReviews}+ Reviews Worldwide
                  </span>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="section-title-light mt-5">What <span className="gradient-text">clients say</span></h2>
                </Reveal>
                <Reveal delay={160}>
                  <p className="mx-auto mt-5 max-w-2xl text-slate-400">
                    Verified reviews from clients across the globe. All reviews are approved by our admin team before publishing.
                  </p>
                </Reveal>
              </div>

              {/* Featured slideshow carousel */}
              {current && (
                <div className="mx-auto mt-12 max-w-3xl">
                  <div className="relative rounded-3xl glass-strong p-8 lg:p-12 border border-white/10">
                    <div className="flex items-center justify-between">
                      <Quote className="h-10 w-10 text-cyber-500/30" />
                      {isRecent(current) && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-electric-500/15 px-3 py-1 text-xs font-bold text-electric-400 ring-1 ring-electric-500/30">
                          <Sparkles className="h-3 w-3" /> RECENT
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex gap-1">
                      {[...Array(current.rating)].map((_, j) => (
                        <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="mt-5 text-lg leading-relaxed text-slate-200">"{current.text}"</p>
                    <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-5">
                      <div className="grid h-12 w-12 place-items-center rounded-full bg-cyber-500/20 text-base font-bold text-cyber-400">
                        {current.name[0]}
                      </div>
                      <div className="flex-1">
                        <p className="flex items-center gap-1.5 font-display text-base font-semibold text-white">
                          {current.name} <CheckCircle2 className="h-4 w-4 text-electric-500" />
                        </p>
                        <p className="text-sm text-slate-500">
                          {current.role}{current.company ? ` · ${current.company}` : ''}{current.project ? ` · ${current.project}` : ''}
                        </p>
                      </div>
                      {current.flag && <span className="text-2xl" title={current.country}>{current.flag}</span>}
                    </div>

                    {/* Slide controls */}
                    {allReviews.length > 1 && (
                      <>
                        <button
                          onClick={() => setSlideIndex(i => (i - 1 + allReviews.length) % allReviews.length)}
                          className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-cyber-500/30"
                          aria-label="Previous"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setSlideIndex(i => (i + 1) % allReviews.length)}
                          className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-cyber-500/30"
                          aria-label="Next"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                        <div className="mt-6 flex flex-wrap justify-center gap-1.5">
                          {allReviews.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setSlideIndex(i)}
                              className={`h-2 rounded-full transition-all ${i === slideIndex ? 'w-6 bg-cyber-500' : 'w-2 bg-white/20'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Grid of all reviews */}
              <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {allReviews.map((t, i) => (
                  <Reveal key={i} delay={(i % 6) * 60}>
                    <div className="flex h-full flex-col rounded-2xl glass card-hover p-7 border border-white/5 transition-all hover:border-cyber-500/30 hover:-translate-y-1">
                      <div className="flex items-center justify-between">
                        <Quote className="h-8 w-8 text-cyber-500/30" />
                        {isRecent(t) && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-electric-500/15 px-2.5 py-0.5 text-[10px] font-bold text-electric-400 ring-1 ring-electric-500/30">
                            <Sparkles className="h-2.5 w-2.5" /> RECENT
                          </span>
                        )}
                      </div>
                      <div className="mt-3 flex gap-1">
                        {[...Array(t.rating)].map((_, j) => (
                          <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">"{t.text}"</p>
                      <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                        <div className="grid h-11 w-11 place-items-center rounded-full bg-cyber-500/20 text-sm font-bold text-cyber-400">
                          {t.name[0]}
                        </div>
                        <div className="flex-1">
                          <p className="flex items-center gap-1.5 text-sm font-semibold text-white">
                            {t.name} <CheckCircle2 className="h-3.5 w-3.5 text-electric-500" />
                          </p>
                          <p className="text-xs text-slate-500">
                            {t.role}{t.company ? ` · ${t.company}` : ''}
                          </p>
                        </div>
                        {t.flag && <span className="text-lg" title={t.country}>{t.flag}</span>}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export default ReviewsPage;