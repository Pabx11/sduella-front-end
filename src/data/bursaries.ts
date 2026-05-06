export type FundingType = 'Bursary' | 'Scholarship' | 'Fellowship' | 'Grant' | 'Learnership' | 'YES Programme';

export interface FundingListing {
  type: FundingType;
  provider: string;
  title: string;
  coverage: string;
  fields: string[];
  deadline: string;
  url: string;
  description: string;
}

export const FUNDING_LISTINGS: FundingListing[] = [
  {
    type: 'Bursary',
    provider: "NSFAS",
    title: "National Student Financial Aid Scheme",
    coverage: "Tuition, Accommodation, Living Allowance, Transport & Books",
    fields: ["All Fields"],
    deadline: "Nov 2026",
    url: "https://my.nsfas.org.za",
    description: "Government-funded bursary for students at public universities and TVET colleges from households earning R350,000 or less per year (R600,000 for students with disabilities). Covers all study-related costs."
  },
  {
    type: 'Bursary',
    provider: "Sasol",
    title: "Mainstream Bursary Programme 2027",
    coverage: "Full Tuition, Living Allowance & Psychosocial Support",
    fields: ["Engineering", "Chemistry", "Data Science", "Geology"],
    deadline: "17 May 2026",
    url: "https://www.sasolbursaries.com",
    description: "One of South Africa's most comprehensive corporate bursaries. Open to South African citizens under 30 studying full-time at an accredited SA university. Pure Mathematics required. No UNISA."
  },
  {
    type: 'Bursary',
    provider: "Standard Bank",
    title: "Group Bursary Programme 2026/2027",
    coverage: "Full Tuition, Accommodation, Laptop, Stipend & Mentoring",
    fields: ["Engineering", "Commerce", "Science", "IT", "Actuarial Science", "Finance"],
    deadline: "30 Sept 2026",
    url: "https://www.standardbank.com/sbg/standard-bank-group/careers/early-careers/bursaries",
    description: "Available for 2nd year through postgraduate (Masters) level students with a minimum 65% academic average. Submitted via the StudyTrust portal. Full funding with mentoring and potential internship."
  },
  {
    type: 'Bursary',
    provider: "Vodacom",
    title: "Bursary Programme 2027",
    coverage: "Full Tuition, Accommodation, Textbooks, Laptop, Cellphone & Meals",
    fields: ["Engineering", "Computer Science", "IT", "Mathematics", "Science"],
    deadline: "Jun 2026",
    url: "https://www.vodacom.com/bursary-programme.php",
    description: "Full STEM bursary for South African students born in SA with a 70%+ Grade 12 average. Includes vacation work, workplace exposure and work readiness training."
  },
  {
    type: 'Bursary',
    provider: "IDC",
    title: "External Bursary Scheme 2027",
    coverage: "Full Tuition, Accommodation, Laptop, Meal & Transport Allowance",
    fields: ["Engineering", "Science", "Commerce", "Law", "IT"],
    deadline: "Sept 2026",
    url: "https://protected.idc.co.za/BursaryPortal",
    description: "Industrial Development Corporation bursary for South African citizens under 26 from households earning up to R350,000. Requires 75% matric average or 65% university GPA. Not for employed applicants."
  },
  {
    type: 'Bursary',
    provider: "Nedbank",
    title: "Bursary Programme 2027",
    coverage: "Full Tuition & Study Costs",
    fields: ["Engineering", "Science", "IT", "Mathematics", "Green Economy"],
    deadline: "Apr 2026",
    url: "https://www.nedbank.co.za/content/nedbank/desktop/gt/en/aboutus/corporate-citizenship/education/bursaries.html",
    description: "For undergraduate and Honours students in STEM and green economy fields. Minimum 65% average required; pure Mathematics is mandatory. Financial need considered."
  },
  {
    type: 'Bursary',
    provider: "Investec",
    title: "CSI Bursary Programme",
    coverage: "Full Tuition, Books & Stipend",
    fields: ["Accounting", "IT", "Mathematics", "Commerce", "Engineering"],
    deadline: "Oct 2026",
    url: "https://www.investec.com/en_za/welcome-to-investec/corporate-responsibility/education/bursaries.html",
    description: "For students from disadvantaged backgrounds with exceptional academic potential. Minimum 70% for Mathematics (not Mathematical Literacy) required in matric results."
  },
  {
    type: 'Bursary',
    provider: "Eskom",
    title: "Bursary Programme 2026",
    coverage: "Full Tuition + Study Costs",
    fields: ["Engineering"],
    deadline: "Check site",
    url: "https://www.eskom.co.za/careers/bursaries",
    description: "Open to engineering students studying towards an accredited degree at a recognised South African public university or university of technology. Apply via the Eskom careers portal."
  },
  {
    type: 'Bursary',
    provider: "Transnet",
    title: "Bursary Programme 2026",
    coverage: "Tuition & Study Costs",
    fields: ["Engineering", "IT", "Supply Chain", "Finance"],
    deadline: "Check site",
    url: "https://bursaryconnect.transnet.net",
    description: "Transnet offers bursaries across technical and non-technical fields supporting South Africa's freight and logistics infrastructure. Apply via the dedicated Transnet BursaryConnect portal."
  },
  {
    type: 'Bursary',
    provider: "Funza Lushaka",
    title: "Teaching Bursary 2027",
    coverage: "Full Tuition, Accommodation, Books, Meals, Teaching Practice & Living Allowance",
    fields: ["Education", "Teaching"],
    deadline: "Oct 2026",
    url: "https://www.teachSA.org.za",
    description: "Department of Basic Education bursary for South African citizens under 30 pursuing a B.Ed. at any public university. Priority given to shortage subjects. Recipients must teach at a public school post-graduation."
  },
  {
    type: 'Bursary',
    provider: "Old Mutual",
    title: "Actuarial Science Bursary",
    coverage: "Full Tuition, Accommodation, Books, Travel Allowance & Guaranteed Employment",
    fields: ["Actuarial Science", "Mathematics", "Statistics"],
    deadline: "30 Sept 2026",
    url: "https://www.oldmutual.co.za/careers/bursaries",
    description: "Comprehensive bursary for actuarial science students including performance incentives and a guaranteed employment offer upon completion. One of the most competitive bursaries in financial services."
  },
  {
    type: 'Bursary',
    provider: "Sanlam",
    title: "Actuarial Science Bursary 2027",
    coverage: "Full Tuition & Living Costs + Job Offer on Graduation",
    fields: ["Actuarial Science", "Mathematics", "Statistics"],
    deadline: "30 Jun 2026",
    url: "https://www.sanlam.co.za/careers/bursaries",
    description: "For matriculants and current undergraduates pursuing Actuarial Science. Full financial support plus a guaranteed position at Sanlam upon successful graduation."
  },
  {
    type: 'Bursary',
    provider: "SAICA / Thuthuka",
    title: "Thuthuka Bursary Fund",
    coverage: "Full Tuition, Accommodation & Career Support",
    fields: ["Accounting", "Finance", "CA(SA)"],
    deadline: "31 Aug 2026",
    url: "https://www.thuthukabursaryfund.co.za",
    description: "Supports Black African and Coloured students pursuing the CA(SA) qualification. Provides full financial support plus tutoring, mentoring and networking opportunities throughout the programme."
  },
  {
    type: 'Bursary',
    provider: "KPMG",
    title: "Training Programme Bursary",
    coverage: "Up to R150,000",
    fields: ["Accounting", "Finance", "CA(SA)"],
    deadline: "31 Mar 2026",
    url: "https://www.kpmg.com/za/en/home/careers/students.html",
    description: "KPMG South Africa funds top accounting students on the CA(SA) path, with a view to joining KPMG as a trainee accountant after graduating."
  },
  {
    type: 'Bursary',
    provider: "Masakh'iSizwe",
    title: "Built Environment Bursary (Western Cape)",
    coverage: "Full Tuition, Accommodation, Meals, Transport & Internship Assistance",
    fields: ["Engineering", "Architecture", "Quantity Surveying", "Construction"],
    deadline: "31 Aug 2026",
    url: "https://www.westerncape.gov.za/masakhisizwe",
    description: "Western Cape Government initiative for disadvantaged students in engineering and the built environment. Recipients must study at a Western Cape institution. Includes work-integrated learning support."
  },
  {
    type: 'Bursary',
    provider: "Anglo American",
    title: "Chairman's Bursary",
    coverage: "Up to R180,000 per year",
    fields: ["Engineering", "Mining", "Geology", "Metallurgy"],
    deadline: "31 Aug 2026",
    url: "https://www.angloamerican.com/careers/bursaries",
    description: "For students pursuing mining, engineering and earth science disciplines. Includes a work-back obligation and vacation work at Anglo American operations. Academically competitive."
  },
  {
    type: 'Bursary',
    provider: "MTN Group",
    title: "Bursary & Tuition Clearance Programme",
    coverage: "Outstanding Tuition Fee Clearance",
    fields: ["IT", "Computer Science", "Engineering", "Telecommunications"],
    deadline: "26 Apr 2026",
    url: "https://www.mtn.com/careers/bursaries",
    description: "MTN helps clear outstanding tuition fees for ICT/MICT students at South African institutions, allowing them to continue their studies uninterrupted."
  },
  {
    type: 'Bursary',
    provider: "Shoprite Group",
    title: "Bursary Programme 2026",
    coverage: "Full Tuition & Study Costs + Development",
    fields: ["Accounting", "Agriculture", "Retail Management", "Supply Chain", "IT"],
    deadline: "31 May 2026",
    url: "https://www.shopriteholdings.co.za/careers/bursaries.html",
    description: "South Africa's largest retailer funds students in fields aligned with its business. Includes mentoring and potential employment upon completion."
  },
  {
    type: 'Bursary',
    provider: "Rand Water",
    title: "Bursary Programme 2026",
    coverage: "Full Tuition & Study Costs",
    fields: ["Civil Engineering", "Science", "Engineering"],
    deadline: "7 May 2026",
    url: "https://www.randwater.co.za/careers/bursaries",
    description: "Rand Water provides bursaries for students in civil engineering and related disciplines who are interested in the water sector. Work-back commitment required post-graduation."
  },
  {
    type: 'Bursary',
    provider: "SAICE",
    title: "Civil Engineering Bursary",
    coverage: "Partial Tuition Support",
    fields: ["Civil Engineering"],
    deadline: "31 Jul 2026",
    url: "https://www.saice.org.za/bursaries",
    description: "South African Institution of Civil Engineering bursary for undergraduate civil engineering students at accredited South African universities."
  },
  {
    type: 'Bursary',
    provider: "MRC",
    title: "Health Sciences Research Bursary",
    coverage: "Up to R120,000",
    fields: ["Medicine", "Health Sciences", "Biomedical Sciences", "Nursing"],
    deadline: "31 May 2026",
    url: "https://www.mrc.ac.za/bursaries",
    description: "South African Medical Research Council bursary supporting postgraduate and research students in health and medical sciences. Prioritises research that addresses South African public health challenges."
  },
  {
    type: 'Scholarship',
    provider: "Mandela Rhodes Foundation",
    title: "Postgraduate Scholarship",
    coverage: "Full Postgraduate Funding",
    fields: ["All Fields"],
    deadline: "Apr 2027",
    url: "https://www.mandela-rhodes-foundation.org",
    description: "Prestigious postgraduate scholarship for outstanding South African students at Honours and Masters level. Focuses on leadership development, reconciliation and social impact alongside academic excellence."
  },
  {
    type: 'Fellowship',
    provider: "Allan Gray Orbis Foundation",
    title: "Fellowship Bursary 2027",
    coverage: "Full Tuition & Development Programme",
    fields: ["All Fields"],
    deadline: "30 Apr 2026",
    url: "https://www.allangrayorbis.org/bursary",
    description: "Targeted at entrepreneurially-minded students with exceptional potential. Covers full university costs and includes a comprehensive leadership and entrepreneurship development programme."
  },
  {
    type: 'Fellowship',
    provider: "Google",
    title: "PhD Fellowship Programme",
    coverage: "Full Tuition, Stipend & Conference Funding",
    fields: ["Computer Science", "Data Science", "AI", "Machine Learning"],
    deadline: "30 Apr 2026",
    url: "https://research.google/outreach/phd-fellowship/",
    description: "Highly competitive fellowship for PhD candidates in computer science and related fields. Includes direct mentorship from Google researchers and funding for conferences and research expenses."
  },
  {
    type: 'Learnership',
    provider: "ABSA Bank",
    title: "ABSA Transactional Banking Learnership",
    coverage: "Monthly Stipend R5,000 – R6,500",
    fields: ["Finance", "Banking", "Commerce"],
    deadline: "30 Jun 2026",
    url: "https://www.absa.co.za/careers/learnerships",
    description: "12-month structured learnership with ABSA in transactional banking operations. NQF Level 5. Registered under BANKSETA. Includes practical workplace training with certificate upon completion. No experience required."
  },
  {
    type: 'Learnership',
    provider: "FNB",
    title: "IT & Software Development Learnership",
    coverage: "Monthly Stipend R5,500 – R7,000",
    fields: ["IT", "Computer Science", "Software Development"],
    deadline: "15 Jul 2026",
    url: "https://www.fnb.co.za/about-fnb/careers/learnerships.html",
    description: "12-month learnership in software development and IT support with First National Bank. NQF Level 5. Registered under MICT SETA. Candidates must have matric with Mathematics."
  },
  {
    type: 'Learnership',
    provider: "Vodacom",
    title: "ICT Technical Support Learnership",
    coverage: "Monthly Stipend R6,000 – R7,500",
    fields: ["Telecommunications", "IT", "Engineering"],
    deadline: "30 Jun 2026",
    url: "https://www.vodacom.com/careers/learnerships.php",
    description: "12-month ICT learnership registered under MICT SETA at NQF Level 4. Covers network infrastructure, technical support and customer service. Includes mentorship from senior engineers."
  },
  {
    type: 'Learnership',
    provider: "Eskom",
    title: "Electrical Engineering Learnership",
    coverage: "Monthly Stipend R7,000 – R9,000",
    fields: ["Engineering", "Electrical", "Energy"],
    deadline: "Check site",
    url: "https://www.eskom.co.za/careers/learnerships",
    description: "18-month electrical engineering learnership with South Africa's national power utility. NQF Level 4. Registered under EWSETA. Candidates should have matric with Mathematics and Physical Science."
  },
  {
    type: 'YES Programme',
    provider: "Nedbank",
    title: "YES 4 Youth Programme 2026",
    coverage: "Monthly Stipend R4,500 – R5,500",
    fields: ["Finance", "IT", "Commerce", "Banking"],
    deadline: "31 May 2026",
    url: "https://www.nedbank.co.za/content/nedbank/desktop/gt/en/aboutus/corporate-citizenship/yes4youth.html",
    description: "12-month paid work experience placement at Nedbank under the Youth Employment Service (YES) initiative. Open to unemployed youth aged 18–35 with matric. No prior experience required."
  },
  {
    type: 'YES Programme',
    provider: "Shoprite Group",
    title: "YES Youth Employment Programme",
    coverage: "Monthly Stipend R4,000 – R5,000",
    fields: ["Retail Management", "Supply Chain", "Finance", "IT"],
    deadline: "Rolling — check site",
    url: "https://www.shopriteholdings.co.za/careers/yes-programme.html",
    description: "One-year work experience programme across Shoprite's retail, logistics and corporate divisions. Aimed at unemployed youth aged 18–34. Participants receive a monthly stipend and workplace reference."
  },
  {
    type: 'Grant',
    provider: "NRF",
    title: "Postgraduate Research Grant 2026",
    coverage: "Up to R120,000 per year",
    fields: ["Science", "Engineering", "Humanities", "Social Sciences", "Health Sciences"],
    deadline: "30 Sept 2026",
    url: "https://www.nrf.ac.za/funding-opportunities/",
    description: "National Research Foundation postgraduate grants for Honours, Masters and PhD students conducting research at South African universities. Awarded on academic merit and research quality."
  },
  {
    type: 'Grant',
    provider: "DSI / TIA",
    title: "Technology Innovation Agency Student Grant",
    coverage: "Up to R80,000",
    fields: ["Technology", "Science", "Engineering", "Innovation"],
    deadline: "Jun 2026",
    url: "https://www.tia.org.za/funding",
    description: "Department of Science and Innovation / Technology Innovation Agency grants for student-led innovation and technology development projects. Open to registered South African university students."
  },
];

export const ALL_FUNDING_TYPES: FundingType[] = [
  'Bursary', 'Scholarship', 'Fellowship', 'Grant', 'Learnership', 'YES Programme'
];

export const TYPE_COLORS: Record<FundingType, string> = {
  'Bursary': 'bg-blue/10 text-blue',
  'Scholarship': 'bg-green/10 text-green',
  'Fellowship': 'bg-purple-100 text-purple-700',
  'Grant': 'bg-orange-100 text-orange-700',
  'Learnership': 'bg-yellow-100 text-yellow-700',
  'YES Programme': 'bg-pink-100 text-pink-700',
};
