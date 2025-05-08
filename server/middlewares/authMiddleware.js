// server/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import logger from "../config/logger.js"; // Import the logger

export const protect = async (req, res, next) => {
  let token;

  // Log incoming headers and cookies for debugging
  logger.debug('[Auth Middleware] Request Path:', { path: req.path });
  logger.debug('[Auth Middleware] Cookies:', { cookies: req.cookies });
  logger.debug('[Auth Middleware] Authorization Header:', { authorization: req.headers.authorization });

  // 1. Check Authorization header (Bearer token)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      logger.debug('[Auth Middleware] Token found in Authorization header.');
    } catch (error) {
      logger.error("[Auth Middleware] Error splitting Bearer token:", { error: error.message, stack: error.stack });
      return res.status(401).json({ message: "Not authorized, token format invalid" });
    }
  }
  // 2. If no header token, check httpOnly cookie
  else if (req.cookies?.token) {
    token = req.cookies.token;
    logger.debug('[Auth Middleware] Token found in cookie.');
  }

  if (!token) {
    logger.warn('[Auth Middleware] No token found in header or cookie.', { path: req.path });
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    logger.debug('[Auth Middleware] Token verified.', { decodedPayload: decoded });

    // Get user from the token payload (assuming payload has 'id' or 'userId')
    const userId = decoded.id || decoded.userId;
    req.user = await User.findById(userId).select("-password");

    if (!req.user) {
      logger.warn('[Auth Middleware] User not found for decoded ID:', { userId });
      return res.status(401).json({ message: "Not authorized, user not found" });
    }
    logger.info('[Auth Middleware] User authenticated and attached to request.', { userId: req.user._id, path: req.path });

    next(); // Proceed to the next middleware/controller
  } catch (error) {
    logger.error("[Auth Middleware] Token verification failed:", { error: error.message, stack: error.stack, path: req.path });
    // Clear potentially invalid cookie on verification failure
    res.clearCookie("token");
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};