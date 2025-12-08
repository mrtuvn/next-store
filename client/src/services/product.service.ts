import api from './api';
import { API_ENDPOINTS } from '@/configs/api.config';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  ratings: {
    average: number;
    count: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
  };
}

export interface ProductParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  priceRange?: string;
  sortBy?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const productService = {
  getProducts: async (params?: ProductParams): Promise<ProductsResponse> => {
    const response = await api.get(API_ENDPOINTS.PRODUCTS.LIST, { params });
    return response.data;
  },

  getProduct: async (id: string): Promise<{ success: boolean; data: Product }> => {
    const response = await api.get(API_ENDPOINTS.PRODUCTS.DETAIL(id));
    return response.data;
  },

  searchProducts: async (query: string): Promise<ProductsResponse> => {
    const response = await api.get(API_ENDPOINTS.PRODUCTS.SEARCH, {
      params: { search: query }
    });
    return response.data;
  }
};

