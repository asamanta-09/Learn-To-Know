import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";

export const authorized_admin = async (req, res, next) => {
  try {
    const rawAuth = req.header("Authorization");
    const token = rawAuth?.startsWith("Bearer ") ? rawAuth.replace("Bearer ", "") : null;
    if (!token || token === "null" || token === "undefined") {
        return res.status(401).json({
        success: false,
        message: "Unauthorized: No access token provided",
      });
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decodedToken.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admins only",
      });
    }

    const admin = await Admin.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found",
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token expired",
      });
    }
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid access token",
    });
  }
};
