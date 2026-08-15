import type { OpportunityType } from '../types/opportunities';

export type SeoPageKey = keyof typeof SEO_PAGES;

const SA_SOURCES = [
  { label: 'South African Government: bursary funding guidance', href: 'https://www.gov.za/faq/education/where-can-i-get-bursary-funding' },
  { label: 'NSFAS official website', href: 'https://www.nsfas.org.za/' },
  { label: 'University of Cape Town funding noticeboard', href: 'https://uct.ac.za/students/fees-funding/external-bursaries' },
];

const GLOBAL_STUDY_SOURCES = [
  { label: 'Study in Japan — official government information', href: 'https://www.studyinjapan.go.jp/en/' },
  { label: 'EduCanada — scholarships for international students', href: 'https://www.educanada.ca/scholarships-bourses/index.aspx?lang=eng' },
  { label: 'EU Funding & Tenders Portal', href: 'https://ec.europa.eu/info/funding-tenders/opportunities/portal/' },
];

const RESEARCH_FUNDING_SOURCES = [
  { label: 'National Research Foundation South Africa — funding', href: 'https://www.nrf.ac.za/funding/' },
  { label: 'EURAXESS — research jobs and funding opportunities', href: 'https://euraxess.ec.europa.eu/jobs/search' },
  { label: 'UK Research and Innovation — funding finder', href: 'https://www.ukri.org/opportunity/' },
];

const WORK_SOURCES = [
  { label: 'South African Government: finding a job', href: 'https://www.gov.za/issues/finding-job' },
  { label: 'Department of Employment and Labour', href: 'https://www.labour.gov.za/' },
  { label: 'South African Qualifications Authority', href: 'https://www.saqa.org.za/' },
];

const BUSINESS_SOURCES = [
  { label: 'NYDA Grant Programme', href: 'https://www.nyda.gov.za/Products-Services/NYDA-Grant-Programme.html' },
  { label: 'Small Enterprise Development Agency', href: 'https://www.seda.org.za/' },
  { label: 'South African Government: starting a business', href: 'https://www.gov.za/issues/starting-your-own-business' },
];

export const SEO_PAGES: Record<string, {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  answer: string;
  keywords: string[];
  group: 'funding' | 'jobs' | 'business';
  defaultType?: OpportunityType | 'all';
  defaultCountry?: string;
  defaultSearch?: string;
  highlights: Array<{ title: string; text: string }>;
  faqs: Array<{ question: string; answer: string }>;
  sources: Array<{ label: string; href: string }>;
}> = {
  bursaries: {
    path: '/bursaries',
    title: 'Bursaries 2026 & 2027: Current Study Funding Opportunities',
    description: 'Search current bursaries for 2026 and 2027, scholarships and student funding. Compare deadlines and requirements, then apply at the official provider.',
    eyebrow: 'Current study funding',
    answer: 'Find current bursaries, scholarships and student grants in one searchable feed. Filter by country and funding type, check eligibility and closing dates, and complete your application on the official provider’s website.',
    keywords: ['bursaries 2026', 'bursaries 2027', 'student funding', 'bursary applications', 'bursary closing dates'],
    group: 'funding', defaultType: 'all',
    highlights: [
      { title: 'Start with eligibility', text: 'Check citizenship, study level, subject requirements and academic thresholds before preparing documents.' },
      { title: 'Use the official application', text: 'Sduella explains each listing and directs you to the provider’s application destination.' },
      { title: 'Track the closing date', text: 'Prioritise complete applications with the earliest confirmed deadlines and verify dates at the source.' },
    ],
    faqs: [
      { question: 'Which bursaries are open for 2026 and 2027?', answer: 'The live feed above collects currently available opportunities from connected providers. Use the country and funding-type filters, then confirm the final deadline on the official listing because providers can amend dates.' },
      { question: 'What documents are usually needed for a bursary application?', answer: 'Requirements differ, but applicants are commonly asked for identification, academic results or transcripts, proof of registration or acceptance, a CV or motivation, and financial-need evidence. Follow the exact official checklist for each bursary.' },
      { question: 'Do I apply through Sduella?', answer: 'No. Sduella helps you discover and understand opportunities. Applications are completed with the original funder or institution through the official link shown on each listing.' },
    ],
    sources: [...SA_SOURCES, ...GLOBAL_STUDY_SOURCES],
  },
  southAfricaBursaries: {
    path: '/bursaries/south-africa',
    title: 'Bursaries in South Africa for 2026 & 2027',
    description: 'Find bursaries in South Africa for university and TVET students. Search current opportunities, requirements, benefits and official application links.',
    eyebrow: 'South Africa',
    answer: 'Search South African bursaries for university, university of technology and TVET study. Results can include corporate, government and institution-linked funding, with the official source retained for final verification and application.',
    keywords: ['bursaries in South Africa', 'South Africa bursaries 2026', 'South Africa bursaries 2027', 'TVET bursaries', 'university bursaries'],
    group: 'funding', defaultType: 'bursary', defaultCountry: 'za',
    highlights: [
      { title: 'For different study routes', text: 'Search opportunities relevant to university, university of technology and TVET applicants.' },
      { title: 'More than one funder', text: 'Look beyond a single scheme by comparing corporate, public-sector and institution-linked opportunities.' },
      { title: 'Official checks matter', text: 'Confirm citizenship, income, academic and field-of-study rules on the provider website before applying.' },
    ],
    faqs: [
      { question: 'Where can South African students find bursaries?', answer: 'Students can search funders, government departments, professional bodies, employers and university funding offices. Sduella brings connected listings together and keeps the official provider link with every opportunity.' },
      { question: 'Can I apply for a bursary if I also applied for NSFAS?', answer: 'Rules vary by funder. Some programmes allow an application while another decision is pending, but may prohibit duplicate full funding. Disclose other support and follow the official terms.' },
      { question: 'Are bursaries only for top academic performers?', answer: 'No. Some are merit-based, while others emphasise financial need, a particular subject, community, employer pipeline or demographic criteria. Read the eligibility section for each listing.' },
    ], sources: SA_SOURCES,
  },
  closingSoon: {
    path: '/bursaries/closing-soon',
    title: 'Bursaries Closing Soon: Upcoming Application Deadlines',
    description: 'Check bursaries closing soon, compare application deadlines and open the official listing before you submit.',
    eyebrow: 'Deadline tracker',
    answer: 'Use this page to identify current bursaries with upcoming deadlines. Prepare required documents early and always recheck the closing date on the funder’s official page before submitting.',
    keywords: ['bursaries closing soon', 'bursaries still open', 'bursary closing dates', 'open bursaries'],
    group: 'funding', defaultType: 'bursary',
    highlights: [
      { title: 'Do the earliest first', text: 'Prioritise opportunities with the nearest confirmed deadline while leaving time for certification and references.' },
      { title: 'Submit a complete file', text: 'A rushed but incomplete application may fail basic screening, so use the provider’s checklist.' },
      { title: 'Recheck before sending', text: 'Deadlines and submission methods can change; the official provider page is the final authority.' },
    ],
    faqs: [
      { question: 'How close to the deadline should I apply?', answer: 'Apply as early as you can. Early submission leaves time to correct missing documents, technical problems or certification issues.' },
      { question: 'Can a bursary deadline change?', answer: 'Yes. Providers can extend, correct or withdraw dates. Sduella shows available deadline information, but applicants should confirm it on the official listing.' },
      { question: 'What should I prepare first?', answer: 'Start with identification, current academic records, proof of admission or registration, household-income documents, a CV and a reusable motivation draft, then adapt everything to the funder’s checklist.' },
    ], sources: SA_SOURCES,
  },
  undergraduate: {
    path: '/bursaries/undergraduate', title: 'Undergraduate Bursaries for University & TVET Students',
    description: 'Find current undergraduate bursaries and student funding for university, university of technology and TVET study.', eyebrow: 'Undergraduate funding',
    answer: 'Browse funding aimed at first qualifications and current undergraduate study. Check whether each programme accepts prospective students, enrolled students, TVET study or specific years and fields.',
    keywords: ['undergraduate bursaries', 'university bursaries', 'TVET funding', 'first year bursaries'], group: 'funding', defaultType: 'bursary', defaultSearch: 'undergraduate',
    highlights: [{ title: 'Check the accepted level', text: 'Confirm whether the funder supports certificates, diplomas, degrees or only selected qualifications.' }, { title: 'Prospective or enrolled?', text: 'Some programmes accept Grade 12 applicants; others require proof that you are already registered.' }, { title: 'Plan for all study costs', text: 'Compare tuition, accommodation, books, meals, travel and allowance coverage instead of assuming every bursary is full-cost.' }],
    faqs: [{ question: 'Can first-year students apply?', answer: 'Many programmes accept prospective or first-year students, but others only fund continuing students. Check the accepted year of study on the official listing.' }, { question: 'Are TVET students eligible for bursaries?', answer: 'Yes, some schemes support eligible TVET programmes. Confirm the institution type, qualification and campus requirements for each funder.' }, { question: 'Does a bursary cover every expense?', answer: 'Not always. Coverage may include only tuition, or may add accommodation, books, meals, transport or an allowance. Use the official benefits section.' }], sources: SA_SOURCES,
  },
  postgraduate: {
    path: '/bursaries/postgraduate', title: 'PhD Funding & Postgraduate Research Grants 2026–2027',
    description: 'Find current PhD funding, doctoral scholarships, postdoctoral fellowships and research grants. Compare deadlines and apply through official funders.', eyebrow: 'Funding for researchers',
    answer: 'Search current funding for honours, master’s and doctoral study, postdoctoral research and academic projects. Compare career stage, eligible country, discipline, award value and deadline, then apply through the official funder.',
    keywords: ['PhD funding 2026', 'PhD funding 2027', 'doctoral scholarships', 'postdoctoral fellowships', 'research grants', 'postgraduate bursaries', 'masters scholarships', 'early career researcher funding', 'research travel grants'], group: 'funding', defaultSearch: 'research',
    highlights: [{ title: 'Match your research stage', text: 'Filter opportunities for master’s, PhD or doctoral study, postdoctoral work and early-career research.' }, { title: 'Check proposal conditions', text: 'Confirm the discipline, host institution, supervisor, proposal, nationality and academic-record requirements.' }, { title: 'Compare the full award', text: 'Check tuition, stipend, research costs, equipment, travel and conference support—not only the headline value.' }],
    faqs: [{ question: 'Where can I find current PhD and research funding?', answer: 'Use the live funding results on this page and filter by country or keyword. Each result leads to the official funder, where you should confirm eligibility, the closing date and the application method.' }, { question: 'What documents are usually needed for doctoral or research funding?', answer: 'Common requirements include transcripts, proof of admission or affiliation, a research proposal, supervisor details, references, publications and an academic CV. Follow the official call.' }, { question: 'Are postdoctoral fellowships and early-career grants included?', answer: 'Relevant postdoctoral fellowships, research grants and early-career opportunities can appear when connected official sources publish them. Search by career stage and check host-country rules.' }, { question: 'Can international researchers apply?', answer: 'Some calls are international, while others restrict nationality, residence, host institution or research location. Check every geographic condition on the official listing.' }], sources: [...SA_SOURCES, ...GLOBAL_STUDY_SOURCES, ...RESEARCH_FUNDING_SOURCES],
  },
  scholarships: {
    path: '/scholarships', title: 'Scholarships for South African & International Students',
    description: 'Search current scholarships for undergraduate and postgraduate study in South Africa and abroad, with official application links.', eyebrow: 'Scholarships',
    answer: 'Search scholarships for local and international study, then filter by country. Confirm nationality, destination, degree level, language and admission requirements with the official scholarship provider.',
    keywords: ['scholarships', 'international scholarships', 'scholarships for South Africans', 'study abroad funding'], group: 'funding', defaultType: 'scholarship',
    highlights: [{ title: 'Home and destination rules', text: 'International awards may specify both eligible nationalities and approved study destinations.' }, { title: 'Admission may come first', text: 'Some scholarships require a separate university application or an offer before funding is considered.' }, { title: 'Read the complete package', text: 'Check whether tuition, travel, insurance, accommodation and living expenses are included.' }],
    faqs: [{ question: 'What is the difference between a scholarship and a bursary?', answer: 'The terms overlap. Scholarships often emphasise merit or a defined programme, while bursaries may combine merit with financial need or workforce goals. The provider’s terms are what matter.' }, { question: 'Can South African students apply for overseas scholarships?', answer: 'Yes, where South Africa is an eligible nationality and the applicant meets the academic, admission and language conditions.' }, { question: 'Do scholarships require repayment?', answer: 'Usually not, but some awards include service, return-home, work-placement or completion obligations. Read the award agreement.' }], sources: GLOBAL_STUDY_SOURCES,
  },
  studentFunding: {
    path: '/student-funding', title: 'Student Funding: Bursaries, Scholarships & Grants',
    description: 'Compare student funding options for tuition, accommodation, books, research and other study costs.', eyebrow: 'Student funding guide',
    answer: 'Student funding can include bursaries, scholarships, grants and institution support. Use this page to compare current opportunities by country and type, then verify coverage and eligibility at the official source.',
    keywords: ['student funding', 'university funding', 'education grants', 'tuition funding'], group: 'funding', defaultType: 'student_funding',
    highlights: [{ title: 'Know the funding type', text: 'Check whether support is a grant, scholarship, bursary, loan or conditional award.' }, { title: 'Compare real coverage', text: 'Tuition-only support is different from full-cost funding with living expenses.' }, { title: 'Protect your information', text: 'Apply on the provider’s official domain and be cautious of requests for unexpected fees or credentials.' }],
    faqs: [{ question: 'What can student funding cover?', answer: 'Depending on the programme, support may cover tuition, registration, accommodation, meals, books, devices, transport, research or a living allowance.' }, { question: 'Is all student funding based on household income?', answer: 'No. Some awards are need-based, while others focus on merit, a field of study, research, geography or future employment.' }, { question: 'Where is the final application submitted?', answer: 'Submit through the funder or institution named in the official listing. Sduella is a discovery and explanation layer.' }], sources: [...SA_SOURCES, ...GLOBAL_STUDY_SOURCES],
  },
  nsfasAlternatives: {
    path: '/nsfas-alternatives', title: 'NSFAS Alternatives: Other Bursaries & Student Funding',
    description: 'Explore alternatives to NSFAS, including corporate bursaries, scholarships, university support and other official funding programmes.', eyebrow: 'Beyond one funding route',
    answer: 'If NSFAS does not cover your situation, consider corporate bursaries, government-department awards, professional-body funding, university assistance and international scholarships. Each programme has its own criteria and application process.',
    keywords: ['NSFAS alternatives', 'bursaries other than NSFAS', 'student funding without NSFAS', 'corporate bursaries'], group: 'funding', defaultSearch: 'bursary scholarship',
    highlights: [{ title: 'Corporate bursaries', text: 'Employers may fund priority qualifications and can include vacation work or post-study obligations.' }, { title: 'Institution support', text: 'University financial-aid and faculty offices may publish donor awards or emergency support.' }, { title: 'Public and professional funds', text: 'Departments, councils and professional bodies can target specific fields, regions or skills.' }],
    faqs: [{ question: 'What can I apply for besides NSFAS?', answer: 'Options include corporate bursaries, departmental schemes, university donor funding, scholarships, professional-body awards and some student loans.' }, { question: 'Can I apply while waiting for an NSFAS decision?', answer: 'Often yes, but every funder sets its own rules. Disclose pending or confirmed support and avoid accepting incompatible duplicate funding.' }, { question: 'Where should I ask for institution-specific help?', answer: 'Contact your institution’s financial-aid, postgraduate-funding or student-support office and use its official website or portal.' }], sources: SA_SOURCES,
  },
  jobs: {
    path: '/jobs', title: 'Jobs, Internships, Learnerships & Early Careers',
    description: 'Search live jobs and early-career opportunities, including internships, learnerships and apprenticeships, with links to official providers.', eyebrow: 'Live work opportunities',
    answer: 'Search current jobs, internships, learnerships and apprenticeships from connected providers. Filter by country and location, review the role details and continue to the original listing to apply.',
    keywords: ['jobs', 'jobs South Africa', 'early careers', 'graduate jobs', 'entry level jobs'], group: 'jobs', defaultType: 'all',
    highlights: [{ title: 'Search by pathway', text: 'Separate jobs, internships, learnerships and apprenticeships to match the experience you need.' }, { title: 'Read location conditions', text: 'Remote labels can still include country, time-zone or work-authorisation restrictions.' }, { title: 'Apply at the source', text: 'Use the original employer or provider destination and verify details before sharing personal information.' }],
    faqs: [{ question: 'Are these jobs live?', answer: 'Results are fetched from connected job providers. Availability can change quickly, so confirm the posting status and closing date on the original listing.' }, { question: 'What counts as an early-career opportunity?', answer: 'Early-career routes can include graduate roles, internships, learnerships, apprenticeships and entry-level positions.' }, { question: 'Does Sduella employ applicants?', answer: 'No. Sduella helps people discover listings from external employers and providers. Applications go to the organisation shown on the opportunity.' }], sources: WORK_SOURCES,
  },
  internships: {
    path: '/internships', title: 'Internships in South Africa & Abroad',
    description: 'Find current internships and graduate work-experience opportunities. Filter live results and apply through the original provider.', eyebrow: 'Work experience',
    answer: 'Browse internships that build practical experience for students, graduates and early-career applicants. Check the location, eligibility, duration and pay or stipend information before applying.',
    keywords: ['internships South Africa', 'graduate internships', 'paid internships', 'internships 2026'], group: 'jobs', defaultType: 'internship',
    highlights: [{ title: 'Check who can apply', text: 'Some internships require current enrolment, recent graduation or a specific qualification.' }, { title: 'Understand the terms', text: 'Compare duration, start date, work hours, location and whether compensation is stated.' }, { title: 'Tailor the application', text: 'Use the role description to focus your CV and motivation on relevant evidence.' }],
    faqs: [{ question: 'Are all internships paid?', answer: 'No. Pay and stipend rules vary by provider and jurisdiction. Treat compensation as unconfirmed unless the official listing states it.' }, { question: 'Can students apply before graduating?', answer: 'Some internships are specifically for enrolled students, while graduate programmes require a completed qualification. Check each eligibility section.' }, { question: 'How do I verify an internship?', answer: 'Confirm the employer domain, role details and application destination. Never pay an unexpected fee to apply for a job.' }], sources: WORK_SOURCES,
  },
  learnerships: {
    path: '/learnerships', title: 'Learnerships in South Africa: Earn While You Learn',
    description: 'Find current learnerships in South Africa with structured learning and workplace experience. Check requirements and official application links.', eyebrow: 'South African learnerships',
    answer: 'A learnership combines structured learning with workplace experience toward an occupational or registered qualification. Search current opportunities, confirm the provider and requirements, and apply through the official destination.',
    keywords: ['learnerships 2026', 'learnerships South Africa', 'learnerships that pay', 'SETA learnerships'], group: 'jobs', defaultType: 'learnership', defaultCountry: 'za',
    highlights: [{ title: 'Learning plus work', text: 'A learnership includes formal learning and supervised workplace experience.' }, { title: 'Check entry criteria', text: 'Age, education, location, employment status and qualification rules differ by programme.' }, { title: 'Confirm registration', text: 'Use the employer, training provider and relevant official bodies to verify important claims.' }],
    faqs: [{ question: 'Do learnerships pay a stipend?', answer: 'Many programmes provide an allowance, but the amount and conditions vary. Rely on the official agreement and provider listing.' }, { question: 'Do I need work experience?', answer: 'Not always. Learnerships are designed to build skills, but each opportunity sets its own education and experience requirements.' }, { question: 'Where do I apply?', answer: 'Apply to the employer, training provider or programme owner named in the official listing.' }], sources: WORK_SOURCES,
  },
  apprenticeships: {
    path: '/apprenticeships', title: 'Apprenticeships & Artisan Training Opportunities',
    description: 'Search current apprenticeships and artisan training routes with workplace experience and official application links.', eyebrow: 'Artisan and technical pathways',
    answer: 'Find apprenticeships that combine technical learning with supervised workplace training. Confirm the trade, entry subjects, programme length, location and assessment route before applying.',
    keywords: ['apprenticeships South Africa', 'artisan training', 'engineering apprenticeships', 'trade apprenticeships'], group: 'jobs', defaultType: 'apprenticeship',
    highlights: [{ title: 'Match the trade', text: 'Check the exact occupation and whether your school subjects or technical qualification meet entry rules.' }, { title: 'Expect workplace learning', text: 'Apprenticeships depend on supervised practical experience as well as theoretical learning.' }, { title: 'Verify the provider', text: 'Confirm the employer, training institution and recognised assessment route at official sources.' }],
    faqs: [{ question: 'What is the difference between an apprenticeship and a learnership?', answer: 'Both combine learning and work, but apprenticeships are commonly tied to a specific trade and artisan pathway. Programme rules determine the exact structure.' }, { question: 'Which school subjects may be required?', answer: 'Requirements vary by trade and can include mathematics, physical science or technical subjects. Use the official listing.' }, { question: 'Are apprentices employees?', answer: 'Contract and employment arrangements vary. Review the official agreement, pay terms and workplace conditions.' }], sources: WORK_SOURCES,
  },
  startupFunding: {
    path: '/startup-funding', title: 'Startup Funding in South Africa: Grants & Programmes',
    description: 'Find startup funding, entrepreneur grants and business-support programmes in South Africa, with official application links.', eyebrow: 'Startup capital and support',
    answer: 'Search grants and funding programmes for founders building or launching a venture. Compare stage, sector, ownership, location, matching-fund and reporting requirements before applying.',
    keywords: ['startup funding South Africa', 'startup grants', 'entrepreneur funding', 'small business funding'], group: 'business', defaultType: 'business_funding',
    highlights: [{ title: 'Know your stage', text: 'Idea, pre-revenue, early trading and growth-stage businesses may qualify for different programmes.' }, { title: 'Prepare business evidence', text: 'Applications may request registration documents, ownership records, a plan, forecasts and market evidence.' }, { title: 'Understand the instrument', text: 'A grant, loan, equity investment, competition and accelerator offer different obligations.' }],
    faqs: [{ question: 'Where can South African startups find funding?', answer: 'Founders can look at public agencies, development-finance institutions, competitions, accelerators, corporate programmes and private investors.' }, { question: 'Is startup funding always a grant?', answer: 'No. Support can be a grant, loan, equity investment, guarantee, competition award or a programme that provides services instead of cash.' }, { question: 'What should I prepare?', answer: 'Prepare a concise business description, ownership and registration records, market evidence, budgets or forecasts, milestones and the documents requested by the provider.' }], sources: BUSINESS_SOURCES,
  },
  businessGrants: {
    path: '/business-grants', title: 'Business Grants in South Africa for Small Businesses',
    description: 'Search current business grants and non-repayable support programmes for eligible South African enterprises.', eyebrow: 'Business grants',
    answer: 'Find grant programmes for eligible enterprises, founders and projects. Confirm that the support is genuinely non-repayable and check ownership, sector, location, contribution and reporting conditions.',
    keywords: ['business grants South Africa', 'small business grants', 'SME funding', 'enterprise grants'], group: 'business', defaultType: 'grant',
    highlights: [{ title: 'Check grant conditions', text: 'Non-repayable support can still require milestones, reporting, approved spending and evidence.' }, { title: 'Avoid funding scams', text: 'Verify the provider domain and be cautious of unexpected upfront fees or guarantees of approval.' }, { title: 'Submit complete records', text: 'Business registration, tax, ownership, banking and financial records may be required.' }],
    faqs: [{ question: 'Does a business grant need to be repaid?', answer: 'A genuine grant is generally non-repayable when its conditions are met, but misspending or breach can trigger recovery. Read the agreement.' }, { question: 'Are grants available for informal businesses?', answer: 'Some programmes support informal or early-stage businesses, while others require registration and compliance records. Eligibility varies.' }, { question: 'Can a funder charge an application fee?', answer: 'Some legitimate programmes may have administrative terms, but unexpected fees are a warning sign. Verify the charge directly with the official provider.' }], sources: BUSINESS_SOURCES,
  },
};
