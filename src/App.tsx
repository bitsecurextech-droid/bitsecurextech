import { useEffect, useState } from 'react';
import { useParams, useNavigate } from '../lib/router';
import { supabase } from '../lib/supabase';
import { Clock, ArrowLeft } from 'lucide-react';

type Post = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
};

export function BlogPostPage() {
  const { slug } = useParams('/blog/:slug');
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setNotFound(false);

    (async () => {
      const { data, error } = await supabase
        .from('admin_blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'Published')
        .maybeSingle();

      if (cancelled) return;

      if (error || !data) {
        console.error('Blog post fetch error:', error);
        setNotFound(true);
      } else {
        setPost(data as Post);
      }
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Update document title + meta description for SEO
  useEffect(() => {
    if (post) {
      document.title = `${post.title} — BitSecureX Tech`;
      const meta = document.querySelector('meta[name="description"]');
      const desc = post.excerpt?.replace(/<[^>]*>/g, '').slice(0, 160) || '';
      if (meta) meta.setAttribute('content', desc);
    }
    return () => {
      document.title = 'BitSecureX Tech – We Build. We Automate. We Secure.';
    };
  }, [post]);

  if (loading) {
    return (
      <div className="pt-40 flex justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyber-500 border-t-transparent" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="font-display text-3xl font-bold text-white">Post not found</h1>
        <p className="mt-3 text-slate-400">
          The article you're looking for doesn't exist or hasn't been published.
        </p>
        <button
          onClick={() => navigate('/blog')}
          className="mt-6 inline-flex items-center gap-2 text-cyber-400 hover:text-cyber-300"
        >
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </button>
      </div>
    );
  }

  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : new Date(post.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

  const readTime = `${Math.max(
    1,
    Math.ceil((post.content || post.excerpt || '').length / 1000)
  )} min`;

  return (
    <article className="pt-28 pb-20">
      <div className="container-x max-w-3xl">
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </button>

        <span className="mt-6 block text-xs font-medium uppercase tracking-wider text-cyber-400">
          {post.category}
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
          <span>{date}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {readTime}
          </span>
        </div>

        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="mt-8 w-full rounded-2xl object-cover"
          />
        )}

        <div
          className="mt-8 prose prose-invert max-w-none text-slate-300"
          dangerouslySetInnerHTML={{ __html: post.content || post.excerpt || '' }}
        />

        <div className="mt-12 border-t border-white/10 pt-6">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-sm text-cyber-400 hover:text-cyber-300"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all articles
          </button>
        </div>
      </div>
    </article>
  );
}

export default BlogPostPage;
