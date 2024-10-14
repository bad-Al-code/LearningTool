import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Acess denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN as string);
    (req as any).user = decoded; // req object
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
