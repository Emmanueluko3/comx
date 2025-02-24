import mongoose from "mongoose";
import app from "../app";
import { VercelRequest, VercelResponse } from "@vercel/node";
import serverless from "serverless-http";

const MONGODB_URI = process.env.MONGODB_URI as string;

mongoose.connect(MONGODB_URI).then(() => {
  console.log("Connected to MongoDB");
});

const handler = serverless(app);

export default async (req: VercelRequest, res: VercelResponse) => {
  return handler(req, res);
};
