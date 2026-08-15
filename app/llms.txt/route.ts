import { SEO_PAGES } from '../../src/data/seoPages';
import { absoluteUrl, LAST_REVIEWED, SITE_DESCRIPTION } from '../../src/lib/site';

export async function GET() {
  const routes = Object.values(SEO_PAGES).map(page => `- [${page.title}](${absoluteUrl(page.path)}): ${page.description}`).join('\n');
  const body = `# Sduella\n\n> ${SITE_DESCRIPTION}\n\nSduella is a discovery and explanation platform. Opportunity applications are completed on the original provider's website. Always treat the official provider as the final authority for eligibility, deadlines and application rules.\n\nLast reviewed: ${LAST_REVIEWED}\n\n## Core opportunity pages\n${routes}\n\n## Trust and methodology\n- [Source and listing transparency](${absoluteUrl('/transparency')})\n- [Funding application guide](${absoluteUrl('/funding-guide')})\n- [About Sduella](${absoluteUrl('/about')})\n- [Contact Sduella](${absoluteUrl('/contact')})\n\n## Machine-readable discovery\n- [XML sitemap](${absoluteUrl('/sitemap.xml')})\n- [RSS feed](${absoluteUrl('/feed.xml')})\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=3600' } });
}
