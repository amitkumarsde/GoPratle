import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB connected");
  } catch (error: any) {
    // Exit with an error code so Render knows the start failed
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
