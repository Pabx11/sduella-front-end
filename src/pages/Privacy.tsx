import React from "react";
import { ArrowRight } from "lucide-react";

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: `We collect limited information when you use Sduella or choose to interact with certain features. This may include:

• Account information: name, email address and other information you provide when creating an account
• Contact information: information you provide when contacting us or subscribing to updates
• Preferences: saved opportunities, interests or other preferences linked to your use of the platform
• Device & usage information: browser type, IP address, device information, pages visited and interactions with the platform
• Cookie information: information collected through cookies and similar technologies

You can browse many opportunities on Sduella without providing sensitive personal information such as your South African ID number, banking details or academic records.`,
  },
  {
    title: "2. How We Use Your Information",
    body: `Your information may be used to:

• Operate and improve the Sduella platform
• Provide and personalise access to relevant opportunities
• Manage your account and saved opportunities
• Communicate important platform or account updates
• Send newsletters or opportunity updates where you have subscribed
• Understand how visitors use Sduella and improve our services
• Protect the platform against misuse, fraud and security threats
• Comply with applicable South African law, including POPIA

We do not sell your personal information to third parties.`,
  },
  {
    title: "3. Opportunities & External Applications",
    body: `Sduella helps users discover opportunities including jobs, internships, learnerships, bursaries, scholarships and funding opportunities.

These opportunities may be provided by employers, universities, government departments, funding organisations, businesses and other independent third parties.

Unless specifically stated otherwise, Sduella is not the employer, funder, bursary provider or organisation offering the opportunity.

When you follow an application link to an external website, any information you submit there is collected and processed by that organisation according to its own privacy policy and terms.`,
  },
  {
    title: "4. Data Storage & Security",
    body: `We take reasonable technical and organisational measures to protect personal information against unauthorised access, loss, misuse, alteration or disclosure.

Access to personal information is limited to authorised persons and service providers where access is necessary to operate Sduella.

We retain personal information only for as long as it is reasonably necessary for the purpose for which it was collected or where retention is required by law.

You may request deletion of personal information that we are not legally required to retain.`,
  },
  {
    title: "5. Your Rights (POPIA)",
    body: `Under the Protection of Personal Information Act (POPIA), you may have the right to:

• Access the personal information we hold about you
• Request correction of inaccurate or outdated information
• Request deletion of personal information where legally permitted
• Object to certain processing of your personal information
• Withdraw consent where processing is based on consent
• Lodge a complaint with the Information Regulator of South Africa

To exercise these rights, contact us at privacy@sduella.org.`,
  },
  {
    title: "6. Cookies & Advertising",
    body: `Sduella uses cookies and similar technologies to operate the platform, remember preferences, understand usage and improve performance.

Where advertising is displayed on Sduella, third-party advertising providers, including Google, may use cookies or similar technologies to serve and measure advertisements.

You can manage or disable cookies through your browser settings. Disabling certain cookies may affect some platform features.`,
  },
  {
    title: "7. Third-Party Services & Links",
    body: `Sduella may use trusted third-party providers for services such as hosting, analytics, email delivery, authentication and advertising.

We may also link to websites operated by employers, educational institutions, government organisations, funding providers and other opportunity providers.

Sduella does not control how external websites collect or process your personal information. We encourage you to review the privacy policy and terms of any third-party website before submitting personal information.`,
  },
  {
    title: "8. Changes to This Policy",
    body: `We may update this policy as Sduella develops, introduces new features or changes the services used to operate the platform.

When changes are made, the updated policy will be published on this page together with a revised "Last updated" date.`,
  },
//   {
//     title: "9. Contact",
//     body: `For any privacy-related queries:

// privacy@sduella.org
// Sduella
// Johannesburg, South Africa`,
//   },
];

export default function Privacy() {
  return (
    <div className="pt-[62px]">
      {/* Hero */}
      <section className="bg-off-white border-b border-grey-200 py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">
            Legal
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-6 leading-[0.9]">
            Privacy Policy
          </h1>

          <p className="text-grey-600 leading-relaxed max-w-2xl">
            This policy explains how Sduella collects, uses and protects your
            personal information while you discover jobs, internships,
            learnerships, bursaries and funding opportunities through the
            platform.
          </p>

          <p className="text-[11px] text-grey-400 mt-4 font-syne font-semibold tracking-wide">
            Last updated: 15 August 2026
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="font-syne text-[11px] font-bold tracking-widest uppercase text-grey-400 mb-5">
                On this page
              </p>

              <nav className="flex flex-col gap-3">
                {SECTIONS.map((section, i) => (
                  <a
                    key={i}
                    href={`#section-${i + 1}`}
                    className="text-xs text-grey-500 hover:text-blue transition-colors leading-relaxed"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Policy content */}
          <div className="space-y-12 max-w-4xl">
            {SECTIONS.map((s, i) => (
              <div
                key={i}
                id={`section-${i + 1}`}
                className="border-b border-grey-100 pb-12 last:border-0 scroll-mt-28"
              >
                <h2 className="text-xl font-extrabold mb-5">{s.title}</h2>

                <div className="text-grey-600 text-sm leading-relaxed whitespace-pre-line">
                  {s.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      {/* <section className="py-12 px-6 md:px-12 bg-off-white border-t border-grey-200">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-grey-500">
            Questions about this policy?
          </p>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-syne font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-black/90 transition-colors"
          >
            Contact Our Information Officer <ArrowRight size={14} />
          </a>
        </div>
      </section> */}
    </div>
  );
}
