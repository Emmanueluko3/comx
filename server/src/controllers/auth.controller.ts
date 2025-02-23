import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthorizedError } from "./../errors";
import User from "../models/user.model";
import {
  createCorporateUserSchema,
  createIndividualUserSchema,
  loginUserSchema,
  verifyUserOTPSchema,
} from "../schema/auth.schema";
import { fromZodError } from "zod-validation-error";
import bcrypt from "bcryptjs";
import {
  createAccessToken,
  createRefreshToken,
  handleRefreshTokenRotation,
  setAuthCookies,
} from "../utils/helpers";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import { generateOTP, removeOTP, storeOTP, verifyOTP } from "../utils/otp";
import { sendSMS } from "../utils/sms";
import { sendEmail } from "../utils/email";

export const registerIndividualUserController = asyncErrorHandler(
  async (req: Request, res: Response): Promise<void> => {
    const result = createIndividualUserSchema.safeParse(req.body);
    if (!result.success)
      throw new BadRequestError(fromZodError(result.error).toString());

    const foundUser = await User.findOne({
      email: result.data.email,
    });

    if (foundUser)
      throw new BadRequestError(
        `User with email '${result.data.email}' already exists`
      );
    const { email, password, phone_number, ...data } = result.data;
    const hashedPassword = await bcrypt.hash(result.data.password, 10);
    const otp = generateOTP();

    storeOTP(email, otp, {
      email,
      phone_number,
      password: hashedPassword,
      ...data,
    });

    await sendSMS(phone_number, otp);
    await sendEmail(email, otp);
    res.status(StatusCodes.OK).json({
      message: "OTP sent successfully. Please verify to complete signup.",
    });
  }
);

export const registerCorporateUserController = asyncErrorHandler(
  async (req: Request, res: Response): Promise<void> => {
    const body = req.body;
    body.date_of_incorporation = new Date(body.date_of_incorporation);
    const result = createCorporateUserSchema.safeParse(body);
    if (!result.success)
      throw new BadRequestError(fromZodError(result.error).toString());

    const foundUser = await User.findOne({
      email: result.data.email,
    });

    if (foundUser)
      throw new BadRequestError(
        `User with email '${result.data.email}' already exists`
      );
    const { email, password, ...data } = result.data;
    const hashedPassword = await bcrypt.hash(result.data.password, 10);
    const otp = generateOTP();

    storeOTP(email, otp, {
      email,

      password: hashedPassword,
      ...data,
    });

    await sendEmail(email, otp);
    res.status(StatusCodes.OK).json({
      message: "OTP sent successfully. Please verify to complete signup.",
    });
  }
);

export const verifyUserOTPController = asyncErrorHandler(
  async (req: Request, res: Response): Promise<void> => {
    const cookie = req.cookies;
    const result = verifyUserOTPSchema.safeParse(req.body);
    if (!result.success)
      throw new BadRequestError(fromZodError(result.error).toString());

    const otpResult = verifyOTP(result.data.email, result.data.otp);

    if (!otpResult.success) throw new BadRequestError(otpResult.message);
    otpResult.userData.verified = true;
    const newUser = new User(otpResult.userData);
    await newUser.save();

    removeOTP(result.data.email);

    const { password, ...user }: any = newUser.toObject();

    const ACCESS_TOKEN_EXPIRATION = 60 * 60 * 1000;

    const accessToken = createAccessToken(user.email, user._id);

    const newRefreshToken = createRefreshToken(user.email, user._id);

    await handleRefreshTokenRotation(user, cookie);
    user.refreshToken.push(newRefreshToken);

    setAuthCookies(res, accessToken, newRefreshToken);

    res.status(StatusCodes.OK).json({
      message: "Account created successfully!",
      accessToken: accessToken,
      expiresIn: ACCESS_TOKEN_EXPIRATION,
      data: user,
    });
  }
);

export const loginUserController = asyncErrorHandler(
  async (req: Request, res: Response): Promise<void> => {
    const cookie = req.cookies;
    const result = loginUserSchema.safeParse(req.body);

    if (!result.success)
      throw new BadRequestError(fromZodError(result.error).toString());

    const foundUser = await User.findOne({
      email: result.data.email,
    }).select("+password");

    if (!foundUser)
      throw new BadRequestError(
        `Invalid login credentials. No user found with email: '${result.data.email}'`
      );

    const isPasswordValid = await bcrypt.compare(
      `${result.data.password}`,
      foundUser.password
    );

    if (!isPasswordValid)
      throw new UnauthorizedError(
        "Invalid email or password. Please try again with the correct credentials."
      );

    const { password, ...user }: any = foundUser.toObject();

    if (user) {
      const ACCESS_TOKEN_EXPIRATION = 60 * 60 * 1000;

      const accessToken = createAccessToken(user.email, user._id);

      const newRefreshToken = createRefreshToken(user.email, user._id);

      await handleRefreshTokenRotation(user, cookie);
      user.refreshToken.push(newRefreshToken);

      setAuthCookies(res, accessToken, newRefreshToken);

      res.status(StatusCodes.OK).json({
        message: "Login successful",
        accessToken: accessToken,
        expiresIn: ACCESS_TOKEN_EXPIRATION,
        data: user,
      });
      return;
    }
  }
);

export const logoutUserController = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ message: "Logout successful" });
};

export const refreshTokenController = (req: Request, res: Response) => {
  res.json({ message: "Refresh token coming soon" });
};
