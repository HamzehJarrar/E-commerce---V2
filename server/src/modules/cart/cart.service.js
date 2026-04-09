import mongoose from "mongoose";
import * as cartData from "./cart.data.js";
import areAttributesEqual from "../../utils/areAttributesEqual.js";
import { AppError } from "../../utils/AppError.js";
import { getProductById } from "../product/product.data.js";

export const addToCart = async (userId, productData) => {
  const mongoId = new mongoose.Types.ObjectId(userId);
  let cart = await cartData.findCartByUserId(mongoId);

  const product = await getProductById(productData.productId);
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  if (product.discount) {
    productData.price = product.finalPrice;
  }else{
    productData.price = product.price;
  }

  if (!cart) {
    const newCart = await cartData.createCart(userId, productData);
    return newCart;
  }

  const productIndex = cart.products.findIndex((item) => {
    return (
      item.productId.toString() === productData.productId.toString() &&
      areAttributesEqual(item.attributes, productData.attributes)
    );
  });

  if (productIndex > -1) {
    return { status: "exists", message: "Product already in cart" };
  }

  cart.products.push(productData);

  const updatedCart = await cartData.pushProductToCart(cart);

  return updatedCart;
};

export const updateCart = async (userId, productCartId, qnt) => {
  const updated = await cartData.updateProductQuantity(
    userId,
    productCartId,
    qnt
  );
  if (!updated) {
    throw new AppError("Product not found in cart");
  }
  return updated;
};

export const removeFromCart = async (userId, productCartId, qnt) => {
  const removed = await cartData.removeProductFromCart(
    userId,
    productCartId,
    qnt
  );
  if (!removed) {
    throw new AppError("Product not found in cart");
  }
  return removed;
};
export const emptyCart = async (userId) => {
  const cleared = await cartData.clearCart(userId);
  return cleared;
};

export const getMyCart = async (userId) => {
  const cart = await cartData.getCart(userId);
  return cart || { cart: [] };
};
