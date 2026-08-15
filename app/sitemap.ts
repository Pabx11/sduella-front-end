import type { MetadataRoute } from 'next';
import { SEO_PAGES } from '../src/data/seoPages';
import { absoluteUrl, LAST_REVIEWED } from '../src/lib/site';

const supportingRoutes = ['/', '/business-funding', '/funding-guide', '/about', '/contact', '/transparency', '/impact', '/newsletter', '/privacy', '/donate'];

export default function sitemap(): MetadataRoute.Sitemap {
  const seoRoutes = Object.values(SEO_PAGES).map(page => page.path);
  return [...new Set([...supportingRoutes, ...seoRoutes])].map(path => ({
    url: absoluteUrl(path),
    lastModified: new Date(`${LAST_REVIEWED}T12:00:00Z`),
    changeFrequency: path === '/' || seoRoutes.includes(path) ? 'daily' as const : 'monthly' as const,
    priority: path === '/' ? 1 : seoRoutes.includes(path) ? 0.8 : 0.5,
  }));
}
