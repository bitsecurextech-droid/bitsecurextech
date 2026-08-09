import { useState } from 'react';
import { useOffers, useFeaturedOffers } from '../lib/hooks';
import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { Loader2, Clock, Sparkles, Tag, ArrowRight, Filter, Zap, Star, Users, Award } from 'lucide-react';
import { useNavigate } from '../lib/router';

const categories = [
  'All',
  'Web Development',
  'Ecommerce',
  'Digital Marketing',
  'SEO and Traffic',
  'Creator Promotion',
  'Seasonal',
];

export function OffersPage() {
  const nav = useNavigate();
  const [category, setCategory] = useState('All');
  const { data: allOffers, isLoading, error } = useOffers(category === 'All' ? undefined : category);
  const { data: featured } = useFeaturedOffers();

  const filteredOffers = allOffers || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28">
        <Loader2 className="h-10 w-10 animate-spin text-cyber-400" />
      </div>
    );
  }

  return (
    <>
      {/* ✅ SEO – FIRST CHILD INSIDE THE FRAGMENT */}
      <SEO
        title="Growth Offers | Exclusive Deals on Web Development & Digital Marketing | BitSecureX Tech"
        description="Exclusive digital growth opportunities from BitSecureX Tech. Get special offers on web development, cybersecurity, SEO, and digital marketing services."
        keywords="growth offers, special offers, website deals, cybersecurity discounts, SEO packages, digital marketing offers, exclusive deals"
        url="https://bitsecurex.tech/offers"
        type="website"
      />

      <div className="pt-28">
        {/* Hero */}
        <section className="section-pad pb-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid bg-grid opacity-20" />
          <div className="absolute -top-20 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-radial-glow blur-2xl" />
          <div className="container-x relative text-center">
            <Reveal>
              <span className="eyebrow text-electric-400">Exclusive Opportunities</span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                BitSecureX <span className="gradient-text">Growth Offers</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
                Exclusive digital growth opportunities designed to help businesses launch, grow, and scale online.
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
                  <p className="text-xs text-slate-400">Happy Clients</p>
                </div>
              </div>

              <div className="h-8 w-px bg-white/10" />

              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-cyber-400" />
                <div>
                  <p className="text-2xl font-bold text-white">4.72</p>
                  <p className="text-xs text-slate-400">Average Client Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Offers */}
        {featured && featured.length > 0 && (
          <section className="section-pad py-6">
            <div className="container-x">
              <div className="text-center">
                <Reveal>
                  <span className="eyebrow bg-yellow-500/15 text-yellow-400 border-yellow-500/30">
                    <Sparkles className="h-3.5 w-3.5" /> Featured Offers
                  </span>
                </Reveal>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {featured.map((offer) => (
                  <Reveal key={offer.id} delay={100}>
                    <OfferCard offer={offer} featured />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Filter */}
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
                      ? 'bg-cyber-500 text-white'
                      : 'border border-white/10 bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Offers Grid */}
        <section className="section-pad py-6">
          <div className="container-x">
            {filteredOffers.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-slate-400">No offers available in this category right now.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredOffers.map((offer) => (
                  <Reveal key={offer.id} delay={100}>
                    <OfferCard offer={offer} />
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
              <div className="glass-strong rounded-3xl p-10 text-center">
                <h2 className="font-display text-2xl font-bold text-white">
                  Don't see what you are looking for?
                </h2>
                <p className="mt-3 text-slate-400">Contact us for a custom growth package tailored to your business.</p>
                <button onClick={() => nav('/contact')} className="btn-primary mt-6">
                  Get a Custom Quote <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}

// --- Offer Card Component ---
function OfferCard({ offer, featured = false }: { offer: any; featured?: boolean }) {
  const nav = useNavigate();
  const isExpired = offer.deadline && new Date(offer.deadline) < new Date();

  return (
    <div className={`relative flex h-full flex-col rounded-2xl glass p-6 transition-all hover:-translate-y-1 ${
      featured ? 'ring-2 ring-yellow-500/50' : ''
    }`}>
      {featured && (
        <span className="absolute -top-3 right-4 rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-bold text-yellow-400 ring-1 ring-yellow-500/50">
          Featured
        </span>
      )}
      {offer.image_url && (
        <div className="overflow-hidden rounded-lg h-40">
          <img src={offer.image_url} alt={offer.title} className="h-full w-full object-cover" />
        </div>
      )}
      <h3 className="mt-4 font-display text-lg font-semibold text-white">{offer.title}</h3>
      {offer.description && <p className="mt-2 text-sm text-slate-400 flex-1">{offer.description}</p>}

      <div className="mt-4 flex items-center gap-3">
        {offer.original_price && (
          <span className="text-sm text-slate-500 line-through">${offer.original_price}</span>
        )}
        {offer.sale_price && (
          <span className="font-display text-2xl font-bold gradient-text">${offer.sale_price}</span>
        )}
        {offer.discount_percentage && (
          <span className="rounded-full bg-electric-500/20 px-3 py-1 text-xs font-bold text-electric-400">
            {offer.discount_percentage}% OFF
          </span>
        )}
      </div>

      {offer.deadline && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
          <Clock className="h-3.5 w-3.5" />
          <span>{isExpired ? 'Expired' : `Ends ${new Date(offer.deadline).toLocaleDateString()}`}</span>
        </div>
      )}

      <button
        onClick={() => nav(offer.cta_link || '/contact')}
        className="btn-primary mt-5 w-full text-sm"
        disabled={isExpired}
      >
        {offer.cta_text || 'Claim Offer'} <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
export default OffersPage;