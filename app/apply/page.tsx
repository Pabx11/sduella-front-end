import { ApplyView } from '../../src/components/RouteViews';
import { pageMetadata } from '../../src/lib/site';
export const metadata = pageMetadata({ title: 'Apply for Sduella Support', description: 'Start or continue a Sduella support application.', path: '/apply', noIndex: true });
export default function Page() { return <ApplyView />; }
