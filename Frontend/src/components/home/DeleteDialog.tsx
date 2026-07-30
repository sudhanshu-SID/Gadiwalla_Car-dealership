import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Loader2 } from 'lucide-react';
import type { Vehicle } from './VehicleCard';

interface DeleteDialogProps {
  isOpen: boolean;
  vehicle: Vehicle | null;
  onClose: () => void;
  onConfirm: (vehicleId: string | number) => void;
  isLoading?: boolean;
}

export default function DeleteDialog({
  isOpen,
  vehicle,
  onClose,
  onConfirm,
  isLoading = false,
}: DeleteDialogProps) {
  if (!vehicle) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-surface z-50 rounded-card p-6 md:p-8 shadow-modal border border-border space-y-6"
          >
            {/* Warning Icon */}
            <div className="w-12 h-12 rounded-2xl bg-error/10 text-error flex items-center justify-center">
              <AlertTriangle size={24} />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="text-heading-sm font-bold text-text">
                Delete Vehicle?
              </h3>
              <p className="text-body-sm text-text-secondary leading-relaxed">
                Are you sure you want to delete{' '}
                <span className="font-semibold text-text">
                  {vehicle.brand} {vehicle.model}
                </span>
                ? This action cannot be undone and will permanently remove it from inventory.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-border-light">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-5 py-2.5 rounded-button border border-border hover:bg-background text-text-secondary hover:text-text text-label font-semibold uppercase transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => onConfirm(vehicle.id)}
                disabled={isLoading}
                className="px-6 py-2.5 rounded-button bg-error hover:bg-red-600 text-white text-label font-semibold tracking-wider uppercase transition-all shadow-sm active:scale-95 disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
