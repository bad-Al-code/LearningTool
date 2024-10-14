import { z } from "zod";

export const userRegisterSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(50, "Username should be less than 50 characters"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password should be less than 50 characters")
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase character",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[\W_]/, {
      message: "Password must contain at least one special character",
    }),
});

export type UserRegisterInput = z.infer<typeof userRegisterSchema>;

export const userLoginValidation = z.object({
  email: z.string().email("Invalid email credentials"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password should be less than 50 characters")
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase character",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[\W_]/, {
      message: "Password must contain at least one special character",
    }),
});

export type UserLoginValidation = z.infer<typeof userLoginValidation>;
