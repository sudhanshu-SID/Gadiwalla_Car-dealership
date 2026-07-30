import React, { useState, useMemo } from 'react';
import VehicleCard from './VehicleCard';
import type { Vehicle } from './VehicleCard';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import SortDropdown from './SortDropdown';
import type { SortOption } from './SortDropdown';
import LoadingSkeleton from '../common/LoadingSkeleton';
import EmptyState from '../common/EmptyState';
import ErrorState from '../common/ErrorState';
import { filterVehicles } from '../../utils/filterVehicles';

const CATEGORIES = ['ALL', 'Electric', 'Sedan', 'SUV', 'Coupe', 'Hybrid'];

interface VehicleGridProps {
  onViewDetails: (vehicle: Vehicle) => void;
  vehicles?: Vehicle[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

export default function VehicleGrid({
  onViewDetails,
  vehicles = [],
  isLoading = false,
  isError = false,
  onRetry,
}: VehicleGridProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');
  const [priceRange, setPriceRange] = useState('ALL');
  const [year, setYear] = useState('ALL');
  const [sort, setSort] = useState<SortOption>('FEATURED');

  // Memoize filtered and sorted results using filterVehicles helper utility
  const filteredVehicles = useMemo(() => {
    return filterVehicles(vehicles, {
      search,
      category,
      priceRange,
      year,
      sort,
    });
  }, [vehicles, search, category, priceRange, year, sort]);

  const resetFilters = () => {
    setSearch('');
    setCategory('ALL');
    setPriceRange('ALL');
    setYear('ALL');
    setSort('FEATURED');
  };

  return (
    <section id="inventory-section" className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-label text-primary uppercase tracking-widest block mb-1">
            Current Fleet
          </span>
          <h2 className="text-display-sm font-bold text-text tracking-tight">
            Precision Inventory
          </h2>
        </div>
        <p className="text-body-sm text-text-muted">
          Showing <span className="font-bold text-text">{filteredVehicles.length}</span> of {vehicles.length} vehicles
        </p>
      </div>

      {/* Floating Filter Panel (Tesla Inventory style) */}
      <div className="bg-surface rounded-card p-4 border border-border shadow-card mb-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar
          category={category}
          onCategoryChange={setCategory}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          year={year}
          onYearChange={setYear}
          categories={CATEGORIES}
        />
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      {/* Grid or States */}
      {isLoading ? (
        <LoadingSkeleton count={6} />
      ) : isError ? (
        <ErrorState onRetry={onRetry} />
      ) : filteredVehicles.length === 0 ? (
        <EmptyState onReset={resetFilters} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle, index) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onViewDetails={onViewDetails}
              index={index}
            />
          ))}
        </div>
      )}
    </section>
  );
}
