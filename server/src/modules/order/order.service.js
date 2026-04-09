import { AppError } from "../../utils/AppError.js";
import { getPaginationData } from "../../utils/pagination/pagination.js";
import { clearCart, getCart } from "../cart/cart.data.js";
import * as orderData from "./order.data.js";
import { getProductById } from "../product/product.data.js";

const buildProductsFromCart = (cartProducts) => {
  let totalPrice = 0;
  const products = cartProducts.map((item) => {
    const total = item.price * item.qnt;
    totalPrice += total;
    return {
      productId: item.productId,
      qnt: item.qnt,
      price: item.price,
      finalPrice: total,
    };
  });

  return { products, totalPrice };
};

const buildProductsFromRequest = async (inputProducts) => {
  if (!Array.isArray(inputProducts) || inputProducts.length === 0) {
    throw new AppError("Products are required", 400);
  }

  let totalPrice = 0;
  const products = [];

  for (const item of inputProducts) {
    const product = await getProductById(item.productId);
    if (!product)
      throw new AppError(`Product ${item.productId} not found`, 404);

    const qnt = Number(item.qnt) || 1;
    const unitPrice = product.discount ? product.finalPrice : product.price;
    const finalPrice = unitPrice * qnt;
    totalPrice += finalPrice;

    products.push({
      productId: product._id,
      qnt,
      price: unitPrice,
      finalPrice,
    });
  }
  return { products, totalPrice };
};

export const createOrder = async ({
  userId,
  customerName,
  address,
  phone,
  payment,
  notes,
  products: inputProducts,
}) => {
  if (!customerName?.trim()) {
    throw new AppError("Customer name is required", 400);
  }

  if (!address?.trim()) {
    throw new AppError("Address is required", 400);
  }

  if (!phone) {
    throw new AppError("Phone is required", 400);
  }

  let products = [];
  let totalPrice = 0;

  if (userId) {
    const cart = await getCart(userId);
    if (!cart || cart.products.length === 0) {
      throw new AppError("Cart is empty", 400);
    }

    const fromCart = buildProductsFromCart(cart.products);
    products = fromCart.products;
    totalPrice = fromCart.totalPrice;
  } else {
    const fromRequest = await buildProductsFromRequest(inputProducts);
    products = fromRequest.products;
    totalPrice = fromRequest.totalPrice;
  }

  const order = await orderData.createOrder({
    userId,
    customerName,
    product: products,
    totalPrice,
    address,
    phone: String(phone),
    notes: notes || "",
    payment,
  });

  if (userId) {
    await clearCart(userId);
  }

  return order;
};

export const getUserOrders = async (userId, skip, page, limit) => {
  const orders = await orderData.getUserOrders(userId, skip, page, limit);
  if (!orders) {
    throw new AppError("No orders found for this user", 404);
  }
  const data = getPaginationData(orders, page, limit);
  return { message: "success", data };
};

export const getUserOrder = async (userId, orderId) => {
  const oreder = await orderData.getUserOrder(userId, orderId);
  if (!oreder) {
    throw new AppError("No order found for this user", 404);
  }
  return { message: "success", oreder };
};
export const getAllOrders = async (status, skip, page, limit) => {
  const ordersData = await orderData.getAllOrders(status, skip, limit);
  if (!ordersData.orders.length) {
    throw new AppError("No orders found", 404);
  }
  const data = getPaginationData(ordersData, page, limit);
  return { message: "success", ...data };
};
