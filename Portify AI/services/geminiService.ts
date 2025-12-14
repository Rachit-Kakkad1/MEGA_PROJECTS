import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Initialize safe client
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateContentImprovement = async (
  text: string,
  type: 'summary' | 'experience' | 'project',
  tone: 'professional' | 'creative' | 'concise' = 'professional'
): Promise<string> => {
  if (!ai) {
    console.warn("Gemini API Key missing");
    return "AI Enhancement is unavailable without an API Key. Please configure process.env.API_KEY.";
  }

  const modelId = 'gemini-2.5-flash';
  
  let prompt = "";
  switch(type) {
    case 'summary':
      prompt = `Act as a senior technical recruiter. Rewrite the following professional summary to be more impactful, using the '${tone}' tone. Keep it under 200 words. Return ONLY the rewritten text. Text: "${text}"`;
      break;
    case 'experience':
      prompt = `Act as a hiring manager. Enhance the following job experience description to highlight achievements and metrics. Use a '${tone}' tone. Return ONLY the rewritten text. Text: "${text}"`;
      break;
    case 'project':
      prompt = `Rewrite the following project description to sound technically impressive and result-oriented. Tone: '${tone}'. Return ONLY the rewritten text. Text: "${text}"`;
      break;
  }

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return text; // Fallback to original
  }
};

export const suggestSkills = async (context: string): Promise<string[]> => {
  if (!ai) return ['Communication', 'Leadership', 'Problem Solving']; // Fallback

  const prompt = `Based on the following professional text (projects, bio, or experience), suggest a list of 5-10 relevant technical and soft skills. Return ONLY a JSON array of strings, e.g., ["React", "Python"]. Text: "${context}"`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });
    
    const text = response.text.trim();
    // Basic JSON cleaning if needed, though responseMimeType handles most
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '');
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini Skills Error:", error);
    return [];
  }
};