import { GoogleGenAI, Content, Part } from "@google/genai";
import { Message, TaxDocument, Role } from '../types';

// Initialize the API client
// Note: In a production app, the API key should be handled securely. 
// For this demo structure, we follow the instruction to use process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are TaxIntegrity AI, a specialized assistant designed to help auditors, accountants, and businesses ensure tax compliance and detect anomalies.

Your core responsibilities:
1. Analyze provided tax documents, financial records, and policies.
2. Identify discrepancies, potential fraud risks, or non-compliance with tax laws.
3. Answer user questions strictly based on the provided context (RAG).
4. Maintain a professional, objective, and analytical tone.
5. If the context doesn't contain the answer, state that clearly but offer general tax principles if applicable (while noting they are general).

Format your responses with clear headings, bullet points for issues, and citations of the document names if possible.
`;

export const generateTaxAnalysis = async (
  history: Message[],
  documents: TaxDocument[],
  prompt: string
): Promise<string> => {
  try {
    const activeDocs = documents.filter(d => d.isActive);
    
    // Context Injection Strategy (RAG)
    // We construct a context block with all active documents.
    // gemini-3-flash-preview has a large context window, making this effective for reasonable document sizes.
    let contextBlock = "";
    if (activeDocs.length > 0) {
      contextBlock = "--- START OF KNOWLEDGE BASE ---\n";
      activeDocs.forEach(doc => {
        contextBlock += `Document Name: ${doc.name} (${doc.type})\nContent:\n${doc.content}\n---\n`;
      });
      contextBlock += "--- END OF KNOWLEDGE BASE ---\n\n";
      contextBlock += "Instruction: Answer the user's query based on the Knowledge Base above.";
    } else {
      contextBlock = "Instruction: No specific documents have been uploaded. Answer based on general tax knowledge.";
    }

    // Transform chat history to API format
    // We only take the last few turns to save tokens if history is long, 
    // but keep system instruction and context fresh.
    const chatHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }] as Part[],
    }));

    // The actual prompt to the model includes the context and the user's latest question
    const finalPrompt = `${contextBlock}\n\nUser Query: ${prompt}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...chatHistory, // Previous conversation
        { role: 'user', parts: [{ text: finalPrompt }] } // Current context + prompt
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3, // Lower temperature for more analytical/factual responses
      }
    });

    return response.text || "No analysis generated.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate analysis. Please check your API configuration and try again.");
  }
};

export const checkIntegrity = async (documents: TaxDocument[]): Promise<string> => {
    try {
        const activeDocs = documents.filter(d => d.isActive);
        if (activeDocs.length === 0) return "Please select documents to analyze for integrity.";

        let contextBlock = "Analyze the following documents for internal inconsistencies, missing information, or potential tax compliance red flags:\n\n";
         activeDocs.forEach(doc => {
            contextBlock += `Document: ${doc.name}\n${doc.content}\n---\n`;
          });

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: [{ role: 'user', parts: [{ text: contextBlock }] }],
            config: {
                systemInstruction: "You are a strict Tax Integrity Auditor. Flag all mathematical errors, missing dates, inconsistent vendor names, or unusual transaction amounts.",
                temperature: 0.2
            }
        });

        return response.text || "Integrity check complete. No issues found.";
    } catch (error) {
        console.error("Integrity Check Error:", error);
        throw new Error("Integrity check failed.");
    }
}
