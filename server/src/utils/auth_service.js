import "dotenv/config";
import jwt from "jsonwebtoken";

export function generateAccessToken(user,role) {
  const payload = {
    _id: user._id,
    email: user.email,
    name: user.name,
    role: role
  };
  const expiry = { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1hr" };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, expiry); //create and return the access token
}

export function generateRefreshToken(user,role) {
  const payload = { _id: user._id, role: role };
  const expiry = { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d" };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, expiry); //create and return the refresh token
}

export const generateAccessAndRefreshTokens = async (User, userId, role) => {
  try {
    const user = await User.findById(userId);
    const accessToken = generateAccessToken(user,role);
    const refreshToken = generateRefreshToken(user,role);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new Error(
      error.message || "Could not generate authentication tokens"
    );
  }
};
