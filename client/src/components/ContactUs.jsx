import React, { useState, useEffect } from "react";
import "../css/componentCSS/ContactUs.css";
import axios from "../api/axios";

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true); // Set loading to true before API call
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
                className="contact-input"
              />
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
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}{" "}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
