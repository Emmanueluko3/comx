import { z } from "zod";

const createIndividualUserSchema = z
  .object({
    user_type: z.enum(["individual"], {
      required_error: "User type is required",
      invalid_type_error:
        "Invalid user type. This user type has to be 'individual'",
    }),

    email: z.string({ required_error: "Email is required" }).email({
      message: "Invalid email address",
    }),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(16, { message: "Password must be at most 16 characters long" }),
    first_name: z.string({ required_error: "First name is required" }),
    last_name: z.string({ required_error: "Last name is required" }),
    phone_number: z.string({ required_error: "Phone number is required" }),
  })
  .strict();

const createCorporateUserSchema = z
  .object({
    user_type: z.enum(["corporate"], {
      required_error: "User type is required",
      invalid_type_error:
        "Invalid user type. This user type has to be 'corporate'",
    }),

    email: z.string({ required_error: "Email is required" }).email({
      message: "Invalid email address",
    }),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(16, { message: "Password must be at most 16 characters long" }),
    company_name: z.string({ required_error: "Company name is required" }),
    date_of_incorporation: z.date({
      required_error: "Date of incorporation is required",
    }),
    type_of_business: z.string({
      required_error: "Type of business is required",
    }),
    registration_number: z.string().optional(),
    address: z.string().optional(),
  })
  .strict();
const verifyUserOTPSchema = z
  .object({
    email: z.string({ required_error: "Email is required" }).email({
      message: "Invalid email address",
    }),
    otp: z.string({ required_error: "otp is required" }),
  })
  .strict();

const loginUserSchema = z
  .object({
    email: z.string({ required_error: "Email is required" }).email({
      message: "Invalid email address",
    }),
    password: z.string({ required_error: "Password is required" }),
  })
  .strict();

export {
  createIndividualUserSchema,
  createCorporateUserSchema,
  verifyUserOTPSchema,
  loginUserSchema,
};
