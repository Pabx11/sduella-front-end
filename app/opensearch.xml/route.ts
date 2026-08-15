import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from '../../src/lib/site';

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>${SITE_NAME}</ShortName>
  <Description>${SITE_DESCRIPTION}</Description>
  <InputEncoding>UTF-8</InputEncoding>
  <Url type="text/html" template="${absoluteUrl('/bursaries')}?query={searchTerms}"/>
</OpenSearchDescription>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/opensearchdescription+xml; charset=utf-8' } });
}
