import "dotenv/config";
import { Student } from "../models/student.model.js";
import { sendMail } from "../utils/mail.js";
import { generateAccessAndRefreshTokens } from "../utils/auth_service.js";
import jwt from "jsonwebtoken";

//signup
export const signUp = async (req, res) => {
  try {
    //get data
    let {name,email,phone_no,gender,dob,about,profession,institution,course_or_job_role,academic_details,password,} = req.body;

    if(!name || !email || !phone_no || !gender || !dob || !password){
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields carefully",
      });
    }
 
    email = email.trim().toLowerCase();
    password = password.trim();

    //check if the user already exists
    const existing_student = await Student.findOne({ email });
    if (existing_student) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
   
    //create the user
    const student=await Student.create({name,email,phone_no,gender,dob,about,profession,institution,course_or_job_role,academic_details,password});
    const createdStudent = await Student.findById(student._id).select("-password -refreshToken");
    if (!createdStudent) {
      return res.status(500).json({
        success: false,
        message: "Student registration failed",
      });
    }
    
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: createdStudent,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Student cannot be registered, please try again later",
    });
  }
};

//login
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields carefully",
      });
    }

    email = email.trim().toLowerCase();
    password = password.trim();

    let student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({
        success: false,
        message: "Student is not registered",
      });
    }

    // Compare password securely using bcrypt
    const isPasswordValid = await student.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid student credentials",
      });
    }

    const role = "student";
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      Student,
      student._id,
      role
    );
    const loggedInUser = await Student.findById(student._id).select("-password -refreshToken");

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
        student: loggedInUser,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Login failure",
    });
  }
};


// Refresh access token
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

    const student = await Student.findById(decodedToken?._id);
    if (!student) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found",
      });
    }

    // Check if the refresh token matches the one stored in the database 
    if (student?.refreshToken !== incomingRefreshToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid refresh token",
      });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens( Student, student._id );

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


//logout
export const logout = async (req, res) => {
  try {
    // Find the user and clear the refresh token
    await Student.findByIdAndUpdate(
      req.student._id,
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
        message: "User logged out successfully",
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Logout failure",
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
    const subject = "LearnToKnow : Verification OTP";
    const text = `Hi ${name},\nThis is a verification mail from LearnToKnow.\n\nYour OTP is: ${otp}\nExpires in 10 minutes.`;
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
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    
    student.password = password;
    await student.save();
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

//getProfileInfo
export const getProfileInfo = async (req, res) => {
  const { email } = req.query;
  try {
    const student = await Student.findOne({ email }).select("-password -refreshToken");
    if (!student) {
      console.log("Student not found for the email");
      return res.json({
        success: false,
        message: "Student not found",
      });
    }
    return res.status(200).json({
      success: true,
      student: student,
    });
  } catch (error) {
    console.error("Error fetching profile info:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
