const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

exports.generateText = async (prompt) => {
  const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  const res = await axios.post(`${endpoint}?key=${GEMINI_API_KEY}`, body, {
    headers: { "Content-Type": "application/json" },
  });

  const suggestion = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return suggestion || "No response from Gemini.";
};
