import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Task, TaskStatus, Priority } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Schema for Task Decomposition
const taskSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    tasks: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          priority: { type: Type.STRING, enum: [Priority.LOW, Priority.MEDIUM, Priority.HIGH, Priority.CRITICAL] },
          storyPoints: { type: Type.NUMBER },
          tags: { type: Type.ARRAY, items: { type: Type.STRING } },
          dueDateOffsetDays: { type: Type.NUMBER, description: "Number of days from now due" }
        },
        required: ["title", "description", "priority", "storyPoints", "tags"],
      },
    },
    summary: { type: Type.STRING, description: "Brief summary of the generated plan" }
  },
  required: ["tasks", "summary"],
};

export const generateProjectPlan = async (goal: string): Promise<{ tasks: Partial<Task>[], summary: string }> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please set the API_KEY environment variable.");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert Senior Technical Project Manager. 
      Break down the following project goal into actionable, concrete tasks. 
      Goal: "${goal}"
      
      Ensure tasks are granular, realistic, and cover the full lifecycle (Planning -> Dev -> QA -> Launch).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: taskSchema,
        systemInstruction: "You are a pragmatic project manager who prefers Agile methodologies.",
      },
    });

    const result = JSON.parse(response.text || "{}");
    
    // Transform API response to App Task format
    const tasks: Partial<Task>[] = (result.tasks || []).map((t: any) => ({
      title: t.title,
      description: t.description,
      priority: t.priority as Priority,
      storyPoints: t.storyPoints,
      tags: t.tags || [],
      status: TaskStatus.TODO,
      aiGenerated: true,
      dueDate: new Date(Date.now() + (t.dueDateOffsetDays || 3) * 86400000).toISOString(),
    }));

    return { tasks, summary: result.summary };
  } catch (error) {
    console.error("AI Planning Failed:", error);
    throw error;
  }
};

const riskSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    riskScore: { type: Type.NUMBER, description: "0 to 100 where 100 is high risk" },
    analysis: { type: Type.STRING },
    suggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
  },
  required: ["riskScore", "analysis", "suggestions"]
};

export const analyzeProjectRisks = async (tasks: Task[]): Promise<{ riskScore: number; analysis: string; suggestions: string[] }> => {
  if (!process.env.API_KEY) return { riskScore: 0, analysis: "AI unavailable", suggestions: [] };

  const taskSummary = tasks.map(t => `- [${t.status}] ${t.title} (Pri: ${t.priority}, Pts: ${t.storyPoints})`).join("\n");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following project state for risks, bottlenecks, and scope creep.
      
      Tasks:
      ${taskSummary}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: riskSchema,
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Risk Analysis Failed", error);
    return { riskScore: 0, analysis: "Failed to analyze risks.", suggestions: [] };
  }
};
