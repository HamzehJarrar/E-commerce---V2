import * as favoritService from "./favorit.service.js";

export const getFavorit = async (req, res) => {
  const id = req.user.id;
  const favorits = await favoritService.getFavorit(id);
  res.status(200).json({
    message: "Favorit fetched successfully",
    data: favorits,
  });
};

export const addToFavorit = async (req, res) => {
  const id = req.user.id;
  const { productId } = req.body;
  const favorit = await favoritService.addToFavorit(id, productId);
  if (!favorit.success) {
    return res.status(400).json({
      message: favorit.message,
    });
  }
  res.status(201).json({
    message: "Product added to favorit",
    data: favorit,
  });
};

export const removeFavorit = async (req, res) => {
  const userId = req.user.id;
  const { productid } = req.params;
  const removed = await favoritService.removeFavorit(userId, productid);
  if (!removed.success) {
    return res.status(400).json({
      message: removed.message,
    });
  }
  res.status(200).json({
    message: "Product removed from favorit",
    data: removed,
  });
};

export const clearFavorit = async (req, res) => {
  const userId = req.user.id;
  const cleared = await favoritService.clearFavorit(userId);
  if (!cleared.success) {
    return res.status(400).json({
      message: cleared.message,
    });
  }
  res.status(200).json({
    message: "Favorit cleared successfully",
    data: cleared,
  });
};
