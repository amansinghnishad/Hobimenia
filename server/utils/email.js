import sgMail from "@sendgrid/mail";
import logger from "../config/logger.js";

// Ensure SENDGRID_API_KEY is set when this module is loaded
if (!process.env.SENDGRID_API_KEY) {
  logger.error("CRITICAL: SENDGRID_API_KEY is not defined in environment variables. Emails will not be sent.");
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const sendEmail = async (options) => {
  const msg = {
    to: options.email,
    from: process.env.EMAIL_FROM, // must be a verified sender in SendGrid
    subject: options.subject,
    text: options.message,
    html: options.html || undefined,
  };

  try {
    await sgMail.send(msg);
    logger.info(`Email sent to ${options.email} via SendGrid`);
  } catch (error) {
    logger.error(`Error sending email via SendGrid to ${options.email}:`, error);
    if (error.response && error.response.body) {
      logger.error('SendGrid response body:', error.response.body);
    }
    throw new Error("Email could not be sent");
  }
};

export { sendEmail };
