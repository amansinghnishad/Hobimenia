import { SarvamAIClient } from "sarvamai";
import dotenv from "dotenv";
dotenv.config();

const SARVAM_API_KEY = process.env.SARVAM_API_KEY;

if (!SARVAM_API_KEY) {
  console.error("Error: SARVAM_API_KEY is not defined in the .env file.");
  // Optionally, throw an error to prevent the application from starting without the key
  // throw new Error("SARVAM_API_KEY is not defined. Please add it to your .env file.");
}

const client = new SarvamAIClient({
  apiSubscriptionKey: SARVAM_API_KEY
});

export const generateTextWithSarvam = async (prompt) => {
  if (!SARVAM_API_KEY) {
    throw new Error("Sarvam API key not configured.");
  }

  try {
    console.log(`Attempting to use translate for prompt: ${prompt}`);
    // Using translate function as per current structure, but with corrected parameters
    // This will effectively translate the prompt. 
    // If true text generation is needed, a different Sarvam client method should be used.
    const response = await client.text.transliterate({
      input: prompt,
      source_language_code: "en",
      target_language_code: "hi",
      model: "mayura:v1",
      mode: "modern-colloquial",
      enable_preprocessing: true,
    });
    console.log("Sarvam AI Response (from generateTextWithSarvam using translate):", response);

    // Adjust based on the actual response structure for translate
    // Assuming it's similar to the translateTextWithSarvam function's expectation
    const outputText = response.translated_text || (response.data && response.data.translated_text);

    if (!outputText) {
      console.warn("Translated text not found in Sarvam AI response. Full response:", response);
      return `Sarvam AI (translate) received: '${prompt}'. No translated text found.`;
    }
    return outputText;

  } catch (error) {
    console.error("❌ Sarvam AI API Error (in generateTextWithSarvam using translate):", error.response ? error.response.data : error.message, error.stack);
    throw new Error("Failed to process content with Sarvam AI (translate). Check server logs.");
  }
};

// If you intend to use the translate function for text generation:
export const translateTextWithSarvam = async (text, targetLanguageCode = "en-IN", sourceLanguageCode = "auto", speakerGender = "neutral") => {
  if (!SARVAM_API_KEY) {
    throw new Error("Sarvam API key not configured.");
  }
  try {
    console.log(`Translating text with Sarvam AI: ${text}`);
    const response = await client.text.translate({
      input: text,
      source_language_code: sourceLanguageCode,
      target_language_code: targetLanguageCode,
      speaker_gender: speakerGender
    });
    console.log("Sarvam AI Translation Response:", response);
    // Assuming the response has a field like 'translated_text' or similar
    // Adjust based on the actual response structure from the SDK
    return response.translated_text || (response.data && response.data.translated_text) || "Translation not found in response.";
  } catch (error) {
    console.error("❌ Sarvam AI Translation Error:", error.response ? error.response.data : error.message, error.stack);
    throw new Error("Failed to translate content with Sarvam AI.");
  }
};
