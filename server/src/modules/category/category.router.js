import { Router } from "express";
import * as controller from "./category.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import authMiddleware from "../../middlewares/authMiddleWare.js";
import Roles from "../../../database/roles.js";
import { upload } from "../../utils/images/multer.js";

const router = Router();

router.post(
  "/",
  authMiddleware([Roles.ADMIN]),
  upload.single("image"),
  asyncHandler(controller.createCategory),
);

router.get("/", asyncHandler(controller.getAllCategories));

router.get("/:id", asyncHandler(controller.getCategoryById));

router.put(
  "/:id",
  authMiddleware([Roles.ADMIN]),
  upload.single("image"),
  asyncHandler(controller.updateCategory),
);

router.delete(
  "/:id",
  authMiddleware([Roles.ADMIN]),
  asyncHandler(controller.deleteCategory),
);

export default router;
