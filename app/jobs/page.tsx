import OpportunitySeoPage from '../../src/components/OpportunitySeoPage';
import { metadataFor } from '../../src/lib/seoPageMetadata';
export const metadata = metadataFor('jobs');
export default function Page() { return <OpportunitySeoPage pageKey="jobs" />; }
