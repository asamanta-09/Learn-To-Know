import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
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
    req.user = decodedToken;
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
