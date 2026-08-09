import { useState, useEffect } from 'react';
import { ArrowRight, Building2, Tag, ExternalLink, ExternalLink as Ext, Plus, Trash2, X, Loader2, Search, Filter, Star } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { projects, portfolioCategories, type Project } from '../lib/data';
import { useNavigate } from '../lib/router';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth';

type AdminProject = {
  id: string;
  title: string;
  category: string;
  industry: string | null;
  problem: string | null;
  solution: string | null;
  tech: string[] | null;
  image_url: string | null;
  live_demo_url: string | null;
  github_url: string | null;
  description: string | null;
  accent: string | null;
  featured: boolean;
  created_at: string;
};

export function PortfolioPage() {
  const nav = useNavigate();
  const { session, user } = useAuth();
  const [cat, setCat] = useState('All');
  const [adminProjects, setAdminProjects] = useState<AdminProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Apps',
    industry: '',
    description: '',
    tech: '',
    image_url: '',
    live_demo_url: '',
    github_url: '',
    accent: 'from-cyber-500 to-electric-500',
  });

  // ---- CHECK IF USER IS ADMIN ----
  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }

      const adminEmail = 'admin@bitsecurex.tech';
      if (user.email === adminEmail) {
        setIsAdmin(true);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (data && (data.role === 'admin' || data?.role === 'super_admin')) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        setIsAdmin(user.email === adminEmail);
      }
    };

    checkAdmin();
  }, [user]);

  // ---- Fetch projects ----
  const fetchProjects = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('admin_projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setAdminProjects(data as AdminProject[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ---- Delete project ----
  const deleteProject = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This action cannot be undone.`)) return;
    const { error } = await supabase.from('admin_projects').delete().eq('id', id);
    if (error) {
      alert('Failed to delete project. Please try again.');
      return;
    }
    fetchProjects();
  };

  // ---- Add project ----
  const addProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const techArray = formData.tech.split(',').map((t) => t.trim()).filter(Boolean);

    const payload = {
      title: formData.title,
      category: formData.category,
      industry: formData.industry || null,
      description: formData.description || null,
      tech: techArray.length > 0 ? techArray : null,
      image_url: formData.image_url || null,
      live_demo_url: formData.live_demo_url || null,
      github_url: formData.github_url || null,
      accent: formData.accent || 'from-cyber-500 to-electric-500',
      featured: false,
    };

    const { error } = await supabase.from('admin_projects').insert(payload);
    if (error) {
      alert('Failed to add project. Please try again.');
      setIsSubmitting(false);
      return;
    }

    setFormData({
      title: '',
      category: 'Web Apps',
      industry: '',
      description: '',
      tech: '',
      image_url: '',
      live_demo_url: '',
      github_url: '',
      accent: 'from-cyber-500 to-electric-500',
    });
    setShowAddModal(false);
    setIsSubmitting(false);
    fetchProjects();
  };

  // ---- Map admin projects to the same format ----
  const adminMapped: Project[] = adminProjects.map((p) => ({
    slug: `admin-${p.id}`,
    title: p.title,
    category: p.category || 'Web Apps',
    industry: p.industry || '-',
    problem: p.description || p.problem || '',
    solution: p.solution || '',
    tech: p.tech || [],
    results: [],
    image: p.image_url || 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&w=1200',
    accent: p.accent || 'from-cyber-500 to-electric-500',
    liveDemo: p.live_demo_url || undefined,
    github: p.github_url || undefined,
    isAdmin: true,
    adminId: p.id,
  } as Project & { isAdmin?: boolean; adminId?: string }));

  // ✅ FIX: Remove 'All' from the imported categories list to prevent duplicate keys
  const filteredDataCategories = portfolioCategories.filter(c => c !== 'All');
  const allCategories = ['All', ...filteredDataCategories, ...adminMapped.map((p) => p.category)];
  // ✅ Guarantee unique keys using a Set
  const uniqueCategories = Array.from(new Set(allCategories));

  const allProjects = [...adminMapped, ...projects];
  const filtered = cat === 'All' ? allProjects : allProjects.filter((p) => p.category === cat);

  // Featured projects (first 3)
  const featuredProjects = allProjects.slice(0, 3);

  return (
    <>
      {/* ✅ SEO – FIRST CHILD INSIDE THE FRAGMENT */}
      <SEO
        title="Portfolio | Web Development & Cybersecurity Projects | BitSecureX Tech"
        description="Browse our portfolio of premium web development, cybersecurity, SaaS, and fintech projects. See how we build and secure digital solutions for businesses worldwide."
        keywords="portfolio, web development projects, cybersecurity projects, fintech solutions, case studies, SaaS projects"
        url="https://bitsecurex.tech/portfolio"
        type="website"
      />

      <div className="pt-28">
        {/* ===== HERO ===== */}
        <section className="section-pad pb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid bg-grid opacity-20" />
          <div className="absolute -top-20 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-radial-glow blur-2xl" />
          <div className="container-x relative text-center">
            <Reveal>
              <span className="eyebrow">Portfolio</span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Work that <span className="gradient-text">ships and secures</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
                Premium case-study style portfolio across web, fintech, SaaS, cybersecurity, and automation.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ===== FEATURED PROJECTS ===== */}
        {featuredProjects.length > 0 && (
          <section className="section-pad py-4">
            <div className="container-x">
              <div className="text-center">
                <Reveal>
                  <span className="eyebrow text-electric-400">Featured Work</span>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="mt-4 font-display text-3xl font-bold text-white">Our Best <span className="gradient-text">Projects</span></h2>
                </Reveal>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {featuredProjects.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 100}>
                    <div className="group relative overflow-hidden rounded-2xl glass card-hover">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.title}
                          loading="lazy"
                          className="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-110 group-hover:opacity-90"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${p.accent} opacity-30 mix-blend-overlay`} />
                        <span className="absolute left-3 top-3 rounded-full bg-cyber-500/90 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                          <Star className="inline h-3 w-3 mr-1" /> Featured
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="font-display text-base font-semibold text-white">{p.title}</h3>
                        <p className="mt-1 text-xs text-cyber-400">{p.category}</p>
                        <button
                          onClick={() => p.isAdmin ? null : nav(`/case-studies?slug=${p.slug}`)}
                          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-cyber-400 transition-transform group-hover:translate-x-1"
                        >
                          View Project <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===== FILTERS & ADMIN BUTTON ===== */}
        <section className="section-pad py-6">
          <div className="container-x">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <Filter className="h-4 w-4 text-slate-400" />
                <div className="flex flex-wrap gap-2">
                  {/* ✅ FIXED: unique keys guaranteed here */}
                  {uniqueCategories.map((c, index) => (
                    <button
                      key={`${c}-${index}`}
                      onClick={() => setCat(c)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        cat === c
                          ? 'bg-gradient-to-r from-cyber-500 to-electric-500 text-white shadow-lg shadow-cyber-500/30'
                          : 'border border-white/10 bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Admin: Add Project Button */}
              {isAdmin && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-electric-500/20 px-4 py-2 text-sm font-medium text-electric-400 ring-1 ring-electric-500/50 transition-all hover:bg-electric-500/30"
                >
                  <Plus className="h-4 w-4" /> Add Project
                </button>
              )}
            </div>

            {/* ===== PROJECTS GRID ===== */}
            {loading ? (
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-80 animate-pulse rounded-2xl glass" />
                ))}
              </div>
            ) : (
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p: any, i) => {
                  const previewUrl = p.liveDemo;
                  const isAdminProject = p.isAdmin;
                  return (
                    <Reveal key={p.slug} delay={i * 80}>
                      <div className="group relative block h-full w-full overflow-hidden rounded-2xl glass card-hover border border-white/5 transition-all hover:-translate-y-1 hover:border-cyber-500/30">
                        {/* Admin Delete Button */}
                        {isAdmin && isAdminProject && p.adminId && (
                          <button
                            onClick={() => deleteProject(p.adminId, p.title)}
                            className="absolute right-3 top-3 z-10 rounded-full bg-red-500/80 p-1.5 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-600"
                            aria-label="Delete project"
                          >
                            <Trash2 className="h-4 w-4 text-white" />
                          </button>
                        )}

                        <div className="relative h-52 overflow-hidden">
                          {p.image ? (
                            <img
                              src={p.image}
                              alt={p.title}
                              loading="lazy"
                              className="h-full w-full object-cover object-top opacity-80 transition-all duration-700 group-hover:scale-110 group-hover:opacity-95"
                            />
                          ) : (
                            <div className="h-full w-full bg-navy-800 flex items-center justify-center">
                              <Building2 className="h-10 w-10 text-slate-600" />
                            </div>
                          )}
                          <div className={`absolute inset-0 bg-gradient-to-t ${p.accent} opacity-20 mix-blend-overlay`} />
                          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-navy-950/80 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                            <Tag className="h-3 w-3" /> {p.category}
                          </span>
                          {previewUrl && (
                            <a
                              href={previewUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-cyber-500/90 px-3 py-1 text-xs font-medium text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100"
                            >
                              <ExternalLink className="h-3 w-3" /> Preview
                            </a>
                          )}
                        </div>

                        <div className="p-6">
                          <p className="flex items-center gap-1.5 text-xs text-cyber-400">
                            <Building2 className="h-3.5 w-3.5" /> {p.industry}
                          </p>
                          <h3 className="mt-2 font-display text-lg font-semibold text-white group-hover:text-cyber-300 transition-colors">
                            {p.title}
                          </h3>
                          {p.problem && (
                            <p className="mt-2 text-sm text-slate-400 line-clamp-3">{p.problem}</p>
                          )}
                          {p.tech?.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-1.5">
                              {p.tech.slice(0, 4).map((t: string) => (
                                <span
                                  key={t}
                                  className="rounded-full border border-cyber-500/30 bg-cyber-500/10 px-2.5 py-1 text-[11px] font-medium text-cyber-200"
                                >
                                  {t}
                                </span>
                              ))}
                              {p.tech.length > 4 && (
                                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-400">
                                  +{p.tech.length - 4}
                                </span>
                              )}
                            </div>
                          )}
                          {p.results?.length > 0 && (
                            <div className="mt-4 grid grid-cols-3 gap-2">
                              {p.results.slice(0, 3).map((r: { label: string; value: string }) => (
                                <div key={r.label} className="rounded-lg bg-white/5 p-2 text-center">
                                  <p className="font-display text-sm font-bold text-electric-400">{r.value}</p>
                                  <p className="text-[10px] text-slate-500">{r.label}</p>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="mt-5 flex items-center gap-3">
                            {!isAdminProject && (
                              <button
                                onClick={() => nav(`/case-studies?slug=${p.slug}`)}
                                className="inline-flex items-center gap-1 text-sm font-medium text-cyber-400 transition-transform group-hover:translate-x-1"
                              >
                                View case study <ArrowRight className="h-4 w-4" />
                              </button>
                            )}
                            {previewUrl && (
                              <a
                                href={previewUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-sm font-medium text-electric-400 hover:text-electric-300"
                              >
                                Visit site <Ext className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            )}

            {/* Empty state */}
            {!loading && filtered.length === 0 && (
              <div className="mt-20 text-center">
                <div className="glass rounded-2xl p-12">
                  <Building2 className="mx-auto h-12 w-12 text-slate-600" />
                  <p className="mt-4 text-slate-400">No projects in this category yet.</p>
                  {isAdmin && (
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="btn-primary mt-4"
                    >
                      <Plus className="h-4 w-4" /> Add Your First Project
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* ============================================================
      ADD PROJECT MODAL
      ============================================================ */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl glass-strong p-6 shadow-2xl shadow-cyber-500/20 border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-white">Add New Project</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={addProject} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  placeholder="My Awesome Project"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-field"
                >
                  {['Web Apps', 'SaaS', 'Security', 'Fintech', 'E-commerce', 'Mobile', 'Automation'].map((c) => (
                    <option key={c} className="bg-navy-900">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
                  Industry
                </label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="input-field"
                  placeholder="Finance"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
                  Description and Problem Solved
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field resize-none"
                  rows={3}
                  placeholder="What problem did this project solve?"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tech}
                  onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                  className="input-field"
                  placeholder="React, Supabase, Tailwind"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="input-field"
                  placeholder="https://example.com/image.jpg"
                />
                {formData.image_url && (
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="mt-2 h-32 w-full rounded-lg object-cover border border-white/10"
                    onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                  />
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  value={formData.live_demo_url}
                  onChange={(e) => setFormData({ ...formData, live_demo_url: e.target.value })}
                  className="input-field"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  className="input-field"
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
                  Accent Color
                </label>
                <select
                  value={formData.accent}
                  onChange={(e) => setFormData({ ...formData, accent: e.target.value })}
                  className="input-field"
                >
                  <option className="bg-navy-900" value="from-cyber-500 to-electric-500">Cyber Blue to Electric</option>
                  <option className="bg-navy-900" value="from-electric-500 to-cyber-500">Electric to Cyber Blue</option>
                  <option className="bg-navy-900" value="from-cyber-400 to-cyber-600">Cyber Blue</option>
                  <option className="bg-navy-900" value="from-electric-600 to-cyber-500">Electric to Cyber</option>
                  <option className="bg-navy-900" value="from-red-500 to-orange-500">Red to Orange</option>
                  <option className="bg-navy-900" value="from-purple-500 to-pink-500">Purple to Pink</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-ghost flex-1 py-2.5 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex-1 py-2.5 text-sm"
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {isSubmitting ? 'Adding...' : 'Add Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default PortfolioPage;