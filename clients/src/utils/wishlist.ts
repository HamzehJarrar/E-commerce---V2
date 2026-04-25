const WISHLIST_KEY = "wishlistProducts";

export const getWishlistIds = (): string[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(WISHLIST_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((value): value is string => typeof value === "string");
  } catch {
    return [];
  }
};

const saveWishlistIds = (ids: string[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event("wishlist-updated"));
};

export const isProductWishlisted = (productId: string): boolean => {
  return getWishlistIds().includes(productId);
};

export const toggleWishlistProduct = (productId: string): boolean => {
  const ids = getWishlistIds();
  const exists = ids.includes(productId);

  if (exists) {
    saveWishlistIds(ids.filter((id) => id !== productId));
    return false;
  }

  saveWishlistIds([...ids, productId]);
  return true;
};
