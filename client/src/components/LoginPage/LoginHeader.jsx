import React from "react";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <FaUser className="text-white text-2xl" />
      </motion.div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
      <p className="text-gray-600">Sign in to your Hobimenia account</p>
    </div>
  );
};

export default LoginHeader;
