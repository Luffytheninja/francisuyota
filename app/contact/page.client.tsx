'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  Check,
  AlertCircle,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ArrowUpRight,
  Copy,
  CheckCheck,
  Film,
  Camera,
  Layers,
  Sliders,
  Tv,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { trackContactSubmit } from '@/lib/analytics';
import type { ContactFormPayload } from '@/lib/types';

const PROJECT_TYPES = [
  'Narrative Feature / Short',
  'Music Video',
  'Documentary',
  'Commercial / Brand Campaign',
  'Creative Direction',
  'Fashion / Editorial Photography',
  'Color Grading / Post-Production',
  'Other Inquiries',
];

const BUDGET_RANGES = [
  'Under $5,000 / ₦7.5M',
  '$5,000 – $15,000 / ₦7.5M – ₦25M',
  '$15,000 – $50,000 / ₦25M – ₦75M',
  '$50,000+ / ₦75M+',
  'Flexible / Open to discussion',
];

const SOCIAL_CHANNELS = [
  {
    name: 'Behance',
    handle: '@francisuyota',
    href: 'https://www.behance.net/francisuyota',
    desc: 'Portfolio & Visual Archives',
    color: '#0B0D0C',
    accent: '#50BF8E',
  },
  {
    name: 'Instagram',
    handle: '@francisxuyota',
    href: 'https://www.instagram.com/francisxuyota/',
    desc: 'Behind the Scenes & Stills',
    color: '#0B0D0C',
    accent: '#DFB143',
  },
  {
    name: 'LinkedIn',
    handle: 'francisuyota',
    href: 'https://www.linkedin.com/in/francisuyota',
    desc: 'Industry Network & Credits',
    color: '#0B0D0C',
    accent: '#8ECDE2',
  },
];

const WORKFLOW_STEPS = [
  {
    num: '01',
    title: 'Discovery & Brief',
    desc: 'We review your script, moodboard, or concept to define the scope, tone, and timeline.',
    icon: Film,
  },
  {
    num: '02',
    title: 'Visual Treatment',
    desc: 'Development of cinematic references, lighting schemes, lens packages, and shot lists.',
    icon: Sliders,
  },
  {
    num: '03',
    title: 'Production & Shoot',
    desc: 'Principal photography on ARRI / RED / 16mm systems with specialized cine optics.',
    icon: Camera,
  },
  {
    num: '04',
    title: 'Grade & Finish',
    desc: 'ACES color management in DaVinci Resolve, sound sync, master exports for cinema & web.',
    icon: Layers,
  },
];

export default function ContactPageClient() {
  const [form, setForm] = useState<ContactFormPayload>({
    name: '',
    email: '',
    subject: '',
    message: '',
    budget: '',
    projectType: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@uyota.film');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        trackContactSubmit(form.projectType || 'General');
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
    <div className="relative min-h-screen bg-[#FFFAB3] text-[#0B0D0C] overflow-hidden">
      {/* Film grain texture */}
      <div className="film-grain absolute inset-0 pointer-events-none opacity-20 z-0" />

      <Navbar
        onOpenShowreel={() => {}}
        onOpenArchive={() => {}}
        projectsCount={0}
      />

      {/* ── Page Hero ──────────────────────────────────────────────────────── */}
      <section className="relative z-10 pt-32 sm:pt-40 pb-12 sm:pb-16 px-5 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b-2 border-[#0B0D0C]/15"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-1 bg-[#50BF8E]" />
                <span className="text-xs font-black tracking-[0.2em] uppercase text-[#0B0D0C]/70">
                  Direct Inquiries &amp; Commissions
                </span>
              </div>
              <h1
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#0B0D0C] leading-[0.88] tracking-tight uppercase"
                style={{ fontFamily: 'var(--font-encode-sans)' }}
              >
                Let&apos;s Build<br />
                <span className="text-[#50BF8E]">Together.</span>
              </h1>
            </div>

            <div className="flex flex-col sm:items-end gap-3">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0D0C] text-[#FFFAB3] text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#50BF8E]" />
                <span>Open for {new Date().getFullYear()} Commissions</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#0B0D0C]/70">
                Ibadan Studio · Available Worldwide
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content Grid ──────────────────────────────────────────────── */}
      <section className="relative z-10 py-8 sm:py-12 px-5 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ── Left Column: Contact Details & Quick Links ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Direct Email Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0B0D0C] text-[#FFFAB3] border-2 border-black shadow-[6px_6px_0px_#50BF8E]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-widest text-[#50BF8E]">
                  Direct Email
                </span>
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[#FFFAB3] text-[11px] font-bold uppercase tracking-wider transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCheck className="w-3 h-3 text-[#50BF8E]" />
                      <span className="text-[#50BF8E]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <a
                href="mailto:hello@uyota.film"
                className="text-2xl sm:text-3xl font-black text-white hover:text-[#50BF8E] transition-colors block mb-2 break-all"
                style={{ fontFamily: 'var(--font-encode-sans)' }}
              >
                hello@uyota.film
              </a>
              <p className="text-xs text-white/60 leading-relaxed font-medium">
                For treatments, pitch decks, script reads, and general correspondence.
              </p>
            </div>

            {/* Studio Info Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/60 border-2 border-black/15 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#50BF8E] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#0B0D0C]" />
                </div>
                <div>
                  <h3
                    className="text-base font-black text-[#0B0D0C] uppercase tracking-wide"
                    style={{ fontFamily: 'var(--font-encode-sans)' }}
                  >
                    Studio Location
                  </h3>
                  <p className="text-xs text-[#0B0D0C]/70 mt-0.5">
                    Ibadan, Oyo State, Nigeria
                  </p>
                  <p className="text-xs font-semibold text-[#0B0D0C] mt-1">
                    Shoots available across Lagos, Abuja, London, and international locations.
                  </p>
                </div>
              </div>

              <div className="h-px bg-black/10 w-full" />

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#DFB143] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#0B0D0C]" />
                </div>
                <div>
                  <h3
                    className="text-base font-black text-[#0B0D0C] uppercase tracking-wide"
                    style={{ fontFamily: 'var(--font-encode-sans)' }}
                  >
                    Response Time
                  </h3>
                  <p className="text-xs text-[#0B0D0C]/70 mt-0.5">
                    Within 24 to 48 hours for new project inquiries.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#0B0D0C]/60 px-1">
                Social &amp; Archives
              </span>
              {SOCIAL_CHANNELS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group p-4 sm:p-5 rounded-2xl bg-white/60 border-2 border-black/15 hover:border-black hover:bg-[#0B0D0C] transition-all duration-200 flex items-center justify-between"
                >
                  <div>
                    <h4
                      className="text-lg font-black text-[#0B0D0C] group-hover:text-white transition-colors"
                      style={{ fontFamily: 'var(--font-encode-sans)' }}
                    >
                      {item.name}
                    </h4>
                    <span className="text-xs text-[#0B0D0C]/60 group-hover:text-white/60 transition-colors">
                      {item.desc}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-black/20 group-hover:border-white/30 flex items-center justify-center group-hover:bg-[#50BF8E] transition-all">
                    <ArrowUpRight className="w-4 h-4 text-[#0B0D0C] group-hover:text-black group-hover:rotate-45 transition-all" />
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Right Column: Interactive Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 bg-[#0B0D0C] p-6 sm:p-10 lg:p-12 rounded-3xl border-2 border-[#0B0D0C] shadow-[8px_8px_0px_#DFB143]"
          >
            <div className="mb-8">
              <span className="text-xs font-black uppercase tracking-widest text-[#50BF8E] block mb-1">
                Commission Form
              </span>
              <h2
                className="text-2xl sm:text-3xl font-black text-white tracking-tight"
                style={{ fontFamily: 'var(--font-encode-sans)' }}
              >
                Tell Us About Your Project
              </h2>
              <p className="text-xs sm:text-sm text-white/60 mt-1 font-medium">
                Fill out the brief below and we will get back to you with availability and next steps.
              </p>
            </div>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-start gap-4 p-8 rounded-2xl bg-[#50BF8E]/15 border-2 border-[#50BF8E]/40 text-[#FFFAB3]"
              >
                <div className="w-14 h-14 rounded-full bg-[#50BF8E] flex items-center justify-center">
                  <Check className="w-7 h-7 text-[#0B0D0C] stroke-[3]" />
                </div>
                <div>
                  <h3
                    className="text-2xl font-black text-white mb-1.5"
                    style={{ fontFamily: 'var(--font-encode-sans)' }}
                  >
                    Brief Received!
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed max-w-md">
                    Thank you for reaching out. Francis and the studio team will review your project details and follow up within 24–48 hours.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setForm({
                      name: '',
                      email: '',
                      subject: '',
                      message: '',
                      budget: '',
                      projectType: '',
                    });
                  }}
                  className="mt-4 px-6 py-3 rounded-full bg-[#50BF8E] text-[#0B0D0C] text-xs font-black uppercase tracking-widest hover:bg-[#3DA376] transition-colors shadow-md"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-white/70 mb-1.5">
                      Your Name <span className="text-[#50BF8E]">*</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Tunde Adeyemi"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/10 border-2 border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#50BF8E] transition-colors text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-white/70 mb-1.5">
                      Email Address <span className="text-[#50BF8E]">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="e.g. tunde@company.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/10 border-2 border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#50BF8E] transition-colors text-sm font-semibold"
                    />
                  </div>
                </div>

                {/* Project Type & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-white/70 mb-1.5">
                      Project Type
                    </label>
                    <select
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#1A1D1B] border-2 border-white/15 text-white focus:outline-none focus:border-[#50BF8E] transition-colors text-sm font-semibold cursor-pointer"
                    >
                      <option value="" disabled className="bg-[#0B0D0C] text-white">
                        Select Project Type
                      </option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t} className="bg-[#0B0D0C] text-white">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-white/70 mb-1.5">
                      Estimated Budget
                    </label>
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#1A1D1B] border-2 border-white/15 text-white focus:outline-none focus:border-[#50BF8E] transition-colors text-sm font-semibold cursor-pointer"
                    >
                      <option value="" disabled className="bg-[#0B0D0C] text-white">
                        Select Budget Range
                      </option>
                      {BUDGET_RANGES.map((b) => (
                        <option key={b} value={b} className="bg-[#0B0D0C] text-white">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject / Working Title */}
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-white/70 mb-1.5">
                    Subject / Working Title
                  </label>
                  <input
                    name="subject"
                    type="text"
                    placeholder="e.g. Commercial Shoot — Q3 Brand Campaign"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/10 border-2 border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#50BF8E] transition-colors text-sm font-semibold"
                  />
                </div>

                {/* Message / Brief */}
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-white/70 mb-1.5">
                    Project Brief &amp; Details <span className="text-[#50BF8E]">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe your vision, target dates, locations, reference films/moodboards, and any specific camera or technical requirements..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/10 border-2 border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#50BF8E] transition-colors text-sm font-semibold resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Submit button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-2 flex items-center justify-center gap-2 w-full py-4 rounded-full bg-[#FFFAB3] hover:bg-white text-[#0B0D0C] font-black uppercase tracking-widest text-sm transition-all shadow-[4px_4px_0px_#50BF8E] active:shadow-none disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 fill-[#0B0D0C]" />
                      <span>Submit Commission Brief</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Collaboration Process / Workflow ───────────────────────────────── */}
      <section className="relative z-10 py-16 sm:py-20 px-5 sm:px-8 lg:px-12 bg-[#0B0D0C] text-[#FFFAB3] mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-[#50BF8E] block mb-2">
              Our Process
            </span>
            <h2
              className="text-3xl sm:text-5xl font-black text-white tracking-tight"
              style={{ fontFamily: 'var(--font-encode-sans)' }}
            >
              How We Bring Your Vision To Life
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKFLOW_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-[#50BF8E] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-[#50BF8E]">
                        {step.num}
                      </span>
                      <Icon className="w-5 h-5 text-[#FFFAB3]/60" />
                    </div>
                    <h3
                      className="text-lg font-black text-white mb-2"
                      style={{ fontFamily: 'var(--font-encode-sans)' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="relative z-10 py-8 px-5 sm:px-8 lg:px-12 bg-[#FFFAB3] border-t-2 border-black/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-[#0B0D0C]/70">
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-[#50BF8E] transition-colors">
              ← Back to Uyota Verse
            </Link>
            <Link href="/services" className="hover:text-[#50BF8E] transition-colors">
              Services &amp; Studio
            </Link>
          </div>
          <span>
            © {new Date().getFullYear()} Francis Onabanjo · Francis Uyota. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
