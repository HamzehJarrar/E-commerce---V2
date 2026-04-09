import mongoose from "mongoose";

const favSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timeseries: true,
  }
);
export const favoriteModel = mongoose.model("Favorite", favSchema);
