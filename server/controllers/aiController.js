import { generateText as geminiGenerateText } from "../utils/gemini.js";

export const generateText = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) return res.status(400).json({ msg: "Prompt is required" });

    const suggestion = await geminiGenerateText(prompt);
    res.json({ suggestion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message || "Gemini API failed" });
  }
};
