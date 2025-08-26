import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(`MongoDB connected successfully to database : ${process.env.DB_NAME}`);
    console.log(`Database Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDB;
