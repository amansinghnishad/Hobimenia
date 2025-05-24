import express from 'express';
import { handleContactForm, validateEmailWithZeroBounce } from '../controllers/contactController.js';
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
  standardHeaders: true,
  legacyHeaders: false,
});


const emailValidationLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 30,
  message: { message: "Too many email validation requests from this IP, please try again after 5 minutes." },
  handler: (req, res, next, options) => {
    logger.warn(`Rate limit exceeded for email validation: ${req.ip}`);
    res.status(options.statusCode).json(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', contactFormLimiter, handleContactForm);
router.post('/validate-email', emailValidationLimiter, validateEmailWithZeroBounce);

export default router;