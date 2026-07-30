import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Award, Sparkles } from 'lucide-react';

export default function AboutSection() {
  const highlights = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: 'Verified Fleet Integrity',
      description: 'Every vehicle in our catalog undergoes rigorous multi-point inspection and real-time status validation.',
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: 'Instant Inventory Sync',
      description: 'Connected directly to live database systems for instant availability tracking and zero-latency updates.',
    },
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      title: 'Curated Luxury Marques',
      description: 'Featuring premier electric, hybrid, and performance sports vehicles from Tesla, Porsche, Mercedes, and BMW.',
    },
  ];

  return (
    <section id="about-section" className="py-20 bg-surface/50 border-y border-border/60 relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-label text-primary uppercase tracking-widest flex items-center gap-2 mb-2 font-bold">
            <Sparkles size={14} /> About Gadiwalla
          </span>
          <h2 className="text-display-md font-bold text-text tracking-tight mb-4">
            Engineering Luxury Mobility & Intelligent Fleet Control
          </h2>
          <p className="text-body-lg text-text-secondary leading-relaxed">
            Gadiwalla is a next-generation automotive inventory platform designed to provide seamless transparency, real-time availability management, and premier dealership experiences.
          </p>
        </div>

        {/* Highlight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface rounded-card p-8 border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-heading-sm font-bold text-text mb-3">
                  {item.title}
                </h3>
                <p className="text-body-sm text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
