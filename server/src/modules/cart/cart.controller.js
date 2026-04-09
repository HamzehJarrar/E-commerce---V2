import * as cartService from "./cart.service.js";

export const addToCart = async (req, res, next) => {
  const userId = req.user.id;
  const productData = req.body;
  const result = await cartService.addToCart(userId, productData);

  if (result.status === "exists") {
    return res.status(400).json({ message: result.message });
  }

  res.status(201).json({
    message: "Product added to cart successfully",
    data: result,
  });
};

export const updateCart = async (req, res, next) => {
  const userId = req.user.id;
  const data = req.body;
  const product = await cartService.updateCart(
    userId,
    data.productCartId,
    data.qnt
  );
  res.status(200).json({
    message: "Cart updated successfully",
    data: product,
  });
};

export const removeFromCart = async (req, res, next) => {
  const userId = req.user.id;
  const data = req.body;
  const product = await cartService.removeFromCart(userId, data.productCartId , data.qnt);
  res.status(200).json({
    message: "Product removed from cart successfully",
    data: product,
  });
};

export const clearCart = async (req, res, next) => {
  const id = req.user.id;
  await cartService.emptyCart(id);
  res.status(200).json({ message: "Cart cleared successfully" });
};

export const getMyCart = async (req, res, next) => {
  const cart = await cartService.getMyCart(req.user.id);
  res.status(200).json(cart);
};
