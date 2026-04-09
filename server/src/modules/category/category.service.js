import * as data from "./category.data.js";
import { AppError } from "../../utils/AppError.js";
import { uploadToCloudinary } from "../../utils/images/cloudinary.js";
import cloudinary from "../../utils/images/cloudinary.js";

export const createCategory = async (body, file) => {
  const exist = await data.existsCategoryByName(body.name);
  if (exist) throw new AppError("Category already exists", 400);

  if (file) {
    const { secure_url, public_id } = await uploadToCloudinary(
      file.path,
      "categories",
    );
    body.image = { 
      url: secure_url,      
      public_id: public_id,
      name: file.originalname,
      type: file.mimetype      
    };
  }

  return await data.createCategory(body);
};

export const getAllCategories = async () => {
  const categories = await data.getAllCategories();
  if (!categories || categories.length === 0) {
    throw new AppError("No categories found", 404);
  }
  return categories;
};

export const getCategoryById = async (id) => {
  const category = await data.getCategoryById(id);

  if (!category) {
    throw new AppError("Category not found", 404);
  }
  return category;
};

export const updateCategory = async (id, body, file) => {
  const category = await data.existCategoryById(id);
  if (!category) throw new AppError("Category not found", 404);

  if (file) {
    const { secure_url, public_id } = await uploadToCloudinary(
      file.path,
      "categories",
    );

    if (category.image?.public_id) {
      await cloudinary.uploader.destroy(category.image.public_id);
    }

    body.image = { secure_url, public_id };
  }

  const updated = await data.updateCategory(id, body);
  if (!updated) throw new AppError("Something Went Wrong", 400);

  return updated;
};

export const deleteCategory = async (id) => {
  const category = await data.existCategoryById(id);
  if (!category) throw new AppError("Category not found", 404);

  if (category.image?.public_id) {
    await cloudinary.uploader.destroy(category.image.public_id);
  }

  const deleted = await data.deleteCategory(id);
  if (!deleted) throw new AppError("Something Went Wrong", 400);

  return deleted;
};
