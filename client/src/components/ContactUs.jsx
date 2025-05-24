import React, { useState, useEffect, useCallback } from "react";
import "../css/componentCSS/ContactUs.css";
import axios from "../api/axios";
import { FaSpinner } from "react-icons/fa";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [emailError, setEmailError] = useState("");
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [emailSuccessMessage, setEmailSuccessMessage] = useState("");

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle submission
  useEffect(() => {
    let timer;
    if (submitted) {
      timer = setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", email: "", subject: "", message: "" });
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [submitted]);

  // Debounce execution
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // Verify email
  const verifyEmailOnServer = useCallback(
    debounce(async (email) => {
      if (!email.endsWith("@gmail.com")) {
        setEmailError("Only Gmail addresses are allowed for now.");
        setEmailSuccessMessage("");
        setIsVerifyingEmail(false);
        return;
      }
      if (!email) {
        setEmailError("");
        setEmailSuccessMessage("");
        setIsVerifyingEmail(false);
        return;
      }

      setIsVerifyingEmail(true);
      setEmailError("");
      setEmailSuccessMessage("");
      try {
        const response = await axios.post("/contact/validate-email", { email });
        if (!response.data.isValid) {
          setEmailError(response.data.message || "Email is not valid.");
          setEmailSuccessMessage("");
        } else {
          setEmailError("");
          setEmailSuccessMessage(response.data.message || "Email is valid.");
        }
      } catch (error) {
        console.error("Email verification error:", error);
        setEmailSuccessMessage("");
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setEmailError(error.response.data.message);
        } else {
          setEmailError("Could not verify email. Server error.");
        }
      } finally {
        setIsVerifyingEmail(false);
      }
    }, 1000),
    []
  );

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "email") {
      setEmailSuccessMessage("");
      if (!value) {
        setEmailError("");
        setIsVerifyingEmail(false);
      } else {
        verifyEmailOnServer(value);
      }
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      alert("Please fill in all fields.");
      return;
    }

    if (isVerifyingEmail) {
      alert("Please wait for email verification to complete.");
      return;
    }

    if (emailError) {
      alert(`Please correct the email error: ${emailError}`);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/contact", form);

      if (response.status === 200) {
        setSubmitted(true);
      } else {
        alert(response.data.message || "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page-container fade-in-section">
      <div className="contact-form-window">
        <div className="contact-form-header">
          <span className="contact-form-dot red-dot"></span>
          <span className="contact-form-dot yellow-dot"></span>
          <span className="contact-form-dot green-dot"></span>
          <span className="contact-form-title-text">Contact Us</span>
        </div>
        <div className="contact-form-content">
          {submitted ? (
            <p className="contact-submission-message">
              Thank you for reaching out! We'll get back to you soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form-body">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="contact-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className={`contact-input ${emailError ? "input-error" : ""}`}
              />
              <div className="email-status-container">
                {isVerifyingEmail && <FaSpinner className="spinner" />}
                {emailError && <p className="error-message">{emailError}</p>}
                {emailSuccessMessage && !emailError && (
                  <p className="success-message">{emailSuccessMessage}</p>
                )}
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="contact-input"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                rows={isMobile ? 6 : 12}
                className="contact-textarea"
              />
              <button
                type="submit"
                className="contact-submit-btn"
                disabled={loading || isVerifyingEmail || !!emailError}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
