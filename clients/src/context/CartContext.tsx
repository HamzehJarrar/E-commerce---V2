import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Cart, CartItem } from "../types";
import { cartApi } from "../api/cartApi";

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: string;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const generateGuestId = () => {
  let guestId = localStorage.getItem("guestId");
  if (!guestId) {
    guestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("guestId", guestId);
  }
  return guestId;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCart = async () => {
    try {
      setLoading(true);
      const guestId = generateGuestId();
      const response = await cartApi.getCart(guestId);
      setCart(response.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      const guestId = generateGuestId();
      const response = await cartApi.addItem({ productId, quantity, guestId });
      setCart(response.data);
    } catch (err) {
      setError("Failed to add item to cart");
      console.error(err);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      const guestId = generateGuestId();
      const response = await cartApi.updateItem({ itemId, quantity, guestId });
      setCart(response.data);
    } catch (err) {
      setError("Failed to update quantity");
      console.error(err);
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const guestId = generateGuestId();
      const response = await cartApi.removeItem(itemId, guestId);
      setCart(response.data);
    } catch (err) {
      setError("Failed to remove item");
      console.error(err);
    }
  };

  const clearCart = async () => {
    try {
      const guestId = generateGuestId();
      await cartApi.clearCart(guestId);
      setCart(null);
    } catch (err) {
      setError("Failed to clear cart");
      console.error(err);
    }
  };

  const getItemCount = () => {
    return cart?.items.reduce((total: number, item: CartItem) => total + item.quantity, 0) || 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}