import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { Pool } from "mysql2/promise";

import { createPool } from "../config/database/db";

export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  otp?: string;
  otpExpiresAt?: Date;
  isVerified?: boolean;
  resetPasswordToken?: string;
  resetPasswordTokenExpiresAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

let pool: Pool;
const initPool = async (): Promise<void> => {
  if (!pool) {
    pool = await createPool();
  }
};

export const createUser = async (user: User): Promise<User> => {
  await initPool();
  const { username, email, password } = user;

  const sql =
    "INSERT INTO users (username, email, password, isVerified) VALUES (?, ?, ?, ?)";
  const [result] = await pool.query(sql, [username, email, password, false]);
  return { id: (result as any).insertId, username, email, isVerified: false };
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  await initPool();
  const sql = "SELECT * FROM users WHERE email=?";
  const [rows]: any = await pool.query(sql, [email]);
  return rows[0] || null;
};

export const updateUserOTP = async (
  userId: number,
  otp: string,
  otpExpiresAt: Date
): Promise<void> => {
  await initPool();
  const hashedOTP = await bcryptjs.hash(otp, 10);
  const sql = "UPDATE users SET otp = ?, otpExpiresAt = ? WHERE id = ?";
  await pool.query(sql, [hashedOTP, otpExpiresAt, userId]);
};

export const verifyUserOTP = async (otp: string): Promise<User | null> => {
  await initPool();
  const sql =
    "SELECT id, email, otp, otpExpiresAt FROM users WHERE otpExpiresAt > NOW() ORDER BY otpExpiresAt DESC LIMIT 1";

  const [rows]: any = await pool.query(sql);
  if (rows.length === 0) return null;

  const user = rows[0];
  const isValid = await bcryptjs.compare(otp, user.otp);
  if (!isValid) return null;

  return user;
};

export const markUserAsVerified = async (userId: number): Promise<void> => {
  await initPool();
  const sql =
    "UPDATE users SET isVerified = true, otp = NULL, otpExpiresAt = NULL WHERE id = ?";

  await pool.query(sql, [userId]);
};

export const generateResetPasswordToken = async (
  userId: number
): Promise<string> => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
  const expiresAt = new Date(Date.now() * 60 * 1000);

  await initPool();
  const sql =
    "UPDATE users SET resetPasswordToken = ?, resetPasswordTokenExpiresAt = ? WHERE id = ?";

  await pool.query(sql, [token, expiresAt, userId]);

  return token;
};

export const findUserByResetPasswordToken = async (
  token: string
): Promise<User | null> => {
  await initPool();
  const sql =
    "SELECT * FROM users WHERE resetPasswordToken = ? AND resetPasswordTokenExpiresAt > NOW()";

  const [rows]: any = await pool.query(sql, [token]);
  return rows[0] || null;
};

export const updateUserPassword = async (
  userId: number,
  newPassword: string
): Promise<void> => {
  await initPool();
  const hashedPassword = await bcryptjs.hash(newPassword, 10);
  const sql =
    "UPDATE users SET password = ?, resetPasswordToken = NULL, resetPasswordTokenExpiresAt = NULL WHERE id = ?";
  await pool.query(sql, [hashedPassword, userId]);
};
