export interface Allocation {
  label: string;
  pct: number;
  color: string;
}

export interface Principle {
  title: string;
  desc: string;
}

export interface CommitteeMember {
  name: string;
  role: string;
  org: string;
}

export interface Audit {
  period: string;
  auditor: string;
  status: string;
  outcome: string;
}

export const ALLOCATIONS: Allocation[] = [
  { label: 'Direct Student Disbursements', pct: 85, color: 'bg-blue' },
  { label: 'Verification & Administration', pct: 8, color: 'bg-black' },
  { label: 'Platform & Technology', pct: 4, color: 'bg-grey-400' },
  { label: 'Audit & Legal Compliance', pct: 3, color: 'bg-grey-300' },
];

export const PRINCIPLES: Principle[] = [
  {
    title: 'Zero Cash to Students',
    desc: "Disbursements go directly to institutions via EFT. No cash ever passes through a student's hands.",
  },
  {
    title: 'Open Ledger Policy',
    desc: 'All transactions above R500 are listed in our quarterly reports, accessible to any registered donor.',
  },
  {
    title: 'Independent Audit',
    desc: 'Our books are audited independently every quarter by a registered auditing firm.',
  },
  {
    title: 'Committee Recusal',
    desc: 'Any committee member with a conflict of interest in a specific application must recuse themselves.',
  },
  {
    title: 'POPIA Compliant',
    desc: "All personal data is handled in accordance with South Africa's Protection of Personal Information Act.",
  },
  {
    title: 'NPC Registration',
    desc: 'Sduella is a registered Non-Profit Company (NPC) under the South African Companies Act.',
  },
];

export const COMMITTEE: CommitteeMember[] = [
  { name: 'Dr. Ayanda Nkosi', role: 'Chairperson', org: 'Former NSFAS Director' },
  { name: 'Sipho Dlamini CA(SA)', role: 'Financial Officer', org: 'Chartered Accountant' },
  { name: 'Prof. Lindiwe Mokoena', role: 'Academic Liaison', org: 'University of Pretoria' },
  { name: 'Fatima Essop', role: 'Legal & Compliance', org: 'Advocate, Cape Bar' },
  { name: 'Tebogo Molefe', role: 'Student Representative', org: 'SASCO Alumni' },
];

export const AUDITS: Audit[] = [
  { period: 'Q1 2026 (Jan–Mar)', auditor: 'PwC South Africa', status: 'Completed', outcome: 'Unqualified opinion' },
  { period: 'Founding Period (2024–2025)', auditor: 'BDO South Africa', status: 'Completed', outcome: 'Unqualified opinion' },
];
