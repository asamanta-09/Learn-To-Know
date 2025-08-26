import { Notes } from "../models/notes.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

//add new notes as pdf
export const addNewNote = async (req, res) => {
  try {
    const { topic, title } = req.body;

    if (!topic || !title) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const pdf_local_path = req.files?.pdf?.[0]?.path;
    if (!pdf_local_path) {
      return res.status(400).json({
        success: false,
        message: "PDF file is required",
      });
    }

    const image_local_path = req.files?.image?.[0]?.path;
    if (!image_local_path) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // Upload files to Cloudinary
    const content = await uploadOnCloudinary(pdf_local_path);
    let thumbnail = await uploadOnCloudinary(image_local_path);

    if (!content?.secure_url) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload PDF",
      });
    }

    if (!thumbnail?.secure_url) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload image",
      });
    }

    const notes = await Notes.create({
      topic,
      title,
      image: thumbnail.secure_url,
      pdf: content.secure_url,
    });

    res
      .status(201)
      .json({ success: true, message: "Note added successfully", notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to create note" });
  }
};

//fetch all notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find({});
    if (!notes.length) {
      return res
        .status(404)
        .json({ success: false, message: "No notes in database" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Notes fetched successfully", notes });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch notes" });
  }
};
