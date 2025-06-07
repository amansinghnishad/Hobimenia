import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { FaCloudUploadAlt, FaImage, FaCheckCircle } from "react-icons/fa";

const ImageUploader = ({ onUpload, preview = null, loading = false }) => {
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        // Handle rejected files (too large, wrong format, etc.)
        const error = rejectedFiles[0].errors[0];
        console.error("File rejected:", error.message);
        return;
      }

      const file = acceptedFiles[0];
      if (file) {
        onUpload(file);
      }
    },
    [onUpload]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB limit
  });

  const hasError = isDragReject || fileRejections.length > 0;

  return (
    <div className="w-full">
      <motion.div
        {...getRootProps()}
        className={`
          relative cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200
          ${
            isDragActive && !hasError
              ? "border-blue-500 bg-blue-50"
              : hasError
              ? "border-red-500 bg-red-50"
              : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
          }
          ${loading ? "pointer-events-none opacity-50" : ""}
        `}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center space-y-4">
          {/* Icon */}
          <motion.div
            animate={{
              scale: isDragActive ? 1.1 : 1,
              rotate: isDragActive ? 5 : 0,
            }}
            className={`
              w-16 h-16 rounded-full flex items-center justify-center
              ${
                isDragActive && !hasError
                  ? "bg-blue-100 text-blue-600"
                  : hasError
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-600"
              }
            `}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            ) : preview ? (
              <FaCheckCircle className="text-2xl text-green-600" />
            ) : (
              <FaCloudUploadAlt className="text-2xl" />
            )}
          </motion.div>

          {/* Text */}
          <div className="space-y-2">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.p
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-blue-600 font-medium"
                >
                  Uploading image...
                </motion.p>
              ) : isDragActive && !hasError ? (
                <motion.p
                  key="drop"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-blue-600 font-medium text-lg"
                >
                  Drop the image here!
                </motion.p>
              ) : hasError ? (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-600 font-medium"
                >
                  Invalid file type or size
                </motion.p>
              ) : preview ? (
                <motion.p
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-green-600 font-medium"
                >
                  Image ready to upload!
                </motion.p>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-1"
                >
                  <p className="text-gray-700 font-medium">
                    Drag & drop an image or click to select
                  </p>
                  <p className="text-sm text-gray-500">
                    JPG, PNG, GIF, WebP (max 10MB)
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/50 rounded-xl flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
      </motion.div>

      {/* Error messages */}
      {fileRejections.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-600"
        >
          {fileRejections[0].errors.map((error, index) => (
            <p key={index}>{error.message}</p>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ImageUploader;
