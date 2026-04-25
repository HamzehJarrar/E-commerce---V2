import api from "./axios";

export interface CartProductInfo {
  _id: string;
  name: string;
  mainImage?: {
    url?: string;
  };
}

export interface CartItem {
  _id: string;
  productId: string | CartProductInfo;
  qnt: number;
  price: number;
}

const notifyCartUpdated = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("cart-updated"));
};

const normalizeCartItems = (payload: unknown): CartItem[] => {
  if (!payload || typeof payload !== "object") return [];

  const withProducts = payload as { products?: unknown; cart?: unknown };
  const source = Array.isArray(withProducts.products)
    ? withProducts.products
    : Array.isArray(withProducts.cart)
      ? withProducts.cart
      : [];

  return source as CartItem[];
};

export const getMyCart = async (): Promise<CartItem[]> => {
  const response = await api.get("/cart");
  return normalizeCartItems(response.data);
};

export const addToCart = async (productId: string, qnt = 1) => {
  const response = await api.post("/cart/add", {
    productId,
    qnt,
    attributes: {},
  });
  notifyCartUpdated();
  return response.data;
};

export const updateCartQuantity = async (productCartId: string, qnt: number) => {
  const response = await api.patch("/cart/update-quantity", {
    productCartId,
    qnt,
  });
  notifyCartUpdated();
  return response.data;
};

export const removeFromCart = async (productCartId: string) => {
  const response = await api.delete("/cart/remove", {
    data: { productCartId },
  });
  notifyCartUpdated();
  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete("/cart/clear");
  notifyCartUpdated();
  return response.data;
};
