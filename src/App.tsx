"use client";

import React, { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { COUNTRY_GROUPS } from './lib/geography';
import * as authApi from './lib/authApi';
import type { SavedInterest } from './lib/authApi';
import type { User, Role } from './types';
import { cn } from './lib/utils';

type RegistrationRole = Exclude<Role, 'admin'>;
const ROLE_LABELS: Record<RegistrationRole, string> = {
  seeker: 'Opportunity seeker', student: 'Student', founder: 'Founder', donor: 'Donor',
};

const AuthModal = ({ isOpen, onClose, onLogin, redirectAfter }: {
  isOpen: boolean; onClose: () => void; onLogin: (user: User) => void; redirectAfter: string;
}) => {
  const router = useRouter();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [reg, setReg] = useState({
    role: 'seeker' as RegistrationRole,
    fullName: '', email: '', countryCode: '', city: '', institution: '',
    password: '', confirmPassword: '',
    studyFunding: true, businessFunding: false, jobs: false,
    frequency: 'weekly' as 'daily' | 'weekly' | 'monthly',
    opportunityEmailConsent: false, marketingConsent: false,
  });
  const setRegField = <K extends keyof typeof reg>(field: K, value: (typeof reg)[K]) =>
    setReg(previous => ({ ...previous, [field]: value }));
  if (!isOpen) return null;

  const finish = (user: User) => { onLogin(user); onClose(); router.push(redirectAfter); };
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); setBusy(true); setError(null);
    try { finish(await authApi.login(loginEmail, loginPassword)); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Login failed.'); }
    finally { setBusy(false); }
  };
  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    if (reg.password !== reg.confirmPassword) { setError('Passwords do not match.'); return; }
    const interests: SavedInterest[] = [];
    const common = { country_code: reg.countryCode || undefined, notification_frequency: reg.frequency };
    if (reg.studyFunding) interests.push({ ...common, opportunity_group: 'funding', field_or_sector: 'education' });
    if (reg.businessFunding) interests.push({ ...common, opportunity_group: 'funding', field_or_sector: 'business' });
    if (reg.jobs) interests.push({ ...common, opportunity_group: 'jobs' });
    setBusy(true); setError(null);
    try {
      finish(await authApi.register({
        full_name: reg.fullName, email: reg.email, password: reg.password, role: reg.role,
        country_code: reg.countryCode || undefined, city: reg.city || undefined,
        institution: reg.institution || undefined, interests,
        opportunity_email_consent: reg.opportunityEmailConsent,
        marketing_consent: reg.marketingConsent,
      }));
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Registration failed.'); }
    finally { setBusy(false); }
  };
  const inputClass = 'w-full px-3.5 py-2.5 border border-grey-200 rounded-sm focus:border-blue outline-none text-sm';

  return (
    <div className="fixed inset-0 bg-black/40 z-[400] flex items-end sm:items-center justify-center p-0 sm:p-5">
      <motion.div initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-[560px] rounded-t-sm sm:rounded-sm relative flex flex-col max-h-[96dvh] sm:max-h-[92vh]">
        <button onClick={onClose} aria-label="Close" className="absolute top-3 right-3 p-2 z-10"><X size={18} /></button>
        <div className="p-5 pr-14 pb-4 sm:p-8 sm:pb-5">
          <h2 className="text-2xl font-extrabold font-syne">{tab === 'login' ? 'Welcome back' : 'Create your Sduella account'}</h2>
          <p className="text-sm text-grey-600 mt-1">{tab === 'login' ? 'Access your saved interests and alerts.' : 'Save filters and choose which alerts you want.'}</p>
        </div>
        <div className="px-5 sm:px-8"><div className="grid grid-cols-2 bg-grey-100 p-1 mb-5">{(['login', 'register'] as const).map(value => <button key={value} type="button" onClick={() => { setTab(value); setError(null); }} className={cn('py-2 text-sm font-bold capitalize', tab === value && 'bg-white shadow-sm')}>{value}</button>)}</div></div>
        <div className="overflow-y-auto px-5 pb-6 sm:px-8 sm:pb-8">
          {error && <div role="alert" className="mb-4 border border-red/30 bg-red/5 p-3 text-sm text-red">{error}</div>}
          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider">Email<input className={`${inputClass} mt-1.5 normal-case font-normal tracking-normal`} type="email" value={loginEmail} onChange={event => setLoginEmail(event.target.value)} required /></label>
              <label className="block text-xs font-bold uppercase tracking-wider">Password<input className={`${inputClass} mt-1.5 normal-case font-normal tracking-normal`} type="password" value={loginPassword} onChange={event => setLoginPassword(event.target.value)} required /></label>
              <button disabled={busy} className="w-full py-3 bg-black text-white font-syne font-bold disabled:opacity-50">{busy ? 'Signing in…' : 'Log in'}</button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div><span className="block text-xs font-bold uppercase tracking-wider mb-2">I am a</span><div className="grid grid-cols-2 sm:grid-cols-4 gap-2">{(Object.keys(ROLE_LABELS) as RegistrationRole[]).map(role => <button key={role} type="button" onClick={() => setRegField('role', role)} className={cn('border px-2 py-2 text-xs font-bold', reg.role === role ? 'border-blue bg-blue/5 text-blue' : 'border-grey-200')}>{ROLE_LABELS[role]}</button>)}</div></div>
              <div className="grid sm:grid-cols-2 gap-3"><label className="text-xs font-bold uppercase tracking-wider">Full name<input className={`${inputClass} mt-1.5 normal-case font-normal tracking-normal`} value={reg.fullName} onChange={event => setRegField('fullName', event.target.value)} required /></label><label className="text-xs font-bold uppercase tracking-wider">Email<input className={`${inputClass} mt-1.5 normal-case font-normal tracking-normal`} type="email" value={reg.email} onChange={event => setRegField('email', event.target.value)} required /></label></div>
              <div className="grid sm:grid-cols-2 gap-3"><label className="text-xs font-bold uppercase tracking-wider">Country<select className={`${inputClass} mt-1.5 normal-case font-normal tracking-normal bg-white`} value={reg.countryCode} onChange={event => setRegField('countryCode', event.target.value)}><option value="">Choose country</option>{COUNTRY_GROUPS.map(group => <optgroup key={group.region} label={group.region}>{group.countries.map(country => <option key={country.code} value={country.code.toUpperCase()}>{country.name}</option>)}</optgroup>)}</select></label><label className="text-xs font-bold uppercase tracking-wider">City / region<input className={`${inputClass} mt-1.5 normal-case font-normal tracking-normal`} value={reg.city} onChange={event => setRegField('city', event.target.value)} /></label></div>
              {reg.role === 'student' && <label className="block text-xs font-bold uppercase tracking-wider">Institution<input className={`${inputClass} mt-1.5 normal-case font-normal tracking-normal`} value={reg.institution} onChange={event => setRegField('institution', event.target.value)} /></label>}
              <fieldset><legend className="text-xs font-bold uppercase tracking-wider mb-2">What interests you?</legend><div className="grid sm:grid-cols-3 gap-2">{([['studyFunding', 'Study funding'], ['businessFunding', 'Business funding'], ['jobs', 'Jobs']] as const).map(([key, label]) => <label key={key} className="border border-grey-200 p-3 text-sm flex gap-2 items-center"><input type="checkbox" checked={reg[key]} onChange={event => setRegField(key, event.target.checked)} />{label}</label>)}</div></fieldset>
              <label className="block text-xs font-bold uppercase tracking-wider">Alert frequency<select className={`${inputClass} mt-1.5 normal-case font-normal tracking-normal bg-white`} value={reg.frequency} onChange={event => setRegField('frequency', event.target.value as typeof reg.frequency)}><option value="daily">Daily</option><option value="weekly">Weekly</option><option value="monthly">Monthly</option></select></label>
              <div className="grid sm:grid-cols-2 gap-3"><label className="text-xs font-bold uppercase tracking-wider">Password<input className={`${inputClass} mt-1.5 normal-case font-normal tracking-normal`} type="password" minLength={12} value={reg.password} onChange={event => setRegField('password', event.target.value)} required /></label><label className="text-xs font-bold uppercase tracking-wider">Confirm password<input className={`${inputClass} mt-1.5 normal-case font-normal tracking-normal`} type="password" minLength={12} value={reg.confirmPassword} onChange={event => setRegField('confirmPassword', event.target.value)} required /></label></div>
              <p className="text-xs text-grey-500">Use at least 12 characters. A national ID is not required to create a basic account.</p>
              <label className="flex gap-3 items-start text-sm"><input className="mt-1" type="checkbox" checked={reg.opportunityEmailConsent} onChange={event => setRegField('opportunityEmailConsent', event.target.checked)} /><span>Email me new opportunities matching my saved interests. You can turn this off at any time.</span></label>
              <label className="flex gap-3 items-start text-sm"><input className="mt-1" type="checkbox" checked={reg.marketingConsent} onChange={event => setRegField('marketingConsent', event.target.checked)} /><span>Send me Sduella news and marketing. This is optional and separate from opportunity alerts.</span></label>
              <button disabled={busy || reg.password.length < 12 || reg.password !== reg.confirmPassword} className="w-full py-3 bg-black text-white font-syne font-bold disabled:opacity-50">{busy ? 'Creating account…' : 'Create account'}</button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

interface AppContextValue { user: User | null; openAuth: (redirectTo?: string) => void; updateUser: (user: User) => void; logout: () => void; }
const AppContext = createContext<AppContextValue | null>(null);
export function useAppContext() { const context = useContext(AppContext); if (!context) throw new Error('useAppContext must be used inside the Sduella app shell.'); return context; }

export default function App({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authRedirect, setAuthRedirect] = useState('/dashboard');
  useEffect(() => { authApi.restoreSession().then(setUser); }, []);
  const openAuth = (redirectTo = '/dashboard') => { setAuthRedirect(redirectTo); setIsAuthOpen(true); };
  const handleUpdateUser = (updated: User) => { setUser(updated); authApi.updateProfile(updated).then(setUser).catch(() => undefined); };
  const handleLogout = () => { setUser(null); void authApi.logout(); };
  const value = useMemo<AppContextValue>(() => ({ user, openAuth, updateUser: handleUpdateUser, logout: handleLogout }), [user]);
  return <AppContext.Provider value={value}><div className="min-h-screen flex flex-col"><Navbar user={user} onOpenAuth={() => openAuth('/dashboard')} onLogout={handleLogout} /><main className="flex-1">{children}</main><Footer /><AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLogin={setUser} redirectAfter={authRedirect} /></div></AppContext.Provider>;
}
