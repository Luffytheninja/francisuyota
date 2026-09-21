'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle, ArrowUpRight } from 'lucide-react';
import { trackContactSubmit } from '@/lib/analytics';
import type { ContactFormPayload } from '@/lib/types';

const PROJECT_TYPES = [
  'Narrative Film', 'Music Video', 'Documentary', 'Commercial',
  'Creative Direction', 'Photography', 'Other',
];

const SOCIAL_LINKS = [
  { label: 'Behance', href: 'https://www.behance.net/francisuyota' },
  { label: 'Instagram', href: 'https://www.instagram.com/francisxuyota/' },
  { label: 'Linkedin', href: 'https://www.linkedin.com/in/francisuyota' },
];

export default function ContactSection() {
  const [form, setForm] = useState<ContactFormPayload>({
    name: '', email: '', subject: '', message: '', budget: '', projectType: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        trackContactSubmit(form.projectType);
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again or email hello@uyota.film directly.');
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#8ECDE2] text-[#0B0D0C] py-20 sm:py-28 px-5 sm:px-8 lg:px-12 overflow-hidden select-none"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Top Header / Giant Title matching Wireframe */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-black tracking-[0.2em] uppercase text-[#0B0D0C]/70 mb-3">
              Direct Contact &amp; Commissions
            </p>
            <h2
              className="text-7xl sm:text-9xl md:text-[11rem] font-black text-white leading-[0.82] tracking-tight drop-shadow-sm"
              style={{ fontFamily: 'var(--font-encode-sans)' }}
            >
              Contact<br />
              <span className="text-[#0B0D0C]">Me</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="sm:text-right text-sm font-semibold text-[#0B0D0C]/80 space-y-1"
          >
            <p className="text-base font-black text-[#0B0D0C]">hello@uyota.film</p>
            <p>Ibadan Studio · Available Worldwide</p>
          </motion.div>
        </div>

        {/* ── Two-Column Layout ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Wireframe-Exact Bold Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between h-full"
          >
            <div className="flex flex-col gap-2 sm:gap-4 mb-8">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between py-2 border-b-2 border-[#0B0D0C]/20 hover:border-[#0B0D0C] transition-all"
                >
                  <span
                    className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0B0D0C] tracking-tight group-hover:translate-x-2 transition-transform duration-200"
                    style={{ fontFamily: 'var(--font-encode-sans)' }}
                  >
                    {label}
                  </span>
                  <ArrowUpRight className="w-7 h-7 text-[#0B0D0C] opacity-40 group-hover:opacity-100 group-hover:rotate-45 transition-all" />
                </a>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-[#50BF8E]/40 border-2 border-[#0B0D0C]/20 text-xs sm:text-sm font-medium text-[#0B0D0C] leading-relaxed">
              <span className="font-black uppercase tracking-wider block mb-1">
                ✦ Studio Availability:
              </span>
              Booking commercials, music videos, narrative features, and gallery exhibitions. Fast turnaround for global inquiries.
            </div>
          </motion.div>

          {/* Right Column: Contact Form with Wireframe Aesthetic */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 bg-[#0B0D0C] p-6 sm:p-10 rounded-3xl border-2 border-[#0B0D0C] shadow-[8px_8px_0px_#FFFAB3]"
          >
            {status === 'success' ? (
              <div className="flex flex-col items-start gap-4 p-6 rounded-2xl bg-[#50BF8E]/20 border border-[#50BF8E]/40 text-[#FFFAB3]">
                <div className="w-12 h-12 rounded-full bg-[#50BF8E] flex items-center justify-center">
                  <Check className="w-6 h-6 text-[#0B0D0C] stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white mb-1">Message Sent!</h3>
                  <p className="text-sm text-white/70">
                    Francis will review your inquiry and get back to you shortly.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setForm({ name: '', email: '', subject: '', message: '', budget: '', projectType: '' });
                  }}
                  className="text-xs font-bold uppercase tracking-widest text-[#50BF8E] hover:underline mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/10 border-2 border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#50BF8E] transition-colors text-sm font-semibold"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#50BF8E]/25 border-2 border-[#50BF8E]/40 text-white placeholder-white/50 focus:outline-none focus:border-[#50BF8E] transition-colors text-sm font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/10 border-2 border-white/15 text-white/90 focus:outline-none focus:border-[#50BF8E] transition-colors text-sm font-semibold cursor-pointer"
                  >
                    <option value="" disabled className="bg-[#0B0D0C] text-white">Project Type</option>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-[#0B0D0C] text-white">{t}</option>
                    ))}
                  </select>
                  <input
                    name="subject"
                    type="text"
                    placeholder="Subject / Project Name"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/10 border-2 border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#50BF8E] transition-colors text-sm font-semibold"
                  />
                </div>

                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project, location, and dates..."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#50BF8E]/25 border-2 border-[#50BF8E]/40 text-white placeholder-white/50 focus:outline-none focus:border-[#50BF8E] transition-colors text-sm font-semibold resize-none"
                />

                {status === 'error' && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/15 border border-red-500/40 text-red-300 text-xs">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {errorMsg}
                  </div>
                )}

                {/* Wireframe pale yellow Send Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-[#FFFAB3] hover:bg-white text-[#0B0D0C] font-black uppercase tracking-widest text-sm transition-all shadow-[4px_4px_0px_#50BF8E] active:shadow-none disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 fill-[#0B0D0C]" />
                      Send
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t-2 border-[#0B0D0C]/15 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-bold text-[#0B0D0C]/60">
          <span>© {new Date().getFullYear()} Francis Onabanjo · Francis Uyota. All rights reserved.</span>
          <span>Ibadan · Lagos · Worldwide</span>
        </div>
      </div>
    </section>
  );
}
