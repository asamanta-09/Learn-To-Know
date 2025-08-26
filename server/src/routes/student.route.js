import { Router } from "express";
import { authorized_student } from "../middlewares/authorized_student.middleware.js";
import {login,signUp,verifyOTP,generateOTP,passwordUpdate, getProfileInfo,logout} from "../controllers/student.controller.js";

const router=Router();
router.post("/login",login);
router.post("/logout",authorized_student,logout);
router.post("/signUp",signUp);
router.post("/generateOTP",generateOTP);
router.post("/verifyOTP",verifyOTP);
router.patch("/passwordUpdate",passwordUpdate);
router.get("/getProfileInfo",authorized_student,getProfileInfo);

export default router;
