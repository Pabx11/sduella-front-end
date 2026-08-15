export interface CountryOption {
  code: string;
  name: string;
}

export interface CountryGroup {
  region: string;
  countries: CountryOption[];
}

export const COUNTRY_GROUPS: CountryGroup[] = [
  {
    region: 'Africa',
    countries: [
      { code: 'za', name: 'South Africa' },
      { code: 'ng', name: 'Nigeria' },
      { code: 'ke', name: 'Kenya' },
      { code: 'gh', name: 'Ghana' },
      { code: 'eg', name: 'Egypt' },
    ],
  },
  {
    region: 'Europe',
    countries: [
      { code: 'gb', name: 'United Kingdom' },
      { code: 'de', name: 'Germany' },
      { code: 'fr', name: 'France' },
      { code: 'nl', name: 'Netherlands' },
      { code: 'it', name: 'Italy' },
      { code: 'pl', name: 'Poland' },
      { code: 'ch', name: 'Switzerland' },
      { code: 'at', name: 'Austria' },
      { code: 'be', name: 'Belgium' },
    ],
  },
  {
    region: 'Asia',
    countries: [
      { code: 'cn', name: 'China' },
      { code: 'in', name: 'India' },
      { code: 'sg', name: 'Singapore' },
      { code: 'jp', name: 'Japan' },
    ],
  },
  {
    region: 'North America',
    countries: [
      { code: 'us', name: 'United States' },
      { code: 'ca', name: 'Canada' },
      { code: 'mx', name: 'Mexico' },
    ],
  },
  {
    region: 'South America',
    countries: [{ code: 'br', name: 'Brazil' }],
  },
  {
    region: 'Oceania',
    countries: [
      { code: 'au', name: 'Australia' },
      { code: 'nz', name: 'New Zealand' },
    ],
  },
];

export const formatRegion = (region: string) =>
  region.replaceAll('_', ' ').replace(/\b\w/g, letter => letter.toUpperCase());
