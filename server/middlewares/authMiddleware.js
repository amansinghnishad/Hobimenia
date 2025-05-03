// server/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // ✅ Log incoming headers and cookies for debugging
  console.log('[Auth Middleware] Request Path:', req.path);
  console.log('[Auth Middleware] Cookies:', req.cookies);
  console.log('[Auth Middleware] Authorization Header:', req.headers.authorization);


  // 1. Check Authorization header (Bearer token)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log('[Auth Middleware] Token found in Authorization header.');
    } catch (error) {
      console.error("[Auth Middleware] Error splitting Bearer token:", error);
      return res.status(401).json({ message: "Not authorized, token format invalid" });
    }
  }
  // 2. If no header token, check httpOnly cookie
  else if (req.cookies?.token) {
    token = req.cookies.token;
    console.log('[Auth Middleware] Token found in cookie.');
  }

  if (!token) {
    console.log('[Auth Middleware] No token found in header or cookie.');
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('[Auth Middleware] Token verified. Decoded payload:', decoded);


    // Get user from the token payload (assuming payload has 'id' or 'userId')
    req.user = await User.findById(decoded.id || decoded.userId).select("-password");

    if (!req.user) {
      console.log('[Auth Middleware] User not found for decoded ID:', decoded.id || decoded.userId);
      return res.status(401).json({ message: "Not authorized, user not found" });
    }
    console.log('[Auth Middleware] User attached to request:', req.user._id);

    next(); // Proceed to the next middleware/controller
  } catch (error) {
    console.error("[Auth Middleware] Token verification failed:", error.message);
    // Clear potentially invalid cookie on verification failure
    res.clearCookie("token");
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};