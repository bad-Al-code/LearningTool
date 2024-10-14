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
        <p>This OTP will expire in 10 minutes.</p>
      `,
    });
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};

export const sendWelcomeEmail = async (email: string): Promise<void> => {
  try {
    await resend.emails.send({
      from: "Mysql-node <onboarding@resend.dev> ",
      to: email,
      subject: "Welcome to Msql-node!",
      html: `
        <h1>Welcome to Mysql-node</h1>
        <p>Thank you for verifying your email. We're excited to have you on board!</p>
        <p>If you have any questions, feel free to reach out to our support team.</p>
      `,
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
};
