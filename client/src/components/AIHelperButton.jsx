import React, { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";
import ReactMarkdown from "react-markdown";
import "../css/componentCSS/AIHelperButton.css";

const AIHelperButton = ({ onSuggestionClick }) => {
  const { token } = useContext(AuthContext);

  const [prompt, setPrompt] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const res = await api.post(
        "/ai/generate",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuggestion(res.data.suggestion);
    } catch (error) {
      setSuggestion("❌ Failed to generate. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-helper-container">
      <textarea
        placeholder="Describe what kind of post or idea you want help with..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={3}
        className="ai-helper-textarea"
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="ai-helper-btn"
      >
        {loading ? "Generating..." : "Get AI Suggestion"}
      </button>
      {suggestion && (
        <div
          className="ai-helper-suggestion"
          onClick={() => onSuggestionClick?.(suggestion)}
        >
          <div className="ai-helper-suggestion-title">
            <span>💡</span> Suggestion (click to use):
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
