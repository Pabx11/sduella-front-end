import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));
  const canSend = form.name && form.email && form.subject && form.message;

  return (
    <div className="pt-[62px]">
      {/* Hero */}
      <section className="bg-black text-white py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">Get in Touch</span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-[0.9]">Contact Us</h1>
          <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
            Have a question, partnership inquiry, or just want to say hello? We read every message.
          </p>
        </div>
        <Mail className="absolute -right-16 -bottom-16 w-80 h-80 text-white/5" />
      </section>

      {/* Content */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-20">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-extrabold mb-8">Send a message</h2>
            {!sent ? (
              <form
                onSubmit={e => { e.preventDefault(); if (canSend) setSent(true); }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-grey-500">Full Name</label>
                    <input
                      type="text" value={form.name} onChange={e => set('name', e.target.value)}
                      className="w-full px-4 py-3 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none transition-colors text-sm"
                      placeholder="Your full name" required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-grey-500">Email Address</label>
                    <input
                      type="email" value={form.email} onChange={e => set('email', e.target.value)}
                      className="w-full px-4 py-3 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none transition-colors text-sm"
                      placeholder="your@email.com" required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-grey-500">Subject</label>
                  <select
                    value={form.subject} onChange={e => set('subject', e.target.value)}
                    className="w-full px-4 py-3 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none transition-colors appearance-none bg-white text-sm"
                    required
                  >
                    <option value="">Select a subject</option>
                    {[
                      'Student Application Enquiry',
                      'Donor / Partnership',
                      'Technical Support',
                      'Media & Press',
                      'General Enquiry',
                    ].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-grey-500">Message</label>
                  <textarea
                    value={form.message} onChange={e => set('message', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border-1.5 border-grey-200 rounded-sm focus:border-blue outline-none transition-colors text-sm resize-none"
                    placeholder="Tell us how we can help..."
                    required
                  />
                </div>

                <button
                  type="submit" disabled={!canSend}
                  className="px-10 py-4 bg-black text-white font-syne font-bold text-sm rounded-sm hover:bg-black/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Send Message
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="p-10 bg-green/5 border border-green/20 rounded-sm text-center"
              >
                <CheckCircle2 className="w-12 h-12 text-green mx-auto mb-4" />
                <h3 className="text-xl font-extrabold mb-2">Message received.</h3>
                <p className="text-grey-600 text-sm">We typically respond within 2–3 business days.</p>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-off-white p-8 rounded-sm border border-grey-200">
              <h3 className="font-extrabold mb-6">Direct Contact</h3>
              <div className="space-y-5">
                {[
                  { label: 'Email', value: 'hello@sduella.org' },
                  { label: 'Response Time', value: '2–3 business days' },
                  { label: 'Registered Office', value: 'Johannesburg, South Africa' },
                  { label: 'NPO Reference', value: 'Reg. 2024/NPO/01823' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-grey-400">{label}</span>
                    <span className="text-sm font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black text-white p-8 rounded-sm">
              <h3 className="font-extrabold mb-4">For Partnerships</h3>
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                Are you a company looking to create an education CSI fund or list a bursary on our platform? Let's build something meaningful together.
              </p>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold tracking-widest uppercase text-blue">Partnership Email</span>
                <span className="text-sm font-semibold">partners@sduella.org</span>
              </div>
            </div>

            <div className="bg-off-white p-8 rounded-sm border border-grey-200">
              <h3 className="font-extrabold mb-4">Follow our journey</h3>
              <div className="flex flex-wrap gap-2">
                {['LinkedIn', 'Instagram', 'X (Twitter)'].map(s => (
                  <a key={s} href="#"
                    className="px-4 py-2 border-1.5 border-grey-300 text-[11px] font-bold uppercase tracking-widest text-grey-600 rounded-sm hover:bg-black hover:text-white hover:border-black transition-all"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
