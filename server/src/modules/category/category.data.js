import CategoryModel from "../../../database/models/category.model.js";
export const existsCategoryByName = async (name) => {
  const category = await CategoryModel.findOne({ name });
  return !!category;
};
export const createCategory = async (body) => {
  const category = new CategoryModel(body);
  await category.save();
  return category;
};

export const getAllCategories = async () => {
  return await CategoryModel.find({ status: "active" });
};

export const getCategoryByName = async (name) => {
  return await CategoryModel.findOne({ name, status: "active" });
};

export const existCategoryById = async (categoryId) => {
  return await CategoryModel.findOne({ _id: categoryId });
};

export const getCategoryById = async (id) => {
  return await CategoryModel.findById(id)
    .lean()
    .select("-_id -__v -createdAt -updatedAt");
};

export const updateCategory = async (id, body) => {
  return await CategoryModel.findByIdAndUpdate(id, body, { new: true });
};

export const deleteCategory = async (id) => {
  return await CategoryModel.findByIdAndDelete(id);
};
