import { AppError } from "../AppError.js";

export default function buildOrderArray(
  sortByRaw,
  orderRaw,
  allowedColumns = []
) {
  const sortBy = (sortByRaw || "createdAt").split(",");
  const order = (orderRaw || "DESC").split(",");

  const orderArray = [];
  const invalidColumns = [];

  sortBy.forEach((col, index) => {
    const trimmedCol = col.trim();
    if (!allowedColumns.includes(trimmedCol)) {
      return;
    }
    const dir = (order[index] || "DESC").toUpperCase();

    if (!["ASC", "DESC"].includes(dir)) {
      return;
    }
    orderArray.push([trimmedCol, dir]);
  });

  if (invalidColumns.length > 0) {
    throw new AppError("Invalid sort columns", 400);
  }

  if (orderArray.length === 0) {
    orderArray.push(["createdAt", "DESC"]);
  }

  return orderArray;
}
