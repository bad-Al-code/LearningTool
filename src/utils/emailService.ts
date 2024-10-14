import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTPEmail = async (
  email: string,
  otp: string
): Promise<void> => {
  try {
    await resend.emails.send({
      from: "Mysql-node <onboarding@resend.dev>",
      to: email,
      subject: "Your OTP for Email Verification",
      html: `
      <h1>Email Verification</h1>
      <p>Your OTP is: <strong>${otp}</strong></p>
      <p>This OTP will expires in 10 minutes.</p>
      `,
    });
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};
