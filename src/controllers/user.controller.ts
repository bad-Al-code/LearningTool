import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  UserLoginValidation,
  userLoginValidation,
  UserRegisterInput,
  userRegisterSchema,
} from "../validation/user.validation";
import { createUser, findUserByEmail, User } from "../models/user.model";

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
    res.status(201).json({
      message: "User created successfully",
      user: { id: user?.id, email: user?.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user," });
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

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
};
