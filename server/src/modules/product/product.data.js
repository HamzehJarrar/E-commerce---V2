import productModel from "../../../database/models/product.model.js";

  export const createProduct = async (data) => {
    return await productModel.create(data);
  };

export const getAll = async (limit, skip) => {
  const query = productModel.find().populate("category", "name -_id");

  if (typeof skip === "number" && skip > 0) {
    query.skip(skip);
  }

  if (typeof limit === "number" && limit > 0) {
    query.limit(limit);
  }

  const products = await query;
  const count = await productModel.countDocuments();

  return {
    count,
    result: products,
  };
};

export const getProductById = async (id) => {
  return await productModel.findById(id).populate("category", "name -_id");
};

export const updateProduct = async (id, body) => {
  return await productModel.findByIdAndUpdate(id, body, { new: true });
};

export const deleteProduct = async (id) => {
  return await productModel
    .findByIdAndDelete(id)
    .populate("category", "name -_id")
    .lean();
};
