import express from "express";
import * as favoritController from "./favorit.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import authMiddleware from "../../middlewares/authMiddleWare.js";
import Roles from "../../../database/roles.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware([Roles.USER]),
  asyncHandler(favoritController.getFavorit)
);
router.post(
  "/",
  authMiddleware([Roles.USER]),
  asyncHandler(favoritController.addToFavorit)
);
router.delete(
  "/:productid",
  authMiddleware([Roles.USER]),
  asyncHandler(favoritController.removeFavorit)
);
router.delete(
  "/",
  authMiddleware([Roles.USER]),
  asyncHandler(favoritController.clearFavorit)
);

export default router;
