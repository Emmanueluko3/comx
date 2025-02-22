export const ICONS = {
  users: "/icons/users_icon.svg",
  upload: "/icons/upload.svg",
};

export const IMAGES = {
  logo: "/logo.png",
  profilePlaceholder: "/profile_placeholder.png",
  companyLogo: "/logo_sample.svg",
};

export const PAGES = {
  auth: {
    signIn: "/sign-in",
    register: "/register",
    validateUser: "/auth/validate-user",
    forgotPassword: "/forgot-password",
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

export const formFeedback = {
  required: (field: string) => `${field} is required`,
  invalidEmail: "Invalid email format",
};
