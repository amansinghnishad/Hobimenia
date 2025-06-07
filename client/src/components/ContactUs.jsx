import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../api/axios";
import {
  FaSpinner,
  FaEnvelope,
  FaUser,
  FaTag,
  FaComments,
  FaCheckCircle,
  FaPaperPlane,
  FaExclamationCircle,
} from "react-icons/fa";

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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Get In Touch
          </h1>
          <p className="text-gray-600 text-lg">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </motion.div>

        {/* Contact Form Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-100 overflow-hidden"
        >
          {/* Card Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <h2 className="text-white text-xl font-semibold flex items-center">
                <FaEnvelope className="mr-2" />
                Contact Form
              </h2>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCheckCircle className="text-3xl text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Thank you for reaching out! We'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Name Field */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaUser className="inline mr-2" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50/50"
                    />
                  </motion.div>

                  {/* Email Field */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaEnvelope className="inline mr-2" />
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 ${
                        emailError
                          ? "border-red-300 bg-red-50/50"
                          : "border-gray-200"
                      }`}
                    />
                    <AnimatePresence>
                      {(isVerifyingEmail ||
                        emailError ||
                        emailSuccessMessage) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2"
                        >
                          {isVerifyingEmail && (
                            <div className="flex items-center text-blue-600 text-sm">
                              <FaSpinner className="animate-spin mr-2" />
                              Verifying email...
                            </div>
                          )}
                          {emailError && (
                            <div className="flex items-center text-red-600 text-sm">
                              <FaExclamationCircle className="mr-2" />
                              {emailError}
                            </div>
                          )}
                          {emailSuccessMessage && !emailError && (
                            <div className="flex items-center text-green-600 text-sm">
                              <FaCheckCircle className="mr-2" />
                              {emailSuccessMessage}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Subject Field */}
                  <motion.div variants={itemVariants}>
                    {" "}
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaTag className="inline mr-2" />
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="What's this about?"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50/50"
                    />
                  </motion.div>

                  {/* Message Field */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaComments className="inline mr-2" />
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={isMobile ? 6 : 8}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 resize-none"
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div variants={itemVariants}>
                    <motion.button
                      type="submit"
                      disabled={loading || isVerifyingEmail || !!emailError}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                        loading || isVerifyingEmail || !!emailError
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl"
                      }`}
                    >
                      {loading ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <FaPaperPlane />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-8 text-gray-600"
        >
          <p className="text-sm">
            We typically respond within 24 hours. For urgent matters, please
            include "URGENT" in your subject line.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
