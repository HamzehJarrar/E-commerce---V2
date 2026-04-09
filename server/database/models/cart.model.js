import mongoose from "mongoose";

const productInCart = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    qnt: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    attributes: {
      type: Map,
      of: String,
      default: {},
    },
  },
  { _id: true }
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [productInCart],
  },
  {
    timestamps: true,
  }
);

export const CartModel = mongoose.model("Cart", cartSchema);
