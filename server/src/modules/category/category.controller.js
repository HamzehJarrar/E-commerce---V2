import * as service from "./category.service.js";
import { AppError } from "../../utils/AppError.js";


const createCategory = async (req, res, next) => {
  if (!req.file) {
    return next(new AppError("Image is required", 400));
  }
  const category = await service.createCategory(req.body, req.file);
  res.status(201).json({
    message: "Category created successfully",
    data: category,
  });
};

const getAllCategories = async (req, res, next) => {
  const categories = await service.getAllCategories();

  res.status(200).json({
    message: "Categories fetched successfully",
    data: categories,
  });
};

const getCategoryById = async (req, res, next) => {
  const category = await service.getCategoryById(req.params.id);
  return res.status(200).json({
    message: "Category fetched successfully",
    data: category,
  });
};

const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;
  const file = req.file;
  const updatedDataCategory = await service.updateCategory(id, updatedData, file);
  return res.status(200).json({
    message: "Category updated successfully",
    data: updatedDataCategory,
  });
};

const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  const deleteCate = await service.deleteCategory(id);
  return res.status(200).json({
    message: "Category deleted successfully",
  });
};
export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
