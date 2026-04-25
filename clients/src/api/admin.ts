import api from "./axios";

export interface CategoryOption {
  _id: string;
  name: string;
}

export interface AdminProduct {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category?: { name?: string } | string;
}

const extractData = <T>(response: { data?: { data?: T } }) => {
  if (!response.data || typeof response.data.data === "undefined") {
    throw new Error("Invalid server response");
  }
  return response.data.data;
};

export const getCategories = async (): Promise<CategoryOption[]> => {
  const response = await api.get("/categories");
  return extractData<CategoryOption[]>(response);
};

export const getAdminProducts = async (): Promise<AdminProduct[]> => {
  const response = await api.get("/products");
  return extractData<AdminProduct[]>(response);
};

export const createCategory = async (payload: {
  name: string;
  image: File;
}): Promise<void> => {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("image", payload.image);

  await api.post("/categories", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createProduct = async (payload: {
  name: string;
  price: number;
  discount: number;
  stock: number;
  categoryId: string;
  mainImage: File;
}): Promise<void> => {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("price", String(payload.price));
  formData.append("discount", String(payload.discount));
  formData.append("stock", String(payload.stock));
  formData.append("categoryId", payload.categoryId);
  formData.append("mainImage", payload.mainImage);

  await api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
