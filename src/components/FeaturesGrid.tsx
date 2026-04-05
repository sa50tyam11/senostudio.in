import React from 'react';
import { Card } from './ui/Card';
import { Zap, Layers, Smartphone, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { TiltCard } from './ui/TiltCard';

export function FeaturesGrid() {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-white mb-4 opacity-80" />,
      title: 'Fast Delivery',
      desc: 'Get your website ready in days, not weeks.'
    },
    {
      icon: <Layers className="w-6 h-6 text-white mb-4 opacity-80" />,
      title: 'Full-Stack Expertise',
      desc: 'Complete development solution in one place.'
    },
    {
      icon: <Smartphone className="w-6 h-6 text-white mb-4 opacity-80" />,
      title: 'Fully Responsive',
      desc: 'Optimized for all devices and screen sizes.'
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-white mb-4 opacity-80" />,
      title: 'Dedicated Support',
      desc: 'Direct communication and ongoing support.'
    }
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, type: 'spring', stiffness: 100 }}
          >
            <TiltCard className="h-full">
              <Card className="h-full flex flex-col p-8 bg-white/[0.02]">
                <div className="transform preserve-3d">
                  {feature.icon}
                  <h4 className="text-xl font-instrument italic mb-2 tracking-wide translate-z-[20px] shadow-sm">{feature.title}</h4>
                  <p className="text-sm text-gray-400 font-light translate-z-[30px]">{feature.desc}</p>
                </div>
              </Card>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
