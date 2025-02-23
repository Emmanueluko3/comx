import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { UnauthorizedError } from "../errors";
import decodeToken from "../utils/decodeToken";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import { StatusCodes } from "http-status-codes";

export interface AuthRequest extends Request {
  user?: any;
  id?: any;
}
const verifyJWT = asyncErrorHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader =
      (req.headers.authorization as string) ||
      (req.headers.Authorization as string);

    if (!authHeader?.startsWith("Bearer ")) {
      throw new UnauthorizedError("Invalid access token, authorization denied");
    }
    const accessToken = authHeader.split(" ")[1];

    const verifyToken: any = decodeToken(accessToken);

    console.log(verifyToken);

    if (verifyToken) {
      const user: any = await User.findOne({ email: verifyToken.email });
      req.user = user;
      req.id = user._id;

      return next();
    }

    return res.status(StatusCodes.FORBIDDEN).json("Bad Access Token");
  }
);
export default verifyJWT;
