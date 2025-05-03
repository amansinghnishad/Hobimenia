import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export const generateText = async (prompt) => {
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  try {
    const res = await axios.post(`${endpoint}?key=${GEMINI_API_KEY}`, body, {
      headers: { "Content-Type": "application/json" },
    });

    const suggestion = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return suggestion || "No response from Gemini.";
  } catch (err) {
    console.error("❌ Gemini API Error:", err?.response?.data || err.message);
    throw new Error("Failed to generate content from Gemini.");
  }
};