import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="pt-[62px] min-h-[calc(100dvh-62px)] flex items-center justify-center bg-off-white p-4 sm:p-6">
      <div className="max-w-xl w-full bg-white p-6 sm:p-10 md:p-20 border border-grey-200 rounded-sm text-center">
        <Mail className="w-12 h-12 text-blue mx-auto mb-8" />
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">Stay informed.</h1>
        <p className="text-grey-600 mb-10 leading-relaxed">
          Get quarterly impact reports, student success stories, and updates on the Sduella fund pool directly in your inbox.
        </p>

        {!submitted ? (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-5 py-4 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none text-center"
              required
            />
            <button type="submit" className="w-full py-4 bg-black text-white font-syne font-bold text-sm tracking-widest uppercase rounded-sm hover:bg-black/90 transition-colors">
              Subscribe to Updates
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-green/5 border border-green/20 rounded-sm"
          >
            <p className="font-syne font-bold text-green">Thank you for subscribing!</p>
            <p className="text-sm text-grey-600 mt-1">You'll receive our next quarterly report soon.</p>
          </motion.div>
        )}
        <p className="text-[11px] text-grey-400 mt-8">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </div>
  );
}
