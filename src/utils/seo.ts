// src/utils/seo.ts

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export const defaultSEO: SEOProps = {
  title: 'BitSecureX Tech – We Build. We Automate. We Secure.',
  description: 'Web development, software engineering, AI automation, cloud solutions, and cybersecurity for global businesses.',
  keywords: 'web development, cybersecurity, AI automation, cloud solutions, software engineering, penetration testing, digital marketing',
  image: '/icon.png',
  url: 'https://bitsecurex.tech',
  type: 'website',
};

export function generateMetaTags(props: SEOProps): string {
  const tags = {
    'title': props.title,
    'description': props.description,
    'keywords': props.keywords,
    'og:title': props.title,
    'og:description': props.description,
    'og:type': props.type || 'website',
    'og:url': props.url || defaultSEO.url,
    'og:image': props.image || defaultSEO.image,
    'og:site_name': 'BitSecureX Tech',
    'twitter:card': 'summary_large_image',
    'twitter:title': props.title,
    'twitter:description': props.description,
    'twitter:image': props.image || defaultSEO.image,
    'twitter:site': '@BitSecureXTech',
  };

  // Add article-specific tags
  if (props.type === 'article') {
    tags['article:published_time'] = props.publishedTime || '';
    tags['article:modified_time'] = props.modifiedTime || '';
    tags['article:author'] = props.author || 'BitSecureX Tech';
  }

  return Object.entries(tags)
    .filter(([_, value]) => value)
    .map(([key, value]) => {
      if (key.startsWith('og:') || key.startsWith('twitter:') || key.startsWith('article:')) {
        return `<meta property="${key}" content="${value}" />`;
      }
      return `<meta name="${key}" content="${value}" />`;
    })
    .join('\n');
}