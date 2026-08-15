import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, CheckCircle2 } from 'lucide-react';

export default function PartnerModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ org: '', name: '', email: '', link: '', notes: '' });
  const [file, setFile] = useState<File | null>(null);
  const [sent, setSent] = useState(false);

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));
  const canSend = form.org && form.name && form.email && (file || form.link || form.notes);

  const reset = () => {
    setSent(false);
    setForm({ org: '', name: '', email: '', link: '', notes: '' });
    setFile(null);
  };

  return (
    <>
      <div className="mt-16 text-center">
        <p className="text-sm text-grey-500 mb-2">Are you a bursary provider?</p>
        <p className="text-xs text-grey-400 mb-6 max-w-md mx-auto">
          Check if your bursary is already listed above. If it's not, submit your details below — a document, a link, or any information you have — and we'll get it listed.
        </p>
        <button
          onClick={() => { setOpen(true); reset(); }}
          className="px-8 py-3 bg-black text-white font-syne font-bold text-sm tracking-wide rounded-sm hover:bg-black/90 transition-colors"
        >
          Partner with Sduella
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-0 bg-white w-full max-w-lg rounded-t-sm sm:rounded-sm shadow-2xl flex flex-col max-h-[96dvh] sm:max-h-[90vh]"
            >
              <button onClick={() => setOpen(false)} className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 text-grey-400 hover:text-black hover:bg-grey-100 rounded-sm z-10">
                <X size={16} />
              </button>

              <div className="p-5 pr-14 pb-3 sm:p-8 sm:pb-4 shrink-0">
                <span className="text-[10px] font-bold tracking-widest uppercase text-blue block mb-3">Bursary Listing</span>
                <h2 className="text-2xl font-extrabold font-syne">Partner with Sduella</h2>
                <p className="text-sm text-grey-500 mt-2 leading-relaxed">
                  Send us your bursary details in any format — a PDF, a link to your page, or just paste the info. We review every submission and list approved bursaries within <strong>5 business days</strong>.
                </p>
              </div>

              <div className="overflow-y-auto flex-1 px-5 pb-5 sm:px-8 sm:pb-8">
                {!sent ? (
                  <form onSubmit={e => { e.preventDefault(); if (canSend) setSent(true); }} className="space-y-5 mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold tracking-widest uppercase text-grey-500">Organisation</label>
                        <input type="text" value={form.org} onChange={e => set('org', e.target.value)}
                          className="w-full px-4 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none transition-colors text-sm"
                          placeholder="Company / Foundation" required />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold tracking-widest uppercase text-grey-500">Your Name</label>
                        <input type="text" value={form.name} onChange={e => set('name', e.target.value)}
                          className="w-full px-4 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none transition-colors text-sm"
                          placeholder="Full name" required />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-grey-500">Contact Email</label>
                      <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                        className="w-full px-4 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none transition-colors text-sm"
                        placeholder="your@organisation.co.za" required />
                    </div>

                    <div className="space-y-2">
                      <div className="text-[10px] font-bold tracking-widest uppercase text-grey-500">
                        Bursary Details <span className="normal-case font-normal tracking-normal text-grey-400">— upload a file, paste a link, or type it out</span>
                      </div>
                      <label className={`flex items-center gap-4 p-4 border-1.5 border-dashed rounded-sm cursor-pointer transition-colors ${file ? 'border-blue bg-blue/5' : 'border-grey-200 hover:border-grey-400'}`}>
                        <FileText size={18} className={file ? 'text-blue' : 'text-grey-400'} />
                        <div className="flex-1 min-w-0">
                          {file
                            ? <div className="text-sm font-semibold text-blue truncate">{file.name}</div>
                            : <><div className="text-sm font-semibold">Upload a document</div><div className="text-[11px] text-grey-400">PDF, Word, or text file</div></>
                          }
                        </div>
                        {file && (
                          <button type="button" onClick={e => { e.preventDefault(); setFile(null); }} className="text-grey-400 hover:text-red transition-colors flex-shrink-0">
                            <X size={14} />
                          </button>
                        )}
                        <input type="file" className="hidden" accept=".pdf,.doc,.docx,.txt" onChange={e => setFile(e.target.files?.[0] || null)} />
                      </label>
                      <input type="url" value={form.link} onChange={e => set('link', e.target.value)}
                        className="w-full px-4 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none transition-colors text-sm"
                        placeholder="Or paste a link to your bursary page" />
                      <textarea value={form.notes} onChange={e => set('notes', e.target.value)}
                        rows={4} className="w-full px-4 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none transition-colors text-sm resize-none"
                        placeholder="Or paste any text — eligibility, amounts, deadlines, fields of study..." />
                    </div>

                    <button type="submit" disabled={!canSend}
                      className="w-full py-3 bg-black text-white font-syne font-bold text-sm tracking-wide rounded-sm hover:bg-black/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                      Submit for Review
                    </button>
                    <p className="text-[10px] text-grey-400 text-center">
                      By submitting you agree to our <a href="/privacy" className="text-blue hover:underline">Privacy Policy</a>.
                    </p>
                  </form>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-8 bg-green/5 border border-green/20 rounded-sm text-center">
                    <CheckCircle2 className="w-12 h-12 text-green mx-auto mb-4" />
                    <h3 className="text-lg font-extrabold mb-2">Submission received.</h3>
                    <p className="text-sm text-grey-600 mb-4">
                      We'll review your bursary and have it listed within <strong>5 business days</strong>. We'll confirm at <strong>{form.email}</strong>.
                    </p>
                    <p className="text-xs text-grey-400 mb-6">
                      Not listed after 5 days? <a href="/contact" className="text-blue hover:underline">Contact us</a> and reference your organisation name.
                    </p>
                    <button onClick={() => setOpen(false)} className="px-6 py-2.5 border border-grey-200 text-sm font-bold rounded-sm hover:bg-grey-50 transition-colors">
                      Close
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
