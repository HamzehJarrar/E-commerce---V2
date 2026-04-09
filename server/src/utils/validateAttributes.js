import { getCategoryById } from "../modules/category/category.service.js";
import { AppError } from "../utils/AppError.js";
export default async function validateAttributesByCategory(
  categoryId,
  productAttributes
) {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new AppError("Category not found", 404);
  }
  const attributesByName = {};
  category.attributes.forEach((attr) => {
    attributesByName[attr.name.toLowerCase().trim()] = attr;
  });
  for (const attr of productAttributes) {
    const categoryAttribute = attributesByName[attr.name.toLowerCase().trim()];
    if (!categoryAttribute) {
      throw new AppError(
        `Attribute ${attr.name} is not valid for category ${category.name}`,
        400
      );
    } else {
      const values = Array.isArray(attr.value) ? attr.value : [attr.value];
      if (!Array.isArray(values)) return false;
      for (const value of values) {
        if (categoryAttribute.type === "string" && typeof value !== "string")
          return false;
        if (categoryAttribute.type === "number" && typeof value !== "number")
          return false;
        if (categoryAttribute.type === "enum") {
          if (categoryAttribute.allowCustomValue) {
            if (typeof value !== "string") return false;
          } else {
            if (!categoryAttribute.values.includes(value)) return false;
          }
        }
      }
    }
  }
  return true;
}
