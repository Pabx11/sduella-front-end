import { Suspense } from 'react';
import { BusinessFundingView, FundingView, JobsView } from './RouteViews';
import SeoLanding from './SeoLanding';
import { SEO_PAGES } from '../data/seoPages';

export default function OpportunitySeoPage({ pageKey }: { pageKey: keyof typeof SEO_PAGES }) {
  const page = SEO_PAGES[pageKey];
  const feed = page.group === 'jobs'
    ? <JobsView embedded defaultType={(page.defaultType || 'all') as 'all' | 'job' | 'internship' | 'learnership' | 'apprenticeship'} defaultCountry={page.defaultCountry} defaultSearch={page.defaultSearch} />
    : page.group === 'business'
      ? <BusinessFundingView defaultType={page.defaultType} defaultSearch={page.defaultSearch} />
      : <FundingView defaultType={page.defaultType} defaultCountry={page.defaultCountry} defaultSearch={page.defaultSearch} />;

  return (
    <SeoLanding {...page}>
      <Suspense fallback={<div className="min-h-[420px] bg-off-white" aria-label="Loading opportunities" />}>
        {feed}
      </Suspense>
    </SeoLanding>
  );
}
