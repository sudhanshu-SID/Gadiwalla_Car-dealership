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

  const getVehicleImage = (makeStr: string, modelStr: string, fallbackImage?: string) => {
    if (fallbackImage && fallbackImage.startsWith('http')) return fallbackImage;
    const key = `${makeStr} ${modelStr}`.toLowerCase();
    if (key.includes('tesla')) {
      return 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop';
    }
    if (key.includes('porsche') || key.includes('taycan')) {
      return 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop';
    }
    if (key.includes('mercedes') || key.includes('amg')) {
      return 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop';
    }
    if (key.includes('toyota') || key.includes('land cruiser')) {
      return 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop';
    }
    if (key.includes('audi')) {
      return 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200&auto=format&fit=crop';
    }
    if (key.includes('bmw')) {
      return 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop';
    }
    return 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop';
  };

  return {
    id: String(bv.id),
    brand: brandName,
    model: bv.model || 'Model',
    year: Number(bv.year) || new Date().getFullYear(),
    category: bv.category || 'Electric',
    price: Number(bv.price) || 0,
    quantity: qty,
    mileage: typeof bv.mileage === 'number' ? bv.mileage : 1200,
    image: getVehicleImage(brandName, bv.model || '', bv.image),
    status,
    fuelType: bv.fuelType || 'Electric',
    transmission: bv.transmission || 'Automatic',
    description: bv.description || `${brandName} ${bv.model} featuring advanced performance and luxury features.`,
    specs: [
      { label: 'MAKE', value: brandName },
      { label: 'MODEL', value: bv.model || 'Model' },
      { label: 'YEAR', value: String(bv.year || new Date().getFullYear()) },
      { label: 'CATEGORY', value: bv.category || 'Electric' },
      { label: 'PRICE', value: `$${Number(bv.price || 0).toLocaleString()}` },
      { label: 'STOCK QUANTITY', value: `${qty} ${qty === 1 ? 'unit' : 'units'}` },
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
   * PATCH /api/vehicles/:id/purchase - Purchase a vehicle (Authenticated Users)
   */
  async purchaseVehicle(id: string | number): Promise<Vehicle> {
    const response = await api.patch<BackendVehicle>(`/vehicles/${id}/purchase`);
    return mapBackendToFrontend(response.data);
  },

  /**
   * POST /api/vehicles/:id/restock - Restock vehicle stock (Admin Only)
   */
  async restockVehicle(id: string | number, amount: number = 1): Promise<Vehicle> {
    const response = await api.post<BackendVehicle>(`/vehicles/${id}/restock`, { amount });
    return mapBackendToFrontend(response.data);
  },

  /**
   * DELETE /api/vehicles/:id - Delete a vehicle (Admin)
   */
  async deleteVehicle(id: string | number): Promise<{ message: string }> {
    const response = await api.delete<{ message: string }>(`/vehicles/${id}`);
    return response.data;
  },
};
