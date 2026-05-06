export interface FundingTypeEntry {
  id: string;
  label: string;
  tag: string;
  color: string;
  headline: string;
  summary: string;
  how: { step: string; title: string; desc: string }[];
  who: string;
  faqs: { q: string; a: string }[];
  cta: { label: string; href: string };
}

export const FUNDING_TYPES: FundingTypeEntry[] = [
  {
    id: 'bursary',
    label: 'Bursary',
    tag: 'Most Common',
    color: 'text-blue bg-blue/8',
    headline: 'What is a Bursary?',
    summary: "A bursary is financial aid paid directly toward your tuition, accommodation, or study costs — you don't repay it. Most bursaries in South Africa come with a work-back agreement: once you graduate, you work for the funder for a set number of years.",
    how: [
      { step: '01', title: 'Apply', desc: 'Submit your academic records, proof of income, and motivation letter to the provider before the deadline.' },
      { step: '02', title: 'Interview / Assessment', desc: 'Shortlisted applicants go through an interview or online assessment. Some providers require a home visit to verify financial need.' },
      { step: '03', title: 'Award Letter', desc: 'Successful applicants receive a bursary agreement outlining what is covered, for how long, and any conditions (e.g., minimum grades, work-back).' },
      { step: '04', title: 'Direct Payment', desc: 'Funds are paid directly to your institution — never to you in cash. Registration and tuition are cleared at source.' },
    ],
    who: 'South African citizens, typically with a household income below a threshold (varies by provider), enrolled full-time at a public university or TVET college.',
    faqs: [
      { q: 'Do I repay a bursary?', a: "No — bursaries are non-repayable grants. However, many corporate bursaries include a work-back clause: if you don't work for the funder after graduating, the bursary converts to a loan." },
      { q: 'Can I have a bursary and NSFAS?', a: "Generally no — NSFAS requires you to have no other full bursary. Partial bursaries may be stackable. Check with your institution." },
      { q: 'What happens if I fail?', a: 'Most bursaries are cancelled if you fail to meet minimum academic performance criteria (usually 50–65%). Some allow one failed module before cancellation.' },
    ],
    cta: { label: 'Browse Bursaries', href: '/bursaries?type=Bursary' },
  },
  {
    id: 'learnership',
    label: 'Learnership',
    tag: 'Bridge to Work',
    color: 'text-green bg-green/8',
    headline: 'What is a Learnership?',
    summary: 'A learnership is a structured workplace learning programme registered by a SETA (Sector Education and Training Authority). It combines theory with on-the-job training and results in a nationally recognised NQF qualification — while you earn a monthly stipend.',
    how: [
      { step: '01', title: 'Find an Opening', desc: 'Learnerships are advertised by companies funded by SETAs. Check company career pages, SA Youth.mobi, or SETA websites.' },
      { step: '02', title: 'Apply', desc: 'Submit your ID, Matric certificate, and CV. Most learnerships require Grade 12 and no prior formal employment.' },
      { step: '03', title: 'Training Begins', desc: 'You split time between classroom learning (theory) and the workplace (practical). Duration is typically 12 months.' },
      { step: '04', title: 'NQF Certificate', desc: 'On completion you receive a nationally recognised qualification (NQF Level 3–5) and a work reference — the bridge to permanent employment.' },
    ],
    who: 'Unemployed South African youth aged 18–35, typically with a Matric (Grade 12) certificate. No prior work experience required for most learnerships.',
    faqs: [
      { q: 'Is a learnership a job?', a: "Not exactly — you're a learner, not an employee. You earn a stipend (R2,500–R8,500/month) rather than a salary, and you're registered as a learner under the Skills Development Act." },
      { q: 'Do I get a certificate?', a: 'Yes. Learnerships are aligned to the NQF, so you receive a nationally recognised qualification (e.g., NQF Level 4 in Banking, NQF Level 3 in IT Support).' },
      { q: 'Can my employer hire me after?', a: 'Many companies use learnerships as a recruitment pipeline. Strong performers are often offered permanent positions at the end of the 12 months.' },
    ],
    cta: { label: 'Browse Learnerships', href: '/learnerships' },
  },
  {
    id: 'scholarship',
    label: 'Scholarship',
    tag: 'Merit-Based',
    color: 'text-black bg-grey-100',
    headline: 'What is a Scholarship?',
    summary: "A scholarship is merit-based financial support awarded for academic achievement, sporting excellence, or special talent — not primarily for financial need. Unlike bursaries, scholarships often have no work-back obligation.",
    how: [
      { step: '01', title: 'Meet the Criteria', desc: 'Scholarships are highly competitive. Academic scholarships typically require 80%+ average. Sports scholarships require provincial or national representation.' },
      { step: '02', title: 'Apply Early', desc: 'Many scholarships close months before the academic year begins. Applications often open in March–August of the prior year.' },
      { step: '03', title: 'Selection Process', desc: 'Shortlisted candidates may be invited for an interview, portfolio review, or practical assessment depending on the scholarship type.' },
      { step: '04', title: 'Award & Renew', desc: 'Awards are typically annual and renewable subject to maintaining the required academic average. Failure to maintain grades results in withdrawal.' },
    ],
    who: 'High-achieving students. Academic scholarships target top performers (80%+). Some focus on leadership, entrepreneurship, or social impact. Financial need is secondary.',
    faqs: [
      { q: "Scholarship vs Bursary — what's the difference?", a: 'Scholarships are primarily merit-based with no work-back obligation. Bursaries are primarily need-based and often include a work-back agreement.' },
      { q: 'Can I apply for both a scholarship and a bursary?', a: "Potentially yes, but check the terms of each. Some funders prohibit stacking. NSFAS generally cannot be combined with a full scholarship." },
    ],
    cta: { label: 'Browse Scholarships', href: '/bursaries?type=Scholarship' },
  },
  {
    id: 'fellowship',
    label: 'Fellowship',
    tag: 'Postgraduate',
    color: 'text-blue bg-blue/5 border border-blue/20',
    headline: 'What is a Fellowship?',
    summary: 'A fellowship is postgraduate funding — typically for Honours, Masters, or PhD students — that combines financial support with mentorship, research access, and professional development. Fellowships are among the most prestigious forms of academic funding.',
    how: [
      { step: '01', title: 'Accepted to Postgrad', desc: 'You must already be enrolled in or accepted for a postgraduate programme. Fellowships fund study at this level, not undergraduate.' },
      { step: '02', title: 'Detailed Application', desc: "Applications require a research proposal, academic transcripts, two or more references, and a personal statement. These are thorough and competitive." },
      { step: '03', title: 'Selection', desc: "Fellowships are typically awarded by a panel. Selection criteria include academic record, research potential, and alignment with the funder's area of interest." },
      { step: '04', title: 'Research & Report', desc: 'Fellows are expected to produce research outputs — papers, presentations, or theses — and often present to the funding organisation.' },
    ],
    who: 'Honours, Masters, or PhD students with strong academic records and a clear research focus. Some fellowships target specific disciplines (CS, public health, law).',
    faqs: [
      { q: 'Can I work while on a fellowship?', a: 'Most fellowships allow or require part-time academic work (tutoring, research assistance). Full-time external employment is usually prohibited.' },
      { q: 'Is a fellowship renewable?', a: 'Yes, most multi-year fellowships are renewed annually based on progress reports and continued enrolment.' },
    ],
    cta: { label: 'Browse Fellowships', href: '/bursaries?type=Fellowship' },
  },
  {
    id: 'grant',
    label: 'Grant',
    tag: 'Research & Projects',
    color: 'text-grey-600 bg-grey-100',
    headline: 'What is a Research Grant?',
    summary: 'A grant is project- or research-specific funding — not tied to your living costs, but to a specific academic goal. Grants cover equipment, fieldwork, data collection, publication costs, or conference attendance.',
    how: [
      { step: '01', title: 'Define Your Project', desc: 'Grants are awarded for specific research questions. Your application must clearly define the problem, methodology, timeline, and budget.' },
      { step: '02', title: 'Apply to the Funder', desc: 'Grants are offered by the NRF, MRC, DSI, universities, and international bodies. Each has its own portal and requirements.' },
      { step: '03', title: 'Peer Review', desc: 'Most research grants go through a peer-review process. External experts assess the scientific merit of your proposal.' },
      { step: '04', title: 'Reporting & Accountability', desc: 'Grant recipients must submit progress reports and financial statements. Unused funds must typically be returned.' },
    ],
    who: 'Registered researchers, postgraduate students, and academics at accredited institutions. Some grants are available to community organisations for education-related projects.',
    faqs: [
      { q: 'Can an undergraduate student get a grant?', a: 'Rarely — most research grants target postgraduate students or academic staff. Some institutions offer small "seed grants" for exceptional undergrad researchers.' },
    ],
    cta: { label: 'Browse Grants', href: '/bursaries?type=Grant' },
  },
  {
    id: 'yes',
    label: 'YES Programme',
    tag: 'Work Experience',
    color: 'text-green bg-green/5 border border-green/20',
    headline: 'What is the YES Programme?',
    summary: "The Youth Employment Service (YES) is a government-supported initiative where South African companies provide one-year paid work experiences to unemployed youth. It's not a learnership or internship — it's structured employment with real responsibilities.",
    how: [
      { step: '01', title: 'Company Applies', desc: 'Companies sign up to the YES Programme and commit to hiring a certain number of youth. The government offers B-BBEE incentives in return.' },
      { step: '02', title: 'Placement', desc: 'Selected youth are placed in real roles at the company for 12 months. You work, you earn a stipend (typically R3,500–R5,500/month), and you gain real references.' },
      { step: '03', title: 'Skills Development', desc: 'YES participants often receive digital skills training and access to online courses (via Digify Africa and similar partners) alongside their work placement.' },
      { step: '04', title: 'End of Programme', desc: 'At the end of 12 months, some participants are absorbed permanently. Others move on with a year of real work experience and a strong reference.' },
    ],
    who: 'Unemployed South African youth aged 18–35 with a Grade 12 or higher. Some YES placements require a degree or diploma for professional roles.',
    faqs: [
      { q: 'Is YES Programme a job?', a: "It's a 12-month work experience contract — not permanent employment. You're paid a stipend, not a full salary. But it counts as real work experience on your CV." },
      { q: 'How do I find YES Programme opportunities?', a: 'Check company career pages (Nedbank, Woolworths, Discovery), SA Youth.mobi, and the YES website at yes4youth.co.za.' },
    ],
    cta: { label: 'Browse YES Programmes', href: '/bursaries?type=YES+Programme' },
  },
];
