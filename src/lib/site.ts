import type { Metadata } from 'next';

export const SITE_NAME = 'Sduella';
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://sduella.org').replace(/\/$/, '');
export const SITE_DESCRIPTION = 'Find verified bursaries, scholarships, jobs, learnerships, internships and business funding, with clear requirements and links to official providers.';
export const LAST_REVIEWED = '2026-08-15';

export function absoluteUrl(path = '/') {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
  noIndex = false,
  locale = 'en_001',
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
  locale?: string;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title,
      description,
      url,
      locale,
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
