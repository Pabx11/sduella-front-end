import type { MetadataRoute } from 'next';
import { absoluteUrl } from '../src/lib/site';

export default function robots(): MetadataRoute.Robots {
  const publicBots = [
    'Googlebot', 'Bingbot',
    'OAI-SearchBot', 'ChatGPT-User', 'GPTBot',
    'Claude-SearchBot', 'Claude-User', 'ClaudeBot',
    'PerplexityBot', 'Perplexity-User',
  ];

  return {
    rules: [
      { userAgent: publicBots, allow: '/', disallow: ['/dashboard', '/apply'] },
      { userAgent: '*', allow: '/', disallow: ['/dashboard', '/apply'] },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  };
}
