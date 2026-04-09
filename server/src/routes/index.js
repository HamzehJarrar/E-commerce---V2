import globalErrorHandler from "../middlewares/error.middleware.js";
import authRouter from "../modules/auth/auth.router.js";
import categoryRouter from "../modules/category/category.router.js";
import productRouter from "../modules/product/product.router.js";
import cartRouter from "../modules/cart/cart.router.js";
import favoritRouter from "../modules/favorit/favorit.router.js";
import orderRouter from "../modules/order/order.router.js";
const init = (express, app) => {
  app.use(express.json());
  app.use("/uploads", express.static("uploads"));
  app.use("/api/auth", authRouter);
  app.use("/api/categories", categoryRouter);
  app.use("/api/products", productRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/favorites", favoritRouter);
  app.use("/api/orders", orderRouter);
  app.use(globalErrorHandler);
};

export default init;
