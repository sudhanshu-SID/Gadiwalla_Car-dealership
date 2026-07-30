import React, { useState, useMemo } from 'react';
import VehicleCard from './VehicleCard';
import type { Vehicle } from './VehicleCard';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import SortDropdown from './SortDropdown';
import type { SortOption } from './SortDropdown';
import LoadingSkeleton from '../common/LoadingSkeleton';
import EmptyState from '../common/EmptyState';

const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 'GW-001',
    brand: 'Tesla',
    model: 'Model S Plaid',
    year: 2025,
    category: 'Electric',
    price: 109990,
    mileage: 1200,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop',
    status: 'AVAILABLE',
    fuelType: 'Electric',
    transmission: 'Automatic',
    description: 'Tri-motor all-wheel drive platform with torque vectoring and 1,020 horsepower peak output.',
    specs: [
      { label: '0-60 MPH', value: '1.99s' },
      { label: 'RANGE', value: '359 mi' },
      { label: 'TOP SPEED', value: '200 mph' },
      { label: 'PEAK HP', value: '1,020 hp' },
    ],
  },
  {
    id: 'GW-002',
    brand: 'Porsche',
    model: 'Taycan Turbo S',
    year: 2024,
    category: 'Electric',
    price: 185000,
    mileage: 3400,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop',
    status: 'AVAILABLE',
    fuelType: 'Electric',
    transmission: '2-Speed Automatic',
    description: 'Precision German engineering meets all-electric performance. Exceptional launch control and track-ready dynamics.',
    specs: [
      { label: '0-60 MPH', value: '2.6s' },
      { label: 'RANGE', value: '278 mi' },
      { label: 'TOP SPEED', value: '161 mph' },
      { label: 'PEAK HP', value: '750 hp' },
    ],
  },
  {
    id: 'GW-003',
    brand: 'Mercedes-Benz',
    model: 'AMG GT 63 S',
    year: 2024,
    category: 'Coupe',
    price: 175900,
    mileage: 5100,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop',
    status: 'RESERVED',
    fuelType: 'Gasoline',
    transmission: '9-Speed Automatic',
    description: 'Handcrafted AMG 4.0L V8 biturbo engine with 4MATIC+ fully variable all-wheel drive.',
    specs: [
      { label: '0-60 MPH', value: '3.1s' },
      { label: 'ENGINE', value: '4.0L V8' },
      { label: 'TOP SPEED', value: '196 mph' },
      { label: 'PEAK HP', value: '630 hp' },
    ],
  },
  {
    id: 'GW-004',
    brand: 'Toyota',
    model: 'Land Cruiser 300',
    year: 2025,
    category: 'SUV',
    price: 88500,
    mileage: 800,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop',
    status: 'AVAILABLE',
    fuelType: 'Hybrid',
    transmission: '10-Speed Automatic',
    description: 'Legendary off-road durability with i-FORCE MAX hybrid powertrain and multi-terrain select system.',
    specs: [
      { label: '0-60 MPH', value: '6.2s' },
      { label: 'DRIVETRAIN', value: '4WD' },
      { label: 'CLEARANCE', value: '9.5"' },
      { label: 'TOWING', value: '8,000 lbs' },
    ],
  },
  {
    id: 'GW-005',
    brand: 'Audi',
    model: 'RS e-tron GT',
    year: 2023,
    category: 'Coupe',
    price: 147500,
    mileage: 8900,
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200&auto=format&fit=crop',
    status: 'AVAILABLE',
    fuelType: 'Electric',
    transmission: 'Automatic',
    description: 'Sculpted aerodynamics and quattro all-wheel drive. High-voltage charging capable up to 270 kW.',
    specs: [
      { label: '0-60 MPH', value: '3.1s' },
      { label: 'RANGE', value: '232 mi' },
      { label: 'TOP SPEED', value: '155 mph' },
      { label: 'PEAK HP', value: '637 hp' },
    ],
  },
  {
    id: 'GW-006',
    brand: 'BMW',
    model: 'i7 xDrive60',
    year: 2024,
    category: 'Sedan',
    price: 126900,
    mileage: 4200,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop',
    status: 'SOLD',
    fuelType: 'Electric',
    transmission: 'Automatic',
    description: 'Executive mobility redefined. Featuring 31-inch BMW Theater Screen in rear lounge and Bowers & Wilkins sound.',
    specs: [
      { label: '0-60 MPH', value: '4.5s' },
      { label: 'RANGE', value: '318 mi' },
      { label: 'TOP SPEED', value: '149 mph' },
      { label: 'PEAK HP', value: '536 hp' },
    ],
  },
];

const CATEGORIES = ['ALL', 'Electric', 'Sedan', 'SUV', 'Coupe', 'Hybrid'];

interface VehicleGridProps {
  onViewDetails: (vehicle: Vehicle) => void;
  vehicles?: Vehicle[];
  isLoading?: boolean;
}

export default function VehicleGrid({
  onViewDetails,
  vehicles = MOCK_VEHICLES,
  isLoading = false,
}: VehicleGridProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');
  const [priceRange, setPriceRange] = useState('ALL');
  const [year, setYear] = useState('ALL');
  const [sort, setSort] = useState<SortOption>('FEATURED');

  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) => {
        // Search query
        if (search.trim()) {
          const q = search.toLowerCase();
          const matches =
            v.brand.toLowerCase().includes(q) ||
            v.model.toLowerCase().includes(q) ||
            v.category.toLowerCase().includes(q) ||
            v.year.toString().includes(q);
          if (!matches) return false;
        }

        // Category filter
        if (category !== 'ALL' && v.category.toLowerCase() !== category.toLowerCase()) {
          return false;
        }

        // Price range filter
        if (priceRange === 'UNDER_100K' && v.price >= 100000) return false;
        if (priceRange === '100K_150K' && (v.price < 100000 || v.price > 150000)) return false;
        if (priceRange === 'OVER_150K' && v.price <= 150000) return false;

        // Year filter
        if (year !== 'ALL' && v.year.toString() !== year) return false;

        return true;
      })
      .sort((a, b) => {
        if (sort === 'PRICE_LOW_HIGH') return a.price - b.price;
        if (sort === 'PRICE_HIGH_LOW') return b.price - a.price;
        if (sort === 'YEAR_NEWEST') return b.year - a.year;
        if (sort === 'NAME_AZ') return `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`);
        return 0;
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
