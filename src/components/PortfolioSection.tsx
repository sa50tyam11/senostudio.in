import React from 'react';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react'; 

export function PortfolioSection() {
  const projects = [
    {
      id: '01',
      title: 'Soft Campus',
      category: 'Education Platform',
      desc: 'Global educational platform operating across India, Russia, USA, and Armenia. Orchestrated with robust global cloud deployment.',
      deliverables: ['Technical Architecture', 'Custom Web Application', 'AWS Deployment'],
      img: '/soft-campus.png',
      link: '#'
    },
    {
      id: '02',
      title: 'Discord Community Site',
      category: 'Member Portal',
      desc: 'High-performance interactive portal developed specifically for a 100+ member custom server community to streamline analytics and access.',
      deliverables: ['UI/UX Redesign', 'React Development', 'Role Auth Integration'],
      img: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=2874&auto=format&fit=crop',
      link: '#' // User manually adds live link here
    },
    {
      id: '03',
      title: 'Bangle Store',
      category: 'Premium E-Commerce',
      desc: 'High-conversion e-commerce architecture tailored for a luxury jewelry brand with dynamic inventory sync and 3D rendering.',
      deliverables: ['Next.js Framework', 'Stripe Integration', '3D Product Rendering'],
      img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2940&auto=format&fit=crop',
      link: '#'
    }
  ];

  return (
    <section id="work" className="py-24 md:py-40 relative border-t border-white/5 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10"
        >
          <div>
            <h2 className="text-6xl md:text-8xl font-instrument italic leading-none mb-4">Selected <br className="hidden md:block" /> Work.</h2>
            <p className="text-gray-400 font-light max-w-sm text-lg">A curated showcase of high-end digital solutions engineered by our core team.</p>
          </div>
          <Button variant="glass" className="hidden md:flex items-center gap-2 border-white/10 px-8 py-6 rounded-full">
            View Archive <ArrowUpRight className="w-4 h-4" />
          </Button>
        </motion.div>

        <div className="flex flex-col gap-32 md:gap-48 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 z-0 hidden md:block" />

          {projects.map((project, idx) => {
            const isEven = idx % 2 !== 0; // Alternating layout
            
            return (
              <ProjectCaseStudy 
                key={project.id} 
                project={project} 
                isEven={isEven} 
              />
            );
          })}
        </div>
        
        <div className="mt-24 text-center block md:hidden relative z-10">
            <Button variant="glass" className="w-full text-sm uppercase tracking-widest text-[#a1a1aa] hover:text-white border-white/10 py-4">View Full Archive</Button>
        </div>
      </div>
    </section>
  );
}

function ProjectCaseStudy({ project, isEven }: { project: any, isEven: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8 }}
      className={`relative z-10 flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 md:gap-20 items-center`}
    >
      {/* Huge Background Master Number */}
      <div className={`absolute top-0 md:-top-32 ${isEven ? 'right-0 md:-right-10' : 'left-0 md:-left-10'} text-[12rem] md:text-[24rem] font-instrument italic leading-none text-white/[0.03] pointer-events-none z-[-1] font-bold select-none`}>
        {project.id}
      </div>

      {/* Image Panel (65%) */}
      <div className="w-full md:w-[65%] group">
        <div className="glass-panel overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-md p-2">
          <div className="relative h-[350px] md:h-[600px] rounded-[1.5rem] overflow-hidden bg-black">
            <motion.div 
              className="absolute inset-0 bg-emerald-500/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
            <img 
              src={project.img} 
              alt={project.title}
              className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
            
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="absolute bottom-6 right-6 z-20 bg-white text-black w-14 h-14 rounded-full flex gap-2 items-center justify-center opacity-100 md:opacity-0 transform md:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-emerald-100 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Content Panel (35%) */}
      <div className={`w-full md:w-[35%] flex flex-col ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} justify-center`}>
        <div className={`flex items-center gap-3 mb-6 mix-blend-screen text-emerald-400 w-full ${isEven ? 'justify-start md:justify-end' : 'justify-start'}`}>
           {!isEven && <span className="w-12 h-[1px] bg-emerald-500/50" />}
           <span className="uppercase tracking-widest text-xs font-semibold">{project.category}</span>
           {isEven && <span className="w-12 h-[1px] bg-emerald-500/50 hidden md:block" />}
        </div>
        
        <h3 className="text-4xl md:text-5xl font-instrument italic mb-6 leading-tight text-white">{project.title}</h3>
        <p className="text-gray-400 font-light text-base md:text-lg mb-10 leading-relaxed">
          {project.desc}
        </p>

        <div className="flex flex-col gap-4 w-full">
          <h4 className={`text-white tracking-widest uppercase text-xs font-semibold mb-2 flex items-center gap-2 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
             Deliverables
          </h4>
          <div className={`flex flex-col gap-3 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
            {project.deliverables.map((item: string, i: number) => (
              <div key={i} className="flex items-center gap-3 text-sm text-gray-400 glass-panel border border-white/5 bg-white/[0.02] px-4 py-2 rounded-full font-light">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
