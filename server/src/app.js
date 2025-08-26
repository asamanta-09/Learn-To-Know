// import "dotenv/config";
// import cors from "cors";
// import express from "express";
// import cookieParser from "cookie-parser";

// const app = express();

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   })
// );

// app.use(express.json({ limit: "10mb" })); //this middleware will automatically parse that JSON string into a JavaScript object. and limit the size of the JSON payload to 10mb which is optional
// app.use(express.urlencoded({ extended: true, limit: "10mb" })); //this middleware will parse the URL-encoded data and make it available in req.body
// app.use(express.static("public")); //this middleware will serve static files from the public directory
// app.use(cookieParser()); //this middleware will parse cookies attached to the client request object

// import student from "./routes/student.route.js";
// import teacher from "./routes/teacher.route.js";
// import course from "./routes/course.route.js";
// import admin from "./routes/admin.route.js";
// import notes from "./routes/notes.route.js";
// import playlist from "./routes/playlist.route.js";

// app.get("/", (req, res) => {
//   res.send("Server is working 🚀");
// });

// app.use("/student", student);
// app.use("/teacher", teacher);
// app.use("/course", course);
// app.use("/admin", admin);
// app.use("/notes", notes);
// app.use("/playlist", playlist);

// export { app };
