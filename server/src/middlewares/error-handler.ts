import StatusCodes from "http-status-codes";
import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  keyValue?: Record<string, any>;
  errors?: Record<string, any>;
}

const errorHandlerMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong, please try again later",
  };

  //mongoose errors
  //Duplicate fields
  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value entered for ${
      Object.keys(err.keyValue || {})[0]
    }: "${Object.values(err.keyValue || {})[0]}"`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  //validation errors for empty values
  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors || {})
      .map((item) => item.message)
      .join(",");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  //cast error for bad IDs
  if (err.name === "CastError") {
    customError.message = `No item found with id: ${err.keyValue || {}}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  res.status(customError.statusCode).json({
    status:
      customError.statusCode >= 400 && customError.statusCode < 500
        ? "fail"
        : "error",
    code: customError.statusCode,
    message: customError.message,
  });
};

export default errorHandlerMiddleware;
