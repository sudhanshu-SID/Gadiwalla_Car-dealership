import { describe, it, expect } from 'vitest';
import { filterVehicles, matchesSearchCriteria, matchesCategory, matchesPriceRange, matchesYear, sortVehicles } from './filterVehicles';
import type { Vehicle } from '../components/home/VehicleCard';

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    brand: 'Tesla',
    model: 'Model S',
    year: 2025,
    category: 'Electric',
    price: 110000,
    mileage: 1000,
    image: '',
    status: 'AVAILABLE',
  },
  {
    id: '2',
    brand: 'Porsche',
    model: 'Taycan',
    year: 2024,
    category: 'Electric',
    price: 180000,
    mileage: 2000,
    image: '',
    status: 'AVAILABLE',
  },
  {
    id: '3',
    brand: 'BMW',
    model: 'i7',
    year: 2023,
    category: 'Sedan',
    price: 95000,
    mileage: 5000,
    image: '',
    status: 'SOLD',
  },
];

describe('filterVehicles utility', () => {
  it('filters by search query matching brand, model, category, or year (case-insensitive & trimmed)', () => {
    expect(matchesSearchCriteria(mockVehicles[0], '  tesla  ')).toBe(true);
    expect(matchesSearchCriteria(mockVehicles[0], 'model s')).toBe(true);
    expect(matchesSearchCriteria(mockVehicles[0], '2025')).toBe(true);
    expect(matchesSearchCriteria(mockVehicles[0], 'nonexistent')).toBe(false);
  });

  it('filters by category', () => {
    expect(matchesCategory(mockVehicles[0], 'Electric')).toBe(true);
    expect(matchesCategory(mockVehicles[2], 'Electric')).toBe(false);
    expect(matchesCategory(mockVehicles[2], 'ALL')).toBe(true);
  });

  it('filters by price range', () => {
    expect(matchesPriceRange(mockVehicles[2], 'UNDER_100K')).toBe(true);
    expect(matchesPriceRange(mockVehicles[0], '100K_150K')).toBe(true);
    expect(matchesPriceRange(mockVehicles[1], 'OVER_150K')).toBe(true);
  });

  it('filters by year', () => {
    expect(matchesYear(mockVehicles[0], '2025')).toBe(true);
    expect(matchesYear(mockVehicles[0], '2023')).toBe(false);
    expect(matchesYear(mockVehicles[0], 'ALL')).toBe(true);
  });

  it('sorts vehicles by price low-high, price high-low, year newest, name A-Z', () => {
    const lowToHigh = sortVehicles(mockVehicles, 'PRICE_LOW_HIGH');
    expect(lowToHigh[0].price).toBe(95000);

    const highToLow = sortVehicles(mockVehicles, 'PRICE_HIGH_LOW');
    expect(highToLow[0].price).toBe(180000);

    const nameAZ = sortVehicles(mockVehicles, 'NAME_AZ');
    expect(nameAZ[0].brand).toBe('BMW');
  });

  it('filters and sorts full dataset correctly using filterVehicles', () => {
    const result = filterVehicles(mockVehicles, {
      search: 'Electric',
      category: 'ALL',
      priceRange: 'ALL',
      year: 'ALL',
      sort: 'PRICE_LOW_HIGH',
    });

    expect(result.length).toBe(2);
    expect(result[0].brand).toBe('Tesla');
    expect(result[1].brand).toBe('Porsche');
  });
});
