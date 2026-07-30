import type { Vehicle } from '../components/home/VehicleCard';
import type { SortOption } from '../components/home/SortDropdown';

export interface FilterCriteria {
  search: string;
  category: string;
  priceRange: string;
  year: string;
  sort: SortOption;
}

/**
 * Filter vehicles based on search query, category, price range, and year
 */
export function matchesSearchCriteria(vehicle: Vehicle, query: string): boolean {
  if (!query) return true;
  const q = query.trim().toLowerCase();

  const matchesBrand = vehicle.brand.toLowerCase().includes(q);
  const matchesModel = vehicle.model.toLowerCase().includes(q);
  const matchesCategory = vehicle.category.toLowerCase().includes(q);
  const matchesYear = vehicle.year.toString().includes(q);

  return matchesBrand || matchesModel || matchesCategory || matchesYear;
}

/**
 * Check if a vehicle matches selected category
 */
export function matchesCategory(vehicle: Vehicle, selectedCategory: string): boolean {
  if (!selectedCategory || selectedCategory === 'ALL') return true;
  return vehicle.category.toLowerCase() === selectedCategory.toLowerCase();
}

/**
 * Check if a vehicle matches selected price range
 */
export function matchesPriceRange(vehicle: Vehicle, priceRange: string): boolean {
  if (!priceRange || priceRange === 'ALL') return true;
  if (priceRange === 'UNDER_100K') return vehicle.price < 100000;
  if (priceRange === '100K_150K') return vehicle.price >= 100000 && vehicle.price <= 150000;
  if (priceRange === 'OVER_150K') return vehicle.price > 150000;
  return true;
}

/**
 * Check if a vehicle matches selected year
 */
export function matchesYear(vehicle: Vehicle, selectedYear: string): boolean {
  if (!selectedYear || selectedYear === 'ALL') return true;
  return vehicle.year.toString() === selectedYear;
}

/**
 * Sort vehicles array based on sort option
 */
export function sortVehicles(vehicles: Vehicle[], sort: SortOption): Vehicle[] {
  return [...vehicles].sort((a, b) => {
    switch (sort) {
      case 'PRICE_LOW_HIGH':
        return a.price - b.price;
      case 'PRICE_HIGH_LOW':
        return b.price - a.price;
      case 'YEAR_NEWEST':
        return b.year - a.year;
      case 'NAME_AZ':
        return `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`);
      case 'FEATURED':
      default:
        return 0;
    }
  });
}

/**
 * Main utility function to filter and sort vehicles array
 */
export function filterVehicles(vehicles: Vehicle[], criteria: FilterCriteria): Vehicle[] {
  const filtered = vehicles.filter((v) => {
    return (
      matchesSearchCriteria(v, criteria.search) &&
      matchesCategory(v, criteria.category) &&
      matchesPriceRange(v, criteria.priceRange) &&
      matchesYear(v, criteria.year)
    );
  });

  return sortVehicles(filtered, criteria.sort);
}
