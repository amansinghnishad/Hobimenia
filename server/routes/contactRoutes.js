import express from 'express';
import { handleContactForm } from '../controllers/contactController.js';
import rateLimit from "express-rate-limit";
import logger from '../config/logger.js';

const router = express.Router();

// Apply rate limiting to the contact form submission
// Adjust limits as needed, e.g., 5 requests per 15 minutes per IP
const contactFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: { message: "Too many contact form submissions from this IP, please try again after 15 minutes." },
  handler: (req, res, next, options) => {
    logger.warn(`Rate limit exceeded for contact form: ${req.ip}`);
    res.status(options.statusCode).json(options.message);
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router.post('/', contactFormLimiter, handleContactForm);

export default router;