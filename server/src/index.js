import "dotenv/config";
import { app } from "./app.js";
import connectDB from "./db/database.js";

connectDB()
  .then(() => {
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
