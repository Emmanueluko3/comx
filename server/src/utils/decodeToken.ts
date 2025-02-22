import jwt from "jsonwebtoken";
import { fetchDotEnv } from "./helpers";

const decodeToken = (token: string) => {
  if (token) {
    try {
      const data = jwt.verify(token, fetchDotEnv(process.env.JWT_SECRET));

      if (data) {
        return data;
      }

      return false;
    } catch (e) {
      console.error(e);

      return false;
    }
  }

  return false;
};

export default decodeToken;
