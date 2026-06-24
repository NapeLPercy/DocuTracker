const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");

class SplitterService {

    constructor() {

        this.splitter = new RecursiveCharacterTextSplitter({

            chunkSize: 1000,

            chunkOverlap: 200

        });

    }

    async splitDocuments(documents) {
        return await this.splitter.splitDocuments(documents);
    }

}

module.exports = SplitterService;