import crypto from "crypto";

export const generateOTP = () => {
  return crypto.randomInt(1000, 9999).toString();
};

const otpStorage: Record<
  string,
  { otp: string; expiresAt: number; userData: any }
> = {};

export const storeOTP = (email: string, otp: string, userData: any) => {
  otpStorage[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000, userData };
};

export const verifyOTP = (email: string, enteredOtp: string) => {
  const storedOtpData = otpStorage[email];

  if (!storedOtpData)
    return { success: false, message: "OTP expired or invalid" };
  if (Date.now() > storedOtpData.expiresAt) {
    delete otpStorage[email];
    return { success: false, message: "OTP expired" };
  }
  if (storedOtpData.otp !== enteredOtp)
    return { success: false, message: "Invalid OTP" };

  return {
    success: true,
    message: "OTP verified",
    userData: storedOtpData.userData,
  };
};

export const removeOTP = (email: string) => {
  delete otpStorage[email];
};
