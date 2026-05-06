import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Donate from './pages/Donate';
import Apply from './pages/Apply';
import Dashboard from './pages/Dashboard';
import Bursaries from './pages/Bursaries';
import About from './pages/About';
import Newsletter from './pages/Newsletter';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Impact from './pages/Impact';
import Transparency from './pages/Transparency';
import FundingGuide from './pages/FundingGuide';
import Learnerships from './pages/Learnerships';
import { MOCK_DATA } from './data/mockData';
import type { User, Role } from './types';
import { X } from 'lucide-react';
import { cn } from './lib/utils';

const AuthModal = ({ isOpen, onClose, onLogin, redirectAfter }: { isOpen: boolean, onClose: () => void, onLogin: (user: User) => void, redirectAfter: string }) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [reg, setReg] = useState({
    role: 'student' as Role,
    fullName: '',
    phone: '',
    email: '',
    emailVerified: false,
    otpSent: false,
    otpInput: '',
    idNumber: '',
    institution: '',
    year: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const setRegField = (field: string, value: string | boolean) =>
    setReg(prev => ({ ...prev, [field]: value }));

  if (!isOpen) return null;

  const quickLogin = (type: 'donor' | 'student') => {
    const em = type === 'donor' ? 'thandi@email.com' : 'mpho@university.edu';
    const user = type === 'donor' ? MOCK_DATA.donors[em as keyof typeof MOCK_DATA.donors] : MOCK_DATA.students[em as keyof typeof MOCK_DATA.students];
    if (user) {
      onLogin({ ...user, email: em });
      onClose();
      navigate(redirectAfter);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const donor = MOCK_DATA.donors[loginEmail as keyof typeof MOCK_DATA.donors];
    const student = MOCK_DATA.students[loginEmail as keyof typeof MOCK_DATA.students];
    const existingUser = donor || student;
    if (existingUser && MOCK_DATA.passwords[loginEmail as keyof typeof MOCK_DATA.passwords] === loginPassword) {
      onLogin({ ...existingUser, email: loginEmail });
      onClose();
      navigate(redirectAfter);
    } else {
      alert('Invalid credentials. Try the demo buttons below.');
    }
  };

  const canRegister = () => {
    if (!reg.fullName.trim() || !reg.phone.trim() || !reg.email.trim() || !reg.address.trim()) return false;
    if (!reg.password || reg.password !== reg.confirmPassword) return false;
    if (reg.role === 'student') {
      if (!reg.emailVerified || !reg.idNumber.trim() || !reg.institution.trim() || !reg.year) return false;
    }
    return true;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canRegister()) return;
    onLogin({
      name: reg.fullName,
      email: reg.email,
      role: reg.role,
      phone: reg.phone,
      idNumber: reg.idNumber,
      address: reg.address,
      institution: reg.institution || undefined,
      year: reg.year || undefined,
      totalDonated: 0,
      donations: [],
      applications: [],
    });
    onClose();
    navigate(redirectAfter);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[400] flex items-center justify-center p-5">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-[480px] rounded-sm relative z-0 flex flex-col max-h-[92vh]"
      >
        <button onClick={onClose} className="absolute top-4.5 right-5 p-2 text-grey-400 hover:text-black hover:bg-grey-100 rounded-sm z-10">
          <X size={16} />
        </button>

        <div className="p-9 pb-5 shrink-0">
          <h2 className="text-[22px] font-extrabold mb-1 font-syne">
            {tab === 'login' ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-sm text-grey-600">
            {tab === 'login' ? 'Log in to access your account.' : 'Join Sduella as a donor or student.'}
          </p>
        </div>

        <div className="px-9 shrink-0">
          <div className="grid grid-cols-2 gap-0.5 bg-grey-100 p-1 rounded-sm mb-5">
            <button onClick={() => setTab('login')} className={cn("py-2 text-[13px] font-bold rounded-sm transition-all", tab === 'login' ? "bg-white text-black shadow-sm" : "text-grey-600")}>Log In</button>
            <button onClick={() => setTab('register')} className={cn("py-2 text-[13px] font-bold rounded-sm transition-all", tab === 'register' ? "bg-white text-black shadow-sm" : "text-grey-600")}>Register</button>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 px-9 pb-9">
          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Email address</label>
                <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none transition-colors" placeholder="your@email.com" required />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Password</label>
                <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none transition-colors" placeholder="Your password" required />
              </div>
              <button type="submit" className="w-full py-3 bg-black text-white font-syne font-bold text-sm tracking-wide rounded-sm hover:bg-black/90 transition-colors">Log In</button>
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-grey-200" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-grey-400">or continue as</span>
                <div className="flex-1 h-px bg-grey-200" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => quickLogin('donor')} className="py-2.5 border-1.5 border-grey-200 text-[11px] font-bold uppercase tracking-widest rounded-sm hover:bg-grey-50 transition-colors">Donor Demo</button>
                <button type="button" onClick={() => quickLogin('student')} className="py-2.5 border-1.5 border-grey-200 text-[11px] font-bold uppercase tracking-widest rounded-sm hover:bg-grey-50 transition-colors">Student Demo</button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">I am a</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['student', 'donor'] as Role[]).map(r => (
                    <button key={r} type="button" onClick={() => setRegField('role', r)}
                      className={cn("py-2.5 text-[12px] font-bold capitalize border-1.5 rounded-sm transition-all",
                        reg.role === r ? "border-blue bg-blue/5 text-blue" : "border-grey-200 text-grey-600 hover:bg-grey-50")}>
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Full Name</label>
                  <input type="text" value={reg.fullName} onChange={e => setRegField('fullName', e.target.value)} className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none transition-colors text-sm" placeholder="First and last name" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Phone</label>
                  <input type="tel" value={reg.phone} onChange={e => setRegField('phone', e.target.value)} className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none transition-colors text-sm" placeholder="+27 000 000 0000" required />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">
                  {reg.role === 'student' ? 'Student Email Address' : 'Email Address'}
                  {reg.emailVerified && <span className="ml-2 text-green text-[10px] normal-case font-semibold tracking-normal">✓ Verified</span>}
                </label>
                <div className="flex gap-2">
                  <input type="email" value={reg.email} onChange={e => { setRegField('email', e.target.value); setRegField('emailVerified', false); setRegField('otpSent', false); }}
                    className={cn("flex-1 px-3.5 py-2.5 border-1.5 rounded-sm outline-none transition-colors text-sm",
                      reg.emailVerified ? "border-green bg-green/5" : "border-grey-200 focus:border-blue")}
                    placeholder={reg.role === 'student' ? 'student@university.ac.za' : 'your@email.com'} required />
                  {reg.role === 'student' && !reg.emailVerified && (
                    <button type="button" onClick={() => setRegField('otpSent', true)} disabled={!reg.email.includes('@')}
                      className="px-3.5 py-2 bg-black text-white text-[11px] font-bold uppercase tracking-wider rounded-sm disabled:opacity-40 whitespace-nowrap">
                      {reg.otpSent ? 'Resend' : 'Send OTP'}
                    </button>
                  )}
                </div>
                {reg.role === 'student' && reg.otpSent && !reg.emailVerified && (
                  <div className="flex gap-2 mt-2">
                    <input type="text" value={reg.otpInput} onChange={e => setRegField('otpInput', e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="flex-1 px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none transition-colors text-sm tracking-widest font-mono"
                      placeholder="6-digit code" maxLength={6} />
                    <button type="button" onClick={() => { if (reg.otpInput.length === 6) setRegField('emailVerified', true); }} disabled={reg.otpInput.length !== 6}
                      className="px-3.5 py-2 bg-blue text-white text-[11px] font-bold uppercase tracking-wider rounded-sm disabled:opacity-40">
                      Verify
                    </button>
                  </div>
                )}
              </div>

              {reg.role === 'student' && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold tracking-widests uppercase text-grey-600">SA ID Number</label>
                    <input type="text" value={reg.idNumber} onChange={e => setRegField('idNumber', e.target.value.replace(/\D/g, '').slice(0, 13))}
                      className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none transition-colors text-sm font-mono tracking-widest"
                      placeholder="13-digit SA ID" maxLength={13} required />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Institution</label>
                      <input type="text" value={reg.institution} onChange={e => setRegField('institution', e.target.value)}
                        className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none transition-colors text-sm"
                        placeholder="University / TVET" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Year of Study</label>
                      <select value={reg.year} onChange={e => setRegField('year', e.target.value)}
                        className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none transition-colors appearance-none bg-white text-sm" required>
                        <option value="">Select year</option>
                        {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Honours', 'Masters', 'PhD'].map(y => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Home Address</label>
                <input type="text" value={reg.address} onChange={e => setRegField('address', e.target.value)}
                  className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none transition-colors text-sm"
                  placeholder="Street, City, Province" required />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Password</label>
                  <input type="password" value={reg.password} onChange={e => setRegField('password', e.target.value)}
                    className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none transition-colors text-sm"
                    placeholder="Create password" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Confirm</label>
                  <input type="password" value={reg.confirmPassword} onChange={e => setRegField('confirmPassword', e.target.value)}
                    className={cn("w-full px-3.5 py-2.5 border-1.5 rounded-sm outline-none transition-colors text-sm",
                      reg.confirmPassword && reg.password !== reg.confirmPassword ? "border-red" : "border-grey-200 focus:border-blue")}
                    placeholder="Repeat password" required />
                </div>
              </div>
              {reg.confirmPassword && reg.password !== reg.confirmPassword && (
                <p className="text-[11px] text-red -mt-2">Passwords do not match</p>
              )}

              <button type="submit" disabled={!canRegister()}
                className="w-full py-3 bg-black text-white font-syne font-bold text-sm tracking-wide rounded-sm hover:bg-black/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-2">
                Create Account
              </button>
              {reg.role === 'student' && !reg.emailVerified && (
                <p className="text-[11px] text-grey-500 text-center">Verify your student email to complete registration</p>
              )}
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authRedirect, setAuthRedirect] = useState('/dashboard');

  const openAuth = (redirectTo = '/dashboard') => {
    setAuthRedirect(redirectTo);
    setIsAuthOpen(true);
  };
  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    if (updatedUser.role === 'donor') {
      MOCK_DATA.donors[updatedUser.email as keyof typeof MOCK_DATA.donors] = updatedUser as any;
    } else {
      MOCK_DATA.students[updatedUser.email as keyof typeof MOCK_DATA.students] = updatedUser as any;
    }
  };

  const handleDonate = (_amount: number) => {};

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar
          user={user}
          onOpenAuth={() => openAuth('/dashboard')}
          onLogout={() => setUser(null)}
        />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home user={user} onOpenAuth={openAuth} />} />
            <Route path="/bursaries" element={<Bursaries user={user} onOpenAuth={openAuth} />} />
            <Route path="/about" element={<About />} />
            <Route path="/donate" element={<Donate user={user} onDonate={handleDonate} onUpdateUser={handleUpdateUser} />} />
            <Route path="/apply" element={<Apply user={user} onOpenAuth={() => openAuth('/apply')} onUpdateUser={handleUpdateUser} />} />
            <Route path="/dashboard" element={<Dashboard user={user} onLogout={() => setUser(null)} onUpdateUser={handleUpdateUser} />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/transparency" element={<Transparency />} />
            <Route path="/funding-guide" element={<FundingGuide />} />
            <Route path="/learnerships" element={<Learnerships />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />

        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLogin={setUser}
          redirectAfter={authRedirect}
        />
      </div>
    </Router>
  );
}
