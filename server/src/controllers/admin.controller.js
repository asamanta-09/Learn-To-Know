import 'dotenv/config';
import { sendMail } from '../utils/mail.js';
import {Admin} from "../models/admin.model.js";
import { generateAccessAndRefreshTokens } from '../utils/auth_service.js';


//login
export const login = async (req, res) => {
  try {
    console.log(req.body)
    let { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields carefully",
      });
    }

    username = username.trim().toLowerCase();
    password = password.trim();

    let admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    // Compare password securely using bcrypt
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    const role = "admin";
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens( Admin,admin._id,role);
    const loggedInAdmin = await Admin.findById(admin._id).select("-password -refreshToken");

    const options = {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "None",
    };

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options) // set refresh token in cookie
      .json({
        success: true,
        message: "User logged in successfully",
        accessToken, // send access token in response
        user: loggedInAdmin,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Login failure",
    });
  }
};

//logout
export const logout = async (req, res) => {
  try {
    // Find the user and clear the refresh token
    await Admin.findByIdAndUpdate(
      req.admin._id,
      { $set: { refreshToken: null } },
      { new: true }
    );

    // Clear the cookie
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    return res
      .status(200)
      .clearCookie("refreshToken", options) // clear the refresh token cookie
      .json({
        success: true,
        message: "Admin logged out successfully",
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Logout failure",
    });
  }
};

//refresh token
export const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No refresh token provided",
      });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify( incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET );
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Refresh token expired, please login again",
        });
      }
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const admin = await Admin.findById(decodedToken?._id);
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found",
      });
    }

    // Check if the refresh token matches the one stored in the database 
    if (admin?.refreshToken !== incomingRefreshToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid refresh token",
      });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens( Admin, admin._id );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    };

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        accessToken, 
      });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to refresh access token",
    });
  }
};

//generte OTP
const otpStore = new Map();
export const generateOTP = async (req, res) => {
  try {
    const { email, name } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    otpStore.set(email, { otp, otpExpiry });
    const subject = "StoryVerse : Verification OTP";
    const text = `Hi ${name},\nThis is a verification mail from StoryVerse.\n\nYour OTP is: ${otp}\nExpires in 10 minutes.`;
    await sendMail(email, subject, text);
    return res
      .status(200)
      .json({ success: true, message: "OTP sent successfully to your email" });
  } catch (error) {
    console.error("Error generating OTP:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send OTP" });
  }
};

//verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = otpStore.get(email);
    if (!record) {
      return res
        .status(404)
        .json({ success: false, message: "No OTP found for this email" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (record.otpExpiry < new Date()) {
      otpStore.delete(email);
      return res
        .status(400)
        .json({ success: false, message: "OTP has expired" });
    }
    otpStore.delete(email);
    res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, message: "Failed to verify OTP" });
  }
};

//password reset
export const passwordUpdate = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Unauthorized access",
      });
    }
    
    admin.password = password;;
    await admin.save();
    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};