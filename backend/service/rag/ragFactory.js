const LoaderService = require("./loaderService");
const SplitterService = require("./splitterService");
const EmbeddingService = require("./embeddingService");
const VectorStoreService = require("./vectorStoreService");
const RetrievalService = require("./retrievalService");
const LLMService = require("./llmService");
const RagService = require("./ragService");
const DocumentIndexingService = require("./documentIndexingService");

const embeddingService = new EmbeddingService();

const loaderService = new LoaderService();

const splitterService = new SplitterService();

const vectorStoreService = new VectorStoreService(embeddingService);

const retrievalService = new RetrievalService(vectorStoreService);

const llmService = new LLMService();

const ragService = new RagService({
  retrievalService,
  llmService,
});

const documentIndexingService = new DocumentIndexingService({
  loaderService,
  splitterService,
  vectorStoreService,
});

module.exports = {
  ragService,
  documentIndexingService,
};
