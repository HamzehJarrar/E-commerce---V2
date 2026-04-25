import api from "./axios";

export interface Category {
  _id: string;
  name: string;
}

export async function getCategories(): Promise<Category[]> {
  const response = await api.get("/categories");
  return response.data.data as Category[];
}
