import { motion } from 'framer-motion';
import { Calendar } from './ui/calendar';
import { Mail, Phone, ArrowUpRight, Clock, MapPin } from 'lucide-react';

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 max-w-4xl mx-auto px-6 text-center">
      <div className="glass-panel p-8 md:p-20 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-white/[0.01]">
        <h3 className="text-2xl md:text-4xl font-instrument italic mb-4 md:mb-6">
          "Building digital platforms that define industry standards."
        </h3>
        <p className="text-gray-400 font-light tracking-wide text-sm md:text-base">— Corporate Client Roster Curated Selectively.</p>
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section id="contact" className="py-16 md:py-40 bg-transparent relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-4 md:mb-6">
            <span className="w-8 md:w-12 h-[1px] bg-emerald-500/50 block"></span>
            <span className="text-emerald-400 font-medium tracking-widest text-xs md:text-sm uppercase">Let's Connect</span>
          </div>
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-instrument italic leading-none mb-6 md:mb-8">
            Ready to define your <br className="hidden md:block" /> digital legacy?
          </h2>
          <p className="text-gray-400 font-light text-base md:text-lg max-w-2xl leading-relaxed">
            Scale your business with uncompromising technical infrastructure and world-class design.
            Book a free 30-minute strategy session below.
          </p>
        </motion.div>

        {/* Two Column: Contact Info + Calendar */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20">

          {/* Left: Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-between"
          >
            {/* Contact Cards */}
            <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
              <a
                href="tel:+917667261838"
                className="group flex items-center gap-4 md:gap-6 p-4 md:p-6 glass-panel rounded-xl md:rounded-2xl border border-white/5 bg-white/[0.02] hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mb-1">Direct Line</p>
                  <p className="text-base md:text-xl font-instrument italic text-white group-hover:text-emerald-100 transition-colors">Tap to Call Us</p>
                </div>
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-gray-600 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
              </a>

              <a
                href="mailto:hiee.seno@gmail.com"
                className="group flex items-center gap-4 md:gap-6 p-4 md:p-6 glass-panel rounded-xl md:rounded-2xl border border-white/5 bg-white/[0.02] hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mb-1">Email Us</p>
                  <p className="text-base md:text-xl font-instrument italic text-white group-hover:text-emerald-100 transition-colors truncate">Tap to Email Us</p>
                </div>
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-gray-600 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
              </a>

              <div className="flex items-center gap-4 md:gap-6 p-4 md:p-6 glass-panel rounded-xl md:rounded-2xl border border-white/5 bg-white/[0.02]">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mb-1">Headquarters</p>
                  <p className="text-base md:text-xl font-instrument italic text-white">India — Serving Worldwide</p>
                </div>
              </div>
            </div>

            {/* Availability Badge */}
            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-400">
              <div className="relative flex items-center justify-center">
                <span className="absolute w-3 h-3 rounded-full bg-emerald-500 animate-ping opacity-50"></span>
                <span className="relative w-3 h-3 rounded-full bg-emerald-500"></span>
              </div>
              <span className="text-emerald-400 font-medium">Currently accepting projects</span>
              <span className="text-gray-600 hidden sm:inline">•</span>
              <span className="hidden sm:flex items-center gap-1"><Clock className="w-3 h-3" /> ~24hr response</span>
            </div>
          </motion.div>

          {/* Right: Calendar Booking */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="glass-panel rounded-[1.5rem] md:rounded-[2rem] border border-white/10 bg-white/[0.02] p-5 md:p-8 flex-grow">
              <div className="mb-6 md:mb-8">
                <h3 className="text-xl md:text-3xl font-instrument italic mb-2 md:mb-3 text-white">
                  Schedule a Strategy Call
                </h3>
                <p className="text-gray-400 font-light text-xs md:text-sm leading-relaxed">
                  Pick a date and time. We'll discuss your project goals,
                  timeline, and deliver a custom proposal within 48 hours.
                </p>
              </div>

              <Calendar />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
