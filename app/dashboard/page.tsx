import { DashboardView } from '../../src/components/RouteViews';
import { pageMetadata } from '../../src/lib/site';
export const metadata = pageMetadata({ title: 'Account Dashboard', description: 'Manage your Sduella account.', path: '/dashboard', noIndex: true });
export default function Page() { return <DashboardView />; }
