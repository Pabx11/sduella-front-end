import { GraduationCap, Target, Users, ShieldCheck, Check } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-[62px]">
      {/* Hero */}
      <section className="bg-black text-white py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">Our Mission</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 max-w-3xl leading-[0.9]">
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
                Across the globe, thousands of students fall into a funding gap — too rich for basic government bursaries, yet too poor to afford university fees. This gap often leads to high dropout rates, not because of academic failure, but financial exhaustion.
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
                { title: 'Shape the Future', desc: 'Your early feedback helps us refine our disbursement and integrity loops.' },
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
            { icon: <ShieldCheck className="text-blue" />, title: 'Radical Transparency', desc: 'Every contribution is tracked. Donors receive quarterly reports detailing exactly how the pool was disbursed.' },
            { icon: <Target className="text-blue" />, title: 'Direct Impact', desc: 'We pay institutions directly. No cash is handled by students, ensuring 100% of funds go to education.' },
            { icon: <Users className="text-blue" />, title: 'Community First', desc: 'Sduella is built on the spirit of Ubuntu. We are a community investing in its own future leaders.' },
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
            <a href="/dashboard" className="px-10 py-4 border-2 border-black text-black font-syne font-bold rounded-sm hover:bg-grey-50 transition-all">Apply for Funding</a>
          </div>
        </div>
      </section>
    </div>
  );
}
