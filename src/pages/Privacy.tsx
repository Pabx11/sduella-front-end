import React from 'react';
import { ArrowRight } from 'lucide-react';

const SECTIONS = [
  {
    title: '1. Information We Collect',
    body: `We collect information you provide directly when creating an account, submitting an application, or making a donation. This includes:

• Identity: full name, South African ID number, date of birth
• Contact: email address, phone number, physical address
• Academic: institution, year of study, student number, academic records
• Financial: bank account details (disbursement only), donation amounts
• Device & usage: browser type, IP address, pages visited (automatic)

We never collect more information than is strictly necessary.`,
  },
  {
    title: '2. How We Use Your Information',
    body: `Your information is used exclusively to:

• Verify identity and eligibility for funding
• Process applications and disburse approved funds directly to institutions
• Process donor contributions and issue tax receipts
• Communicate updates on application or donation status
• Send our newsletter (only if subscribed)
• Comply with applicable South African law (POPIA)

We do not use your data for advertising. We do not sell or share it with third parties for commercial purposes.`,
  },
  {
    title: '3. Data Storage & Security',
    body: `All data is stored on encrypted servers located within South Africa. We use industry-standard TLS encryption for all data in transit. Access to personal data is restricted to authorised Sduella committee members on a strict need-to-know basis.

We retain your data for as long as your account is active or as required by law. Applications are retained for a minimum of 5 years for audit and compliance purposes. You may request deletion of non-statutory data at any time.`,
  },
  {
    title: '4. Your Rights (POPIA)',
    body: `Under the Protection of Personal Information Act (POPIA), you have the right to:

• Access the personal information we hold about you
• Request correction of inaccurate information
• Request deletion of your personal data (subject to legal retention requirements)
• Object to the processing of your data
• Lodge a complaint with the Information Regulator of South Africa

To exercise these rights, contact us at privacy@sduella.org.`,
  },
  {
    title: '5. Cookies',
    body: `We use strictly necessary cookies to maintain your session. We do not use tracking or advertising cookies. You may disable cookies in your browser, but this may affect certain platform features.`,
  },
  {
    title: '6. Third-Party Services',
    body: `We use a limited number of trusted third-party providers for payment processing and email delivery. These providers are contractually bound to process your data only as instructed by Sduella and in compliance with POPIA.`,
  },
  {
    title: '7. Changes to This Policy',
    body: `We may update this policy as our services evolve. Material changes will be communicated via email at least 30 days before taking effect. Continued use after that period constitutes acceptance.`,
  },
  {
    title: '8. Contact',
    body: `For any privacy-related queries:\n\nprivacy@sduella.org\nSduella Community Education Fund\nJohannesburg, South Africa`,
  },
];

export default function Privacy() {
  return (
    <div className="pt-[62px]">
      {/* Hero */}
      <section className="bg-off-white border-b border-grey-200 py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">Legal</span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-6 leading-[0.9]">Privacy Policy</h1>
          <p className="text-grey-600 leading-relaxed max-w-2xl">
            This policy explains how Sduella Community Education Fund collects, uses, and protects your personal information in accordance with the Protection of Personal Information Act (POPIA).
          </p>
          <p className="text-[11px] text-grey-400 mt-4 font-syne font-semibold tracking-wide">Last updated: 1 May 2026</p>
        </div>
      </section>

      {/* Sections */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {SECTIONS.map((s, i) => (
            <div key={i} className="border-b border-grey-100 pb-12 last:border-0">
              <h2 className="text-xl font-extrabold mb-5">{s.title}</h2>
              <div className="text-grey-600 text-sm leading-relaxed whitespace-pre-line">{s.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 px-6 md:px-12 bg-off-white border-t border-grey-200">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-grey-500">Questions about this policy?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-syne font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-black/90 transition-colors"
          >
            Contact Our Information Officer <ArrowRight size={14} />
          </a>
        </div>
      </section>
    </div>
  );
}
