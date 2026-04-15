import api from "./axios";

export interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  discount: number;
  finalPrice: number;
  stock: number;
  mainImage: { url: string; public_id: string }; 
  subImages: { url: string; public_id: string }[];
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get("/products");
    return response.data.data as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data.data as Product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
