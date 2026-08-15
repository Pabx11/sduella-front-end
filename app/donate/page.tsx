import { DonateView } from '../../src/components/RouteViews';
import { pageMetadata } from '../../src/lib/site';
export const metadata = pageMetadata({ title: 'Support Student Access', description: 'Support Sduella’s community education work and verified student access pathways.', path: '/donate' });
export default function Page() { return <DonateView />; }
