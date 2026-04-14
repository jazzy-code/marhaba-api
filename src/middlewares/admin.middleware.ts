import { RequestHandler } from "express";
import { HTTPError } from "./errorHandler.js";

export const requireAdmin: RequestHandler = async (req, res, next) => {
  if (req.user.userType !== "ADMIN") {
    throw new HTTPError(403, "Access denied");
  }
  next();
}