import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { FUNDING_TYPES } from '../data/fundingGuide';

export default function FundingGuide() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="pt-[62px]">
      {/* Hero */}
      <section className="bg-black text-white py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">Education</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-[0.9]">
            Funding Types<br />Explained.
          </h1>
          <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
            Bursary, learnership, scholarship, fellowship — they sound similar but work very differently. Know exactly what you're applying for before you apply.
          </p>
        </div>
      </section>

      {/* Quick nav */}
      <section className="bg-off-white border-b border-grey-200 sticky top-[62px] z-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex gap-2 overflow-x-auto scrollbar-hide">
          {FUNDING_TYPES.map(t => (
            <a key={t.id} href={`#${t.id}`}
              className="flex-shrink-0 px-4 py-2 text-[11px] font-bold uppercase tracking-widest border-1.5 border-grey-300 rounded-sm text-grey-600 hover:bg-black hover:text-white hover:border-black transition-all">
              {t.label}
            </a>
          ))}
        </div>
      </section>

      {/* Type sections */}
      <div className="divide-y divide-grey-100">
        {FUNDING_TYPES.map((type, i) => (
          <section key={type.id} id={type.id} className={cn("py-20 px-6 md:px-12 scroll-mt-[120px]", i % 2 === 1 && "bg-off-white")}>
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className={cn("text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-sm", type.color)}>
                      {type.label}
                    </span>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-grey-400">{type.tag}</span>
                  </div>

                  <h2 className="text-4xl font-extrabold tracking-tight mb-5">{type.headline}</h2>
                  <p className="text-grey-600 leading-relaxed text-lg mb-10">{type.summary}</p>

                  {/* How it works */}
                  <h3 className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-6">How It Works</h3>
                  <div className="space-y-6 mb-10">
                    {type.how.map((step, j) => (
                      <motion.div key={j} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: j * 0.07 }}
                        className="flex gap-5 items-start">
                        <div className="text-2xl font-extrabold text-blue/30 font-syne w-8 flex-shrink-0">{step.step}</div>
                        <div>
                          <div className="font-bold mb-1">{step.title}</div>
                          <p className="text-sm text-grey-600 leading-relaxed">{step.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* FAQs */}
                  <h3 className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-4">Common Questions</h3>
                  <div className="space-y-2">
                    {type.faqs.map((faq, j) => (
                      <div key={j} className="border border-grey-100 rounded-sm overflow-hidden">
                        <button
                          onClick={() => setActiveId(activeId === `${type.id}-${j}` ? null : `${type.id}-${j}`)}
                          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-grey-50 transition-colors"
                        >
                          <span className="font-semibold text-sm pr-4">{faq.q}</span>
                          <ChevronDown size={16} className={cn("text-grey-400 flex-shrink-0 transition-transform", activeId === `${type.id}-${j}` && "rotate-180")} />
                        </button>
                        <AnimatePresence>
                          {activeId === `${type.id}-${j}` && (
                            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                              className="overflow-hidden">
                              <div className="px-5 pb-4 text-sm text-grey-600 leading-relaxed border-t border-grey-100 pt-4">{faq.a}</div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-5 lg:sticky lg:top-[130px]">
                  <div className="bg-white border border-grey-200 rounded-sm p-7">
                    <h4 className="font-extrabold mb-4">Who Qualifies?</h4>
                    <p className="text-sm text-grey-600 leading-relaxed">{type.who}</p>
                  </div>

                  <a href={type.cta.href}
                    className="flex items-center justify-between w-full px-7 py-5 bg-black text-white rounded-sm hover:bg-black/90 transition-colors group">
                    <span className="font-syne font-bold text-sm">{type.cta.label}</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>

                  {i === 1 && (
                    <a href="/learnerships"
                      className="flex items-center justify-between w-full px-7 py-5 bg-blue text-white rounded-sm hover:bg-blue-hover transition-colors group">
                      <span className="font-syne font-bold text-sm">Explore All Learnerships</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}

                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 bg-black text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4">Not sure which to apply for?</h2>
          <p className="text-white/60 mb-8 leading-relaxed">Browse all funding types in one place — filtered by type, field, and deadline.</p>
          <a href="/bursaries" className="inline-flex items-center gap-3 px-10 py-4 bg-white text-black font-syne font-bold text-sm rounded-sm hover:bg-off-white transition-all">
            Browse All Funding <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
