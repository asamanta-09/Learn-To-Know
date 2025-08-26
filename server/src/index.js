import "dotenv/config";
import { app } from "./app.js";
import connectDB from "./db/database.js";

connectDB().catch((err) => {
  console.error("Database connection failed on startup:", err);
  process.exit(1);
});

export default app;