import React, { createContext, useContext, useState } from 'react';
import { authService, type LoginParams, type RegisterParams } from '../services/auth.service';
import type { User } from '../types/auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginParams) => Promise<void>;
  register: (data: RegisterParams) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Initialize state lazily from localStorage
  const [token, setToken] = useState<string | null>(() => authService.getToken());
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());
  const [isLoading] = useState<boolean>(false);

  const login = async (credentials: LoginParams) => {
    const { user: loggedInUser, token: authToken } = await authService.login(credentials);
    setUser(loggedInUser);
    setToken(authToken);
  };

  const register = async (data: RegisterParams) => {
    await authService.register(data);
    // Auto-login after registration
    await login({ email: data.email, password: data.password });
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
