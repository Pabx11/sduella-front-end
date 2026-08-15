import { About } from '../../src/components/RouteViews';
import { pageMetadata } from '../../src/lib/site';
export const metadata = pageMetadata({ title: 'About the Sduella Opportunity Platform', description: 'Learn how Sduella helps people discover clearer, trusted study funding, work and business opportunities from original providers.', path: '/about' });
export default function Page() { return <About />; }
