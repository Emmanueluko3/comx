import { Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

const COOKIE_MAX_AGE = 24 * 60 * 60 * 1000;
const ACCESS_TOKEN_EXPIRATION = 60 * 60 * 1000;

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
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE,
    sameSite: "strict",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: ACCESS_TOKEN_EXPIRATION,
    sameSite: "strict",
  });
};

export const handleRefreshTokenRotation = async (user: any, cookie?: any) => {
  let newRefreshTokenArray = !cookie?.refreshToken
    ? user.refreshToken
    : user.refreshToken.filter(
        (token: string) => token !== cookie?.refreshToken
      );

  if (cookie?.refreshToken) {
    const foundToken = await User.findOne({
      refreshToken: cookie.refreshToken,
    }).exec();
    if (!foundToken) {
      console.log("Token reuse detected");
      newRefreshTokenArray = [];
    }
  }

  user.refreshToken = [...newRefreshTokenArray];
};
