'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, ArrowUpRight } from 'lucide-react';

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Commercial / Branded Film',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="w-full bg-[#6EB3C6] text-[#141716] pt-20 pb-16 px-4 sm:px-8 lg:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid: Left Socials/Links, Right Massive "Contact Me" matching wireframe */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Social Links matching Wireframe */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
            <div className="flex flex-col gap-3 sm:gap-4 text-3xl sm:text-5xl md:text-6xl font-black font-display-title">
              <a
                href="https://behance.net"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between py-2 border-b border-black/15 text-[#141716] hover:text-white transition-colors"
              >
                <span>Behance</span>
                <ArrowUpRight className="w-7 h-7 sm:w-8 sm:h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between py-2 border-b border-black/15 text-[#141716] hover:text-white transition-colors"
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-7 h-7 sm:w-8 sm:h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between py-2 border-b border-black/15 text-[#141716] hover:text-white transition-colors"
              >
                <span>Linkedin</span>
                <ArrowUpRight className="w-7 h-7 sm:w-8 sm:h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Massive "Contact Me" matching Wireframe */}
          <div className="lg:col-span-7 flex flex-col items-start lg:items-end text-left lg:text-right order-1 lg:order-2">
            <h2 className="text-7xl sm:text-9xl md:text-[10rem] lg:text-[12rem] font-black text-white leading-[0.85] tracking-tight font-display-title">
              Contact<br />Me
            </h2>
          </div>
        </div>

        {/* Project Enquiry Form Box */}
        <div className="mt-16 p-6 sm:p-10 bg-[#141716] text-white rounded-2xl shadow-2xl">
          <div className="max-w-2xl mx-auto">
            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#D4F88D] text-black flex items-center justify-center mb-3">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-black text-white font-display-title">
                  Message Sent
                </h3>
                <p className="text-sm font-light text-white/80 mt-1 font-editorial-body">
                  Thank you! We will get back to you shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 px-5 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 text-xs font-bold uppercase tracking-wider"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/50 focus:outline-none focus:border-[#D4F88D] text-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/50 focus:outline-none focus:border-[#D4F88D] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    rows={3}
                    required
                    placeholder="Project details & timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/50 focus:outline-none focus:border-[#D4F88D] text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#D4F88D] hover:bg-[#c4ec7b] text-black font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Enquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom subtle copyright */}
        <div className="mt-12 text-center text-xs text-[#141716]/60">
          <p>© 2026 UYOTA. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}
