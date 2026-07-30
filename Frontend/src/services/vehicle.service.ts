import api from './api';
import type { Vehicle } from '../components/home/VehicleCard';

export interface BackendVehicle {
  id: number | string;
  make?: string;
  brand?: string;
  model: string;
  year: number;
  category: string;
  price: number;
  quantity?: number;
  mileage?: number;
  image?: string;
  status?: 'AVAILABLE' | 'RESERVED' | 'SOLD';
  fuelType?: string;
  transmission?: string;
  description?: string;
  specs?: { label: string; value: string }[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateVehiclePayload {
  make?: string;
  brand?: string;
  model: string;
  year: number;
  category: string;
  price: number;
  quantity?: number;
  mileage?: number;
  image?: string;
  status?: 'AVAILABLE' | 'RESERVED' | 'SOLD';
  fuelType?: string;
  transmission?: string;
  description?: string;
}

/**
 * Maps backend database fields to frontend Vehicle interface
 */
export function mapBackendToFrontend(bv: BackendVehicle): Vehicle {
  const brandName = bv.make || bv.brand || 'Gadiwalla';
  const qty = typeof bv.quantity === 'number' ? bv.quantity : 1;
  const status: 'AVAILABLE' | 'RESERVED' | 'SOLD' =
    bv.status || (qty > 0 ? 'AVAILABLE' : 'SOLD');

  return {
    id: String(bv.id),
    brand: brandName,
    model: bv.model || 'Model',
    year: Number(bv.year) || new Date().getFullYear(),
    category: bv.category || 'Electric',
    price: Number(bv.price) || 0,
    mileage: typeof bv.mileage === 'number' ? bv.mileage : 1200,
    image:
      bv.image ||
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop',
    status,
    fuelType: bv.fuelType || 'Electric',
    transmission: bv.transmission || 'Automatic',
    description: bv.description || `${brandName} ${bv.model} featuring advanced performance and luxury features.`,
    specs: bv.specs || [
      { label: '0-60 MPH', value: '3.2s' },
      { label: 'RANGE', value: '310 mi' },
      { label: 'TOP SPEED', value: '155 mph' },
      { label: 'STATUS', value: status },
    ],
  };
}

/**
 * Maps frontend Vehicle form input to backend payload
 */
export function mapFrontendToBackend(fv: CreateVehiclePayload) {
  const makeName = fv.make || fv.brand || 'Gadiwalla';
  const qty = fv.status === 'SOLD' ? 0 : fv.quantity ?? 5;

  return {
    make: makeName,
    model: fv.model,
    year: Number(fv.year),
    category: fv.category,
    price: Number(fv.price),
    quantity: qty,
  };
}

export const vehicleService = {
  /**
   * GET /api/vehicles - Fetch all vehicles
   */
  async getVehicles(): Promise<Vehicle[]> {
    const response = await api.get<BackendVehicle[]>('/vehicles');
    const data = Array.isArray(response.data) ? response.data : [];
    return data.map(mapBackendToFrontend);
  },

  /**
   * GET /api/vehicles/:id - Fetch single vehicle
   */
  async getVehicleById(id: string | number): Promise<Vehicle> {
    const response = await api.get<BackendVehicle>(`/vehicles/${id}`);
    return mapBackendToFrontend(response.data);
  },

  /**
   * POST /api/vehicles - Create a vehicle (Admin)
   */
  async createVehicle(payload: CreateVehiclePayload): Promise<Vehicle> {
    const backendData = mapFrontendToBackend(payload);
    const response = await api.post<BackendVehicle>('/vehicles', backendData);
    // Merge full input payload (image, description, etc.) with backend response
    const created = mapBackendToFrontend({ ...payload, ...response.data });
    return created;
  },

  /**
   * PUT /api/vehicles/:id - Update a vehicle (Admin)
   */
  async updateVehicle(id: string | number, payload: Partial<CreateVehiclePayload>): Promise<Vehicle> {
    const backendData = mapFrontendToBackend(payload as CreateVehiclePayload);
    const response = await api.put<BackendVehicle>(`/vehicles/${id}`, backendData);
    const updated = mapBackendToFrontend({ ...payload, ...response.data });
    return updated;
  },

  /**
   * DELETE /api/vehicles/:id - Delete a vehicle (Admin)
   */
  async deleteVehicle(id: string | number): Promise<{ message: string }> {
    const response = await api.delete<{ message: string }>(`/vehicles/${id}`);
    return response.data;
  },
};
