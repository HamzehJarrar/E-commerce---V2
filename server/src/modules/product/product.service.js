import * as productData from "./product.data.js";
import validateAttributesByCategory from "../../utils/validateAttributes.js";
import { AppError } from "../../utils/AppError.js";
import { getCategoryById } from "../category/category.data.js";
import { uploadToCloudinary } from "../../utils/images/cloudinary.js";

export const createProduct = async (data, files) => {
  if (data.categoryId) {
    data.category = data.categoryId;
    delete data.categoryId;
  }

  if (files?.mainImage?.[0]) {
    const { secure_url, public_id } = await uploadToCloudinary(
      files.mainImage[0].path,
      "products/main",
    );
    data.mainImage = { 
    url: secure_url,
    public_id, 
    name: files.mainImage[0].originalname, 
    type: files.mainImage[0].mimetype 
  };
  } else {
    throw new AppError("Main image is required", 400);
  }

  if (files?.subImages?.length > 0) {
    data.subimages = await Promise.all(
      files.subImages.map(async (file) => {
        const { secure_url, public_id } = await uploadToCloudinary(
          file.path,
          "products/sub",
        );
        return { secure_url, public_id };
      }),
    );
  }

  if (data.discount && data.discount > 0) {
    data.finalPrice = data.price * (1 - data.discount / 100);
  } else {
    data.finalPrice = data.price;
  }

  return await productData.createProduct(data);
};

export const getAllProducts = async (page, limit, skip) => {
  const shouldPaginate =
    typeof page === "number" &&
    typeof limit === "number" &&
    typeof skip === "number";

  const effectiveLimit = shouldPaginate ? limit : 0;
  const effectiveSkip = shouldPaginate ? skip : 0;

  const products = await productData.getAll(effectiveLimit, effectiveSkip);
  if (products.count === 0) {
    throw new AppError("No products found", 404);
  }

  if (!shouldPaginate) {
    return {
      data: products.result,
    };
  }

  return {
    pagination: {
      totalItems: products.count,
      totalPages: Math.ceil(products.count / limit),
      currentPage: page,
      limit,
    },
    data: products.result,
  };
};

export const getProductById = async (id) => {
  return await productData.getProductById(id);
};

export const updateProduct = async (id, body) => {
  const isExist = await productData.getProductById(id);
  if (!isExist) {
    throw new AppError("Product not found", 404);
  }
  if (body.category && body.attributes) {
    throw new AppError(
      "Cannot update category without changing attributes as well",
      400,
    );
  } else if (!body.category && body.attributes) {
    const isValid = await validateAttributesByCategory(
      isExist.category,
      body.attributes,
    );
    if (!isValid) {
      throw new AppError("Invalid product attributes", 400);
    }
  } else if (body.category && body.attributes) {
    const category = await getCategoryById(body.category);
    if (!category) {
      throw new AppError("Category not found", 404);
    }
    const isValid = await validateAttributesByCategory(
      body.category,
      body.attributes,
    );
    if (!isValid) {
      throw new AppError("Invalid product attributes", 400);
    }
  }
  if (body.discount) {
    const finalPrice = body.price * (1 - body.discount / 100);
    body.finalPrice = finalPrice;
  }
  const product = await productData.updateProduct(id, body);
  return product;
};

export const deleteProduct = async (id) => {
  const isExist = await productData.getProductById(id);
  if (!isExist) {
    throw new AppError("Product not found", 404);
  }
  return await productData.deleteProduct(id);
};
