import type { User } from '../types/auth';

/**
 * Checks if a user has ADMIN role
 */
export function isAdmin(user?: User | null): boolean {
  return user?.role === 'ADMIN';
}

/**
 * Checks if a user is authorized to create a vehicle
 */
export function canCreateVehicle(user?: User | null): boolean {
  return isAdmin(user);
}

/**
 * Checks if a user is authorized to edit a vehicle
 */
export function canEditVehicle(user?: User | null): boolean {
  return isAdmin(user);
}

/**
 * Checks if a user is authorized to delete a vehicle
 */
export function canDeleteVehicle(user?: User | null): boolean {
  return isAdmin(user);
}
