import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from './logger.js'; // Use logger for diagnostics

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the server directory
const envPath = path.resolve(__dirname, '..', '.env');
const dotenvResult = dotenv.config({ path: envPath });

if (dotenvResult.error) {
  logger.error(`❌ Error loading .env file from ${envPath}:`, dotenvResult.error);
} else {
  logger.info(`✅ .env file loaded from ${envPath} for emailConfig. Parsed variables: ${Object.keys(dotenvResult.parsed || {}).join(', ')}`);
}

// Basic sanity checks for SendGrid-based email sending
if (!process.env.SENDGRID_API_KEY) {
  logger.warn('SENDGRID_API_KEY is not set. Email sending via SendGrid will fail until configured.');
}
if (!process.env.EMAIL_FROM) {
  logger.warn('EMAIL_FROM is not set. Set EMAIL_FROM to a verified sender address for SendGrid.');
}

// This module used to export a nodemailer transporter. We now use SendGrid via the utils/email.js
// Export a small descriptor for diagnostic purposes in case other modules import this config.
export default {
  provider: 'sendgrid',
  from: process.env.EMAIL_FROM || null,
};