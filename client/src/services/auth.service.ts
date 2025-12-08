import api from './api';
import { API_ENDPOINTS } from '@/configs/api.config';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  user_name: string;
  email: string;
  password: string;
  telephone?: string;
  address?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      user_name: string;
      email: string;
      role: string;
      status: string;
    };
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await api.post(API_ENDPOINTS.AUTH.REFRESH, { refreshToken });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

