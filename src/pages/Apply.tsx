import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, FileText, CheckCircle2, Check, X, Plus } from 'lucide-react';
import type { User } from '../types';
import { cn } from '../lib/utils';

export default function Apply({ user, onOpenAuth, onUpdateUser }: {
  user: User | null;
  onOpenAuth: (redirectTo?: string) => void;
  onUpdateUser: (user: User) => void;
}) {
  const [step, setStep] = useState(1);
  const [contactData, setContactData] = useState({
    fullName: user?.name || '',
    phone: '',
    studentEmail: user?.email || '',
    emailVerified: false,
    otpSent: false,
    otpInput: '',
    idNumber: '',
    address: ''
  });
  const [formData, setFormData] = useState({
    institution: user?.institution || '',
    year: user?.year || '',
    average: '',
    category: '',
    amount: '',
    motivation: ''
  });
  const [bankingData, setBankingData] = useState({
    bankName: '',
    accountNumber: '',
    branchCode: '',
    accountHolder: user?.name || ''
  });

  useEffect(() => {
    if (user) {
      setContactData(prev => ({
        ...prev,
        fullName: prev.fullName || user.name || '',
        studentEmail: prev.studentEmail || user.email || ''
      }));
      setFormData(prev => ({
        ...prev,
        institution: prev.institution || user.institution || '',
        year: prev.year || user.year || ''
      }));
      setBankingData(prev => ({
        ...prev,
        accountHolder: prev.accountHolder || user.name || ''
      }));
    }
  }, [user]);

  const handleSubmit = () => {
    if (!user) return;
    const newApp = {
      id: `APP-2026-${Math.floor(Math.random() * 900) + 100}`,
      date: new Date().toISOString().split('T')[0],
      category: formData.category || 'General Funding',
      amount: parseInt(formData.amount) || 0,
      status: 'Under Review'
    };
    onUpdateUser({ ...user, applications: [newApp, ...(user.applications || [])] });
    setStep(5);
  };

  if (!user) {
    return (
      <div className="pt-[62px] min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <ShieldCheck className="w-16 h-16 text-grey-200 mb-6" />
        <h1 className="text-3xl font-extrabold mb-4">Authentication Required</h1>
        <p className="text-grey-600 max-w-md mb-8">You must be logged in as a student to apply for funding.</p>
        <button onClick={() => onOpenAuth()} className="px-8 py-4 bg-black text-white font-syne font-bold text-sm tracking-wide rounded-sm">Log In / Register</button>
      </div>
    );
  }

  if (user.role !== 'student') {
    return (
      <div className="pt-[62px] min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <X className="w-16 h-16 text-red mb-6" />
        <h1 className="text-3xl font-extrabold mb-4">Access Denied</h1>
        <p className="text-grey-600 max-w-md mb-8">Only student accounts can apply for funding.</p>
        <a href="/" className="px-8 py-4 border-1.5 border-black text-black font-syne font-bold text-sm tracking-wide rounded-sm">Back to Home</a>
      </div>
    );
  }

  return (
    <div className="pt-[62px]">
      <section className="bg-off-white border-b border-grey-200 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">Student Applications</span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-6">Apply for the first cycle.</h1>
          <p className="text-lg text-grey-600 leading-relaxed max-w-2xl">
            We are currently accepting pre-applications. Submit your details now to be first in line for review when the fund pool reaches its initial disbursement milestone.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h2 className="text-3xl font-extrabold mb-6">Before you apply</h2>
            <p className="text-grey-600 leading-relaxed mb-10">
              We review all applications against the criteria below. Applications that do not meet the baseline requirements will not proceed to committee review.
            </p>
            <div className="space-y-6 mb-12">
              {[
                'Enrolled at an accredited tertiary institution',
                'Minimum 60% academic average in current year',
                'Demonstrable financial need with documentation',
                'Final-year students receive priority'
              ].map(item => (
                <div key={item} className="flex items-start gap-4">
                  <div className="w-3 h-0.5 bg-blue mt-2.5" />
                  <span className="text-sm text-grey-600">{item}</span>
                </div>
              ))}
            </div>
            <div className="bg-off-white p-5 sm:p-8 border border-grey-200 rounded-sm">
              <h4 className="font-syne font-bold text-sm mb-3 flex items-center gap-2">
                <FileText size={16} className="text-blue" />
                Documents you will need
              </h4>
              <p className="text-[13px] text-grey-600 leading-relaxed">
                Student card, institution fee statement, official academic transcript, and a copy of your ID. You will be asked to upload these in the next step.
              </p>
            </div>
          </div>

          <div className="bg-off-white border border-grey-200 p-4 sm:p-7 lg:p-10 rounded-sm min-w-0">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between gap-1 mb-10 sm:mb-14 relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-grey-200 -translate-y-1/2 z-0" />
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="relative z-10 flex flex-col items-center">
                  <div className={cn(
                    "w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-syne font-bold text-xs sm:text-sm transition-all border-2",
                    step === s ? "bg-blue border-blue text-white shadow-lg shadow-blue/20 scale-110" :
                    step > s  ? "bg-black border-black text-white" : "bg-white border-grey-200 text-grey-400"
                  )}>
                    {step > s ? <Check size={14} /> : s}
                  </div>
                  <span className={cn(
                    "absolute -bottom-7 hidden sm:block font-syne text-[9px] font-bold tracking-widest uppercase whitespace-nowrap",
                    step === s ? "text-blue" : "text-grey-400"
                  )}>
                    {s === 1 ? 'Contact' : s === 2 ? 'Funding' : s === 3 ? 'Documents' : s === 4 ? 'Banking' : 'Done'}
                  </span>
                </div>
              ))}
              <motion.div
                className="absolute top-1/2 left-0 h-0.5 bg-blue -translate-y-1/2 z-0"
                initial={{ width: '0%' }}
                animate={{ width: `${(step - 1) * 25}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Step 1 — Contact */}
            {step === 1 && (
              <div className="space-y-8">
                <h3 className="text-xl font-extrabold pb-6 border-b border-grey-200">Contact Details</h3>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Full Name</label>
                      <input type="text" value={contactData.fullName} onChange={e => setContactData({...contactData, fullName: e.target.value})} placeholder="As per ID document" className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Phone Number</label>
                      <input type="tel" value={contactData.phone} onChange={e => setContactData({...contactData, phone: e.target.value})} placeholder="+27 000 000 0000" className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">
                      Student Email
                      {contactData.emailVerified && <span className="ml-2 text-green normal-case tracking-normal font-medium">· Verified</span>}
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        value={contactData.studentEmail}
                        onChange={e => setContactData({...contactData, studentEmail: e.target.value, emailVerified: false, otpSent: false, otpInput: ''})}
                        placeholder="yourname@student.institution.ac.za"
                        disabled={contactData.emailVerified}
                        className={cn("w-full min-w-0 flex-1 px-3.5 py-2.5 border-1.5 rounded-sm outline-none transition-colors", contactData.emailVerified ? "bg-green/5 border-green" : "border-grey-200 focus:border-blue bg-white")}
                      />
                      {!contactData.emailVerified && (
                        <button onClick={() => setContactData({...contactData, otpSent: true})} disabled={!contactData.studentEmail.includes('@')} className="px-4 py-2.5 bg-black text-white font-syne font-bold text-[11px] tracking-widest uppercase rounded-sm disabled:opacity-40 whitespace-nowrap">
                          {contactData.otpSent ? 'Resend' : 'Send Code'}
                        </button>
                      )}
                      {contactData.emailVerified && (
                        <div className="px-4 py-2.5 bg-green/10 border border-green/20 text-green font-syne font-bold text-[11px] tracking-widest uppercase rounded-sm flex items-center gap-1.5">
                          <Check size={13} /> Verified
                        </div>
                      )}
                    </div>
                    {contactData.otpSent && !contactData.emailVerified && (
                      <div className="mt-3 p-4 bg-blue/5 border border-blue/20 rounded-sm">
                        <p className="text-xs text-grey-600 mb-3">A 6-digit code was sent to <strong>{contactData.studentEmail}</strong>.</p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input type="text" value={contactData.otpInput} onChange={e => setContactData({...contactData, otpInput: e.target.value.replace(/[^0-9]/g, '').slice(0, 6)})} placeholder="000000" maxLength={6} className="w-full min-w-0 flex-1 px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none text-center font-mono text-lg tracking-[0.3em]" />
                          <button onClick={() => { if (contactData.otpInput.length === 6) setContactData({...contactData, emailVerified: true}); }} disabled={contactData.otpInput.length !== 6} className="px-5 py-2.5 bg-blue text-white font-syne font-bold text-[11px] tracking-widest uppercase rounded-sm disabled:opacity-40">Confirm</button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">SA ID Number</label>
                    <input type="text" value={contactData.idNumber} onChange={e => setContactData({...contactData, idNumber: e.target.value.replace(/[^0-9]/g, '').slice(0, 13)})} placeholder="13-digit ID number" maxLength={13} className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none font-mono tracking-widest" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Home Address</label>
                    <textarea value={contactData.address} onChange={e => setContactData({...contactData, address: e.target.value})} placeholder="Street address, suburb, city, postal code" className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none min-h-[80px]" />
                  </div>

                  <button onClick={() => setStep(2)} disabled={!contactData.fullName || !contactData.emailVerified || !contactData.idNumber || !contactData.phone} className="w-full py-3.5 bg-black text-white font-syne font-bold text-sm tracking-wide rounded-sm disabled:opacity-40 hover:bg-blue transition-colors">
                    Next: Funding Details
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 — Funding */}
            {step === 2 && (
              <div className="space-y-8">
                <h3 className="text-xl font-extrabold pb-6 border-b border-grey-200">Funding Details</h3>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Institution</label>
                      <select value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none bg-white">
                        <option value="">Select institution</option>
                        <option>University of Johannesburg</option>
                        <option>Vaal University of Technology</option>
                        <option>Tshwane University of Technology</option>
                        <option>University of Pretoria</option>
                        <option>University of Cape Town</option>
                        <option>University of the Witwatersrand</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Year of Study</label>
                      <select value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none bg-white">
                        <option value="">Select year</option>
                        {['1st Year','2nd Year','3rd Year','4th Year','Honours','Masters'].map(y => <option key={y}>{y}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Academic Average (%)</label>
                    <input type="text" value={formData.average} onChange={e => setFormData({...formData, average: e.target.value.replace(/[^0-9]/g, '').slice(0, 3)})} placeholder="e.g. 68" className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Funding Category</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none bg-white">
                      <option value="">Select category</option>
                      {['Graduation Clearance','Tuition Fees','Accommodation','Study Materials','Bursary Bridging','Medical Disruption'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Amount Required (R)</label>
                    <input type="text" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value.replace(/[^0-9]/g, '')})} placeholder="e.g. 8500" className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Motivation Statement</label>
                    <textarea value={formData.motivation} onChange={e => setFormData({...formData, motivation: e.target.value})} placeholder="Briefly describe your financial situation and how this funding will help you complete your studies..." className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none min-h-[120px]" />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button onClick={() => setStep(1)} className="flex-1 py-3.5 border-1.5 border-grey-200 font-syne font-bold text-sm rounded-sm">Back</button>
                    <button onClick={() => setStep(3)} disabled={!formData.institution || !formData.year || !formData.category || !formData.amount} className="flex-1 py-3.5 bg-black text-white font-syne font-bold text-sm rounded-sm disabled:opacity-40 hover:bg-blue transition-colors">Next: Upload Documents</button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 — Documents */}
            {step === 3 && (
              <div className="space-y-8">
                <h3 className="text-xl font-extrabold pb-6 border-b border-grey-200">Supporting Documents</h3>
                <div className="space-y-5">
                  <p className="text-sm text-grey-600">Upload clear, legible copies of the following. All documents are reviewed privately by the Sduella committee.</p>
                  {[
                    { name: 'Academic Transcript (Latest)', note: 'Official document from your institution' },
                    { name: 'Institution Fee Statement', note: 'Showing outstanding or projected balance' },
                    { name: 'National ID / Passport', note: 'Must match the ID number provided' },
                    { name: 'Student Card', note: 'Current academic year' },
                  ].map(doc => (
                    <div key={doc.name} className="p-4 border-1.5 border-dashed border-grey-200 rounded-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white">
                      <div>
                        <div className="text-[13px] font-semibold">{doc.name}</div>
                        <div className="text-[11px] text-grey-400 mt-0.5">{doc.note}</div>
                      </div>
                      <button className="text-[11px] font-bold text-blue uppercase tracking-widest flex items-center gap-1.5 shrink-0">
                        <Plus size={14} /> Upload
                      </button>
                    </div>
                  ))}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button onClick={() => setStep(2)} className="flex-1 py-3.5 border-1.5 border-grey-200 font-syne font-bold text-sm rounded-sm">Back</button>
                    <button onClick={() => setStep(4)} className="flex-1 py-3.5 bg-black text-white font-syne font-bold text-sm rounded-sm hover:bg-blue transition-colors">Next: Banking Details</button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 — Banking */}
            {step === 4 && (
              <div className="space-y-8">
                <h3 className="text-xl font-extrabold pb-6 border-b border-grey-200">Banking Details</h3>
                <div className="space-y-5">
                  <p className="text-sm text-grey-600">Sduella pays institutions directly. These details are used for identity verification.</p>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Bank Name</label>
                    <select value={bankingData.bankName} onChange={e => setBankingData({...bankingData, bankName: e.target.value})} className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none bg-white">
                      <option value="">Select bank</option>
                      {['ABSA','Standard Bank','FNB','Nedbank','Capitec','African Bank','TymeBank'].map(b => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Account Holder</label>
                    <input type="text" value={bankingData.accountHolder} onChange={e => setBankingData({...bankingData, accountHolder: e.target.value})} placeholder="Must match ID document" className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Account Number</label>
                      <input type="text" value={bankingData.accountNumber} onChange={e => setBankingData({...bankingData, accountNumber: e.target.value.replace(/[^0-9]/g, '')})} placeholder="000000000" className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none font-mono tracking-wider" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold tracking-widest uppercase text-grey-600">Branch Code</label>
                      <input type="text" value={bankingData.branchCode} onChange={e => setBankingData({...bankingData, branchCode: e.target.value.replace(/[^0-9]/g, '')})} placeholder="000000" className="w-full px-3.5 py-2.5 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none font-mono tracking-wider" />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button onClick={() => setStep(3)} className="flex-1 py-3.5 border-1.5 border-grey-200 font-syne font-bold text-sm rounded-sm">Back</button>
                    <button onClick={handleSubmit} disabled={!bankingData.bankName || !bankingData.accountNumber || !bankingData.accountHolder} className="flex-1 py-3.5 bg-black text-white font-syne font-bold text-sm rounded-sm disabled:opacity-40 hover:bg-blue transition-colors">Submit Application</button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5 — Success */}
            {step === 5 && (
              <div className="py-10 text-center">
                <CheckCircle2 className="w-16 h-16 text-green mx-auto mb-6" />
                <h3 className="text-2xl font-extrabold mb-2">Application Submitted</h3>
                <p className="text-sm text-grey-600 max-w-xs mx-auto mb-8 leading-relaxed mt-4">
                  Our review committee will assess your application within <strong>48 working hours</strong> and contact you at <strong>{contactData.studentEmail}</strong>.
                </p>
                <a href="/dashboard" className="block w-full py-3.5 bg-black text-white font-syne font-bold text-sm text-center rounded-sm hover:bg-blue transition-colors">
                  Go to Dashboard
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
