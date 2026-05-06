import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { LEARNERSHIPS, HOW_IT_WORKS } from '../data/learnerships';

const SECTORS = ['All', ...Array.from(new Set(LEARNERSHIPS.map(l => l.sector))).sort()];
const SETAS = ['All', ...Array.from(new Set(LEARNERSHIPS.map(l => l.seta))).sort()];

export default function Learnerships() {
  const [sectorFilter, setSectorFilter] = useState('All');
  const [setaFilter, setSetaFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<typeof LEARNERSHIPS[0] | null>(null);

  const filtered = LEARNERSHIPS.filter(l => {
    const matchSector = sectorFilter === 'All' || l.sector === sectorFilter;
    const matchSeta = setaFilter === 'All' || l.seta === setaFilter;
    const matchSearch = !search ||
      l.provider.toLowerCase().includes(search.toLowerCase()) ||
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.sector.toLowerCase().includes(search.toLowerCase());
    return matchSector && matchSeta && matchSearch;
  });

  return (
    <div className="pt-[62px]">
      {/* Hero */}
      <section className="bg-black text-white py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-green block mb-4">Bridge to Work</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-[0.9]">
            Learnerships<br /><span className="text-green">that pay.</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
            A learnership gives you a nationally recognised NQF qualification, real workplace experience, and a monthly stipend — all at the same time. It's the fastest bridge from studying to working.
          </p>
          <div className="flex flex-wrap gap-6 mt-10">
            {[
              { label: 'Stipend', value: 'R2,500–R8,500/mo' },
              { label: 'Duration', value: '12 months' },
              { label: 'Qualification', value: 'NQF Certified' },
              { label: 'Age', value: '18–35 years' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-1">{s.label}</div>
                <div className="font-syne font-extrabold text-lg">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 md:px-12 bg-off-white border-b border-grey-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">The Process</span>
            <h2 className="text-4xl font-extrabold tracking-tight">How a Learnership Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {HOW_IT_WORKS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white p-6 rounded-sm border border-grey-100 relative">
                <div className="text-3xl font-extrabold text-blue/20 font-syne mb-3">{s.step}</div>
                <div className="font-bold text-sm mb-2">{s.title}</div>
                <p className="text-xs text-grey-600 leading-relaxed">{s.desc}</p>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-grey-300" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-green/5 border border-green/20 rounded-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Check size={20} className="text-green flex-shrink-0 mt-0.5" />
            <p className="text-sm text-grey-700 leading-relaxed">
              <strong>Learnership vs Internship:</strong> A learnership is SETA-registered and results in a nationally recognised NQF qualification. An internship is a company-specific work placement with no formal qualification. Learnerships have stronger legal protections and a clearer qualification outcome.
            </p>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">Opportunities</span>
            <h2 className="text-4xl font-extrabold tracking-tight mb-2">Open Learnerships</h2>
            <p className="text-grey-600">{LEARNERSHIPS.filter(l => l.status === 'open').length} active opportunities across {SECTORS.length - 1} sectors</p>
          </div>

          {/* Filters */}
          <div className="space-y-3 mb-10">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by provider, title or sector..."
              className="w-full px-5 py-4 border border-grey-200 rounded-sm focus:outline-none focus:border-blue text-sm bg-white" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-1.5">Sector</label>
                <select
                  value={sectorFilter}
                  onChange={e => setSectorFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-grey-200 rounded-sm bg-white text-sm font-semibold focus:outline-none focus:border-blue transition-colors appearance-none cursor-pointer"
                >
                  {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-1.5">SETA</label>
                <select
                  value={setaFilter}
                  onChange={e => setSetaFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-grey-200 rounded-sm bg-white text-sm font-semibold focus:outline-none focus:border-blue transition-colors appearance-none cursor-pointer"
                >
                  {SETAS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            {(sectorFilter !== 'All' || setaFilter !== 'All' || search) && (
              <button
                onClick={() => { setSectorFilter('All'); setSetaFilter('All'); setSearch(''); }}
                className="text-[11px] font-bold text-blue hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((l, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                  onClick={() => setSelected(l)}
                  className={cn("bg-white border rounded-sm p-7 flex flex-col cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group",
                    l.status === 'open' ? "border-grey-200 hover:border-green" : "border-grey-100 opacity-60")}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className={cn("text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-sm inline-block mb-2",
                        l.status === 'open' ? "bg-green/10 text-green" : "bg-grey-100 text-grey-400")}>
                        {l.status === 'open' ? '● Open' : '● Closed'}
                      </span>
                      <div className="font-syne text-[10px] font-bold tracking-widest uppercase text-blue">{l.provider}</div>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-grey-400 bg-grey-50 px-2 py-1 rounded-sm">{l.nqf}</span>
                  </div>

                  <h3 className="font-extrabold text-base mb-2 leading-snug break-words">{l.title}</h3>
                  <p className="text-xs text-grey-600 leading-relaxed flex-1 mb-5 break-words">{l.description}</p>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-grey-50">
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-grey-400 mb-0.5">Stipend</div>
                      <div className="text-sm font-bold text-green">{l.stipend}</div>
                    </div>
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-grey-400 mb-0.5">Deadline</div>
                      <div className="text-sm font-bold">{l.deadline}</div>
                    </div>
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-grey-400 mb-0.5">Duration</div>
                      <div className="text-sm font-semibold text-grey-700">{l.duration}</div>
                    </div>
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-grey-400 mb-0.5">Sector</div>
                      <div className="text-xs font-semibold text-grey-600">{l.sector}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-grey-300 rounded-sm">
              <p className="text-grey-500 font-syne italic">No learnerships match your filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white w-full max-w-2xl rounded-sm shadow-2xl overflow-y-auto max-h-[90vh]">
            <button onClick={() => setSelected(null)} className="absolute top-5 right-5 p-2 hover:bg-grey-100 rounded-sm transition-colors z-10">
              <X size={18} />
            </button>
            <div className="p-10">
              <div className="flex items-center gap-3 mb-2">
                <span className={cn("text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-sm",
                  selected.status === 'open' ? "bg-green/10 text-green" : "bg-grey-100 text-grey-400")}>
                  {selected.status === 'open' ? '● Open' : '● Closed'}
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-blue">{selected.seta}</span>
              </div>
              <h2 className="text-3xl font-extrabold mb-1">{selected.title}</h2>
              <div className="font-syne font-bold text-grey-500 mb-6">{selected.provider}</div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-grey-100">
                {[
                  { label: 'Stipend', value: selected.stipend, highlight: true },
                  { label: 'Duration', value: selected.duration },
                  { label: 'NQF Level', value: selected.nqf },
                  { label: 'Deadline', value: selected.deadline },
                ].map(({ label, value, highlight }) => (
                  <div key={label}>
                    <div className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-1">{label}</div>
                    <div className={cn("font-bold text-sm", highlight && "text-green")}>{value}</div>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <div className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-3">About this Learnership</div>
                <p className="text-grey-600 leading-relaxed text-sm">{selected.description}</p>
              </div>

              <div className="mb-8">
                <div className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-3">Eligibility Requirements</div>
                <ul className="space-y-2">
                  {selected.eligibility.map((e, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-grey-700">
                      <Check size={14} className="text-green flex-shrink-0" />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href={selected.url} target="_blank" rel="noopener noreferrer"
                  className="flex-1 py-4 bg-black text-white font-syne font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-black/90 transition-all flex items-center justify-center gap-3">
                  Apply Now <ArrowRight size={16} />
                </a>
                <button onClick={() => setSelected(null)}
                  className="px-8 py-4 border border-grey-200 text-grey-600 font-syne font-bold text-sm rounded-sm hover:bg-grey-50 transition-all">
                  Close
                </button>
              </div>
              <p className="text-[10px] text-grey-400 text-center mt-4">You will be redirected to the provider's official portal.</p>
            </div>
          </motion.div>
        </div>
      )}

      {/* SETA directory */}
      <section className="py-20 px-6 md:px-12 bg-off-white border-t border-grey-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">SETA Directory</span>
            <h2 className="text-3xl font-extrabold tracking-tight mb-2">All 21 SETAs in South Africa</h2>
            <p className="text-grey-600 text-sm">Each SETA funds learnerships in its sector. Visit their websites to find additional opportunities not listed above.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: 'AgriSETA', sector: 'Agriculture', url: 'https://www.agriseta.co.za' },
              { name: 'BANKSETA', sector: 'Banking & Credit', url: 'https://www.bankseta.org.za' },
              { name: 'CATHSSETA', sector: 'Tourism, Arts, Hospitality & Sport', url: 'https://www.cathsseta.org.za' },
              { name: 'CETA', sector: 'Construction & Plumbing', url: 'https://www.ceta.org.za' },
              { name: 'CHIETA', sector: 'Chemical Industries', url: 'https://www.chieta.org.za' },
              { name: 'ETDP SETA', sector: 'Education & Training', url: 'https://www.etdpseta.org.za' },
              { name: 'EWSETA', sector: 'Energy & Water', url: 'https://www.ewseta.org.za' },
              { name: 'FASSET', sector: 'Finance & Auditing', url: 'https://www.fasset.org.za' },
              { name: 'FoodBev SETA', sector: 'Food & Beverage Manufacturing', url: 'https://www.foodbev.co.za' },
              { name: 'FP&M SETA', sector: 'Clothing, Textiles & Printing', url: 'https://www.fpmseta.org.za' },
              { name: 'HWSETA', sector: 'Health & Social Work', url: 'https://www.hwseta.org.za' },
              { name: 'INSETA', sector: 'Insurance', url: 'https://www.inseta.org.za' },
              { name: 'LGSETA', sector: 'Local Government', url: 'https://www.lgseta.org.za' },
              { name: 'merSETA', sector: 'Engineering & Manufacturing', url: 'https://www.merseta.org.za' },
              { name: 'MICT SETA', sector: 'IT, Media & Communications', url: 'https://www.mict.org.za' },
              { name: 'MQA', sector: 'Mining & Minerals', url: 'https://www.mqa.org.za' },
              { name: 'PSETA', sector: 'Public Service', url: 'https://www.pseta.org.za' },
              { name: 'SASSETA', sector: 'Safety & Security', url: 'https://www.sasseta.org.za' },
              { name: 'Services SETA', sector: 'Marketing, HR & Cleaning', url: 'https://www.serviceseta.org.za' },
              { name: 'TETA', sector: 'Transport & Logistics', url: 'https://www.teta.org.za' },
              { name: 'W&RSETA', sector: 'Retail & Wholesale', url: 'https://www.wrseta.org.za' },
            ].map((seta, i) => (
              <a key={i} href={seta.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between bg-white p-5 rounded-sm border border-grey-100 hover:border-blue hover:shadow-md transition-all group">
                <div>
                  <div className="font-bold text-sm group-hover:text-blue transition-colors">{seta.name}</div>
                  <div className="text-xs text-grey-500 mt-0.5">{seta.sector}</div>
                </div>
                <ArrowRight size={14} className="text-grey-300 group-hover:text-blue transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 bg-black text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4">Ready to bridge the gap?</h2>
          <p className="text-white/60 mb-8 leading-relaxed">A learnership is the fastest route from study to work in South Africa. Find your fit, apply early, and earn while you learn.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/funding-guide#learnership" className="px-8 py-4 border border-white/20 text-white font-syne font-bold text-sm rounded-sm hover:bg-white/5 transition-all">
              How Learnerships Work
            </a>
            <a href="/bursaries" className="px-8 py-4 bg-white text-black font-syne font-bold text-sm rounded-sm hover:bg-off-white transition-all">
              Browse All Funding Types
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
