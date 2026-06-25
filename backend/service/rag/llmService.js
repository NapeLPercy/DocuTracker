const { ChatOpenAI } = require("@langchain/openai");
const { systemPrompt } = require("../../prompts/systemPrompts");

class LLMService {
  constructor() {
    this.model = new ChatOpenAI({
      model: "gpt-4.1-mini",
      apiKey: process.env.OPENAI_API_KEY,
      temperature: 0,
    });
  }

  async generateAnswer(question, documents) {
    const context = documents.map((doc) => doc.pageContent).join("\n\n");
    const prompt = `${systemPrompt}

Context:
${context}

Question:
${question}
`;

    const response = await this.model.invoke(prompt);

    return response.content;
  }
}

module.exports = LLMService;
