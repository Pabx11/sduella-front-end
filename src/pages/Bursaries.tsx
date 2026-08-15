"use client";

import { Fragment, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, ShieldCheck, Target, FileText, ArrowRight, Check, X, Plus, RefreshCw, ServerOff } from 'lucide-react';
import PartnerModal from '../components/PartnerModal';
import AdSenseInFeed from '../components/AdSenseInFeed';
import AdSenseWideRails from '../components/AdSenseWideRails';
import OpportunityGridSkeleton from '../components/OpportunityGridSkeleton';
import { COUNTRY_GROUPS, formatRegion } from '../lib/geography';
import { searchOpportunities } from '../lib/opportunitiesApi';
import type { User } from '../types';
import type { Opportunity, OpportunitySource, OpportunitySourceError, OpportunityType } from '../types/opportunities';
import { cn } from '../lib/utils';

type FundingMode = 'study' | 'business';
type FundingType = OpportunityType | 'internal';
const BUSINESS_FUNDING_SOURCES: OpportunitySource[] = [
  'za_business_funding',
  'official_business_funding',
  'grants_gov',
  'simpler_grants',
  'eu_funding',
];
const STUDY_FUNDING_SOURCES: OpportunitySource[] = [
  'official_study_funding', 'uct_funding', 'study_in_japan',
  'china_scholarships', 'nigeria_funding', 'kenya_funding',
  'ghana_funding', 'canada_funding', 'italy_funding',
];

interface FundingCard {
  id: string;
  title: string;
  provider: string;
  type: FundingType;
  coverage: string;
  deadline: string;
  fields: string[];
  description: string;
  benefits?: string[];
  requiredDocuments?: string[];
  responsibilities?: string[];
  verificationStatus?: Opportunity['verification_status'];
  url: string;
  source?: string;
  country: string;
  region: string;
  isInternal?: boolean;
  criteria?: string[];
  details?: string;
  closingDate?: string | null;
  dateFetched?: string;
}

const TYPE_LABELS: Record<string, string> = {
  bursary: 'Bursary', scholarship: 'Scholarship', student_funding: 'Student Funding',
  business_funding: 'Business Funding', grant: 'Grant', internal: 'Internal Fund',
};

const TYPE_COLORS: Record<string, string> = {
  bursary: 'bg-blue/10 text-blue', scholarship: 'bg-green/10 text-green',
  student_funding: 'bg-blue/10 text-blue', business_funding: 'bg-green/10 text-green',
  grant: 'bg-orange-100 text-orange-700', internal: 'bg-blue/10 text-blue',
};

const SOURCE_LABELS: Record<string, string> = {
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

const formatDate = (value: string | null) => {
  if (!value) return 'See official listing';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? 'See official listing'
    : new Intl.DateTimeFormat('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
};

const toFundingCard = (item: Opportunity): FundingCard => ({
  id: item.id,
  title: item.title,
  provider: item.organisation,
  type: item.opportunity_type,
  coverage: item.amount_or_salary || item.benefits.slice(0, 2).join(' · ') || 'See official listing',
  deadline: formatDate(item.closing_date),
  fields: item.requirements.length > 0 ? item.requirements.slice(0, 3) : [item.location || SOURCE_LABELS[item.source] || item.source],
  description: item.description || 'Open the official listing for the complete funding details.',
  benefits: item.benefits,
  requiredDocuments: item.required_documents,
  responsibilities: item.responsibilities,
  verificationStatus: item.verification_status,
  url: item.application_url,
  source: SOURCE_LABELS[item.source] || item.source,
  country: item.country_name || item.country || 'Global',
  region: formatRegion(item.region),
  closingDate: item.closing_date,
  dateFetched: item.date_fetched,
});

export default function Bursaries({
  user,
  onOpenAuth,
  mode = 'study',
  embedded = false,
  defaultType = 'all',
  defaultCountry = '',
  defaultSearch = '',
}: {
  user: User | null;
  onOpenAuth: (redirectTo?: string) => void;
  mode?: FundingMode;
  embedded?: boolean;
  defaultType?: OpportunityType | 'all';
  defaultCountry?: string;
  defaultSearch?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const allowedTypes: OpportunityType[] = mode === 'business'
    ? ['business_funding', 'grant']
    : ['bursary', 'scholarship', 'student_funding', 'grant'];
  const requestedType = (searchParams?.get('type') || '').toLowerCase().replaceAll(' ', '_');
  const initialType = allowedTypes.includes(requestedType as OpportunityType)
    ? requestedType as OpportunityType
    : allowedTypes.includes(defaultType as OpportunityType) ? defaultType : 'all';

  const handleApply = () => {
    if (user) router.push('/dashboard');
    else onOpenAuth('/dashboard');
  };
  const [activeType, setActiveType] = useState<OpportunityType | 'all'>(initialType);
  const initialSearch = searchParams?.get('query') || defaultSearch;
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [country, setCountry] = useState(searchParams?.get('country') || defaultCountry);
  const [submittedSearch, setSubmittedSearch] = useState(initialSearch);
  const [funding, setFunding] = useState<FundingCard[]>([]);
  const [selectedBursary, setSelectedBursary] = useState<FundingCard | null>(null);
  const [sourceErrors, setSourceErrors] = useState<OpportunitySourceError[]>([]);
  const [withheldUnverified, setWithheldUnverified] = useState(0);
  const [withheldUnreachable, setWithheldUnreachable] = useState(0);
  const [cachedResults, setCachedResults] = useState(0);
  const [dataAsOf, setDataAsOf] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadMoreError, setLoadMoreError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);
  const [sortBy, setSortBy] = useState<'closing' | 'newest' | 'title' | 'provider'>('closing');
  const [deadlineWindow, setDeadlineWindow] = useState<'all' | '30' | '60' | 'open'>('all');
  const [providerFilter, setProviderFilter] = useState('');

  const categories: FundingCard[] = [
    {
      id: 'graduation-clearance',
      title: "Graduation Clearance",
      description: "Settling outstanding fees for final-year students to ensure they can graduate and receive their certificates.",
      type: 'internal',
      coverage: 'Verified outstanding balance',
      deadline: 'Reviewed in cycles',
      fields: ["Final year of study", "Academic average > 60%", "Verified financial need"],
      criteria: ["Final year of study", "Academic average > 60%", "Verified financial need"],
      details: "This fund is specifically for students who have completed their academic requirements but are blocked from graduating due to outstanding tuition fees. We work directly with university finance departments to clear these balances.",
      provider: "Sduella Foundation",
      country: 'South Africa',
      region: 'Africa',
      url: '/apply',
      isInternal: true,
    },
    {
      id: 'mid-year-support',
      title: "Mid-Year Tuition Support",
      description: "Bridge funding for students facing mid-year shortfalls that threaten their continued enrollment.",
      type: 'internal',
      coverage: 'Verified tuition shortfall',
      deadline: 'Reviewed in cycles',
      fields: ["Currently enrolled", "No other full bursary", "Good academic standing"],
      criteria: ["Currently enrolled", "No other full bursary", "Good academic standing"],
      details: "Designed for students who experience sudden financial changes mid-semester. This support ensures you don't have to deregister due to a temporary lack of funds.",
      provider: "Sduella Foundation",
      country: 'South Africa',
      region: 'Africa',
      url: '/apply',
      isInternal: true,
    },
    {
      id: 'postgraduate-research',
      title: "Post-Graduate Research",
      description: "Support for Honours and Masters students whose research projects are stalled due to lack of funding.",
      type: 'internal',
      coverage: 'Approved research costs',
      deadline: 'Reviewed in cycles',
      fields: ["Research proposal approved", "Full-time student", "South African citizen"],
      criteria: ["Research proposal approved", "Full-time student", "South African citizen"],
      details: "We provide small grants to cover research-related costs such as data collection, laboratory fees, or specialized software required for post-graduate completion.",
      provider: "Sduella Foundation",
      country: 'South Africa',
      region: 'Africa',
      url: '/apply',
      isInternal: true,
    }
  ];

  const categoryIcons = [GraduationCap, ShieldCheck, Target];

  useEffect(() => {
    const timer = window.setTimeout(() => setSubmittedSearch(searchQuery.trim()), 400);
    return () => window.clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setPage(1);
    setLoadMoreError(null);
  }, [country, mode, submittedSearch]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setLoadMoreError(null);
    if (page === 1) {
      setError(null);
      setSourceErrors([]);
      setWithheldUnverified(0);
      setWithheldUnreachable(0);
      setCachedResults(0);
      setDataAsOf(null);
    }
    searchOpportunities({
      group: 'funding',
      query: submittedSearch || (mode === 'business' ? 'business' : undefined),
      country,
      types: allowedTypes,
      sources: mode === 'business' ? BUSINESS_FUNDING_SOURCES : STUDY_FUNDING_SOURCES,
      page,
      pageSize: 40,
      signal: controller.signal,
    })
      .then(response => {
        const nextCards = response.items.filter(item => allowedTypes.includes(item.opportunity_type)).map(toFundingCard);
        setFunding(current => {
          if (page === 1) return nextCards;
          return [...current, ...nextCards].filter(
            (item, index, items) => items.findIndex(candidate => candidate.id === item.id) === index,
          );
        });
        setHasMore(response.has_more);
        setSourceErrors(current => page === 1
          ? response.errors
          : [...current, ...response.errors].filter(
              (item, index, items) => items.findIndex(candidate => candidate.source === item.source) === index,
            ));
        setWithheldUnverified(current => page === 1 ? response.withheld_unverified : current + response.withheld_unverified);
        setWithheldUnreachable(current => page === 1 ? response.withheld_unreachable : current + response.withheld_unreachable);
        setCachedResults(current => page === 1 ? response.cached_results : current + response.cached_results);
        setDataAsOf(response.data_as_of || null);
      })
      .catch(fetchError => {
        if (fetchError instanceof DOMException && fetchError.name === 'AbortError') return;
        const message = (
          fetchError instanceof Error && fetchError.message.startsWith('The ')
            ? fetchError.message
            : 'Live funding is temporarily unavailable. Please try again.'
        );
        if (page === 1) {
          setFunding([]);
          setSourceErrors([]);
          setWithheldUnverified(0);
          setWithheldUnreachable(0);
          setHasMore(false);
          setError(message);
        } else {
          setLoadMoreError(message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [country, mode, page, retryKey, submittedSearch]);

  const providers = useMemo(() => [...new Set(funding.map(item => item.provider))].sort(), [funding]);
  const filteredBursaries = useMemo(() => {
    const now = Date.now();
    const maximum = deadlineWindow === '30' ? 30 : deadlineWindow === '60' ? 60 : null;
    const items = funding.filter(item => {
      if (activeType !== 'all' && item.type !== activeType) return false;
      if (providerFilter && item.provider !== providerFilter) return false;
      if (deadlineWindow === 'open' && item.closingDate) return false;
      if (maximum !== null) {
        if (!item.closingDate) return false;
        const days = (new Date(item.closingDate).getTime() - now) / 86_400_000;
        if (days < 0 || days > maximum) return false;
      }
      return true;
    });
    return items.sort((left, right) => {
      if (sortBy === 'title') return left.title.localeCompare(right.title);
      if (sortBy === 'provider') return left.provider.localeCompare(right.provider);
      if (sortBy === 'newest') return new Date(right.dateFetched || 0).getTime() - new Date(left.dateFetched || 0).getTime();
      const leftDate = left.closingDate ? new Date(left.closingDate).getTime() : Number.MAX_SAFE_INTEGER;
      const rightDate = right.closingDate ? new Date(right.closingDate).getTime() : Number.MAX_SAFE_INTEGER;
      return leftDate - rightDate;
    });
  }, [activeType, deadlineWindow, funding, providerFilter, sortBy]);

  return (
    <div className={embedded ? '' : 'pt-[62px]'}>
      {/* Hero */}
      {/* <section className="bg-off-white py-24 px-6 md:px-12 border-b border-grey-200">
        <div className="max-w-7xl mx-auto">
          <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">{mode === 'business' ? 'Business Funding' : 'Funding Opportunities'}</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 max-w-3xl leading-[0.9]">
            {mode === 'business' ? 'Funding for ' : 'Bursaries for '}<span className="text-blue">{mode === 'business' ? 'Growing Businesses.' : 'Every Student.'}</span>
          </h1>
          <p className="text-xl text-grey-600 leading-relaxed max-w-2xl">
            {mode === 'business'
              ? 'Search current grants and enterprise funding from connected official sources.'
              : 'Sduella provides targeted financial support and connects students with live funding from official providers.'}
          </p>
        </div>
      </section> */}

      {/* Sduella Managed Funds */}
      {/* {mode === 'study' && <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight mb-2">Sduella Managed Funds</h2>
            <p className="text-grey-600">Direct support from our community-driven pool.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, i) => {
              const Icon = categoryIcons[i];
              return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i}
                onClick={() => setSelectedBursary(cat)}
                className="bg-white p-10 rounded-sm border border-grey-100 flex flex-col h-full cursor-pointer hover:border-blue hover:shadow-xl transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus size={16} className="text-blue" />
                </div>
                <div className="w-12 h-12 bg-off-white rounded-sm flex items-center justify-center mb-6 group-hover:bg-blue/5 transition-colors">
                  <Icon className="text-blue" />
                </div>
                <h3 className="text-2xl font-extrabold mb-4">{cat.title}</h3>
                <p className="text-sm text-grey-600 leading-relaxed mb-8 flex-1">{cat.description}</p>
                <div className="space-y-3 mb-8">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-grey-400">Key Criteria</div>
                  {cat.criteria?.map((item, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <Check size={12} className="text-blue" />
                      <span className="text-xs text-grey-500">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-6 border-t border-grey-50 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue">Internal Fund</span>
                  <div className="flex items-center gap-2 text-xs font-bold font-syne group-hover:text-blue transition-colors">
                    View Details <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            );})}
          </div>
        </div>
      </section>} */}

      {/* External Providers */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 md:px-12 bg-off-white border-y border-grey-200">
        <div className="max-w-5xl min-[1650px]:max-w-7xl mx-auto relative" aria-busy={loading}>
          <AdSenseWideRails />
          <div className="mb-10 sm:mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">{mode === 'business' ? 'Live Business Funding' : 'Live Study Funding'}</h2>
            <p className="text-sm sm:text-base text-grey-600 max-w-2xl mx-auto mb-8 sm:mb-12">Every opportunity links back to its official provider.</p>

            <div className="flex flex-col gap-4 max-w-4xl mx-auto">
              <input
                type="text"
                placeholder="Search by provider, title or field..."
                className="w-full px-5 py-4 bg-white border border-grey-200 rounded-sm focus:outline-none focus:border-blue transition-colors text-sm"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />

              <div>
                <label className="block text-xs font-bold tracking-wider uppercase text-grey-500 mb-2 text-left">Country</label>
                <select value={country} onChange={event => setCountry(event.target.value)} className="w-full px-4 py-3 border border-grey-200 rounded-sm bg-white text-sm font-semibold focus:outline-none focus:border-blue transition-colors appearance-none cursor-pointer">
                  <option value="">All available countries</option>
                  {COUNTRY_GROUPS.map(group => (
                    <optgroup key={group.region} label={group.region}>
                      {group.countries.map(option => <option key={option.code} value={option.code}>{option.name}</option>)}
                    </optgroup>
                  ))}
                </select>
                <p className="mt-2 text-left text-xs text-grey-500">Sources are queried only when they cover the selected country.</p>
              </div>

              <div>
                <div className="text-xs font-bold tracking-wider uppercase text-grey-500 mb-2 text-left">Type</div>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {(['all', ...allowedTypes] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => setActiveType(type)}
                      className={cn(
                        "flex-shrink-0 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm border transition-all",
                        activeType === type ? "bg-blue text-white border-blue" : "bg-white text-grey-500 border-grey-200 hover:border-grey-400"
                      )}
                    >
                      {type === 'all' ? 'All' : TYPE_LABELS[type]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                <label className="text-xs font-bold tracking-wider uppercase text-grey-500">
                  Provider
                  <select value={providerFilter} onChange={event => setProviderFilter(event.target.value)} className="mt-2 w-full px-3 py-3 border border-grey-200 bg-white text-sm font-semibold normal-case tracking-normal focus:outline-none focus:border-blue">
                    <option value="">All providers</option>
                    {providers.map(provider => <option key={provider} value={provider}>{provider}</option>)}
                  </select>
                </label>
                <label className="text-xs font-bold tracking-wider uppercase text-grey-500">
                  Deadline
                  <select value={deadlineWindow} onChange={event => setDeadlineWindow(event.target.value as typeof deadlineWindow)} className="mt-2 w-full px-3 py-3 border border-grey-200 bg-white text-sm font-semibold normal-case tracking-normal focus:outline-none focus:border-blue">
                    <option value="all">Any deadline</option>
                    <option value="30">Closing within 30 days</option>
                    <option value="60">Closing within 60 days</option>
                    <option value="open">No fixed deadline</option>
                  </select>
                </label>
                <label className="text-xs font-bold tracking-wider uppercase text-grey-500">
                  Sort by
                  <select value={sortBy} onChange={event => setSortBy(event.target.value as typeof sortBy)} className="mt-2 w-full px-3 py-3 border border-grey-200 bg-white text-sm font-semibold normal-case tracking-normal focus:outline-none focus:border-blue">
                    <option value="closing">Closing soon</option>
                    <option value="newest">Recently found</option>
                    <option value="title">Title A–Z</option>
                    <option value="provider">Provider A–Z</option>
                  </select>
                </label>
              </div>

              {(activeType !== 'all' || searchQuery || country || providerFilter || deadlineWindow !== 'all' || sortBy !== 'closing') && (
                <button onClick={() => { setActiveType('all'); setSearchQuery(''); setCountry(''); setProviderFilter(''); setDeadlineWindow('all'); setSortBy('closing'); }} className="text-[11px] font-bold text-blue hover:underline self-start">
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* {sourceErrors.length > 0 && !error && (
            <div className="mb-8 border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 rounded-sm">
              Some funding providers did not respond, so these results may be incomplete: {sourceErrors.map(item => SOURCE_LABELS[item.source] || item.source).join(', ')}.
            </div>
          )} */}

          {cachedResults > 0 && !error && (
            <div className="mb-8 border border-blue/20 bg-blue/5 p-4 text-sm text-grey-700 rounded-sm">
              Showing {cachedResults} previously verified result{cachedResults === 1 ? '' : 's'} while an official source recovers{dataAsOf ? ` (last checked ${formatDate(dataAsOf)})` : ''}.
            </div>
          )}

          {withheldUnverified > 0 && !error && (
            <div className="mb-8 border border-grey-200 bg-white p-4 text-sm text-grey-600 rounded-sm">
              {withheldUnverified} listing{withheldUnverified === 1 ? ' was' : 's were'} excluded because the backend could not verify a safe official application or instruction page.
            </div>
          )}

          {withheldUnreachable > 0 && !error && (
            <div className="mb-8 border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 rounded-sm">
              {withheldUnreachable} official source page{withheldUnreachable === 1 ? ' was' : 's were'} temporarily unreachable and excluded. Refresh to retry.
            </div>
          )}

          {loading && funding.length > 0 && !error && (
            <div className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue" role="status" aria-live="polite">
              <RefreshCw size={14} className="motion-safe:animate-spin" /> Updating results…
            </div>
          )}

          {error ? (
            <div className="text-center py-20 bg-red/5 border border-dashed border-red/30 rounded-sm">
              <ServerOff className="mx-auto mb-4 text-red" size={28} />
              <p className="font-bold mb-2">Unable to load live funding</p>
              <p className="text-sm text-grey-600 mb-6">{error}</p>
              <button type="button" onClick={() => setRetryKey(value => value + 1)} className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-sm"><RefreshCw size={14} /> Retry</button>
            </div>
          ) : loading && funding.length === 0 ? (
            <OpportunityGridSkeleton kind="funding" />
          ) : filteredBursaries.length > 0 ? (
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBursaries.map((bursary, i) => (
                <Fragment key={bursary.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedBursary(bursary)}
                  className="bg-white p-4 sm:p-6 lg:p-8 rounded-sm border border-grey-200 hover:border-blue transition-all group cursor-pointer hover:shadow-xl hover:-translate-y-1 relative overflow-hidden min-w-0"
                >
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-grey-400 opacity-0 group-hover:opacity-100 transition-opacity">External Link</span>
                    <FileText size={14} className="text-grey-300 group-hover:text-blue transition-colors" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6 pr-6 sm:pr-8">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start gap-2 mb-3">
                        <span className="max-w-full text-xs font-bold uppercase tracking-wider leading-relaxed text-blue bg-blue/5 px-2.5 py-1.5 rounded-sm break-words">{bursary.provider}</span>
                        <span className={cn("text-[11px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-sm", TYPE_COLORS[bursary.type])}>{TYPE_LABELS[bursary.type] || bursary.type}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-extrabold leading-snug [overflow-wrap:anywhere]">{bursary.title}</h3>
                    </div>
                    <div className="shrink-0 text-left sm:text-right">
                      <div className="text-xs font-bold uppercase tracking-wider text-grey-500">Deadline</div>
                      <div className="text-sm font-bold text-red mt-0.5">{bursary.deadline}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8 mb-8">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-grey-500 mb-2">Coverage</div>
                      <div className="text-base font-semibold text-grey-800 leading-relaxed">{bursary.coverage}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-grey-500 mb-2">Requirements / Source</div>
                      <div className="flex flex-wrap gap-1">
                        {bursary.fields.map((field, j) => (
                          <span key={j} className="text-xs leading-relaxed bg-grey-100 text-grey-600 px-2.5 py-1 rounded-sm">{field}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mb-5 text-xs font-bold uppercase tracking-wider text-grey-500 leading-relaxed">
                    {bursary.country} · {bursary.region} · {bursary.source}
                  </div>
                  <div className="w-full py-3.5 border-1.5 border-black text-black font-syne font-bold text-sm uppercase tracking-wider rounded-sm group-hover:bg-black group-hover:text-white transition-all flex items-center justify-center gap-2">
                    View Details & Apply <ArrowRight size={14} />
                  </div>
                </motion.div>
                {i === 1 && (
                  <AdSenseInFeed variant="card" />
                )}
                {i === 5 && (
                  <AdSenseInFeed
                    className="md:col-span-2"
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
              {hasMore && page < 100 && (
                <button
                  type="button"
                  onClick={() => setPage(currentPage => currentPage + 1)}
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-black text-white rounded-sm font-syne text-xs font-bold uppercase tracking-wider disabled:opacity-60 disabled:cursor-wait"
                >
                  {loading ? <><RefreshCw size={14} className="motion-safe:animate-spin" /> Loading more…</> : <>Load more funding <ArrowRight size={14} /></>}
                </button>
              )}
              {loadMoreError && (
                <div className="text-center" role="alert">
                  <p className="text-sm text-red mb-2">{loadMoreError}</p>
                  <button type="button" onClick={() => setRetryKey(value => value + 1)} className="text-xs font-bold text-blue hover:underline">Try loading this page again</button>
                </div>
              )}
              <p className="text-xs text-grey-500 text-center">Results are loaded in verified provider batches. Use the country and keyword filters for more relevant programmes.</p>
            </div>
            </>
          ) : (
            <div className="text-center py-20 bg-white border border-dashed border-grey-300 rounded-sm">
              <p className="text-grey-500 font-syne italic">No live funding matched these filters.</p>
            </div>
          )}

          {/* Detail Modal */}
          <AnimatePresence>
            {selectedBursary && (
              <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedBursary(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative z-0 bg-white w-full max-w-2xl rounded-t-sm sm:rounded-sm shadow-2xl max-h-[92dvh] sm:max-h-[90vh] overflow-y-auto">
                  <button onClick={() => setSelectedBursary(null)} className="absolute top-3 right-3 sm:top-6 sm:right-6 p-2 bg-white/90 hover:bg-off-white rounded-full transition-colors z-10">
                    <X size={20} />
                  </button>
                  <div className="p-5 pt-14 sm:p-8 lg:p-12">
                    <div className="flex flex-wrap items-center gap-2 mb-4 min-w-0">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue bg-blue/5 px-3 py-1.5 rounded-sm inline-block">{selectedBursary.provider}</span>
                      {selectedBursary.verificationStatus && <span className="text-[11px] font-bold uppercase tracking-wider text-green bg-green/10 px-3 py-1.5 rounded-sm">Source verified</span>}
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 leading-tight [overflow-wrap:anywhere]">{selectedBursary.title}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8 mb-8 sm:mb-10 pb-8 sm:pb-10 border-b border-grey-100">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-2">Coverage</div>
                        <div className="text-lg font-bold text-black">{selectedBursary.coverage}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-2">Deadline</div>
                        <div className="text-lg font-bold text-red">{selectedBursary.deadline}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-2">Country / Region</div>
                        <div className="text-sm font-bold text-black">{selectedBursary.country}<br /><span className="text-grey-400">{selectedBursary.region}</span></div>
                      </div>
                    </div>
                    <div className="mb-10">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-4">About this Opportunity</div>
                      <p className="text-grey-600 leading-relaxed">{selectedBursary.description || selectedBursary.details}</p>
                    </div>
                    <div className="mb-12">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-4">{selectedBursary.isInternal ? 'Key Criteria' : 'Eligible Fields'}</div>
                      <div className="flex flex-wrap gap-2">
                        {(selectedBursary.fields || selectedBursary.criteria).map((item: string, j: number) => (
                          <span key={j} className="text-xs bg-off-white text-grey-800 px-4 py-2 rounded-sm border border-grey-100 font-semibold">{item}</span>
                        ))}
                      </div>
                    </div>
                    {(selectedBursary.benefits?.length ?? 0) > 0 && <div className="mb-10">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-4">Bursary Benefits</div>
                      <ul className="space-y-2">
                        {selectedBursary.benefits?.map(item => <li key={item} className="flex items-start gap-3 text-sm text-grey-700"><Check size={14} className="text-green flex-shrink-0 mt-0.5" />{item}</li>)}
                      </ul>
                    </div>}
                    {(selectedBursary.requiredDocuments?.length ?? 0) > 0 && <div className="mb-10">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-4">Required Documents</div>
                      <ul className="space-y-2">
                        {selectedBursary.requiredDocuments?.map(item => <li key={item} className="flex items-start gap-3 text-sm text-grey-700"><FileText size={14} className="text-blue flex-shrink-0 mt-0.5" />{item}</li>)}
                      </ul>
                    </div>}
                    {(selectedBursary.responsibilities?.length ?? 0) > 0 && <div className="mb-10">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-4">Recipient Responsibilities</div>
                      <ul className="space-y-2">
                        {selectedBursary.responsibilities?.map(item => <li key={item} className="flex items-start gap-3 text-sm text-grey-700"><Check size={14} className="text-blue flex-shrink-0 mt-0.5" />{item}</li>)}
                      </ul>
                    </div>}
                    <div className="flex flex-col sm:flex-row gap-4">
                      {selectedBursary.isInternal ? (
                        <button onClick={handleApply} className="flex-1 py-4 bg-blue text-white font-syne font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-blue-hover transition-all flex items-center justify-center gap-3">
                          Apply via Sduella <ArrowRight size={16} />
                        </button>
                      ) : (
                        <a href={selectedBursary.url} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 bg-blue text-white font-syne font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-blue-hover transition-all flex items-center justify-center gap-3">
                          Apply on External Site <ArrowRight size={16} />
                        </a>
                      )}
                      <button onClick={() => setSelectedBursary(null)} className="px-8 py-4 border border-grey-200 text-grey-600 font-syne font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-off-white transition-all">
                        Close
                      </button>
                    </div>
                    <p className="mt-6 text-[10px] text-grey-400 text-center italic">
                      {selectedBursary.isInternal ? "This application will be processed directly by the Sduella committee." : "Note: You will be redirected to the provider's official portal."}
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {mode === 'study' && <PartnerModal />}
        </div>
      </section>

      {mode === 'study' && <>
      {/* <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 md:px-12 bg-black text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8">The Application Lifecycle</h2>
            <div className="space-y-8 sm:space-y-12">
              {[
                { step: '01', title: 'Digital Registration', desc: 'Create your student profile and upload your latest academic transcript.' },
                { step: '02', title: 'Needs Verification', desc: 'Our committee reviews your financial standing and institutional statements.' },
                { step: '03', title: 'Direct Disbursement', desc: 'Approved funds are paid directly to your institution or service provider.' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                  <div className="text-3xl font-extrabold text-blue/40 font-syne">{item.step}</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/5 p-5 sm:p-8 lg:p-12 rounded-sm border border-white/10">
            <h3 className="text-2xl font-extrabold mb-6">Ready to apply?</h3>
            <p className="text-white/60 mb-8 leading-relaxed">We are currently building the foundational pool. Students who register now will be the first to be reviewed when the first disbursement cycle opens.</p>
            <button onClick={handleApply} className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4 bg-blue text-white font-syne font-bold text-sm tracking-wide rounded-sm hover:bg-blue-hover transition-all">
              Start Application <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section> */}

      {/* FAQ */}
      {/* <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 md:px-12 bg-off-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Who can apply for Sduella funding?", a: "Any student facing financial barriers to completing their education, particularly those who fall outside traditional grant systems but still require support." },
              { q: "Is the funding a loan?", a: "No. Sduella provides non-repayable bursaries. However, we encourage graduates to contribute back to the pool once they are employed." },
              { q: "Can I apply for multiple categories?", a: "Yes, you can apply for both tuition and graduation clearance if both are applicable to your situation." }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-sm border border-grey-100">
                <h4 className="font-bold text-sm mb-2">{faq.q}</h4>
                <p className="text-xs text-grey-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      </>}
    </div>
  );
}
