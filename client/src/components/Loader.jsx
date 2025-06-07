import React from "react";
import { motion } from "framer-motion";

const Loader = ({
  variant = "shimmer", // "shimmer", "spinner", "dots", "pulse"
  size = "md", // "sm", "md", "lg", "xl"
  className = "",
  text = "",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const SpinnerLoader = () => (
    <div
      className={`flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      <motion.div
        className={`${sizeClasses[size]} border-4 border-purple-200 border-t-purple-600 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      {text && (
        <motion.p
          className="text-gray-600 text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  const DotsLoader = () => (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-3 h-3 bg-purple-600 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      ))}
      {text && (
        <span className="ml-3 text-gray-600 text-sm font-medium">{text}</span>
      )}
    </div>
  );

  const PulseLoader = () => (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} bg-gradient-to-r from-purple-600 to-pink-600 rounded-full`}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {text && (
        <span className="ml-3 text-gray-600 text-sm font-medium">{text}</span>
      )}
    </div>
  );

  const ShimmerLoader = () => (
    <div className={`space-y-4 ${className}`}>
      {[...Array(3)].map((_, idx) => (
        <motion.div
          key={idx}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <div className="flex items-start space-x-4">
            {/* Avatar Skeleton */}
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"
              animate={{
                backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 100%",
              }}
            />

            {/* Content Skeleton */}
            <div className="flex-1 space-y-3">
              <motion.div
                className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.1,
                }}
                style={{
                  backgroundSize: "200% 100%",
                }}
              />
              <motion.div
                className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/2"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.2,
                }}
                style={{
                  backgroundSize: "200% 100%",
                }}
              />
              <motion.div
                className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-5/6"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.3,
                }}
                style={{
                  backgroundSize: "200% 100%",
                }}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  switch (variant) {
    case "spinner":
      return <SpinnerLoader />;
    case "dots":
      return <DotsLoader />;
    case "pulse":
      return <PulseLoader />;
    case "shimmer":
    default:
      return <ShimmerLoader />;
  }
};

export default Loader;
