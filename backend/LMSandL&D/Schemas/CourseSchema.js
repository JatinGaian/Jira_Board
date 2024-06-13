const mongoose = require("mongoose");

// Define the Chapter schema
const ChapterSchema = new mongoose.Schema({
  url: { type: String, required: true },
  name: { type: String, required: true },
  pausedTime: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
});

// Define the Course schema
const CourseSchema = new mongoose.Schema({
  EmployeeID: { type: String, required: true },
  banner: { type: String, required: true },
  chapter: { type: [ChapterSchema], required: true },
  demourl: { type: String, required: true },
  description: { type: String, required: true },
  free: { type: Boolean, default: false },
  id: { type: Number, required: true },
  name: { type: String, required: true },
  sourcecode: { type: String, required: true },
  tags: { type: [String], required: true },
  totalchapters: { type: Number, required: true },
  status: { type: Boolean, default: false },
  watchedChapters: { type: Number, default: 0 },
});

// Create the Course model
const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
