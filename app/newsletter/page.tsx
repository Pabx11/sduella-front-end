import { Newsletter } from '../../src/components/RouteViews';
import { pageMetadata } from '../../src/lib/site';
export const metadata = pageMetadata({ title: 'Opportunity Newsletter', description: 'Subscribe for updates about bursaries, scholarships, jobs, learnerships and business funding.', path: '/newsletter' });
export default function Page() { return <Newsletter />; }
