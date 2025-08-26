import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
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
  },
  pdf: {
    type: String,
    required: true,
  },
});

export const Notes = mongoose.model("Notes", NoteSchema);
