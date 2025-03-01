export const ICONS = {
  users: "/icons/users_icon.svg",
  upload: "/icons/upload.svg",
};

export const IMAGES = {
  logo: "/logo.png",
};

export const PAGES = {
  auth: {
    signIn: "/sign-in",
    register: "/register",
    validateUser: "/auth/validate-user",
    forgotPassword: "/forgot-password",
    individualPages: {
      individual: "/individual",
      basicInformation: "/basic-information",
      loginDetails: "/login-details",
      otpVerification: "/otp-verification",
      registrationSuccessful: "/registration-successful",
    },
    corporatePages: {
      corporate: "/corporate",
      basicInformation: "/company-information",
      loginDetails: "/login-details",
      otpVerification: "/otp-verification",
      registrationSuccessful: "registration-successful",
    },
  },
  dashboard: {
    index: "/dashboard",
    overview: "/dashboard/overview",
    market: "/dashboard/market",
    portfolio: "/dashboard/portfolio",
    community: "/dashboard/community",
    reports: "/dashboard/reports",
    settings: "/dashboard/settings",
  },
  home: "/",
};
export const individualSteps = [
  "/register/individual",
  "/register/individual/basic-information",
  "/register/individual/login-details",
  "/register/individual/otp-verification",
  "/register/individual/registration-successful",
];

export const corporateSteps = [
  "/register/corporate",
  "/register/corporate/company-information",
  "/register/corporate/login-details",
  "/register/corporate/otp-verification",
  "/register/corporate/registration-successful",
];

export const formFeedback = {
  required: (field: string) => `${field} is required`,
  invalidEmail: "Invalid email format",
};
