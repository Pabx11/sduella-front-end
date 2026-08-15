import { Compass } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-off-white text-off-black px-6 md:px-12 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 mb-14 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center mb-6">
          <img className="h-auto w-100" src="/pictures/Sduella Modern Logo (1).svg" alt="SDUELLA Logo" />
            </div>
            {/* <p className="text-[13px] text-off-black/40 leading-relaxed max-w-[240px]">
              One place to discover trusted jobs, early-career pathways, student funding and business funding opportunities.
            </p> */}
          </div>
          <div>
            <h5 className="font-syne text-[11px] font-bold tracking-[0.12em] uppercase text-off-black mb-5">Platform</h5>
            <ul className="flex flex-col gap-3 text-[13px] text-off-black/55">
              <li><a href="/jobs" className="hover:text-off-black transition-colors">Jobs</a></li>
              <li><a href="/internships" className="hover:text-off-black transition-colors">Internships</a></li>
              <li><a href="/learnerships" className="hover:text-off-black transition-colors">Learnerships</a></li>
              <li><a href="/bursaries" className="hover:text-off-black transition-colors">Study Funding</a></li>
              <li><a href="/scholarships" className="hover:text-off-black transition-colors">Scholarships</a></li>
              <li><a href="/bursaries/closing-soon" className="hover:text-off-black transition-colors">Bursaries Closing Soon</a></li>
              <li><a href="/business-funding" className="hover:text-off-black transition-colors">Business Funding</a></li>
              <li><a href="/startup-funding" className="hover:text-off-black transition-colors">Startup Funding</a></li>
              <li><a href="/funding-guide" className="hover:text-off-black transition-colors">Funding Guide</a></li>
            </ul>
          </div>
          {/* <div>
            <h5 className="font-syne text-[11px] font-bold tracking-[0.12em] uppercase text-off-black mb-5">Resources</h5>
            <ul className="flex flex-col gap-3 text-[13px] text-off-black/55">
              <li><a href="/newsletter" className="hover:text-off-black transition-colors">Newsletter</a></li>
              <li><a href="/#how" className="hover:text-off-black transition-colors">How It Works</a></li>
              <li><a href="/transparency" className="hover:text-off-black transition-colors">Transparency</a></li>
            </ul>
          </div> */}
          <div>
            <h5 className="font-syne text-[11px] font-bold tracking-[0.12em] uppercase text-off-black mb-5">Organisation</h5>
            <ul className="flex flex-col gap-3 text-[13px] text-off-black/55">
              <li><a href="/about" className="hover:text-off-black transition-colors">About Sduella</a></li>
              <li><a href="/contact" className="hover:text-off-black transition-colors">Contact Us</a></li>
              <li><a href="/privacy" className="hover:text-off-black transition-colors">Privacy Policy</a></li>
              
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-off-black/30 font-syne font-semibold tracking-wider">
          <span>&copy; 2026 Sduella Opportunity Platform. All rights reserved.</span>
          <span>Trusted opportunities. Clear next steps.</span>
        </div>
      </div>
    </footer>
  );
}
