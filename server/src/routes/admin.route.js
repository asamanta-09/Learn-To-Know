import { Router } from "express";
import { login, logout } from "../controllers/admin.controller.js";
import {authorized_admin} from "../middlewares/authorized_admin.middleware.js";

const router=Router();
router.post("/login",login);
router.post("/logout",authorized_admin,logout)
export default router;
