
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const vulnerabilitySchema = {
  type: Type.OBJECT,
  properties: {
    vulnerabilities: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          severity: { 
            type: Type.STRING,
            enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']
          },
          confidence: { type: Type.NUMBER },
          location: {
            type: Type.OBJECT,
            properties: {
              line: { type: Type.INTEGER },
              column: { type: Type.INTEGER }
            },
            required: ['line']
          },
          description: { type: Type.STRING },
          risk: { type: Type.STRING },
          remediation: {
            type: Type.OBJECT,
            properties: {
              explanation: { type: Type.STRING },
              secureCode: { type: Type.STRING }
            },
            required: ['explanation', 'secureCode']
          }
        },
        required: ['id', 'title', 'severity', 'confidence', 'location', 'description', 'risk', 'remediation']
      }
    },
    overallScore: { 
      type: Type.INTEGER,
      description: 'Security health score from 0 (worst) to 100 (best)'
    }
  },
  required: ['vulnerabilities', 'overallScore']
};

async function callGemini(prompt: string, systemInstruction: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: vulnerabilitySchema,
      },
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Analysis failed:", error);
    throw error;
  }
}

export async function analyzeCode(code: string, language: string) {
  const prompt = `Analyze the following ${language} source code for security vulnerabilities. 
  Focus on OWASP Top 10, CWE, and common language-specific pitfalls.
  Provide precise remediation steps and secure code examples.
  
  Source Code:
  \`\`\`${language}
  ${code}
  \`\`\``;

  return callGemini(prompt, "You are an expert security engineer and code auditor. Provide highly accurate, professional, and actionable vulnerability assessments in JSON format.");
}

export async function analyzeAPI(endpoint: string, method: string, headers: string, body: string) {
  const prompt = `Perform a security analysis on this API endpoint specification based on OWASP API Security Top 10.
  
  Endpoint: ${method} ${endpoint}
  Headers: ${headers}
  Body: ${body}
  
  Identify potential risks like Broken Object Level Authorization, Broken Authentication, Excessive Data Exposure, Lack of Resources & Rate Limiting, and Injection.`;

  return callGemini(prompt, "You are a specialist in API Security. Audit the provided endpoint and provide a detailed risk assessment and remediation guide.");
}

export async function analyzeDatabase(configOrQuery: string) {
  const prompt = `Analyze the following database query or configuration for security risks.
  Focus on SQL Injection, insecure defaults, over-privileged access patterns, and weak encryption.
  
  Data to Analyze:
  ${configOrQuery}`;

  return callGemini(prompt, "You are a Database Security Expert. Analyze the input for vulnerabilities and provide secure implementation guidance.");
}
