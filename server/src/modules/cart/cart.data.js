import { CartModel } from "../../../database/models/cart.model.js";

export const findCartByUserId = async (userId) => {
  return await CartModel.findOne({ userId });
};

export const createCart = async (userId, product) => {
  return await CartModel.create({
    userId,
    products: [product],
  });
};

export const getCart = async (userId) => {
  return await CartModel.findOne({ userId })
    .select("-__v -_id -createdAt -updatedAt")
    .populate("products.productId", "name mainImage.url");
};

export const pushProductToCart = async (cart, product) => {
  return await cart.save();
};

export const updateProductQuantity = async (userId, productCartId, qnt) => {
  return await CartModel.findOneAndUpdate(
    { userId, "products._id": productCartId },
    {
      $set: { "products.$.qnt": qnt },
    },
    { new: true }
  );
};

export const removeProductFromCart = async (userId, productCartId) => {
  return await CartModel.findOneAndUpdate(
    { userId },
    { 
      $pull: { products: { _id: productCartId } }
    },
    { new: true }
  );
};

export const clearCart = async (userId) => {
  return await CartModel.updateOne(
    { userId },
    {
      $set: {
        products: [],
      },
    }
  );
};
