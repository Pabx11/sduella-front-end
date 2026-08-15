import { SEO_PAGES } from '../../src/data/seoPages';
import { absoluteUrl, LAST_REVIEWED, SITE_DESCRIPTION, SITE_NAME } from '../../src/lib/site';

const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, character => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[character] || character);

export async function GET() {
  const items = Object.values(SEO_PAGES).map(page => `
    <item>
      <title>${escapeXml(page.title)}</title>
      <link>${escapeXml(absoluteUrl(page.path))}</link>
      <guid isPermaLink="true">${escapeXml(absoluteUrl(page.path))}</guid>
      <description>${escapeXml(page.description)}</description>
      <pubDate>${new Date(`${LAST_REVIEWED}T12:00:00Z`).toUTCString()}</pubDate>
    </item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"><channel>
  <title>${escapeXml(SITE_NAME)} opportunity guides</title>
  <link>${escapeXml(absoluteUrl('/'))}</link>
  <description>${escapeXml(SITE_DESCRIPTION)}</description>
  <language>en-ZA</language>
  <lastBuildDate>${new Date(`${LAST_REVIEWED}T12:00:00Z`).toUTCString()}</lastBuildDate>${items}
</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=3600' } });
}
