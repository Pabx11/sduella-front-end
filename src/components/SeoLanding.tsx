import type { ReactNode } from 'react';
import { absoluteUrl, LAST_REVIEWED, safeJsonLd, SITE_NAME } from '../lib/site';

interface Faq { question: string; answer: string }
interface Source { label: string; href: string }

export default function SeoLanding({
  path,
  eyebrow,
  title,
  answer,
  highlights,
  faqs,
  sources,
  children,
}: {
  path: string;
  eyebrow: string;
  title: string;
  answer: string;
  highlights: Array<{ title: string; text: string }>;
  faqs: Faq[];
  sources: Source[];
  children: ReactNode;
}) {
  const pageUrl = absoluteUrl(path);
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${pageUrl}#page`,
      url: pageUrl,
      name: title,
      description: answer,
      isPartOf: { '@id': `${absoluteUrl('/')}#website` },
      publisher: { '@id': `${absoluteUrl('/')}#organization` },
      dateModified: LAST_REVIEWED,
      inLanguage: 'en',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: SITE_NAME, item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: title, item: pageUrl },
      ],
    },
  ];

  return (
    <div className="pt-[62px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(structuredData) }} />
      <header className="border-b border-grey-200 bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-12 lg:py-20 hidden">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 font-syne text-[11px] font-bold uppercase tracking-[0.16em] text-blue">{eyebrow}</p>
          <h1 className="max-w-5xl text-4xl font-extrabold leading-[0.96] tracking-tighter sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-grey-600 sm:text-lg">{answer}</p>
          <p className="mt-5 text-xs text-grey-500">Reviewed {new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(new Date(`${LAST_REVIEWED}T12:00:00Z`))} · Listings link to their original providers.</p>
        </div>
      </header>

      <section aria-label="What to know" className="border-b border-grey-200 bg-off-white px-4 py-8 sm:px-6 md:px-12 hidden">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {highlights.map(item => (
            <article key={item.title} className="border border-grey-200 bg-white p-5">
              <h2 className="text-lg font-extrabold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-grey-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      {children}

      <section className="border-t border-grey-200 bg-white px-4 py-12 sm:px-6 md:px-12 lg:py-16 hidden">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.42fr]">
          <div>
            <p className="mb-3 font-syne text-[11px] font-bold uppercase tracking-[0.16em] text-blue">Plain answers</p>
            <h2 className="text-3xl font-extrabold">Frequently asked questions</h2>
            <div className="mt-7 divide-y divide-grey-200 border-y border-grey-200">
              {faqs.map(item => (
                <details key={item.question} className="group py-5">
                  <summary className="cursor-pointer list-none pr-8 font-syne font-bold">{item.question}</summary>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-grey-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
          <aside>
            <h2 className="text-lg font-extrabold">Primary sources</h2>
            <p className="mt-2 text-sm leading-6 text-grey-600">Use these official sources to confirm rules and programme details before applying.</p>
            <ul className="mt-5 space-y-3 text-sm">
              {sources.map(source => <li key={source.href}><a className="font-semibold text-blue hover:underline" href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a></li>)}
            </ul>
          </aside>
        </div>
      </section>
    </div>
  );
}
