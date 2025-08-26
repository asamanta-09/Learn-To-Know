import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js";
import {authorized_teacher} from "../middlewares/authorized_teacher.middleware.js";
import {getOnlineCourses,getOfflineCourses,getOnlineCoursesByTeacher,getOfflineCoursesByTeacher,createCourse,getEnrollmentsByTopic} from "../controllers/course.controller.js";


const router=Router();
router.post("/createCourse",authorized_teacher, upload.single('thumbnail'), createCourse);
router.get("/getOnlineCourses",auth,getOnlineCourses);
router.get("/getOfflineCourses",auth,getOfflineCourses);
router.post("/getOnlineCoursesByTeacher",auth,getOnlineCoursesByTeacher);
router.post("/getOfflineCoursesByTeacher",auth,getOfflineCoursesByTeacher);
router.get("/:email/course-enrollments-by-topic", auth,getEnrollmentsByTopic);

export default router;
