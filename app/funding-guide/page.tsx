import { FundingGuide } from '../../src/components/RouteViews';
import { pageMetadata } from '../../src/lib/site';
export const metadata = pageMetadata({ title: 'Funding Application Guide', description: 'Understand bursaries, scholarships, student grants and learnerships, and prepare a stronger application using official requirements.', path: '/funding-guide', keywords: ['how to apply for bursaries', 'bursary application guide', 'funding requirements'] });
export default function Page() { return <FundingGuide />; }
