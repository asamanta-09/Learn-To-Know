import "dotenv/config";
import express from "express"; // Import express
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/database.js";

// Initialize the Express app
const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to the database
connectDB();

// Route imports
import student from "./routes/student.route.js";
import teacher from "./routes/teacher.route.js";
import course from "./routes/course.route.js";
import admin from "./routes/admin.route.js";
import notes from "./routes/notes.route.js";
import playlist from "./routes/playlist.route.js";

// Basic root route
app.get("/", (req, res) => {
  res.send("Welcome to the LearnToKnow..");
});

// Route middleware
app.use("/student", student);
app.use("/teacher", teacher);
app.use("/course", course);
app.use("/admin", admin);
app.use("/notes", notes);
app.use("/playlist", playlist);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
