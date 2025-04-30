import { useState } from "react";
import api from "../api/axios";

const AIHelperButton = ({ onResult }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/ai/generate", { prompt });
      onResult(res.data.text); // Pass generated result to parent
      setPrompt("");
    } catch (err) {
      setError("Failed to generate response.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow mt-4 bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">Need inspiration? Ask AI</h3>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={2}
        placeholder="Type your idea or ask for help..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className="bg-purple-600 text-white px-3 py-1 rounded disabled:opacity-60"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default AIHelperButton;
