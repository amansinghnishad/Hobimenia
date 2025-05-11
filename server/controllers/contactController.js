import transporter from '../config/emailConfig.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../config/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the server directory
const envPath = path.resolve(__dirname, '..', '.env');
dotenv.config({ path: envPath });


export const handleContactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;

  logger.info('Contact form submission attempt:', { name, email, subject: subject ? subject.substring(0, 50) + '...' : 'N/A' });


  if (!name || !email || !subject || !message) {
    logger.warn('Contact form submission failed: Missing fields', {
      body: {
        name: !!name,
        email: !!email,
        subject: !!subject, // Added subject here
        message: !!message
      }
    });
    return res.status(400).json({ message: 'All fields (name, email, subject, message) are required.' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    logger.warn('Contact form submission failed: Invalid email format', { email });
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  const submissionDate = new Date(); // Get current date and time

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`, // Sender address (your configured email)
    replyTo: email, // User's email address
    to: process.env.CONTACT_FORM_RECEIVER_EMAIL, // Receiver email address (from .env)
    subject: `🚀 New Contact Form Submission: ${subject}`,
    text: `New Contact Form Submission
-----------------------------
Website: Hobimenia
Received: ${submissionDate.toLocaleString()}
-----------------------------
Name: ${name}
Email: ${email}
Subject: ${subject}
-----------------------------
Message:
${message}
-----------------------------
This email was sent from the contact form on your website.`,
    html: `
    <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 20px auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #6a1b9a; color: #ffffff; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        <p style="margin: 5px 0 0; font-size: 14px;">From Hobimenia Website</p>
      </div>
      <div style="padding: 25px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; font-weight: bold; color: #555; width: 100px;">Received:</td>
            <td style="padding: 10px 0;">${submissionDate.toLocaleString()}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; font-weight: bold; color: #555;">From:</td>
            <td style="padding: 10px 0;">${name} (<a href="mailto:${email}" style="color: #6a1b9a; text-decoration: none;">${email}</a>)</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; font-weight: bold; color: #555;">Subject:</td>
            <td style="padding: 10px 0;">${subject}</td>
          </tr>
        </table>
        <div style="margin-top: 20px;">
          <h3 style="color: #6a1b9a; margin-bottom: 10px; font-size: 18px;">Message:</h3>
          <div style="background-color: #f9f9f9; border: 1px solid #e0e0e0; padding: 15px; border-radius: 5px; white-space: pre-wrap; word-wrap: break-word; font-size: 15px; line-height: 1.7;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      </div>
      <div style="background-color: #f0f0f0; color: #777; padding: 15px; text-align: center; font-size: 12px; border-top: 1px solid #e0e0e0;">
        <p style="margin: 0;">This is an automated message from your website's contact form.</p>
        <p style="margin: 5px 0 0;">&copy; ${new Date().getFullYear()} Hobimenia. All rights reserved.</p>
      </div>
    </div>
  `,
  };

  if (!process.env.CONTACT_FORM_RECEIVER_EMAIL) {
    logger.error('CRITICAL: CONTACT_FORM_RECEIVER_EMAIL is not set in .env. Cannot send contact email.');
    return res.status(500).json({ message: 'Server configuration error. Please contact support.' });
  }

  if (!process.env.EMAIL_USER) {
    logger.error('CRITICAL: EMAIL_USER is not set in .env. Cannot send contact email.');
    return res.status(500).json({ message: 'Server configuration error. Please contact support.' });
  }

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Contact form email sent successfully from ${email} to ${process.env.CONTACT_FORM_RECEIVER_EMAIL} with subject "${subject}"`);
    res.status(200).json({ message: 'Message sent successfully! We will get back to you soon.' });
  } catch (error) {
    logger.error('Error sending contact form email:', {
      error: error.message,
      stack: error.stack,
      name,
      email,
      subject,
      // Do not log full message content here if it could be very large or sensitive
    });
    // Check for specific nodemailer errors if helpful
    if (error.code === 'EENVELOPE') {
      logger.error('Nodemailer EENVELOPE error - check recipient and sender email addresses format and validity.');
    } else if (error.code === 'EAUTH') {
      logger.error('Nodemailer EAUTH error - check email server credentials (EMAIL_USER, EMAIL_PASS). If using Gmail, ensure "Less secure app access" is ON or use an App Password.');
    }
    res.status(500).json({ message: 'Failed to send message due to a server error. Please try again later.' });
  }
};