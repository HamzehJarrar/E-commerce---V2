import * as favoritData from "./favorit.data.js";

export const getFavorit = async (userId) => {
  const fav = await favoritData.getFavoritByUserId(userId);
  if (!fav) {
    return {
      success: false,
      message: "No favorit found for this user",
      favorit: null,
    };
  }
  const favorit = await favoritData.getMyFavorit(userId);
  return {
    success: true,
    favorit,
  };
};

export const addToFavorit = async (userId, productId) => {
  let favorit = await favoritData.getFavoritByUserId(userId);
  if (!favorit) {
    favorit = await favoritData.createFavoritForUser(userId);
  }
  const isAdded = await favoritData.isAddedToFavorit(userId, productId);
  if (isAdded) {
    return {
      success: false,
      message: "Product already in favorit",
      favorit,
    };
  }
  const updatedFavorit = await favoritData.addProductToFavorit(
    userId,
    productId
  );
  return {
    success: true,
    favorit: updatedFavorit,
  };
};

export const removeFavorit = async (userId, productId) => {
  const favorit = await favoritData.getFavoritByUserId(userId);
  if (!favorit) {
    return {
      success: false,
      message: "No favorit found for this user",
      favorit: null,
    };
  }
  const removedFavorit = await favoritData.removeProductFromFavorit(
    userId,
    productId
  );
  return {
    success: true,
    message: "Product removed from favorit",
    favorit: removedFavorit,
  };
};

export const clearFavorit = async (userId) => {
  const cleared = await favoritData.clearFavorit(userId);
  return {
    success: true,
    message: "Favorit cleared successfully",
    favorit: cleared,
  };
};
