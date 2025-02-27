import mongoose from "mongoose";
import app from "../src/app";

const MONGODB_URI = process.env.MONGODB_URI as string;

mongoose.connect(MONGODB_URI).then(() => {
  console.log("Connected to MongoDB");
});

export default app;
