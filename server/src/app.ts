import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnect";
import errorHandlerMiddleware from "./middlewares/error-handler";
import routeNotFound from "./middlewares/route-not-found";
dotenv.config();
const app = express();
const cors = require("cors");

connectDB(process.env.MONGODB_URI);

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  console.log("Home route requested");
  res.send("Welcome to comx server!");
});
app.use(errorHandlerMiddleware);
app.use(routeNotFound);

export default app;
