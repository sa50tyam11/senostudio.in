import { motion } from 'framer-motion';
import { Code2, Palette, Rocket, Globe, ArrowUpRight } from 'lucide-react';

const services = [
  {
    num: '01',
    icon: <Palette className="w-6 h-6" />,
    title: 'UI/UX Design',
    desc: 'Immersive interfaces built on conversion psychology and luxury-grade aesthetics. We don\'t follow design trends — we set them.',
    tags: ['Figma', 'Prototyping', 'Design Systems'],
  },
  {
    num: '02',
    icon: <Code2 className="w-6 h-6" />,
    title: 'Full-Stack Development',
    desc: 'Robust, scalable applications engineered with React, Next.js, Node, and modern cloud infrastructure. Fast, secure, and future-proof.',
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript'],
  },
  {
    num: '03',
    icon: <Rocket className="w-6 h-6" />,
    title: 'Deployment & DevOps',
    desc: 'Zero-downtime deployments, CI/CD pipelines, and global CDN configuration. We handle the infrastructure so you focus on growth.',
    tags: ['AWS', 'Vercel', 'CI/CD', 'Docker'],
  },
  {
    num: '04',
    icon: <Globe className="w-6 h-6" />,
    title: 'Strategy & Consulting',
    desc: 'Technical auditing, architecture planning, and performance optimization. We turn underperforming platforms into revenue engines.',
    tags: ['SEO', 'Performance', 'Analytics'],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-40 bg-transparent relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-28"
        >
          <div className="flex items-center gap-4 mb-4 md:mb-6">
            <span className="w-8 md:w-12 h-[1px] bg-emerald-500/50 block"></span>
            <span className="text-emerald-400 font-medium tracking-widest text-xs md:text-sm uppercase">What We Do</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-instrument italic leading-[0.95] mb-6">
            Engineered for dominance. <br className="hidden md:block" /> Designed for impact.
          </h2>
          <p className="text-gray-400 font-light text-base md:text-lg max-w-2xl leading-relaxed">
            We deliver end-to-end digital solutions — from initial strategy through deployment and beyond. Every service is executed with uncompromising precision.
          </p>
        </motion.div>

        {/* Services List */}
        <div className="flex flex-col">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: idx * 0.08, duration: 0.7 }}
              className="group relative border-t border-white/[0.06] hover:border-emerald-500/30 transition-colors duration-500"
            >
              {/* Hover line that expands */}
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-emerald-400 group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-10" />

              <div className="py-10 md:py-14 grid grid-cols-12 gap-4 md:gap-8 items-start md:items-center">
                {/* Number */}
                <div className="col-span-2 md:col-span-1">
                  <span className="text-emerald-500/40 group-hover:text-emerald-400 font-instrument italic text-2xl md:text-3xl transition-colors duration-300">
                    {service.num}
                  </span>
                </div>

                {/* Icon + Title */}
                <div className="col-span-10 md:col-span-3 flex items-center gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-gray-400 group-hover:text-emerald-400 group-hover:border-emerald-500/20 group-hover:bg-emerald-500/5 transition-all duration-300 flex-shrink-0">
                    {service.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-instrument italic text-white group-hover:text-emerald-50 transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="col-span-12 md:col-span-6 md:pl-4">
                  <p className="text-gray-500 group-hover:text-gray-400 text-sm md:text-base leading-relaxed font-light transition-colors duration-300 mb-3 md:mb-0">
                    {service.desc}
                  </p>
                  {/* Tags — mobile only below text, desktop inline */}
                  <div className="flex flex-wrap gap-2 mt-3 md:mt-3">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] md:text-xs text-gray-600 group-hover:text-emerald-400/60 border border-white/5 group-hover:border-emerald-500/15 rounded-full px-3 py-1 transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex col-span-2 justify-end">
                  <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-gray-600 group-hover:border-emerald-500/30 group-hover:text-emerald-400 group-hover:bg-emerald-500/5 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
