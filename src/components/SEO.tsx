// src/components/SEO.tsx

import { useEffect } from 'react';
import { SEOProps, defaultSEO, generateMetaTags } from '../utils/seo';

export function SEO(props: SEOProps) {
  const mergedProps = { ...defaultSEO, ...props };

  useEffect(() => {
    // Update document title
    document.title = mergedProps.title;

    // Update meta tags
    const metaTags = generateMetaTags(mergedProps);
    
    // Remove existing meta tags that we're about to replace
    const selectors = [
      'meta[name="description"]',
      'meta[name="keywords"]',
      'meta[property="og:title"]',
      'meta[property="og:description"]',
      'meta[property="og:type"]',
      'meta[property="og:url"]',
      'meta[property="og:image"]',
      'meta[property="og:site_name"]',
      'meta[name="twitter:card"]',
      'meta[name="twitter:title"]',
      'meta[name="twitter:description"]',
      'meta[name="twitter:image"]',
      'meta[name="twitter:site"]',
      'meta[property="article:published_time"]',
      'meta[property="article:modified_time"]',
      'meta[property="article:author"]',
    ];

    selectors.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) el.remove();
    });

    // Insert new meta tags
    const container = document.head;
    const parser = new DOMParser();
    const html = parser.parseFromString(metaTags, 'text/html');
    const headElements = html.head.children;

    Array.from(headElements).forEach((el) => {
      container.appendChild(el);
    });
  }, [mergedProps]);

  return null;
}