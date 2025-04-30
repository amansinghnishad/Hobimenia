import React, { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";

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
    <div className="ai-helper">
      <textarea
        placeholder="Describe what kind of post or idea you want help with..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
      />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Get AI Suggestion"}
      </button>
      {suggestion && (
        <div
          className="ai-response"
          onClick={() => onSuggestionClick?.(suggestion)}
        >
          <strong>Suggestion (click to use):</strong>
          <p>{suggestion}</p>
        </div>
      )}
    </div>
  );
};

export default AIHelperButton;
