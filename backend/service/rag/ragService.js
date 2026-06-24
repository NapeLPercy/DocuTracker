class RagService {

    constructor({
        loaderService,
        splitterService,
        vectorStoreService,
        retrievalService,
        llmService
    }) {

        this.loaderService = loaderService;
        this.splitterService = splitterService;
        this.vectorStoreService = vectorStoreService;
        this.retrievalService = retrievalService;
        this.llmService = llmService;
    }

    async indexDocuments() {

        const documents =
            await this.loaderService.loadDocuments();

        const chunks =
            await this.splitterService.splitDocuments(documents);

        await this.vectorStoreService.createVectorStore(chunks);

    }

    async chat(question) {

        const context =
            await this.retrievalService.retrieve(question);

        const answer =
            await this.llmService.generateAnswer(
                question,
                context
            );

        return answer;

    }

}

module.exports = RagService;