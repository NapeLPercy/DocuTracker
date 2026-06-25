class DocumentIndexingService {
  constructor({ loaderService, splitterService, vectorStoreService }) {
    this.loaderService = loaderService;
    this.splitterService = splitterService;
    this.vectorStoreService = vectorStoreService;
  }

  async indexDocuments() {
    const documents = await this.loaderService.loadDocuments();

    const chunks = await this.splitterService.splitDocuments(documents);

    await this.vectorStoreService.createVectorStore(chunks);
  }
}

module.exports = DocumentIndexingService;
