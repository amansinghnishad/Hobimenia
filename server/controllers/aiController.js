const gemini = require("../utils/gemini");

exports.generateText = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) return res.status(400).json({ msg: "Prompt is required" });

    const suggestion = await gemini.generateText(prompt);
    res.json({ suggestion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Gemini API failed" });
  }
};
