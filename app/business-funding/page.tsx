import { Suspense } from 'react';
import { BusinessFundingView } from '../../src/components/RouteViews';
import { absoluteUrl, pageMetadata, safeJsonLd } from '../../src/lib/site';
export const metadata = pageMetadata({ title: 'Business & Startup Funding Opportunities', description: 'Search current startup programmes, business grants and enterprise funding from trusted providers, then apply at the official source.', path: '/business-funding', keywords: ['business funding', 'startup funding', 'business grants', 'enterprise funding'] });
export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org', '@type': 'CollectionPage',
    name: 'Business & Startup Funding Opportunities', url: absoluteUrl('/business-funding'),
    description: 'Current startup programmes, business grants and enterprise funding from trusted providers.',
    isPartOf: { '@id': `${absoluteUrl('/')}#website` },
  };
  return <div className="pt-[62px]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(structuredData) }} />
    <section className="bg-black px-4 py-14 text-white sm:px-6 sm:py-20 md:px-12 lg:py-24 hidden">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 font-syne text-xs font-bold uppercase tracking-wider text-green">Business &amp; Startup Funding</p>
        <h1 className="mb-6 max-w-4xl text-4xl font-extrabold leading-[0.95] tracking-tighter sm:text-5xl md:text-6xl">Funding to start, build and grow.</h1>
        <p className="max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">Search current startup programmes, business grants and enterprise funding from trusted providers. Review the requirements, then apply through the official provider.</p>
      </div>
    </section>
    <Suspense fallback={<div className="min-h-[640px] bg-off-white" />}><BusinessFundingView showHero={false} /></Suspense>
  </div>;
}
