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

export const userVerifyOTPSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 characters long"),
});

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

export const userResetPasswordSchema = z
  .object({
    newPassword: z
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

export type UserRegisterInput = z.infer<typeof userRegisterSchema>;
export type UserVerifyOTPInput = z.infer<typeof userVerifyOTPSchema>;
export type UserLoginValidation = z.infer<typeof userLoginValidation>;
export type UserResetPasswordSchema = z.infer<typeof userResetPasswordSchema>;
