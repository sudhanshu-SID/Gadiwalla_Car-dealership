export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  message?: string;
  token: string;
  user?: User;
}

export interface RegisterResponse {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
  createdAt?: string;
  updatedAt?: string;
}
