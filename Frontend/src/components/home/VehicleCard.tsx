import { motion } from 'framer-motion';
import { ChevronRight, Gauge, Calendar, ShoppingBag, Loader2 } from 'lucide-react';

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  price: number;
  quantity?: number;
  mileage: number;
  image: string;
  status: 'AVAILABLE' | 'RESERVED' | 'SOLD';
  fuelType?: string;
  transmission?: string;
  description?: string;
  specs?: { label: string; value: string }[];
}

interface VehicleCardProps {
  vehicle: Vehicle;
  onViewDetails: (vehicle: Vehicle) => void;
  onPurchase?: (vehicle: Vehicle) => void;
  isPurchasing?: boolean;
  isAuthenticated?: boolean;
  isAdmin?: boolean;
  index?: number;
}

export default function VehicleCard({
  vehicle,
  onViewDetails,
  onPurchase,
  isPurchasing = false,
  isAuthenticated = false,
  isAdmin = false,
  index = 0,
}: VehicleCardProps) {
  const isSold = vehicle.status === 'SOLD';

  const getStatusColor = (status: Vehicle['status']) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'RESERVED':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'SOLD':
        return 'bg-rose-500/10 text-rose-600 border-rose-500/20';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      onClick={() => onViewDetails(vehicle)}
      className="group cursor-pointer bg-surface rounded-card p-4 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Image Container with Zoom */}
        <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-background mb-4">
          <img
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`px-3 py-1 rounded-badge text-[11px] font-semibold uppercase tracking-wider border backdrop-blur-md ${getStatusColor(
                vehicle.status
              )}`}
            >
              {vehicle.status}
            </span>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 rounded-badge text-[11px] font-medium bg-black/40 text-white/90 border border-white/10 backdrop-blur-md uppercase tracking-wider">
              {vehicle.category}
            </span>
          </div>
        </div>

        {/* Vehicle Header Info */}
        <div className="flex justify-between items-start mb-2 px-1">
          <div>
            <span className="text-caption text-primary font-bold uppercase tracking-widest block mb-0.5">
              {vehicle.brand}
            </span>
            <h3 className="text-heading-sm font-semibold text-text group-hover:text-primary transition-colors">
              {vehicle.model}
            </h3>
          </div>
          <span className="text-heading-sm font-bold text-text font-sans">
            ${vehicle.price.toLocaleString()}
          </span>
        </div>

        {/* Spec Highlights Grid */}
        <div className="grid grid-cols-2 gap-2 py-3 border-y border-border-light my-3 text-body-sm text-text-secondary px-1">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-text-muted" />
            <span>{vehicle.year}</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <Gauge size={14} className="text-text-muted" />
            <span>{vehicle.mileage.toLocaleString()} mi</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 px-1 flex items-center justify-between gap-2 border-t border-border/50">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(vehicle);
          }}
          className="inline-flex items-center gap-1 text-label text-text-muted hover:text-primary font-semibold transition-colors duration-200"
        >
          <span>Details</span>
          <ChevronRight size={15} />
        </button>

        {/* Purchase Button (Visible for Authenticated Users, Hidden for Admins) */}
        {isAuthenticated && !isAdmin && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onPurchase && !isSold && !isPurchasing) {
                onPurchase(vehicle);
              }
            }}
            disabled={isSold || isPurchasing}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
              isSold
                ? 'bg-secondary/40 text-text-muted cursor-not-allowed border border-border'
                : isPurchasing
                ? 'bg-primary/80 text-white cursor-wait opacity-80'
                : 'bg-primary hover:bg-primary-container text-white shadow-md hover:scale-105 active:scale-95'
            }`}
          >
            {isPurchasing ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                <span>Buying...</span>
              </>
            ) : isSold ? (
              <span>Out of Stock</span>
            ) : (
              <>
                <ShoppingBag size={13} />
                <span>Purchase</span>
              </>
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
}
