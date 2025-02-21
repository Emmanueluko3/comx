import mongoose from "mongoose";

const connectDB = async (url: string | undefined) => {
  if (!url) {
    throw new Error("MONGODB_URI is not defined in .env file");
  }

  try {
    await mongoose.connect(url);
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
