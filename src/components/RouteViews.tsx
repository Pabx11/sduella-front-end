"use client";

import { useAppContext } from '../App';
import About from '../pages/About';
import Apply from '../pages/Apply';
import Bursaries from '../pages/Bursaries';
import BusinessFunding from '../pages/BusinessFunding';
import Contact from '../pages/Contact';
import Dashboard from '../pages/Dashboard';
import Donate from '../pages/Donate';
import FundingGuide from '../pages/FundingGuide';
import Home from '../pages/Home';
import Impact from '../pages/Impact';
import Learnerships from '../pages/Learnerships';
import Newsletter from '../pages/Newsletter';
import Privacy from '../pages/Privacy';
import Transparency from '../pages/Transparency';
import type { OpportunityType } from '../types/opportunities';

export function HomeView() {
  const { user, openAuth } = useAppContext();
  return <Home user={user} onOpenAuth={openAuth} />;
}

export function FundingView({ defaultType = 'all', defaultCountry = '', defaultSearch = '' }: { defaultType?: OpportunityType | 'all'; defaultCountry?: string; defaultSearch?: string }) {
  const { user, openAuth } = useAppContext();
  return <Bursaries user={user} onOpenAuth={openAuth} mode="study" embedded defaultType={defaultType} defaultCountry={defaultCountry} defaultSearch={defaultSearch} />;
}

export function BusinessFundingView({ defaultType = 'all', defaultSearch = '', showHero = true }: { defaultType?: OpportunityType | 'all'; defaultSearch?: string; showHero?: boolean }) {
  const { user, openAuth } = useAppContext();
  if (defaultType !== 'all' || defaultSearch) {
    return <Bursaries user={user} onOpenAuth={openAuth} mode="business" embedded defaultType={defaultType} defaultSearch={defaultSearch} />;
  }
  return <BusinessFunding user={user} onOpenAuth={openAuth} showHero={showHero} />;
}

export function JobsView({ defaultType = 'all', defaultCountry = '', defaultSearch = '', embedded = false }: { defaultType?: 'all' | 'job' | 'internship' | 'learnership' | 'apprenticeship'; defaultCountry?: string; defaultSearch?: string; embedded?: boolean }) {
  return <Learnerships defaultType={defaultType} defaultCountry={defaultCountry} defaultSearch={defaultSearch} embedded={embedded} />;
}

export function DonateView() {
  const { user, updateUser } = useAppContext();
  return <Donate user={user} onDonate={() => undefined} onUpdateUser={updateUser} />;
}

export function ApplyView() {
  const { user, openAuth, updateUser } = useAppContext();
  return <Apply user={user} onOpenAuth={() => openAuth('/apply')} onUpdateUser={updateUser} />;
}

export function DashboardView() {
  const { user, logout, updateUser } = useAppContext();
  return <Dashboard user={user} onLogout={logout} onUpdateUser={updateUser} />;
}

export { About, Contact, FundingGuide, Impact, Newsletter, Privacy, Transparency };
