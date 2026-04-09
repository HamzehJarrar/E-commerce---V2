import { Router } from "express";
import * as controller from "./order.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import authMiddleware from "../../middlewares/authMiddleWare.js";
import Roles from "../../../database/roles.js";
const router = Router();

router.post("/", asyncHandler(controller.createOrder));

router.get(
  "/admin",
  authMiddleware([Roles.USER]),
  asyncHandler(controller.getAllOrders),
);

router.get(
  "/",
  authMiddleware([Roles.USER]),
  asyncHandler(controller.getUserOrders),
);

router.get(
  "/:id",
  authMiddleware([Roles.ADMIN, Roles.USER]),
  asyncHandler(controller.getUserOrder),
);

export default router;
