import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { authorized_teacher } from "../middlewares/authorized_teacher.middleware.js";
import {login,logout,signUp,generateOTP,verifyOTP,passwordUpdate,getProfileInfo,getTeacherInfoByEmail} from "../controllers/teacher.controller.js";

const router=Router();
router.post("/login",login);
router.post("/logout",authorized_teacher,logout);
router.post("/signUp",signUp);
router.post("/generateOTP",generateOTP);
router.post("/verifyOTP",verifyOTP);
router.post("/passwordUpdate",passwordUpdate);
router.get("/getProfileInfo",authorized_teacher,getProfileInfo);
router.get("/getTeacherDetails",auth, getTeacherInfoByEmail);

export default router;
