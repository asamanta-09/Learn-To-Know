import jwt from "jsonwebtoken";
import { Student } from "../models/student.model.js";

export const authorized_student = async (req, res, next) => {
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
    if (decodedToken.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Students only",
      });
    }

    const student = await Student.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!student) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found",
      });
    }

    req.student = student;
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
