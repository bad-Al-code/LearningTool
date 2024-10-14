import { Router } from "express";

import { loginUser, registerUser } from "../controllers/user.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", authenticateToken, (req, res) => {
  const user = (req as any).user;
  res.status(200).json({ message: "Profile data", user });
});

export default router;
