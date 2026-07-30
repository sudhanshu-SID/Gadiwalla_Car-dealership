import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from './api';
import {
  vehicleService,
  mapBackendToFrontend,
  mapFrontendToBackend,
  type BackendVehicle,
  type CreateVehiclePayload,
} from './vehicle.service';

vi.mock('./api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('Vehicle Service & Mapping Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('mapBackendToFrontend()', () => {
    it('correctly maps backend vehicle objects to the frontend Vehicle model', () => {
      const backendVehicle: BackendVehicle = {
        id: 101,
        make: 'Tesla',
        model: 'Model S Plaid',
        year: 2025,
        category: 'Electric',
        price: 109990,
        quantity: 5,
      };

      const mapped = mapBackendToFrontend(backendVehicle);

      expect(mapped.id).toBe('101');
      expect(mapped.brand).toBe('Tesla');
      expect(mapped.model).toBe('Model S Plaid');
      expect(mapped.year).toBe(2025);
      expect(mapped.category).toBe('Electric');
      expect(mapped.price).toBe(109990);
      expect(mapped.status).toBe('AVAILABLE');
      expect(mapped.image).toBeDefined();
      expect(mapped.description).toContain('Tesla Model S Plaid');
    });

    it('correctly formats fallback fields when optional properties are omitted', () => {
      const backendVehicle: BackendVehicle = {
        id: 202,
        brand: 'Porsche',
        model: 'Taycan',
        year: 2024,
        category: 'Coupe',
        price: 150000,
        quantity: 0,
      };

      const mapped = mapBackendToFrontend(backendVehicle);

      expect(mapped.brand).toBe('Porsche');
      expect(mapped.status).toBe('SOLD');
      expect(mapped.fuelType).toBe('Electric');
      expect(mapped.transmission).toBe('Automatic');
    });
  });

  describe('mapFrontendToBackend()', () => {
    it('correctly converts frontend Vehicle payload into backend request payload', () => {
      const payload: CreateVehiclePayload = {
        brand: 'BMW',
        model: 'i7 xDrive60',
        year: 2024,
        category: 'Sedan',
        price: 126900,
        status: 'AVAILABLE',
        image: 'http://example.com/bmw.jpg',
        description: 'Luxury electric sedan',
      };

      const backendPayload = mapFrontendToBackend(payload);

      expect(backendPayload).toEqual({
        make: 'BMW',
        model: 'i7 xDrive60',
        year: 2024,
        category: 'Sedan',
        price: 126900,
        quantity: 5,
      });

      // Excludes frontend-only properties
      expect((backendPayload as Record<string, unknown>).image).toBeUndefined();
      expect((backendPayload as Record<string, unknown>).description).toBeUndefined();
    });

    it('sets quantity to 0 when status is SOLD', () => {
      const payload: CreateVehiclePayload = {
        brand: 'Audi',
        model: 'e-tron',
        year: 2023,
        category: 'SUV',
        price: 90000,
        status: 'SOLD',
      };

      const backendPayload = mapFrontendToBackend(payload);
      expect(backendPayload.quantity).toBe(0);
    });
  });

  describe('vehicleService API wrapper methods', () => {
    it('getVehicles() calls GET /vehicles and returns mapped frontend vehicles', async () => {
      const mockBackendResponse = [
        {
          id: 1,
          make: 'Toyota',
          model: 'Supra',
          year: 2024,
          category: 'Coupe',
          price: 56000,
          quantity: 3,
        },
      ];

      vi.mocked(api.get).mockResolvedValueOnce({ data: mockBackendResponse });

      const result = await vehicleService.getVehicles();

      expect(api.get).toHaveBeenCalledWith('/vehicles');
      expect(result).toHaveLength(1);
      expect(result[0].brand).toBe('Toyota');
      expect(result[0].model).toBe('Supra');
    });

    it('getVehicles() handles API failure correctly', async () => {
      vi.mocked(api.get).mockRejectedValueOnce(new Error('Network error'));

      await expect(vehicleService.getVehicles()).rejects.toThrow('Network error');
    });

    it('getVehicleById() calls GET /vehicles/:id and returns mapped vehicle', async () => {
      const mockBackendVehicle = {
        id: 42,
        make: 'Honda',
        model: 'NSX',
        year: 2023,
        category: 'Coupe',
        price: 170000,
        quantity: 2,
      };

      vi.mocked(api.get).mockResolvedValueOnce({ data: mockBackendVehicle });

      const result = await vehicleService.getVehicleById(42);

      expect(api.get).toHaveBeenCalledWith('/vehicles/42');
      expect(result.id).toBe('42');
      expect(result.brand).toBe('Honda');
    });

    it('createVehicle() sends POST payload and returns created mapped vehicle', async () => {
      const payload: CreateVehiclePayload = {
        brand: 'Mercedes-Benz',
        model: 'AMG GT',
        year: 2024,
        category: 'Coupe',
        price: 175000,
        status: 'AVAILABLE',
      };

      const mockResponse = {
        id: 99,
        make: 'Mercedes-Benz',
        model: 'AMG GT',
        year: 2024,
        category: 'Coupe',
        price: 175000,
        quantity: 5,
      };

      vi.mocked(api.post).mockResolvedValueOnce({ data: mockResponse });

      const result = await vehicleService.createVehicle(payload);

      expect(api.post).toHaveBeenCalledWith('/vehicles', {
        make: 'Mercedes-Benz',
        model: 'AMG GT',
        year: 2024,
        category: 'Coupe',
        price: 175000,
        quantity: 5,
      });

      expect(result.id).toBe('99');
      expect(result.brand).toBe('Mercedes-Benz');
    });

    it('updateVehicle() sends PUT payload and returns updated mapped vehicle', async () => {
      const payload: CreateVehiclePayload = {
        brand: 'Mercedes-Benz',
        model: 'AMG GT Black Series',
        year: 2025,
        category: 'Coupe',
        price: 325000,
        status: 'AVAILABLE',
      };

      const mockResponse = {
        id: 99,
        make: 'Mercedes-Benz',
        model: 'AMG GT Black Series',
        year: 2025,
        category: 'Coupe',
        price: 325000,
        quantity: 5,
      };

      vi.mocked(api.put).mockResolvedValueOnce({ data: mockResponse });

      const result = await vehicleService.updateVehicle(99, payload);

      expect(api.put).toHaveBeenCalledWith('/vehicles/99', {
        make: 'Mercedes-Benz',
        model: 'AMG GT Black Series',
        year: 2025,
        category: 'Coupe',
        price: 325000,
        quantity: 5,
      });

      expect(result.model).toBe('AMG GT Black Series');
    });

    it('deleteVehicle() calls DELETE /vehicles/:id and resolves successfully', async () => {
      vi.mocked(api.delete).mockResolvedValueOnce({
        data: { message: 'Vehicle deleted successfully' },
      });

      const result = await vehicleService.deleteVehicle(99);

      expect(api.delete).toHaveBeenCalledWith('/vehicles/99');
      expect(result.message).toBe('Vehicle deleted successfully');
    });
  });
});
