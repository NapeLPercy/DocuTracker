class DocumentIndexingService {

    constructor({
        loaderService,
        splitterService,
        vectorStoreService
    }) {
        this.loaderService = loaderService;
        this.splitterService = splitterService;
        this.vectorStoreService = vectorStoreService;
    }

    async indexDocuments() {

        console.log("Loading documents...");

        const documents =
            await this.loaderService.loadDocuments();

        console.log(
            `Loaded ${documents.length} documents`
        );

        const chunks =
            await this.splitterService
                .splitDocuments(documents);

        console.log(
            `Created ${chunks.length} chunks`
        );

        await this.vectorStoreService
            .createVectorStore(chunks);

        console.log("Indexing complete");
    }
}

module.exports = DocumentIndexingService;