import { HomeView } from '../src/components/RouteViews';
import { pageMetadata } from '../src/lib/site';

export const metadata = pageMetadata({
  title: 'Bursaries, Jobs & Funding Opportunities',
  description: 'Discover bursaries, PhD and research funding, scholarships, jobs, learnerships, internships and business grants from official providers.',
  path: '/',
  keywords: ['bursaries', 'PhD funding', 'research grants', 'postdoctoral fellowships', 'scholarships', 'jobs', 'learnerships', 'business funding'],
});

export default function HomePage() { return <HomeView />; }
