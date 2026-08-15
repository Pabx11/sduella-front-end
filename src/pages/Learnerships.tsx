"use client";

import { Fragment, useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, MapPin, RefreshCw, WifiOff, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { COUNTRY_GROUPS, formatRegion } from '../lib/geography';
import { cn } from '../lib/utils';
import { searchOpportunities } from '../lib/opportunitiesApi';
import AdSenseInFeed from '../components/AdSenseInFeed';
import AdSenseWideRails from '../components/AdSenseWideRails';
import OpportunityGridSkeleton from '../components/OpportunityGridSkeleton';
import type { Opportunity, OpportunitySearchResponse, OpportunityType } from '../types/opportunities';

type JobType = 'all' | 'job' | 'internship' | 'learnership' | 'apprenticeship';
type WorkArrangement = 'remote' | 'location';
type JobDuration = 'all' | 'permanent' | 'contract' | 'temporary';
type JobSort = 'relevance' | 'newest' | 'deadline' | 'pay';

const JOB_TYPES: Array<{ value: JobType; label: string }> = [
  { value: 'all', label: 'All jobs' },
  { value: 'job', label: 'Jobs' },
  { value: 'internship', label: 'Internships' },
  { value: 'learnership', label: 'Learnerships' },
  { value: 'apprenticeship', label: 'Apprenticeships' },
];

const JOB_TYPE_VALUES = new Set(JOB_TYPES.map(item => item.value));
const JOB_SORTS: Array<{ value: JobSort; label: string }> = [
  { value: 'relevance', label: 'Best match' },
  { value: 'newest', label: 'Newest' },
  { value: 'deadline', label: 'Closing soon' },
  { value: 'pay', label: 'Pay shown' },
];
const API_JOB_TYPES = new Set<OpportunityType>(['job', 'internship', 'learnership', 'apprenticeship']);
const HOW_IT_WORKS = [
  { step: '01', title: 'Find a placement', desc: 'Search current learnerships and confirm that you meet the provider requirements.' },
  { step: '02', title: 'Apply with the provider', desc: 'Use the official application link and submit the requested documents.' },
  { step: '03', title: 'Sign an agreement', desc: 'Successful applicants enter an agreement with an employer and training provider.' },
  { step: '04', title: 'Learn and work', desc: 'Complete structured learning and supervised workplace experience while receiving a stipend.' },
  { step: '05', title: 'Earn the qualification', desc: 'Complete the assessments to earn the registered occupational or NQF-aligned qualification.' },
];

const SOURCE_LABELS: Record<Opportunity['source'], string> = {
  remotive: 'Remotive', adzuna: 'Adzuna', jooble: 'Jooble', careerjet: 'Careerjet', usajobs: 'USAJOBS',
  grants_gov: 'Grants.gov', simpler_grants: 'Simpler.Grants.gov',
  eu_funding: 'EU Funding & Tenders', uct_funding: 'University of Cape Town',
  study_in_japan: 'Study in Japan',
  china_scholarships: 'China Scholarships',
  nigeria_funding: 'Nigeria Ministry of Education',
  kenya_funding: 'Kenya Ministry of Education',
  ghana_funding: 'Ghana Scholarships Authority',
  canada_funding: 'EduCanada',
  italy_funding: 'Official Italian institutions',
  za_business_funding: 'Official South African business funding',
  official_business_funding: 'Official national business funding',
  official_study_funding: 'Official national study funding',
};

const formatType = (type: OpportunityType) => type.replaceAll('_', ' ').replace(/\b\w/g, letter => letter.toUpperCase());
const formatDate = (value: string | null) => {
  if (!value) return 'See provider';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
};

const formatCompensation = (opportunity: Opportunity) => {
  const amount = opportunity.amount_or_salary?.trim();
  if (!amount) return 'Not disclosed';
  const currency = opportunity.currency?.trim().toUpperCase();
  if (!currency || amount.toUpperCase().includes(currency)) return amount;
  return `${amount} · ${currency}`;
};

export default function Learnerships({ defaultType = 'all', defaultCountry = '', defaultSearch = '', embedded = false }: { defaultType?: JobType; defaultCountry?: string; defaultSearch?: string; embedded?: boolean }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname() || '/jobs';
  const requestedType = searchParams?.get('type') || defaultType;
  const activeType: JobType = JOB_TYPE_VALUES.has(requestedType as JobType) ? requestedType as JobType : defaultType;
  const isLearnershipView = activeType === 'learnership';
  const initialSearch = searchParams?.get('query') || defaultSearch;
  const [search, setSearch] = useState(initialSearch);
  const [submittedSearch, setSubmittedSearch] = useState(initialSearch);
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState(searchParams?.get('country') || defaultCountry);
  const [workArrangements, setWorkArrangements] = useState<WorkArrangement[]>([]);
  const [duration, setDuration] = useState<JobDuration>('all');
  const [sortBy, setSortBy] = useState<JobSort>('relevance');
  const [result, setResult] = useState<OpportunitySearchResponse | null>(null);
  const [selected, setSelected] = useState<Opportunity | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadMoreError, setLoadMoreError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setSubmittedSearch(search.trim()), 350);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
    setLoadMoreError(null);
  }, [activeType, country, duration, location, submittedSearch, workArrangements]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setLoadMoreError(null);
    if (page === 1) setError(null);
    searchOpportunities({
      group: 'jobs',
      query: [activeType === 'all' ? '' : activeType, submittedSearch].filter(Boolean).join(' '),
      location,
      country,
      remote: workArrangements.length === 1 ? workArrangements[0] === 'remote' : undefined,
      duration: duration === 'all' ? undefined : duration,
      page,
      pageSize: 40,
      signal: controller.signal,
    })
      .then(nextResult => {
        setResult(currentResult => {
          if (page === 1 || !currentResult) return nextResult;
          const mergedItems = [...currentResult.items, ...nextResult.items].filter(
            (item, index, items) => items.findIndex(candidate => candidate.id === item.id) === index,
          );
          return {
            ...nextResult,
            items: mergedItems,
            returned: mergedItems.length,
            total_before_pagination: mergedItems.length,
            sources_queried: Array.from(new Set([
              ...currentResult.sources_queried,
              ...nextResult.sources_queried,
            ])),
            withheld_unverified: currentResult.withheld_unverified + nextResult.withheld_unverified,
            withheld_expired: currentResult.withheld_expired + nextResult.withheld_expired,
            withheld_unreachable: currentResult.withheld_unreachable + nextResult.withheld_unreachable,
          };
        });
      })
      .catch(fetchError => {
        if (fetchError instanceof DOMException && fetchError.name === 'AbortError') return;
        const message = (
          fetchError instanceof Error && fetchError.message.startsWith('The ')
            ? fetchError.message
            : 'Live opportunities are temporarily unavailable. Please try again.'
        );
        if (page === 1) {
          setResult(null);
          setError(message);
        } else {
          setLoadMoreError(message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
    });
    return () => controller.abort();
  }, [activeType, country, duration, location, page, retryKey, submittedSearch, workArrangements]);

  const opportunities = useMemo(() => {
    const items = result?.items.filter(item => API_JOB_TYPES.has(item.opportunity_type)) ?? [];
    const filtered = activeType === 'all' ? items : items.filter(item => item.opportunity_type === activeType);
    const sorted = [...filtered];
    if (sortBy === 'newest') {
      sorted.sort((a, b) => new Date(b.opening_date || 0).getTime() - new Date(a.opening_date || 0).getTime());
    } else if (sortBy === 'deadline') {
      sorted.sort((a, b) => new Date(a.closing_date || '9999-12-31').getTime() - new Date(b.closing_date || '9999-12-31').getTime());
    } else if (sortBy === 'pay') {
      sorted.sort((a, b) => Number(Boolean(b.amount_or_salary)) - Number(Boolean(a.amount_or_salary)));
    }
    return sorted;
  }, [activeType, result, sortBy]);

  const changeType = (type: JobType) => {
    setPage(1);
    const next = new URLSearchParams(searchParams?.toString() || '');
    if (type === 'all') next.delete('type');
    else next.set('type', type);
    router.push(next.size ? `${pathname}?${next.toString()}` : pathname);
  };

  const toggleWorkArrangement = (value: WorkArrangement) => {
    setWorkArrangements(current => current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value]);
    setPage(1);
  };

  return (
    <div className={embedded ? '' : 'pt-[62px]'}>
      {/* Hero */}
      {!embedded && <section className="bg-black text-white py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-green block mb-4">{isLearnershipView ? 'Bridge to Work' : 'Live Opportunities'}</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-[0.9]">
            {isLearnershipView ? 'Learnerships' : 'Jobs and early careers'}<br /><span className="text-green">{isLearnershipView ? 'that pay.' : 'from live sources.'}</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
            {isLearnershipView
              ? 'Find current learnerships with workplace experience, structured training and a stipend. Every result links to the original provider.'
              : 'Search current jobs, internships, learnerships and apprenticeships gathered from connected providers through the Sduella API.'}
          </p>
        </div>
      </section>}

      {isLearnershipView && <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-12 bg-off-white border-b border-grey-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">The Process</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">How a Learnership Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {HOW_IT_WORKS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white p-6 rounded-sm border border-grey-100 relative">
                <div className="text-3xl font-extrabold text-blue/20 font-syne mb-3">{s.step}</div>
                <div className="font-bold text-sm mb-2">{s.title}</div>
                <p className="text-xs text-grey-600 leading-relaxed">{s.desc}</p>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-grey-300" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-green/5 border border-green/20 rounded-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Check size={20} className="text-green flex-shrink-0 mt-0.5" />
            <p className="text-sm text-grey-700 leading-relaxed">
              <strong>Learnership vs Internship:</strong> A learnership is SETA-registered and results in a nationally recognised NQF qualification. An internship is a company-specific work placement with no formal qualification. Learnerships have stronger legal protections and a clearer qualification outcome.
            </p>
          </div>
        </div>
      </section>}

      {/* Listings */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-12">
        <div className="max-w-5xl min-[1650px]:max-w-7xl mx-auto relative" aria-busy={loading}>
          <AdSenseWideRails />
          <div className="mb-8 sm:mb-12">
            {/* <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">Live from the API</span> */}
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">{isLearnershipView ? 'Open Learnerships' : 'Open Opportunities'}</h2>
            <p className="text-grey-600">
              {loading && !result
                ? 'Checking connected providers…'
                : `${opportunities.length} job${opportunities.length === 1 ? '' : 's'} currently loaded from ${result?.sources_queried.length ?? 0} connected source${result?.sources_queried.length === 1 ? '' : 's'}. This is not the total number of jobs available in the country.`}
            </p>
          </div>

          {/* Filters */}
          <div className="space-y-4 mb-10">
            <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap">
              {JOB_TYPES.map(type => (
                <button key={type.value} type="button" onClick={() => changeType(type.value)} className={cn('shrink-0 px-4 py-2.5 rounded-sm border text-xs font-bold transition-colors', activeType === type.value ? 'bg-black border-black text-white' : 'bg-white border-grey-200 text-grey-600 hover:border-blue hover:text-blue')}>
                  {type.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 items-end">
              <div>
                <label htmlFor="profession-search" className="block text-xs font-bold tracking-wider uppercase text-grey-500 mb-2">Profession, skill or employer</label>
                <input id="profession-search" type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Type any profession, skill or employer…" autoComplete="off" className="w-full px-5 py-4 border border-grey-200 rounded-sm focus:outline-none focus:border-blue text-sm bg-white" />
              </div>
              <div>
                <label htmlFor="job-location" className="block text-xs font-bold tracking-wider uppercase text-grey-500 mb-2">City or province</label>
                <input id="job-location" type="search" value={location} onChange={event => { setLocation(event.target.value); setPage(1); }} placeholder="e.g. Cape Town…" className="w-full px-5 py-4 border border-grey-200 rounded-sm focus:outline-none focus:border-blue text-sm bg-white" />
              </div>
              <div>
                <label htmlFor="job-country" className="block text-xs font-bold tracking-wider uppercase text-grey-500 mb-2">Country</label>
                <select id="job-country" value={country} onChange={event => { setCountry(event.target.value); setPage(1); }} className="w-full px-4 py-4 border border-grey-200 rounded-sm bg-white text-sm font-semibold focus:outline-none focus:border-blue transition-colors appearance-none cursor-pointer">
                  <option value="">All countries / worldwide</option>
                  {COUNTRY_GROUPS.map(group => (
                    <optgroup key={group.region} label={group.region}>
                      {group.countries.map(option => <option key={option.code} value={option.code}>{option.name}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="job-duration" className="block text-xs font-bold tracking-wider uppercase text-grey-500 mb-2">Duration / contract</label>
                <select id="job-duration" value={duration} onChange={event => { setDuration(event.target.value as JobDuration); setPage(1); }} className="w-full px-4 py-4 border border-grey-200 rounded-sm bg-white text-sm font-semibold focus:outline-none focus:border-blue appearance-none cursor-pointer">
                  <option value="all">All durations</option>
                  <option value="permanent">Permanent</option>
                  <option value="contract">Contract / fixed-term</option>
                  <option value="temporary">Temporary / seasonal</option>
                </select>
              </div>
              <div>
                <div className="block text-xs font-bold tracking-wider uppercase text-grey-500 mb-2">Work arrangement <span className="normal-case tracking-normal font-medium">(optional)</span></div>
                <div className="grid grid-cols-2 gap-2" role="group" aria-label="Work arrangement; choose either, both or neither">
                  {([
                    { value: 'remote', label: 'Remote' },
                    { value: 'location', label: 'On-site / hybrid' },
                  ] as const).map(option => {
                    const selected = workArrangements.includes(option.value);
                    return <button key={option.value} type="button" aria-pressed={selected} onClick={() => toggleWorkArrangement(option.value)} className={cn('min-h-12 px-3 py-3 border rounded-sm text-xs font-bold transition-colors', selected ? 'bg-blue border-blue text-white' : 'bg-white border-grey-200 text-grey-600 hover:border-blue hover:text-blue')}>{option.label}</button>;
                  })}
                </div>
              </div>
            </div>
            {(search || location || country || duration !== 'all' || workArrangements.length > 0 || activeType !== 'all') && (
              <button type="button" onClick={() => { setSearch(''); setLocation(''); setCountry(''); setDuration('all'); setWorkArrangements([]); changeType('all'); }} className="text-xs font-bold text-blue hover:underline self-start">Clear all job filters</button>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 pt-2 border-t border-grey-100">
              <span className="shrink-0 text-xs font-bold tracking-wider uppercase text-grey-500">Sort by</span>
              <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Sort loaded job results">
                {JOB_SORTS.map(option => (
                  <button key={option.value} type="button" aria-pressed={sortBy === option.value} onClick={() => setSortBy(option.value)} className={cn('shrink-0 px-3.5 py-2.5 border rounded-sm text-xs font-bold transition-colors', sortBy === option.value ? 'bg-black border-black text-white' : 'bg-white border-grey-200 text-grey-600 hover:border-blue hover:text-blue')}>{option.label}</button>
                ))}
              </div>
            </div>
          </div>

          {(result?.errors.length ?? 0) > 0 && !error && (
            <div className="mb-8 border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 rounded-sm">
              Some providers did not respond, so these results may be incomplete: {result?.errors.map(item => SOURCE_LABELS[item.source]).join(', ')}.
            </div>
          )}

          {(result?.withheld_unverified ?? 0) > 0 && !error && (
            <div className="mb-8 border border-grey-200 bg-grey-50 p-4 text-sm text-grey-600 rounded-sm">
              {result?.withheld_unverified} listing{result?.withheld_unverified === 1 ? ' was' : 's were'} excluded because no safe official application or instruction page could be verified.
            </div>
          )}
          {(result?.withheld_unreachable ?? 0) > 0 && !error && (
            <div className="mb-6 border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              {result?.withheld_unreachable} official source page{result?.withheld_unreachable === 1 ? ' was' : 's were'} temporarily unreachable and excluded. Refresh to retry.
            </div>
          )}

          {loading && result && !error && (
            <div className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue" role="status" aria-live="polite">
              <RefreshCw size={14} className="motion-safe:animate-spin" /> Updating results…
            </div>
          )}

          {error ? (
            <div className="text-center py-20 border border-dashed border-red/30 bg-red/5 rounded-sm">
              <WifiOff className="mx-auto mb-4 text-red" size={28} />
              <p className="font-bold mb-2">Unable to load live opportunities</p>
              <p className="text-sm text-grey-600 max-w-xl mx-auto mb-6">{error}</p>
              <button type="button" onClick={() => setRetryKey(value => value + 1)} className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white rounded-sm text-xs font-bold uppercase tracking-wider"><RefreshCw size={14} /> Retry</button>
            </div>
          ) : loading && !result ? (
            <OpportunityGridSkeleton kind="jobs" />
          ) : opportunities.length > 0 ? (
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {opportunities.map((opportunity, i) => (
                <Fragment key={opportunity.id}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                  onClick={() => setSelected(opportunity)}
                  className="bg-white border border-grey-200 hover:border-green rounded-sm p-5 sm:p-7 flex flex-col cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded-sm inline-block mb-2 bg-green/10 text-green">● Current</span>
                      <div className="font-syne text-xs font-bold tracking-wider uppercase text-blue leading-relaxed [overflow-wrap:anywhere]">{opportunity.organisation}</div>
                    </div>
                    <span className="self-start shrink-0 text-[11px] font-bold uppercase tracking-wider text-grey-500 bg-grey-50 px-2.5 py-1.5 rounded-sm">{formatType(opportunity.opportunity_type)}</span>
                  </div>

                  <h3 className="font-extrabold text-lg mb-2 leading-snug break-words">{opportunity.title}</h3>
                  <p className="text-sm text-grey-600 leading-relaxed flex-1 mb-5 line-clamp-4">{opportunity.description || 'Open the provider listing for the full description.'}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-grey-50">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-grey-500 mb-1">Salary / stipend</div>
                      <div className="text-sm font-bold text-green [overflow-wrap:anywhere]">{formatCompensation(opportunity)}</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-grey-500 mb-1">Deadline</div>
                      <div className="text-sm font-bold">{formatDate(opportunity.closing_date)}</div>
                    </div>
                    <div className="sm:col-span-2 flex items-start gap-1.5 text-sm font-semibold text-grey-600 min-w-0"><MapPin size={15} className="text-blue shrink-0 mt-0.5" /><span className="[overflow-wrap:anywhere]">{opportunity.remote ? `Remote · ${opportunity.country_name || 'Worldwide'}` : opportunity.location || opportunity.country_name || opportunity.country || 'See provider'}</span></div>
                  </div>
                  <div className="mt-4 text-[11px] leading-relaxed uppercase tracking-wider font-bold text-grey-500">{formatRegion(opportunity.region)} · {opportunity.country_name || 'Worldwide'} · {SOURCE_LABELS[opportunity.source]}</div>
                </motion.div>
                {i === 1 && <AdSenseInFeed variant="card" />}
                {i === 5 && (
                  <AdSenseInFeed
                    className="md:col-span-2 xl:col-span-3"
                    layoutKey="-gu-c+w-3l+7t"
                    slot="6196123662"
                    variant="text"
                  />
                )}
                {i === 11 && <AdSenseInFeed variant="card" />}
                </Fragment>
              ))}
            </div>
            <div className="mt-10 flex flex-col items-center gap-3">
              {result?.has_more && page < 100 && (
                <button
                  type="button"
                  onClick={() => setPage(currentPage => currentPage + 1)}
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-black text-white rounded-sm font-syne text-xs font-bold uppercase tracking-wider disabled:opacity-60 disabled:cursor-wait"
                >
                  {loading ? <><RefreshCw size={14} className="motion-safe:animate-spin" /> Loading more…</> : <>Load more jobs <ArrowRight size={14} /></>}
                </button>
              )}
              {loadMoreError && (
                <div className="text-center" role="alert">
                  <p className="text-sm text-red mb-2">{loadMoreError}</p>
                  <button type="button" onClick={() => setRetryKey(value => value + 1)} className="text-xs font-bold text-blue hover:underline">Try loading this page again</button>
                </div>
              )}
              <p className="text-xs text-grey-500 text-center">Listings are loaded in provider batches. Use country, location and keyword filters for more relevant results.</p>
            </div>
            </>
          ) : (
            <div className="text-center py-20 border border-dashed border-grey-300 rounded-sm">
              <p className="text-grey-500 font-syne italic">No live opportunities matched these filters.</p>
              <button type="button" onClick={() => { setSearch(''); setLocation(''); setCountry(''); setDuration('all'); setWorkArrangements([]); changeType('all'); }} className="text-[11px] font-bold text-blue hover:underline mt-4">Clear filters</button>
            </div>
          )}
        </div>
      </section>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white w-full max-w-2xl rounded-t-sm sm:rounded-sm shadow-2xl overflow-y-auto max-h-[92dvh] sm:max-h-[90vh]">
            <button onClick={() => setSelected(null)} className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 bg-white/90 hover:bg-grey-100 rounded-sm transition-colors z-10">
              <X size={18} />
            </button>
            <div className="p-5 pt-14 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-sm bg-green/10 text-green">● Current</span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-blue">{SOURCE_LABELS[selected.source]}</span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-grey-400">{formatType(selected.opportunity_type)}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-1 [overflow-wrap:anywhere]">{selected.title}</h2>
              <div className="font-syne font-bold text-grey-500 mb-6">{selected.organisation}</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8 pb-8 border-b border-grey-100">
                {[
                  { label: 'Salary / stipend', value: formatCompensation(selected), highlight: true },
                  { label: 'Location', value: selected.remote ? `Remote · ${selected.country_name || 'Worldwide'}` : selected.location || selected.country_name || selected.country || 'See provider' },
                  { label: 'Deadline', value: formatDate(selected.closing_date) },
                ].map(({ label, value, highlight }) => (
                  <div key={label}>
                    <div className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-1">{label}</div>
                    <div className={cn("font-bold text-sm", highlight && "text-green")}>{value}</div>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <div className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-3">About this Opportunity</div>
                <p className="text-grey-600 leading-relaxed text-sm">{selected.description || 'Open the provider listing for the full description.'}</p>
              </div>

              {selected.requirements.length > 0 && <div className="mb-8">
                <div className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-3">Eligibility Requirements</div>
                <ul className="space-y-2">
                  {selected.requirements.map((requirement) => (
                    <li key={requirement} className="flex items-center gap-3 text-sm text-grey-700">
                      <Check size={14} className="text-green flex-shrink-0" />
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>}

              <div className="flex flex-col sm:flex-row gap-3">
                <a href={selected.application_url} target="_blank" rel="noopener noreferrer"
                  className="flex-1 py-4 bg-black text-white font-syne font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-black/90 transition-all flex items-center justify-center gap-3">
                  View Official Listing <ArrowRight size={16} />
                </a>
                <button onClick={() => setSelected(null)}
                  className="px-8 py-4 border border-grey-200 text-grey-600 font-syne font-bold text-sm rounded-sm hover:bg-grey-50 transition-all">
                  Close
                </button>
              </div>
              <p className="text-[10px] text-grey-400 text-center mt-4">Applications are completed on the provider's official website.</p>
            </div>
          </motion.div>
        </div>
      )}

      {isLearnershipView && <>
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-12 bg-off-white border-t border-grey-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">SETA Directory</span>
            <h2 className="text-3xl font-extrabold tracking-tight mb-2">All 21 SETAs in South Africa</h2>
            <p className="text-grey-600 text-sm">Each SETA funds learnerships in its sector. Visit their websites to find additional opportunities not listed above.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: 'AgriSETA', sector: 'Agriculture', url: 'https://www.agriseta.co.za' },
              { name: 'BANKSETA', sector: 'Banking & Credit', url: 'https://www.bankseta.org.za' },
              { name: 'CATHSSETA', sector: 'Tourism, Arts, Hospitality & Sport', url: 'https://www.cathsseta.org.za' },
              { name: 'CETA', sector: 'Construction & Plumbing', url: 'https://www.ceta.org.za' },
              { name: 'CHIETA', sector: 'Chemical Industries', url: 'https://www.chieta.org.za' },
              { name: 'ETDP SETA', sector: 'Education & Training', url: 'https://www.etdpseta.org.za' },
              { name: 'EWSETA', sector: 'Energy & Water', url: 'https://www.ewseta.org.za' },
              { name: 'FASSET', sector: 'Finance & Auditing', url: 'https://www.fasset.org.za' },
              { name: 'FoodBev SETA', sector: 'Food & Beverage Manufacturing', url: 'https://www.foodbev.co.za' },
              { name: 'FP&M SETA', sector: 'Clothing, Textiles & Printing', url: 'https://www.fpmseta.org.za' },
              { name: 'HWSETA', sector: 'Health & Social Work', url: 'https://www.hwseta.org.za' },
              { name: 'INSETA', sector: 'Insurance', url: 'https://www.inseta.org.za' },
              { name: 'LGSETA', sector: 'Local Government', url: 'https://www.lgseta.org.za' },
              { name: 'merSETA', sector: 'Engineering & Manufacturing', url: 'https://www.merseta.org.za' },
              { name: 'MICT SETA', sector: 'IT, Media & Communications', url: 'https://www.mict.org.za' },
              { name: 'MQA', sector: 'Mining & Minerals', url: 'https://www.mqa.org.za' },
              { name: 'PSETA', sector: 'Public Service', url: 'https://www.pseta.org.za' },
              { name: 'SASSETA', sector: 'Safety & Security', url: 'https://www.sasseta.org.za' },
              { name: 'Services SETA', sector: 'Marketing, HR & Cleaning', url: 'https://www.serviceseta.org.za' },
              { name: 'TETA', sector: 'Transport & Logistics', url: 'https://www.teta.org.za' },
              { name: 'W&RSETA', sector: 'Retail & Wholesale', url: 'https://www.wrseta.org.za' },
            ].map((seta, i) => (
              <a key={i} href={seta.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between bg-white p-5 rounded-sm border border-grey-100 hover:border-blue hover:shadow-md transition-all group">
                <div>
                  <div className="font-bold text-sm group-hover:text-blue transition-colors">{seta.name}</div>
                  <div className="text-xs text-grey-500 mt-0.5">{seta.sector}</div>
                </div>
                <ArrowRight size={14} className="text-grey-300 group-hover:text-blue transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-12 bg-black text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4">Ready to bridge the gap?</h2>
          <p className="text-white/60 mb-8 leading-relaxed">A learnership is the fastest route from study to work in South Africa. Find your fit, apply early, and earn while you learn.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/funding-guide#learnership" className="px-8 py-4 border border-white/20 text-white font-syne font-bold text-sm rounded-sm hover:bg-white/5 transition-all">
              How Learnerships Work
            </a>
            <a href="/bursaries" className="px-8 py-4 bg-white text-black font-syne font-bold text-sm rounded-sm hover:bg-off-white transition-all">
              Browse All Funding Types
            </a>
          </div>
        </div>
      </section>
      </>}
    </div>
  );
}
