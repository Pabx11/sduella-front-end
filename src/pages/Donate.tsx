import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import type { User } from '../types';
import { cn } from '../lib/utils';

export default function Donate({ user, onDonate, onUpdateUser }: {
  user: User | null;
  onDonate: (amount: number) => void;
  onUpdateUser: (user: User) => void;
}) {
  const [amount, setAmount] = useState('1000');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [step, setStep] = useState(1);
  const [donorInfo, setDonorInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    message: ''
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: user?.name || ''
  });

  useEffect(() => {
    if (user) {
      setDonorInfo(prev => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || ''
      }));
      setPaymentData(prev => ({
        ...prev,
        name: prev.name || user.name || ''
      }));
    }
  }, [user]);

  const amounts = ['500', '1000', '2500', '5000', '10000'];

  const handleDonateSubmit = () => {
    const donationAmount = parseInt(amount) || 0;
    onDonate(donationAmount);
    if (user && user.role === 'donor') {
      const newDonation = {
        date: new Date().toISOString().split('T')[0],
        amount: donationAmount,
        students: Math.floor(donationAmount / 2500) || 1,
        status: 'Active'
      };
      onUpdateUser({
        ...user,
        totalDonated: (user.totalDonated || 0) + donationAmount,
        donations: [newDonation, ...(user.donations || [])]
      });
    }
    setStep(3);
  };

  if (step === 3) {
    return (
      <div className="pt-[62px] min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <CheckCircle2 className="w-16 h-16 text-green mb-6" />
        <h1 className="text-3xl font-extrabold mb-4">
          {donorInfo.name ? `Thank You, ${donorInfo.name.split(' ')[0]}` : 'Thank You for Your Contribution'}
        </h1>
        <p className="text-grey-600 max-w-md mb-8">
          Your donation of R {(parseInt(amount) || 0).toLocaleString()} has been added to the foundational pool.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a href="/" className="px-8 py-4 border-1.5 border-black text-black font-syne font-bold text-sm tracking-wide rounded-sm">Back to Home</a>
          {user && <a href="/dashboard" className="px-8 py-4 bg-black text-white font-syne font-bold text-sm tracking-wide rounded-sm">View Dashboard</a>}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[62px]">
      <section className="bg-off-white border-b border-grey-200 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">Donate</span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-6">Invest in a student's future.</h1>
          <p className="text-lg text-grey-600 leading-relaxed max-w-2xl">
            Every contribution goes into a managed fund disbursed exclusively to reviewed, approved student applications. No intermediaries. Direct to institution.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">Why It Matters</span>
            <h2 className="text-3xl font-extrabold mb-6">Your contribution is different here.</h2>
            <p className="text-grey-600 leading-relaxed mb-10">
              Sduella is not a crowdfunding platform. There are no individual campaigns to back, no social pressure, and no algorithmic popularity contests. Your money enters a managed pool and is disbursed based solely on merit and need.
            </p>
            <div className="space-y-4">
              {[
                'Funds go directly to institutions, not individuals',
                'Every application reviewed by a human committee',
                'Quarterly impact reports sent to all donors',
                'Section 18A tax receipt available on request',
                'Log into your dashboard to see cumulative impact'
              ].map(item => (
                <div key={item} className="flex items-start gap-4">
                  <div className="w-0.5 h-4 bg-blue mt-1" />
                  <span className="text-sm text-grey-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-1.5 border-grey-200 p-4 sm:p-7 lg:p-10 rounded-sm min-w-0">
            {step === 1 ? (
              <>
                <h3 className="text-xl font-extrabold mb-8">Make a Contribution</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                  {amounts.map(a => (
                    <button
                      key={a}
                      onClick={() => setAmount(a)}
                      className={cn(
                        "py-3 font-syne font-extrabold text-lg border-1.5 rounded-sm transition-all",
                        amount === a ? "border-blue bg-blue/5 text-blue" : "border-grey-200 hover:border-blue/50"
                      )}
                    >
                      R {parseInt(a).toLocaleString()}
                    </button>
                  ))}
                  <button
                    onClick={() => setAmount('')}
                    className={cn(
                      "py-3 font-syne font-extrabold text-sm border-1.5 rounded-sm transition-all",
                      !amounts.includes(amount) ? "border-blue bg-blue/5 text-blue" : "border-grey-200 hover:border-blue/50"
                    )}
                  >
                    Custom
                  </button>
                </div>
                {!amounts.includes(amount) && (
                  <div className="mb-6">
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="Enter custom amount"
                      className="w-full px-4 py-3 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none"
                    />
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6 p-4 bg-grey-100 rounded-sm">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 accent-black"
                  />
                  <label htmlFor="anonymous" className="text-sm font-semibold text-grey-600 cursor-pointer select-none">
                    Donate anonymously
                  </label>
                </div>

                {!isAnonymous && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 mb-8"
                  >
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-grey-400">Your Name</label>
                      <input
                        type="text"
                        value={donorInfo.name}
                        onChange={(e) => { setDonorInfo({...donorInfo, name: e.target.value}); setPaymentData({...paymentData, name: e.target.value}); }}
                        placeholder="Full Name"
                        className="w-full px-4 py-3 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-grey-400">Email Address</label>
                      <input
                        type="email"
                        value={donorInfo.email}
                        onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                        placeholder="email@example.com"
                        className="w-full px-4 py-3 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-grey-400">Message (Optional)</label>
                      <textarea
                        value={donorInfo.message}
                        onChange={(e) => setDonorInfo({...donorInfo, message: e.target.value})}
                        placeholder="Leave a message of encouragement..."
                        rows={3}
                        className="w-full px-4 py-3 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none resize-none"
                      />
                    </div>
                  </motion.div>
                )}

                <button
                  onClick={() => setStep(2)}
                  disabled={!amount || (!isAnonymous && (!donorInfo.name || !donorInfo.email))}
                  className="w-full py-4 bg-blue text-white font-syne font-bold text-sm tracking-wide rounded-sm hover:bg-blue-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Payment
                </button>
              </>
            ) : (
              <div className="space-y-6">
                <h3 className="text-xl font-extrabold mb-2">Payment Details</h3>
                <p className="text-xs text-grey-500 mb-6 uppercase tracking-widest font-bold">Secure Checkout</p>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-grey-400">Cardholder Name</label>
                    <input type="text" value={paymentData.name} onChange={(e) => setPaymentData({...paymentData, name: e.target.value})} placeholder="John Doe" className="w-full px-4 py-3 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-grey-400">Card Number</label>
                    <input type="text" value={paymentData.cardNumber} onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value.replace(/[^0-9]/g, '').slice(0, 16)})} placeholder="0000 0000 0000 0000" className="w-full px-4 py-3 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-grey-400">Expiry</label>
                      <input type="text" value={paymentData.expiry} onChange={(e) => setPaymentData({...paymentData, expiry: e.target.value})} placeholder="MM/YY" className="w-full px-4 py-3 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-grey-400">CVV</label>
                      <input type="password" value={paymentData.cvv} onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value.replace(/[^0-9]/g, '').slice(0, 3)})} placeholder="***" className="w-full px-4 py-3 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none" />
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 py-4 border-1.5 border-grey-200 font-syne font-bold text-sm tracking-wide rounded-sm">Back</button>
                  <button onClick={handleDonateSubmit} disabled={!paymentData.cardNumber || !paymentData.name} className="flex-[2] py-4 bg-blue text-white font-syne font-bold text-sm tracking-wide rounded-sm hover:bg-blue-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    Pay R {(parseInt(amount) || 0).toLocaleString()}
                  </button>
                </div>
              </div>
            )}
            <p className="text-[11px] text-grey-400 text-center mt-4 leading-relaxed">
              All donations are managed by the Sduella fund committee and disbursed to reviewed, approved students only.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
