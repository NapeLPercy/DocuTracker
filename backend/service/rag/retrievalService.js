class RetrievalService {

    constructor(vectorStoreService) {
        this.vectorStoreService = vectorStoreService;
    }

    async retrieve(question) {

        const retriever =
            this.vectorStoreService.getRetriever();

        const documents =
            await retriever.invoke(question);

        return documents;

    }

}

module.exports = RetrievalService;