import { describe, it, expect } from 'vitest';
import { isAdmin, canCreateVehicle, canEditVehicle, canDeleteVehicle } from './permissions';
import type { User } from '../types/auth';

const adminUser: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@gadiwalla.com',
  role: 'ADMIN',
};

const customerUser: User = {
  id: '2',
  name: 'Customer User',
  email: 'customer@gadiwalla.com',
  role: 'CUSTOMER',
};

describe('Role-Based Permissions Utility', () => {
  describe('isAdmin', () => {
    it('returns true for ADMIN user', () => {
      expect(isAdmin(adminUser)).toBe(true);
    });

    it('returns false for CUSTOMER user', () => {
      expect(isAdmin(customerUser)).toBe(false);
    });

    it('returns false for null user', () => {
      expect(isAdmin(null)).toBe(false);
    });

    it('returns false for undefined user', () => {
      expect(isAdmin(undefined)).toBe(false);
    });
  });

  describe('canCreateVehicle', () => {
    it('returns true for ADMIN user', () => {
      expect(canCreateVehicle(adminUser)).toBe(true);
    });

    it('returns false for CUSTOMER user', () => {
      expect(canCreateVehicle(customerUser)).toBe(false);
    });

    it('returns false for null user', () => {
      expect(canCreateVehicle(null)).toBe(false);
    });

    it('returns false for undefined user', () => {
      expect(canCreateVehicle(undefined)).toBe(false);
    });
  });

  describe('canEditVehicle', () => {
    it('returns true for ADMIN user', () => {
      expect(canEditVehicle(adminUser)).toBe(true);
    });

    it('returns false for CUSTOMER user', () => {
      expect(canEditVehicle(customerUser)).toBe(false);
    });

    it('returns false for null user', () => {
      expect(canEditVehicle(null)).toBe(false);
    });

    it('returns false for undefined user', () => {
      expect(canEditVehicle(undefined)).toBe(false);
    });
  });

  describe('canDeleteVehicle', () => {
    it('returns true for ADMIN user', () => {
      expect(canDeleteVehicle(adminUser)).toBe(true);
    });

    it('returns false for CUSTOMER user', () => {
      expect(canDeleteVehicle(customerUser)).toBe(false);
    });

    it('returns false for null user', () => {
      expect(canDeleteVehicle(null)).toBe(false);
    });

    it('returns false for undefined user', () => {
      expect(canDeleteVehicle(undefined)).toBe(false);
    });
  });
});
