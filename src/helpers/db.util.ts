import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongodb = await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("MongoDB connected succesfully..");
  } catch (error) {
    console.log("Error in connecting to mongoDB server..");
  }
};
