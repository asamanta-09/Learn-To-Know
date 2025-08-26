import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filepath) => {
  try {
    if (!filepath) {
      throw new Error("No file provided for upload");
    }

    const response = await cloudinary.uploader.upload(filepath, {
      folder: "learntoknow",
      resource_type: "auto",
    });
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error.message);

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
    throw error;
  }
};

export { uploadOnCloudinary };
export default cloudinary;
