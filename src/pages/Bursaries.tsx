import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, ShieldCheck, Target, FileText, ArrowRight, Check, X, Plus } from 'lucide-react';
import PartnerModal from '../components/PartnerModal';
import { FUNDING_LISTINGS, ALL_FUNDING_TYPES, TYPE_COLORS, type FundingType } from '../data/bursaries';
import type { User } from '../types';
import { cn } from '../lib/utils';

export default function Bursaries({ user, onOpenAuth }: { user: User | null; onOpenAuth: (redirectTo?: string) => void }) {
  const navigate = useNavigate();

  const handleApply = () => {
    if (user) navigate('/dashboard');
    else onOpenAuth('/dashboard');
  };
  const [activeType, setActiveType] = useState<FundingType | 'All'>('All');
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

  const allFields = ['All', ...new Set(FUNDING_LISTINGS.flatMap(b => b.fields))].sort();

  const filteredBursaries = FUNDING_LISTINGS.filter(b => {
    const matchesType = activeType === 'All' || b.type === activeType;
    const matchesFilter = activeFilter === 'All' || b.fields.includes(activeFilter);
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.fields.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-[62px]">
      {/* Hero */}
      <section className="bg-off-white py-24 px-6 md:px-12 border-b border-grey-200">
        <div className="max-w-7xl mx-auto">
          <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">Funding Opportunities</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 max-w-3xl leading-[0.9]">
            Bursaries for <span className="text-blue">Every Student.</span>
          </h1>
          <p className="text-xl text-grey-600 leading-relaxed max-w-2xl">
            Sduella provides targeted financial support and connects you with leading external bursary providers to ensure your academic journey is fully funded.
          </p>
        </div>
      </section>

      {/* Sduella Managed Funds */}
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
                onClick={() => setSelectedBursary({ ...cat, url: "/apply", isInternal: true })}
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
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">All Funding Opportunities</h2>
            <p className="text-grey-600 max-w-2xl mx-auto mb-12">Bursaries, scholarships, fellowships, grants, learnerships and YES programmes — curated for South African students.</p>

            <div className="flex flex-col gap-4 max-w-4xl mx-auto">
              <input
                type="text"
                placeholder="Search by provider, title or field..."
                className="w-full px-5 py-4 bg-white border border-grey-200 rounded-sm focus:outline-none focus:border-blue transition-colors text-sm"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />

              <div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-2 text-left">Type</div>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {(['All', ...ALL_FUNDING_TYPES] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => { setActiveType(type as FundingType | 'All'); setActiveFilter('All'); }}
                      className={cn(
                        "flex-shrink-0 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-sm border transition-all",
                        activeType === type ? "bg-blue text-white border-blue" : "bg-white text-grey-500 border-grey-200 hover:border-grey-400"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-2 text-left">Field of Study</label>
                <select
                  value={activeFilter}
                  onChange={e => setActiveFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-grey-200 rounded-sm bg-white text-sm font-semibold focus:outline-none focus:border-blue transition-colors appearance-none cursor-pointer"
                >
                  {allFields.map(field => <option key={field} value={field}>{field}</option>)}
                </select>
              </div>

              {(activeType !== 'All' || activeFilter !== 'All' || searchQuery) && (
                <button onClick={() => { setActiveType('All'); setActiveFilter('All'); setSearchQuery(''); }} className="text-[11px] font-bold text-blue hover:underline self-start">
                  Clear filters
                </button>
              )}
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
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue bg-blue/5 px-2 py-1 rounded-sm inline-block">{bursary.provider}</span>
                        <span className={cn("text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm", TYPE_COLORS[bursary.type])}>{bursary.type}</span>
                      </div>
                      <h3 className="text-xl font-extrabold break-words">{bursary.title}</h3>
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
            </div>
          )}

          {/* Detail Modal */}
          <AnimatePresence>
            {selectedBursary && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedBursary(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative z-0 bg-white w-full max-w-2xl rounded-sm shadow-2xl max-h-[90vh] overflow-y-auto">
                  <button onClick={() => setSelectedBursary(null)} className="absolute top-6 right-6 p-2 hover:bg-off-white rounded-full transition-colors z-10">
                    <X size={20} />
                  </button>
                  <div className="p-12">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue bg-blue/5 px-3 py-1.5 rounded-sm mb-4 inline-block">{selectedBursary.provider}</span>
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
                        <button onClick={handleApply} className="flex-1 py-4 bg-blue text-white font-syne font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-blue-hover transition-all flex items-center justify-center gap-3">
                          Apply via Sduella <ArrowRight size={16} />
                        </button>
                      ) : (
                        <a href={selectedBursary.url} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 bg-blue text-white font-syne font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-blue-hover transition-all flex items-center justify-center gap-3">
                          Apply on External Site <ArrowRight size={16} />
                        </a>
                      )}
                      <button onClick={() => setSelectedBursary(null)} className="px-8 py-4 border border-grey-200 text-grey-600 font-syne font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-off-white transition-all">
                        Close
                      </button>
                    </div>
                    <p className="mt-6 text-[10px] text-grey-400 text-center italic">
                      {selectedBursary.isInternal ? "This application will be processed directly by the Sduella committee." : "Note: You will be redirected to the provider's official portal."}
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <PartnerModal />
        </div>
      </section>

      {/* Application Process */}
      <section className="py-24 px-6 md:px-12 bg-black text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
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
            <p className="text-white/60 mb-8 leading-relaxed">We are currently building the foundational pool. Students who register now will be the first to be reviewed when the first disbursement cycle opens.</p>
            <button onClick={handleApply} className="inline-flex items-center gap-3 px-8 py-4 bg-blue text-white font-syne font-bold text-sm tracking-wide rounded-sm hover:bg-blue-hover transition-all">
              Start Application <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
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
}
