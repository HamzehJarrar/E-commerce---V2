import type { Cart, ApiResponse } from "../types";
import api from "./axios";

export interface AddToCartPayload {
  productId: string;
  quantity: number;
  guestId?: string;
}

export interface UpdateCartItemPayload {
  itemId: string;
  quantity: number;
}

export const cartApi = {
  getCart: async (guestId?: string) => {
    const response = await api.get<ApiResponse<Cart>>("/cart", {
      params: { guestId },
    });
    return response.data;
  },

  addItem: async (payload: AddToCartPayload) => {
    const response = await api.post<ApiResponse<Cart>>("/cart/items", payload);
    return response.data;
  },

  updateItem: async (payload: UpdateCartItemPayload & { guestId?: string }) => {
    const response = await api.patch<ApiResponse<Cart>>(
      `/cart/items/${payload.itemId}`,
      { quantity: payload.quantity }
    );
    return response.data;
  },

  removeItem: async (itemId: string, guestId?: string) => {
    const response = await api.delete<ApiResponse<Cart>>(`/cart/items/${itemId}`, {
      params: { guestId },
    });
    return response.data;
  },

  clearCart: async (guestId?: string) => {
    const response = await api.delete<ApiResponse<Cart>>("/cart", {
      params: { guestId },
    });
    return response.data;
  },
};