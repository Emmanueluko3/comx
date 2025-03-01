import CustomAPIError from "./custom-error";
import { StatusCodes } from "http-status-codes";

class NotFound extends CustomAPIError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFound;
