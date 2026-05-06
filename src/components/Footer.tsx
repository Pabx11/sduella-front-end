import { GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
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
              <li><a href="/bursaries" className="hover:text-white transition-colors">All Funding</a></li>
              <li><a href="/learnerships" className="hover:text-white transition-colors">Learnerships</a></li>
              <li><a href="/funding-guide" className="hover:text-white transition-colors">Funding Guide</a></li>
              <li><a href="/dashboard" className="hover:text-white transition-colors">Apply for Funding</a></li>
              <li><a href="/donate" className="hover:text-white transition-colors">Donate</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-syne text-[11px] font-bold tracking-[0.12em] uppercase text-white/35 mb-5">Resources</h5>
            <ul className="flex flex-col gap-3 text-[13px] text-white/55">
              <li><a href="/newsletter" className="hover:text-white transition-colors">Newsletter</a></li>
              <li><a href="/impact" className="hover:text-white transition-colors">Impact Reports</a></li>
              <li><a href="/transparency" className="hover:text-white transition-colors">Transparency</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-syne text-[11px] font-bold tracking-[0.12em] uppercase text-white/35 mb-5">Organisation</h5>
            <ul className="flex flex-col gap-3 text-[13px] text-white/55">
              <li><a href="/about" className="hover:text-white transition-colors">About Sduella</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
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
}
