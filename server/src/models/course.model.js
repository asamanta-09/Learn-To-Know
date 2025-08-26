import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  course_title: { type: String, required: true },
  topic: { type: String, required: true },
  mode: { type: String, enum: ['online', 'offline', 'hybrid'], required: true },
  starting_date: { type: Date, required: true },
  duration: { type: String, required: true },
  course_overview: { type: String },
  course_level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  outcomes: { type: [String], default: [] },
  topics_covered: { type: [String], default: [] },
  prerequisite: { type: [String], default: [] },
  demovideo: { type: String },
  thumbnail: { type: String },
  created_by: { type: [String], required: true },
  persued_by: { type: [String], default: [] }
}, { timestamps: true });

export const Course = mongoose.model('Course', CourseSchema);
