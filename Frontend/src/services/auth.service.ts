import api from './api';
import type { User, AuthResponse, RegisterResponse } from '../types/auth';

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  name: string;
  email: string;
  password: string;
  role?: 'ADMIN' | 'CUSTOMER';
}

/**
 * Helper to safely decode a JWT payload without external dependencies
 */
function decodeJwtPayload(token: string): Partial<User> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return {
      id: payload.id,
      email: payload.email,
      role: payload.role || 'CUSTOMER',
      name: payload.name || payload.email?.split('@')[0] || 'User',
    };
  } catch (error) {
    console.error('Failed to decode JWT payload:', error);
    return null;
  }
}

export const authService = {
  /**
   * Log in user with email & password
   */
  async login(credentials: LoginParams): Promise<{ user: User; token: string }> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    const { token } = response.data;

    // Save token
    localStorage.setItem('token', token);

    // Decode token payload to extract User details
    const decodedUser = decodeJwtPayload(token);
    const user: User = {
      id: decodedUser?.id || '',
      name: decodedUser?.name || credentials.email.split('@')[0],
      email: credentials.email,
      role: decodedUser?.role || 'CUSTOMER',
    };

    localStorage.setItem('user', JSON.stringify(user));
    return { user, token };
  },

  /**
   * Register a new user
   */
  async register(data: RegisterParams): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>('/auth/register', data);
    return response.data;
  },

  /**
   * Log out current user
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Get stored current user
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!token) return null;

    if (userStr) {
      try {
        return JSON.parse(userStr) as User;
      } catch {
        // Fallback to token decoding
      }
    }

    const decoded = decodeJwtPayload(token);
    if (!decoded || !decoded.email) return null;

    return {
      id: decoded.id || '',
      name: decoded.name || 'User',
      email: decoded.email,
      role: decoded.role || 'CUSTOMER',
    };
  },

  /**
   * Get stored token
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  },
};
