export type OpportunityType =
  | 'job'
  | 'internship'
  | 'learnership'
  | 'apprenticeship'
  | 'bursary'
  | 'scholarship'
  | 'student_funding'
  | 'business_funding'
  | 'grant';

export type OpportunitySource =
  | 'remotive'
  | 'adzuna'
  | 'jooble'
  | 'careerjet'
  | 'usajobs'
  | 'grants_gov'
  | 'simpler_grants'
  | 'eu_funding'
  | 'uct_funding'
  | 'study_in_japan'
  | 'china_scholarships'
  | 'nigeria_funding'
  | 'kenya_funding'
  | 'ghana_funding'
  | 'canada_funding'
  | 'italy_funding'
  | 'za_business_funding'
  | 'official_business_funding'
  | 'official_study_funding';

export type OpportunityRegion =
  | 'africa'
  | 'asia'
  | 'europe'
  | 'north_america'
  | 'south_america'
  | 'oceania'
  | 'global';

export type VerificationStatus =
  | 'provider_verified'
  | 'detail_verified'
  | 'application_verified'
  | 'verification_failed';

export interface Opportunity {
  id: string;
  external_id: string;
  title: string;
  organisation: string;
  opportunity_type: OpportunityType;
  country: string | null;
  country_name: string | null;
  region: OpportunityRegion;
  location: string | null;
  eligible_countries: string[];
  remote: boolean;
  description: string;
  benefits: string[];
  requirements: string[];
  required_documents: string[];
  responsibilities: string[];
  amount_or_salary: string | null;
  currency: string | null;
  opening_date: string | null;
  closing_date: string | null;
  application_url: string;
  source: OpportunitySource;
  source_url: string;
  date_fetched: string;
  verified_at: string | null;
  verification_status: VerificationStatus;
  status: string;
  metadata: Record<string, unknown>;
}

export interface OpportunitySourceError {
  source: OpportunitySource;
  message: string;
}

export interface OpportunitySearchResponse {
  items: Opportunity[];
  returned: number;
  total_before_pagination: number;
  has_more: boolean;
  page: number;
  page_size: number;
  withheld_unverified: number;
  withheld_expired: number;
  withheld_unreachable: number;
  cached_results: number;
  data_as_of: string | null;
  sources_queried: OpportunitySource[];
  errors: OpportunitySourceError[];
}
