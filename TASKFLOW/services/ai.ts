import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// We use a singleton pattern for the AI client, initialized lazily
let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient && apiKey) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const generateSubtasks = async (taskTitle: string, taskDescription: string) => {
  const client = getAiClient();
  if (!client) {
    console.warn("API Key not found, skipping AI generation");
    return [];
  }

  try {
    const prompt = `
      I have a task: "${taskTitle}".
      Description: "${taskDescription}".
      
      Please break this down into 3-5 actionable subtasks.
      Keep titles concise (under 10 words).
    `;

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
            },
            required: ["title"]
          }
        }
      }
    });

    const jsonText = response.text || "[]";
    const result = JSON.parse(jsonText);
    return result.map((item: any) => item.title);

  } catch (error) {
    console.error("AI Generation Error:", error);
    return [];
  }
};

export const getDailyQuote = async (): Promise<string> => {
   const client = getAiClient();
   if (!client) return "Focus on being productive instead of busy.";

   try {
     const response = await client.models.generateContent({
       model: "gemini-2.5-flash",
       contents: "Give me a short, unique, inspiring productivity quote. Max 15 words. Just the text.",
     });
     return response.text || "Make today count.";
   } catch (e) {
     return "Action is the foundational key to all success.";
   }
}
