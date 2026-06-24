require("dotenv").config();

const {
  ragService,
  documentIndexingService,
} = require("../service/rag/ragFactory");

async function main() {
    
  await documentIndexingService.indexDocuments();
  const answer = await ragService.chat("What is the purpose of Indexing QC?");

  console.log("\nANSWER:\n");
  console.log(answer);
}

main();
