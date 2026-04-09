import * as orderService from "./order.service.js";
import { getPagination } from "../../utils/pagination/pagination.js";

export const createOrder = async (req, res) => {
  const userId = req.user?.id || null;
  const { address, phone, payment, notes, products, customerName, username } =
    req.body;

  const order = await orderService.createOrder({
    userId,
    customerName: customerName || username || req.user?.userName,
    address,
    phone,
    payment,
    notes,
    products,
  });

  res.status(201).json({
    message: "Order created successfully",
    order,
  });
};

export const getUserOrders = async (req, res) => {
  const userId = req.user.id;
  const { skip, page, limit } = getPagination(req);
  const orders = await orderService.getUserOrders(userId, skip, page, limit);
  res.status(200).json({
    message: "User orders retrieved successfully",
    orders,
  });
};

export const getUserOrder = async (req, res) => {
  const userId = req.user.id;
  const orderId = req.params.id;
  const oreder = await orderService.getUserOrder(userId, orderId);
  res.status(200).json({
    message: "User order retrieved successfully",
    oreder,
  });
};

export const getAllOrders = async (req, res) => {
  const { skip, page, limit } = getPagination(req);
  const { status } = req.query; // optional
  const orders = await orderService.getAllOrders(status, skip, page, limit);
  res.status(200).json({
    message: "All orders retrieved successfully",
    ...orders,
  });
};
