import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface AdminFABProps {
  onClick: () => void;
}

export default function AdminFAB({ onClick }: AdminFABProps) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      className="fixed bottom-8 right-8 z-40 bg-primary hover:bg-primary-hover text-white px-6 py-4 rounded-full shadow-fab hover:shadow-fab-hover flex items-center gap-3 font-semibold text-label tracking-wider uppercase transition-colors"
    >
      <Plus size={20} strokeWidth={2.5} />
      <span>Add Vehicle</span>
    </motion.button>
  );
}
