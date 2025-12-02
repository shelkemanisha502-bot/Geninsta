import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCaptionFromImage = async (base64Image: string): Promise<string> => {
  try {
    // Remove data URL prefix if present for pure base64
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg', // Assuming jpeg/png handling for now
              data: cleanBase64,
            },
          },
          {
            text: `You are a professional social media manager.
            Write an engaging, witty, and short Instagram caption for this image.
            Include 3-5 relevant and trending hashtags.
            Keep the tone casual and fun.
            Do not include surrounding quotes.`,
          },
        ],
      },
    });

    return response.text || "Could not generate caption.";
  } catch (error) {
    console.error("Error generating caption:", error);
    return "Failed to generate caption. Please try again.";
  }
};

export const generateCommentSuggestion = async (postCaption: string): Promise<string[]> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate 3 short, distinct, and positive Instagram comment suggestions for a post with this caption: "${postCaption}".
            Return them as a JSON array of strings. Example: ["Great shot!", "Love this", "So cool!"].`
        });

        const text = response.text || "[]";
        // Simple cleanup to ensure we parse JSON
        const jsonStart = text.indexOf('[');
        const jsonEnd = text.lastIndexOf(']');
        if (jsonStart !== -1 && jsonEnd !== -1) {
            return JSON.parse(text.substring(jsonStart, jsonEnd + 1));
        }
        return ["Nice!", "Love it!", "Great!"];
    } catch (error) {
        console.error("Error generating comments:", error);
        return ["Awesome!", "Beautiful!", "Love this!"];
    }
}
