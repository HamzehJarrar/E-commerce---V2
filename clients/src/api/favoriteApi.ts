import type { Favorite, ApiResponse } from "../types";
import api from "./axios";

export interface AddToFavoritePayload {
  productId: string;
  guestId?: string;
}

export const favoriteApi = {
  getFavorites: async (guestId?: string) => {
    const response = await api.get<ApiResponse<Favorite>>("/favorites", {
      params: { guestId },
    });
    return response.data;
  },

  addItem: async (payload: AddToFavoritePayload) => {
    const response = await api.post<ApiResponse<Favorite>>("/favorites", payload);
    return response.data;
  },

  removeItem: async (productId: string, guestId?: string) => {
    const response = await api.delete<ApiResponse<Favorite>>(`/favorites/${productId}`, {
      params: { guestId },
    });
    return response.data;
  },

  checkIsFavorite: async (productId: string, guestId?: string) => {
    const response = await api.get<ApiResponse<boolean>>(`/favorites/check/${productId}`, {
      params: { guestId },
    });
    return response.data;
  },
};