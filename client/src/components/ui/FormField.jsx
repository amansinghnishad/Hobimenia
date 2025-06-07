import React from "react";
import { motion } from "framer-motion";
import Input from "./Input";
import { FaExclamationCircle } from "react-icons/fa";

const FormField = ({
  label,
  error,
  hint,
  required = false,
  children,
  className = "",
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {children}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-red-600 text-sm"
        >
          <FaExclamationCircle size={14} />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Hint Message */}
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
};

export default FormField;
