const fs = require("fs");
const path = require("path");
const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf");

class LoaderService {

    async loadDocuments() {

        const docsFolder = path.join(__dirname, "../../docs");

        const files = fs.readdirSync(docsFolder);

        let documents = [];

        for (const file of files) {

            if (!file.endsWith(".pdf")) continue;

            const loader = new PDFLoader(
                path.join(docsFolder, file)
            );

            const docs = await loader.load();

            documents.push(...docs);

        }

        return documents;

    }
}

module.exports = LoaderService;