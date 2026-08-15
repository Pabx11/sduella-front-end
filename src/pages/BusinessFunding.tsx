import { ArrowRight, Building2, Rocket, Store } from 'lucide-react';
import Bursaries from './Bursaries';
import type { User } from '../types';

const fundingPaths = [
  {
    title: 'Startup Funding',
    description: 'Explore grants and funding programmes designed for founders developing or launching a new venture.',
    href: '/business-funding?type=business_funding',
    label: 'Explore startup funding',
    icon: Rocket,
  },
  {
    title: 'Business Grants',
    description: 'Find non-repayable grant opportunities for eligible businesses, projects and organisations.',
    href: '/business-funding?type=grant',
    label: 'Browse business grants',
    icon: Building2,
  },
  {
    title: 'Growth & Enterprise Funding',
    description: 'Discover funding for established small businesses seeking equipment, expansion or market access.',
    href: '/business-funding?type=business_funding',
    label: 'Find growth funding',
    icon: Store,
  },
];

export default function BusinessFunding({
  user,
  onOpenAuth,
  showHero = true,
}: {
  user: User | null;
  onOpenAuth: (redirectTo?: string) => void;
  showHero?: boolean;
}) {
  return (
    <div className={showHero ? 'pt-[62px]' : ''}>
      {/* {showHero && <section className="bg-black px-4 py-14 text-white sm:px-6 sm:py-20 md:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <span className="mb-4 block font-syne text-xs font-bold uppercase tracking-wider text-green">Business &amp; Startup Funding</span>
          <h1 className="mb-6 max-w-4xl text-4xl font-extrabold leading-[0.95] tracking-tighter sm:text-5xl md:text-6xl">
            Funding to start, build and grow.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            Search current startup programmes, business grants and enterprise funding from trusted providers. Review the requirements, then apply through the official provider.
          </p>
        </div>
      </section>} */}

      <section className="border-b border-grey-200 bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            {/* <span className="mb-3 block font-syne text-xs font-bold uppercase tracking-wider text-blue">Choose a funding path</span> */}
            <h2 className="text-2xl font-extrabold sm:text-3xl">What does your business need?</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {fundingPaths.map(({ title, description, href, label, icon: Icon }) => (
              <a key={title} href={href} className="group flex min-w-0 flex-col border border-grey-200 p-5 transition-all hover:border-blue hover:shadow-lg sm:p-6">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-sm bg-blue/5 text-blue">
                  <Icon size={20} />
                </div>
                <h3 className="mb-3 text-xl font-extrabold">{title}</h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-grey-600">{description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-blue">
                  {label} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Bursaries user={user} onOpenAuth={onOpenAuth} mode="business" embedded />
    </div>
  );
}
