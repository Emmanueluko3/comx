import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendSMS = async (phone: string, otp: string) => {
  await client.messages.create({
    body: `Your One Time Password(OTP) for ComX sign-in is ${otp} Expires in 10mins.`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone,
  });
};
