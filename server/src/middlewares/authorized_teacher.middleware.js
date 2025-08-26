import jwt from "jsonwebtoken";
import { Teacher } from "../models/teacher.model.js";

export const authorized_teacher = async (req, res, next) => {
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
    if (decodedToken.role !== "teacher") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Teachers only",
      });
    }

    const teacher = await Teacher.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!teacher) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found",
      });
    }

    req.teacher = teacher;
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
