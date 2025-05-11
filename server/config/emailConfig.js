import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from './logger.js'; // Assuming logger is in the same config directory

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

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10),
  secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    // Adjust rejectUnauthorized based on your SMTP provider's requirements
    // For services like Gmail, this should generally be true in production
    // For local development with self-signed certs, you might set it to false
    rejectUnauthorized: process.env.NODE_ENV === 'production',
  }
});

transporter.verify((error, success) => {
  if (error) {
    logger.error('❌ Error configuring email transporter:');
    logger.error(`- Host: ${process.env.EMAIL_HOST}`);
    logger.error(`- Port: ${process.env.EMAIL_PORT}`);
    logger.error(`- User: ${process.env.EMAIL_USER}`);
    // DO NOT log process.env.EMAIL_PASS
    logger.error(`- Error Details: ${error.message}`);
    if (process.env.EMAIL_PASS && process.env.EMAIL_PASS.length < 8) {
      logger.warn('Potential issue: EMAIL_PASS seems short. If using Gmail with 2FA, ensure it is an App Password.');
    }
  } else {
    logger.info('✅ Email transporter configured successfully. Ready to send emails.');
  }
});

export default transporter;