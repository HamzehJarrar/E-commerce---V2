import jwt from "jsonwebtoken";
import { findUserByEmail } from "../modules/auth/auth.data.js";
import { AppError } from "../utils/AppError.js";

const authMiddlewareJWT = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return next(new AppError("Token not found", 401));
      }

      const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await findUserByEmail(decoded.email);
      if (!user) {
        return next(new AppError("User not found", 401));
      }

      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return next(new AppError("Forbidden", 403));
      }

      req.user = user;
      next();
    } catch (err) {
      if (
        err.name === "JsonWebTokenError" ||
        err.name === "TokenExpiredError"
      ) {
        return next(new AppError("Invalid or expired token", 401));
      }
      next(err);
    }
  };
};

export const protect = authMiddlewareJWT();
export default authMiddlewareJWT;
