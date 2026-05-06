import { motion } from 'motion/react';
import { ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { ALLOCATIONS, PRINCIPLES, COMMITTEE, AUDITS } from '../data/transparency';

export default function Transparency() {
  return (
    <div className="pt-[62px]">
      {/* Hero */}
      <section className="bg-black text-white py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">How We Operate</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-[0.9]">
            Full<br />Transparency.
          </h1>
          <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
            Trust is the foundation of Sduella. We publish our fund allocation, committee composition, and audit results openly and without redaction.
          </p>
        </div>
        <ShieldCheck className="absolute -right-20 -bottom-16 w-96 h-96 text-white/5" />
      </section>

      {/* Fund Allocation */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">Fund Allocation</span>
            <h2 className="text-4xl font-extrabold tracking-tight mb-8">Where every rand goes.</h2>
            <p className="text-grey-600 leading-relaxed mb-10">
              85 cents of every rand donated goes directly to student disbursements. The remaining 15 cents cover the operational costs required to maintain fund integrity.
            </p>
            <div className="space-y-6">
              {ALLOCATIONS.map((a, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold">{a.label}</span>
                    <span className="font-syne font-extrabold text-sm">{a.pct}%</span>
                  </div>
                  <div className="h-2 bg-grey-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${a.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={cn('h-full rounded-full', a.color)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {PRINCIPLES.map((p, i) => (
              <div key={i} className="flex gap-4 p-5 bg-off-white rounded-sm border border-grey-100">
                <div className="w-5 h-5 rounded-full bg-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={11} className="text-blue" />
                </div>
                <div>
                  <div className="font-bold text-sm mb-1">{p.title}</div>
                  <p className="text-xs text-grey-600 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committee */}
      <section className="py-24 px-6 md:px-12 bg-off-white border-y border-grey-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">Governance</span>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">The Committee</h2>
            <p className="text-grey-600 max-w-2xl">
              Our independent committee reviews all applications and oversees disbursements. Members serve voluntarily and declare any conflicts of interest.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMMITTEE.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white p-8 rounded-sm border border-grey-100"
              >
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-extrabold font-syne text-sm mb-5">
                  {m.name
                    .split(' ')
                    .filter(w => /^[A-Z]/.test(w))
                    .slice(0, 2)
                    .map(w => w[0])
                    .join('')}
                </div>
                <div className="font-extrabold">{m.name}</div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-blue mt-1 mb-0.5">{m.role}</div>
                <div className="text-xs text-grey-500">{m.org}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audits */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">Audits</span>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">Independent Audits</h2>
            <p className="text-grey-600">
              Quarterly audits are conducted by registered independent firms. All reports are available to donors on request.
            </p>
          </div>
          <div className="bg-white border border-grey-200 rounded-sm overflow-hidden max-w-4xl">
            <div className="grid grid-cols-4 p-5 border-b border-grey-100 bg-off-white">
              {['Period', 'Auditor', 'Status', 'Outcome'].map(h => (
                <div key={h} className="text-[10px] font-bold tracking-widest uppercase text-grey-400">{h}</div>
              ))}
            </div>
            {AUDITS.map((a, i) => (
              <div key={i} className="grid grid-cols-4 p-5 border-b border-grey-50 last:border-0 items-center">
                <div className="text-sm font-semibold">{a.period}</div>
                <div className="text-sm text-grey-600">{a.auditor}</div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm bg-green/10 text-green">
                    {a.status}
                  </span>
                </div>
                <div className="text-xs text-grey-500">{a.outcome}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-grey-400 mt-6">
            Full audit reports available on request: audit@sduella.org
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 bg-black text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4">Questions about our governance?</h2>
          <p className="text-white/60 mb-8">
            We believe accountable giving builds a stronger fund. Reach out to our committee directly.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 bg-white text-black font-syne font-bold text-sm rounded-sm hover:bg-off-white transition-all"
          >
            Contact the Committee <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
