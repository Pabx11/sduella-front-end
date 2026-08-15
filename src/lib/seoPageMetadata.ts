import { SEO_PAGES } from '../data/seoPages';
import { pageMetadata } from './site';

export function metadataFor(pageKey: keyof typeof SEO_PAGES) {
  const page = SEO_PAGES[pageKey];
  return pageMetadata({ title: page.title, description: page.description, path: page.path, keywords: page.keywords });
}
