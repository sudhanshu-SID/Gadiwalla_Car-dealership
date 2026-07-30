import { useEffect } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Edit3, Loader2 } from 'lucide-react';
import type { Vehicle } from './VehicleCard';

const vehicleSchema = z.object({
  brand: z.string().min(1, 'Brand is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.coerce.number().min(1900, 'Invalid year').max(2030, 'Invalid year'),
  category: z.string().min(1, 'Category is required'),
  price: z.coerce.number().min(1, 'Price must be greater than 0'),
  mileage: z.coerce.number().min(0, 'Mileage cannot be negative'),
  image: z.string().url('Must be a valid URL'),
  status: z.enum(['AVAILABLE', 'RESERVED', 'SOLD']),
  fuelType: z.string().optional(),
  transmission: z.string().optional(),
  description: z.string().optional(),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: VehicleFormData) => void;
  initialData?: Vehicle | null;
  isLoading?: boolean;
}

export default function AddVehicleModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
}: AddVehicleModalProps) {
  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema) as unknown as Resolver<VehicleFormData>,
    defaultValues: {
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      category: 'Electric',
      price: 50000,
      mileage: 0,
      image: '',
      status: 'AVAILABLE',
      fuelType: 'Electric',
      transmission: 'Automatic',
      description: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        brand: initialData.brand,
        model: initialData.model,
        year: initialData.year,
        category: initialData.category,
        price: initialData.price,
        mileage: initialData.mileage,
        image: initialData.image,
        status: initialData.status,
        fuelType: initialData.fuelType || 'Electric',
        transmission: initialData.transmission || 'Automatic',
        description: initialData.description || '',
      });
    } else {
      reset({
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        category: 'Electric',
        price: 50000,
        mileage: 0,
        image: '',
        status: 'AVAILABLE',
        fuelType: 'Electric',
        transmission: 'Automatic',
        description: '',
      });
    }
  }, [initialData, reset, isOpen]);

  const handleFormSubmit = (data: VehicleFormData) => {
    onSubmit(data);
  };

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

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] bg-surface z-50 rounded-card shadow-modal border border-border overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between bg-surface sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {isEditing ? <Edit3 size={20} /> : <Plus size={20} />}
                </div>
                <div>
                  <h3 className="text-heading-sm font-bold text-text">
                    {isEditing ? 'Edit Vehicle' : 'Add New Vehicle'}
                  </h3>
                  <p className="text-body-sm text-text-muted">
                    Enter vehicle specifications to update dealership inventory.
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-background hover:bg-border-light flex items-center justify-center text-text-secondary hover:text-text transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Fields */}
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="flex-1 overflow-y-auto p-6 space-y-5"
            >
              {/* Image URL */}
              <div className="space-y-1.5">
                <label className="text-label text-text font-semibold uppercase">
                  Image URL
                </label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/photo-..."
                  {...register('image')}
                  className="w-full px-4 py-3 rounded-input bg-background border border-border text-text text-body-sm outline-none focus:border-primary transition-colors"
                />
                {errors.image && (
                  <span className="text-caption text-error">{errors.image.message}</span>
                )}
              </div>

              {/* Brand & Model */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-label text-text font-semibold uppercase">
                    Brand / Make
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Porsche, Aether, Tesla"
                    {...register('brand')}
                    className="w-full px-4 py-3 rounded-input bg-background border border-border text-text text-body-sm outline-none focus:border-primary transition-colors"
                  />
                  {errors.brand && (
                    <span className="text-caption text-error">{errors.brand.message}</span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-label text-text font-semibold uppercase">
                    Model
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Taycan Turbo S, S1"
                    {...register('model')}
                    className="w-full px-4 py-3 rounded-input bg-background border border-border text-text text-body-sm outline-none focus:border-primary transition-colors"
                  />
                  {errors.model && (
                    <span className="text-caption text-error">{errors.model.message}</span>
                  )}
                </div>
              </div>

              {/* Year, Category, Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-label text-text font-semibold uppercase">
                    Year
                  </label>
                  <input
                    type="number"
                    {...register('year')}
                    className="w-full px-4 py-3 rounded-input bg-background border border-border text-text text-body-sm outline-none focus:border-primary transition-colors"
                  />
                  {errors.year && (
                    <span className="text-caption text-error">{errors.year.message}</span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-label text-text font-semibold uppercase">
                    Category
                  </label>
                  <select
                    {...register('category')}
                    className="w-full px-4 py-3 rounded-input bg-background border border-border text-text text-body-sm outline-none focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="Electric">Electric</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-label text-text font-semibold uppercase">
                    Status
                  </label>
                  <select
                    {...register('status')}
                    className="w-full px-4 py-3 rounded-input bg-background border border-border text-text text-body-sm outline-none focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="RESERVED">RESERVED</option>
                    <option value="SOLD">SOLD</option>
                  </select>
                </div>
              </div>

              {/* Price & Mileage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-label text-text font-semibold uppercase">
                    Price ($ USD)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 125000"
                    {...register('price')}
                    className="w-full px-4 py-3 rounded-input bg-background border border-border text-text text-body-sm outline-none focus:border-primary transition-colors"
                  />
                  {errors.price && (
                    <span className="text-caption text-error">{errors.price.message}</span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-label text-text font-semibold uppercase">
                    Mileage (mi)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 1200"
                    {...register('mileage')}
                    className="w-full px-4 py-3 rounded-input bg-background border border-border text-text text-body-sm outline-none focus:border-primary transition-colors"
                  />
                  {errors.mileage && (
                    <span className="text-caption text-error">{errors.mileage.message}</span>
                  )}
                </div>
              </div>

              {/* Fuel & Transmission */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-label text-text font-semibold uppercase">
                    Fuel / Powertrain
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Electric, Dual Motor, V8 Hybrid"
                    {...register('fuelType')}
                    className="w-full px-4 py-3 rounded-input bg-background border border-border text-text text-body-sm outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-label text-text font-semibold uppercase">
                    Transmission
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Automatic, 2-Speed"
                    {...register('transmission')}
                    className="w-full px-4 py-3 rounded-input bg-background border border-border text-text text-body-sm outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-label text-text font-semibold uppercase">
                  Overview / Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter a brief vehicle overview..."
                  {...register('description')}
                  className="w-full px-4 py-3 rounded-input bg-background border border-border text-text text-body-sm outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-button border border-border hover:bg-background text-text-secondary hover:text-text text-label font-semibold uppercase transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 rounded-button bg-primary hover:bg-primary-hover text-white text-label font-semibold tracking-wider uppercase transition-all shadow-sm active:scale-95 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : isEditing ? (
                    'Save Changes'
                  ) : (
                    'Add Vehicle'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
