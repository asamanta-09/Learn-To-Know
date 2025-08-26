import mongoose from 'mongoose';

const PlaylistSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  title:{
    type:String,
    required:true,
  },
  image:{
    type:String,
    required:true,
  },
  youtube_link: {
    type: String,
    required: true,
  },
});

export const Playlist = mongoose.model("Playlist", PlaylistSchema);
