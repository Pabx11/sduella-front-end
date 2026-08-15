import type { OpportunityRegion } from '../types/opportunities';

export interface GlobalMarket {
  slug: string;
  name: string;
  kind: 'region' | 'country';
  countryCode?: string;
  region?: OpportunityRegion;
  locale: string;
  title: string;
  description: string;
  answer: string;
  keywords: string[];
  guidance: string;
  sources: Array<{ label: string; href: string }>;
}

const region = (market: Omit<GlobalMarket, 'kind'>): GlobalMarket => ({ ...market, kind: 'region' });
const country = (market: Omit<GlobalMarket, 'kind'>): GlobalMarket => ({ ...market, kind: 'country' });

export const GLOBAL_MARKETS: Record<string, GlobalMarket> = {
  africa: region({
    slug: 'africa', name: 'Africa', region: 'africa', locale: 'en_001',
    title: 'Scholarships & Student Funding Across Africa',
    description: 'Search scholarships, bursaries and student funding across African countries, with country filters and official application sources.',
    answer: 'Explore local, bilateral and international funding available across Africa. Country rules vary, so filter the live feed by citizenship or destination and confirm every application with the named ministry, scholarship authority, university or funder.',
    keywords: ['scholarships in Africa', 'African scholarships', 'bursaries Africa', 'student funding Africa'],
    guidance: 'Africa does not have one shared scholarship system. National ministries and scholarship authorities manage local and foreign-study programmes, while universities and international partners publish separate calls.',
    sources: [
      { label: 'Nigeria Federal Scholarships Board', href: 'https://education.gov.ng/federal-scholarships-board/' },
      { label: 'Kenya Ministry of Education scholarships', href: 'https://education.go.ke/index.php/scholarships-0' },
      { label: 'Ghana Scholarships Authority', href: 'https://scholarships.gov.gh/' },
      { label: 'South African Government funding guidance', href: 'https://www.gov.za/faq/education/where-can-i-get-bursaryfunds-further-my-studies' },
    ],
  }),
  asia: region({
    slug: 'asia', name: 'Asia', region: 'asia', locale: 'en_001',
    title: 'Scholarships & Study Funding Across Asia',
    description: 'Find scholarships and tuition support across Asia, including Japan, China, India and other major study destinations.',
    answer: 'Search government, institution and international scholarships across Asian study destinations. Check whether the opportunity is based on citizenship, country of study, embassy nomination, university nomination or direct application.',
    keywords: ['scholarships in Asia', 'Asian scholarships', 'study in Asia funding', 'international student scholarships Asia'],
    guidance: 'Application routes differ sharply across Asia. Some government awards use embassies or nominating institutions, while university scholarships may require admission before funding consideration.',
    sources: [
      { label: 'Study in Japan official scholarship information', href: 'https://www.studyinjapan.go.jp/en/planning/scholarships/' },
      { label: 'Chinese Government Scholarship information', href: 'https://www.campuschina.org/' },
      { label: 'India National Scholarship Portal', href: 'https://scholarships.gov.in/' },
      { label: 'Singapore Tuition Grant & Scholarships', href: 'https://tgs.moe.gov.sg/' },
    ],
  }),
  europe: region({
    slug: 'europe', name: 'Europe', region: 'europe', locale: 'en_150',
    title: 'Scholarships & Study Funding Across Europe',
    description: 'Search European scholarships, grants and tuition support from EU programmes, governments, universities and official databases.',
    answer: 'Explore funding for study in Europe, including EU-wide programmes and national scholarship systems. Verify destination, nationality, degree level, tuition status and mobility conditions for each award.',
    keywords: ['scholarships in Europe', 'European scholarships', 'Erasmus scholarships', 'study in Europe funding'],
    guidance: 'Europe combines EU-level mobility funding with independent national and university systems. An EU programme may cover several countries, while a national award can impose residency or destination rules.',
    sources: [
      { label: 'European Education Area funding guidance', href: 'https://education.ec.europa.eu/study-in-europe/planning-your-studies/scholarships-and-funding' },
      { label: 'EU Funding & Tenders Portal', href: 'https://ec.europa.eu/info/funding-tenders/opportunities/portal/' },
      { label: 'DAAD Scholarship Database', href: 'https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/' },
      { label: 'UK Government international scholarships', href: 'https://www.gov.uk/postgraduate-scholarships-international-students' },
    ],
  }),
  'north-america': region({
    slug: 'north-america', name: 'North America', region: 'north_america', locale: 'en_021',
    title: 'Scholarships & Study Funding in North America',
    description: 'Find scholarships and study funding for Canada, the United States and other North American destinations.',
    answer: 'Search North American scholarships, grants and institution funding. Separate awards for international applicants from domestic financial aid, and check whether the student or host institution must submit the application.',
    keywords: ['North America scholarships', 'Canada scholarships', 'USA scholarships', 'international student funding North America'],
    guidance: 'North American funding is often decentralised across governments, institutions and foundations. International applicants should confirm citizenship eligibility and whether admission is required first.',
    sources: [
      { label: 'EduCanada international scholarships', href: 'https://www.educanada.ca/scholarships-bourses/index.aspx?lang=eng' },
      { label: 'EducationUSA official study guidance', href: 'https://educationusa.state.gov/' },
      { label: 'United States federal grants', href: 'https://www.grants.gov/' },
    ],
  }),
  'latin-america-caribbean': region({
    slug: 'latin-america-caribbean', name: 'Latin America & the Caribbean', region: 'south_america', locale: 'en_419',
    title: 'Scholarships in Latin America & the Caribbean',
    description: 'Search scholarships and postgraduate funding in Latin America and the Caribbean, including regional and national programmes.',
    answer: 'Explore regional, government and university funding across Latin America and the Caribbean. Check the language of study, member-country eligibility, degree level and whether applications require institutional nomination.',
    keywords: ['Latin America scholarships', 'Caribbean scholarships', 'OAS scholarships', 'Brazil scholarships'],
    guidance: 'Regional programmes can span many countries, while national research agencies may focus on residents, incoming researchers or postgraduate study. Read the official call in its published language.',
    sources: [
      { label: 'OAS Scholarships', href: 'https://www.oas.org/en/scholarships/' },
      { label: 'Brazil CAPES scholarships and opportunities', href: 'https://www.gov.br/capes/pt-br/assuntos/editais-e-resultados-capes/' },
      { label: 'EduCanada programmes for Latin America and the Caribbean', href: 'https://www.educanada.ca/scholarships-bourses/non_can/index.aspx?lang=en' },
    ],
  }),
  oceania: region({
    slug: 'oceania', name: 'Oceania', region: 'oceania', locale: 'en_009',
    title: 'Scholarships & Study Funding in Oceania',
    description: 'Find scholarships for Australia, New Zealand and Pacific study destinations from official programmes and institutions.',
    answer: 'Search funding for study in Australia, New Zealand and the Pacific. Government awards frequently restrict eligibility to partner countries and priority fields, so use the relevant country profile before applying.',
    keywords: ['Oceania scholarships', 'Australia scholarships', 'New Zealand scholarships', 'Pacific scholarships'],
    guidance: 'Australia Awards and Manaaki New Zealand Scholarships use participating-country rules. University awards may remain available when a government programme does not cover an applicant’s citizenship.',
    sources: [
      { label: 'Australia Awards Scholarships', href: 'https://www.dfat.gov.au/people-to-people/australia-awards/australia-awards-scholarships' },
      { label: 'Manaaki New Zealand Scholarships', href: 'https://www.nzscholarships.govt.nz/' },
    ],
  }),
  nigeria: country({
    slug: 'nigeria', name: 'Nigeria', countryCode: 'ng', locale: 'en_NG',
    title: 'Scholarships & Student Funding in Nigeria', description: 'Find Nigerian local and foreign scholarship opportunities, requirements, deadlines and official application routes.',
    answer: 'Search scholarships relevant to Nigerian students, including federal, bilateral, state, institution and international opportunities. Confirm whether a notice is for study in Nigeria or abroad and use the official application portal.',
    keywords: ['Nigeria scholarships', 'Federal Government scholarships Nigeria', 'student funding Nigeria'],
    guidance: 'The Federal Scholarships Board coordinates federal local and foreign scholarship commitments, while states, institutions and partners publish separate calls.',
    sources: [{ label: 'Nigeria Federal Scholarships Board', href: 'https://education.gov.ng/federal-scholarships-board/' }, { label: 'Nigeria Federal Ministry of Education', href: 'https://education.gov.ng/' }],
  }),
  kenya: country({
    slug: 'kenya', name: 'Kenya', countryCode: 'ke', locale: 'en_KE',
    title: 'Scholarships & Student Funding in Kenya', description: 'Search Kenyan scholarships for local and international study using current Ministry and provider information.',
    answer: 'Find scholarships relevant to Kenyan applicants, including Ministry notices, bilateral awards and institution programmes. Many Ministry listings link to a formal notice, so verify the extracted deadline and application method before submission.',
    keywords: ['Kenya scholarships', 'Ministry of Education scholarships Kenya', 'student funding Kenya'],
    guidance: 'Kenya’s Ministry of Education publishes scholarship tables and linked notices for multiple destinations and study levels; the notice itself controls eligibility.',
    sources: [{ label: 'Kenya Ministry of Education scholarships', href: 'https://education.go.ke/index.php/scholarships-0' }, { label: 'Kenya education circulars and guidelines', href: 'https://education.go.ke/circulars-guidelines' }],
  }),
  ghana: country({
    slug: 'ghana', name: 'Ghana', countryCode: 'gh', locale: 'en_GH',
    title: 'Scholarships & Student Funding in Ghana', description: 'Find Ghana scholarships for local tertiary and foreign study through official notices and connected providers.',
    answer: 'Search funding for Ghanaian students across local tertiary, foreign and partner scholarship routes. Use the Ghana Scholarships Authority’s official notice and application portal to confirm documents, assessments and interviews.',
    keywords: ['Ghana scholarships', 'Ghana Scholarships Authority', 'local tertiary scholarship Ghana'],
    guidance: 'Ghana’s official system includes local and foreign pathways, but programme, district, academic-year and partner-country conditions can differ.',
    sources: [{ label: 'Ghana Scholarships Authority', href: 'https://scholarships.gov.gh/' }, { label: 'Ghana official application portal', href: 'https://apply.scholarships.gov.gh/' }],
  }),
  'south-africa': country({
    slug: 'south-africa', name: 'South Africa', countryCode: 'za', locale: 'en_ZA',
    title: 'Bursaries & Student Funding in South Africa', description: 'Find South African bursaries, NSFAS alternatives, scholarships and university funding with official application links.',
    answer: 'Search South African bursaries and student funding for university, university of technology and TVET study. Compare public, corporate and institution routes, then confirm citizenship, income, academic and qualification rules.',
    keywords: ['South Africa bursaries', 'student funding South Africa', 'NSFAS alternatives'],
    guidance: 'NSFAS is one route, not the entire market. Government departments, companies, professional bodies and institutions also publish funding with separate rules.',
    sources: [{ label: 'South African Government funding guidance', href: 'https://www.gov.za/faq/education/where-can-i-get-bursaryfunds-further-my-studies' }, { label: 'NSFAS official website', href: 'https://www.nsfas.org.za/' }],
  }),
  japan: country({
    slug: 'japan', name: 'Japan', countryCode: 'jp', locale: 'en_JP',
    title: 'Scholarships for Study in Japan', description: 'Search Japanese government, JASSO, university and tuition-reduction opportunities for international students.',
    answer: 'Find scholarships for international study in Japan, including MEXT, JASSO and institution awards. Check whether the route uses embassy recommendation, university recommendation or an application after admission.',
    keywords: ['Japan scholarships', 'MEXT scholarship', 'JASSO scholarship', 'study in Japan funding'],
    guidance: 'The official Study in Japan service separates MEXT, JASSO and institution funding, and advises applicants to confirm the latest programme guidelines directly.',
    sources: [{ label: 'MEXT Scholarship official guide', href: 'https://www.studyinjapan.go.jp/en/planning/scholarships/mext-scholarships/' }, { label: 'Japan scholarship and tuition reduction search', href: 'https://www.studyinjapan.go.jp/en/search-for-scholarships/tuition-reduction_search.php?lang=en' }],
  }),
  china: country({
    slug: 'china', name: 'China', countryCode: 'cn', locale: 'en_CN',
    title: 'Scholarships for Study in China', description: 'Search Chinese Government and university scholarships for international undergraduate and postgraduate students.',
    answer: 'Find funding for international study in China, then confirm whether the scholarship is managed through the Chinese Scholarship Council, an embassy, a university or another official programme owner.',
    keywords: ['China scholarships', 'Chinese Government Scholarship', 'CSC scholarship'],
    guidance: 'Application channels and agency numbers can depend on the programme and nominating authority. Use the current official call rather than a copied summary.',
    sources: [{ label: 'Campus China official scholarship service', href: 'https://www.campuschina.org/' }, { label: 'China Scholarship Council', href: 'https://www.csc.edu.cn/' }],
  }),
  india: country({
    slug: 'india', name: 'India', countryCode: 'in', locale: 'en_IN',
    title: 'Scholarships & Student Funding in India', description: 'Search Indian government, institution and international scholarship opportunities using official application sources.',
    answer: 'Find scholarships for study in India and opportunities available to Indian applicants. Confirm whether the National Scholarship Portal, a ministry, institution or international partner owns the application.',
    keywords: ['India scholarships', 'National Scholarship Portal', 'student funding India'],
    guidance: 'India’s National Scholarship Portal supports multiple schemes, while external scholarships and institution awards can use separate systems and eligibility rules.',
    sources: [{ label: 'India National Scholarship Portal', href: 'https://scholarships.gov.in/' }, { label: 'India Ministry of Education', href: 'https://www.education.gov.in/' }],
  }),
  canada: country({
    slug: 'canada', name: 'Canada', countryCode: 'ca', locale: 'en_CA',
    title: 'Scholarships for Study in Canada', description: 'Find Canadian scholarships for international applicants and Canadians, including official programme and application guidance.',
    answer: 'Search scholarships for study and research in Canada. Some Global Affairs Canada programmes require the Canadian host institution to apply, so verify who submits before creating an account or preparing documents.',
    keywords: ['Canada scholarships', 'scholarships for international students Canada', 'EduCanada scholarships'],
    guidance: 'EduCanada distinguishes programmes for Canadians and international applicants; direct student applications are not permitted for every award.',
    sources: [{ label: 'EduCanada international scholarships', href: 'https://www.educanada.ca/scholarships-bourses/index.aspx?lang=eng' }, { label: 'EduCanada scholarships for international applicants', href: 'https://www.educanada.ca/scholarships-bourses/non_can/index.aspx?lang=en' }],
  }),
  'united-kingdom': country({
    slug: 'united-kingdom', name: 'United Kingdom', countryCode: 'gb', locale: 'en_GB',
    title: 'UK Scholarships for International Students', description: 'Find UK government and university scholarships, including Chevening and Commonwealth postgraduate routes.',
    answer: 'Search funding for study in the United Kingdom, including government, Commonwealth and university programmes. Check nationality, degree level, work experience, admission and return-home conditions.',
    keywords: ['UK scholarships', 'Chevening scholarship', 'Commonwealth scholarship', 'study in UK funding'],
    guidance: 'Major UK government routes target different applicant groups: Chevening, Commonwealth and Marshall awards do not share one eligibility model.',
    sources: [{ label: 'UK Government postgraduate scholarship guidance', href: 'https://www.gov.uk/postgraduate-scholarships-international-students' }, { label: 'UK international scholarship programmes', href: 'https://www.gov.uk/guidance/foreign-commonwealth-development-office-international-scholarship-programmes' }],
  }),
  germany: country({
    slug: 'germany', name: 'Germany', countryCode: 'de', locale: 'en_DE',
    title: 'Scholarships for Study & Research in Germany', description: 'Search DAAD and other selected scholarships for international students, graduates and researchers in Germany.',
    answer: 'Find funding for study and research in Germany through DAAD and other selected organisations. Match your country of origin, academic status, subject and intended programme before relying on an award.',
    keywords: ['Germany scholarships', 'DAAD scholarships', 'study in Germany funding'],
    guidance: 'The DAAD database filters programmes by applicant origin, academic status, subject and purpose; the detailed programme page controls the application.',
    sources: [{ label: 'DAAD Scholarship Database', href: 'https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/' }, { label: 'DAAD scholarship applicant information', href: 'https://www.daad.de/en/studying-in-germany/scholarships/' }],
  }),
  italy: country({
    slug: 'italy', name: 'Italy', countryCode: 'it', locale: 'en_IT',
    title: 'Scholarships & Study Benefits in Italy', description: 'Search Italian government, regional and university scholarships and benefits for domestic and international students.',
    answer: 'Find study funding in Italy across regional right-to-study bodies, universities and government programmes. International students may need equivalent financial documentation, and each call defines its own process.',
    keywords: ['Italy scholarships', 'study in Italy funding', 'Italian government scholarships'],
    guidance: 'Italy combines regional benefits, institution awards, fee reductions and government scholarships rather than relying on one national application route.',
    sources: [{ label: 'Universitaly scholarships and benefits', href: 'https://www.universitaly.it/it/borse-studio' }, { label: 'Universitaly international student procedures', href: 'https://www.universitaly.it/it/studenti-stranieri' }],
  }),
  'united-states': country({
    slug: 'united-states', name: 'United States', countryCode: 'us', locale: 'en_US',
    title: 'Scholarships & Financial Aid in the United States', description: 'Search scholarships, grants and institution aid for study and research in the United States.',
    answer: 'Find funding linked to study and research in the United States. International students should compare institution aid and eligible external awards separately from US federal student aid.',
    keywords: ['USA scholarships', 'United States scholarships international students', 'financial aid USA'],
    guidance: 'US funding is decentralised. Admission, institutional financial-aid forms and scholarship applications can be separate processes with different deadlines.',
    sources: [{ label: 'EducationUSA official guidance', href: 'https://educationusa.state.gov/' }, { label: 'US federal grants', href: 'https://www.grants.gov/' }],
  }),
  australia: country({
    slug: 'australia', name: 'Australia', countryCode: 'au', locale: 'en_AU',
    title: 'Scholarships for Study in Australia', description: 'Find Australia Awards and university scholarships for eligible international students and partner countries.',
    answer: 'Search funding for study in Australia. Australia Awards use participating-country profiles and development priorities, while universities publish additional scholarships with their own admission and merit rules.',
    keywords: ['Australia scholarships', 'Australia Awards', 'study in Australia funding'],
    guidance: 'Country profiles determine Australia Awards eligibility, priority subjects, deadlines and application route; not every nationality participates.',
    sources: [{ label: 'Australia Awards Scholarships', href: 'https://www.dfat.gov.au/people-to-people/australia-awards/australia-awards-scholarships' }, { label: 'Australia Awards participating countries', href: 'https://www.dfat.gov.au/people-to-people/australia-awards/participating-countries' }],
  }),
  'new-zealand': country({
    slug: 'new-zealand', name: 'New Zealand', countryCode: 'nz', locale: 'en_NZ',
    title: 'Manaaki & Other New Zealand Scholarships', description: 'Find New Zealand government and institution scholarships for eligible international students and partner countries.',
    answer: 'Search funding for study in New Zealand, including Manaaki New Zealand Scholarships and institution awards. Confirm eligible citizenship, subjects, work experience and the current application window.',
    keywords: ['New Zealand scholarships', 'Manaaki scholarship', 'study in New Zealand funding'],
    guidance: 'Manaaki eligibility varies by country and study priority. Applicants outside participating countries should check institution scholarships separately.',
    sources: [{ label: 'Manaaki New Zealand Scholarships', href: 'https://www.nzscholarships.govt.nz/' }, { label: 'Manaaki eligibility criteria', href: 'https://www.nzscholarships.govt.nz/check-eligibility-criteria/' }],
  }),
  brazil: country({
    slug: 'brazil', name: 'Brazil', countryCode: 'br', locale: 'pt_BR',
    title: 'Scholarships & Research Funding in Brazil', description: 'Find Brazilian postgraduate, research and international cooperation funding through CAPES and official programmes.',
    answer: 'Search scholarships and research funding connected to Brazil. CAPES programmes may support study in Brazil, international mobility, research partnerships or specific postgraduate routes.',
    keywords: ['Brazil scholarships', 'CAPES scholarships', 'research funding Brazil'],
    guidance: 'CAPES publishes current calls and programme-specific rules; many opportunities are postgraduate or institution-linked and may be published primarily in Portuguese.',
    sources: [{ label: 'CAPES open calls and results', href: 'https://www.gov.br/capes/pt-br/assuntos/editais-e-resultados-capes/' }, { label: 'CAPES international scholarships and support', href: 'https://www.gov.br/capes/pt-br/acesso-a-informacao/acoes-e-programas/bolsas/bolsas-e-auxilios-internacionais' }],
  }),
};

export const REGION_MARKETS = Object.values(GLOBAL_MARKETS).filter(market => market.kind === 'region');
export const COUNTRY_MARKETS = Object.values(GLOBAL_MARKETS).filter(market => market.kind === 'country');
