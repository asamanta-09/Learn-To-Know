import { Course } from "../models/course.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

//add a new course to the database -by teacher
export const createCourse = async (req, res) => {
  try {
    const {
      course_title,
      topic,
      mode,
      starting_date,
      duration,
      course_overview,
      course_level,
      outcomes,
      topics_covered,
      prerequisite,
      demovideo,
      email,
    } = req.body;

    if (
      !course_title ||
      !topic ||
      !mode ||
      !starting_date ||
      !duration ||
      !course_level ||
      !email
    ) {
      return res.status(400).json({
        success: false,
        message: "Fill required all fields",
      });
    }

    const thumbnail_local_path = req.file?.path;
    if (!thumbnail_local_path) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail file is required",
      });
    }

    // Upload files to Cloudinary
    const thumbnail = await uploadOnCloudinary(thumbnail_local_path);

    if (!thumbnail?.url) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload thumbnail",
      });
    }

    const course = await Course.create({
      course_title,
      topic,
      mode,
      starting_date,
      duration,
      course_overview,
      course_level,
      outcomes,
      topics_covered,
      prerequisite,
      demovideo,
      thumbnail: thumbnail.url,
      created_by: email,
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error("Error in createCourse:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

//get all the online courses - for students
export const getOnlineCourses = async (req, res) => {
  try {
    const course = await Course.find({ mode: "online" });
    return res.status(200).json({
      message: true,
      course,
    });
  } catch (err) {
    return res.status(500).json({ message: false, error: err.message });
  }
};

//get all the offline courses - for students
export const getOfflineCourses = async (req, res) => {
  try {
    const course = await Course.find({ mode: "offline" });
    return res.status(200).json({
      message: true,
      course,
    });
  } catch (err) {
    return res.status(500).json({ message: false, error: err.message });
  }
};

// In the teacher home - provided online courses
export const getOnlineCoursesByTeacher = async (req, res) => {
  const email = req.body.email;
  try {
    const courses = await Course.find({ mode: "online", created_by: email });
    if (courses.length === 0) {
      return res
        .status(404)
        .json({ message: "No online courses found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Successfully fetched", success: true, courses });
  } catch (err) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// In the teacher home - provided offline courses
export const getOfflineCoursesByTeacher = async (req, res) => {
  const email = req.body.email;
  try {
    const courses = await Course.find({ mode: "offline", created_by: email });
    if (courses.length === 0) {
      console.log("No offline courses found");
      return res
        .status(404)
        .json({ message: "No offline courses found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Successfully fetched", success: true, courses });
  } catch (err) {
    console.error("Error fetching offline courses:", err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

//get the no of students by topic - teasches by teacher
export const getEnrollmentsByTopic = async (req, res) => {
  try {
    const { email } = req.params;

    const result = await Course.aggregate([
      { $match: { created_by: { $in: [email] } } },
      {
        $group: {
          _id: "$topic",
          studentCount: { $sum: { $size: "$persued_by" } },
        },
      },
      {
        $project: {
          _id: 0,
          topic: "$_id",
          studentCount: 1,
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    console.error("Error in aggregation:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};
