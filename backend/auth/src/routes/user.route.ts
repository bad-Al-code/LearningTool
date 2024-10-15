import { Router } from "express";

import {
  loginUser,
  logoutUser,
  registerUser,
  requestPasswordReset,
  resetPassword,
  verifyOTP,
  verifyPasswordResetOTP,
} from "../controllers/user.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerUser);
router.post("/verify-otp", verifyOTP);
router.post("/login", loginUser);
router.post("/request-password-reset", requestPasswordReset);
router.post("/verify-password-reset-otp", verifyPasswordResetOTP);
router.post("/reset-password", resetPassword);
router.post("/logout", authenticateToken, logoutUser);

export default router;
