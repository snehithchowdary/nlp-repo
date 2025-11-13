import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';
import { RiskLevel } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A brief, one-sentence summary of the emotional tone of the content."
    },
    riskLevel: {
      type: Type.STRING,
      description: "A risk assessment. Must be one of: 'Safe', 'Review Recommended', 'High Risk'."
    },
    explanation: {
      type: Type.STRING,
      description: "A detailed explanation for the risk assessment, considering the provided community context."
    },
    emotions: {
      type: Type.ARRAY,
      description: "An array of 3-5 key detected emotions and their confidence scores.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "The name of the emotion (e.g., Anger, Joy, Sarcasm)." },
          score: { type: Type.NUMBER, description: "A confidence score from 0 to 100." }
        },
        required: ["name", "score"],
      }
    }
  },
  required: ["summary", "riskLevel", "explanation", "emotions"],
};


export const analyzeContent = async (content: string, context: string): Promise<AnalysisResult> => {
    const prompt = `
    As an expert content moderator for online communities, analyze the following user-submitted content within the specific community context provided. Your goal is to provide a nuanced, emotion-aware assessment to help a human moderator make an informed decision.

    **Community Context:**
    ${context}

    **Content to Analyze:**
    ${content}

    **Your Task:**
    1.  **Summarize:** Provide a brief, one-sentence summary of the content's primary emotional tone.
    2.  **Assess Risk:** Determine the risk level for community disruption or rule violation. Choose ONE of the following: "Safe", "Review Recommended", or "High Risk".
    3.  **Explain:** Justify your risk assessment with a clear, concise explanation. Refer to specific words or phrases from the content and how they relate to the community's context.
    4.  **Detect Emotions:** Identify the top 3-5 key emotions present in the content. For each emotion, provide a confidence score from 0 to 100, where 100 is maximum confidence. Include emotions like sarcasm, frustration, or passive-aggression if detected.

    Provide your response in the specified JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    const parsedResult = JSON.parse(jsonText);
    
    // Validate riskLevel enum
    if (!Object.values(RiskLevel).includes(parsedResult.riskLevel)) {
        throw new Error(`Invalid riskLevel received: ${parsedResult.riskLevel}`);
    }
    
    return parsedResult as AnalysisResult;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get a valid response from the AI model.");
  }
};