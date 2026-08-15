import type { Metadata, Viewport } from 'next';
import { Inter, Syne } from 'next/font/google';
import Script from 'next/script';
import App from '../src/App';
import { absoluteUrl, safeJsonLd, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '../src/lib/site';
import '../src/index.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const syne = Syne({ subsets: ['latin'], display: 'swap', variable: '--font-syne-next' });

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#ffffff' };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Sduella | Bursaries, Jobs & Funding Opportunities', template: '%s | Sduella' },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  category: 'education and employment',
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': absoluteUrl('/feed.xml'),
      'application/opensearchdescription+xml': absoluteUrl('/opensearch.xml'),
    },
  },
  icons: { icon: '/pictures/Sduella Modern Logo (1).svg' },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const entityGraph = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${absoluteUrl('/')}#organization`,
      name: SITE_NAME,
      url: absoluteUrl('/'),
      logo: absoluteUrl('/pictures/Sduella Modern Logo (1).svg'),
      description: SITE_DESCRIPTION,
      areaServed: 'Worldwide',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${absoluteUrl('/')}#website`,
      name: SITE_NAME,
      url: absoluteUrl('/'),
      description: SITE_DESCRIPTION,
      publisher: { '@id': `${absoluteUrl('/')}#organization` },
      inLanguage: 'en',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${absoluteUrl('/bursaries')}?query={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ];

  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(entityGraph) }} />
        <App>{children}</App>
        <Script
          id="adsense"
          async
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8240540609956576"
        />
      </body>
    </html>
  );
}
