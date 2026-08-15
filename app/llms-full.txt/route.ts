import { SEO_PAGES } from '../../src/data/seoPages';
import { LAST_REVIEWED, SITE_DESCRIPTION } from '../../src/lib/site';

export async function GET() {
  const content = Object.values(SEO_PAGES).map(page => {
    const answers = page.faqs.map(faq => `### ${faq.question}\n${faq.answer}`).join('\n\n');
    const sources = page.sources.map(source => `- ${source.label}: ${source.href}`).join('\n');
    return `## ${page.title}\nCanonical path: ${page.path}\n\n${page.answer}\n\n${answers}\n\nSources:\n${sources}`;
  }).join('\n\n---\n\n');
  return new Response(`# Sduella: opportunity knowledge summary\n\n${SITE_DESCRIPTION}\n\nLast reviewed: ${LAST_REVIEWED}\n\nApplications are not submitted to Sduella. Users must confirm details and apply through the original provider.\n\n${content}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=3600' } });
}
