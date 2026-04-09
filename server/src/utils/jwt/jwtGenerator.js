import jwt from "jsonwebtoken";

export const jwtGenerator = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
};
