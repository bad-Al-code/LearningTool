import { Router } from "express";

import {
  loginUser,
  logoutUser,
  registerUser,
  requestPasswordReset,
  verifyOTP,
} from "../controllers/user.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerUser);
router.post("/verify-otp", verifyOTP);
router.post("/login", loginUser);
router.post("/request-password-reset", requestPasswordReset);
router.post("/logout", authenticateToken, logoutUser);

export default router;
