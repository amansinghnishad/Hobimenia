import React, { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";
import ReactMarkdown from "react-markdown";

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
    <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow">
      <textarea
        placeholder="Describe what kind of post or idea you want help with..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={3}
        className="w-full border rounded p-2 mb-2"
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        {loading ? "Generating..." : "Get AI Suggestion"}
      </button>
      {suggestion && (
        <div
          className="mt-3 bg-white border rounded p-3 cursor-pointer hover:bg-indigo-50 transition"
          onClick={() => onSuggestionClick?.(suggestion)}
        >
          <strong>Suggestion (click to use):</strong>
          <ReactMarkdown>{suggestion}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default AIHelperButton;
