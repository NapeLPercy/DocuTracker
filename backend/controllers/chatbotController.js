const { ragService } = require("../service/rag/ragFactory");

exports.chat = async (req, res) => {
  try {
    const { question } = req.body;

    // validation
    if (!question || typeof question !== "string") {
      return res.status(400).json({
        success: false,
        message: "Question is required and must be a string",
      });
    }

    if (!question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question cannot be empty",
      });
    }

    if (question.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Question exceeds maximum length of 2000 characters",
      });
    }

    // await documentIndexingService.indexDocuments();

    const answer = await ragService.chat(question.trim());

    return res.status(200).json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("Chatbot error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to process chatbot request",
    });
  }
};
