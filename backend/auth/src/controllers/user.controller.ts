import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import {
  UserLoginValidation,
  userLoginValidation,
  UserRegisterInput,
  userRegisterSchema,
  userVerifyOTPSchema,
} from "../validation/user.validation";
import {
  createUser,
  findUserByEmail,
  markUserAsVerified,
  updateUserOTP,
  User,
  verifyUserOTP,
} from "../models/user.model";
import { sendOTPEmail, sendWelcomeEmail } from "../utils/emailService";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsed = userRegisterSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({ errors: parsed.error.errors });
      return;
    }

    const userData: UserRegisterInput = parsed.data;
    const existingUser = await findUserByEmail(userData.email);
    if (existingUser) {
      res.status(400).json({ message: "User already exits" });
      return;
    }

    const hashedPassword = await bcryptjs.hash(userData.password, 10);

    const newUser: User = {
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
    };

    const user = await createUser(newUser);

    const otp = uuidv4().slice(0, 6).toUpperCase();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10minutes
    await updateUserOTP(user.id!, otp, otpExpiresAt);
    await sendOTPEmail(user.email, otp);

    res.status(201).json({
      message:
        "User created successfully. Please check your email for OTP verification",
      user: { id: user?.id, email: user?.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user," });
  }
};

export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = userVerifyOTPSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ errors: parsed.error.errors });
      return;
    }

    const { otp } = parsed.data;
    const user = await verifyUserOTP(otp);
    if (!user) {
      res.status(400).json({ message: "Invalid or expired OTP" });
      return;
    }

    await markUserAsVerified(user.id!);
    try {
      await sendWelcomeEmail(user.email);
      console.log(`Welcome email successfully sent to: ${user.email}`);
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
      res
        .status(500)
        .json({ message: "OTP verified, but failed to send welcome email." });
      return;
    }

    res.status(200).json({ message: "Email Verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);

    res.status(500).json({ message: "Error Verifying OTP" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // validate input
    const parsed = userLoginValidation.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({ errors: parsed.error.errors });
      return;
    }

    const { email, password }: UserLoginValidation = parsed.data;

    // find user
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(401).json({ message: "Invalid email and password" });
    }

    const passwordMatch = await bcryptjs.compare(password, user?.password!);
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign(
      { id: user?.id, email: user?.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    // cookies
    res.cookie("token", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      message: "Login successful",
      user: { id: user?.id, email: user?.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server eroor" });
  }
};

export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const otp = uuidv4().slice(0, 6).toUpperCase();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await updateUserOTP(user.id!, otp, otpExpiresAt);

    await sendOTPEmail(email, otp);

    res
      .status(200)
      .json({ message: "OTP sent to your email for password reset" });
  } catch (error) {
    console.error("Error in requesting passsword reset", error);
    res.status(500).json({ message: "Failed to request password reset" });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
};
