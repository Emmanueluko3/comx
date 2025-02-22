import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthorizedError } from "./../errors";
import User from "../models/user.model";
import { loginUserSchema } from "../schema/auth.schema";
import { fromZodError } from "zod-validation-error";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { fetchDotEnv } from "../utils/helpers";
import asyncErrorHandler from "../utils/asyncErrorHandler";

export const loginUserController = asyncErrorHandler(
  async (req: Request, res: Response): Promise<void> => {
    const cookie = req.cookies;
    const refreshToken = cookie?.jwt;
    const result = loginUserSchema.safeParse(req.body);

    if (!result.success) {
      throw new BadRequestError(fromZodError(result.error).toString());
    }

    const foundUser = await User.findOne({
      email: result.data.email,
    }).select("+password");

    if (!foundUser)
      throw new BadRequestError(
        `Invalid login credentials. No user found with email: '${result.data.email}'`
      );

    // validate password
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
      const COOKIE_MAX_AGE = 24 * 60 * 60 * 1000;
      const ACCESS_TOKEN_EXPIRATION = 60 * 60 * 1000;

      const accessToken = jwt.sign(
        { username: user.username, id: user.id },
        fetchDotEnv(process.env.JWT_SECRET),
        { expiresIn: ACCESS_TOKEN_EXPIRATION }
      );
      const newRefreshToken = jwt.sign(
        { username: user.username },
        fetchDotEnv(process.env.JWT_SECRET),
        { expiresIn: "1d" }
      );

      let newRefreshTokenArray = !cookie?.jwt
        ? user.refreshToken
        : user.refreshToken.filter((token: string) => token !== cookie?.jwt);

      if (cookie?.jwt) {
        res.clearCookie("jwt", {
          maxAge: 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "none",
        });

        const foundToken = await User.findOne({ refreshToken }).exec();

        if (!foundToken) {
          console.log("Token reuse detected");
          newRefreshTokenArray = [];
        }
      }

      user.refreshToken = [...newRefreshTokenArray, newRefreshToken];

      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        maxAge: COOKIE_MAX_AGE,
        sameSite: true,
      });

      res.status(StatusCodes.OK).json({
        token: accessToken,
        expiresIn: ACCESS_TOKEN_EXPIRATION,
        data: user,
        message: "Login successful",
      });
      return;
    }
  }
);

const logoutUserController = (req: Request, res: Response) => {
  res.json({ message: "Logout User" });
};

const refreshTokenController = (req: Request, res: Response) => {
  res.json({ message: "Refresh token" });
};

// controllers/authController.js

// export const registerIndividual = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     // ... (validation remains the same)

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       // Use Mongoose to create a new document
//       user_type: "individual",
//       first_name,
//       last_name,
//       email,
//       password: hashedPassword, // Store the hashed password
//       address,
//       phone_number,
//     });

//     const savedUser = await newUser.save(); // Mongoose's save() method
//     res
//       .status(201)
//       .json({ message: "Individual registration successful", user: savedUser }); // Include the saved user data if needed
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.registerCorporate = async (req, res) => {
//   try {
//     // ... (validation remains the same)

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       user_type: "corporate",
//       company_name,
//       registration_number,
//       email,
//       password: hashedPassword,
//       address,
//       phone_number,
//     });

//     const savedUser = await newUser.save();
//     res
//       .status(201)
//       .json({ message: "Corporate registration successful", user: savedUser });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
