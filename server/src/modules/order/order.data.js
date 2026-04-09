import { orderModel } from "../../../database/models/oreder.model.js";

export const createOrder = async (data) => {
  return await orderModel.create(data);
};

export const getUserOrders = async (userId, skip, page, limit) => {
  const count = await orderModel.countDocuments({ userId });
  const oreders = await orderModel
    .find({ userId })
    .populate("product.productId", "name mainImage.url")
    .skip(skip)
    .limit(limit);
  return { total: count, page, limit, orders: oreders };
};

export const getUserOrder = async (userId, orderId) => {
  return await orderModel.findOne({ userId, _id: orderId });
};

export const getAllOrders = async (status, skip, limit) => {
  const count = await orderModel.countDocuments({ status });
  const orders = await orderModel
    .find({ status })
    .select("-updatedAt -__v")
    .skip(skip)
    .limit(limit);
  return { count, orders };
};
