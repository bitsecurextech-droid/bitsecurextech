import { Link } from '../lib/router';
import {
  Home,
  Wrench,
  Code2,
  Megaphone,
  Shield,
  ShoppingCart,
  Newspaper,
  Calculator,
  Users,
  Mail,
  ArrowLeft,
} from 'lucide-react';

type NavItem = {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    title: 'Services',
    items: [
      { label: 'All Services', to: '/services', icon: Wrench, description: 'Everything we offer' },
      { label: 'Web Development', to: '/web-development', icon: Code2, description: 'Sites & web apps' },
      { label: 'Software Solutions', to: '/software-solutions', icon: Code2, description: 'Custom software' },
    ],
  },
  {
    title: 'Security',
    items: [
      { label: 'Cybersecurity', to: '/cybersecurity', icon: Shield, description: 'Protect your business' },
      { label: 'Penetration Testing', to: '/penetration-testing', icon: Shield, description: 'Find weaknesses' },
      { label: 'Bug Bounty', to: '/bug-bounty', icon: Shield, description: 'Report vulnerabilities' },
    ],
  },
  {
    title: 'Marketing',
    items: [
      { label: 'Digital Marketing', to: '/digital-marketing', icon: Megaphone, description: 'Grow your reach' },
      { label: 'SEO', to: '/seo', icon: Megaphone, description: 'Rank higher' },
      { label: 'Social Media', to: '/social-media-marketing', icon: Megaphone, description: 'Engage audiences' },
    ],
  },
  {
    title: 'Commerce',
    items: [
      { label: 'E-commerce', to: '/ecommerce-development', icon: ShoppingCart, description: 'Online stores' },
      { label: 'Shopify Stores', to: '/shopify-stores', icon: ShoppingCart, description: 'Shopify builds' },
      { label: 'Marketplace', to: '/marketplace', icon: ShoppingCart, description: 'Multi-vendor' },
    ],
  },
  {
    title: 'Insights',
    items: [
      { label: 'Blog', to: '/blog', icon: Newspaper, description: 'Latest articles' },
      { label: 'Case Studies', to: '/case-studies', icon: Newspaper, description: 'Real results' },
      { label: 'Reports', to: '/reports', icon: Newspaper, description: 'Research & data' },
    ],
  },
  {
    title: 'Tools & Offers',
    items: [
      { label: 'Tools', to: '/tools', icon: Calculator, description: 'Free utilities' },
      { label: 'Cost Calculator', to: '/calculator', icon: Calculator, description: 'Estimate your project' },
      { label: 'Offers', to: '/offers', icon: Calculator, description: 'Current deals' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', to: '/about', icon: Users, description: 'Who we are' },
      { label: 'Careers', to: '/careers', icon: Users, description: 'Join the team' },
      { label: 'Partners', to: '/partners', icon: Users, description: 'Work with us' },
    ],
  },
  {
    title: 'Support',
    items: [
      { label: 'Contact', to: '/contact', icon: Mail, description: 'Get in touch' },
      { label: 'Pricing', to: '/pricing', icon: Mail, description: 'Plans & rates' },
      { label: 'Reviews', to: '/reviews', icon: Mail, description: 'Client feedback' },
    ],
  },
];

export function NotFoundPage() {
  return (
    <div className="pt-28 pb-20">
      {/* HERO */}
      <section className="section-pad pb-10">
        <div className="container-x text-center">
          <span className="eyebrow">Error 404</span>
          <h1 className="mt-5 font-display text-6xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
            <span className="gradient-text">404</span>
          </h1>
          <h2 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">
            This page could not be found
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            The link may be broken, or the page may have been moved. Let's get you
            back on track.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyber-500 to-electric-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Newspaper className="h-4 w-4" />
              Read the Blog
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Mail className="h-4 w-4" />
              Contact Us
            </Link>
          </div>

          <button
            onClick={() => window.history.back()}
            className="mt-6 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back to previous page
          </button>
        </div>
      </section>

      {/* CATEGORY NAVIGATION */}
      <section className="section-pad pt-4">
        <div className="container-x">
          <div className="mb-8 text-center">
            <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
              Explore our categories
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Jump straight to any section of the site.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {navGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl glass p-6 transition-colors hover:border-white/20"
              >
                <h4 className="font-display text-sm font-bold uppercase tracking-wider text-cyber-400">
                  {group.title}
                </h4>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          className="group flex items-start gap-3 rounded-lg p-2 -m-2 transition-colors hover:bg-white/5"
                        >
                          <span className="mt-0.5 grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg bg-white/5 text-slate-300 transition-colors group-hover:bg-cyber-500/20 group-hover:text-cyber-400">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="flex-1">
                            <span className="block text-sm font-medium text-white">
                              {item.label}
                            </span>
                            <span className="block text-xs text-slate-500">
                              {item.description}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotFoundPage;
