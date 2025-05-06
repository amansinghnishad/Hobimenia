import React, { useState } from "react";
import "../css/componentCSS/ContactUs.css";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page-container">
      <section className="contact-section fade-in-section">
        <div className="contact-form-container">
          <h2 className="contact-title">Contact Me</h2>
          {submitted ? (
            <p className="contact-submission-message">
              Thank you for reaching out! We'll get back to you soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
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
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="contact-textarea"
              />
              <button
                type="submit"
                className="contact-submit-btn hero-btn hero-btn-primary"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
