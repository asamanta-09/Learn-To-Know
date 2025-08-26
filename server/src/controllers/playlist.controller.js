import {Playlist} from "../models/playlist.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

//create the new playlist
export const addNewPlaylist = async (req, res) => {
  const { topic, title, youtube_link } = req.body;

  if (!topic || !title || !youtube_link) {
    return res.status(400).json({
      success: false,   
      message: "All fields are required",
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
        message: "Failed to upload audio",
      });
    }

  
  try {
    const course = await Playlist.create({ topic,title , image: thumbnail.url ,youtube_link });
    res.status(201).json({
      success: true,
      message: "Reference added successfully",
      course,
    });
  } catch (error) {
    res
    .status(500)
    .json({ success: false, message: "Failed to create reference" });
  }
  
};

//get the playlist reference
export const getPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.find({});
    if (!playlist.length) {
      return res
        .status(404)
        .json({ success: false, message: "No playlist in database" });
    }
    return res.status(200).json({
      success: true,
      message: "Playlists fetched successfully",
      playlist,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch playlists" });
  }
};
