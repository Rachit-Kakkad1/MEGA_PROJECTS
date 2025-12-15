import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const optimizeText = async (text: string, context: string = "resume bullet point"): Promise<string> => {
  if (!apiKey) throw new Error("API Key missing");

  const prompt = `
    You are an expert resume writer and ATS optimization specialist.
    Rewrite the following ${context} to be more professional, impactful, and concise.
    Use strong action verbs. Quantify results where possible.
    Do not add made-up facts. Keep the same meaning but improve clarity and impact.
    Return ONLY the rewritten text, no explanations.

    Original text:
    "${text}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text?.trim() || text;
  } catch (error) {
    console.error("Gemini optimization error:", error);
    throw error;
  }
};

export const suggestSkills = async (jobDescription: string, currentSkills: string): Promise<string[]> => {
  if (!apiKey) throw new Error("API Key missing");

  const prompt = `
    You are an ATS algorithms expert.
    Based on the following Job Description and the candidate's Current Skills,
    identify the top 5 missing technical or soft skills that are critical for this role.
    Return the result as a JSON array of strings ONLY.

    Job Description:
    ${jobDescription.substring(0, 1000)}...

    Current Skills:
    ${currentSkills}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });
    
    const text = response.text || "[]";
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini skill suggestion error:", error);
    return [];
  }
};

export const generateSummary = async (experience: string): Promise<string> => {
   if (!apiKey) throw new Error("API Key missing");

   const prompt = `
    Write a professional 3-sentence resume summary based on the following experience highlights.
    Focus on key achievements and years of experience.
    
    Experience:
    ${experience.substring(0, 1500)}
   `;

   try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text?.trim() || "";
  } catch (error) {
    console.error("Gemini summary generation error:", error);
    throw error;
  }
}
