import { Pool } from "mysql2/promise";
import { createPool } from "../config/database/db";

export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
}

export const createUser = async (user: User): Promise<User> => {
  const pool: Pool = await createPool();
  const { username, email, password } = user;

  const sql = "INSERT INTO users (username, email, password) VALUES (?,?,?)";
  const [result] = await pool.query(sql, [username, email, password]);

  return { id: (result as any).insertId, username, email, password };
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const pool: Pool = await createPool();
  const sql = "SELECT * FROM users WHERE email=?";
  const [rows]: any = await pool.query(sql, [email]);
  return rows[0] || null;
};
