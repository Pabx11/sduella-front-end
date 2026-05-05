import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target,
  Users,
  GraduationCap, 
  Heart, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Mail,
  User as UserIcon,
  CreditCard,
  History,
  Settings as SettingsIcon,
  Plus,
  Check
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Types ---
type Role = 'donor' | 'student' | 'admin';

interface User {
  name: string;
  email: string;
  role: Role;
  phone?: string;
  idNumber?: string;
  address?: string;
  institution?: string;
  year?: string;
  totalDonated?: number;
  donations?: any[];
  applications?: any[];
}

// --- Mock Data ---
const INITIAL_POOL = 0;

const MOCK_DATA = {
  donors: {
    'thandi@email.com': {
      name: 'Thandi Mokoena',
      role: 'donor' as Role,
      totalDonated: 15000,
      donations: [
        { date: '2025-10-12', amount: 5000, students: 3, status: 'Disbursed' },
        { date: '2025-12-01', amount: 5000, students: 4, status: 'Disbursed' },
        { date: '2026-02-18', amount: 5000, students: 3, status: 'Active' }
      ]
    },
    'siya@email.com': {
      name: 'Siyanda Dlamini',
      role: 'donor' as Role,
      totalDonated: 8500,
      donations: [
        { date: '2025-11-05', amount: 3500, students: 2, status: 'Disbursed' },
        { date: '2026-01-20', amount: 5000, students: 3, status: 'Active' }
      ]
    }
  },
  students: {
    'mpho@university.edu': {
      name: 'Mpho Sithole',
      role: 'student' as Role,
      institution: 'Metropolitan University',
      year: '3rd Year',
      applications: [
        { id: 'APP-2024-031', date: '2025-09-14', category: 'Graduation Clearance', amount: 12000, status: 'Approved' },
        { id: 'APP-2025-007', date: '2026-01-08', category: 'Tuition Fees', amount: 8500, status: 'Under Review' }
      ]
    },
    'naledi@institute.edu': {
      name: 'Naledi Khumalo',
      role: 'student' as Role,
      institution: 'Globala Tech Institute',
      year: '2nd Year',
      applications: []
    }
  },
  passwords: {
    'thandi@email.com': 'pass123',
    'siya@email.com': 'pass123',
    'mpho@university.edu': 'pass123',
    'naledi@institute.edu': 'pass123',
    'admin@sduella.com': 'admin123'
  }
};

// --- Components ---

const Navbar = ({ user, onOpenAuth, onLogout }: { user: User | null, onOpenAuth: () => void, onLogout: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Bursaries', path: '/bursaries' },
    { label: 'How It Works', path: '/#how' },
    { label: 'Fund Categories', path: '/#categories' },
    { label: 'Apply', path: '/apply' },
    { label: 'Donate', path: '/donate' },
  ];

  return (
    <nav className="fixed inset-x-0 top-0 h-[62px] bg-white border-b border-grey-200 z-[300] flex items-center justify-between px-6 md:px-12">
      <div className="flex items-center gap-8">
        <a href="/" className="flex items-center cursor-pointer">
          <img className="h-50 w-100" src="/public/pictures/Sduella Modern Logo (1).svg" alt="SDUELLA Logo" />
        </a>
        <ul className="hidden md:flex items-center gap-7 list-none">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a 
                href={link.path}
                className={cn(
                  "font-syne text-[13px] font-semibold text-grey-600 hover:text-black transition-colors tracking-wide",
                  location.pathname === link.path && "text-black"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline font-syne text-[13px] font-semibold text-grey-600">
              Hi, <strong className="text-black">{user.name.split(' ')[0]}</strong>
            </span>
            <a 
              href="/dashboard"
              className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-syne text-xs font-bold cursor-pointer"
            >
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </a>
          </div>
        ) : (
          <>
            <button 
              onClick={onOpenAuth}
              className="hidden sm:inline-flex px-4 py-2 border-1.5 border-black text-black font-syne font-bold text-[13px] rounded-sm hover:bg-black hover:text-white transition-all"
            >
              Log In
            </button>
            <button 
              onClick={onOpenAuth}
              className="px-4 py-2 bg-blue text-white font-syne font-bold text-[13px] rounded-sm hover:bg-blue-hover transition-all"
            >
              Get Started
            </button>
          </>
        )}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[62px] inset-x-0 bg-white border-b border-grey-200 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="font-syne text-lg font-bold text-black"
              >
                {link.label}
              </a>
            ))}
            {!user && (
              <button 
                onClick={() => { onOpenAuth(); setIsMenuOpen(false); }}
                className="w-full py-3 bg-black text-white font-syne font-bold text-sm rounded-sm"
              >
                Log In / Register
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-off-black text-white px-6 md:px-12 py-16">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 mb-14 pb-12 border-b border-white/10">
        <div>
          <div className="flex items-center mb-6">
            <GraduationCap className="h-6 w-6 text-blue" />
            <span className="ml-2 font-syne font-extrabold text-lg tracking-tighter">SDUELLA</span>
          </div>
          <p className="text-[13px] text-white/40 leading-relaxed max-w-[240px]">
            A structured, always-open education fund for ambitious students. Not crowdfunding. A permanent community investment in academic completion.
          </p>
        </div>
        <div>
          <h5 className="font-syne text-[11px] font-bold tracking-[0.12em] uppercase text-white/35 mb-5">Platform</h5>
          <ul className="flex flex-col gap-3 text-[13px] text-white/55">
            <li><a href="/#how" className="hover:text-white transition-colors">How It Works</a></li>
            <li><a href="/#categories" className="hover:text-white transition-colors">Fund Categories</a></li>
            <li><a href="/bursaries" className="hover:text-white transition-colors">Bursaries</a></li>
            <li><a href="/apply" className="hover:text-white transition-colors">Apply for Funding</a></li>
            <li><a href="/donate" className="hover:text-white transition-colors">Donate</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-syne text-[11px] font-bold tracking-[0.12em] uppercase text-white/35 mb-5">Resources</h5>
          <ul className="flex flex-col gap-3 text-[13px] text-white/55">
            <li><a href="/newsletter" className="hover:text-white transition-colors">Newsletter</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Impact Reports</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Transparency</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-syne text-[11px] font-bold tracking-[0.12em] uppercase text-white/35 mb-5">Organisation</h5>
          <ul className="flex flex-col gap-3 text-[13px] text-white/55">
            <li><a href="/about" className="hover:text-white transition-colors">About Sduella</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-white/30 font-syne font-semibold tracking-wider">
        <span>&copy; 2026 Sduella Community Education Fund. All rights reserved.</span>
        <span>Not crowdfunding &mdash; A managed education fund.</span>
      </div>
    </div>
  </footer>
);

const AuthModal = ({ isOpen, onClose, onLogin }: { isOpen: boolean, onClose: () => void, onLogin: (user: User) => void }) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'login' | 'register'>('login');

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register state
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
      if (window.location.pathname !== '/donate' && window.location.pathname !== '/apply') navigate('/dashboard');
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
      if (window.location.pathname !== '/donate' && window.location.pathname !== '/apply') navigate('/dashboard');
    } else {
      alert('Invalid credentials. Try the demo buttons below.');
    }
  };

  const sendOtp = () => {
    if (!reg.email.includes('@')) return;
    setRegField('otpSent', true);
  };

  const verifyOtp = () => {
    if (reg.otpInput.length === 6) {
      setRegField('emailVerified', true);
    }
  };

  const canRegister = () => {
    if (!reg.fullName.trim() || !reg.phone.trim() || !reg.email.trim() || !reg.address.trim()) return false;
    if (!reg.password || reg.password !== reg.confirmPassword) return false;
    if (reg.role === 'student') {
      if (!reg.emailVerified) return false;
      if (!reg.idNumber.trim() || !reg.institution.trim() || !reg.year) return false;
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
    if (window.location.pathname !== '/donate' && window.location.pathname !== '/apply') navigate('/dashboard');
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[400] flex items-center justify-center p-5">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-[480px] rounded-sm relative flex flex-col max-h-[92vh]"
      >
        <button onClick={onClose} className="absolute top-4.5 right-5 p-2 text-grey-400 hover:text-black hover:bg-grey-100 rounded-sm z-10">
          <X size={16} />
        </button>

        {/* Header */}
        <div className="p-9 pb-5 shrink-0">
          <h2 className="text-[22px] font-extrabold mb-1 font-syne">
            {tab === 'login' ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-sm text-grey-600">
            {tab === 'login' ? 'Log in to access your account.' : 'Join Sduella as a donor or student.'}
          </p>
        </div>

        {/* Tab toggle */}
        <div className="px-9 shrink-0">
          <div className="grid grid-cols-2 gap-0.5 bg-grey-100 p-1 rounded-sm mb-5">
            <button onClick={() => setTab('login')} className={cn("py-2 text-[13px] font-bold rounded-sm transition-all", tab === 'login' ? "bg-white text-black shadow-sm" : "text-grey-600")}>Log In</button>
            <button onClick={() => setTab('register')} className={cn("py-2 text-[13px] font-bold rounded-sm transition-all", tab === 'register' ? "bg-white text-black shadow-sm" : "text-grey-600")}>Register</button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-9 pb-9">
          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Email address</label>
                <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none transition-colors"
                  placeholder="your@email.com" required />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Password</label>
                <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none transition-colors"
                  placeholder="Your password" required />
              </div>
              <button type="submit" className="w-full py-3 bg-black text-white font-syne font-bold text-sm tracking-wide rounded-sm hover:bg-black/90 transition-colors">
                Log In
              </button>
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
              {/* Role toggle */}
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

              {/* Name + Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Full Name</label>
                  <input type="text" value={reg.fullName} onChange={e => setRegField('fullName', e.target.value)}
                    className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none transition-colors text-sm"
                    placeholder="First and last name" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Phone</label>
                  <input type="tel" value={reg.phone} onChange={e => setRegField('phone', e.target.value)}
                    className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none transition-colors text-sm"
                    placeholder="+27 000 000 0000" required />
                </div>
              </div>

              {/* Email + OTP */}
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
                    <button type="button" onClick={sendOtp} disabled={!reg.email.includes('@')}
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
                    <button type="button" onClick={verifyOtp} disabled={reg.otpInput.length !== 6}
                      className="px-3.5 py-2 bg-blue text-white text-[11px] font-bold uppercase tracking-wider rounded-sm disabled:opacity-40">
                      Verify
                    </button>
                  </div>
                )}
                {reg.role === 'student' && reg.otpSent && !reg.emailVerified && (
                  <p className="text-[11px] text-grey-500 mt-1">OTP sent (demo: any 6 digits accepted)</p>
                )}
              </div>

              {/* Student-only fields */}
              {reg.role === 'student' && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">SA ID Number</label>
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

              {/* Home address */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Home Address</label>
                <input type="text" value={reg.address} onChange={e => setRegField('address', e.target.value)}
                  className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none transition-colors text-sm"
                  placeholder="Street, City, Province" required />
              </div>

              {/* Password */}
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

// --- Pages ---

const Home = ({ poolAmount, donorCount }: { poolAmount: number, donorCount: number }) => {
  const [flowStep, setFlowStep]       = useState(0);
  const [pipelineStep, setPipelineStep] = useState(0);
  const [poolDisplay, setPoolDisplay]  = useState('R 247,800');
  const [schoolDisplay, setSchoolDisplay] = useState('R 0');
  const [poolAmountFlash, setPoolAmountFlash] = useState(false);
  const [poolWaterHeight, setPoolWaterHeight] = useState('38%');
  const [progress, setProgress]        = useState(0);
  const [progressLabel, setProgressLabel] = useState('—');
  const [seq, setSeq]                  = useState(0);

  // Wave SVG refs
  const waveBackRef  = useRef<SVGPathElement>(null);
  const waveMidRef   = useRef<SVGPathElement>(null);
  const waveFrontRef = useRef<SVGPathElement>(null);
  const waveLineRef  = useRef<SVGPathElement>(null);
  const animFrameRef = useRef<number>(0);
  const waveStartRef = useRef(performance.now());

  // Coin + position refs
  const coin1Ref     = useRef<HTMLDivElement>(null);
  const coin2Ref     = useRef<HTMLDivElement>(null);
  const donorCardRef = useRef<HTMLDivElement>(null);
  const poolCircleRef= useRef<HTMLDivElement>(null);
  const schoolCardRef= useRef<HTMLDivElement>(null);
  const canvas1Ref   = useRef<HTMLDivElement>(null);

  // ── Continuous wave animation ──────────────────────────────────────────────
  useEffect(() => {
    const buildPath = (t: number, amp: number, speed: number, phase: number, baseY: number, close: boolean) => {
      const pts: string[] = [];
      for (let i = 0; i <= 24; i++) {
        const x = (i / 24) * 200;
        const y = baseY
          + Math.sin(x * 0.04 + t * speed + phase) * amp
          + Math.sin(x * 0.08 + t * speed * 1.4 + phase) * (amp * 0.4);
        pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`);
      }
      return pts.join(' ') + (close ? ' L 200 60 L 0 60 Z' : '');
    };

    const tick = (now: number) => {
      const t = (now - waveStartRef.current) / 1000;
      waveBackRef.current?.setAttribute('d',  buildPath(t, 4,   1.2, 0,   32, true));
      waveMidRef.current?.setAttribute('d',   buildPath(t, 3.5, 1.6, 1.5, 30, true));
      waveFrontRef.current?.setAttribute('d', buildPath(t, 3,   2.0, 3,   27, true));
      waveLineRef.current?.setAttribute('d',  buildPath(t, 3,   2.0, 3,   27, false));
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // ── Coin fly helper ────────────────────────────────────────────────────────
  const flyCoin = useCallback((
    coinEl: HTMLDivElement,
    fromX: number, fromY: number,
    toX: number, toY: number,
    dur: number
  ) => {
    coinEl.style.transition = 'none';
    coinEl.style.left    = `${fromX}px`;
    coinEl.style.top     = `${fromY}px`;
    coinEl.style.opacity = '1';
    coinEl.style.transform = 'scale(1)';
    void coinEl.offsetWidth; // force reflow
    coinEl.style.transition = `left ${dur}ms cubic-bezier(0.4,0,0.2,1), top ${dur}ms cubic-bezier(0.4,0,0.2,1), transform ${dur}ms ease, opacity 0.2s`;
    coinEl.style.left = `${toX}px`;
    coinEl.style.top  = `${toY}px`;
    setTimeout(() => { coinEl.style.opacity = '0'; coinEl.style.transform = 'scale(0.3)'; }, dur - 100);
  }, []);

  // ── Main sequence ──────────────────────────────────────────────────────────
  useEffect(() => {
    setFlowStep(0); setPipelineStep(0);
    setPoolDisplay('R 247,800'); setSchoolDisplay('R 0');
    setPoolWaterHeight('38%'); setPoolAmountFlash(false);
    setProgress(0); setProgressLabel('—');

    const ids: ReturnType<typeof setTimeout>[] = [];
    const at = (fn: () => void, ms: number) => { const id = setTimeout(fn, ms); ids.push(id); };
    let t = 600;

    at(() => setProgressLabel('Transferring funds'), t); t += 400;

    // donor → pool coin
    at(() => {
      setFlowStep(1);
      const coin = coin1Ref.current;
      const canvas = canvas1Ref.current;
      const donor = donorCardRef.current;
      const pool  = poolCircleRef.current;
      if (coin && canvas && donor && pool) {
        const cr = canvas.getBoundingClientRect();
        const dr = donor.getBoundingClientRect();
        const pr = pool.getBoundingClientRect();
        flyCoin(coin,
          dr.right  - cr.left - 7,  dr.top + dr.height / 2 - cr.top,
          pr.left   + pr.width / 2 - cr.left, pr.top + pr.height / 2 - cr.top,
          1200);
      }
    }, t); t += 1300;

    at(() => {
      setPoolWaterHeight('52%');
      setPoolAmountFlash(true);
      setPoolDisplay('R 249,000');
      setProgress(33);
    }, t);
    at(() => setPoolAmountFlash(false), t + 400);
    t += 1200;

    at(() => setFlowStep(2), t); t += 1000;
    at(() => setFlowStep(3), t); t += 400;

    // pool → school coin
    at(() => {
      const coin = coin2Ref.current;
      const canvas = canvas1Ref.current;
      const pool   = poolCircleRef.current;
      const school = schoolCardRef.current;
      if (coin && canvas && pool && school) {
        const cr = canvas.getBoundingClientRect();
        const pr = pool.getBoundingClientRect();
        const sr = school.getBoundingClientRect();
        flyCoin(coin,
          pr.left + pr.width / 2 - cr.left, pr.top + pr.height / 2 - cr.top,
          sr.left - cr.left + 7,             pr.top + pr.height / 2 - cr.top,
          1200);
      }
    }, t); t += 1300;

    at(() => {
      setPoolWaterHeight('44%');
      setPoolAmountFlash(true);
      setPoolDisplay('R 236,500');
      setSchoolDisplay('R 12,500');
      setFlowStep(4);
      setProgress(50);
    }, t);
    at(() => setPoolAmountFlash(false), t + 400);
    t += 1200;

    at(() => setProgressLabel('Reviewing application'), t); t += 400;
    at(() => { setPipelineStep(1); setProgress(60);  }, t); t += 1500;
    at(() => { setPipelineStep(2); setProgress(72);  }, t); t += 1800;
    at(() => { setPipelineStep(3); setProgress(85);  }, t); t += 1700;
    at(() => { setPipelineStep(4); setProgress(100); setProgressLabel('Sequence complete'); }, t); t += 1500;
    at(() => setSeq(s => s + 1), t + 3500);

    return () => ids.forEach(clearTimeout);
  }, [seq, flyCoin]);

  return (
    <div className="pt-[62px]">
      {/* Hero */}
      <section className="min-h-[calc(100vh-62px)] grid grid-cols-1 lg:grid-cols-2">
        <div className="p-12 md:p-24 flex flex-col justify-center border-r border-grey-200">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border-1.5 border-grey-200 rounded-full mb-8 w-fit">
            <div className="w-2 h-2 rounded-full bg-blue animate-pulse" />
            <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-grey-600">Unlocking Potential</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tighter mb-6">
            No campaign.<br />No algorithm.<br />Just <span className="text-blue">completion.</span>
          </h1>
          <p className="text-lg text-grey-600 leading-relaxed max-w-md mb-10">
            Sduella is more than just funding. We are a community dedicated to unlocking opportunities and ensuring every student has a guaranteed path to their degree.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/apply" className="px-8 py-4 bg-black text-white font-syne font-bold text-sm tracking-wide rounded-sm hover:bg-black/90 transition-colors">Register as Student</a>
            <a href="/donate" className="px-8 py-4 border-1.5 border-blue text-blue font-syne font-bold text-sm tracking-wide rounded-sm hover:bg-blue/5 transition-colors">Become a Visionary Donor</a>
          </div>
        </div>
        <div className="bg-off-white p-12 md:p-24 flex flex-col justify-center bg-[url(https://plus.unsplash.com/premium_photo-1713296255442-e9338f42aad8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JhZHVhdGV8ZW58MHx8MHx8fDA%3D)] bg-cover bg-center">
          <div className="mb-12">
            <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-2">Our Mission</span>
            <div className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-tight">Unlocking the next generation of leaders.</div>
            <p className="text-sm text-grey-600 mt-4 leading-relaxed max-w-sm">
              We believe that financial barriers should never stand in the way of potential. Our focus is on providing the stability needed for students to focus on what matters: their education and their future.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-grey-200 border border-grey-200">
            {[
              { label: 'Community', value: 'Active' },
              { label: 'Registered Students', value: '1,204' },
              { label: 'Review Capacity', value: '48h' },
              { label: 'Launch Phase', value: 'Foundational' }
            ].map(stat => (
              <div key={stat.label} className="bg-white p-6">
                <div className="text-3xl font-extrabold mb-1">{stat.value}</div>
                <div className="font-syne text-[10px] font-bold tracking-widest uppercase text-grey-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="h-14 border-y border-grey-200 bg-white overflow-hidden flex items-center">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex">
              {['Graduation Clearance', 'Tuition Fees', 'Student Accommodation', 'Study Materials', 'Bursary Bridging', '48-Hour Reviews', 'No Campaigns Required', 'Direct Disbursement'].map(item => (
                <span key={item} className="px-10 border-r border-grey-200 font-syne text-[11px] font-bold tracking-[0.15em] uppercase text-grey-400">
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Summary - Redesigned for Flexibility */}
      <section id="how" className="py-24 px-6 md:px-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">

          {/* Intro split */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-20 items-end mb-20 pb-12 border-b border-grey-200">
            <div>
              <span className="font-syne text-[11px] font-bold tracking-[0.2em] uppercase text-blue block mb-6">— How it works</span>
              <h2 className="font-syne text-6xl md:text-[80px] font-extrabold tracking-[-0.04em] leading-[0.95] text-black">
                Every rand<br/>has a <em className="italic text-blue">path.</em>
              </h2>
            </div>
            <div className="pb-3">
              <p className="text-grey-600 leading-relaxed mb-4">Sduella is not a campaign platform. There are no individual donation pages competing for attention.</p>
              <p className="text-black font-medium leading-relaxed">Donors contribute to a single, transparent pool. Students apply with verified need. Every fund moves directly to the institution.</p>
            </div>
          </div>

          {/* 01 — Donor flow */}
          <div className="mb-28">
            <div className="flex items-baseline gap-6 mb-10">
              <span className="font-syne text-[96px] font-bold text-blue leading-none tracking-[-0.04em] italic">01</span>
              <div>
                <div className="font-syne text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-2">— The donor's rand</div>
                <div className="font-syne text-[28px] font-semibold text-black tracking-[-0.02em]">From contribution to disbursement</div>
              </div>
            </div>

            <div ref={canvas1Ref} className="bg-white border border-grey-200 p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-40" style={{backgroundImage:'linear-gradient(#e0e0dc 1px,transparent 1px),linear-gradient(90deg,#e0e0dc 1px,transparent 1px)',backgroundSize:'40px 40px'}} />

              {/* Flying coins — absolutely positioned, animated via JS refs */}
              <div ref={coin1Ref} className="absolute w-3.5 h-3.5 bg-blue rounded-full z-30 pointer-events-none opacity-0" style={{boxShadow:'0 0 0 3px rgba(26,107,255,0.2)'}} />
              <div ref={coin2Ref} className="absolute w-3.5 h-3.5 bg-blue rounded-full z-30 pointer-events-none opacity-0" style={{boxShadow:'0 0 0 3px rgba(26,107,255,0.2)'}} />

              {/* Desktop */}
              <div className="hidden lg:flex items-center min-h-[340px]">

                {/* Donor card */}
                <div ref={donorCardRef} className="w-[240px] flex-shrink-0 bg-black text-white p-6 relative z-10">
                  <div className="font-syne text-[10px] font-bold tracking-[0.2em] uppercase text-white/55 mb-4">— Donor</div>
                  <div className="font-syne text-lg font-semibold mb-1 tracking-[-0.01em]">Lerato M.</div>
                  <div className="text-sm text-white/65 mb-5">Recurring contributor, Cape Town</div>
                  <div className="font-syne text-[36px] font-bold tracking-[-0.02em] leading-none">R 1,200</div>
                  <div className="font-syne text-[12px] font-semibold uppercase tracking-[0.05em] text-white/65 mt-1.5">Monthly contribution</div>
                </div>

                {/* Left fill line */}
                <div className="flex-1 h-0.5 bg-[#e0e0dc] relative overflow-hidden z-0">
                  <div className="absolute inset-0 bg-blue transition-[width] duration-1000 ease-in-out" style={{width: flowStep >= 1 ? '100%' : '0%'}} />
                </div>

                {/* Pool */}
                <div className="flex flex-col items-center flex-shrink-0 z-10 px-2">
                  <div ref={poolCircleRef} className="relative w-[200px] h-[200px] rounded-full border-2 border-black bg-[#fafaf7] flex items-center justify-center overflow-hidden">
                    {/* Animated water with SVG waves */}
                    <div
                      className="absolute left-0 right-0 bottom-0 overflow-visible"
                      style={{ height: poolWaterHeight, transition: 'height 1.2s cubic-bezier(0.4,0,0.2,1)' }}
                    >
                      <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="absolute left-0 right-0 bottom-0 w-full overflow-visible" style={{height:'100%'}}>
                        <path ref={waveBackRef}  fill="#1a6bff" fillOpacity="0.18" />
                        <path ref={waveMidRef}   fill="#1a6bff" fillOpacity="0.22" />
                        <path ref={waveFrontRef} fill="#1a6bff" fillOpacity="0.28" />
                        <path ref={waveLineRef}  fill="none" stroke="#1a6bff" strokeWidth="1.5" strokeOpacity="0.5" />
                      </svg>
                    </div>
                    <div className="relative z-10 text-center px-4">
                      <div className="font-syne text-[10px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-2">Active pool</div>
                      <div
                        className="font-syne text-[28px] font-bold tracking-[-0.02em] leading-none transition-all duration-300"
                        style={{ color: poolAmountFlash ? '#1a6bff' : '#111111', transform: poolAmountFlash ? 'scale(1.05)' : 'scale(1)' }}
                      >
                        {poolDisplay}
                      </div>
                      <div className="font-syne text-[10px] font-semibold uppercase tracking-[0.05em] text-grey-500 mt-2">Held in escrow</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-5 px-4 py-2.5 border border-grey-200 bg-[#fafaf7]">
                    <span className={cn(
                      "w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300",
                      flowStep === 0 ? "bg-[#9a9a96]" : flowStep >= 4 ? "bg-green" : "bg-blue animate-pulse"
                    )} />
                    <span className="font-syne text-[11px] font-semibold tracking-[0.05em] text-black">
                      {flowStep === 0 ? 'Waiting' : flowStep === 1 ? 'Receiving contribution' : flowStep === 2 ? 'Matching to verified need' : flowStep === 3 ? 'Releasing funds' : 'Disbursed'}
                    </span>
                  </div>
                </div>

                {/* Right fill line */}
                <div className="flex-1 h-0.5 bg-[#e0e0dc] relative overflow-hidden z-0">
                  <div className="absolute inset-0 bg-blue transition-[width] duration-1000 ease-in-out" style={{width: flowStep >= 3 ? '100%' : '0%'}} />
                </div>

                {/* Institution card */}
                <div ref={schoolCardRef} className="w-[240px] flex-shrink-0 bg-blue text-white p-6 relative z-10">
                  <div className="font-syne text-[10px] font-bold tracking-[0.2em] uppercase text-white/70 mb-4">— Institution</div>
                  <div className="font-syne text-lg font-semibold mb-1 tracking-[-0.01em]">VUT</div>
                  <div className="text-sm text-white/85 mb-5">Vaal University of Technology</div>
                  <div
                    className="font-syne text-[36px] font-bold tracking-[-0.02em] leading-none transition-opacity duration-500"
                    style={{ opacity: flowStep >= 4 ? 1 : 0.3 }}
                  >
                    {schoolDisplay}
                  </div>
                  <div className="font-syne text-[12px] font-semibold uppercase tracking-[0.05em] text-white/80 mt-1.5">Tuition disbursed</div>
                </div>
              </div>

              {/* Mobile */}
              <div className="lg:hidden flex flex-col gap-6 items-center py-4">
                <div className="w-full bg-black text-white p-6">
                  <div className="font-syne text-[10px] font-bold tracking-[0.2em] uppercase text-white/55 mb-3">— Donor</div>
                  <div className="font-syne text-lg font-semibold">Lerato M.</div>
                  <div className="text-sm text-white/65 mb-4">Recurring contributor, Cape Town</div>
                  <div className="font-syne text-[32px] font-bold leading-none">R 1,200</div>
                  <div className="font-syne text-[11px] font-semibold uppercase tracking-[0.05em] text-white/65 mt-1.5">Monthly contribution</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="relative w-[160px] h-[160px] rounded-full border-2 border-black bg-[#fafaf7] flex items-center justify-center overflow-hidden">
                    <div className="absolute left-0 right-0 bottom-0 overflow-visible" style={{ height: poolWaterHeight, transition: 'height 1.2s cubic-bezier(0.4,0,0.2,1)' }}>
                      <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="absolute left-0 right-0 bottom-0 w-full overflow-visible" style={{height:'100%'}}>
                        <path fill="#1a6bff" fillOpacity="0.18" d="M 0 32 L 200 32 L 200 60 L 0 60 Z" />
                        <path fill="#1a6bff" fillOpacity="0.28" d="M 0 27 L 200 27 L 200 60 L 0 60 Z" />
                      </svg>
                    </div>
                    <div className="relative z-10 text-center px-3">
                      <div className="font-syne text-[9px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-1">Active pool</div>
                      <div className="font-syne text-xl font-bold">{poolDisplay}</div>
                      <div className="font-syne text-[9px] font-semibold uppercase tracking-[0.05em] text-grey-500 mt-1">Held in escrow</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 px-3 py-2 border border-grey-200 bg-[#fafaf7]">
                    <span className={cn("w-2 h-2 rounded-full flex-shrink-0", flowStep === 0 ? "bg-[#9a9a96]" : flowStep >= 4 ? "bg-green" : "bg-blue animate-pulse")} />
                    <span className="font-syne text-[10px] font-semibold tracking-[0.05em] text-black">
                      {flowStep === 0 ? 'Waiting' : flowStep === 1 ? 'Receiving' : flowStep === 2 ? 'Matching' : flowStep === 3 ? 'Releasing' : 'Disbursed'}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-blue text-white p-6">
                  <div className="font-syne text-[10px] font-bold tracking-[0.2em] uppercase text-white/70 mb-3">— Institution</div>
                  <div className="font-syne text-lg font-semibold">VUT</div>
                  <div className="text-sm text-white/85 mb-4">Vaal University of Technology</div>
                  <div className="font-syne text-[32px] font-bold leading-none transition-opacity duration-500" style={{opacity: flowStep >= 4 ? 1 : 0.3}}>{schoolDisplay}</div>
                  <div className="font-syne text-[11px] font-semibold uppercase tracking-[0.05em] text-white/80 mt-1.5">Tuition disbursed</div>
                </div>
              </div>
            </div>
          </div>

          {/* 02 — Student pipeline */}
          <div className="mb-16">
            <div className="flex items-baseline gap-6 mb-10">
              <span className="font-syne text-[96px] font-bold text-blue leading-none tracking-[-0.04em] italic">02</span>
              <div>
                <div className="font-syne text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-2">— The student's path</div>
                <div className="font-syne text-[28px] font-semibold text-black tracking-[-0.02em]">From application to approval</div>
              </div>
            </div>

            <div className="bg-white border border-grey-200 p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-40" style={{backgroundImage:'linear-gradient(#e0e0dc 1px,transparent 1px),linear-gradient(90deg,#e0e0dc 1px,transparent 1px)',backgroundSize:'40px 40px'}} />

              <div className="relative grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12">

                {/* Application doc */}
                <div className={cn("bg-white border border-black p-7 relative transition-all duration-500", pipelineStep >= 3 && "shadow-2xl shadow-blue/10")}>
                  {pipelineStep >= 3 && (
                    <motion.div
                      initial={{ scale: 2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute top-6 -right-3 bg-blue text-white font-syne text-sm font-bold tracking-[0.15em] px-4 py-2 rotate-[8deg] border-2 border-white shadow-md z-10"
                    >
                      APPROVED
                    </motion.div>
                  )}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-grey-100">
                    <span className="text-[11px] font-semibold text-grey-400 tracking-[0.1em] font-mono">APP-2026-0847</span>
                    <span className={cn(
                      "font-syne text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 transition-all duration-500",
                      pipelineStep === 0 ? "bg-grey-100 text-grey-500" :
                      pipelineStep <= 2 ? "bg-blue/10 text-blue" : "bg-blue text-white"
                    )}>
                      {pipelineStep === 0 ? 'Pending' : pipelineStep <= 2 ? 'In Review' : 'Approved'}
                    </span>
                  </div>
                  <h3 className="font-syne text-xl font-semibold text-black mb-1 tracking-[-0.01em]">Thabo M.</h3>
                  <p className="text-sm text-grey-500 mb-5">BEng Industrial Engineering · Year 3</p>
                  {[
                    ['Institution', 'VUT'],
                    ['Need category', 'Outstanding tuition'],
                    ['Documents', '4 of 4 verified'],
                    ['Application date', '04 May 2026'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between py-2 border-b border-dashed border-grey-200 text-sm last:border-0">
                      <span className="text-grey-400">{label}</span>
                      <span className="text-black font-medium font-syne">{value}</span>
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t border-black flex justify-between items-baseline">
                    <span className="font-syne text-[11px] font-bold tracking-[0.15em] uppercase text-grey-400">— Requested</span>
                    <span className="font-syne text-2xl font-bold text-black tracking-[-0.02em]">R 12,500</span>
                  </div>
                </div>

                {/* Pipeline steps */}
                <div className="pl-8 border-l border-grey-200 flex flex-col gap-6">
                  {([
                    { Icon: FileText,   num: '01', title: 'Application submitted',       desc: 'Student uploads supporting documents and academic records.',                               times: ['Awaiting','Just now','Completed','Completed','Completed'] },
                    { Icon: ShieldCheck,num: '02', title: 'Document verification',       desc: 'Institution and identity records cross-checked against partner data.',                   times: ['Awaiting','Awaiting','Verifying...','Completed','Completed'] },
                    { Icon: Check,      num: '03', title: 'Eligibility approved',         desc: 'Application passes review against published funding criteria.',                          times: ['Awaiting','Awaiting','Awaiting','Approving','Completed'] },
                    { Icon: ArrowRight, num: '04', title: 'Funds released to institution',desc: 'Payment routed directly to the university account. No cash to student.',               times: ['Awaiting','Awaiting','Awaiting','Awaiting','Released to VUT'] },
                  ] as const).map(({ Icon, num, title, desc, times }, i) => (
                    <div key={i} className={cn("grid grid-cols-[32px_1fr] gap-4 items-start transition-all duration-500", i >= pipelineStep ? "opacity-30" : "opacity-100")}>
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 -ml-12 border transition-all duration-500",
                        pipelineStep === i + 1 ? "bg-blue border-blue text-white shadow-[0_0_0_4px_rgba(26,107,255,0.15)]" :
                        pipelineStep > i + 1  ? "bg-black border-black text-white" :
                        "bg-off-white border-grey-200 text-grey-400"
                      )}>
                        <Icon size={14} />
                      </div>
                      <div>
                        <div className={cn("font-syne text-[10px] font-bold tracking-[0.2em] uppercase mb-1 transition-colors duration-300",
                          pipelineStep === i + 1 ? "text-blue" : pipelineStep > i + 1 ? "text-black" : "text-grey-400"
                        )}>— Step {num}</div>
                        <div className="font-syne text-base font-semibold text-black tracking-[-0.01em] mb-1">{title}</div>
                        <div className="text-sm text-grey-500 leading-relaxed">{desc}</div>
                        <div className={cn("text-[11px] mt-1.5 font-medium transition-colors duration-300",
                          pipelineStep === i + 1 ? "text-blue font-semibold" : "text-grey-400"
                        )}>{times[Math.min(pipelineStep, 4) as 0|1|2|3|4]}</div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

          {/* Progress bar + Replay */}
          <div className="flex items-center justify-between gap-6 pt-6 border-t border-grey-200 flex-wrap mb-20">
            <div className="flex items-center gap-4 flex-1 min-w-[240px]">
              <span className="font-syne text-[11px] font-bold tracking-[0.15em] uppercase text-grey-400 min-w-[160px]">{progressLabel}</span>
              <div className="flex-1 h-px bg-grey-200 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-blue"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            <button
              onClick={() => setSeq(s => s + 1)}
              className="font-syne text-[11px] font-bold py-3 px-6 border-[1.5px] border-black bg-black text-white tracking-[0.15em] uppercase hover:bg-blue hover:border-blue transition-all"
            >
              Replay sequence
            </button>
          </div>

          {/* CTA */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-12 bg-blue text-white">
            <div className="max-w-xl">
              <h3 className="text-3xl font-extrabold mb-3">Be part of the solution.</h3>
              <p className="text-white/70 text-lg">Whether you are a donor investing in the future or a student needing a bridge to graduation.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <a href="/donate" className="px-10 py-4 bg-white text-blue font-syne font-bold text-sm tracking-wide hover:bg-grey-100 transition-all text-center">Donate Now</a>
              <a href="/apply" className="px-10 py-4 border-2 border-white text-white font-syne font-bold text-sm tracking-wide hover:bg-white/10 transition-all text-center">Apply for Funding</a>
            </div>
          </div>

        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">Who Qualifies</span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1]">What the fund covers.</h2>
            </div>
            <p className="text-grey-600 text-sm md:text-base max-w-sm">
              We prioritize applications that have a direct impact on graduation and academic continuity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Featured: Graduation Clearance */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-8 bg-black text-white p-10 md:p-14 rounded-sm relative overflow-hidden group"
            >
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue text-[10px] font-bold tracking-widest uppercase rounded-sm mb-8">
                  <ShieldCheck size={12} /> High Priority
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold mb-4 max-w-md">Graduation Clearance</h3>
                <p className="text-white/60 text-lg leading-relaxed max-w-lg mb-8">
                  For students who have completed all academic requirements but are blocked from graduating due to outstanding fee balances.
                </p>
                <a href="/apply" className="inline-flex items-center gap-2 text-sm font-bold border-b-2 border-blue pb-1 hover:text-blue transition-colors">
                  Apply for Clearance <ArrowRight size={16} />
                </a>
              </div>
              <GraduationCap className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 group-hover:text-white/10 transition-colors rotate-12" />
            </motion.div>

            {/* Tuition Fees */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-4 bg-off-white border border-grey-200 p-10 rounded-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 bg-white border border-grey-200 rounded-sm flex items-center justify-center mb-8 shadow-sm">
                  <CreditCard size={20} className="text-blue" />
                </div>
                <h3 className="text-xl font-extrabold mb-3">Tuition Fees</h3>
                <p className="text-[13px] text-grey-600 leading-relaxed">
                  Support for enrolled students in good standing facing mid-year financial shortfalls.
                </p>
              </div>
              <span className="mt-8 text-[10px] font-bold tracking-widest uppercase text-grey-400">Open Category</span>
            </motion.div>

            {/* Accommodation */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-4 bg-off-white border border-grey-200 p-10 rounded-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 bg-white border border-grey-200 rounded-sm flex items-center justify-center mb-8 shadow-sm">
                  <LayoutDashboard size={20} className="text-blue" />
                </div>
                <h3 className="text-xl font-extrabold mb-3">Accommodation</h3>
                <p className="text-[13px] text-grey-600 leading-relaxed">
                  Residence fees preventing a student from attending or continuing their studies.
                </p>
              </div>
              <span className="mt-8 text-[10px] font-bold tracking-widest uppercase text-grey-400">Open Category</span>
            </motion.div>

            {/* Study Materials */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-4 bg-off-white border border-grey-200 p-10 rounded-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 bg-white border border-grey-200 rounded-sm flex items-center justify-center mb-8 shadow-sm">
                  <FileText size={20} className="text-blue" />
                </div>
                <h3 className="text-xl font-extrabold mb-3">Study Materials</h3>
                <p className="text-[13px] text-grey-600 leading-relaxed">
                  Textbooks, laptops, and essential equipment required for coursework completion.
                </p>
              </div>
              <span className="mt-8 text-[10px] font-bold tracking-widest uppercase text-grey-400">Open Category</span>
            </motion.div>

            {/* Others: Bridging & Medical */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-4 bg-blue text-white p-10 rounded-sm flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-extrabold mb-3">Special Cases</h3>
                <p className="text-white/70 text-[13px] leading-relaxed mb-6">
                  We also consider Bursary Bridging and Medical Disruption on a case-by-case basis.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" /> Bursary Bridging
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" /> Medical Disruption
                  </div>
                </div>
              </div>
              <a href="/apply" className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest hover:translate-x-1 transition-transform">
                Inquire Now <ArrowRight size={14} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Donate = ({ onOpenAuth, user, onDonate, onUpdateUser }: { onOpenAuth: () => void, user: User | null, onDonate: (amount: number) => void, onUpdateUser: (user: User) => void }) => {
  const [amount, setAmount] = useState('1000');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [step, setStep] = useState(1); // 1: Amount, 2: Payment, 3: Success
  const [donorInfo, setDonorInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    message: ''
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: user?.name || ''
  });

  // Sync user info if they log in while on this page
  useEffect(() => {
    if (user) {
      setDonorInfo(prev => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || ''
      }));
      setPaymentData(prev => ({
        ...prev,
        name: prev.name || user.name || ''
      }));
    }
  }, [user]);

  const amounts = ['500', '1000', '2500', '5000', '10000'];

  const handleProceedToPayment = () => {
    const donationAmount = parseInt(amount) || 0;
    if (donationAmount <= 0) return;
    setStep(2);
  };

  const handleDonate = () => {
    const donationAmount = parseInt(amount) || 0;
    
    onDonate(donationAmount);

    if (user && user.role === 'donor') {
      const newDonation = {
        date: new Date().toISOString().split('T')[0],
        amount: donationAmount,
        students: Math.floor(donationAmount / 2500) || 1,
        status: 'Active'
      };
      const updatedUser = {
        ...user,
        totalDonated: (user.totalDonated || 0) + donationAmount,
        donations: [newDonation, ...(user.donations || [])]
      };
      onUpdateUser(updatedUser);
    }
    setStep(3);
  };

  if (step === 3) {
    return (
      <div className="pt-[62px] min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <CheckCircle2 className="w-16 h-16 text-green mb-6" />
        <h1 className="text-3xl font-extrabold mb-4">
          {donorInfo.name ? `Thank You, ${donorInfo.name.split(' ')[0]}` : 'Thank You for Your Contribution'}
        </h1>
        <p className="text-grey-600 max-w-md mb-8">
          Your donation of R {(parseInt(amount) || 0).toLocaleString()} has been added to the foundational pool. {donorInfo.name ? 'You are now a Sduella Visionary.' : 'Your contribution makes a real difference.'}
        </p>
        <div className="flex gap-4">
          <a href="/" className="px-8 py-4 border-1.5 border-black text-black font-syne font-bold text-sm tracking-wide rounded-sm">Back to Home</a>
          {user && <a href="/dashboard" className="px-8 py-4 bg-black text-white font-syne font-bold text-sm tracking-wide rounded-sm">View Dashboard</a>}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[62px]">
      <section className="bg-off-white border-b border-grey-200 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">Donate</span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-6">Invest in a student's future.</h1>
          <p className="text-lg text-grey-600 leading-relaxed max-w-2xl">
            Every contribution goes into a managed fund disbursed exclusively to reviewed, approved student applications. No intermediaries. Direct to institution.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">Why It Matters</span>
            <h2 className="text-3xl font-extrabold mb-6">Your contribution is different here.</h2>
            <p className="text-grey-600 leading-relaxed mb-10">
              Sduella is not a crowdfunding platform. There are no individual campaigns to back, no social pressure, and no algorithmic popularity contests. Your money enters a managed pool and is disbursed based solely on merit and need.
            </p>
            <div className="space-y-4">
              {[
                'Funds go directly to institutions, not individuals',
                'Every application reviewed by a human committee',
                'Quarterly impact reports sent to all donors',
                'Section 18A tax receipt available on request',
                'Log into your dashboard to see cumulative impact'
              ].map(item => (
                <div key={item} className="flex items-start gap-4">
                  <div className="w-0.5 h-4 bg-blue mt-1" />
                  <span className="text-sm text-grey-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-1.5 border-grey-200 p-10 rounded-sm">
            {step === 1 ? (
              <>
                <h3 className="text-xl font-extrabold mb-8">Make a Contribution</h3>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {amounts.map(a => (
                    <button 
                      key={a}
                      onClick={() => setAmount(a)}
                      className={cn(
                        "py-3 font-syne font-extrabold text-lg border-1.5 rounded-sm transition-all",
                        amount === a ? "border-blue bg-blue/5 text-blue" : "border-grey-200 hover:border-blue/50"
                      )}
                    >
                      R {parseInt(a).toLocaleString()}
                    </button>
                  ))}
                  <button 
                    onClick={() => setAmount('')}
                    className={cn(
                      "py-3 font-syne font-extrabold text-sm border-1.5 rounded-sm transition-all",
                      !amounts.includes(amount) ? "border-blue bg-blue/5 text-blue" : "border-grey-200 hover:border-blue/50"
                    )}
                  >
                    Custom
                  </button>
                </div>
                {!amounts.includes(amount) && (
                  <div className="mb-6">
                    <input 
                      type="text" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="Enter custom amount"
                      className="w-full px-4 py-3 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none"
                    />
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6 p-4 bg-grey-100 rounded-sm">
                  <input 
                    type="checkbox" 
                    id="anonymous" 
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 accent-black"
                  />
                  <label htmlFor="anonymous" className="text-sm font-semibold text-grey-600 cursor-pointer select-none">
                    Donate anonymously
                  </label>
                </div>

                {!isAnonymous && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 mb-8"
                  >
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-grey-400">Your Name</label>
                      <input 
                        type="text" 
                        value={donorInfo.name}
                        onChange={(e) => {
                          setDonorInfo({...donorInfo, name: e.target.value});
                          setPaymentData({...paymentData, name: e.target.value});
                        }}
                        placeholder="Full Name"
                        className="w-full px-4 py-3 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-grey-400">Email Address</label>
                      <input 
                        type="email" 
                        value={donorInfo.email}
                        onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                        placeholder="email@example.com"
                        className="w-full px-4 py-3 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-grey-400">Message (Optional)</label>
                      <textarea 
                        value={donorInfo.message}
                        onChange={(e) => setDonorInfo({...donorInfo, message: e.target.value})}
                        placeholder="Leave a message of encouragement..."
                        rows={3}
                        className="w-full px-4 py-3 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none resize-none"
                      />
                    </div>
                  </motion.div>
                )}

                <button 
                  onClick={handleProceedToPayment}
                  disabled={!amount || (!isAnonymous && (!donorInfo.name || !donorInfo.email))}
                  className="w-full py-4 bg-blue text-white font-syne font-bold text-sm tracking-wide rounded-sm hover:bg-blue-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Payment
                </button>
              </>
            ) : (
              <div className="space-y-6">
                <h3 className="text-xl font-extrabold mb-2">Payment Details</h3>
                <p className="text-xs text-grey-500 mb-6 uppercase tracking-widest font-bold">Secure Checkout</p>
                
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-grey-400">Cardholder Name</label>
                    <input 
                      type="text"
                      value={paymentData.name}
                      onChange={(e) => setPaymentData({...paymentData, name: e.target.value})}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-grey-400">Card Number</label>
                    <input 
                      type="text"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value.replace(/[^0-9]/g, '').slice(0, 16)})}
                      placeholder="0000 0000 0000 0000"
                      className="w-full px-4 py-3 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-grey-400">Expiry Date</label>
                      <input 
                        type="text"
                        value={paymentData.expiry}
                        onChange={(e) => setPaymentData({...paymentData, expiry: e.target.value})}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-grey-400">CVV</label>
                      <input 
                        type="password"
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value.replace(/[^0-9]/g, '').slice(0, 3)})}
                        placeholder="***"
                        className="w-full px-4 py-3 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 border-1.5 border-grey-200 font-syne font-bold text-sm tracking-wide rounded-sm"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleDonate}
                    disabled={!paymentData.cardNumber || !paymentData.name}
                    className="flex-[2] py-4 bg-blue text-white font-syne font-bold text-sm tracking-wide rounded-sm hover:bg-blue-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Pay R {(parseInt(amount) || 0).toLocaleString()}
                  </button>
                </div>
              </div>
            )}
            <p className="text-[11px] text-grey-400 text-center mt-4 leading-relaxed">
              All donations are managed by the Sduella fund committee and disbursed to reviewed, approved students only.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const Apply = ({ user, onOpenAuth, onUpdateUser }: { user: User | null, onOpenAuth: () => void, onUpdateUser: (user: User) => void }) => {
  const [step, setStep] = useState(1); // 1: Contact, 2: Funding, 3: Documents, 4: Banking, 5: Success
  const [contactData, setContactData] = useState({
    fullName: user?.name || '',
    phone: '',
    studentEmail: user?.email || '',
    emailVerified: false,
    otpSent: false,
    otpInput: '',
    idNumber: '',
    address: ''
  });
  const [formData, setFormData] = useState({
    institution: user?.institution || '',
    year: user?.year || '',
    average: '',
    category: '',
    amount: '',
    motivation: ''
  });
  const [bankingData, setBankingData] = useState({
    bankName: '',
    accountNumber: '',
    branchCode: '',
    accountHolder: user?.name || ''
  });

  // Sync student info if they log in while on this page
  useEffect(() => {
    if (user) {
      setContactData(prev => ({
        ...prev,
        fullName: prev.fullName || user.name || '',
        studentEmail: prev.studentEmail || user.email || ''
      }));
      setFormData(prev => ({
        ...prev,
        institution: prev.institution || user.institution || '',
        year: prev.year || user.year || ''
      }));
      setBankingData(prev => ({
        ...prev,
        accountHolder: prev.accountHolder || user.name || ''
      }));
    }
  }, [user]);

  const handleSubmit = () => {
    if (!user) return;
    
    const newApp = {
      id: `APP-2026-${Math.floor(Math.random() * 900) + 100}`,
      date: new Date().toISOString().split('T')[0],
      category: formData.category || 'General Funding',
      amount: parseInt(formData.amount) || 0,
      status: 'Under Review'
    };

    const updatedUser = {
      ...user,
      applications: [newApp, ...(user.applications || [])]
    };

    onUpdateUser(updatedUser);
    setStep(5);
  };

  if (!user) {
    return (
      <div className="pt-[62px] min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <ShieldCheck className="w-16 h-16 text-grey-200 mb-6" />
        <h1 className="text-3xl font-extrabold mb-4">Authentication Required</h1>
        <p className="text-grey-600 max-w-md mb-8">
          You must be logged in as a student to apply for funding. This ensures we can track your application and verify your identity.
        </p>
        <button onClick={onOpenAuth} className="px-8 py-4 bg-black text-white font-syne font-bold text-sm tracking-wide rounded-sm">Log In / Register</button>
      </div>
    );
  }

  if (user.role !== 'student') {
    return (
      <div className="pt-[62px] min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <X className="w-16 h-16 text-red mb-6" />
        <h1 className="text-3xl font-extrabold mb-4">Access Denied</h1>
        <p className="text-grey-600 max-w-md mb-8">
          Only student accounts can apply for funding. If you are a student, please register with a student account.
        </p>
        <a href="/" className="px-8 py-4 border-1.5 border-black text-black font-syne font-bold text-sm tracking-wide rounded-sm">Back to Home</a>
      </div>
    );
  }

  return (
    <div className="pt-[62px]">
      <section className="bg-off-white border-b border-grey-200 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">Student Applications</span>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-6">Apply for the first cycle.</h1>
            <p className="text-lg text-grey-600 leading-relaxed max-w-2xl">
              We are currently accepting pre-applications. Submit your details now to be first in line for review when the fund pool reaches its initial disbursement milestone.
            </p>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-3xl font-extrabold mb-6">Before you apply</h2>
            <p className="text-grey-600 leading-relaxed mb-10">
              We review all applications against the criteria below. Applications that do not meet the baseline requirements will not proceed to committee review.
            </p>
            <div className="space-y-6 mb-12">
              {[
                'Enrolled at an accredited tertiary institution',
                'Minimum 60% academic average in current year',
                'Demonstrable financial need with documentation',
                'Final-year students receive priority'
              ].map(item => (
                <div key={item} className="flex items-start gap-4">
                  <div className="w-3 h-0.5 bg-blue mt-2.5" />
                  <span className="text-sm text-grey-600">{item}</span>
                </div>
              ))}
            </div>
            <div className="bg-off-white p-8 border border-grey-200 rounded-sm">
              <h4 className="font-syne font-bold text-sm mb-3 flex items-center gap-2">
                <FileText size={16} className="text-blue" />
                Documents you will need
              </h4>
              <p className="text-[13px] text-grey-600 leading-relaxed">
                Student card, institution fee statement, official academic transcript, and a copy of your ID. You will be asked to upload these in the next step.
              </p>
            </div>
          </div>

          <div className="bg-off-white border border-grey-200 p-10 rounded-sm">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-14 relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-grey-200 -translate-y-1/2 z-0" />
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="relative z-10 flex flex-col items-center">
                  <div className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center font-syne font-bold text-sm transition-all border-2",
                    step === s ? "bg-blue border-blue text-white shadow-lg shadow-blue/20 scale-110" :
                    step > s  ? "bg-black border-black text-white" : "bg-white border-grey-200 text-grey-400"
                  )}>
                    {step > s ? <Check size={14} /> : s}
                  </div>
                  <span className={cn(
                    "absolute -bottom-7 font-syne text-[9px] font-bold tracking-widest uppercase whitespace-nowrap",
                    step === s ? "text-blue" : "text-grey-400"
                  )}>
                    {s === 1 ? 'Contact' : s === 2 ? 'Funding' : s === 3 ? 'Documents' : s === 4 ? 'Banking' : 'Done'}
                  </span>
                </div>
              ))}
              <motion.div
                className="absolute top-1/2 left-0 h-0.5 bg-blue -translate-y-1/2 z-0"
                initial={{ width: '0%' }}
                animate={{ width: `${(step - 1) * 25}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Step 1 — Contact Details */}
            {step === 1 && (
              <div className="space-y-8">
                <h3 className="text-xl font-extrabold pb-6 border-b border-grey-200">Contact Details</h3>
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Full Name</label>
                      <input
                        type="text"
                        value={contactData.fullName}
                        onChange={(e) => setContactData({...contactData, fullName: e.target.value})}
                        placeholder="As per ID document"
                        className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Phone Number</label>
                      <input
                        type="tel"
                        value={contactData.phone}
                        onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                        placeholder="+27 000 000 0000"
                        className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none"
                      />
                    </div>
                  </div>

                  {/* Student email + OTP verification */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">
                      Student Email
                      {contactData.emailVerified && <span className="ml-2 text-green normal-case tracking-normal font-medium">· Verified</span>}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={contactData.studentEmail}
                        onChange={(e) => setContactData({...contactData, studentEmail: e.target.value, emailVerified: false, otpSent: false, otpInput: ''})}
                        placeholder="yourname@student.institution.ac.za"
                        disabled={contactData.emailVerified}
                        className={cn(
                          "flex-1 px-3.5 py-2.5 border-1.5 rounded-sm outline-none transition-colors",
                          contactData.emailVerified ? "bg-green/5 border-green text-black" : "border-grey-200 focus:border-blue bg-white"
                        )}
                      />
                      {!contactData.emailVerified && (
                        <button
                          onClick={() => setContactData({...contactData, otpSent: true})}
                          disabled={!contactData.studentEmail.includes('@')}
                          className="px-4 py-2.5 bg-black text-white font-syne font-bold text-[11px] tracking-widest uppercase rounded-sm disabled:opacity-40 whitespace-nowrap hover:bg-blue transition-colors"
                        >
                          {contactData.otpSent ? 'Resend' : 'Send Code'}
                        </button>
                      )}
                      {contactData.emailVerified && (
                        <div className="px-4 py-2.5 bg-green/10 border border-green/20 text-green font-syne font-bold text-[11px] tracking-widest uppercase rounded-sm flex items-center gap-1.5">
                          <Check size={13} /> Verified
                        </div>
                      )}
                    </div>
                    {contactData.otpSent && !contactData.emailVerified && (
                      <div className="mt-3 p-4 bg-blue/5 border border-blue/20 rounded-sm">
                        <p className="text-xs text-grey-600 mb-3">A 6-digit code has been sent to <strong>{contactData.studentEmail}</strong>. Enter it below.</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={contactData.otpInput}
                            onChange={(e) => setContactData({...contactData, otpInput: e.target.value.replace(/[^0-9]/g, '').slice(0, 6)})}
                            placeholder="000000"
                            maxLength={6}
                            className="flex-1 px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none text-center font-mono text-lg tracking-[0.3em]"
                          />
                          <button
                            onClick={() => { if (contactData.otpInput.length === 6) setContactData({...contactData, emailVerified: true}); }}
                            disabled={contactData.otpInput.length !== 6}
                            className="px-5 py-2.5 bg-blue text-white font-syne font-bold text-[11px] tracking-widest uppercase rounded-sm disabled:opacity-40"
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">SA ID Number</label>
                    <input
                      type="text"
                      value={contactData.idNumber}
                      onChange={(e) => setContactData({...contactData, idNumber: e.target.value.replace(/[^0-9]/g, '').slice(0, 13)})}
                      placeholder="13-digit ID number"
                      maxLength={13}
                      className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none font-mono tracking-widest"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Home Address</label>
                    <textarea
                      value={contactData.address}
                      onChange={(e) => setContactData({...contactData, address: e.target.value})}
                      placeholder="Street address, suburb, city, postal code"
                      className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none min-h-[80px]"
                    />
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    disabled={!contactData.fullName || !contactData.emailVerified || !contactData.idNumber || !contactData.phone}
                    className="w-full py-3.5 bg-black text-white font-syne font-bold text-sm tracking-wide rounded-sm disabled:opacity-40 hover:bg-blue transition-colors"
                  >
                    Next: Funding Details
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 — Funding Details */}
            {step === 2 && (
              <div className="space-y-8">
                <h3 className="text-xl font-extrabold pb-6 border-b border-grey-200">Funding Details</h3>
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Institution</label>
                      <select
                        value={formData.institution}
                        onChange={(e) => setFormData({...formData, institution: e.target.value})}
                        className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none bg-white"
                      >
                        <option value="">Select institution</option>
                        <option>University of Johannesburg</option>
                        <option>Vaal University of Technology</option>
                        <option>Tshwane University of Technology</option>
                        <option>University of Pretoria</option>
                        <option>University of Cape Town</option>
                        <option>University of the Witwatersrand</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Year of Study</label>
                      <select
                        value={formData.year}
                        onChange={(e) => setFormData({...formData, year: e.target.value})}
                        className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none bg-white"
                      >
                        <option value="">Select year</option>
                        <option>1st Year</option>
                        <option>2nd Year</option>
                        <option>3rd Year</option>
                        <option>4th Year</option>
                        <option>Honours</option>
                        <option>Masters</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Academic Average (%)</label>
                    <input
                      type="text"
                      value={formData.average}
                      onChange={(e) => setFormData({...formData, average: e.target.value.replace(/[^0-9]/g, '').slice(0, 3)})}
                      placeholder="e.g. 68"
                      className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Funding Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none bg-white"
                    >
                      <option value="">Select category</option>
                      <option>Graduation Clearance</option>
                      <option>Tuition Fees</option>
                      <option>Accommodation</option>
                      <option>Study Materials</option>
                      <option>Bursary Bridging</option>
                      <option>Medical Disruption</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Amount Required (R)</label>
                    <input
                      type="text"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value.replace(/[^0-9]/g, '')})}
                      placeholder="e.g. 8500"
                      className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Motivation Statement</label>
                    <textarea
                      value={formData.motivation}
                      onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                      placeholder="Briefly describe your financial situation and how this funding will help you complete your studies..."
                      className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none min-h-[120px]"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setStep(1)} className="flex-1 py-3.5 border-1.5 border-grey-200 font-syne font-bold text-sm rounded-sm hover:bg-white transition-colors">Back</button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!formData.institution || !formData.year || !formData.category || !formData.amount}
                      className="flex-1 py-3.5 bg-black text-white font-syne font-bold text-sm rounded-sm disabled:opacity-40 hover:bg-blue transition-colors"
                    >
                      Next: Upload Documents
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 — Documents */}
            {step === 3 && (
              <div className="space-y-8">
                <h3 className="text-xl font-extrabold pb-6 border-b border-grey-200">Supporting Documents</h3>
                <div className="space-y-5">
                  <p className="text-sm text-grey-600">Upload clear, legible copies of the following. All documents are reviewed privately by the Sduella committee.</p>
                  {[
                    { name: 'Academic Transcript (Latest)', note: 'Official document from your institution' },
                    { name: 'Institution Fee Statement', note: 'Showing outstanding or projected balance' },
                    { name: 'National ID / Passport', note: 'Must match the ID number provided' },
                    { name: 'Student Card', note: 'Current academic year' },
                  ].map(doc => (
                    <div key={doc.name} className="p-4 border-1.5 border-dashed border-grey-200 rounded-sm flex items-center justify-between gap-4 bg-white">
                      <div>
                        <div className="text-[13px] font-semibold text-black">{doc.name}</div>
                        <div className="text-[11px] text-grey-400 mt-0.5">{doc.note}</div>
                      </div>
                      <button className="text-[11px] font-bold text-blue uppercase tracking-widest flex items-center gap-1.5 shrink-0">
                        <Plus size={14} /> Upload
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setStep(2)} className="flex-1 py-3.5 border-1.5 border-grey-200 font-syne font-bold text-sm rounded-sm hover:bg-white transition-colors">Back</button>
                    <button onClick={() => setStep(4)} className="flex-1 py-3.5 bg-black text-white font-syne font-bold text-sm rounded-sm hover:bg-blue transition-colors">Next: Banking Details</button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 — Banking */}
            {step === 4 && (
              <div className="space-y-8">
                <h3 className="text-xl font-extrabold pb-6 border-b border-grey-200">Banking Details</h3>
                <div className="space-y-5">
                  <p className="text-sm text-grey-600">Sduella pays institutions directly. These details are used for identity verification and to confirm the disbursement recipient.</p>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Bank Name</label>
                    <select
                      value={bankingData.bankName}
                      onChange={(e) => setBankingData({...bankingData, bankName: e.target.value})}
                      className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none bg-white"
                    >
                      <option value="">Select bank</option>
                      <option>ABSA</option>
                      <option>Standard Bank</option>
                      <option>FNB</option>
                      <option>Nedbank</option>
                      <option>Capitec</option>
                      <option>African Bank</option>
                      <option>TymeBank</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Account Holder</label>
                    <input
                      type="text"
                      value={bankingData.accountHolder}
                      onChange={(e) => setBankingData({...bankingData, accountHolder: e.target.value})}
                      placeholder="Must match ID document"
                      className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold tracking-widests uppercase text-grey-600">Account Number</label>
                      <input
                        type="text"
                        value={bankingData.accountNumber}
                        onChange={(e) => setBankingData({...bankingData, accountNumber: e.target.value.replace(/[^0-9]/g, '')})}
                        placeholder="000000000"
                        className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none font-mono tracking-wider"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Branch Code</label>
                      <input
                        type="text"
                        value={bankingData.branchCode}
                        onChange={(e) => setBankingData({...bankingData, branchCode: e.target.value.replace(/[^0-9]/g, '')})}
                        placeholder="000000"
                        className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none font-mono tracking-wider"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setStep(3)} className="flex-1 py-3.5 border-1.5 border-grey-200 font-syne font-bold text-sm rounded-sm hover:bg-white transition-colors">Back</button>
                    <button
                      onClick={handleSubmit}
                      disabled={!bankingData.bankName || !bankingData.accountNumber || !bankingData.accountHolder}
                      className="flex-1 py-3.5 bg-black text-white font-syne font-bold text-sm rounded-sm disabled:opacity-40 hover:bg-blue transition-colors"
                    >
                      Submit Application
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5 — Success */}
            {step === 5 && (
              <div className="py-10 text-center">
                <CheckCircle2 className="w-16 h-16 text-green mx-auto mb-6" />
                <h3 className="text-2xl font-extrabold mb-2">Application Submitted</h3>
                <p className="text-grey-600 mb-2">Reference: APP-2026-{Math.floor(Math.random() * 900) + 100}</p>
                <p className="text-sm text-grey-600 max-w-xs mx-auto mb-8 leading-relaxed mt-4">
                  Our review committee will assess your application within <strong>48 working hours</strong> and contact you at <strong>{contactData.studentEmail}</strong>.
                </p>
                <a href="/dashboard" className="block w-full py-3.5 bg-black text-white font-syne font-bold text-sm text-center rounded-sm hover:bg-blue transition-colors">
                  Go to Dashboard
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="pt-[62px] min-h-[calc(100vh-62px)] flex items-center justify-center bg-off-white p-6">
      <div className="max-w-xl w-full bg-white p-12 md:p-20 border border-grey-200 rounded-sm text-center">
        <Mail className="w-12 h-12 text-blue mx-auto mb-8" />
        <h1 className="text-4xl font-extrabold mb-4">Stay informed.</h1>
        <p className="text-grey-600 mb-10 leading-relaxed">
          Get quarterly impact reports, student success stories, and updates on the Sduella fund pool directly in your inbox.
        </p>
        
        {!submitted ? (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-5 py-4 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none text-center"
              required
            />
            <button type="submit" className="w-full py-4 bg-black text-white font-syne font-bold text-sm tracking-widest uppercase rounded-sm hover:bg-black/90 transition-colors">
              Subscribe to Updates
            </button>
          </form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-green/5 border border-green/20 rounded-sm"
          >
            <p className="font-syne font-bold text-green">Thank you for subscribing!</p>
            <p className="text-sm text-grey-600 mt-1">You'll receive our next quarterly report soon.</p>
          </motion.div>
        )}
        <p className="text-[11px] text-grey-400 mt-8">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </div>
  );
};

const Dashboard = ({ user, onLogout, onUpdateUser }: { user: User | null, onLogout: () => void, onUpdateUser: (user: User) => void }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) return <Navigate to="/" />;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={16} /> },
    { id: 'items', label: user.role === 'donor' ? 'Donations' : 'Applications', icon: user.role === 'donor' ? <CreditCard size={16} /> : <FileText size={16} /> },
    { id: 'history', label: 'History', icon: <History size={16} /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon size={16} /> },
  ];

  return (
    <div className="pt-[62px] min-h-screen bg-off-white">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden bg-white border-b border-grey-200 px-6 py-4 flex items-center justify-between sticky top-[62px] z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-syne text-xs font-bold">
            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
          <span className="font-syne font-bold text-sm">{tabs.find(t => t.id === activeTab)?.label}</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-grey-100 rounded-sm transition-colors"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-[calc(100vh-62px)]">
        {/* Sidebar */}
        <aside className={cn(
          "bg-white border-r border-grey-200 p-8 flex flex-col fixed inset-y-0 left-0 z-50 w-[280px] transition-transform lg:relative lg:translate-x-0 lg:z-0 lg:pt-8 pt-24",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="mb-10">
            <div className="text-lg font-extrabold">{user.name}</div>
            <div className="font-syne text-[10px] font-bold tracking-widest uppercase text-blue mt-1">{user.role}</div>
          </div>
          <nav className="flex-1 space-y-1">
            {tabs.map((tab) => (
              <button 
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 font-syne font-bold text-[13px] rounded-sm transition-all",
                  activeTab === tab.id ? "bg-grey-100 text-black shadow-sm" : "text-grey-600 hover:bg-grey-50"
                )}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>
          <button 
            onClick={onLogout}
            className="mt-auto flex items-center gap-3 px-4 py-3 text-red font-syne font-bold text-[13px] hover:bg-red/5 rounded-sm transition-colors"
          >
            <LogOut size={16} /> Log Out
          </button>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="p-6 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' && (
                <>
                  <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-extrabold mb-2">Overview</h1>
                      <p className="text-grey-500 text-sm">Welcome back, {user.name.split(' ')[0]}. Here is what's happening.</p>
                    </div>
                    {user.role === 'student' && (
                      <a href="/apply" className="px-6 py-3 bg-black text-white font-syne font-bold text-[13px] rounded-sm shadow-lg shadow-black/10 hover:translate-y-[-2px] transition-all text-center">New Application</a>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {user.role === 'donor' ? (
                      <>
                        <div className="bg-white p-8 rounded-sm border border-grey-200">
                          <div className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-2">Total Donated</div>
                          <div className="text-3xl font-syne font-extrabold">{user.totalDonated > 0 ? `R ${user.totalDonated.toLocaleString()}` : 'R --'}</div>
                        </div>
                        <div className="bg-white p-8 rounded-sm border border-grey-200">
                          <div className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-2">Students Helped</div>
                          <div className="text-3xl font-syne font-extrabold">
                            {((user.donations || []).reduce((acc, d) => acc + (d.students || 0), 0)) || '--'}
                          </div>
                        </div>
                        <div className="bg-white p-8 rounded-sm border border-grey-200">
                          <div className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-2">Donations</div>
                          <div className="text-3xl font-syne font-extrabold">{(user.donations || []).length || '--'}</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-white p-8 rounded-sm border border-grey-200">
                          <div className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-2">Applications</div>
                          <div className="text-3xl font-syne font-extrabold">{(user.applications || []).length || '--'}</div>
                        </div>
                        <div className="bg-white p-8 rounded-sm border border-grey-200">
                          <div className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-2">Status</div>
                          <div className="text-2xl font-syne font-extrabold text-blue">
                            {(user.applications || []).some(a => a.status === 'Under Review') ? 'Active' : 'Idle'}
                          </div>
                        </div>
                        <div className="bg-white p-8 rounded-sm border border-grey-200">
                          <div className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-2">Total Funded</div>
                          <div className="text-3xl font-syne font-extrabold text-green">
                            {((user.applications || []).filter(a => a.status === 'Approved').reduce((acc, a) => acc + (a.amount || 0), 0)) > 0 
                              ? `R ${((user.applications || []).filter(a => a.status === 'Approved').reduce((acc, a) => acc + (a.amount || 0), 0)).toLocaleString()}` 
                              : 'R --'}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="bg-white border border-grey-200 rounded-sm overflow-hidden">
                    <div className="p-6 border-b border-grey-200 flex items-center justify-between">
                      <h3 className="font-syne font-bold text-sm">Recent Activity</h3>
                      <button onClick={() => setActiveTab('items')} className="text-[11px] font-bold text-blue uppercase tracking-widest">View All</button>
                    </div>
                    <div className="divide-y divide-grey-100">
                      {(user.role === 'donor' ? user.donations : user.applications)?.slice(0, 3).map((item: any, i: number) => (
                        <div key={i} className="p-6 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "w-10 h-10 rounded-sm flex items-center justify-center",
                              item.status === 'Approved' || item.status === 'Disbursed' ? "bg-green/10 text-green" : "bg-blue/10 text-blue"
                            )}>
                              {user.role === 'donor' ? <CreditCard size={18} /> : <FileText size={18} />}
                            </div>
                            <div>
                              <div className="font-bold text-sm">{item.category || 'Donation'}</div>
                              <div className="text-[11px] text-grey-400">{item.date}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-sm">R {item.amount.toLocaleString()}</div>
                            <div className={cn(
                              "text-[10px] font-bold uppercase tracking-widest",
                              item.status === 'Approved' || item.status === 'Disbursed' ? "text-green" : "text-blue"
                            )}>{item.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'items' && (
                <>
                  <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-extrabold mb-2">{user.role === 'donor' ? 'Donations' : 'Applications'}</h1>
                      <p className="text-grey-500 text-sm">Manage your {user.role === 'donor' ? 'contributions' : 'funding requests'}.</p>
                    </div>
                    {user.role === 'student' && (
                      <a href="/apply" className="px-6 py-3 bg-black text-white font-syne font-bold text-[13px] rounded-sm shadow-lg shadow-black/10 hover:translate-y-[-2px] transition-all text-center">New Application</a>
                    )}
                  </div>
                  <div className="bg-white border border-grey-200 rounded-sm overflow-hidden">
                    <div className="p-6 border-b border-grey-200">
                      <div className="grid grid-cols-4 text-[10px] font-bold tracking-widest uppercase text-grey-400">
                        <div className="col-span-2">Description</div>
                        <div>Amount</div>
                        <div className="text-right">Status</div>
                      </div>
                    </div>
                    <div className="divide-y divide-grey-100">
                      {(user.role === 'donor' ? user.donations : user.applications)?.map((item: any, i: number) => (
                        <div key={i} className="p-6 grid grid-cols-4 items-center">
                          <div className="col-span-2">
                            <div className="font-bold text-sm">{item.category || 'Donation'}</div>
                            <div className="text-[11px] text-grey-400">{item.date}</div>
                          </div>
                          <div className="font-syne font-bold text-sm">R {item.amount.toLocaleString()}</div>
                          <div className="text-right">
                            <span className={cn(
                              "px-2.5 py-1 rounded-sm font-syne text-[10px] font-bold tracking-widest uppercase",
                              item.status === 'Approved' || item.status === 'Disbursed' ? "bg-green/10 text-green" : "bg-blue/10 text-blue"
                            )}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'history' && (
                <>
                  <div className="mb-10">
                    <h1 className="text-3xl font-extrabold mb-2">History</h1>
                    <p className="text-grey-500 text-sm">A complete record of your activity on Sduella.</p>
                  </div>
                  <div className="space-y-4">
                    {(user.role === 'donor' ? user.donations : user.applications)?.map((item: any, i: number) => (
                      <div key={i} className="bg-white p-6 rounded-sm border border-grey-200 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="text-center min-w-[60px]">
                            <div className="text-xs font-bold text-grey-400 uppercase tracking-widest">{item.date.split(' ')[1]}</div>
                            <div className="text-xl font-extrabold">{item.date.split(' ')[0]}</div>
                          </div>
                          <div className="w-px h-10 bg-grey-100" />
                          <div>
                            <div className="font-bold text-sm">{item.category || 'Donation'}</div>
                            <div className="text-[11px] text-grey-400">Ref: SD-{1000 + i}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-syne font-bold text-sm">R {item.amount.toLocaleString()}</div>
                          <div className="text-[10px] font-bold text-grey-400 uppercase tracking-widest mt-1">Processed</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeTab === 'settings' && (
                <>
                  <div className="mb-10">
                    <h1 className="text-3xl font-extrabold mb-2">Settings</h1>
                    <p className="text-grey-500 text-sm">Manage your account preferences and security.</p>
                  </div>
                  <div className="max-w-2xl space-y-8">
                    <div className="bg-white p-8 rounded-sm border border-grey-200">
                      <h3 className="text-lg font-extrabold mb-6">Profile Information</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold tracking-widest uppercase text-grey-400">Full Name</label>
                            <input type="text" defaultValue={user.name} className="w-full px-4 py-2.5 border border-grey-200 rounded-sm focus:border-blue outline-none text-sm" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold tracking-widest uppercase text-grey-400">Email Address</label>
                            <input type="email" defaultValue={user.email} className="w-full px-4 py-2.5 border border-grey-200 rounded-sm focus:border-blue outline-none text-sm" />
                          </div>
                        </div>
                        <button className="px-6 py-2.5 bg-black text-white font-syne font-bold text-xs rounded-sm">Save Changes</button>
                      </div>
                    </div>
                    
                    <div className="bg-white p-8 rounded-sm border border-grey-200">
                      <h3 className="text-lg font-extrabold mb-6">Security</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-grey-100 rounded-sm">
                          <div>
                            <div className="text-sm font-bold">Two-Factor Authentication</div>
                            <div className="text-xs text-grey-500 mt-0.5">Add an extra layer of security to your account.</div>
                          </div>
                          <div className="w-10 h-5 bg-grey-200 rounded-full relative cursor-pointer">
                            <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full" />
                          </div>
                        </div>
                        <button className="text-xs font-bold text-blue uppercase tracking-widest">Change Password</button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="pt-[62px]">
      {/* Hero */}
      <section className="bg-black text-white py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">Our Mission</span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 max-w-3xl leading-[0.9]">
            Bridging the gap between potential and completion.
          </h1>
          <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
            Sduella was founded to ensure that no dedicated student is forced to abandon their degree due to financial barriers in their final miles.
          </p>
        </div>
        <GraduationCap className="absolute -right-20 -bottom-20 w-96 h-96 text-white/5 rotate-12" />
      </section>

      {/* The Problem */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-8">The Student Funding Crisis</h2>
            <div className="space-y-6 text-grey-600 leading-relaxed">
              <p>
                Across the globe, thousands of students fall into a funding gap—too rich for basic government bursaries, yet too poor to afford university fees. This gap often leads to high dropout rates, not because of academic failure, but financial exhaustion.
              </p>
              <p>
                Sduella doesn't just provide money; we provide a structured safety net. By focusing on graduation clearance and mid-year tuition shortfalls, we target the most critical points where students are likely to drop out.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-off-white p-8 rounded-sm border border-grey-200">
              <div className="text-4xl font-extrabold text-blue mb-2">40%</div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-grey-400">Dropout Rate</p>
              <p className="text-xs text-grey-600 mt-2">Average first-year dropout rate in many universities.</p>
            </div>
            <div className="bg-off-white p-8 rounded-sm border border-grey-200">
              <div className="text-4xl font-extrabold text-black mb-2">R12B+</div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-grey-400">Student Debt</p>
              <p className="text-xs text-grey-600 mt-2">Cumulative student debt across institutions.</p>
            </div>
            <div className="bg-off-white p-8 rounded-sm border border-grey-200 col-span-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue/10 rounded-sm flex items-center justify-center">
                  <Target className="text-blue" size={24} />
                </div>
                <div>
                  <div className="text-xl font-extrabold">Our Goal</div>
                  <p className="text-xs text-grey-600">To fund 10,000 students by 2030.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Foundational Phase */}
      <section className="py-24 px-6 md:px-12 bg-black text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border-1.5 border-blue/30 bg-blue/5 rounded-full mb-6 w-fit">
              <div className="w-2 h-2 rounded-full bg-blue animate-pulse" />
              <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue">Current Phase: Pool Building</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-8">We are building the foundation.</h2>
            <p className="text-lg text-white/60 leading-relaxed mb-8">
              Sduella is currently in its foundational phase. We are not yet disbursing funds; instead, we are building a robust, community-backed pool to ensure that when we launch our first cycle, we can provide meaningful, life-changing support to every approved student.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 border border-white/10 rounded-sm">
                <div className="text-2xl font-extrabold mb-2 text-blue">Phase 1</div>
                <p className="text-sm text-white/40">Building the initial R1M pool through early visionary donors.</p>
              </div>
              <div className="p-6 border border-white/10 rounded-sm">
                <div className="text-2xl font-extrabold mb-2 text-white/20">Phase 2</div>
                <p className="text-sm text-white/40">Opening the first disbursement cycle for final-year students.</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 p-12 rounded-sm border border-white/10">
            <h3 className="text-2xl font-extrabold mb-6">Why join now?</h3>
            <ul className="space-y-6">
              {[
                { title: 'Visionary Status', desc: 'Early donors are recognized as the architects of the Sduella foundation.' },
                { title: 'Student Priority', desc: 'Students who register during this phase receive priority review in cycle one.' },
                { title: 'Shape the Future', desc: 'Your early feedback helps us refine our disbursement and integrity loops.' }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-blue/20 text-blue flex items-center justify-center flex-shrink-0 mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <div className="font-bold text-sm mb-1">{item.title}</div>
                    <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 md:px-12 bg-off-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">How We Operate</span>
          <h2 className="text-4xl font-extrabold tracking-tight">Our Core Principles</h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: <ShieldCheck className="text-blue" />, 
              title: 'Radical Transparency', 
              desc: 'Every contribution is tracked. Donors receive quarterly reports detailing exactly how the pool was disbursed.' 
            },
            { 
              icon: <Target className="text-blue" />, 
              title: 'Direct Impact', 
              desc: 'We pay institutions directly. No cash is handled by students, ensuring 100% of funds go to education.' 
            },
            { 
              icon: <Users className="text-blue" />, 
              title: 'Community First', 
              desc: 'Sduella is built on the spirit of Ubuntu. We are a community investing in its own future leaders.' 
            }
          ].map((value, i) => (
            <div key={i} className="bg-white p-10 rounded-sm border border-grey-100">
              <div className="w-12 h-12 bg-off-white rounded-sm flex items-center justify-center mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-extrabold mb-4">{value.title}</h3>
              <p className="text-sm text-grey-600 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-8 italic">"Education is the most powerful weapon which you can use to change the world."</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/donate" className="px-10 py-4 bg-black text-white font-syne font-bold rounded-sm hover:bg-black/90 transition-all">Support the Fund</a>
            <a href="/apply" className="px-10 py-4 border-2 border-black text-black font-syne font-bold rounded-sm hover:bg-grey-50 transition-all">Apply for Funding</a>
          </div>
        </div>
      </section>
    </div>
  );
};

const Bursaries = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBursary, setSelectedBursary] = useState<any>(null);

  const categories = [
    {
      title: "Graduation Clearance",
      description: "Settling outstanding fees for final-year students to ensure they can graduate and receive their certificates.",
      icon: <GraduationCap className="text-blue" />,
      criteria: ["Final year of study", "Academic average > 60%", "Verified financial need"],
      details: "This fund is specifically for students who have completed their academic requirements but are blocked from graduating due to outstanding tuition fees. We work directly with university finance departments to clear these balances.",
      provider: "Sduella Foundation"
    },
    {
      title: "Mid-Year Tuition Support",
      description: "Bridge funding for students facing mid-year shortfalls that threaten their continued enrollment.",
      icon: <ShieldCheck className="text-blue" />,
      criteria: ["Currently enrolled", "No other full bursary", "Good academic standing"],
      details: "Designed for students who experience sudden financial changes mid-semester. This support ensures you don't have to deregister due to a temporary lack of funds.",
      provider: "Sduella Foundation"
    },
    {
      title: "Post-Graduate Research",
      description: "Support for Honours and Masters students whose research projects are stalled due to lack of funding.",
      icon: <Target className="text-blue" />,
      criteria: ["Research proposal approved", "Full-time student", "South African citizen"],
      details: "We provide small grants to cover research-related costs such as data collection, laboratory fees, or specialized software required for post-graduate completion.",
      provider: "Sduella Foundation"
    }
  ];

  const externalBursaries = [
    {
      provider: "Standard Bank",
      title: "150th Anniversary Bursary",
      coverage: "Full Tuition + Accommodation",
      fields: ["Engineering", "Commerce", "Science"],
      deadline: "30 Sept 2026",
      url: "https://www.standardbank.com/sbg/main/careers/bursaries",
      description: "A prestigious bursary aimed at supporting high-achieving students in critical skill areas. Includes mentorship and potential internship opportunities."
    },
    {
      provider: "Investec",
      title: "CSI Bursary Programme",
      coverage: "Tuition, Books & Stipend",
      fields: ["Accounting", "IT", "Mathematics"],
      deadline: "15 Oct 2026",
      url: "https://www.investec.com/en_za/welcome-to-investec/corporate-responsibility/education/bursaries.html",
      description: "Focuses on students from disadvantaged backgrounds who show exceptional academic potential in financial and technical fields."
    },
    {
      provider: "Vodacom",
      title: "Merit Scholarship",
      coverage: "Full Tuition & Laptop",
      fields: ["Computer Science", "Data Science"],
      deadline: "31 Aug 2026",
      url: "https://www.vodacom.com/bursary-programme.php",
      description: "Supporting the next generation of digital innovators. This scholarship covers all academic costs and provides a high-end laptop for studies."
    },
    {
      provider: "Sasol",
      title: "Corporate Bursary",
      coverage: "All-inclusive",
      fields: ["Chemical Engineering", "Mining"],
      deadline: "15 Sept 2026",
      url: "https://www.sasolbursaries.com/",
      description: "One of the most comprehensive bursary schemes in South Africa, covering tuition, residence, meals, and a monthly allowance."
    }
  ];

  const allFields = ['All', ...new Set(externalBursaries.flatMap(b => b.fields))].sort();

  const filteredBursaries = externalBursaries.filter(b => {
    const matchesFilter = activeFilter === 'All' || b.fields.includes(activeFilter);
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         b.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.fields.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-[62px]">
      {/* Hero */}
      <section className="bg-off-white py-24 px-6 md:px-12 border-b border-grey-200">
        <div className="max-w-7xl mx-auto">
          <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">Funding Opportunities</span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 max-w-3xl leading-[0.9]">
            Bursaries for <span className="text-blue">Every Student.</span>
          </h1>
          <p className="text-xl text-grey-600 leading-relaxed max-w-2xl">
            Sduella provides targeted financial support and connects you with leading external bursary providers to ensure your academic journey is fully funded.
          </p>
        </div>
      </section>

      {/* Sduella Categories */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight mb-2">Sduella Managed Funds</h2>
            <p className="text-grey-600">Direct support from our community-driven pool.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                onClick={() => setSelectedBursary({
                  ...cat,
                  provider: "Sduella Foundation",
                  url: "/apply",
                  isInternal: true
                })}
                className="bg-white p-10 rounded-sm border border-grey-100 flex flex-col h-full cursor-pointer hover:border-blue hover:shadow-xl transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus size={16} className="text-blue" />
                </div>
                <div className="w-12 h-12 bg-off-white rounded-sm flex items-center justify-center mb-6 group-hover:bg-blue/5 transition-colors">
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-extrabold mb-4">{cat.title}</h3>
                <p className="text-sm text-grey-600 leading-relaxed mb-8 flex-1">{cat.description}</p>
                <div className="space-y-3 mb-8">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-grey-400">Key Criteria</div>
                  {cat.criteria.map((item, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <Check size={12} className="text-blue" />
                      <span className="text-xs text-grey-500">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-6 border-t border-grey-50 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue">Internal Fund</span>
                  <div className="flex items-center gap-2 text-xs font-bold font-syne group-hover:text-blue transition-colors">
                    View Details <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* External Providers */}
      <section className="py-24 px-6 md:px-12 bg-off-white border-y border-grey-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">Partner & External Bursaries</h2>
            <p className="text-grey-600 max-w-2xl mx-auto mb-12">We track and curate the best opportunities from corporate partners and external providers to help you find the right fit.</p>
            
            {/* Filters */}
            <div className="flex flex-col gap-6 max-w-4xl mx-auto">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search by provider, title or field..." 
                  className="w-full px-6 py-4 bg-white border border-grey-200 rounded-sm focus:outline-none focus:border-blue transition-colors font-syne text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap justify-center gap-2">
                {allFields.map(field => (
                  <button
                    key={field}
                    onClick={() => setActiveFilter(field)}
                    className={cn(
                      "px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm border transition-all",
                      activeFilter === field 
                        ? "bg-black text-white border-black" 
                        : "bg-white text-grey-500 border-grey-200 hover:border-grey-400"
                    )}
                  >
                    {field}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {filteredBursaries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBursaries.map((bursary, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  key={i} 
                  onClick={() => setSelectedBursary(bursary)}
                  className="bg-white p-8 rounded-sm border border-grey-200 hover:border-blue transition-all group cursor-pointer hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-grey-400 opacity-0 group-hover:opacity-100 transition-opacity">External Link</span>
                    <FileText size={14} className="text-grey-300 group-hover:text-blue transition-colors" />
                  </div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue bg-blue/5 px-2 py-1 rounded-sm mb-2 inline-block">
                        {bursary.provider}
                      </span>
                      <h3 className="text-xl font-extrabold">{bursary.title}</h3>
                    </div>
                    <div className="text-right pr-8">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-grey-400">Deadline</div>
                      <div className="text-xs font-bold text-red">{bursary.deadline}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-2">Coverage</div>
                      <div className="text-sm font-semibold text-grey-800">{bursary.coverage}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-2">Target Fields</div>
                      <div className="flex flex-wrap gap-1">
                        {bursary.fields.map((field, j) => (
                          <span key={j} className="text-[10px] bg-grey-100 text-grey-600 px-2 py-0.5 rounded-sm">{field}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full py-3 border-1.5 border-black text-black font-syne font-bold text-xs uppercase tracking-widest rounded-sm group-hover:bg-black group-hover:text-white transition-all flex items-center justify-center gap-2">
                    View Details & Apply <ArrowRight size={14} />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-dashed border-grey-300 rounded-sm">
              <p className="text-grey-500 font-syne italic">No bursaries found matching your criteria.</p>
              <button 
                onClick={() => {setActiveFilter('All'); setSearchQuery('');}}
                className="mt-4 text-blue font-bold text-sm hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
          
          {/* Detail Modal */}
          <AnimatePresence>
            {selectedBursary && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedBursary(null)}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative bg-white w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden"
                >
                  <button 
                    onClick={() => setSelectedBursary(null)}
                    className="absolute top-6 right-6 p-2 hover:bg-off-white rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                  
                  <div className="p-12">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue bg-blue/5 px-3 py-1.5 rounded-sm mb-4 inline-block">
                      {selectedBursary.provider}
                    </span>
                    <h2 className="text-4xl font-extrabold mb-6 leading-tight">{selectedBursary.title}</h2>
                    
                    <div className="grid grid-cols-2 gap-12 mb-10 pb-10 border-b border-grey-100">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-2">Coverage</div>
                        <div className="text-lg font-bold text-black">{selectedBursary.coverage}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-2">Deadline</div>
                        <div className="text-lg font-bold text-red">{selectedBursary.deadline}</div>
                      </div>
                    </div>
                    
                    <div className="mb-10">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-4">About this Opportunity</div>
                      <p className="text-grey-600 leading-relaxed">{selectedBursary.description || selectedBursary.details}</p>
                    </div>
                    
                    <div className="mb-12">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-4">{selectedBursary.isInternal ? 'Key Criteria' : 'Eligible Fields'}</div>
                      <div className="flex flex-wrap gap-2">
                        {(selectedBursary.fields || selectedBursary.criteria).map((item: string, j: number) => (
                          <span key={j} className="text-xs bg-off-white text-grey-800 px-4 py-2 rounded-sm border border-grey-100 font-semibold">{item}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      {selectedBursary.isInternal ? (
                        <a 
                          href="/apply"
                          className="flex-1 py-4 bg-blue text-white font-syne font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-blue-hover transition-all flex items-center justify-center gap-3"
                        >
                          Apply via Sduella <ArrowRight size={16} />
                        </a>
                      ) : (
                        <a 
                          href={selectedBursary.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 py-4 bg-blue text-white font-syne font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-blue-hover transition-all flex items-center justify-center gap-3"
                        >
                          Apply on External Site <ArrowRight size={16} />
                        </a>
                      )}
                      <button 
                        onClick={() => setSelectedBursary(null)}
                        className="px-8 py-4 border border-grey-200 text-grey-600 font-syne font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-off-white transition-all"
                      >
                        Close
                      </button>
                    </div>
                    
                    <p className="mt-6 text-[10px] text-grey-400 text-center italic">
                      {selectedBursary.isInternal 
                        ? "This application will be processed directly by the Sduella committee."
                        : "Note: You will be redirected to the provider's official portal."
                      }
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
          
          <div className="mt-16 text-center">
            <p className="text-sm text-grey-500 mb-6">Are you a provider looking to list your bursary?</p>
            <button className="px-8 py-3 bg-black text-white font-syne font-bold text-sm tracking-wide rounded-sm hover:bg-black/90 transition-colors">Partner with Sduella</button>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-24 px-6 md:px-12 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight mb-8">The Application Lifecycle</h2>
              <div className="space-y-12">
                {[
                  { step: '01', title: 'Digital Registration', desc: 'Create your student profile and upload your latest academic transcript.' },
                  { step: '02', title: 'Needs Verification', desc: 'Our committee reviews your financial standing and institutional statements.' },
                  { step: '03', title: 'Direct Disbursement', desc: 'Approved funds are paid directly to your institution or service provider.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="text-3xl font-extrabold text-blue/40 font-syne">{item.step}</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 p-12 rounded-sm border border-white/10">
              <h3 className="text-2xl font-extrabold mb-6">Ready to apply?</h3>
              <p className="text-white/60 mb-8 leading-relaxed">
                We are currently building the foundational pool. Students who register now will be the first to be reviewed when the first disbursement cycle opens.
              </p>
              <a href="/apply" className="inline-flex items-center gap-3 px-8 py-4 bg-blue text-white font-syne font-bold text-sm tracking-wide rounded-sm hover:bg-blue-hover transition-all">
                Start Application <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Mini */}
      <section className="py-24 px-6 md:px-12 bg-off-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Who can apply for Sduella funding?", a: "Any student facing financial barriers to completing their education, particularly those who fall outside traditional grant systems but still require support." },
              { q: "Is the funding a loan?", a: "No. Sduella provides non-repayable bursaries. However, we encourage graduates to contribute back to the pool once they are employed." },
              { q: "Can I apply for multiple categories?", a: "Yes, you can apply for both tuition and graduation clearance if both are applicable to your situation." }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-sm border border-grey-100">
                <h4 className="font-bold text-sm mb-2">{faq.q}</h4>
                <p className="text-xs text-grey-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [poolAmount, setPoolAmount] = useState(0);
  const [donorCount, setDonorCount] = useState(0);

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    // Update mock data if it exists in the mock object
    if (updatedUser.role === 'donor') {
      MOCK_DATA.donors[updatedUser.email as keyof typeof MOCK_DATA.donors] = updatedUser as any;
    } else {
      MOCK_DATA.students[updatedUser.email as keyof typeof MOCK_DATA.students] = updatedUser as any;
    }
  };

  const handleDonate = (amount: number) => {
    setPoolAmount(prev => prev + amount);
    setDonorCount(prev => prev + 1);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar 
          user={user} 
          onOpenAuth={() => setIsAuthOpen(true)} 
          onLogout={() => setUser(null)} 
        />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home poolAmount={poolAmount} donorCount={donorCount} />} />
            <Route path="/apply" element={<Apply user={user} onOpenAuth={() => setIsAuthOpen(true)} onUpdateUser={handleUpdateUser} />} />
            <Route path="/donate" element={<Donate user={user} onOpenAuth={() => setIsAuthOpen(true)} onDonate={handleDonate} onUpdateUser={handleUpdateUser} />} />
            <Route path="/bursaries" element={<Bursaries />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard user={user} onLogout={() => setUser(null)} onUpdateUser={handleUpdateUser} />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />

        <AuthModal 
          isOpen={isAuthOpen} 
          onClose={() => setIsAuthOpen(false)} 
          onLogin={setUser} 
        />
      </div>
    </Router>
  );
}
