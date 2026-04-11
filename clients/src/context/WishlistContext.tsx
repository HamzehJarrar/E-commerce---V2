import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Favorite } from "../types";
import { favoriteApi } from "../api/favoriteApi";

interface WishlistContextType {
  wishlist: Favorite | null;
  loading: boolean;
  error: string;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Favorite | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const guestId = localStorage.getItem("guestId") || undefined;
      const response = await favoriteApi.getFavorites(guestId);
      setWishlist(response.data);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const addToWishlist = async (productId: string) => {
    try {
      const guestId = localStorage.getItem("guestId") || undefined;
      const response = await favoriteApi.addItem({ productId, guestId });
      setWishlist(response.data);
    } catch (err) {
      setError("Failed to add to wishlist");
      console.error(err);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      const guestId = localStorage.getItem("guestId") || undefined;
      const response = await favoriteApi.removeItem(productId, guestId);
      setWishlist(response.data);
    } catch (err) {
      setError("Failed to remove from wishlist");
      console.error(err);
    }
  };

  const isFavorite = (productId: string) => {
    return wishlist?.products.some((p) => p._id === productId) || false;
  };

  const toggleFavorite = async (productId: string) => {
    if (isFavorite(productId)) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        error,
        addToWishlist,
        removeFromWishlist,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}