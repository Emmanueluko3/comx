import { Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

const COOKIE_MAX_AGE = 24 * 60 * 60 * 1000;
const ACCESS_TOKEN_EXPIRATION = 60 * 60 * 1000;
const MY_ACCESS_TOKEN = "MY_ACCESS_TOKEN";
const MY_REFRESH_TOKEN = "MY_REFRESH_TOKEN";

export const fetchDotEnv = (env: string | undefined): string => {
  if (!env) {
    throw new Error("Environment variable not found!");
  }
  return env;
};

export const createAccessToken = (email: string, userId: string) =>
  jwt.sign({ email: email, id: userId }, fetchDotEnv(process.env.JWT_SECRET), {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });

export const createRefreshToken = (email: string, userId: string) =>
  jwt.sign({ email: email, id: userId }, fetchDotEnv(process.env.JWT_SECRET), {
    expiresIn: "1d",
  });

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  res.cookie(MY_ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE,
    sameSite: "strict",
  });

  res.cookie(MY_REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    maxAge: ACCESS_TOKEN_EXPIRATION,
    sameSite: "strict",
  });
};

export const handleRefreshTokenRotation = async (user: any, cookie?: any) => {
  let newRefreshTokenArray = !cookie?.MY_REFRESH_TOKEN
    ? user.refreshToken
    : user.refreshToken.filter(
        (token: string) => token !== cookie?.MY_REFRESH_TOKEN
      );

  if (cookie?.MY_REFRESH_TOKEN) {
    const foundToken = await User.findOne({
      refreshToken: cookie.MY_REFRESH_TOKEN,
    }).exec();
    if (!foundToken) {
      console.log("Token reuse detected");
      newRefreshTokenArray = [];
    }
  }

  user.refreshToken = [...newRefreshTokenArray];
};
