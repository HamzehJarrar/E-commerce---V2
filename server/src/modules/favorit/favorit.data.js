import { favoriteModel } from "../../../database/models/favorite.model.js";

export const getFavoritByUserId = async (userId) => {
  return await favoriteModel.findOne({ userId });
};

export const getMyFavorit = async (userId) => {
  return await favoriteModel.findOne({ userId }).populate({
    path: "products",
    select: "name price finalPrice stock mainImage",
  });
};
export const isAddedToFavorit = async (userId, productId) => {
  return await favoriteModel.findOne({ userId, products: productId });
};
export const createFavoritForUser = async (userId) => {
  return await favoriteModel.create({ userId, products: [] });
};

export const addProductToFavorit = async (userId, productId) => {
  return await favoriteModel.findOneAndUpdate(
    { userId },
    { $addToSet: { products: productId } },
    { new: true }
  );
};

export const removeProductFromFavorit = async (userId, productId) => {
  return await favoriteModel.findOneAndUpdate(
    { userId },
    { $pull: { products: productId } },
    { new: true }
  );
};

export const clearFavorit = async (userId) => {
    return await favoriteModel.findOneAndUpdate(
      { userId },
      { $set: { products: [] } },
      { new: true }
    );
};
