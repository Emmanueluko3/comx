import StatusCodes from "http-status-codes";
import { Request, Response } from "express";

const routeNotFound = async (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ status: StatusCodes.NOT_FOUND, message: "Route does not exist" });
};

export default routeNotFound;
