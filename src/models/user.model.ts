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
  email: string,
  otp: string,
  otpExpiresAt: Date
): Promise<void> => {
  await initPool();
  const hashedOTP = await bcryptjs.hash(otp, 10);
  const sql = "UPDATE users SET otp = ?, otpExpiresAt = ? WHERE email = ?";
  await pool.query(sql, [hashedOTP, otpExpiresAt, email]);
};

export const verifyUserOTP = async (
  email: string,
  otp: string
): Promise<boolean> => {
  await initPool();
  const sql = "SELECT otp, otpExpiresAt FROM users WHERE email = ?";

  const [rows]: any = await pool.query(sql, [email]);
  if (rows.length === 0) return false;

  const { otp: hashedOTP, otpExpiresAt } = rows[0];
  if (new Date() > new Date(otpExpiresAt)) return false;

  return await bcryptjs.compare(otp, hashedOTP);
};

export const markUserAsVerified = async (email: string): Promise<void> => {
  await initPool();
  const sql =
    "UPDATE users SET isVerified = true, otp = NULL, otpExpiresAt = NULL WHERE email = ?";

  await pool.query(sql, [email]);
};
