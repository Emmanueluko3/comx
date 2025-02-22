import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/dbConnect";
// middlewares
import errorHandlerMiddleware from "./middlewares/error-handler";
import routeNotFound from "./middlewares/route-not-found";
import verifyJWT from "./middlewares/verifyJWT";

import authRouter from "./routes/auth.route";

dotenv.config();
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "50mb", extended: false }));
const cors = require("cors");
app.use(cors());

connectDB(process.env.MONGODB_URI);

app.get("/", (req: Request, res: Response) => {
  console.log("Home route requested");
  res.send("Welcome to comx server!");
});

app.use("/api/v1/auth", authRouter);
app.use(verifyJWT);

// Other routes

app.use(errorHandlerMiddleware);
app.use(routeNotFound);

export default app;
