import { GoogleGenAI, Type, SchemaType } from "@google/genai";
import { ProjectPlan, TaskStatus } from '../types';

// Initialize the Gemini API client
// Note: In a real backend architecture, this key would be server-side.
// For this frontend-only demo, we use the env var directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProjectPlan = async (goal: string): Promise<ProjectPlan> => {
  const modelId = 'gemini-2.5-flash';

  const systemInstruction = `
    You are an expert project manager and agile coach. 
    Your goal is to break down a high-level user request into a structured project plan.
    Return the response in strict JSON format.
  `;

  const prompt = `Create a detailed project plan for: "${goal}". Include a list of actionable tasks, potential risks, and an estimated duration.`;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            projectName: { type: Type.STRING },
            summary: { type: Type.STRING },
            estimatedDuration: { type: Type.STRING },
            risks: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            tasks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  status: { type: Type.STRING }, 
                  dueDate: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      // Map the status string to our Enum if needed, or default to TODO
      const tasks = data.tasks.map((t: any) => ({
        ...t,
        status: TaskStatus.TODO,
        id: crypto.randomUUID()
      }));
      return { ...data, tasks };
    }
    throw new Error("No response text generated");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const generateInsight = async (metricName: string, value: number, trend: string): Promise<string> => {
  const modelId = 'gemini-2.5-flash';
  
  const prompt = `
    Analyze this SaaS metric:
    Metric: ${metricName}
    Current Value: ${value}
    Trend: ${trend}
    
    Provide a 1-sentence executive summary of what this means for the business and 1 actionable recommendation.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return response.text || "Insight unavailable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Could not generate insight at this time.";
  }
};
