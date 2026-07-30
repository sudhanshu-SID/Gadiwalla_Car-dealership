import { motion } from 'framer-motion';
import { Sparkles, ChevronRight } from 'lucide-react';

interface HeroProps {
  onBrowseClick?: () => void;
}

export default function Hero({ onBrowseClick }: HeroProps) {
  const scrollToInventory = () => {
    if (onBrowseClick) {
      onBrowseClick();
    } else {
      const element = document.getElementById('inventory-section');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[55vh] min-h-[460px] max-h-[600px] w-full flex items-center justify-center pt-20 overflow-hidden bg-secondary">
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-[#1e1e1e] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-6">
        {/* Subtitle Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-caption tracking-[0.2em] uppercase backdrop-blur-md"
        >
          <Sparkles size={13} className="text-primary" />
          <span>Gadiwalla Fleet Platform</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-display-sm md:text-display font-bold text-white tracking-tight max-w-3xl leading-tight"
        >
          Premium Vehicle <span className="text-primary">Inventory</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-body-lg text-white/70 max-w-xl font-normal leading-relaxed"
        >
          Manage and explore dealership inventory with speed, precision, and elegance.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-2"
        >
          <button
            onClick={scrollToInventory}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-button bg-primary hover:bg-primary-hover text-white text-label font-semibold tracking-wider uppercase shadow-fab hover:shadow-fab-hover transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>Explore Inventory</span>
            <ChevronRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>

      {/* Scroll Line Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="w-[1px] h-10 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-line" />
        </div>
      </div>
    </section>
  );
}
