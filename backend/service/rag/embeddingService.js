const { OpenAIEmbeddings } = require("@langchain/openai");

class EmbeddingService {

    constructor() {

        this.embeddings = new OpenAIEmbeddings({
            model: "text-embedding-3-small",
            apiKey: process.env.OPENAI_API_KEY
        });

    }

    getEmbeddings() {
        return this.embeddings;
    }

}

module.exports = EmbeddingService;