import { useState } from 'react';
import { motion } from 'motion/react';
import { Target, Check, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

function StudentAvatar({ name, image, size = 'md' }: { name: string; image: string; size?: 'sm' | 'md' | 'lg' }) {
  const [failed, setFailed] = useState(false);
  const initials = name.split(' ').map(n => n[0]).join('');
  const dims = size === 'lg' ? 'w-20 h-20 text-2xl' : size === 'sm' ? 'w-9 h-9 text-xs' : 'w-14 h-14 text-base';

  if (!failed) {
    return (
      <img
        src={image}
        alt={name}
        onError={() => setFailed(true)}
        className={cn('rounded-full object-cover object-top flex-shrink-0', dims)}
      />
    );
  }

  return (
    <div className={cn('rounded-full bg-blue/10 flex items-center justify-center font-extrabold text-blue font-syne flex-shrink-0', dims)}>
      {initials}
    </div>
  );
}

const STATS = [
  { label: 'Pool Contributions', value: 'R 247,800', sub: 'raised since launch' },
  { label: 'Registered Students', value: '312', sub: 'awaiting first cycle' },
  { label: 'Donor Community', value: '89', sub: 'visionary contributors' },
  { label: 'Partner Institutions', value: '14', sub: 'universities & TVETs' },
];

const MILESTONES = [
  { quarter: 'Q1 2026', title: 'Platform Launch', desc: 'Sduella goes live. Early donor and student registration opens.', done: true },
  { quarter: 'Q2 2026', title: 'R250K Pool Milestone', desc: 'Community pool crosses R250,000. First institutional partnerships signed.', done: true },
  { quarter: 'Q3 2026', title: 'Application Review Cycle', desc: 'First batch of student applications reviewed by the committee.', done: false },
  { quarter: 'Q4 2026', title: 'First Disbursements', desc: 'Approved funds paid directly to institutions for qualifying students.', done: false },
  { quarter: 'Q1 2027', title: 'R1M Target', desc: 'Community pool reaches R1,000,000. Expanded disbursement cycle begins.', done: false },
];

const STORIES = [
  {
    name: 'Mpho Sithole',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    institution: 'Metropolitan University',
    year: '3rd Year, Computer Science',
    quote: "I was days away from being deregistered. Sduella's support gave me the breathing room to focus on my studies instead of my debt.",
    category: 'Mid-Year Tuition Support',
  },
  {
    name: 'Naledi Khumalo',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    institution: 'Globala Tech Institute',
    year: '2nd Year, Information Systems',
    quote: "Just knowing that there's a community invested in my success changes how I approach every exam. This fund is different.",
    category: 'Graduation Clearance',
  },
  {
    name: 'Thabo Ndlovu',
    image: 'https://randomuser.me/api/portraits/men/36.jpg',
    institution: 'University of Pretoria',
    year: 'Honours, Economics',
    quote: "I've applied to over 12 bursaries that never came through. Sduella is the first platform that felt like it was actually built for students like me.",
    category: 'Post-Graduate Research',
  },
];

const REPORTS = [
  { title: 'Quarterly Impact Report — Q1 2026', date: 'April 2026', pages: '8 pages', isLatest: true },
  { title: 'Founding Phase Summary', date: 'March 2026', pages: '12 pages', isLatest: false },
];

export default function Impact() {
  return (
    <div className="pt-[62px]">
      {/* Hero */}
      <section className="bg-black text-white py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">Our Impact</span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-[0.9]">
            Numbers that<br />matter.
          </h1>
          <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
            Every rand in the pool represents a real student's future. Here is what the Sduella community has built so far.
          </p>
        </div>
        <Target className="absolute -right-20 -bottom-16 w-96 h-96 text-white/5" />
      </section>

      {/* Stats */}
      <section className="bg-off-white border-b border-grey-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={i} className="p-6 sm:p-8 md:p-14 border-b border-grey-200 sm:border-r sm:nth-[2n]:border-r-0 md:border-b-0 md:nth-[2n]:border-r md:last:border-r-0">
              <div className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-3">{s.label}</div>
              <div className="text-3xl md:text-4xl font-extrabold font-syne mb-1">{s.value}</div>
              <div className="text-xs text-grey-500">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">Roadmap</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Journey</h2>
          </div>
          <div className="relative max-w-3xl">
            <div className="absolute left-[11px] top-0 bottom-0 w-px bg-grey-200" />
            <div className="space-y-6">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start"
                >
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 relative z-10",
                    m.done ? "bg-blue border-blue" : "bg-white border-grey-300"
                  )}>
                    {m.done && <Check size={12} className="text-white" />}
                  </div>
                  <div className={cn(
                    "flex-1 p-6 rounded-sm border",
                    m.done ? "bg-white border-grey-200" : "bg-off-white border-grey-100 opacity-60"
                  )}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h3 className="font-extrabold">{m.title}</h3>
                      <span className={cn(
                        "text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm w-fit",
                        m.done ? "bg-green/10 text-green" : "bg-grey-100 text-grey-400"
                      )}>
                        {m.done ? `✓ ${m.quarter}` : m.quarter}
                      </span>
                    </div>
                    <p className="text-sm text-grey-600 leading-relaxed">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Student voices */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 md:px-12 bg-off-white border-y border-grey-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">Student Voices</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">The faces behind the fund.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STORIES.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-5 sm:p-8 lg:p-10 rounded-sm border border-grey-100 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-6">
                  <StudentAvatar name={s.name} image={s.image} size="lg" />
                  <div>
                    <div className="font-extrabold">{s.name}</div>
                    <div className="text-[11px] text-grey-500 mt-0.5">{s.institution}</div>
                    <div className="text-[10px] text-grey-400">{s.year}</div>
                  </div>
                </div>
                <blockquote className="text-grey-600 text-sm leading-relaxed italic flex-1 border-l-2 border-blue/30 pl-4 mb-6">
                  "{s.quote}"
                </blockquote>
                <div className="pt-4 border-t border-grey-50">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-blue">{s.category}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reports */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">Documentation</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Impact Reports</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            {REPORTS.map((r, i) => (
              <div
                key={i}
                className="bg-white p-5 sm:p-8 rounded-sm border border-grey-200 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 group hover:border-blue transition-all cursor-pointer"
              >
                <div>
                  {r.isLatest && (
                    <span className="text-[9px] font-bold tracking-widest uppercase bg-blue text-white px-2 py-0.5 rounded-sm mb-3 inline-block">
                      Latest
                    </span>
                  )}
                  <h3 className="font-extrabold text-sm mb-2 leading-snug">{r.title}</h3>
                  <div className="text-[11px] text-grey-400">{r.date} · {r.pages}</div>
                </div>
                <ArrowRight size={16} className="text-grey-300 group-hover:text-blue transition-colors mt-1 flex-shrink-0 ml-4" />
              </div>
            ))}
          </div>
          <p className="text-xs text-grey-400 mt-6">
            Reports are published quarterly and available to all registered donors and students.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 md:px-12 bg-black text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-tight">Be part of the next chapter.</h2>
          <p className="text-white/60 mb-10 leading-relaxed">
            Whether you donate R100 or R100,000, you are directly extending a student's runway to graduation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/donate" className="px-10 py-4 bg-blue text-white font-syne font-bold rounded-sm hover:bg-blue-hover transition-all">
              Contribute to the Pool
            </a>
            <a href="/about" className="px-10 py-4 border border-white/20 text-white font-syne font-bold rounded-sm hover:bg-white/5 transition-all">
              Learn More About Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
