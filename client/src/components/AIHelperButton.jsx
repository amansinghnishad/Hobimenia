import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";
import ReactMarkdown from "react-markdown";
import { FaLightbulb, FaMagic, FaRobot, FaCheckCircle } from "react-icons/fa";

// Accept currentCaption prop
const AIHelperButton = ({ currentCaption, onSuggestionClick }) => {
  const { token } = useContext(AuthContext);

  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    // Use currentCaption if available, otherwise use a default prompt
    const promptText = currentCaption?.trim()
      ? `Based on the following text, suggest a short, engaging introduction (around 1-2 sentences):
\n---\n${currentCaption}
---
`
      : "Suggest a short, engaging introduction for a blog post or social media update.";

    setLoading(true);
    setSuggestion("");
    try {
      const res = await api.post(
        "/ai/generate",
        { prompt: promptText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const trimmedSuggestion = res.data.suggestion?.trim() || "";
      setSuggestion(trimmedSuggestion);
    } catch (error) {
      setSuggestion("❌ Failed to generate. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isError = suggestion.startsWith("❌");
  const canUseSuggestion = suggestion && !isError;

  return (
    <div className="space-y-4">
      <motion.button
        onClick={handleGenerate}
        disabled={loading || !currentCaption?.trim()}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className={`
          w-full px-4 py-3 rounded-xl font-semibold text-sm
          flex items-center justify-center space-x-2
          transition-all duration-300 shadow-lg hover:shadow-xl
          ${
            loading || !currentCaption?.trim()
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
          }
        `}
      >
        {" "}
        <motion.div
          animate={loading ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 1, repeat: loading ? Infinity : 0 }}
        >
          {loading ? (
            <FaMagic className="text-lg" />
          ) : (
            <FaRobot className="text-lg" />
          )}
        </motion.div>
        <span>{loading ? "Generating..." : "AI Suggestion"}</span>
      </motion.button>

      <AnimatePresence>
        {suggestion && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`
              p-4 rounded-xl border-2 transition-all duration-300
              ${
                canUseSuggestion
                  ? "bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 cursor-pointer hover:border-blue-300 hover:shadow-lg"
                  : "bg-red-50 border-red-200"
              }
            `}
            onClick={() => canUseSuggestion && onSuggestionClick?.(suggestion)}
          >
            <div className="flex items-center space-x-2 mb-3">
              <div
                className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${
                  isError
                    ? "bg-red-200"
                    : "bg-gradient-to-r from-blue-500 to-purple-600"
                }
              `}
              >
                {isError ? (
                  <span className="text-red-600 text-sm">❌</span>
                ) : (
                  <FaLightbulb className="text-white text-sm" />
                )}
              </div>
              <div>
                <h4
                  className={`font-semibold text-sm ${
                    isError ? "text-red-700" : "text-gray-800"
                  }`}
                >
                  AI Suggestion
                </h4>
                {canUseSuggestion && (
                  <p className="text-xs text-blue-600 flex items-center space-x-1">
                    <FaCheckCircle className="text-xs" />
                    <span>Click to use this suggestion</span>
                  </p>
                )}
              </div>
            </div>

            <motion.div
              className={`
                prose prose-sm max-w-none
                ${isError ? "text-red-700" : "text-gray-700"}
              `}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <ReactMarkdown>{suggestion}</ReactMarkdown>
            </motion.div>

            {canUseSuggestion && (
              <motion.div
                className="mt-3 pt-3 border-t border-blue-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {" "}
                <div className="flex items-center justify-between text-xs text-blue-600">
                  <span className="flex items-center space-x-1">
                    <FaMagic />
                    <span>Generated by AI</span>
                  </span>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="font-semibold cursor-pointer"
                  >
                    Use Suggestion →
                  </motion.span>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIHelperButton;
