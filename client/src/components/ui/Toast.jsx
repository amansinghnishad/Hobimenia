import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FaTimes,
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";

// Modern toast notification
const Toast = ({
  message,
  type = "info",
  duration = 3000,
  onClose,
  position = "top-right",
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const types = {
    success: {
      bg: "bg-green-500",
      icon: <FaCheckCircle className="w-5 h-5" />,
      text: "text-white",
    },
    error: {
      bg: "bg-red-500",
      icon: <FaExclamationCircle className="w-5 h-5" />,
      text: "text-white",
    },
    warning: {
      bg: "bg-yellow-500",
      icon: <FaExclamationCircle className="w-5 h-5" />,
      text: "text-white",
    },
    info: {
      bg: "bg-blue-500",
      icon: <FaInfoCircle className="w-5 h-5" />,
      text: "text-white",
    },
  };

  const positions = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className={`
            fixed z-50 ${positions[position]}
            ${types[type].bg} ${types[type].text}
            px-6 py-4 rounded-lg shadow-lg
            flex items-center space-x-3 min-w-80
          `}
        >
          {types[type].icon}
          <p className="flex-1 font-medium">{message}</p>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
