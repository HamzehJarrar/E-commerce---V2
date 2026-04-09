import { Router } from "express";
import * as controller from "./cart.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import authMiddleware from "../../middlewares/authMiddleWare.js";
import Roles from "../../../database/roles.js";

const router = Router();

router.post(
  "/add",
  authMiddleware([Roles.USER]),
  asyncHandler(controller.addToCart)
);

router.patch(
  "/update-quantity",
  authMiddleware([Roles.USER]),
  asyncHandler(controller.updateCart)
);

router.delete(
  "/remove",
  authMiddleware([Roles.USER]),
  asyncHandler(controller.removeFromCart)
);

router.delete(
  "/clear",
  authMiddleware([Roles.USER]),
  asyncHandler(controller.clearCart)
);

router.get(
  "/",
  authMiddleware([Roles.USER]),
  asyncHandler(controller.getMyCart)
);
export default router;
