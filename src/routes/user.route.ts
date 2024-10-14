import { Router } from "express";

import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller";
import { authenticateToken } from "../middleware/auth.middleware";
import { verifyUserOTP } from "models/user.model";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authenticateToken, logoutUser);

export default router;
