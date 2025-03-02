import * as Yup from "yup";
import { formFeedback } from "./constants";
/* eslint-disable  @typescript-eslint/no-explicit-any */

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email(formFeedback.invalidEmail)
    .required(formFeedback.required("Email")),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, &)"
    )
    .required(formFeedback.required("Password")),
});

export const individualValidationSchemas: any = {
  "basic-information": Yup.object({
    first_name: Yup.string().required(formFeedback.required("First Name")),
    last_name: Yup.string().required(formFeedback.required("Last Name")),
    email: Yup.string()
      .email(formFeedback.invalidEmail)
      .required(formFeedback.required("Email")),
  }),
  "login-details": Yup.object({
    phone_number: Yup.string()
      .matches(
        /^\+\d+$/,
        "Phone number must start with + and contain only numbers"
      )
      .required("Phone Number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@, $, !, %, *, ?, &)"
      )
      .required(formFeedback.required("Password")),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required(formFeedback.required("Confrim password")),
  }),
  "otp-verification": Yup.object({ otp: Yup.string().length(4).required() }),
};

export const corporateValidationSchemas: any = {
  "company-information": Yup.object({
    company_name: Yup.string().required(
      formFeedback.required("Company name Name")
    ),
    type_of_business: Yup.string().required(
      formFeedback.required("Type of Business")
    ),
    date_of_incorporation: Yup.string().required(
      formFeedback.required("Date of Incorporation")
    ),
  }),
  "login-details": Yup.object({
    email: Yup.string()
      .email(formFeedback.invalidEmail)
      .required(formFeedback.required("Email")),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@, $, !, %, *, ?, &)"
      )
      .required(formFeedback.required("Password")),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required(formFeedback.required("Confrim password")),
  }),
  "otp-verification": Yup.object({ otp: Yup.string().length(4).required() }),
};
