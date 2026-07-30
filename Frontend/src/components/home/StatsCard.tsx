import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatsCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
}

export default function StatsCard({
  icon: Icon,
  label,
  value,
  prefix = '',
  suffix = '',
  delay = 0,
}: StatsCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1200; // ms
    const frameTime = 20; // 50fps
    const totalFrames = duration / frameTime;
    const increment = value / totalFrames;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, frameTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  const formattedValue =
    value > 99999
      ? `${prefix}${(displayValue / 1000).toFixed(0)}k${suffix}`
      : `${prefix}${displayValue.toLocaleString()}${suffix}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="bg-surface rounded-card p-6 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 flex items-center gap-5 group"
    >
      <div className="w-14 h-14 rounded-2xl bg-background flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-inner">
        <Icon size={26} strokeWidth={1.8} />
      </div>

      <div className="flex flex-col">
        <span className="text-display-sm font-bold text-text tracking-tight font-sans">
          {formattedValue}
        </span>
        <span className="text-caption text-text-muted uppercase tracking-wider font-semibold">
          {label}
        </span>
      </div>
    </motion.div>
  );
}
