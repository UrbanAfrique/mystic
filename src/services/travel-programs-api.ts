import { apiRequest } from './api';
import { ClientDemand, SpecialPackage, City, Activity, Service } from '@/models/travel-programs';

// Cities API
export const citiesAPI = {
  getAll: async () => apiRequest('/cities'),
  getById: async (id: string) => apiRequest(`/cities/${id}`),
  create: async (data: Partial<City>) => apiRequest('/cities', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: async (id: string, data: Partial<City>) => apiRequest(`/cities/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: async (id: string) => apiRequest(`/cities/${id}`, { method: 'DELETE' }),
};

// Activities API
export const activitiesAPI = {
  getAll: async (cityId?: string) => {
    const params = cityId ? `?cityId=${cityId}` : '';
    return apiRequest(`/activities${params}`);
  },
  getById: async (id: string) => apiRequest(`/activities/${id}`),
  create: async (data: Partial<Activity>) => apiRequest('/activities', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: async (id: string, data: Partial<Activity>) => apiRequest(`/activities/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: async (id: string) => apiRequest(`/activities/${id}`, { method: 'DELETE' }),
};

// Services API
export const servicesAPI = {
  getAll: async () => apiRequest('/services'),
  getById: async (id: string) => apiRequest(`/services/${id}`),
  create: async (data: Partial<Service>) => apiRequest('/services', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: async (id: string, data: Partial<Service>) => apiRequest(`/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: async (id: string) => apiRequest(`/services/${id}`, { method: 'DELETE' }),
};

// Client Demands API
export const demandsAPI = {
  getAll: async () => apiRequest('/demands'),
  getById: async (id: string) => apiRequest(`/demands/${id}`),
  create: async (data: Partial<ClientDemand>) => apiRequest('/demands', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: async (id: string, data: Partial<ClientDemand>) => apiRequest(`/demands/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: async (id: string) => apiRequest(`/demands/${id}`, { method: 'DELETE' }),
  sendEmail: async (id: string) => apiRequest(`/demands/${id}/send-email`, {
    method: 'POST',
  }),
};

// Special Packages API
export const specialPackagesAPI = {
  getAll: async () => apiRequest('/special-packages'),
  getById: async (id: string) => apiRequest(`/special-packages/${id}`),
  create: async (data: Partial<SpecialPackage>) => apiRequest('/special-packages', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: async (id: string, data: Partial<SpecialPackage>) => apiRequest(`/special-packages/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: async (id: string) => apiRequest(`/special-packages/${id}`, { method: 'DELETE' }),
};

// Hotels API
export const hotelsAPI = {
  getAll: async (params?: Record<string, any>) => {
    const qs = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return apiRequest(`/hotels${qs}`);
  },
  getById: async (id: string) => apiRequest(`/hotels/${id}`),
  create: async (hotelData: any) =>
    apiRequest('/hotels', {
      method: 'POST',
      body: JSON.stringify(hotelData),
    }),
  update: async (id: string, hotelData: any) =>
    apiRequest(`/hotels/${id}`, {
      method: 'PUT',
      body: JSON.stringify(hotelData),
    }),
  delete: async (id: string) =>
    apiRequest(`/hotels/${id}`, { method: 'DELETE' }),
  addReview: async (id: string, reviewData: { rating: number; comment?: string }) =>
    apiRequest(`/hotels/${id}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    }),
};
