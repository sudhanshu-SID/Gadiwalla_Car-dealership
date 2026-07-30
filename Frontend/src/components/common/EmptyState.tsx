import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
}

export default function EmptyState({
  title = 'No vehicles found',
  description = 'Try adjusting your search criteria or resetting filters to explore available inventory.',
  onReset,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-surface rounded-card p-12 md:p-16 border border-border shadow-card text-center flex flex-col items-center justify-center max-w-2xl mx-auto my-12"
    >
      <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center text-text-muted mb-6 shadow-inner">
        <SearchX size={32} strokeWidth={1.5} />
      </div>

      <h3 className="text-heading-sm font-semibold text-text mb-2">
        {title}
      </h3>

      <p className="text-body-sm text-text-secondary max-w-md mb-8 leading-relaxed">
        {description}
      </p>

      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-text text-white text-label rounded-button transition-all duration-200 shadow-sm active:scale-95"
        >
          <RotateCcw size={16} />
          <span>Reset All Filters</span>
        </button>
      )}
    </motion.div>
  );
}
