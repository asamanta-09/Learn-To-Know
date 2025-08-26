import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { authorized_admin } from "../middlewares/authorized_admin.middleware.js";
import {
  addNewPlaylist,
  getPlaylist,
} from "../controllers/playlist.controller.js";

const router = Router();
router.post("/create", upload.single("image"), addNewPlaylist);
router.get("/view", auth, getPlaylist);

export default router;
