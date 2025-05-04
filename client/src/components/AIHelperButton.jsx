import React, { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";
import ReactMarkdown from "react-markdown";
import { FaLightbulb } from "react-icons/fa";
import "../css/componentCSS/AIHelperButton.css";

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
        { prompt: promptText }, // Send the dynamic prompt
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

  return (
    <div className="ai-helper-container">
      <button
        onClick={handleGenerate}
        // Optionally disable if currentCaption is empty and you don't want a default suggestion
        // disabled={loading || !currentCaption?.trim()}
        disabled={loading || !currentCaption?.trim()} // Keep enabled even if caption is empty for default suggestion
        className="ai-helper-btn"
      >
        <FaLightbulb className="ai-helper-btn-icon" />
        {loading ? "Generating..." : "Suggest an Introduction"}
      </button>
      {suggestion && (
        <div
          className="ai-helper-suggestion"
          onClick={() =>
            suggestion &&
            !suggestion.startsWith("❌") &&
            onSuggestionClick?.(suggestion)
          }
          style={{
            cursor:
              suggestion && !suggestion.startsWith("❌")
                ? "pointer"
                : "default",
          }}
        >
          <div className="ai-helper-suggestion-title">
            <span>💡</span> Suggestion{" "}
            {suggestion && !suggestion.startsWith("❌")
              ? "(click to use):"
              : ""}
          </div>
          <div className="ai-helper-suggestion-text">
            <ReactMarkdown>{suggestion}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIHelperButton;
