import * as productService from "./product.service.js";
import { getPagination } from "../../utils/pagination/pagination.js";

export const createProduct = async (req, res, next) => {

  const result = await productService.createProduct(req.body, req.files);

  res.status(200).json({
    message: "Product data is valid",
    data: result,
  });
};

export const getAllProducts = async (req, res, next) => {
  const hasPaginationParams =
    typeof req.query.page !== "undefined" ||
    typeof req.query.limit !== "undefined";

  let productsData;

  if (hasPaginationParams) {
    const { page, limit, skip } = getPagination(req);
    productsData = await productService.getAllProducts(page, limit, skip);
  } else {
    productsData = await productService.getAllProducts();
  }

  res.status(200).json({
    message: "Products retrieved successfully",
    ...productsData,
  });
};
export const getProductById = async (req, res, next) => {
  const { id } = req.params;
  const product = await productService.getProductById(id);
  res.json({
    message: "Product retrieved successfully",
    data: product,
  });
};
export const updateProduct = async (req, res, next) => {
  const product = await productService.updateProduct(req.params.id, req.body);
  res.json({
    message: "Product updated successfully",
    product,
  });
};

export const deleteProduct = async (req, res, next) => {
  const deleted = await productService.deleteProduct(req.params.id);
  res.json({
    message: "Product deleted successfuly",
    data: deleted,
  });
};
