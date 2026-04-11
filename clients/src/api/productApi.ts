import type { Product, ApiResponse, SearchParams, PaginatedResponse } from "../types";
import api from "./axios";

export const productApi = {
  getAll: async (params?: SearchParams) => {
    const response = await api.get<ApiResponse<PaginatedResponse<Product>>>("/products", { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data;
  },

  search: async (q: string) => {
    const response = await api.get<ApiResponse<Product[]>>("/products/search", {
      params: { q },
    });
    return response.data;
  },

  getByCategory: async (category: string) => {
    const response = await api.get<ApiResponse<Product[]>>(`/products/category/${category}`);
    return response.data;
  },

  getFeatured: async () => {
    const response = await api.get<ApiResponse<Product[]>>("/products/featured");
    return response.data;
  },
};