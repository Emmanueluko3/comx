import CustomAPIError from "./custom-error";
import { StatusCodes } from "http-status-codes";

class InternalServerError extends CustomAPIError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

export default InternalServerError;
