//const { MemoryVectorStore } = require("langchain/vectorstores/memory");
const { MemoryVectorStore } = require("@langchain/classic/vectorstores/memory");

class VectorStoreService {
  constructor(embeddingService) {
    this.embeddingService = embeddingService;
    this.vectorStore = null;
  }

  async createVectorStore(chunks) {
    this.vectorStore = await MemoryVectorStore.fromDocuments(
      chunks,
      this.embeddingService.getEmbeddings(),
    );
  }

  getRetriever() {
    return this.vectorStore.asRetriever({
      k: 5,
    });
  }
}

module.exports = VectorStoreService;

/*const { Chroma } = require("@langchain/community/vectorstores/chroma");

class VectorStoreService {

    constructor(embeddingService) {

        this.embeddingService = embeddingService;
        this.vectorStore = null;

    }

    async createVectorStore(chunks) {

        this.vectorStore = await Chroma.fromDocuments(

            chunks,

            this.embeddingService.getEmbeddings(),

            {
                collectionName: "docutracker"
            }

        );

    }

    getRetriever() {

        if (!this.vectorStore) {
            throw new Error("Vector store has not been initialized.");
        }

        return this.vectorStore.asRetriever({
            k: 5
        });

    }

}

*/
