import { useState, useEffect } from "react";
import type { Product, SearchParams } from "../types";
import { productApi } from "../api/productApi";
import { useDebounce } from "./useUtils";

export function useProducts(params?: SearchParams) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await productApi.getAll(params);
      setProducts(response.data.data);
      setPagination(response.data.pagination);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [params?.category, params?.minPrice, params?.maxPrice, params?.sort]);

  return { products, loading, error, pagination, refetch: fetchProducts };
}

export function useProductSearch(query: string) {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const searchProducts = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        const response = await productApi.search(debouncedQuery);
        setResults(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Search failed");
      } finally {
        setLoading(false);
      }
    };

    searchProducts();
  }, [debouncedQuery]);

  return { results, loading, error };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await productApi.getById(id);
      setProduct(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Product not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  return { product, loading, error, refetch: fetchProduct };
}

export function useFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const response = await productApi.getFeatured();
        setProducts(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch featured products");
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return { products, loading, error };
}