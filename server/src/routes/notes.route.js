import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { addNewNote, getNotes } from "../controllers/notes.controller.js";
import { authorized_admin } from "../middlewares/authorized_admin.middleware.js";

const router = Router();
router.post(
  "/create",
  authorized_admin,
  upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  addNewNote
);
router.get("/view", auth, getNotes);

export default router;
