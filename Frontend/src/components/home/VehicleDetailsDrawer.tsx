import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Gauge, Share2, Edit2, Trash2 } from 'lucide-react';
import type { Vehicle } from './VehicleCard';

interface VehicleDrawerProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
  onEdit?: (vehicle: Vehicle) => void;
  onDelete?: (vehicle: Vehicle) => void;
}

export default function VehicleDetailsDrawer({
  vehicle,
  isOpen,
  onClose,
  isAdmin = true, // default true for boilerplate demo
  onEdit,
  onDelete,
}: VehicleDrawerProps) {
  if (!vehicle) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Slide-In Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-full max-w-xl bg-surface z-50 shadow-drawer flex flex-col justify-between overflow-hidden"
          >
            {/* Header Sticky */}
            <div className="p-6 border-b border-border flex items-center justify-between bg-surface/90 backdrop-blur-md sticky top-0 z-10">
              <div>
                <span className="text-caption text-primary font-bold uppercase tracking-widest block">
                  {vehicle.brand}
                </span>
                <h2 className="text-heading-sm font-bold text-text font-sans">
                  {vehicle.model}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-background hover:bg-border-light flex items-center justify-center text-text-secondary hover:text-text transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Large Image */}
              <div className="w-full h-72 rounded-card overflow-hidden bg-background relative border border-border shadow-card">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-badge text-caption font-bold uppercase tracking-wider bg-black/60 text-white border border-white/20 backdrop-blur-md">
                    {vehicle.status}
                  </span>
                </div>
              </div>

              {/* Price & Primary Specs */}
              <div className="flex items-baseline justify-between pt-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-display-sm font-bold text-text font-sans">
                    ${vehicle.price.toLocaleString()}
                  </span>
                  <span className="text-body-sm text-text-muted font-normal">MSRP</span>
                </div>
                <div className="flex items-center gap-4 text-body-sm text-text-secondary">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={16} className="text-text-muted" />
                    <span>{vehicle.year}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Gauge size={16} className="text-text-muted" />
                    <span>{vehicle.mileage.toLocaleString()} mi</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {vehicle.description && (
                <div className="space-y-2 pt-2 border-t border-border-light">
                  <h4 className="text-label text-text uppercase tracking-widest">
                    Overview
                  </h4>
                  <p className="text-body-sm text-text-secondary leading-relaxed">
                    {vehicle.description}
                  </p>
                </div>
              )}

              {/* Technical Specifications Grid */}
              <div className="space-y-3 pt-2 border-t border-border-light">
                <h4 className="text-label text-primary uppercase tracking-widest">
                  Specifications
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {vehicle.specs?.map((spec, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-background rounded-button border border-border-light flex flex-col gap-0.5"
                    >
                      <span className="text-caption text-text-muted uppercase font-semibold">
                        {spec.label}
                      </span>
                      <span className="text-body-sm font-bold text-text">
                        {spec.value}
                      </span>
                    </div>
                  )) || (
                    <>
                      <div className="p-3.5 bg-background rounded-button border border-border-light flex flex-col gap-0.5">
                        <span className="text-caption text-text-muted uppercase font-semibold">
                          Fuel Type
                        </span>
                        <span className="text-body-sm font-bold text-text">
                          {vehicle.fuelType || 'Electric'}
                        </span>
                      </div>
                      <div className="p-3.5 bg-background rounded-button border border-border-light flex flex-col gap-0.5">
                        <span className="text-caption text-text-muted uppercase font-semibold">
                          Transmission
                        </span>
                        <span className="text-body-sm font-bold text-text">
                          {vehicle.transmission || 'Automatic'}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Admin Actions Bar (if Admin) */}
              {isAdmin && (
                <div className="p-4 bg-secondary/5 rounded-button border border-secondary/10 space-y-3">
                  <span className="text-caption text-text-muted font-bold uppercase tracking-wider block">
                    Admin Inventory Controls
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onEdit?.(vehicle)}
                      className="flex-1 py-2.5 px-4 rounded-button bg-secondary hover:bg-text text-white text-body-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
                    >
                      <Edit2 size={15} />
                      <span>Edit Vehicle</span>
                    </button>
                    <button
                      onClick={() => onDelete?.(vehicle)}
                      className="py-2.5 px-4 rounded-button bg-error/10 hover:bg-error text-error hover:text-white text-body-sm font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      <Trash2 size={15} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Action Footer */}
            <div className="p-6 border-t border-border bg-surface flex items-center gap-4">
              <button className="flex-1 py-4 rounded-button bg-primary hover:bg-primary-hover text-white text-label font-semibold tracking-wider uppercase transition-all shadow-fab hover:shadow-fab-hover active:scale-98">
                Vehicle Details
              </button>
              <button className="p-4 rounded-button bg-background hover:bg-border-light text-text-secondary hover:text-text border border-border transition-all">
                <Share2 size={18} />
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
