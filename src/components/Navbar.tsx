import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import type { User } from '../types';

interface NavbarProps {
  user: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Funding', path: '/bursaries' },
  { label: 'Learnerships', path: '/learnerships' },
  { label: 'Funding Guide', path: '/funding-guide' },
  { label: 'Donate', path: '/donate' },
];

export default function Navbar({ user, onOpenAuth }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed inset-x-0 top-0 h-[62px] bg-white border-b border-grey-200 z-[300] flex items-center justify-between px-6 md:px-12">
      <div className="flex items-center gap-8">
        <a href="/" className="flex items-center cursor-pointer">
          <img className="h-50 w-100" src="/pictures/Sduella Modern Logo (1).svg" alt="SDUELLA Logo" />
        </a>
        <ul className="hidden lg:flex items-center gap-5 list-none">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.path}
                className={cn(
                  'font-syne text-[13px] font-semibold text-grey-600 hover:text-black transition-colors tracking-wide',
                  location.pathname === link.path && 'text-black'
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
              className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-syne text-xs font-bold cursor-pointer overflow-hidden"
            >
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user.name.split(' ').map(n => n[0]).join('').toUpperCase()
              )}
            </a>
          </div>
        ) : (
          <>
            <button
              onClick={onOpenAuth}
              className="hidden lg:inline-flex px-4 py-2 border-1.5 border-black text-black font-syne font-bold text-[13px] rounded-sm hover:bg-black hover:text-white transition-all"
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
          className="lg:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[62px] inset-x-0 bg-white border-b border-grey-200 p-6 flex flex-col gap-4 lg:hidden"
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
            {user ? (
              <a href="/dashboard" onClick={() => setIsMenuOpen(false)}
                className="font-syne text-lg font-bold text-blue">
                Dashboard
              </a>
            ) : (
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
}
