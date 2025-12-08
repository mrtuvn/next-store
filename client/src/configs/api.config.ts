export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  TIMEOUT: 30000,
} as const;

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    GOOGLE: '/auth/google',
  },
  // Products
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id: string) => `/products/${id}`,
    SEARCH: '/products/search',
    REVIEWS: (id: string) => `/products/${id}/reviews`,
  },
  // Categories
  CATEGORIES: {
    LIST: '/categories',
    DETAIL: (id: string) => `/categories/${id}`,
  },
  // Cart
  CART: {
    GET: '/cart',
    ADD: '/cart/items',
    UPDATE: (id: string) => `/cart/items/${id}`,
    REMOVE: (id: string) => `/cart/items/${id}`,
    MERGE: '/cart/merge',
    CLEAR: '/cart',
  },
  // Wishlist
  WISHLIST: {
    LIST: '/wishlist',
    ADD: '/wishlist/items',
    REMOVE: (id: string) => `/wishlist/items/${id}`,
  },
  // Orders
  ORDERS: {
    LIST: '/orders',
    DETAIL: (id: string) => `/orders/${id}`,
    CREATE: '/orders',
    GUEST: '/orders/guest',
  },
  // User
  USER: {
    PROFILE: '/users/profile',
    UPDATE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
    ADDRESSES: '/users/addresses',
  },
} as const;

