import { AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = 'Failed to load inventory',
  message = 'We encountered an error connecting to the vehicle database. Please ensure the backend server is running.',
  onRetry,
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-surface rounded-card p-12 md:p-16 border border-border shadow-card text-center flex flex-col items-center justify-center max-w-2xl mx-auto my-12"
    >
      <div className="w-16 h-16 rounded-full bg-error/10 text-error flex items-center justify-center mb-6">
        <AlertCircle size={32} strokeWidth={1.8} />
      </div>

      <h3 className="text-heading-sm font-semibold text-text mb-2">
        {title}
      </h3>

      <p className="text-body-sm text-text-secondary max-w-md mb-8 leading-relaxed">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white text-label font-semibold rounded-button transition-all duration-200 shadow-sm active:scale-95"
        >
          <RefreshCw size={16} />
          <span>Retry Connection</span>
        </button>
      )}
    </motion.div>
  );
}
