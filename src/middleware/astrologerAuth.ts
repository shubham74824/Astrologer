import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../types/customInterface";
import { handleResponse } from "../utils/responseUtills";

export const astrologerAuth = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    handleResponse(res, 403, "Access denied: token missing");
    return;
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    handleResponse(res, 403, "JWT secret is not configured");
    return;
  }

  try {
    const decoded = jwt.verify(token, secret) as { astrologerId: string };

    req.astrologerId = decoded.astrologerId; // No error now
    next();
  } catch (error) {
    handleResponse(res, 500, "Invalid server error");
  }
};
