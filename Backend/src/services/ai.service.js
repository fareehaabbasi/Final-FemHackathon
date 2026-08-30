const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function analyzeTicket({ subject, description, category }) {

    const prompt = `
You are an AI customer support ticket triage assistant.

Analyze the following customer complaint and suggest:

1. Category
2. Priority
3. Short summary

Allowed categories:
- Billing
- Technical
- Account
- Delivery
- General

Allowed priorities:
- Low
- Medium
- High

Customer selected category:
${category || "Not provided"}

Subject:
${subject}

Description:
${description}

Return only the requested structured JSON.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,

        config: {
            responseMimeType: "application/json",

            responseSchema: {
                type: "object",
                properties: {
                    category: {
                        type: "string",
                        enum: [
                            "Billing",
                            "Technical",
                            "Account",
                            "Delivery",
                            "General"
                        ]
                    },

                    priority: {
                        type: "string",
                        enum: [
                            "Low",
                            "Medium",
                            "High"
                        ]
                    },

                    summary: {
                        type: "string"
                    }
                },

                required: [
                    "category",
                    "priority",
                    "summary"
                ]
            }
        }
    });

    return JSON.parse(response.text);
}

module.exports = {
    analyzeTicket
};